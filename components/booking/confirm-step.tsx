"use client";

import Link from "next/link";
import { Calendar, Clock, DollarSign, AlertCircle, LogIn } from "lucide-react";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { BookingData } from "./booking-wizard";

interface ConfirmStepProps {
  bookingData: BookingData;
  onNotesChange: (notes: string) => void;
  isLoggedIn: boolean;
}

export function ConfirmStep({ bookingData, onNotesChange, isLoggedIn }: ConfirmStepProps) {
  const { service, startTime, notes } = bookingData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Confirmar tu cita</h2>
        <p className="text-sm text-muted-foreground mt-1">Revisa los detalles antes de confirmar</p>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl bg-muted/40 border border-border/50 divide-y divide-border/50">
        <div className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg">✨</span>
          </div>
          <div>
            <div className="font-semibold text-foreground">{service?.name}</div>
            <div className="text-sm text-muted-foreground">{service?.duration} minutos</div>
          </div>
        </div>

        {startTime && (
          <div className="flex items-center gap-3 p-4">
            <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{formatDate(startTime)}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(startTime)}
              </div>
            </div>
          </div>
        )}

        {service && (
          <div className="flex items-center gap-3 p-4">
            <DollarSign className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">
                {formatCurrency(service.price, service.currency)}
              </div>
              <div className="text-xs text-muted-foreground">Pago en clínica</div>
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Notas adicionales (opcional)
        </label>
        <textarea
          value={notes || ""}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="¿Tienes alguna alergia, condición especial o pregunta para tu especialista?"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow resize-none"
        />
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-sky-900 mb-2">Preparación para tu cita</h4>
            <ul className="space-y-1">
              {[
                "Rasurate 24–48h antes de la cita",
                "No apliques crema ni desodorante el día de la sesión",
                "Evita el sol 48h antes del tratamiento",
                "Llega 5 minutos antes de tu cita",
              ].map((r) => (
                <li key={r} className="text-xs text-amber-800 flex items-start gap-1.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Auth warning */}
      {!isLoggedIn && (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 flex items-center gap-3">
          <LogIn className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">Necesitas iniciar sesión para confirmar</p>
            <p className="text-xs text-muted-foreground">Tu cita se guardará al iniciar sesión</p>
          </div>
          <Button asChild size="sm" variant="premium">
            <Link href="/login?callbackUrl=/agendar">Iniciar sesión</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
