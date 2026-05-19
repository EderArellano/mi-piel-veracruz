import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const [
    totalClients,
    newClientsThisMonth,
    newClientsLastMonth,
    thisMonthRevenue,
    lastMonthRevenue,
    todayAppointments,
    pendingAppointments,
    completedAllTime,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.user.count({ where: { role: "CLIENT", createdAt: { gte: thisMonthStart, lte: thisMonthEnd } } }),
    prisma.user.count({ where: { role: "CLIENT", createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED", createdAt: { gte: thisMonthStart, lte: thisMonthEnd } },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED", createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
      _sum: { amount: true },
    }),
    prisma.appointment.count({
      where: {
        startTime: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
  ]);

  return NextResponse.json({
    totalClients,
    newClientsThisMonth,
    clientsGrowth:
      newClientsLastMonth > 0
        ? Math.round(((newClientsThisMonth - newClientsLastMonth) / newClientsLastMonth) * 100)
        : 100,
    thisMonthRevenue: thisMonthRevenue._sum.amount || 0,
    lastMonthRevenue: lastMonthRevenue._sum.amount || 0,
    revenueGrowth:
      (lastMonthRevenue._sum.amount || 0) > 0
        ? Math.round(
            (((thisMonthRevenue._sum.amount || 0) - (lastMonthRevenue._sum.amount || 0)) /
              (lastMonthRevenue._sum.amount || 1)) *
              100
          )
        : 100,
    todayAppointments,
    pendingAppointments,
    completedAllTime,
  });
}
