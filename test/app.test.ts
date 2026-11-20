import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("capsule boundary", () => {
  it("rejects an invalid schedule", async () => {
    const response = await request(createApp()).post("/api/capsules").send({
      title: "Wrong order", deadline: "2026-11-22T12:00:00Z", openAt: "2026-11-21T12:00:00Z"
    });
    expect(response.status).toBe(422);
  });
});

