import { MapPin, Clock, Phone, Mail } from "lucide-react";

const hours = [
  { day: "Lunes – Viernes", time: "9:00 – 20:00" },
  { day: "Sábado", time: "9:00 – 15:00" },
  { day: "Domingo", time: "Cerrado" },
];

export function MapSection() {
  return (
    <section className="py-24 bg-white" id="ubicacion">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Visítanos</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Encuéntranos en{" "}
            <span className="text-gradient font-display italic">Boca del Río</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ubicados en el corazón de Boca del Río, Veracruz. Fácil acceso y estacionamiento.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map embed */}
          <div className="rounded-3xl overflow-hidden border border-border/50 shadow-card aspect-[4/3] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60020.11055!2d-96.1322!3d19.1009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c344f3a4a96f8f%3A0x0!2sBoca+del+R%C3%ADo%2C+Veracruz!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Mi Piel Veracruz"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Boca del Río, Veracruz, México
                  <br />
                  (Dirección exacta disponible al agendar)
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-3">Horario de atención</h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className={`font-medium ${h.time === "Cerrado" ? "text-muted-foreground" : "text-foreground"}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Teléfono</h3>
                <a
                  href="tel:+522290000000"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  +52 229 000 0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Correo electrónico</h3>
                <a
                  href="mailto:contacto@mipielveracruz.com"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  contacto@mipielveracruz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
