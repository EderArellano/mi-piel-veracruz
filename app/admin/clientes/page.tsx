import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminClientsTable } from "@/components/admin/clients-table";

export const metadata = { title: "Clientes | Admin Mi Piel Veracruz" };

export default async function AdminClientsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      createdAt: true,
      medicalRecord: { select: { totalSessions: true, skinType: true } },
      _count: { select: { appointments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return <AdminClientsTable clients={clients} />;
}
