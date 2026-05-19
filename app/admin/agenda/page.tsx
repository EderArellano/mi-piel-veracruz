import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminCalendar } from "@/components/admin/admin-calendar";

export const metadata = { title: "Agenda | Admin Mi Piel Veracruz" };

export default async function AdminAgendaPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
    include: {
      service: true,
      user: { select: { name: true, email: true, phone: true } },
      employee: { include: { user: { select: { name: true } } } },
    },
    orderBy: { startTime: "asc" },
  });

  return <AdminCalendar appointments={appointments} />;
}
