import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tag } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Promociones | Admin Mi Piel" };

export default async function AdminPromocionesPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Promociones</h1>
        <p className="text-sm text-muted-foreground mt-1">Cupones y descuentos</p>
      </div>

      <div className="card-premium p-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
          <Tag className="w-6 h-6 text-primary" />
        </div>
        <p className="font-medium text-foreground">Módulo en desarrollo</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
          Pronto podrás crear cupones de descuento y promociones especiales para tus clientes.
        </p>
      </div>
    </div>
  );
}
