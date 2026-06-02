import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Tag, Clock, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Servicios | Admin Mi Piel" };

const categoryLabel: Record<string, string> = {
  FACIAL: "Facial", ARMPITS: "Axilas", BIKINI: "Bikini",
  LEGS: "Piernas", FULL_BODY: "Cuerpo completo",
  MENS: "Hombre", PACKAGE: "Paquete", OTHER: "Otro",
};

export default async function AdminServiciosPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const services = await prisma.service.findMany({ orderBy: { category: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
        <p className="text-sm text-muted-foreground mt-1">{services.length} servicios registrados</p>
      </div>

      <div className="grid gap-3">
        {services.map((s) => (
          <div key={s.id} className="card-premium p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {categoryLabel[s.category] ?? s.category}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{s.duration} min
              </span>
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <DollarSign className="w-3.5 h-3.5" />
                {s.price === 0 ? "Gratis" : `$${s.price.toLocaleString("es-MX")} MXN`}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {s.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
