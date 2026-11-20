import express from "express";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { CapsuleVault } from "./domain.js";

const createInput = z.object({ title: z.string().min(1).max(160), deadline: z.coerce.date(), openAt: z.coerce.date() });

export function createApp(vault = new CapsuleVault(randomBytes(32))) {
  const app = express();
  app.use(express.json({ limit: "128kb" }));
  app.use(express.static("public"));
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
  app.post("/api/capsules", (request, response) => {
    const parsed = createInput.safeParse(request.body);
    if (!parsed.success) return response.status(422).json({ error: "VALIDATION_FAILED" });
    try { return response.status(201).json({ data: vault.create(parsed.data.title, parsed.data.deadline, parsed.data.openAt) }); }
    catch (error) { return response.status(422).json({ error: error instanceof Error ? error.message : "UNKNOWN" }); }
  });
  app.get("/api/capsules/:id/status", (request, response) => {
    try {
      const capsule = vault.refresh(request.params.id);
      return response.json({ data: { id: capsule.id, title: capsule.title, state: capsule.state, deadline: capsule.deadline, openAt: capsule.openAt, cardCount: capsule.cards.length, manifestHash: capsule.manifestHash } });
    } catch { return response.status(404).json({ error: "NOT_FOUND" }); }
  });
  return app;
}

