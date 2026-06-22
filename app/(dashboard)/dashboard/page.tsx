export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getAdminStats, getRevenueByMonth, getTopServices } from "@/lib/queries/admin";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  if (session.user.role === "ADMIN") {
    const [stats, revenueByMonth, topServices] = await Promise.all([
      getAdminStats(),
      getRevenueByMonth(7),
      getTopServices(5),
    ]);
    return <AdminDashboard stats={stats} revenueByMonth={revenueByMonth} topServices={topServices} />;
  }

  const [upcomingAppointments, medicalRecord] = await Promise.all([
    prisma.appointment.findMany({
      where: {
        userId: session.user.id,
        startTime: { gte: new Date() },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      include: { service: true, employee: { include: { user: true } } },
      orderBy: { startTime: "asc" },
      take: 3,
    }),
    prisma.medicalRecord.findUnique({ where: { userId: session.user.id } }),
  ]);

  return (
    <ClientDashboard
      user={session.user}
      upcomingAppointments={upcomingAppointments}
      medicalRecord={medicalRecord}
    />
  );
}
