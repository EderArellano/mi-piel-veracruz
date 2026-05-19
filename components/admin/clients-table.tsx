"use client";

import { useState } from "react";
import { Search, Users, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getInitials, formatDate } from "@/lib/utils";

interface Client {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  createdAt: Date;
  medicalRecord: { totalSessions: number; skinType: string | null } | null;
  _count: { appointments: number };
}

interface AdminClientsTableProps {
  clients: Client[];
}

export function AdminClientsTable({ clients }: AdminClientsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground text-sm mt-1">{clients.length} clientes registrados</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 h-11 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                {["Cliente", "Teléfono", "Sesiones", "Citas", "Registro", "Acciones"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No se encontraron clientes
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">
                            {getInitials(client.name || client.email || "?")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{client.name}</div>
                          <div className="text-xs text-muted-foreground">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {client.phone || "–"}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-primary">
                        {client.medicalRecord?.totalSessions || 0}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {client._count.appointments}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {formatDate(client.createdAt, "d MMM yyyy")}
                    </td>
                    <td className="px-5 py-4">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/clientes/${client.id}`}>
                          <Eye className="w-4 h-4" />
                          Ver
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
