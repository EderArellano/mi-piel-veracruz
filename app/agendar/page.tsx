import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Phone, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agendar Cita | Mi Piel Veracruz",
  description:
    "Agenda tu sesión de depilación láser en Mi Piel Veracruz. Sistema de reservas en línea 24/7. Elige tu servicio, fecha y hora en minutos.",
  alternates: { canonical: "https://mipielveracruz.com/agendar" },
};

export default async function AgendarPage() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  let employees: Awaited<ReturnType<typeof prisma.employee.findMany<{ include: { user: { select: { name: true; image: true } } } }>>> = [];
  let dbError = false;

  try {
    [services, employees] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { category: "asc" },
      }),
      prisma.employee.findMany({
        where: { isActive: true },
        include: { user: { select: { name: true, image: true } } },
      }),
    ]);
  } catch {
    dbError = true;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-brand py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="badge-premium mb-3">✦ Reservas en línea</div>
            <h1 className="text-3xl font-bold text-foreground">Agenda tu cita</h1>
            <p className="text-muted-foreground mt-2">
              Elige tu servicio, fecha y hora. Es rápido y sencillo.
            </p>
          </div>

          {dbError || services.length === 0 ? (
            <div className="card-premium p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Agenda directo con nosotras
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Por el momento, reserva tu consulta gratis por WhatsApp o teléfono. Te respondemos
                de inmediato.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/522290000000?text=Hola,%20quiero%20agendar%20una%20consulta%20de%20depilaci%C3%B3n%20l%C3%A1ser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+522290000000"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors font-medium text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </div>
            </div>
          ) : (
            <BookingWizard services={services} employees={employees} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
