import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Agendar Cita | Mi Piel Veracruz",
  description: "Agenda tu sesión de depilación láser en Mi Piel Veracruz. Sistema de reservas en línea 24/7.",
};

export default async function AgendarPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { category: "asc" },
  });

  const employees = await prisma.employee.findMany({
    where: { isActive: true },
    include: { user: { select: { name: true, image: true } } },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-brand py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground">Agenda tu cita</h1>
            <p className="text-muted-foreground mt-2">
              Elige tu servicio, fecha y hora. Es rápido y sencillo.
            </p>
          </div>
          <BookingWizard services={services} employees={employees} />
        </div>
      </main>
      <Footer />
    </>
  );
}
