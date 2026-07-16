import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Mi Piel Centro Dermocosmético",
  description:
    "Términos y condiciones de uso de los servicios de Mi Piel Centro Dermocosmético conforme al Código de Comercio, Ley Federal de Protección al Consumidor y Código Civil Federal.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://mipielveracruz.com/terminos" },
};

const SECTIONS = [
  { id: "aceptacion",    label: "1. Aceptación" },
  { id: "definiciones",  label: "2. Definiciones" },
  { id: "servicios",     label: "3. Servicios" },
  { id: "cuenta",        label: "4. Registro y cuenta" },
  { id: "citas",         label: "5. Citas y cancelaciones" },
  { id: "precios",       label: "6. Precios y pagos" },
  { id: "reembolsos",    label: "7. Reembolsos" },
  { id: "obligaciones",  label: "8. Obligaciones del usuario" },
  { id: "responsabilidad", label: "9. Limitación de responsabilidad" },
  { id: "propiedad",     label: "10. Propiedad intelectual" },
  { id: "ia",            label: "11. Uso de IA" },
  { id: "menores",       label: "12. Menores de edad" },
  { id: "modificaciones",label: "13. Modificaciones" },
  { id: "jurisdiccion",  label: "14. Ley y jurisdicción" },
  { id: "contacto",      label: "15. Contacto" },
];

export default function TerminosPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-10 bg-[#FAFAF8] border-b border-[#E7E3DC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5F7C71]/10 text-[#5F7C71] text-sm font-medium mb-5">
            <FileText className="w-3.5 h-3.5" />
            Legal
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-[#6B6B6B] max-w-2xl leading-relaxed">
            Al acceder y utilizar la plataforma de <strong className="text-[#2B2B2B]">Mi Piel Centro
            Dermocosmético</strong>, usted acepta quedar vinculado por los presentes términos conforme
            a la legislación mexicana aplicable.
          </p>
          <p className="text-xs text-[#9CA3AF] mt-3">
            Última actualización: julio de 2026 &nbsp;·&nbsp; Versión 2.0
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:flex lg:gap-10">

        {/* ── Sidebar ── */}
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
              <Link href="/privacidad" className="text-xs text-[#5F7C71] hover:underline block px-2">
                Ver Aviso de Privacidad →
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Contenido ── */}
        <article className="flex-1 min-w-0 space-y-10 text-sm leading-relaxed text-[#4B4B4B]">

          {/* 1 */}
          <section id="aceptacion" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              1. Aceptación de los Términos
            </h2>
            <p className="mb-3">
              El acceso y uso del sitio web <strong>mipielveracruz.com</strong> y los servicios
              asociados constituye la aceptación plena e incondicional de los presentes Términos y
              Condiciones, conforme a lo establecido en los artículos 1792 y 1803 del{" "}
              <strong>Código Civil Federal</strong> y los artículos 89-94 del{" "}
              <strong>Código de Comercio</strong> (comercio electrónico).
            </p>
            <p>
              Si usted no está de acuerdo con alguna disposición de estos términos, deberá
              abstenerse de utilizar la plataforma. El uso continuado de los servicios tras la
              publicación de modificaciones implica la aceptación tácita de los nuevos términos.
            </p>
          </section>

          {/* 2 */}
          <section id="definiciones" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              2. Definiciones
            </h2>
            <div className="space-y-2">
              {[
                { term: '"La Clínica" / "nosotros"', def: 'Mi Piel Centro Dermocosmético, con domicilio en Boca del Río, Veracruz, México.' },
                { term: '"Plataforma"', def: 'El sitio web mipielveracruz.com, su aplicación móvil y los servicios digitales asociados.' },
                { term: '"Usuario" / "usted"', def: 'Cualquier persona física que acceda, navegue o utilice la plataforma.' },
                { term: '"Paciente"', def: 'Usuario que agenda y recibe tratamientos en las instalaciones de La Clínica.' },
                { term: '"Cita"', def: 'Reservación confirmada de un tratamiento para una fecha y hora específicas.' },
                { term: '"Tratamiento"', def: 'Servicio de depilación láser, hidrofacial, fototerapia Celluma LED, Skin Analyzer u otro servicio ofrecido por La Clínica.' },
                { term: '"Contenido"', def: 'Textos, imágenes, logotipos, código y cualquier material publicado en la Plataforma.' },
              ].map((d) => (
                <div key={d.term} className="flex gap-3 bg-[#F4F2EE] rounded-xl px-4 py-3">
                  <span className="font-semibold text-[#2B2B2B] shrink-0 min-w-[160px]">{d.term}:</span>
                  <span>{d.def}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3 */}
          <section id="servicios" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              3. Descripción de Servicios
            </h2>
            <p className="mb-3">
              Mi Piel Centro Dermocosmético ofrece los siguientes servicios en sus instalaciones
              físicas ubicadas en Boca del Río, Veracruz, y a través de su plataforma digital:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Depilación láser de diodo grado médico (axilas, bikini, piernas, facial, espalda, cuerpo completo)</li>
              <li>Hidrofacial y tratamientos de limpieza profunda</li>
              <li>Fototerapia Celluma LED</li>
              <li>Análisis de piel con Inteligencia Artificial (Skin Analyzer)</li>
              <li>Venta de productos dermatológicos y de skincare</li>
              <li>Paquetes personalizados de tratamientos</li>
            </ul>
            <p>
              La disponibilidad de los servicios puede variar según la capacidad de la clínica y
              los recursos disponibles. La Clínica se reserva el derecho de modificar, suspender
              o descontinuar servicios en cualquier momento, notificándolo con razonable anticipación.
            </p>
          </section>

          {/* 4 */}
          <section id="cuenta" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              4. Registro y Cuenta de Usuario
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Para agendar citas en línea, el usuario deberá crear una cuenta proporcionando
                información veraz, actualizada y completa. Datos falsos liberan a La Clínica de
                toda responsabilidad derivada de errores en el tratamiento.
              </li>
              <li>
                El usuario es responsable de mantener la confidencialidad de sus credenciales de
                acceso (correo y contraseña). Cualquier actividad realizada desde su cuenta se
                presumirá autorizada por usted.
              </li>
              <li>
                La Clínica podrá suspender o cancelar cuentas que incurran en uso fraudulento,
                falsa identidad, abuso del sistema o violación de estos términos, sin responsabilidad
                alguna, conforme al artículo 1857 del Código Civil Federal.
              </li>
              <li>
                El usuario podrá solicitar la eliminación de su cuenta en cualquier momento,
                ejerciendo su derecho de Cancelación conforme al Aviso de Privacidad.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section id="citas" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              5. Reservaciones, Citas y Cancelaciones
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-2">5.1 Confirmación de cita</p>
                <p>
                  Una cita se considera confirmada únicamente cuando el usuario recibe un correo
                  de confirmación con número de referencia. La sola reservación en línea no garantiza
                  el espacio hasta recibir dicha confirmación.
                </p>
              </div>
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-2">5.2 Cancelaciones por el paciente</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Las cancelaciones deben realizarse con <strong>mínimo 24 horas de anticipación</strong> por teléfono, WhatsApp o a través del portal.</li>
                  <li>Las cancelaciones con menos de 24 horas o la inasistencia sin aviso podrán generar un cargo administrativo equivalente al 20% del costo del servicio.</li>
                  <li>Dos inasistencias consecutivas sin aviso podrán resultar en la suspensión temporal de la cuenta para reservaciones en línea.</li>
                </ul>
              </div>
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-2">5.3 Cancelaciones por La Clínica</p>
                <p>
                  La Clínica podrá cancelar o reprogramar citas en casos de fuerza mayor, emergencias,
                  fallas de equipos o causas justificadas, notificando al paciente con la mayor
                  anticipación posible y ofreciendo una fecha alternativa sin costo adicional.
                </p>
              </div>
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-2">5.4 Puntualidad</p>
                <p>
                  Se solicita llegar puntualmente. Un retraso mayor a 15 minutos podrá resultar
                  en la reducción del tiempo de la sesión o en la necesidad de reprogramar la cita,
                  según la disponibilidad del especialista.
                </p>
              </div>
            </div>
          </section>

          {/* 6 */}
          <section id="precios" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              6. Precios, Pagos y Facturación
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Todos los precios publicados en la plataforma se expresan en <strong>pesos mexicanos (MXN)</strong>
                e incluyen el IVA correspondiente, conforme a la Ley del IVA vigente.
              </li>
              <li>
                La Clínica se reserva el derecho de modificar sus precios en cualquier momento.
                Los cambios no afectarán citas ya confirmadas y pagadas.
              </li>
              <li>
                Los pagos en línea se realizan mediante <strong>Stripe, Inc.</strong> (tarjeta de
                crédito / débito) bajo protocolo de seguridad PCI-DSS. También se aceptan pagos
                en efectivo y transferencia bancaria en clínica.
              </li>
              <li>
                Para paquetes de múltiples sesiones, el pago puede realizarse por sesión o de
                forma anticipada con el descuento correspondiente, según los términos del paquete
                contratado.
              </li>
              <li>
                La Clínica emitirá <strong>Comprobante Fiscal Digital (CFDI)</strong> a solicitud
                del paciente, conforme al artículo 29 del Código Fiscal de la Federación. Para
                ello es necesario proporcionar RFC y datos fiscales al momento del pago.
              </li>
              <li>
                Las meses sin intereses (MSI) están sujetas a disponibilidad de la institución
                bancaria emisora y pueden modificarse sin previo aviso.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section id="reembolsos" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              7. Política de Reembolsos
            </h2>
            <p className="mb-3">
              Conforme a los artículos 92 y 92 Ter de la{" "}
              <strong>Ley Federal de Protección al Consumidor (LFPC)</strong>, el paciente tiene
              derecho a solicitar reembolso en los siguientes supuestos:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Cuando La Clínica cancele una cita y no ofrezca fecha alternativa en un plazo de 7 días hábiles.</li>
              <li>Cuando el servicio no sea prestado por causas atribuibles exclusivamente a La Clínica.</li>
              <li>Cuando el servicio prestado presente deficiencias graves debidamente documentadas.</li>
            </ul>
            <div className="bg-[#F4F2EE] rounded-2xl p-4 text-sm">
              <p className="font-semibold text-[#2B2B2B] mb-2">Supuestos en que NO aplica reembolso:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Inasistencia del paciente sin cancelación previa</li>
                <li>Cancelación con menos de 24 horas de anticipación</li>
                <li>Reacción adversa relacionada con condición médica preexistente no informada al momento de la valoración</li>
                <li>Insatisfacción subjetiva con resultados, dado que la depilación láser depende del tipo de piel y ciclo capilar individual</li>
                <li>Sesiones ya aplicadas en paquetes parcialmente utilizados</li>
              </ul>
            </div>
            <p className="mt-3">
              Para solicitar un reembolso, el paciente deberá contactar a La Clínica dentro de los
              <strong> 5 días hábiles</strong> siguientes al evento que lo motiva, presentando su
              comprobante de pago. Los reembolsos aprobados se procesarán en un plazo máximo de
              10 días hábiles.
            </p>
          </section>

          {/* 8 */}
          <section id="obligaciones" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              8. Obligaciones del Usuario
            </h2>
            <p className="mb-3">Al utilizar la plataforma y los servicios, el usuario se obliga a:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Proporcionar información veraz y actualizada en su registro, expediente clínico y formularios.</li>
              <li>Informar al especialista sobre condiciones médicas, alergias o medicamentos que puedan influir en el tratamiento.</li>
              <li>Seguir las instrucciones de preparación y cuidado post-tratamiento proporcionadas por el personal clínico.</li>
              <li>No utilizar la plataforma para fines ilegales, fraudulentos o que afecten los derechos de terceros.</li>
              <li>No reproducir, copiar, vender ni explotar ningún contenido de la plataforma sin autorización escrita.</li>
              <li>No intentar acceder a áreas restringidas del sistema o interferir con su operación.</li>
              <li>Respetar al personal y a otros usuarios dentro de las instalaciones y en los canales de comunicación digitales.</li>
            </ul>
          </section>

          {/* 9 */}
          <section id="responsabilidad" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              9. Limitación de Responsabilidad
            </h2>
            <p className="mb-3">
              Conforme al artículo 1915 del Código Civil Federal y dentro de los límites permitidos
              por la LFPC:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Resultados de tratamientos:</strong> La Clínica no garantiza resultados
                específicos de ningún tratamiento, ya que estos varían individualmente según el
                tipo de piel, ciclo capilar, historial médico y adherencia al protocolo. Los
                resultados mostrados en el sitio son referenciales y no constituyen promesa contractual.
              </li>
              <li>
                <strong>Información médica:</strong> El contenido del sitio web tiene carácter
                informativo y educativo únicamente. No constituye ni sustituye la consulta con un
                médico o dermatólogo certificado.
              </li>
              <li>
                <strong>Disponibilidad de la plataforma:</strong> La Clínica no garantiza disponibilidad
                ininterrumpida del sitio web y no será responsable por interrupciones ocasionadas
                por mantenimiento, fuerza mayor o causas ajenas a su control.
              </li>
              <li>
                <strong>Daños indirectos:</strong> En ningún caso La Clínica será responsable por
                daños incidentales, especiales, punitivos o consecuentes derivados del uso o la
                imposibilidad de uso de la plataforma.
              </li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900">
              <strong>Reacciones adversas:</strong> El paciente es responsable de informar verazmente
              sobre sus condiciones de salud previas al tratamiento. Las reacciones adversas derivadas
              de información omitida o falsa no serán imputables a La Clínica. La Clínica cuenta con
              protocolos de manejo de emergencias y personal capacitado para atenderlas.
            </div>
          </section>

          {/* 10 */}
          <section id="propiedad" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              10. Propiedad Intelectual
            </h2>
            <p className="mb-3">
              Conforme a la <strong>Ley Federal del Derecho de Autor</strong> (LFDA, DOF 24/12/1996)
              y la <strong>Ley de la Propiedad Industrial</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Todo el contenido de la plataforma —incluyendo textos, fotografías, logotipos,
                diseño gráfico, código fuente, base de datos y marcas— es propiedad exclusiva
                de Mi Piel Centro Dermocosmético o de sus licenciantes.
              </li>
              <li>
                Queda prohibida la reproducción, distribución, modificación, transmisión pública
                o cualquier otra explotación del contenido sin autorización previa y escrita de
                La Clínica.
              </li>
              <li>
                El usuario podrá imprimir o descargar contenido para uso personal y no comercial,
                sin eliminar los avisos de derechos de autor o marcas registradas.
              </li>
              <li>
                Las fotografías de resultados de tratamientos publicadas en el sitio cuentan con
                autorización expresa de los pacientes. Su uso no autorizado constituye una
                violación a la LFDA y a la LFPDPPP.
              </li>
            </ul>
          </section>

          {/* 11 */}
          <section id="ia" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              11. Uso de Inteligencia Artificial
            </h2>
            <div className="space-y-3">
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-1">Skin Analyzer</p>
                <p>
                  El análisis de piel mediante IA es una herramienta de orientación cosmética y
                  <strong> no constituye diagnóstico médico</strong> bajo ninguna circunstancia.
                  Los resultados son generados por un modelo de lenguaje (Anthropic Claude) y pueden
                  contener imprecisiones. La Clínica recomienda siempre la valoración presencial con
                  un especialista certificado.
                </p>
              </div>
              <div className="bg-white border border-[#E7E3DC] rounded-xl p-4">
                <p className="font-semibold text-[#2B2B2B] mb-1">Asistente Virtual de WhatsApp</p>
                <p>
                  El asistente responde automáticamente con información general sobre los servicios
                  de La Clínica. Sus respuestas no vinculan contractualmente a La Clínica en materia
                  de precios, disponibilidad o diagnósticos. Para información definitiva, consulte
                  directamente con el personal clínico.
                </p>
              </div>
            </div>
          </section>

          {/* 12 */}
          <section id="menores" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              12. Menores de Edad
            </h2>
            <p className="mb-3">
              El registro en la plataforma y la contratación de servicios están dirigidos a personas
              mayores de 18 años. Los menores de edad podrán recibir tratamientos únicamente con la
              presencia y autorización escrita de su padre, madre o tutor legal, quien asumirá plena
              responsabilidad sobre la veracidad de la información proporcionada y la idoneidad del
              tratamiento para el menor.
            </p>
            <p>
              Lo anterior conforme a los artículos 23 y 451 del <strong>Código Civil Federal</strong>{" "}
              y el artículo 4° de la <strong>Constitución Política de los Estados Unidos Mexicanos</strong>.
            </p>
          </section>

          {/* 13 */}
          <section id="modificaciones" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              13. Modificaciones a los Términos
            </h2>
            <p>
              La Clínica se reserva el derecho de modificar los presentes Términos y Condiciones
              en cualquier momento. Las modificaciones entrarán en vigor a los{" "}
              <strong>10 días hábiles</strong> de su publicación en esta página. Se notificará a
              los usuarios registrados por correo electrónico. El uso continuado de la plataforma
              tras la vigencia de las modificaciones constituye aceptación de las mismas, conforme
              al artículo 1803, fracción II del Código Civil Federal (aceptación tácita).
            </p>
          </section>

          {/* 14 */}
          <section id="jurisdiccion" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              14. Ley Aplicable y Jurisdicción
            </h2>
            <p className="mb-3">
              Los presentes Términos y Condiciones se rigen e interpretan conforme a las leyes de
              los Estados Unidos Mexicanos. Para la resolución de cualquier controversia derivada
              de estos términos, las partes se someten expresamente a la jurisdicción y competencia
              de los <strong>Tribunales competentes de la ciudad de Veracruz, Ver.</strong>,
              renunciando a cualquier otro fuero que por razón de su domicilio presente o futuro
              pudiera corresponderles.
            </p>
            <p className="mb-3">
              Sin perjuicio de lo anterior, los consumidores tienen derecho a presentar su queja
              ante la <strong>Procuraduría Federal del Consumidor (PROFECO)</strong>:
            </p>
            <div className="bg-[#F4F2EE] rounded-xl p-4 text-sm space-y-1">
              <p>Tel. PROFECO: <strong>55 5568-8722</strong> (CDMX) / <strong>800 468-8722</strong> (nacional)</p>
              <p>Portal: <a href="https://www.gob.mx/profeco" target="_blank" rel="noopener noreferrer" className="text-[#5F7C71]">www.gob.mx/profeco</a></p>
            </div>
          </section>

          {/* 15 */}
          <section id="contacto" className="scroll-mt-24">
            <h2 className="font-display text-lg font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-[#E7E3DC]">
              15. Contacto
            </h2>
            <p className="mb-4">
              Para dudas, aclaraciones o reclamaciones relacionadas con estos Términos y Condiciones:
            </p>
            <div className="bg-[#F4F2EE] rounded-2xl p-5 space-y-2 text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Correo:</span>
                <a href="mailto:contacto@mipielveracruz.com" className="text-[#5F7C71]">
                  contacto@mipielveracruz.com
                </a>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Teléfono:</span>
                <a href="tel:+522299330014" className="text-[#5F7C71]">+52 229 933 00 14</a>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">WhatsApp:</span>
                <a href="https://wa.me/522299330014" target="_blank" rel="noopener noreferrer" className="text-[#5F7C71]">
                  wa.me/522299330014
                </a>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-1">
                <span className="font-semibold text-[#2B2B2B]">Horario:</span>
                <span>Lunes a Viernes 9:00–18:00 hrs · Sábados 9:00–14:00 hrs</span>
              </div>
            </div>
          </section>

          {/* Pie legal */}
          <div className="pt-8 border-t border-[#E7E3DC] text-xs text-[#9CA3AF] space-y-1.5">
            <p className="font-semibold text-[#6B6B6B]">Fundamento legal:</p>
            <ul className="space-y-0.5 list-disc pl-4">
              <li>Código Civil Federal — Arts. 1792, 1803, 1857, 1915</li>
              <li>Código de Comercio — Arts. 89-94 (Comercio Electrónico)</li>
              <li>Ley Federal de Protección al Consumidor (LFPC) — Arts. 7, 32, 92, 92 Ter</li>
              <li>Ley Federal del Derecho de Autor (LFDA) — DOF 24/12/1996</li>
              <li>Ley de la Propiedad Industrial</li>
              <li>Código Fiscal de la Federación — Art. 29 (CFDI)</li>
              <li>Constitución Política de los Estados Unidos Mexicanos — Arts. 4°, 16</li>
            </ul>
            <p className="mt-2">
              <Link href="/privacidad" className="text-[#5F7C71] hover:underline">
                Ver Aviso de Privacidad
              </Link>
            </p>
          </div>

        </article>
      </div>
    </>
  );
}
