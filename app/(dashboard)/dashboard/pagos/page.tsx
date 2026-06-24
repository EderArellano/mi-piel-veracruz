import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreditCard, Receipt, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pagos | Mi Piel Veracruz" };

export default async function PagosPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      appointment: {
        select: {
          service: { select: { name: true } },
          startTime: true,
        },
      },
    },
  });

  const totalPaid = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const statusLabel: Record<string, string> = {
    PENDING: "Pendiente",
    PROCESSING: "Procesando",
    COMPLETED: "Completado",
    FAILED: "Fallido",
    REFUNDED: "Reembolsado",
    CANCELLED: "Cancelado",
  };

  const statusColor: Record<string, string> = {
    PENDING: "text-amber-600 bg-amber-50 border-amber-200",
    PROCESSING: "text-blue-600 bg-blue-50 border-blue-200",
    COMPLETED: "text-emerald-600 bg-emerald-50 border-emerald-200",
    FAILED: "text-red-600 bg-red-50 border-red-200",
    REFUNDED: "text-gray-600 bg-gray-50 border-gray-200",
    CANCELLED: "text-gray-600 bg-gray-50 border-gray-200",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mis pagos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Historial de transacciones y facturas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-premium p-5 text-center">
          <div className="text-3xl font-bold text-foreground">
            ${totalPaid.toLocaleString("es-MX")}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Total pagado</div>
        </div>
        <div className="card-premium p-5 text-center">
          <div className="text-3xl font-bold text-primary">{payments.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Transacciones</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-6 h-6 text-primary" />
          </div>
          <p className="font-medium text-foreground">Sin pagos registrados</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            Los pagos de tus citas aparecerán aquí una vez que sean procesados.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="w-4 h-4" />
            <span>Pagos seguros procesados en clínica</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>El historial se actualiza tras cada sesión</span>
          </div>
        </div>
      ) : (
        <div className="card-premium divide-y divide-border">
          {payments.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {p.appointment?.service?.name ?? "Servicio"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.appointment?.startTime
                      ? new Date(p.appointment.startTime).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date(p.createdAt).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    statusColor[p.status] ?? "text-gray-600 bg-gray-50 border-gray-200"
                  }`}
                >
                  {statusLabel[p.status] ?? p.status}
                </span>
                <span className="text-sm font-bold text-foreground">
                  ${(p.amount ?? 0).toLocaleString("es-MX")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
