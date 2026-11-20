import { createHash } from "node:crypto";
import { createApp } from "./app.js";
import { CapsuleVault } from "./domain.js";

const secret = process.env.CAPSULE_SECRET ?? "development-only-change-this-secret";
const key = createHash("sha256").update(secret).digest();
const port = Number(process.env.PORT ?? 3106);
createApp(new CapsuleVault(key)).listen(port, () => process.stdout.write(`EchoCapsule listening on http://localhost:${port}\n`));

