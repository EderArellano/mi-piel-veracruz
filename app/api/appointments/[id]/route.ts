import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateAppointmentSchema } from "@/lib/validations/appointment";
import { addMinutes } from "date-fns";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = updateAppointmentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });

  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) return NextResponse.json({ message: "No encontrada" }, { status: 404 });

  if (session.user.role !== "ADMIN" && appointment.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { startTime: startTimeStr, ...rest } = parsed.data;

  let updateData: Record<string, unknown> = { ...rest };

  if (startTimeStr) {
    const service = await prisma.service.findUnique({ where: { id: appointment.serviceId } });
    const startTime = new Date(startTimeStr);
    updateData.startTime = startTime;
    updateData.endTime = addMinutes(startTime, service?.duration || 60);
    updateData.status = "RESCHEDULED";
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: updateData,
    include: { service: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) return NextResponse.json({ message: "No encontrada" }, { status: 404 });

  if (session.user.role !== "ADMIN" && appointment.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ success: true });
}
