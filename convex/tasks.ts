import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    status: v.optional(
      v.union(
        v.literal("todo"),
        v.literal("in_progress"),
        v.literal("review"),
        v.literal("done")
      )
    ),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      projectId: args.projectId,
      title: args.title,
      description: args.description,
      priority: args.priority,
      status: args.status ?? "todo",
      dueDate: args.dueDate,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent")
      )
    ),
    status: v.optional(
      v.union(
        v.literal("todo"),
        v.literal("in_progress"),
        v.literal("review"),
        v.literal("done")
      )
    ),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Seed sample tasks
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("tasks").first();
    if (existing) return;

    const projects = await ctx.db.query("projects").collect();
    if (projects.length === 0) return;

    const now = Date.now();
    const day = 1000 * 60 * 60 * 24;

    const sampleTasks = [
      { projectId: projects[0]._id, title: "Review material samples", priority: "high" as const, status: "todo" as const, dueDate: now + 3 * day },
      { projectId: projects[0]._id, title: "Prepare mood board", priority: "medium" as const, status: "in_progress" as const, dueDate: now + 5 * day },
      { projectId: projects[0]._id, title: "Client kickoff meeting notes", priority: "low" as const, status: "done" as const },
      { projectId: projects[1]._id, title: "3D model first iteration", priority: "high" as const, status: "in_progress" as const, dueDate: now + 7 * day },
      { projectId: projects[1]._id, title: "Finalize color palette", priority: "medium" as const, status: "todo" as const, dueDate: now + 10 * day },
      { projectId: projects[2]._id, title: "Prototype testing", priority: "urgent" as const, status: "review" as const, dueDate: now + 2 * day },
      { projectId: projects[2]._id, title: "Technical drawings", priority: "high" as const, status: "todo" as const, dueDate: now + 14 * day },
      { projectId: projects[3]._id, title: "Assembly instructions", priority: "medium" as const, status: "in_progress" as const, dueDate: now - 1 * day },
      { projectId: projects[4]._id, title: "Weave pattern sampling", priority: "high" as const, status: "todo" as const, dueDate: now + 4 * day },
      { projectId: projects[5]._id, title: "Final production files", priority: "urgent" as const, status: "review" as const, dueDate: now - 5 * day },
    ];

    for (const task of sampleTasks) {
      await ctx.db.insert("tasks", { ...task, createdAt: now });
    }
  },
});
