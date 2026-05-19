"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { formatDate, formatTime, APPOINTMENT_STATUSES, formatCurrency } from "@/lib/utils";
import type { Appointment, Service, Employee, User, Payment } from "@prisma/client";

type AppointmentFull = Appointment & {
  service: Service;
  employee: (Employee & { user: { name: string | null; image: string | null } }) | null;
  payment: Payment | null;
};

interface ClientAppointmentsProps {
  appointments: AppointmentFull[];
}

export function ClientAppointments({ appointments: initialAppointments }: ClientAppointmentsProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");

  const now = new Date();

  const filtered = appointments.filter((a) => {
    const dt = new Date(a.startTime);
    if (filter === "upcoming") return dt >= now && !["CANCELLED", "NO_SHOW"].includes(a.status);
    if (filter === "past") return dt < now || ["COMPLETED", "CANCELLED", "NO_SHOW"].includes(a.status);
    return true;
  });

  const handleCancel = async (id: string) => {
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast({ variant: "destructive", title: "Error al cancelar" });
      return;
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED" } : a))
    );
    toast({ title: "Cita cancelada" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Citas</h1>
          <p className="text-muted-foreground text-sm mt-1">{appointments.length} citas en total</p>
        </div>
        <Button asChild variant="premium" size="sm">
          <Link href="/agendar">
            <Calendar className="w-4 h-4" />
            Nueva cita
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {([
          ["upcoming", "Próximas"],
          ["past", "Pasadas"],
          ["all", "Todas"],
        ] as const).map(([val, label]) => (
          <Button
            key={val}
            variant={filter === val ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(val)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 card-premium">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Sin citas</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {filter === "upcoming" ? "No tienes citas próximas." : "No hay citas en esta categoría."}
          </p>
          <Button asChild variant="premium">
            <Link href="/agendar">Agendar cita</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt, i) => {
            const status = APPOINTMENT_STATUSES[apt.status];
            const upcoming = new Date(apt.startTime) >= now;
            const canCancel = upcoming && !["CANCELLED", "NO_SHOW", "COMPLETED"].includes(apt.status);

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-premium p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-foreground">{apt.service.name}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(apt.startTime)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
                      </div>
                      {apt.employee && (
                        <span>con {apt.employee.user.name}</span>
                      )}
                    </div>

                    {apt.payment && (
                      <Badge variant="success" className="text-xs">
                        Pagado · {formatCurrency(apt.payment.amount, apt.payment.currency)}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  {canCancel && (
                    <div className="flex items-center gap-2 shrink-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/agendar?reschedule=${apt.id}`}>
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reagendar
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/5"
                        onClick={() => handleCancel(apt.id)}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
