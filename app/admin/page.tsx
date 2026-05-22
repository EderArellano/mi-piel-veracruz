import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export const metadata = { title: "Panel Admin | Mi Piel Veracruz" };

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const [totalClients, todayAppointments, monthlyRevenue, pendingAppointments] = await Promise.all([
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
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
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
