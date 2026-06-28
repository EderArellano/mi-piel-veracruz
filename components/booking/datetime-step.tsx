"use client";

import { useState, useEffect, useCallback } from "react";
import {
  format, addDays, addMonths, isSameDay, startOfDay, startOfMonth,
  endOfMonth, eachDayOfInterval, getDay, differenceInCalendarDays,
} from "date-fns";
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

const DAY_HEADERS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MAX_DAYS_AHEAD = 30;

// Monday-based grid: fills leading nulls until Mon
function buildMonthGrid(month: Date): (Date | null)[] {
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const leadingBlanks = (getDay(startOfMonth(month)) + 6) % 7;
  const grid: (Date | null)[] = Array(leadingBlanks).fill(null);
  days.forEach((d) => grid.push(d));
  return grid;
}

function MonthGrid({
  month,
  today,
  maxDate,
  pickedDate,
  onDateSelect,
}: {
  month: Date;
  today: Date;
  maxDate: Date;
  pickedDate: Date | null;
  onDateSelect: (d: Date) => void;
}) {
  const grid = buildMonthGrid(month);

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center text-sm font-semibold text-[#2B2B2B] capitalize mb-3">
        {format(month, "MMMM yyyy", { locale: es })}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-[#9CA3AF] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {grid.map((date, idx) => {
          if (!date) return <div key={`blank-${idx}`} />;

          const isPast = date < today;
          const isSunday = date.getDay() === 0;
          const isTooFar = date > maxDate;
          const disabled = isPast || isSunday || isTooFar;
          const isSelected = pickedDate ? isSameDay(date, pickedDate) : false;
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              className={cn(
                "mx-auto w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                disabled && "opacity-25 cursor-not-allowed text-[#9CA3AF]",
                isSelected && "bg-[#5F7C71] text-white shadow-md",
                !isSelected && !disabled && isToday && "ring-2 ring-[#5F7C71]/40 text-[#5F7C71] font-bold",
                !isSelected && !disabled && !isToday && "text-[#2B2B2B] hover:bg-[#5F7C71]/10 hover:text-[#5F7C71]"
              )}
            >
              {format(date, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DateTimeStep({ service, employees, selectedDate, selectedEmployee, onSelect }: DateTimeStepProps) {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, MAX_DAYS_AHEAD);

  const [baseMonth, setBaseMonth] = useState(startOfMonth(today));
  const [pickedDate, setPickedDate] = useState<Date | null>(selectedDate ?? null);
  const [pickedTime, setPickedTime] = useState<string | null>(
    selectedDate ? format(selectedDate, "HH:mm") : null
  );
  const [pickedEmployee, setPickedEmployee] = useState<string>(selectedEmployee ?? "");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const secondMonth = addMonths(baseMonth, 1);

  const canGoPrev = baseMonth > startOfMonth(today);

  const fetchBusySlots = useCallback(
    async (date: Date) => {
      setLoadingSlots(true);
      try {
        const url =
          `/api/availability?date=${date.toISOString()}&serviceId=${service.id}` +
          (pickedEmployee ? `&employeeId=${pickedEmployee}` : "");
        const res = await fetch(url);
        const data = await res.json();
        setBusySlots(data.busySlots ?? []);
      } finally {
        setLoadingSlots(false);
      }
    },
    [service.id, pickedEmployee]
  );

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#2B2B2B]">Elige fecha y hora</h2>
        <p className="text-sm text-[#6B6B6B] mt-1">
          {service.name} · {service.duration} minutos
        </p>
      </div>

      {/* Employee selector */}
      {employees.length > 0 && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] block mb-2">
            Especialista (opcional)
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPickedEmployee("")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
                pickedEmployee === ""
                  ? "border-[#5F7C71] bg-[#5F7C71]/8 text-[#5F7C71]"
                  : "border-[#E7E3DC] text-[#6B6B6B] hover:border-[#5F7C71]/30"
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
                    ? "border-[#5F7C71] bg-[#5F7C71]/8 text-[#5F7C71]"
                    : "border-[#E7E3DC] text-[#6B6B6B] hover:border-[#5F7C71]/30"
                )}
              >
                {emp.user.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dual-month calendar */}
      <div className="bg-white rounded-2xl border border-[#E7E3DC] p-4 shadow-[0_2px_12px_rgba(0,0,0,.05)]">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setBaseMonth((m) => addMonths(m, -1))}
            disabled={!canGoPrev}
            className={cn(
              "p-2 rounded-xl transition-colors",
              canGoPrev
                ? "hover:bg-[#F4F2EE] text-[#2B2B2B]"
                : "opacity-20 cursor-not-allowed text-[#9CA3AF]"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-2 text-xs text-[#9CA3AF] font-medium">
            <span className="capitalize text-[#5F7C71] font-semibold">
              {format(baseMonth, "MMMM", { locale: es })}
            </span>
            <span>·</span>
            <span className="capitalize text-[#5F7C71] font-semibold">
              {format(secondMonth, "MMMM", { locale: es })}
            </span>
          </div>

          <button
            onClick={() => setBaseMonth((m) => addMonths(m, 1))}
            className="p-2 rounded-xl hover:bg-[#F4F2EE] text-[#2B2B2B] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Two months */}
        <div className="flex flex-col sm:flex-row gap-6">
          <MonthGrid
            month={baseMonth}
            today={today}
            maxDate={maxDate}
            pickedDate={pickedDate}
            onDateSelect={handleDateSelect}
          />
          <div className="hidden sm:block w-px bg-[#E7E3DC] self-stretch" />
          <MonthGrid
            month={secondMonth}
            today={today}
            maxDate={maxDate}
            pickedDate={pickedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-[#E7E3DC] flex flex-wrap items-center gap-4 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#5F7C71]" />
            Seleccionado
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full ring-2 ring-[#5F7C71]/40" />
            Hoy
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#9CA3AF]/25" />
            No disponible
          </div>
        </div>
      </div>

      {/* Time slots */}
      {pickedDate && (
        <div className="bg-white rounded-2xl border border-[#E7E3DC] p-4 shadow-[0_2px_12px_rgba(0,0,0,.05)]">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#5F7C71]" />
            <span className="text-sm font-semibold text-[#2B2B2B] capitalize">
              {format(pickedDate, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>

          {loadingSlots ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#5F7C71]" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isBusy = busySlots.includes(time);
                  const isSelected = pickedTime === time;

                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isBusy}
                      className={cn(
                        "py-2.5 px-1 rounded-xl text-sm font-semibold border-2 transition-all",
                        // Busy — visible coral/red so client clearly sees "taken"
                        isBusy &&
                          "cursor-not-allowed border-[#FFCDD2] bg-[#FFF0F0] text-[#E57373] line-through",
                        // Selected
                        isSelected &&
                          "border-[#5F7C71] bg-[#5F7C71] text-white shadow-md",
                        // Available default
                        !isBusy &&
                          !isSelected &&
                          "border-[#E7E3DC] text-[#2B2B2B] hover:border-[#5F7C71]/50 hover:bg-[#5F7C71]/5 hover:text-[#5F7C71]"
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#E7E3DC] text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-[#5F7C71] bg-[#5F7C71]" />
                  Seleccionado
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-[#E7E3DC]" />
                  Disponible
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border-2 border-[#FFCDD2] bg-[#FFF0F0]" />
                  <span className="text-[#E57373]">Ocupado</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
