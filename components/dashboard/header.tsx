"use client";

import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardHeader({ user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border/50 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      {/* Mobile menu */}
      <button className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors">
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar..."
            className="w-full h-9 pl-9 pr-4 text-sm bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </Button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-foreground leading-none">{user.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center shrink-0">
            {user.image ? (
              <Image src={user.image} alt={user.name || ""} width={36} height={36} className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-white">
                {getInitials(user.name || user.email || "U")}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
