import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";

const ZONES = [
  {
    city: "Boca del Río",
    desc: "Nuestra clínica principal, atendiendo a pacientes de colonias como Ruiz Cortines, Costa Verde, El Coyol, Fracc. Las Palmas y todo el corredor médico de Boca del Río.",
  },
  {
    city: "Veracruz",
    desc: "Atendemos pacientes de Veracruz centro, colonia Centro, Flores Magón, Reforma y zona norte. A 10 minutos por Av. Ávila Camacho.",
  },
  {
    city: "Medellín de Bravo",
    desc: "Pacientes de Medellín y comunidades cercanas nos visitan regularmente para sus ciclos de depilación láser y tratamientos faciales.",
  },
  {
    city: "Alvarado",
    desc: "Recibimos pacientes de Alvarado y la zona sur de Veracruz que buscan tecnología láser Diodo grado médico de calidad.",
  },
];

const SERVICES_SEO = [
  {
    h3: "Depilación Láser de Axilas en Veracruz",
    text: "Elimina el vello de axilas de forma permanente con 6-8 sesiones. Cada sesión dura solo 10-15 minutos. Sin manchas, sin vellos encarnados. Precio desde $600 MXN/sesión.",
    href: "/servicios/axilas",
  },
  {
    h3: "Depilación Láser de Bikini y Brasileño en Boca del Río",
    text: "Tratamiento especializado para zona íntima con láser Diodo de último nivel. Bikini línea desde $700 MXN, bikini brasileño desde $900 MXN. Máxima higiene y privacidad.",
    href: "/servicios/bikini-brasileno",
  },
  {
    h3: "Depilación Láser de Piernas en Veracruz",
    text: "Piernas completamente lisas con 6-8 sesiones. Media pierna o pierna completa. Tratamos piernas con fototipo oscuro (piel morena veracruzana) con resultados seguros y permanentes.",
    href: "/servicios/piernas",
  },
  {
    h3: "Hidrofacial y Limpieza Facial en Boca del Río",
    text: "El mejor tratamiento para el clima tropical de Veracruz. Limpia poros profundamente, elimina manchas de sol e hidrata intensamente en 60 minutos. Resultado visible el mismo día.",
    href: "/servicios",
  },
  {
    h3: "Fototerapia Celluma LED para Acné y Antiedad en Veracruz",
    text: "Dispositivo NASA-desarrollado que estimula colágeno, trata acné hormonal y revierte el daño solar. Ideal para piel veracruzana expuesta al sol y humedad del golfo.",
    href: "/servicios",
  },
  {
    h3: "Depilación Láser para Hombres en Boca del Río",
    text: "Espalda, hombros, pecho, barba y cuello con láser Diodo grado médico. Más hombres en Veracruz eligen el láser por sus resultados permanentes vs. ceras y rasuradoras.",
    href: "/servicios",
  },
];

export function LocalSeoSection() {
  return (
    <section className="py-16 bg-[#F4F2EE] border-t border-[#E7E3DC]" aria-label="Cobertura y servicios por zona">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2596be]/10 text-[#2596be] text-sm font-medium mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Cobertura local
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-3">
            Clínica de Depilación Láser en Veracruz y Boca del Río
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto">
            Ubicados en el corredor médico de Boca del Río, atendemos a pacientes de toda
            la zona conurbada Veracruz–Boca del Río y municipios vecinos.
          </p>
        </div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {ZONES.map((z) => (
            <div key={z.city} className="bg-white rounded-2xl border border-[#E7E3DC] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#2596be] shrink-0" />
                <h3 className="font-semibold text-[#2B2B2B] text-sm">{z.city}</h3>
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{z.desc}</p>
            </div>
          ))}
        </div>

        {/* Service descriptions — keyword-rich H3s */}
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold text-[#2B2B2B] text-center mb-8">
            Servicios de Depilación Láser y Estética disponibles en Veracruz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_SEO.map((s) => (
              <Link
                key={s.h3}
                href={s.href}
                className="group bg-white rounded-2xl border border-[#E7E3DC] p-5 shadow-sm hover:border-[#2596be]/40 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-[#2B2B2B] text-sm mb-2 group-hover:text-[#2596be] transition-colors leading-snug">
                  {s.h3}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{s.text}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust + differentiators */}
        <div className="bg-white rounded-2xl border border-[#E7E3DC] p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-[#2B2B2B] mb-5 text-center">
            ¿Por qué Mi Piel es la clínica dermocosmética de referencia en Veracruz?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              "Láser Diodo grado médico — el estándar de oro para piel morena veracruzana",
              "8 años de experiencia exclusiva en dermocosmética en Boca del Río",
              "+5,000 pacientes tratados en Veracruz, Boca del Río y Medellín",
              "Primera consulta con Skin Analyzer completamente gratis y sin compromiso",
              "Precios finales sin letra chica — lo que se cotiza es lo que se paga",
              "Tecnología FDA-cleared para los fototipos III-VI más comunes en México",
              "Equipo certificado en protocolos de seguridad laser para piel latina",
              "Financiamiento a 12 MSI — depilación láser definitiva al alcance de todos",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-[#2596be] mt-0.5 shrink-0" />
                <p className="text-sm text-[#4B4B4B]">{item}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2596be] text-white font-semibold text-sm hover:bg-[#4d6860] transition-colors shadow-md"
            >
              Agenda tu consulta gratis en Boca del Río →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
