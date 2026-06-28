"use client";

import { useState, useEffect, useCallback } from "react";
import {
  format, addDays, addMonths, subMonths, isSameDay, startOfDay,
  startOfMonth, endOfMonth, eachDayOfInterval, getDay,
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

// Sunday-first (Dom Lun Mar Mié Jue Vie Sáb)
const DAY_HEADERS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MAX_DAYS_AHEAD = 30;

function buildMonthGrid(month: Date): (Date | null)[] {
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  // getDay() already returns 0=Sun, so no offset needed for Sunday-first
  const leadingBlanks = getDay(startOfMonth(month));
  return [...Array(leadingBlanks).fill(null), ...days];
}

function MonthCalendar({
  month,
  today,
  maxDate,
  pickedDate,
  onSelect,
}: {
  month: Date;
  today: Date;
  maxDate: Date;
  pickedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const grid = buildMonthGrid(month);

  return (
    <div>
      {/* Month name */}
      <p className="text-center text-base font-bold text-[#2B2B2B] capitalize mb-4">
        {format(month, "MMMM yyyy", { locale: es })}
      </p>

      {/* Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-[#9CA3AF] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1.5">
        {grid.map((date, idx) => {
          if (!date) return <div key={`b-${idx}`} />;

          const isPast   = date < today;
          const isSun    = date.getDay() === 0;
          const isTooFar = date > maxDate;
          const disabled = isPast || isSun || isTooFar;
          const isSelected = pickedDate ? isSameDay(date, pickedDate) : false;
          const isToday  = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              className={cn(
                "mx-auto w-full aspect-square max-w-[46px] rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-150",
                disabled
                  ? "opacity-25 cursor-not-allowed text-[#9CA3AF]"
                  : isSelected
                  ? "bg-[#5F7C71] text-white shadow-lg scale-105"
                  : isToday
                  ? "ring-2 ring-[#5F7C71] text-[#5F7C71]"
                  : "text-[#2B2B2B] hover:bg-[#5F7C71]/10 hover:text-[#5F7C71]"
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

export function DateTimeStep({
  service,
  employees,
  selectedDate,
  selectedEmployee,
  onSelect,
}: DateTimeStepProps) {
  const today   = startOfDay(new Date());
  const maxDate = addDays(today, MAX_DAYS_AHEAD);

  const [baseMonth, setBaseMonth]       = useState(startOfMonth(today));
  const [pickedDate, setPickedDate]     = useState<Date | null>(selectedDate ?? null);
  const [pickedTime, setPickedTime]     = useState<string | null>(
    selectedDate ? format(selectedDate, "HH:mm") : null
  );
  const [pickedEmployee, setPickedEmployee] = useState<string>(selectedEmployee ?? "");
  const [busySlots, setBusySlots]       = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const nextMonth   = addMonths(baseMonth, 1);
  const canGoPrev   = baseMonth > startOfMonth(today);

  const fetchBusySlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    try {
      const url =
        `/api/availability?date=${date.toISOString()}&serviceId=${service.id}` +
        (pickedEmployee ? `&employeeId=${pickedEmployee}` : "");
      const data = await (await fetch(url)).json();
      setBusySlots(data.busySlots ?? []);
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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-[#2B2B2B]">Elige fecha y hora</h2>
        <p className="text-sm text-[#6B6B6B] mt-0.5">
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
                  : "border-[#E7E3DC] text-[#6B6B6B] hover:border-[#5F7C71]/40"
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
                    : "border-[#E7E3DC] text-[#6B6B6B] hover:border-[#5F7C71]/40"
                )}
              >
                {emp.user.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CALENDAR ── */}
      <div className="bg-white rounded-2xl border border-[#E7E3DC] shadow-[0_2px_16px_rgba(0,0,0,.06)] overflow-hidden">

        {/* Navigation bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E7E3DC] bg-[#FAFAF8]">
          <button
            onClick={() => setBaseMonth((m) => subMonths(m, 1))}
            disabled={!canGoPrev}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
              canGoPrev ? "hover:bg-[#E7E3DC] text-[#2B2B2B]" : "opacity-20 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 text-sm font-semibold text-[#5F7C71] capitalize">
            <span>{format(baseMonth, "MMMM", { locale: es })}</span>
            <span className="text-[#E7E3DC]">|</span>
            <span>{format(nextMonth, "MMMM", { locale: es })}</span>
          </div>

          <button
            onClick={() => setBaseMonth((m) => addMonths(m, 1))}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#E7E3DC] text-[#2B2B2B] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Two months stacked */}
        <div className="px-5 pt-5 pb-4 space-y-7">
          <MonthCalendar
            month={baseMonth}
            today={today}
            maxDate={maxDate}
            pickedDate={pickedDate}
            onSelect={handleDateSelect}
          />
          <div className="border-t border-dashed border-[#E7E3DC]" />
          <MonthCalendar
            month={nextMonth}
            today={today}
            maxDate={maxDate}
            pickedDate={pickedDate}
            onSelect={handleDateSelect}
          />
        </div>

        {/* Calendar legend */}
        <div className="px-5 py-3 border-t border-[#E7E3DC] bg-[#FAFAF8] flex flex-wrap gap-4 text-xs text-[#9CA3AF]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#5F7C71] inline-block" />
            Seleccionado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full ring-2 ring-[#5F7C71] inline-block" />
            Hoy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E7E3DC] opacity-50 inline-block" />
            No disponible / Dom
          </span>
        </div>
      </div>

      {/* ── TIME SLOTS ── */}
      {pickedDate && (
        <div className="bg-white rounded-2xl border border-[#E7E3DC] shadow-[0_2px_16px_rgba(0,0,0,.06)] overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-[#E7E3DC] bg-[#FAFAF8] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5F7C71]" />
            <span className="text-sm font-semibold text-[#2B2B2B] capitalize">
              {format(pickedDate, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>

          <div className="px-5 py-4">
            {loadingSlots ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#5F7C71]" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {TIME_SLOTS.map((time) => {
                    const isBusy     = busySlots.includes(time);
                    const isSelected = pickedTime === time;

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isBusy}
                        className={cn(
                          "py-3 px-1 rounded-xl text-sm font-semibold border-2 transition-all duration-150",
                          // ── OCUPADO: rojo claro, bien visible ──
                          isBusy &&
                            "cursor-not-allowed border-[#FFCDD2] bg-[#FFF0F0] text-[#EF9A9A] line-through",
                          // ── SELECCIONADO ──
                          isSelected &&
                            "border-[#5F7C71] bg-[#5F7C71] text-white shadow-md scale-105",
                          // ── DISPONIBLE ──
                          !isBusy && !isSelected &&
                            "border-[#E7E3DC] text-[#2B2B2B] hover:border-[#5F7C71]/50 hover:bg-[#5F7C71]/5 hover:text-[#5F7C71]"
                        )}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                {/* Time legend */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#E7E3DC] text-xs text-[#9CA3AF]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded border-2 border-[#5F7C71] bg-[#5F7C71] inline-block" />
                    Seleccionado
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded border-2 border-[#E7E3DC] inline-block" />
                    Disponible
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded border-2 border-[#FFCDD2] bg-[#FFF0F0] inline-block" />
                    <span className="text-[#EF9A9A]">Ocupado</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
