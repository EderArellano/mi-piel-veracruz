"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Algo salió mal</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Ocurrió un error inesperado. Puedes intentarlo de nuevo o contactar soporte si el problema persiste.
      </p>
      <Button onClick={reset} variant="outline">
        <RefreshCw className="w-4 h-4" />
        Intentar de nuevo
      </Button>
    </div>
  );
}
