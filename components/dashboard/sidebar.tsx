"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Calendar, Clock, FileText, CreditCard, User,
  Settings, LogOut, Sparkles, Users, BarChart3, BookOpen, Tag,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const clientNav = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/dashboard/citas", label: "Mis Citas", icon: Calendar },
  { href: "/dashboard/historial", label: "Historial", icon: Clock },
  { href: "/dashboard/expediente", label: "Mi Expediente", icon: FileText },
  { href: "/dashboard/pagos", label: "Pagos", icon: CreditCard },
  { href: "/dashboard/perfil", label: "Mi Perfil", icon: User },
];

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/agenda", label: "Agenda", icon: Calendar },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/servicios", label: "Servicios", icon: Tag },
  { href: "/admin/empleados", label: "Empleados", icon: Users },
  { href: "/admin/pagos", label: "Pagos", icon: CreditCard },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/promociones", label: "Promociones", icon: Tag },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

interface SidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = role === "ADMIN";
  const nav = isAdmin ? adminNav : clientNav;

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-border/50 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border/50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="leading-none">
          <span className="text-[15px] font-bold text-foreground block">Mi Piel</span>
          <span className="text-[11px] text-muted-foreground tracking-widest uppercase block">
            {isAdmin ? "Admin" : "Veracruz"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* AI Chat — future */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-sky-50 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Asistente IA</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">Próximamente</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Consulta sobre cuidado de la piel con IA
            </p>
          </div>
        </div>
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
