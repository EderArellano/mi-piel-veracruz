"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Error en el panel de admin</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Error al cargar datos. Verifica la conexión a base de datos o contacta soporte.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground font-mono mb-4">ID: {error.digest}</p>
      )}
      <Button onClick={reset} variant="outline">
        <RefreshCw className="w-4 h-4" />
        Reintentar
      </Button>
    </div>
  );
}
