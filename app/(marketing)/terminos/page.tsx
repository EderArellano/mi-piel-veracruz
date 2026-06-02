import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso | Mi Piel Veracruz",
  description: "Términos y condiciones de uso de los servicios de Mi Piel Centro Dermocosmético en Boca del Río, Veracruz.",
};

export default function TerminosPage() {
  return (
    <div className="section-container py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Términos de Uso</h1>
      <p className="text-sm text-muted-foreground mb-10">Última actualización: junio 2025</p>

      <div className="prose prose-sm max-w-none text-foreground space-y-8">

        <section>
          <h2 className="text-lg font-semibold mb-2">1. Aceptación de los términos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Al acceder y utilizar el sitio web de <strong>Mi Piel Centro Dermocosmético</strong> ("la Clínica"),
            usted acepta quedar vinculado por estos Términos de Uso. Si no está de acuerdo con alguna parte de
            estos términos, le pedimos que no utilice nuestros servicios en línea.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Descripción del servicio</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mi Piel Centro Dermocosmético ofrece servicios de depilación láser, hidrofacial, fototerapia Celluma LED,
            análisis de piel (Skin Analyzer) y cuidado de la piel en Boca del Río, Veracruz, México.
            La plataforma en línea permite agendar citas, consultar historial de tratamientos y comunicarse con
            el equipo clínico.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Citas y cancelaciones</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Las citas deben cancelarse o reagendarse con al menos <strong>24 horas de anticipación</strong>.</li>
            <li>Las cancelaciones tardías o inasistencias sin aviso podrán generar un cargo administrativo.</li>
            <li>La Clínica se reserva el derecho de reprogramar citas por causa de fuerza mayor.</li>
            <li>Para reagendar, contáctenos al <a href="tel:+522299330014" className="text-primary">229 933 00 14</a> o a través del portal.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Responsabilidades del usuario</h2>
          <p className="text-muted-foreground leading-relaxed">
            El usuario se compromete a proporcionar información veraz y actualizada al registrarse y al llenar
            su expediente médico. Información incorrecta puede afectar la seguridad y eficacia de los tratamientos.
            El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Propiedad intelectual</h2>
          <p className="text-muted-foreground leading-relaxed">
            Todo el contenido del sitio —incluyendo textos, imágenes, logotipos y diseño— es propiedad de
            Mi Piel Centro Dermocosmético o sus licenciantes. Queda prohibida su reproducción sin autorización escrita.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">6. Limitación de responsabilidad</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mi Piel no garantiza resultados específicos de los tratamientos, ya que estos varían según el tipo de piel
            y condición individual de cada paciente. Los resultados presentados en el sitio son referenciales.
            Los tratamientos son realizados por personal capacitado siguiendo protocolos de seguridad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">7. Modificaciones</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán
            en vigor al publicarse en este sitio. El uso continuo de nuestros servicios implica la aceptación
            de los términos actualizados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">8. Contacto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Para dudas sobre estos términos, contáctenos en:{" "}
            <a href="mailto:contacto@mipielveracruz.com" className="text-primary">contacto@mipielveracruz.com</a>{" "}
            o al <a href="tel:+522299330014" className="text-primary">+52 229 933 00 14</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
