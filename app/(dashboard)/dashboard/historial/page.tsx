import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Historial | Mi Piel Veracruz" };

const statusLabel: Record<string, { label: string; color: string }> = {
  COMPLETED:   { label: "Completada",  color: "text-emerald-600 bg-emerald-50" },
  CANCELLED:   { label: "Cancelada",   color: "text-red-500 bg-red-50" },
  NO_SHOW:     { label: "No asistió",  color: "text-orange-500 bg-orange-50" },
  RESCHEDULED: { label: "Reagendada",  color: "text-sky-600 bg-sky-50" },
  CONFIRMED:   { label: "Confirmada",  color: "text-primary bg-primary/8" },
  PENDING:     { label: "Pendiente",   color: "text-muted-foreground bg-muted" },
  IN_PROGRESS: { label: "En proceso",  color: "text-primary bg-primary/8" },
};

export default async function HistorialPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: { service: true },
    orderBy: { startTime: "desc" },
  });

  const completed = appointments.filter((a) => a.status === "COMPLETED");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Historial de citas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Todas tus sesiones pasadas en MiPiel
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 text-center">
          <div className="text-3xl font-bold text-foreground">{appointments.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total de citas</div>
        </div>
        <div className="card-premium p-5 text-center">
          <div className="text-3xl font-bold text-primary">{completed.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Completadas</div>
        </div>
        <div className="card-premium p-5 text-center col-span-2 sm:col-span-1">
          <div className="text-3xl font-bold text-foreground">
            {appointments.filter((a) => a.status === "CANCELLED").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Canceladas</div>
        </div>
      </div>

      {/* Lista */}
      {appointments.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Sin historial aún</p>
          <p className="text-sm text-muted-foreground mt-1">
            Tus citas completadas aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appt) => {
            const status = statusLabel[appt.status] ?? statusLabel.PENDING;
            return (
              <div key={appt.id} className="card-premium p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                  {appt.status === "COMPLETED" ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : appt.status === "CANCELLED" ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {appt.service.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(appt.startTime).toLocaleDateString("es-MX", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${status.color}`}>
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
