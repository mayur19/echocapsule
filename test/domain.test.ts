import { describe, expect, it } from "vitest";
import { CapsuleVault } from "../src/domain.js";

describe("CapsuleVault", () => {
  it("seals at the deadline and opens only at the reveal time", () => {
    let now = new Date("2026-11-20T10:00:00Z");
    const vault = new CapsuleVault(Buffer.alloc(32, 7), () => now);
    const capsule = vault.create("Open later", new Date("2026-11-20T11:00:00Z"), new Date("2026-11-20T12:00:00Z"));
    vault.contribute(capsule.id, "leena", "Remember the blue train.");
    now = new Date("2026-11-20T11:00:00Z");
    const sealed = vault.refresh(capsule.id);
    expect(sealed.state).toBe("SEALED");
    expect(sealed.cards[0]?.plaintext).toBeUndefined();
    expect(() => vault.reveal(capsule.id, true)).toThrow("NOT_OPEN");
    now = new Date("2026-11-20T12:00:00Z");
    expect(vault.reveal(capsule.id, true)[0]).toEqual(expect.objectContaining({ body: "Remember the blue train.", verified: true }));
  });

  it("does not reveal content to a nonmember", () => {
    let now = new Date("2026-11-20T10:00:00Z");
    const vault = new CapsuleVault(Buffer.alloc(32, 3), () => now);
    const capsule = vault.create("Private", new Date("2026-11-20T11:00:00Z"), new Date("2026-11-20T12:00:00Z"));
    vault.contribute(capsule.id, "friend", "A private memory.");
    now = new Date("2026-11-20T12:00:00Z");
    expect(() => vault.reveal(capsule.id, false)).toThrow("NOT_FOUND");
  });
});

