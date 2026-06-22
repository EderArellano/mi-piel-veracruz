export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getAdminStats, getRevenueByMonth, getTopServices } from "@/lib/queries/admin";

export const metadata = { title: "Panel Admin | Mi Piel Veracruz" };

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const [stats, revenueByMonth, topServices] = await Promise.all([
    getAdminStats(),
    getRevenueByMonth(7),
    getTopServices(5),
  ]);

  return <AdminDashboard stats={stats} revenueByMonth={revenueByMonth} topServices={topServices} />;
}
