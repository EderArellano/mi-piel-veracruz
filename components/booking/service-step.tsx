"use client";

import { cn, SERVICE_CATEGORIES, formatCurrency } from "@/lib/utils";
import { Clock } from "lucide-react";
import type { Service } from "@prisma/client";

interface ServiceStepProps {
  services: Service[];
  selected: string;
  onSelect: (id: string, service: Service) => void;
}

export function ServiceStep({ services, selected, onSelect }: ServiceStepProps) {
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    const cat = s.category as keyof typeof SERVICE_CATEGORIES;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Elige tu servicio</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Selecciona el área de tratamiento que deseas
        </p>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {SERVICE_CATEGORIES[category as keyof typeof SERVICE_CATEGORIES] || category}
          </h3>
          <div className="space-y-2">
            {items.map((service) => (
              <button
                key={service.id}
                onClick={() => onSelect(service.id, service)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  selected === service.id
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <div>
                  <div className="font-medium text-foreground">{service.name}</div>
                  {service.description && (
                    <div className="text-xs text-muted-foreground mt-0.5">{service.description}</div>
                  )}
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="font-bold text-foreground">
                    {formatCurrency(service.price, service.currency)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 justify-end">
                    <Clock className="w-3 h-3" />
                    {service.duration} min
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
