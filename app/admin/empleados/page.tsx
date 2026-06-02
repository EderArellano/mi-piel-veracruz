import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Empleados | Admin Mi Piel" };

export default async function AdminEmpleadosPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const employees = await prisma.employee.findMany({
    include: { user: { select: { name: true, email: true, phone: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Empleados</h1>
        <p className="text-sm text-muted-foreground mt-1">{employees.length} empleados registrados</p>
      </div>

      {employees.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Sin empleados aún</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {employees.map((emp) => (
            <div key={emp.id} className="card-premium p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0 text-primary font-bold">
                {emp.user.name?.charAt(0) ?? "E"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{emp.user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{emp.user.email}</p>
                {emp.specialties.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {emp.specialties.join(" · ")}
                  </p>
                )}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${emp.isActive ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                {emp.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
