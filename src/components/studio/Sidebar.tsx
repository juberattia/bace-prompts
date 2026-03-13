"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Wand2,
  Box,
  Palette,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/briefings", label: "Briefings", icon: FileText },
  { href: "/prompt-builder", label: "Prompt Builder", icon: Wand2 },
  { href: "/viewer", label: "3D Viewer", icon: Box },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-white border-r border-studio-border
          flex flex-col z-50
          transition-transform duration-200 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-studio-border">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="w-2 h-2 rounded-full bg-studio-neon" />
            <span className="font-display text-sm font-bold tracking-tight text-studio-text uppercase">
              Studio OS
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-studio-bg text-studio-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-mono
                  transition-colors duration-100
                  ${
                    active
                      ? "bg-studio-text text-white"
                      : "text-studio-secondary hover:bg-studio-bg hover:text-studio-text"
                  }
                `}
              >
                <item.icon size={16} strokeWidth={active ? 2 : 1.5} />
                {item.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-studio-neon" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider + external link */}
        <div className="px-3 pb-4">
          <div className="border-t border-studio-border pt-3">
            <Link
              href="/prompts"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-mono text-studio-secondary hover:bg-studio-bg hover:text-studio-text transition-colors"
            >
              <Palette size={16} strokeWidth={1.5} />
              bace Visual System
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
