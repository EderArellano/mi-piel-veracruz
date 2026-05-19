import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay, format, addMinutes } from "date-fns";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");
  const employeeId = searchParams.get("employeeId");

  if (!dateStr || !serviceId) {
    return NextResponse.json({ busySlots: [] });
  }

  const date = new Date(dateStr);
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ busySlots: [] });

  const appointments = await prisma.appointment.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED", "IN_PROGRESS"] },
      startTime: { gte: dayStart, lte: dayEnd },
      ...(employeeId ? { employeeId } : {}),
    },
    select: { startTime: true, endTime: true },
  });

  const busySlots: string[] = [];

  // Mark slots that overlap with existing appointments
  appointments.forEach((apt) => {
    let current = new Date(apt.startTime);
    const end = new Date(apt.endTime);
    while (current < end) {
      busySlots.push(format(current, "HH:mm"));
      current = addMinutes(current, 30);
    }
    // Also block slots that would overlap when duration is considered
    const allSlots = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"];
    allSlots.forEach((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(h, m, 0, 0);
      const slotEnd = addMinutes(slotStart, service.duration);
      if (
        (slotStart >= new Date(apt.startTime) && slotStart < new Date(apt.endTime)) ||
        (slotEnd > new Date(apt.startTime) && slotEnd <= new Date(apt.endTime)) ||
        (slotStart <= new Date(apt.startTime) && slotEnd >= new Date(apt.endTime))
      ) {
        if (!busySlots.includes(slot)) busySlots.push(slot);
      }
    });
  });

  return NextResponse.json({ busySlots: [...new Set(busySlots)] });
}
