import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Mi Piel Veracruz",
  description:
    "Contáctanos en Mi Piel Veracruz. Estamos en Boca del Río, Veracruz. Llámanos, escríbenos por WhatsApp o agenda tu cita en línea.",
  alternates: { canonical: "https://mipielveracruz.com/contacto" },
};

const info = [
  {
    icon: MapPin,
    title: "Ubicación",
    lines: ["Boca del Río, Veracruz, México"],
  },
  {
    icon: Phone,
    title: "Teléfono / WhatsApp",
    lines: ["+52 229 000 0000"],
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    lines: ["contacto@mipielveracruz.com"],
  },
  {
    icon: Clock,
    title: "Horario de atención",
    lines: ["Lunes a Viernes: 9:00 – 20:00", "Sábados: 9:00 – 15:00", "Domingos: Cerrado"],
  },
];

export default function ContactoPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Contacto</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Estamos para{" "}
            <span className="text-gradient font-display italic">ayudarte</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            ¿Tienes dudas? Contáctanos por WhatsApp, correo o agenda tu consulta gratis en línea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div className="space-y-4">
            {info.map((item) => (
              <div key={item.title} className="card-premium p-6 flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">{item.title}</div>
                  {item.lines.map((line) => (
                    <div key={line} className="text-sm text-muted-foreground">{line}</div>
                  ))}
                </div>
              </div>
            ))}

            <div className="card-premium p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-foreground">WhatsApp directo</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                La forma más rápida de comunicarte. Respondemos en minutos.
              </p>
              <a
                href="https://wa.me/522290000000?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20la%20depilaci%C3%B3n%20l%C3%A1ser"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  Escribir por WhatsApp <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* CTA card */}
          <div className="card-premium p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Agenda en línea</h2>
            <p className="text-muted-foreground mb-8">
              Reserva tu consulta gratis en menos de 2 minutos. Sin filas, sin esperas.
              Elige el día y horario que más te convenga.
            </p>
            <Link href="/agendar">
              <Button size="lg" className="btn-gradient rounded-full w-full mb-4">
                Agendar consulta gratis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              Sin compromiso. Cancela o reagenda cuando quieras.
            </p>

            <div className="mt-10 pt-8 border-t border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Síguenos</h3>
              <div className="flex justify-center gap-3">
                <a
                  href="https://instagram.com/mipielveracruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com/mipielveracruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  FB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
