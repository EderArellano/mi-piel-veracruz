import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateAppointmentSchema } from "@/lib/validations/appointment";
import { addMinutes } from "date-fns";

const ADMIN_ONLY_FIELDS = ["status", "internalNotes", "employeeId"] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = updateAppointmentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });

  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) return NextResponse.json({ message: "No encontrada" }, { status: 404 });

  const role = session.user.role;
  const isAdmin = role === "ADMIN";
  const isAssignedEmployee = role === "EMPLOYEE" && appointment.employeeId === session.user.id;
  const isOwner = appointment.userId === session.user.id;

  if (!isAdmin && !isAssignedEmployee && !isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Clients can only cancel their own appointments — no status escalation
  if (!isAdmin && !isAssignedEmployee) {
    const attemptedPrivilegedFields = ADMIN_ONLY_FIELDS.filter((f) => f in parsed.data);
    if (attemptedPrivilegedFields.length > 0) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const { startTime: startTimeStr, ...rest } = parsed.data;
  const updateData: Record<string, unknown> = { ...rest };

  if (startTimeStr) {
    const service = await prisma.service.findUnique({ where: { id: appointment.serviceId } });
    const startTime = new Date(startTimeStr);
    updateData.startTime = startTime;
    updateData.endTime = addMinutes(startTime, service?.duration || 60);
    if (!updateData.status) updateData.status = "RESCHEDULED";
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

  const isAdmin = session.user.role === "ADMIN";
  const isOwner = appointment.userId === session.user.id;
  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.appointment.update({ where: { id }, data: { status: "CANCELLED" } });
  return NextResponse.json({ success: true });
}
