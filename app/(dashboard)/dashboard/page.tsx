import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  if (session.user.role === "ADMIN") {
    const [totalClients, todayAppointments, monthlyRevenue, pendingAppointments] =
      await Promise.all([
        prisma.user.count({ where: { role: "CLIENT" } }),
        prisma.appointment.count({
          where: {
            startTime: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        }),
        prisma.payment.aggregate({
          where: {
            status: "COMPLETED",
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          _sum: { amount: true },
        }),
        prisma.appointment.count({ where: { status: "PENDING" } }),
      ]);

    return (
      <AdminDashboard
        stats={{
          totalClients,
          todayAppointments,
          monthlyRevenue: monthlyRevenue._sum.amount || 0,
          pendingAppointments,
        }}
      />
    );
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
    prisma.medicalRecord.findUnique({
      where: { userId: session.user.id },
    }),
  ]);

  return (
    <ClientDashboard
      user={session.user}
      upcomingAppointments={upcomingAppointments}
      medicalRecord={medicalRecord}
    />
  );
}
