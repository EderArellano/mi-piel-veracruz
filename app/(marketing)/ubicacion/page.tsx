import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone, Car, Bus, ArrowRight, MessageCircle, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Llegar — Mi Piel Veracruz en Boca del Río | Ubicación y Horarios",
  description:
    "Clínica Mi Piel en Boca del Río, Veracruz. Dirección, horarios, cómo llegar en auto o transporte público. Depilación láser cerca de ti. Primera consulta gratis.",
  keywords: [
    "depilación láser cerca de mí Veracruz",
    "clínica estética Boca del Río ubicación",
    "Mi Piel Veracruz dirección",
    "depilación láser Boca del Río cómo llegar",
    "clínica dermocosmética cerca Veracruz",
    "horario clínica depilación láser Veracruz",
    "depilación láser zona norte Veracruz",
    "clínica estética cerca de mí Boca del Río",
  ],
  alternates: { canonical: "https://mipielveracruz.com/ubicacion" },
  openGraph: {
    title: "Ubicación Mi Piel — Clínica en Boca del Río, Veracruz",
    description: "Encuéntranos en Boca del Río. Fácil acceso en auto y transporte público. Horarios L–V 9am–8pm, Sáb 9am–3pm.",
    url: "https://mipielveracruz.com/ubicacion",
  },
};

const locationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://mipielveracruz.com/#clinic",
  name: "Mi Piel Centro Dermocosmético",
  url: "https://mipielveracruz.com",
  telephone: "+52-229-933-0014",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. R. Flores Magón & Alacio Pérez",
    addressLocality: "Boca del Río",
    addressRegion: "Veracruz",
    postalCode: "94290",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.1738",
    longitude: "-96.1342",
  },
  hasMap: "https://maps.google.com/?q=Mi+Piel+Centro+Dermocosmético+Boca+del+Río",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "49", bestRating: "5" },
};

const WA = "https://wa.me/522299330014?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20Mi%20Piel%20Veracruz.";

const nearbyZones = [
  "Fracc. Virginia", "Playa Linda", "Costa Verde", "Ruiz Cortines",
  "Mocambo", "La Calzada", "Del Lago", "Residencial Veracruz",
];

export default function UbicacionPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }} />

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: "linear-gradient(135deg, #5F7C71 0%, #4D675E 100%)" }}>
        <div className="section-container text-center text-white">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,.15)" }}>
            <MapPin className="w-3.5 h-3.5" />
            Boca del Río, Veracruz
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight mb-4">
            Estamos cerca de ti
          </h1>
          <p className="text-xl max-w-xl mx-auto" style={{ color: "rgba(255,255,255,.8)" }}>
            Clínica de depilación láser en Boca del Río — fácil acceso desde toda la zona conurbada Veracruz
          </p>
        </div>
      </section>

      {/* Map + Info */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Google Maps embed */}
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 12px 40px rgba(0,0,0,.1)", height: "420px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5!2d-96.1342!3d19.1738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMi+Piel+Centro+Dermocosm%C3%A9tico!5e0!3m2!1ses!2smx!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mi Piel Centro Dermocosmético Boca del Río Veracruz"
              />
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid #E7E3DC" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#EAF0ED" }}>
                    <MapPin className="w-5 h-5" style={{ color: "#5F7C71" }} />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: "#2B2B2B" }}>Dirección</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6F6F6F" }}>
                      Av. R. Flores Magón esquina con Alacio Pérez<br />
                      Boca del Río, Veracruz, México C.P. 94290
                    </p>
                    <a
                      href="https://maps.google.com/?q=Mi+Piel+Centro+Dermocosmético+Boca+del+Río+Veracruz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3 transition-colors"
                      style={{ color: "#5F7C71" }}
                    >
                      Abrir en Google Maps
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid #E7E3DC" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#EAF0ED" }}>
                    <Clock className="w-5 h-5" style={{ color: "#5F7C71" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-3" style={{ color: "#2B2B2B" }}>Horarios de atención</p>
                    <div className="space-y-1.5">
                      {[
                        { days: "Lunes — Viernes", hours: "9:00 am — 8:00 pm" },
                        { days: "Sábado", hours: "9:00 am — 3:00 pm" },
                        { days: "Domingo", hours: "Cerrado" },
                      ].map(({ days, hours }) => (
                        <div key={days} className="flex justify-between text-sm">
                          <span style={{ color: "#6F6F6F" }}>{days}</span>
                          <span className="font-medium" style={{ color: hours === "Cerrado" ? "#9A9A9A" : "#2B2B2B" }}>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid #E7E3DC" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#EAF0ED" }}>
                    <Phone className="w-5 h-5" style={{ color: "#5F7C71" }} />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: "#2B2B2B" }}>Contacto</p>
                    <a href="tel:+522299330014" className="text-sm font-medium block" style={{ color: "#5F7C71" }}>+52 229 933 00 14</a>
                    <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs mt-2" style={{ color: "#22c55e" }}>
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp directo
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/agendar"
                className="flex items-center justify-center gap-2.5 text-white font-bold py-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "#5F7C71", boxShadow: "0 4px 20px rgba(95,124,113,.3)" }}
              >
                Agendar consulta gratis — Skin Analyzer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to get there */}
      <section className="py-16" style={{ background: "#F4F2EE" }}>
        <div className="section-container max-w-3xl">
          <h2 className="font-display text-3xl font-black text-center mb-10" style={{ color: "#2B2B2B" }}>
            Cómo llegar a Mi Piel Veracruz
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid #E7E3DC" }}>
              <div className="flex items-center gap-3 mb-4">
                <Car className="w-5 h-5" style={{ color: "#5F7C71" }} />
                <h3 className="font-bold" style={{ color: "#2B2B2B" }}>En automóvil</h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: "#6F6F6F" }}>
                <li>• Desde Veracruz centro: 15 min por Blvd. Manuel Ávila Camacho</li>
                <li>• Desde Boca del Río norte: 5 min por Ruiz Cortines</li>
                <li>• Estacionamiento disponible en la calle y en plaza cercana</li>
                <li>• Punto de referencia: cerca de Plaza Las Américas</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid #E7E3DC" }}>
              <div className="flex items-center gap-3 mb-4">
                <Bus className="w-5 h-5" style={{ color: "#5F7C71" }} />
                <h3 className="font-bold" style={{ color: "#2B2B2B" }}>En transporte público</h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: "#6F6F6F" }}>
                <li>• Ruta Veracruz–Boca del Río: baja en Av. R. Flores Magón</li>
                <li>• Microbús «Boca del Río–Costa Verde» pasa frente a la clínica</li>
                <li>• Uber y DiDi disponibles en toda la zona conurbada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby zones — local SEO keywords */}
      <section className="py-14">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold mb-3" style={{ color: "#2B2B2B" }}>
            Atendemos pacientes de toda la zona conurbada
          </h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: "#9A9A9A" }}>
            Nuestra clínica en Boca del Río es fácilmente accesible desde los siguientes fraccionamientos y colonias:
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {[...nearbyZones, "Veracruz Centro", "Boca del Río", "Medellín de Bravo", "Alvarado"].map((zone) => (
              <span
                key={zone}
                className="text-sm px-4 py-1.5 rounded-full"
                style={{ background: "#EAF0ED", color: "#5F7C71", border: "1px solid #C4D4CF" }}
              >
                {zone}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Rating strip */}
      <section className="py-12" style={{ background: "#5F7C71" }}>
        <div className="section-container text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="font-bold text-white ml-2">4.9</span>
            <span style={{ color: "rgba(255,255,255,.7)" }} className="text-sm">· 49 reseñas en Google</span>
          </div>
          <p className="font-display text-2xl font-black text-white mb-6">
            La clínica de depilación láser mejor calificada en Veracruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: "white", color: "#5F7C71" }}
            >
              Agendar cita gratis
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,.15)", color: "white", border: "1.5px solid rgba(255,255,255,.3)" }}
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
