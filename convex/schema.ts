import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    client: v.string(),
    deadline: v.number(), // Unix timestamp in ms
    phase: v.union(
      v.literal("brief"),
      v.literal("concept"),
      v.literal("development"),
      v.literal("handoff")
    ),
    description: v.optional(v.string()),
    createdAt: v.number(), // Unix timestamp in ms
  })
    .index("by_phase", ["phase"])
    .index("by_created_at", ["createdAt"]),
});
