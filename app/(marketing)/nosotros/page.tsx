import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Award, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | Mi Piel Veracruz",
  description:
    "Conoce a Mi Piel Veracruz, la clínica líder en depilación láser en Boca del Río, Veracruz. 8 años de experiencia, más de 5,000 clientes satisfechas.",
  alternates: { canonical: "https://mipielveracruz.com/nosotros" },
};

const stats = [
  { value: "5,000+", label: "Clientes satisfechas" },
  { value: "8 años", label: "De experiencia" },
  { value: "98%", label: "Tasa de satisfacción" },
  { value: "100%", label: "Seguro y certificado" },
];

const values = [
  {
    icon: Heart,
    title: "Pasión por el cuidado",
    description:
      "Cada tratamiento es personalizado. Nos tomamos el tiempo para entender tus metas y diseñar el plan perfecto para ti.",
  },
  {
    icon: Shield,
    title: "Seguridad primero",
    description:
      "Utilizamos tecnología láser Diodo de última generación, segura para todo tipo de piel. Instalaciones certificadas y personal especializado.",
  },
  {
    icon: Award,
    title: "Resultados garantizados",
    description:
      "Nuestros protocolos están respaldados por años de experiencia y estudios clínicos. Resultados visibles desde la primera sesión.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description:
      "Cada cliente es única. Evaluamos tu tipo de piel, tono y necesidades para brindarte el tratamiento más efectivo.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Nuestra historia</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Más que una clínica,{" "}
            <span className="text-gradient font-display italic">tu aliada</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nacimos con una misión: ofrecer depilación láser de calidad clínica al alcance de
            todas en Veracruz.
          </p>
        </div>

        {/* Story */}
        <div className="card-premium p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Mi Piel Veracruz nació en Boca del Río con una visión clara: democratizar el acceso
              a la depilación láser de calidad clínica. Desde nuestra fundación, hemos acompañado
              a más de 5,000 mujeres y hombres en su camino hacia una piel suave y sin
              preocupaciones.
            </p>
            <p>
              Contamos con tecnología láser Diodo de última generación, la misma utilizada en
              las mejores clínicas de Europa y Estados Unidos. Nuestro equipo de especialistas
              certificadas se actualiza constantemente para ofrecerte los mejores resultados con
              la máxima seguridad.
            </p>
            <p>
              En Mi Piel Veracruz, creemos que sentirte bien en tu propia piel no es un lujo —
              es un derecho. Por eso ofrecemos precios accesibles, planes de pago y la primera
              consulta completamente gratis.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="card-premium p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-premium p-6 flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/agendar">
            <Button size="lg" className="btn-gradient rounded-full px-10">
              Conoce tu plan personalizado <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
