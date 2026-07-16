import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Mi Piel Centro Dermocosmético",
  description:
    "Aviso de privacidad integral conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://mipielveracruz.com/privacidad" },
};

const SECTIONS = [
  { id: "responsable",    label: "1. Identidad del Responsable" },
  { id: "datos",          label: "2. Datos que recabamos" },
  { id: "sensibles",      label: "3. Datos sensibles" },
  { id: "finalidades",    label: "4. Finalidades del tratamiento" },
  { id: "transferencias", label: "5. Transferencias" },
  { id: "arco",           label: "6. Derechos ARCO" },
  { id: "revocacion",     label: "7. Revocación del consentimiento" },
  { id: "seguridad",      label: "8. Seguridad" },
  { id: "cookies",        label: "9. Cookies" },
  { id: "ia",             label: "10. Inteligencia Artificial" },
  { id: "menores",        label: "11. Menores de edad" },
  { id: "cambios",        label: "12. Cambios al aviso" },
  { id: "contacto",       label: "13. Contacto" },
];

export default function PrivacidadPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-10 bg-[#FAFAF8] border-b border-[#E7E3DC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5F7C71]/10 text-[#5F7C71] text-sm font-medium mb-5">
            <Shield className="w-3.5 h-3.5" />
            Privacidad
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-3">
            Aviso de Privacidad
          </h1>
          <p className="text-[#6B6B6B] max-w-2xl leading-relaxed">
            Conforme a la <strong className="text-[#2B2B2B]">Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares</strong> (LFPDPPP, DOF 05/07/2010) y su Reglamento (DOF 21/12/2011).
          </p>
          <p className="text-xs text-[#9CA3AF] mt-3">
            Última actualización: julio de 2026 &nbsp;·&nbsp; Versión 2.0
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:flex lg:gap-10">

        {/* ── Sidebar índice ── */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 bg-white border border-[#E7E3DC] rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] mb-3 px-2">Contenido</p>
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-[#6B6B6B] hover:text-[#5F7C71] hover:bg-[#5F7C71]/5 px-2 py-1.5 rounded-lg border-l-2 border-transparent hover:border-[#5F7C71] transition-all"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-[#E7E3DC]">
              <Link href="/terminos" className="text-xs text-[#5F7C71] hover:underline block px-2">
                Ver Términos y Condiciones →
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Contenido legal ── */}
        <article className="flex-1 min-w-0 space-y-10 text-sm leading-relaxed text-[#4B4B4B]">

          {/* 1. Responsable */}
          <section id="responsable" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              1. Identidad y domicilio del Responsable
            </h2>
            <p className="mb-4">
              En cumplimiento al artículo 15 de la LFPDPPP, se informa que el responsable del
              tratamiento de sus datos personales es:
            </p>
            <div className="bg-[#F4F2EE] rounded-2xl p-5 space-y-2 text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Denominación:</span>
                <span>Mi Piel Centro Dermocosmético</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Domicilio:</span>
                <span>Boca del Río, Veracruz, México</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Correo:</span>
                <a href="mailto:privacidad@mipielveracruz.com" className="text-[#5F7C71]">
                  privacidad@mipielveracruz.com
                </a>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Teléfono:</span>
                <span>+52 229 933 00 14</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Sitio web:</span>
                <span>mipielveracruz.com</span>
              </div>
            </div>
          </section>

          {/* 2. Datos */}
          <section id="datos" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              2. Datos personales que recabamos
            </h2>
            <p className="mb-4">
              De conformidad con los artículos 16 y 17 de la LFPDPPP, recabamos las siguientes
              categorías de datos personales:
            </p>
            <div className="space-y-5">
              {[
                {
                  titulo: "2.1 Datos de identificación y contacto",
                  items: ["Nombre completo", "Correo electrónico", "Número de teléfono / celular", "Imagen de perfil (opcional, proporcionada por el usuario)"],
                },
                {
                  titulo: "2.2 Datos de salud (sensibles)",
                  items: ["Tipo de piel (fototipos de Fitzpatrick I–VI)", "Alergias conocidas", "Condiciones médicas y dermatológicas relevantes", "Medicamentos en uso", "Fotografías de piel para análisis y seguimiento de tratamientos", "Historial de sesiones, parámetros aplicados y observaciones clínicas"],
                },
                {
                  titulo: "2.3 Datos de navegación y uso",
                  items: ["Dirección IP y tipo de dispositivo / navegador", "Páginas visitadas y tiempo de sesión", "Cookies y tecnologías similares (ver sección 9)"],
                },
                {
                  titulo: "2.4 Datos financieros",
                  items: ["Los datos de tarjeta bancaria son procesados directamente por Stripe, Inc. bajo cifrado PCI-DSS. Mi Piel Centro Dermocosmético no almacena datos de instrumentos de pago; únicamente conserva el identificador de transacción, monto y estado del cobro."],
                },
              ].map((cat) => (
                <div key={cat.titulo}>
                  <h3 className="font-semibold text-[#2B2B2B] mb-2">{cat.titulo}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {cat.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Sensibles */}
          <section id="sensibles" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              3. Datos personales sensibles
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 text-amber-900 text-sm">
              <strong>Importante:</strong> Los datos de salud (sección 2.2) son considerados
              <strong> datos personales sensibles</strong> conforme al artículo 3, fracción VI de la LFPDPPP,
              y requieren su consentimiento expreso para ser tratados.
            </div>
            <p className="mb-3">
              Al completar su expediente clínico —ya sea en nuestra plataforma o de forma presencial
              en la clínica— usted otorga consentimiento expreso e informado para el tratamiento de
              sus datos de salud conforme a este aviso de privacidad.
            </p>
            <p>
              Nos comprometemos a aplicar las medidas de seguridad reforzadas previstas en el
              artículo 19 de la LFPDPPP y en la <strong>NOM-004-SSA3-2012 (Expediente Clínico)</strong>,
              garantizando la confidencialidad, integridad y disponibilidad de esta información
              exclusivamente para fines terapéuticos y de seguimiento del tratamiento.
            </p>
          </section>

          {/* 4. Finalidades */}
          <section id="finalidades" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              4. Finalidades del tratamiento
            </h2>
            <h3 className="font-semibold text-[#2B2B2B] mb-2">4.1 Finalidades primarias (necesarias para el servicio)</h3>
            <ul className="list-disc pl-5 space-y-1 mb-5">
              <li>Agendar, confirmar, modificar y cancelar sus citas y tratamientos</li>
              <li>Elaborar, mantener y actualizar su expediente clínico dermocosmético</li>
              <li>Evaluar contraindicaciones previas a la aplicación de tratamientos</li>
              <li>Procesar pagos y emitir comprobantes fiscales (CFDI)</li>
              <li>Enviar recordatorios de cita por correo electrónico o WhatsApp</li>
              <li>Atender quejas, aclaraciones y solicitudes del paciente</li>
              <li>Cumplir obligaciones legales (SAT, Secretaría de Salud, IMSS)</li>
            </ul>
            <div className="bg-[#F4F2EE] rounded-2xl p-4 text-sm">
              <h3 className="font-semibold text-[#2B2B2B] mb-2">4.2 Finalidades secundarias (opcionales)</h3>
              <p className="mb-2">
                Si usted <strong>no desea</strong> que sus datos sean tratados para las finalidades
                secundarias, envíe un correo a{" "}
                <a href="mailto:privacidad@mipielveracruz.com" className="text-[#5F7C71]">
                  privacidad@mipielveracruz.com
                </a>{" "}
                indicando su negativa. La negativa no afectará la prestación del servicio.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Envío de promociones, descuentos y novedades de la clínica</li>
                <li>Realización de encuestas de satisfacción</li>
                <li>Estadísticas internas anonimizadas sobre resultados de tratamientos</li>
                <li>Publicación de testimonios o resultados fotográficos (requiere autorización adicional por escrito)</li>
              </ul>
            </div>
          </section>

          {/* 5. Transferencias */}
          <section id="transferencias" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              5. Transferencias de datos personales
            </h2>
            <p className="mb-4">
              Conforme al artículo 37 de la LFPDPPP, sus datos podrán transferirse sin requerir
              consentimiento adicional únicamente en los siguientes casos:
            </p>
            <div className="space-y-3">
              {[
                {
                  titulo: "Proveedores de infraestructura tecnológica",
                  desc: "Vercel Inc. (hospedaje web), Neon Technologies Inc. (base de datos PostgreSQL), Cloudinary Inc. (almacenamiento de imágenes). Todos cuentan con contratos de encargo de tratamiento y están obligados a guardar confidencialidad.",
                },
                {
                  titulo: "Procesadores de pago",
                  desc: "Stripe, Inc., bajo su propia política de privacidad y los estándares PCI-DSS nivel 1.",
                },
                {
                  titulo: "Proveedor de IA",
                  desc: "Anthropic, PBC, para el procesamiento de análisis de piel y respuestas del asistente virtual. Los datos se transmiten de forma cifrada y no se usan para entrenar modelos de terceros.",
                },
                {
                  titulo: "Autoridades competentes",
                  desc: "Cuando sea requerido por mandato judicial, resolución administrativa o disposición legal (IMSS, SAT, Secretaría de Salud, autoridades de salud del Estado de Veracruz).",
                },
              ].map((t) => (
                <div key={t.titulo} className="flex gap-3 bg-white border border-[#E7E3DC] rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-[#5F7C71] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2B2B2B] mb-0.5">{t.titulo}</p>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-semibold text-[#2B2B2B]">
              Sus datos personales no serán vendidos, cedidos, arrendados ni comercializados a terceros.
            </p>
          </section>

          {/* 6. ARCO */}
          <section id="arco" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              6. Derechos ARCO
            </h2>
            <p className="mb-5">
              Conforme a los artículos 22–29 de la LFPDPPP, usted tiene los siguientes derechos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { letra: "A", nombre: "Acceso", desc: "Conocer qué datos personales tenemos de usted, de dónde los obtuvimos y para qué los utilizamos." },
                { letra: "R", nombre: "Rectificación", desc: "Solicitar la corrección de sus datos cuando sean inexactos, incompletos o no estén actualizados." },
                { letra: "C", nombre: "Cancelación", desc: "Pedir la supresión de sus datos cuando ya no sean necesarios para la finalidad que justificó su tratamiento." },
                { letra: "O", nombre: "Oposición", desc: "Oponerse al tratamiento de sus datos para finalidades específicas, incluyendo las secundarias." },
              ].map((d) => (
                <div key={d.letra} className="bg-white border border-[#E7E3DC] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#5F7C71] text-white font-bold flex items-center justify-center text-base shrink-0">
                      {d.letra}
                    </div>
                    <span className="font-semibold text-[#2B2B2B]">{d.nombre}</span>
                  </div>
                  <p className="text-sm">{d.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-[#2B2B2B] mb-2">Procedimiento para ejercer sus derechos</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Envíe su solicitud a{" "}
                <a href="mailto:privacidad@mipielveracruz.com" className="text-[#5F7C71]">
                  privacidad@mipielveracruz.com
                </a>{" "}
                con el asunto: <strong>"Solicitud ARCO"</strong>.
              </li>
              <li>
                Incluya: nombre completo, descripción clara del derecho que desea ejercer, y copia
                de identificación oficial vigente (INE / pasaporte).
              </li>
              <li>
                Responderemos en un plazo máximo de <strong>20 días hábiles</strong> a partir de
                la recepción de su solicitud completa (art. 32 LFPDPPP).
              </li>
              <li>
                La respuesta será efectiva dentro de los <strong>15 días hábiles</strong> siguientes
                a nuestra comunicación.
              </li>
            </ol>
            <p className="mt-4 bg-[#F4F2EE] rounded-xl p-3 text-sm">
              Si considera que su solicitud no fue atendida correctamente, puede presentar una queja
              ante el <strong>Instituto Nacional de Transparencia, Acceso a la Información y
              Protección de Datos Personales (INAI)</strong> en{" "}
              <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-[#5F7C71]">
                www.inai.org.mx
              </a>.
            </p>
          </section>

          {/* 7. Revocación */}
          <section id="revocacion" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              7. Revocación del consentimiento
            </h2>
            <p className="mb-3">
              En cualquier momento puede revocar el consentimiento otorgado para el tratamiento de
              sus datos personales, enviando su solicitud a{" "}
              <a href="mailto:privacidad@mipielveracruz.com" className="text-[#5F7C71]">
                privacidad@mipielveracruz.com
              </a>.
            </p>
            <p>
              Tenga en cuenta que la revocación del consentimiento respecto de datos de salud
              necesarios para la prestación del servicio clínico puede imposibilitar la continuación
              de su tratamiento, sin que ello genere responsabilidad alguna para Mi Piel Centro
              Dermocosmético. Los datos serán bloqueados o eliminados conforme al artículo 26 de
              la LFPDPPP, salvo que exista obligación legal de conservarlos.
            </p>
          </section>

          {/* 8. Seguridad */}
          <section id="seguridad" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              8. Medidas de seguridad
            </h2>
            <p className="mb-3">
              En cumplimiento al artículo 19 de la LFPDPPP y su Reglamento, implementamos las
              siguientes medidas técnicas, físicas y administrativas:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cifrado en tránsito mediante protocolo <strong>TLS 1.3</strong></li>
              <li>Contraseñas almacenadas con <strong>bcrypt</strong> (hash con salt)</li>
              <li>Acceso a la base de datos restringido por roles y autenticación multi-factor</li>
              <li>Copias de seguridad cifradas con retención de 30 días</li>
              <li>Políticas internas de control de acceso y confidencialidad para el personal</li>
              <li>Monitoreo de accesos no autorizados y alertas de seguridad</li>
            </ul>
            <p className="mt-3">
              En caso de vulneración de seguridad que afecte significativamente sus derechos
              patrimoniales o morales, le notificaremos de forma inmediata conforme al artículo 20
              de la LFPDPPP.
            </p>
          </section>

          {/* 9. Cookies */}
          <section id="cookies" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              9. Cookies y tecnologías de rastreo
            </h2>
            <p className="mb-4">
              Nuestro sitio utiliza cookies conforme a los{" "}
              <strong>Lineamientos del Aviso de Privacidad</strong> emitidos por el INAI (DOF 17/01/2013):
            </p>
            <div className="space-y-3">
              {[
                { tipo: "Cookies esenciales", desc: "Necesarias para autenticación y funcionamiento de la sesión. No pueden desactivarse.", obligatoria: true },
                { tipo: "Cookies de rendimiento", desc: "Estadísticas anónimas de uso (Google Analytics con IP anonimizada).", obligatoria: false },
                { tipo: "Cookies de preferencias", desc: "Recuerdan configuraciones del usuario como tema y filtros de búsqueda.", obligatoria: false },
              ].map((c) => (
                <div key={c.tipo} className="flex gap-3 bg-white border border-[#E7E3DC] rounded-xl p-3">
                  <span className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full h-fit shrink-0 ${c.obligatoria ? "bg-[#5F7C71]/10 text-[#5F7C71]" : "bg-[#F4F2EE] text-[#6B6B6B]"}`}>
                    {c.obligatoria ? "Requerida" : "Opcional"}
                  </span>
                  <div>
                    <p className="font-semibold text-[#2B2B2B] mb-0.5">{c.tipo}</p>
                    <p className="text-sm">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">
              Puede configurar su navegador para rechazar cookies; sin embargo, algunas funciones
              del portal podrían no estar disponibles.
            </p>
          </section>

          {/* 10. IA */}
          <section id="ia" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              10. Uso de Inteligencia Artificial
            </h2>
            <p className="mb-4">
              Mi Piel Centro Dermocosmético utiliza tecnología de inteligencia artificial provista
              por Anthropic, PBC en las siguientes funcionalidades:
            </p>
            <div className="space-y-3">
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-1">Skin Analyzer (análisis de piel)</p>
                <p className="text-sm">
                  Las fotografías de piel enviadas para análisis se transmiten de forma cifrada al
                  servidor y son procesadas por el modelo de IA. Los resultados son <strong>orientativos
                  y no constituyen diagnóstico médico</strong>. No se comparten imágenes con terceros
                  más allá del tiempo de procesamiento (máximo 60 segundos).
                </p>
              </div>
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-1">Asistente Virtual de WhatsApp</p>
                <p className="text-sm">
                  Los mensajes intercambiados con el asistente se almacenan en nuestra base de datos
                  para mantener el contexto conversacional y mejorar la atención. Puede solicitar la
                  eliminación de su historial de conversación ejerciendo su derecho de Cancelación
                  (sección 6). Los mensajes no son usados para entrenar modelos de IA de terceros.
                </p>
              </div>
            </div>
          </section>

          {/* 11. Menores */}
          <section id="menores" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              11. Menores de edad
            </h2>
            <p className="mb-3">
              Nuestros servicios están dirigidos a personas mayores de 18 años. En el caso de
              pacientes menores de edad, el tratamiento de sus datos personales —incluyendo datos
              de salud— deberá ser autorizado expresamente por su tutor o representante legal,
              quien firmará el consentimiento informado y será responsable de las obligaciones
              derivadas de este aviso.
            </p>
            <p>
              Conforme al artículo 4° de la <strong>Constitución Política de los Estados Unidos
              Mexicanos</strong> y la <strong>Ley General de los Derechos de Niñas, Niños y
              Adolescentes</strong>, adoptamos medidas reforzadas para la protección de los datos
              de personas menores de edad.
            </p>
          </section>

          {/* 12. Cambios */}
          <section id="cambios" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              12. Cambios al Aviso de Privacidad
            </h2>
            <p>
              El presente aviso puede ser modificado en cualquier momento para adaptarse a cambios
              normativos, tecnológicos u operativos. Le notificaremos cualquier modificación
              relevante mediante publicación en esta página y/o por correo electrónico, con al
              menos <strong>10 días hábiles de anticipación</strong> a su entrada en vigor,
              conforme al artículo 29 de la LFPDPPP. La fecha de la última actualización
              aparece al inicio de este documento.
            </p>
          </section>

          {/* 13. Contacto */}
          <section id="contacto" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              13. Contacto y Oficial de Privacidad
            </h2>
            <p className="mb-4">
              Para cualquier asunto relacionado con este aviso de privacidad o el tratamiento de
              sus datos personales, contacte a nuestro Oficial de Privacidad:
            </p>
            <div className="bg-[#F4F2EE] rounded-2xl p-5 space-y-2 text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Correo:</span>
                <a href="mailto:privacidad@mipielveracruz.com" className="text-[#5F7C71]">
                  privacidad@mipielveracruz.com
                </a>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Teléfono:</span>
                <span>+52 229 933 00 14</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Horario:</span>
                <span>Lunes a Viernes 9:00–18:00 hrs (hora del Centro)</span>
              </div>
            </div>
          </section>

          {/* Pie legal */}
          <div className="pt-8 border-t border-[#E7E3DC] text-xs text-[#9CA3AF] space-y-1.5">
            <p className="font-semibold text-[#6B6B6B]">Fundamento legal:</p>
            <ul className="space-y-0.5 list-disc pl-4">
              <li>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) — DOF 05/07/2010</li>
              <li>Reglamento de la LFPDPPP — DOF 21/12/2011</li>
              <li>Lineamientos del Aviso de Privacidad — INAI, DOF 17/01/2013</li>
              <li>NOM-004-SSA3-2012 — Expediente Clínico</li>
              <li>Ley General de Salud — Arts. 51, 51 Bis, 77 Bis</li>
              <li>Ley General de los Derechos de Niñas, Niños y Adolescentes</li>
              <li>Constitución Política de los Estados Unidos Mexicanos — Art. 16 (inviolabilidad de datos personales)</li>
            </ul>
          </div>

        </article>
      </div>
    </>
  );
}
