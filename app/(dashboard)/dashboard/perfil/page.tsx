import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { User, Phone, Mail, Shield } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mi Perfil | Mi Piel Veracruz" };

export default async function PerfilPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true, role: true, createdAt: true },
  });

  if (!user) redirect("/login");

  const roleLabel: Record<string, string> = {
    CLIENT: "Cliente",
    ADMIN: "Administrador",
    EMPLOYEE: "Empleado",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi perfil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Información de tu cuenta
        </p>
      </div>

      {/* Avatar + name */}
      <div className="card-premium p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-primary">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">{user.name}</p>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary">
            {roleLabel[user.role] ?? user.role}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="card-premium divide-y divide-border">
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nombre completo</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{user.name ?? "—"}</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Correo electrónico</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{user.email}</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Teléfono</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{user.phone ?? "No registrado"}</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Miembro desde</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {new Date(user.createdAt).toLocaleDateString("es-MX", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Para actualizar tus datos contáctanos al{" "}
        <a href="tel:+522299330014" className="text-primary font-medium">229 933 00 14</a>
      </p>
    </div>
  );
}
