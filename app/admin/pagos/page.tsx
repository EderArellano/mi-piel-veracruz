import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreditCard, TrendingUp, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pagos | Admin Mi Piel" };

export default async function AdminPagosPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const [payments, monthlyTotal, totalRevenue] = await Promise.all([
    prisma.payment.findMany({
      include: { appointment: { include: { user: true, service: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.payment.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
      },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pagos</h1>
        <p className="text-sm text-muted-foreground mt-1">Historial de transacciones</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card-premium p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Este mes</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            ${(monthlyTotal._sum.amount ?? 0).toLocaleString("es-MX")}
          </div>
          <div className="text-xs text-muted-foreground">MXN</div>
        </div>
        <div className="card-premium p-5">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total acumulado</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            ${(totalRevenue._sum.amount ?? 0).toLocaleString("es-MX")}
          </div>
          <div className="text-xs text-muted-foreground">MXN</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Sin pagos registrados</p>
        </div>
      ) : (
        <div className="card-premium divide-y divide-border">
          {payments.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {p.appointment?.user?.name ?? "Cliente"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {p.appointment?.service?.name ?? "Servicio"} ·{" "}
                  {new Date(p.createdAt).toLocaleDateString("es-MX")}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-foreground">
                  ${Number(p.amount).toLocaleString("es-MX")} MXN
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  p.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600" :
                  p.status === "PENDING" ? "bg-amber-50 text-amber-600" :
                  "bg-red-50 text-red-500"
                }`}>
                  {p.status === "COMPLETED" ? "Completado" : p.status === "PENDING" ? "Pendiente" : p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
