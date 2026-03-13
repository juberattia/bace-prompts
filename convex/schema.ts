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
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent")
      )
    ),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    createdAt: v.number(), // Unix timestamp in ms
  })
    .index("by_phase", ["phase"])
    .index("by_created_at", ["createdAt"]),

  tasks: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done")
    ),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  briefings: defineTable({
    projectId: v.optional(v.id("projects")),
    title: v.string(),
    projectContext: v.optional(v.string()),
    targetUser: v.optional(v.string()),
    constraints: v.optional(v.string()),
    materials: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    references: v.optional(v.string()),
    deliverables: v.optional(v.string()),
    deadline: v.optional(v.number()),
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("completed")
    ),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
