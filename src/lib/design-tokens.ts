// ─── Studio OS Design Tokens ─────────────────────────────────────────────────

export const STUDIO = {
  // Core palette
  white: "#ffffff",
  bg: "#f7f7f7",
  bgSubtle: "#fafafa",
  border: "#e8e8e8",
  borderLight: "#f0f0f0",
  text: "#111111",
  textSecondary: "#6b6b6b",
  textMuted: "#999999",
  dark: "#111111",
  neonGreen: "#C8E632",
  neonGreenDark: "#a8c41a",
} as const;

// Phase colors for project lifecycle
export const PHASE_COLORS = {
  brief: { bg: "#FFF3E0", text: "#E65100", dot: "#FF9800", label: "Brief" },
  concept: { bg: "#E8F5E9", text: "#1B5E20", dot: "#4CAF50", label: "Concept" },
  development: { bg: "#E3F2FD", text: "#0D47A1", dot: "#2196F3", label: "Development" },
  handoff: { bg: "#F3E5F5", text: "#4A148C", dot: "#9C27B0", label: "Handoff" },
} as const;

// Priority levels
export const PRIORITY_COLORS = {
  low: { bg: "#F1F5F9", text: "#64748B", label: "Low" },
  medium: { bg: "#FFF7ED", text: "#C2410C", label: "Medium" },
  high: { bg: "#FEF2F2", text: "#DC2626", label: "High" },
  urgent: { bg: "#FEF2F2", text: "#991B1B", label: "Urgent" },
} as const;

// Task status
export const STATUS_COLORS = {
  todo: { bg: "#F1F5F9", text: "#64748B", label: "To Do" },
  in_progress: { bg: "#DBEAFE", text: "#1D4ED8", label: "In Progress" },
  review: { bg: "#FEF3C7", text: "#D97706", label: "Review" },
  done: { bg: "#D1FAE5", text: "#059669", label: "Done" },
} as const;

// Briefing status
export const BRIEFING_STATUS_COLORS = {
  draft: { bg: "#F1F5F9", text: "#64748B", label: "Draft" },
  active: { bg: "#DBEAFE", text: "#1D4ED8", label: "Active" },
  completed: { bg: "#D1FAE5", text: "#059669", label: "Completed" },
} as const;

// Type definitions
export type Phase = keyof typeof PHASE_COLORS;
export type Priority = keyof typeof PRIORITY_COLORS;
export type TaskStatus = keyof typeof STATUS_COLORS;
export type BriefingStatus = keyof typeof BRIEFING_STATUS_COLORS;
