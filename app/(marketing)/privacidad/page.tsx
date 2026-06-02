import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Mi Piel Veracruz",
  description: "Aviso de privacidad de Mi Piel Centro Dermocosmético conforme a la LFPDPPP de México.",
};

export default function PrivacidadPage() {
  return (
    <div className="section-container py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Aviso de Privacidad</h1>
      <p className="text-sm text-muted-foreground mb-10">Última actualización: junio 2025</p>

      <div className="prose prose-sm max-w-none text-foreground space-y-8">

        <section>
          <h2 className="text-lg font-semibold mb-2">1. Responsable del tratamiento</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Mi Piel Centro Dermocosmético</strong>, con domicilio en Boca del Río, Veracruz, México,
            es responsable del tratamiento de sus datos personales conforme a la{" "}
            <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP).
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Contacto del responsable:{" "}
            <a href="mailto:contacto@mipielveracruz.com" className="text-primary">contacto@mipielveracruz.com</a>{" "}
            · <a href="tel:+522299330014" className="text-primary">+52 229 933 00 14</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Datos personales que recabamos</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Datos de identificación: nombre, correo electrónico, teléfono.</li>
            <li>Datos de salud (sensibles): tipo de piel, historial de tratamientos, condiciones dermatológicas.</li>
            <li>Datos de uso: historial de citas, preferencias de tratamiento.</li>
            <li>Datos de navegación: cookies y registros de acceso al portal.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Finalidades del tratamiento</h2>
          <p className="text-muted-foreground leading-relaxed">Sus datos se utilizan para:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-2">
            <li>Gestionar y confirmar citas de tratamientos.</li>
            <li>Elaborar y mantener su expediente clínico dermocosmético.</li>
            <li>Personalizar los tratamientos conforme a su tipo de piel.</li>
            <li>Enviar recordatorios de citas y seguimiento post-tratamiento.</li>
            <li>Cumplir obligaciones legales aplicables.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            <strong>Finalidades secundarias</strong> (puede oponerse): envío de promociones, encuestas de satisfacción
            y contenido informativo sobre nuevos tratamientos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Transferencia de datos</h2>
          <p className="text-muted-foreground leading-relaxed">
            No compartimos sus datos personales con terceros salvo en los casos previstos por la LFPDPPP o cuando sea
            estrictamente necesario para la prestación del servicio (p. ej., plataformas de procesamiento de pagos).
            En ningún caso vendemos ni cedemos su información a terceros con fines comerciales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Derechos ARCO</h2>
          <p className="text-muted-foreground leading-relaxed">
            Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos
            personales (derechos ARCO). Para ejercerlos, envíe una solicitud a{" "}
            <a href="mailto:contacto@mipielveracruz.com" className="text-primary">contacto@mipielveracruz.com</a>{" "}
            indicando su nombre, datos de contacto y el derecho que desea ejercer. Responderemos en un plazo máximo
            de 20 días hábiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">6. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizamos cookies de sesión para mantener su inicio de sesión activo. No utilizamos cookies de
            seguimiento de terceros para publicidad. Puede configurar su navegador para rechazar cookies,
            aunque esto puede afectar algunas funciones del portal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">7. Seguridad</h2>
          <p className="text-muted-foreground leading-relaxed">
            Implementamos medidas técnicas y organizativas para proteger sus datos: cifrado en tránsito (TLS),
            almacenamiento seguro en servidores con acceso restringido, y contraseñas cifradas con bcrypt.
            Los datos de salud son considerados sensibles y reciben protección reforzada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">8. Cambios a este aviso</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cualquier modificación a este aviso de privacidad se publicará en esta página. Le recomendamos
            revisarlo periódicamente.
          </p>
        </section>

      </div>
    </div>
  );
}
