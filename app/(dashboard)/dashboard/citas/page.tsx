import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientAppointments } from "@/components/dashboard/client-appointments";

export const metadata = { title: "Mis Citas | Mi Piel Veracruz" };

export default async function CitasPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    include: {
      service: true,
      employee: { include: { user: { select: { name: true, image: true } } } },
      payment: true,
    },
    orderBy: { startTime: "desc" },
  });

  return <ClientAppointments appointments={appointments} />;
}
