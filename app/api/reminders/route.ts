import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAppointmentReminder } from "@/lib/email";
import { format, addHours } from "date-fns";
import { es } from "date-fns/locale";

// Called by Vercel Cron: every day at 10am Mexico time (16:00 UTC)
// Sends reminder emails for appointments starting in the next 22–26 hours
export async function GET(req: Request) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const windowStart = addHours(now, 22);
  const windowEnd = addHours(now, 26);

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: windowStart, lte: windowEnd },
      status: { in: ["PENDING", "CONFIRMED"] },
      reminderSent: false,
    },
    include: {
      user: { select: { name: true, email: true } },
      service: { select: { name: true } },
    },
  });

  const results = await Promise.allSettled(
    appointments.map(async (appt) => {
      if (!appt.user.email) return;

      const dateStr = format(appt.startTime, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
      const timeStr = format(appt.startTime, "h:mm a");
      const name = appt.user.name ?? "Paciente";

      await sendAppointmentReminder(appt.user.email, name, {
        service: appt.service.name,
        date: dateStr.charAt(0).toUpperCase() + dateStr.slice(1),
        time: timeStr,
      });

      await prisma.appointment.update({
        where: { id: appt.id },
        data: { reminderSent: true },
      });
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return NextResponse.json({ ok: true, sent, failed, total: appointments.length });
}
