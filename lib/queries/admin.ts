import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";
import { es } from "date-fns/locale";

export async function getAdminStats() {
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const [totalClients, todayAppointments, monthlyRevenue, pendingAppointments] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.appointment.count({ where: { startTime: { gte: todayStart, lt: todayEnd } } }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED", createdAt: { gte: monthStart } },
      _sum: { amount: true },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
  ]);

  return {
    totalClients,
    todayAppointments,
    monthlyRevenue: monthlyRevenue._sum.amount || 0,
    pendingAppointments,
  };
}

export async function getRevenueByMonth(months = 7) {
  const now = new Date();
  const since = startOfMonth(subMonths(now, months - 1));

  const payments = await prisma.payment.findMany({
    where: { status: "COMPLETED", createdAt: { gte: since } },
    select: { amount: true, createdAt: true },
  });

  return Array.from({ length: months }, (_, i) => {
    const month = subMonths(now, months - 1 - i);
    const mStart = startOfMonth(month);
    const mEnd = endOfMonth(month);
    const revenue = payments
      .filter((p) => p.createdAt >= mStart && p.createdAt <= mEnd)
      .reduce((sum, p) => sum + p.amount, 0);
    return { month: format(month, "MMM", { locale: es }), revenue };
  });
}

export async function getTopServices(limit = 5) {
  const grouped = await prisma.appointment.groupBy({
    by: ["serviceId"],
    where: { status: { in: ["COMPLETED", "CONFIRMED"] } },
    _count: { serviceId: true },
    orderBy: { _count: { serviceId: "desc" } },
    take: limit,
  });

  if (grouped.length === 0) return [];

  const services = await prisma.service.findMany({
    where: { id: { in: grouped.map((g) => g.serviceId) } },
    select: { id: true, name: true },
  });

  return grouped.map((g) => ({
    name: services.find((s) => s.id === g.serviceId)?.name ?? "Desconocido",
    count: g._count.serviceId,
  }));
}
