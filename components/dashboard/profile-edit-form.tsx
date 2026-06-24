"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  initialName: string;
  initialPhone: string | null;
}

export function ProfileEditForm({ initialName, initialPhone }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Error al guardar");
        return;
      }
      setEditing(false);
      router.refresh();
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(initialName);
    setPhone(initialPhone ?? "");
    setError(null);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditing(true)}
          className="gap-2"
        >
          <Pencil className="w-3.5 h-3.5" />
          Editar perfil
        </Button>
      </div>
    );
  }

  return (
    <div className="card-premium p-6 space-y-4">
      <p className="text-sm font-semibold text-foreground">Editar información</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nombre completo *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Teléfono</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            placeholder="229 000 0000"
            type="tel"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={loading}>
          <X className="w-3.5 h-3.5" />
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSave} disabled={loading} className="gap-2">
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          Guardar
        </Button>
      </div>
    </div>
  );
}
