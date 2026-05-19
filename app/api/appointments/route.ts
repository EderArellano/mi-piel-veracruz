import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { createAppointmentSchema } from "@/lib/validations/appointment";
import { sendAppointmentConfirmation } from "@/lib/email";
import { formatDate, formatTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);

  const where =
    session.user.role === "ADMIN"
      ? { ...(status ? { status: status as never } : {}) }
      : { userId: session.user.id, ...(status ? { status: status as never } : {}) };

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        service: true,
        user: { select: { id: true, name: true, email: true, image: true } },
        employee: { include: { user: { select: { name: true } } } },
      },
      orderBy: { startTime: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.appointment.count({ where }),
  ]);

  return NextResponse.json({ appointments, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createAppointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
  }

  const { serviceId, employeeId, startTime: startTimeStr, notes } = parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ message: "Servicio no encontrado" }, { status: 404 });

  const startTime = new Date(startTimeStr);
  const endTime = addMinutes(startTime, service.duration);

  // Check for double booking
  const conflict = await prisma.appointment.findFirst({
    where: {
      status: { in: ["PENDING", "CONFIRMED", "IN_PROGRESS"] },
      ...(employeeId ? { employeeId } : {}),
      OR: [
        { startTime: { gte: startTime, lt: endTime } },
        { endTime: { gt: startTime, lte: endTime } },
        { startTime: { lte: startTime }, endTime: { gte: endTime } },
      ],
    },
  });

  if (conflict) {
    return NextResponse.json(
      { message: "Este horario ya no está disponible. Por favor elige otro." },
      { status: 409 }
    );
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId: session.user.id!,
      serviceId,
      employeeId: employeeId || null,
      startTime,
      endTime,
      notes,
      status: "CONFIRMED",
    },
    include: { service: true, employee: { include: { user: true } } },
  });

  // Send confirmation email (non-blocking)
  const user = await prisma.user.findUnique({ where: { id: session.user.id! } });
  if (user?.email) {
    sendAppointmentConfirmation(user.email, user.name || "Cliente", {
      service: appointment.service.name,
      date: formatDate(appointment.startTime),
      time: formatTime(appointment.startTime),
      employee: appointment.employee?.user.name || undefined,
    }).catch(console.error);
  }

  return NextResponse.json(appointment, { status: 201 });
}
