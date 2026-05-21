"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, isSameHour } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar, List, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APPOINTMENT_STATUSES, formatTime } from "@/lib/utils";
import type { Appointment, Service, Employee } from "@prisma/client";

type AppointmentFull = Appointment & {
  service: Service;
  user: { name: string | null; email: string | null; phone: string | null };
  employee: (Employee & { user: { name: string | null } }) | null;
};

type ViewMode = "day" | "week" | "list";

interface AdminCalendarProps {
  appointments: AppointmentFull[];
}

export function AdminCalendar({ appointments }: AdminCalendarProps) {
  const [view, setView] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState<AppointmentFull | null>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 11 }, (_, i) => i + 9);

  const getDayAppointments = (date: Date) =>
    appointments.filter((a) => isSameDay(new Date(a.startTime), date));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {appointments.length} citas próximas
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-xl border border-border overflow-hidden">
            {([["list", List], ["week", Grid3X3], ["day", Calendar]] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`p-2.5 transition-colors ${
                  view === v ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentDate((d) => {
                  const n = new Date(d);
                  if (view === "week") n.setDate(d.getDate() - 7);
                  else n.setDate(d.getDate() - 1);
                  return n;
                })
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentDate((d) => {
                  const n = new Date(d);
                  if (view === "week") n.setDate(d.getDate() + 7);
                  else n.setDate(d.getDate() + 1);
                  return n;
                })
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="card-premium divide-y divide-border/50">
          {appointments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No hay citas</div>
          ) : (
            appointments.map((apt) => {
              const status = APPOINTMENT_STATUSES[apt.status];
              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelected(apt)}
                >
                  <div className="w-14 text-center shrink-0">
                    <div className="text-xs text-muted-foreground uppercase">
                      {format(new Date(apt.startTime), "EEE", { locale: es })}
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {format(new Date(apt.startTime), "d")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{apt.user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {apt.service.name} · {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
                    </div>
                  </div>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Week view */}
      {view === "week" && (
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Day headers */}
              <div className="grid grid-cols-8 border-b border-border/50">
                <div className="p-3 border-r border-border/50" />
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`p-3 text-center border-r border-border/50 last:border-r-0 ${
                      isSameDay(day, new Date()) ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="text-xs text-muted-foreground uppercase">
                      {format(day, "EEE", { locale: es })}
                    </div>
                    <div
                      className={`text-lg font-bold mt-0.5 ${
                        isSameDay(day, new Date()) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time grid */}
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-border/30 min-h-[60px]">
                  <div className="p-2 text-xs text-muted-foreground border-r border-border/50 flex items-start">
                    {hour}:00
                  </div>
                  {weekDays.map((day) => {
                    const dayApts = getDayAppointments(day).filter((a) =>
                      isSameHour(new Date(a.startTime), new Date(day.setHours(hour)))
                    );
                    return (
                      <div
                        key={day.toISOString()}
                        className="border-r border-border/30 last:border-r-0 p-1 space-y-0.5"
                      >
                        {dayApts.map((apt) => (
                          <button
                            key={apt.id}
                            onClick={() => setSelected(apt)}
                            className="w-full text-left px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                          >
                            <div className="text-xs font-medium text-primary truncate">
                              {apt.user.name}
                            </div>
                            <div className="text-[10px] text-primary/70 truncate">
                              {apt.service.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Appointment detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-premium-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-lg">Detalle de cita</h3>
              <Badge className={APPOINTMENT_STATUSES[selected.status].color}>
                {APPOINTMENT_STATUSES[selected.status].label}
              </Badge>
            </div>
            <div className="space-y-3">
              {[
                { label: "Cliente", value: selected.user.name },
                { label: "Servicio", value: selected.service.name },
                { label: "Fecha", value: format(new Date(selected.startTime), "PPP", { locale: es }) },
                { label: "Hora", value: `${formatTime(selected.startTime)} – ${formatTime(selected.endTime)}` },
                { label: "Especialista", value: selected.employee?.user.name || "Sin asignar" },
                { label: "Email", value: selected.user.email },
                { label: "Teléfono", value: selected.user.phone || "–" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
              {selected.notes && (
                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground block mb-1">Notas</span>
                  <p className="text-sm text-foreground">{selected.notes}</p>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => setSelected(null)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
