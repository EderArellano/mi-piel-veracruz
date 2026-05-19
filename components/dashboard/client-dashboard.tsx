"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, Camera, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime, APPOINTMENT_STATUSES } from "@/lib/utils";
import type { Appointment, Service, Employee, User, MedicalRecord } from "@prisma/client";

type AppointmentWithRelations = Appointment & {
  service: Service;
  employee: (Employee & { user: User }) | null;
};

interface ClientDashboardProps {
  user: { name?: string | null; id?: string | null };
  upcomingAppointments: AppointmentWithRelations[];
  medicalRecord: MedicalRecord | null;
}

export function ClientDashboard({ user, upcomingAppointments, medicalRecord }: ClientDashboardProps) {
  const firstName = user.name?.split(" ")[0] || "Hola";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">
          ¡Hola, {firstName}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Bienvenida a tu panel de Mi Piel Veracruz
        </p>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Link href="/agendar">
          <div className="card-premium p-6 hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Agendar cita</h3>
            <p className="text-xs text-muted-foreground">Reserva tu próxima sesión</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:text-primary transition-colors" />
          </div>
        </Link>

        <Link href="/dashboard/expediente">
          <div className="card-premium p-6 hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Camera className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Mi expediente</h3>
            <p className="text-xs text-muted-foreground">Fotos y seguimiento</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:text-amber-500 transition-colors" />
          </div>
        </Link>

        <Link href="/dashboard/historial">
          <div className="card-premium p-6 hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Historial</h3>
            <p className="text-xs text-muted-foreground">Tus sesiones anteriores</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:text-violet-500 transition-colors" />
          </div>
        </Link>
      </motion.div>

      {/* Progress stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-premium p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-foreground">Tu progreso</h2>
            <p className="text-xs text-muted-foreground">Seguimiento de tu tratamiento</p>
          </div>
          <Badge variant="default" className="gap-1">
            <Sparkles className="w-3 h-3" />
            {medicalRecord?.totalSessions || 0} sesiones
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Sesiones realizadas", value: medicalRecord?.totalSessions || 0, color: "text-primary" },
            { label: "Zonas tratadas", value: "–", color: "text-amber-500" },
            { label: "Próxima cita", value: upcomingAppointments.length > 0 ? formatDate(upcomingAppointments[0].startTime, "d MMM") : "Sin cita", color: "text-blue-500" },
            { label: "Reducción estimada", value: medicalRecord?.totalSessions ? `${Math.min(medicalRecord.totalSessions * 15, 95)}%` : "–", color: "text-emerald-500" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-muted/50">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-foreground">Próximas citas</h2>
            <p className="text-xs text-muted-foreground">Tus citas confirmadas</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/citas">
              Ver todas
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Sin citas próximas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Agenda tu primera sesión y comienza tu transformación
            </p>
            <Button asChild size="sm" variant="premium">
              <Link href="/agendar">Agendar ahora</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => {
              const statusInfo = APPOINTMENT_STATUSES[apt.status];
              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-foreground text-sm truncate">
                        {apt.service.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(apt.startTime)} · {formatTime(apt.startTime)}
                      {apt.employee && ` · ${apt.employee.user.name}`}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/citas/${apt.id}`}>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-gradient-to-r from-primary/5 to-rose-50 border border-primary/10 p-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Recomendaciones de cuidado</h3>
            <ul className="space-y-1.5">
              {[
                "Evita el sol 48h antes y después de cada sesión",
                "Rasurate 24–48h antes de tu próxima cita",
                "Hidrata la piel diariamente con crema sin fragancia",
                "Evita piscinas, sauna y ejercicio intenso las primeras 24h",
              ].map((rec) => (
                <li key={rec} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
