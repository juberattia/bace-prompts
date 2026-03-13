import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("briefings")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("briefings")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("briefings") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
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
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("active"),
        v.literal("completed")
      )
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("briefings", {
      projectId: args.projectId,
      title: args.title,
      projectContext: args.projectContext,
      targetUser: args.targetUser,
      constraints: args.constraints,
      materials: args.materials,
      dimensions: args.dimensions,
      references: args.references,
      deliverables: args.deliverables,
      deadline: args.deadline,
      status: args.status ?? "draft",
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("briefings"),
    title: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
    projectContext: v.optional(v.string()),
    targetUser: v.optional(v.string()),
    constraints: v.optional(v.string()),
    materials: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    references: v.optional(v.string()),
    deliverables: v.optional(v.string()),
    deadline: v.optional(v.number()),
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

export const updateStatus = mutation({
  args: {
    id: v.id("briefings"),
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("briefings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Seed sample briefings
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("briefings").first();
    if (existing) return;

    const projects = await ctx.db.query("projects").collect();
    const now = Date.now();
    const day = 1000 * 60 * 60 * 24;

    const samples = [
      {
        projectId: projects[0]?._id,
        title: "Aria Chair — Initial Design Brief",
        projectContext: "Modular seating system for open-plan offices. Client wants three sizes that stack and nest.",
        targetUser: "Office workers, facilities managers, interior designers",
        constraints: "Must be stackable (min 6 high). Weight under 5kg per unit. BIFMA certified.",
        materials: "Recycled polypropylene shell, powder-coated steel frame, optional upholstered seat pad",
        dimensions: "Seat height 450mm, width range 440–560mm across three sizes",
        references: "Vitra Tip Ton, HAY About a Chair, Arper Catifa",
        deliverables: "Concept sketches, 3D model, material samples, 1:1 prototype",
        deadline: now + 14 * day,
        status: "active" as const,
      },
      {
        projectId: projects[1]?._id,
        title: "Forma Kitchen — Concept Development",
        projectContext: "Premium handleless kitchen with integrated LED lighting. Matte lacquer finishes in 12 colors.",
        targetUser: "High-end residential, architects, kitchen showrooms",
        constraints: "Handle-free push-to-open mechanism. IP44 rated lighting. Soft-close throughout.",
        materials: "MDF core, matte lacquer finish, anodized aluminum profiles, opal LED diffuser",
        deliverables: "Detailed concept renders, technical sections, material board",
        deadline: now + 30 * day,
        status: "draft" as const,
      },
      {
        title: "General — Studio Identity Refresh",
        projectContext: "Update studio visual identity for 2026. Modernize logo, stationery, and digital presence.",
        targetUser: "Potential clients, press, design community",
        deliverables: "Logo variations, brand guidelines PDF, social media templates",
        status: "completed" as const,
      },
    ];

    for (const sample of samples) {
      await ctx.db.insert("briefings", { ...sample, createdAt: now });
    }
  },
});
