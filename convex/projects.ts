import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// List all projects ordered by creation date
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

// Get a single project by ID
export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new project
export const create = mutation({
  args: {
    name: v.string(),
    client: v.string(),
    deadline: v.number(),
    phase: v.union(
      v.literal("brief"),
      v.literal("concept"),
      v.literal("development"),
      v.literal("handoff")
    ),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      name: args.name,
      client: args.client,
      deadline: args.deadline,
      phase: args.phase,
      description: args.description,
      createdAt: Date.now(),
    });
  },
});

// Update a project's phase
export const updatePhase = mutation({
  args: {
    id: v.id("projects"),
    phase: v.union(
      v.literal("brief"),
      v.literal("concept"),
      v.literal("development"),
      v.literal("handoff")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { phase: args.phase });
  },
});

// General update mutation
export const update = mutation({
  args: {
    id: v.id("projects"),
    name: v.optional(v.string()),
    client: v.optional(v.string()),
    deadline: v.optional(v.number()),
    phase: v.optional(
      v.union(
        v.literal("brief"),
        v.literal("concept"),
        v.literal("development"),
        v.literal("handoff")
      )
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

// Remove a project and its related tasks/briefings
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    // Delete related tasks
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }
    // Delete related briefings
    const briefings = await ctx.db
      .query("briefings")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    for (const briefing of briefings) {
      await ctx.db.delete(briefing._id);
    }
    await ctx.db.delete(args.id);
  },
});

// Seed sample data (only if no projects exist)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").first();
    if (existing) return; // Already seeded

    const now = Date.now();
    const day = 1000 * 60 * 60 * 24;

    const samples = [
      {
        name: "Aria Chair Collection",
        client: "Knoll Europe",
        deadline: now + 14 * day,
        phase: "brief" as const,
        description: "Modular seating system for open-plan offices. Three sizes, stackable.",
        createdAt: now - 2 * day,
      },
      {
        name: "Forma Kitchen System",
        client: "Boffi",
        deadline: now + 30 * day,
        phase: "concept" as const,
        description: "Handleless kitchen with integrated lighting. Matte lacquer finishes.",
        createdAt: now - 5 * day,
      },
      {
        name: "Nova Lamp Series",
        client: "Flos",
        deadline: now + 45 * day,
        phase: "concept" as const,
        description: "Architectural floor lamp. Brushed aluminum and opal glass.",
        createdAt: now - 8 * day,
      },
      {
        name: "Strata Shelf System",
        client: "Vitra",
        deadline: now - 3 * day, // Overdue
        phase: "development" as const,
        description: "Wall-mounted modular shelving. 12 configurations, solid oak.",
        createdAt: now - 20 * day,
      },
      {
        name: "Cleo Textile Range",
        client: "Kvadrat",
        deadline: now + 7 * day,
        phase: "development" as const,
        description: "Recycled wool blend upholstery. 24 colorways.",
        createdAt: now - 15 * day,
      },
      {
        name: "Mono Watch Identity",
        client: "Braun",
        deadline: now - 10 * day, // Overdue
        phase: "handoff" as const,
        description: "Minimalist watch line. Bauhaus-inspired dial design.",
        createdAt: now - 45 * day,
      },
    ];

    for (const sample of samples) {
      await ctx.db.insert("projects", sample);
    }
  },
});
