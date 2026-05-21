"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceStep } from "./service-step";
import { DateTimeStep } from "./datetime-step";
import { ConfirmStep } from "./confirm-step";
import { toast } from "@/hooks/use-toast";
import type { Service, Employee } from "@prisma/client";

type EmployeeWithUser = Employee & { user: { name: string | null; image: string | null } };

interface BookingWizardProps {
  services: Service[];
  employees: EmployeeWithUser[];
}

export type BookingData = {
  serviceId: string;
  service?: Service;
  employeeId?: string;
  startTime?: Date;
  notes?: string;
};

const STEPS = ["Servicio", "Fecha y hora", "Confirmar"];

export function BookingWizard({ services, employees }: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({ serviceId: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const canNext = () => {
    if (step === 0) return !!bookingData.serviceId;
    if (step === 1) return !!bookingData.startTime;
    return true;
  };

  const handleNext = () => {
    if (canNext()) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/agendar`);
      return;
    }

    setIsSubmitting(true);
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: bookingData.serviceId,
        employeeId: bookingData.employeeId,
        startTime: bookingData.startTime?.toISOString(),
        notes: bookingData.notes,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast({
        variant: "destructive",
        title: "Error al agendar",
        description: err.message || "Inténtalo de nuevo",
      });
      setIsSubmitting(false);
      return;
    }

    toast({ title: "¡Cita agendada!", description: "Te enviaremos un correo de confirmación." });
    router.push("/dashboard/citas");
  };

  return (
    <div className="card-premium overflow-hidden">
      {/* Progress steps */}
      <div className="flex border-b border-border/50">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors
              ${i === step ? "text-primary border-b-2 border-primary" : ""}
              ${i < step ? "text-emerald-600" : ""}
              ${i > step ? "text-muted-foreground" : ""}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0
                ${i === step ? "bg-primary text-white" : ""}
                ${i < step ? "bg-emerald-100 text-emerald-600" : ""}
                ${i > step ? "bg-muted text-muted-foreground" : ""}`}
            >
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className="hidden sm:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <ServiceStep
                services={services}
                selected={bookingData.serviceId}
                onSelect={(id, service) =>
                  setBookingData((d) => ({ ...d, serviceId: id, service }))
                }
              />
            )}
            {step === 1 && (
              <DateTimeStep
                service={bookingData.service!}
                employees={employees}
                selectedDate={bookingData.startTime}
                selectedEmployee={bookingData.employeeId}
                onSelect={(startTime, employeeId) =>
                  setBookingData((d) => ({ ...d, startTime, employeeId }))
                }
              />
            )}
            {step === 2 && (
              <ConfirmStep
                bookingData={bookingData}
                onNotesChange={(notes) => setBookingData((d) => ({ ...d, notes }))}
                isLoggedIn={!!session}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-muted/30">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Atrás
        </Button>

        {step < STEPS.length - 1 ? (
          <Button onClick={handleNext} disabled={!canNext()} variant="premium">
            Continuar
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} variant="premium">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {session ? "Confirmar cita" : "Iniciar sesión para confirmar"}
          </Button>
        )}
      </div>
    </div>
  );
}
