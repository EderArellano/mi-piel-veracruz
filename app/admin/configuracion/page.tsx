import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Settings, Phone, Mail, MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Configuración | Admin Mi Piel" };

export default async function AdminConfiguracionPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground mt-1">Datos de la clínica</p>
      </div>

      <div className="card-premium divide-y divide-border">
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nombre de la clínica</p>
            <p className="text-sm font-medium text-foreground mt-0.5">Mi Piel Centro Dermocosmético</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Teléfono</p>
            <p className="text-sm font-medium text-foreground mt-0.5">+52 229 933 00 14</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Correo</p>
            <p className="text-sm font-medium text-foreground mt-0.5">contacto@mipielveracruz.com</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dirección</p>
            <p className="text-sm font-medium text-foreground mt-0.5">Boca del Río, Veracruz, México</p>
          </div>
        </div>
        <div className="p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Horario</p>
            <p className="text-sm font-medium text-foreground mt-0.5">Lun–Vie 9:00–20:00 · Sáb 9:00–15:00</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Para modificar la configuración contáctanos en{" "}
        <a href="mailto:contacto@mipielveracruz.com" className="text-primary">contacto@mipielveracruz.com</a>
      </p>
    </div>
  );
}
