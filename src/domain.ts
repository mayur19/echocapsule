import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";

export type CapsuleState = "COLLECTING" | "SEALED" | "OPEN" | "CANCELLED";
export interface Card { id: string; authorId: string; plaintext?: string; ciphertext?: string; nonce?: string; tag?: string; hash?: string }
export interface Capsule { id: string; title: string; deadline: Date; openAt: Date; state: CapsuleState; cards: Card[]; manifestHash?: string }

function encrypt(plaintext: string, key: Buffer) {
  const nonce = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return { ciphertext: ciphertext.toString("base64"), nonce: nonce.toString("base64"), tag: cipher.getAuthTag().toString("base64") };
}

function decrypt(card: Card, key: Buffer): string {
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(card.nonce!, "base64"));
  decipher.setAuthTag(Buffer.from(card.tag!, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(card.ciphertext!, "base64")), decipher.final()]).toString("utf8");
}

export class CapsuleVault {
  readonly capsules = new Map<string, Capsule>();
  constructor(private readonly key: Buffer, private readonly now: () => Date = () => new Date()) {
    if (key.length !== 32) throw new Error("INVALID_KEY");
  }

  create(title: string, deadline: Date, openAt: Date): Capsule {
    if (deadline <= this.now() || deadline >= openAt) throw new Error("INVALID_SCHEDULE");
    const capsule: Capsule = { id: randomUUID(), title: title.trim(), deadline, openAt, state: "COLLECTING", cards: [] };
    this.capsules.set(capsule.id, capsule);
    return structuredClone(capsule);
  }

  contribute(capsuleId: string, authorId: string, plaintext: string): Card {
    const capsule = this.refresh(capsuleId);
    if (capsule.state !== "COLLECTING") throw new Error("CAPSULE_NOT_COLLECTING");
    const existing = capsule.cards.find((card) => card.authorId === authorId);
    const card = { id: existing?.id ?? randomUUID(), authorId, plaintext };
    if (existing) Object.assign(existing, card); else capsule.cards.push(card);
    return structuredClone(card);
  }

  seal(capsuleId: string): Capsule {
    const capsule = this.capsules.get(capsuleId);
    if (!capsule) throw new Error("NOT_FOUND");
    if (capsule.state === "SEALED") return structuredClone(capsule);
    if (capsule.state !== "COLLECTING" || this.now() < capsule.deadline) throw new Error("NOT_READY_TO_SEAL");
    const sealedCards = capsule.cards.map((card) => {
      const hash = createHash("sha256").update(card.plaintext ?? "").digest("hex");
      return { id: card.id, authorId: card.authorId, ...encrypt(card.plaintext ?? "", this.key), hash };
    });
    const manifestHash = createHash("sha256").update(sealedCards.map((card) => `${card.id}:${card.hash}`).sort().join("|")).digest("hex");
    capsule.cards = sealedCards;
    capsule.manifestHash = manifestHash;
    capsule.state = "SEALED";
    return structuredClone(capsule);
  }

  reveal(capsuleId: string, viewerIsMember: boolean): Array<{ id: string; authorId: string; body: string; verified: boolean }> {
    const capsule = this.refresh(capsuleId);
    if (!viewerIsMember) throw new Error("NOT_FOUND");
    if (capsule.state !== "OPEN") throw new Error("NOT_OPEN");
    return capsule.cards.map((card) => {
      const body = decrypt(card, this.key);
      return { id: card.id, authorId: card.authorId, body, verified: createHash("sha256").update(body).digest("hex") === card.hash };
    });
  }

  refresh(capsuleId: string): Capsule {
    const capsule = this.capsules.get(capsuleId);
    if (!capsule) throw new Error("NOT_FOUND");
    if (capsule.state === "COLLECTING" && this.now() >= capsule.deadline) this.seal(capsuleId);
    if (capsule.state === "SEALED" && this.now() >= capsule.openAt) capsule.state = "OPEN";
    return capsule;
  }
}

