"use client";

import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden h-14 flex items-center gap-3 px-4 border-b border-studio-border bg-white sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-md hover:bg-studio-bg text-studio-text"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-studio-neon" />
        <span className="font-display text-sm font-bold tracking-tight text-studio-text uppercase">
          Studio OS
        </span>
      </div>
    </header>
  );
}
