import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreditCard, Receipt, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pagos | Mi Piel Veracruz" };

export default async function PagosPage() {
  const session = await auth();
  if (!session) redirect("/login");

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
          <div className="text-3xl font-bold text-foreground">$0</div>
          <div className="text-xs text-muted-foreground mt-1">Total pagado</div>
        </div>
        <div className="card-premium p-5 text-center">
          <div className="text-3xl font-bold text-primary">0</div>
          <div className="text-xs text-muted-foreground mt-1">Transacciones</div>
        </div>
      </div>

      {/* Empty state */}
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
    </div>
  );
}
