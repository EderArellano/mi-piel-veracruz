"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service, Employee } from "@prisma/client";

type EmployeeWithUser = Employee & { user: { name: string | null; image: string | null } };

interface DateTimeStepProps {
  service: Service;
  employees: EmployeeWithUser[];
  selectedDate?: Date;
  selectedEmployee?: string;
  onSelect: (startTime: Date, employeeId?: string) => void;
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
];

export function DateTimeStep({ service, employees, selectedDate, selectedEmployee, onSelect }: DateTimeStepProps) {
  const today = startOfDay(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(today);
  const [pickedDate, setPickedDate] = useState<Date | null>(selectedDate || null);
  const [pickedTime, setPickedTime] = useState<string | null>(
    selectedDate ? format(selectedDate, "HH:mm") : null
  );
  const [pickedEmployee, setPickedEmployee] = useState<string>(selectedEmployee || "");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const fetchBusySlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    try {
      const res = await fetch(
        `/api/availability?date=${date.toISOString()}&serviceId=${service.id}${pickedEmployee ? `&employeeId=${pickedEmployee}` : ""}`
      );
      const data = await res.json();
      setBusySlots(data.busySlots || []);
    } finally {
      setLoadingSlots(false);
    }
  }, [service.id, pickedEmployee]);

  useEffect(() => {
    if (pickedDate) fetchBusySlots(pickedDate);
  }, [pickedDate, pickedEmployee, fetchBusySlots]);

  const handleDateSelect = (date: Date) => {
    setPickedDate(date);
    setPickedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    if (!pickedDate || busySlots.includes(time)) return;
    setPickedTime(time);
    const [h, m] = time.split(":").map(Number);
    const dt = new Date(pickedDate);
    dt.setHours(h, m, 0, 0);
    onSelect(dt, pickedEmployee || undefined);
  };

  const isSunday = (date: Date) => date.getDay() === 0;
  const isPast = (date: Date) => date < today;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Elige fecha y hora</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {service.name} · {service.duration} minutos
        </p>
      </div>

      {/* Employee selector */}
      {employees.length > 0 && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Especialista (opcional)
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPickedEmployee("")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
                pickedEmployee === ""
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              Cualquier especialista
            </button>
            {employees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setPickedEmployee(emp.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
                  pickedEmployee === emp.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                {emp.user.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCurrentWeekStart((d) => addDays(d, -7))}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            disabled={currentWeekStart <= today}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-foreground capitalize">
            {format(currentWeekStart, "MMMM yyyy", { locale: es })}
          </span>
          <button
            onClick={() => setCurrentWeekStart((d) => addDays(d, 7))}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
            <div key={d} className="text-center text-xs text-muted-foreground py-1 font-medium">
              {d}
            </div>
          ))}
          {weekDays.map((date) => {
            const disabled = isPast(date) || isSunday(date);
            const isSelected = pickedDate && isSameDay(date, pickedDate);
            const isToday = isSameDay(date, new Date());

            return (
              <button
                key={date.toISOString()}
                onClick={() => !disabled && handleDateSelect(date)}
                disabled={disabled}
                className={cn(
                  "aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                  disabled && "opacity-30 cursor-not-allowed",
                  isSelected && "bg-primary text-white shadow-premium",
                  !isSelected && !disabled && isToday && "ring-2 ring-primary/30 text-primary",
                  !isSelected && !disabled && !isToday && "hover:bg-muted"
                )}
              >
                {format(date, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {pickedDate && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Horarios disponibles – {format(pickedDate, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>

          {loadingSlots ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {TIME_SLOTS.map((time) => {
                const isBusy = busySlots.includes(time);
                const isSelected = pickedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    disabled={isBusy}
                    className={cn(
                      "py-2.5 px-1 rounded-xl text-sm font-medium border-2 transition-all",
                      isBusy && "opacity-30 cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through",
                      isSelected && "border-primary bg-primary text-white",
                      !isBusy && !isSelected && "border-border hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded border-2 border-primary bg-primary" />
              Seleccionado
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded border-2 border-border bg-muted/50 opacity-30" />
              No disponible
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
