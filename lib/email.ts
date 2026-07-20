import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SAGE = "#5F7C71";
const GOLD = "#C8A96A";
const CREAM = "#FAFAF8";

function emailLayout(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#F4F2EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="height:4px;background:linear-gradient(90deg,${SAGE},${GOLD});"></div>
        <div style="padding:32px 40px 28px;text-align:center;background:white;border-bottom:1px solid #E7E3DC;">
          <h1 style="color:${SAGE};margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
            Mi Piel Veracruz
          </h1>
          <p style="color:#9A9A9A;margin:4px 0 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">
            Centro Dermocosmético
          </p>
        </div>
        <!-- Body -->
        <div style="padding:40px;background:#ffffff;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="padding:24px 40px;background:${CREAM};text-align:center;border-top:1px solid #E7E3DC;">
          <p style="margin:0;font-size:12px;color:#9A9A9A;">
            Mi Piel Veracruz · Boca del Río, Veracruz, México
          </p>
          <p style="margin:4px 0 0;font-size:12px;color:#9A9A9A;">
            <a href="tel:+522299330014" style="color:${SAGE};text-decoration:none;">+52 229 933 0014</a>
            &nbsp;·&nbsp;
            <a href="https://mipielveracruz.com" style="color:${SAGE};text-decoration:none;">mipielveracruz.com</a>
          </p>
          <p style="margin:8px 0 0;font-size:11px;color:#BBBBBB;">
            © ${new Date().getFullYear()} Mi Piel Centro Dermocosmético. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendAppointmentConfirmation(
  to: string,
  name: string,
  details: { service: string; date: string; time: string; employee?: string }
) {
  const html = emailLayout(`
    <h2 style="color:${SAGE};font-size:20px;font-weight:800;margin:0 0 6px;">¡Cita confirmada! ✓</h2>
    <p style="color:#4B4B4B;margin:0 0 24px;font-size:15px;">Hola <strong>${name}</strong>, tu cita ha sido confirmada exitosamente.</p>
    <div style="background:#F4F2EE;border-radius:14px;padding:24px;margin:0 0 24px;border:1px solid #E7E3DC;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:9px 0;color:#9A9A9A;font-size:13px;">Servicio</td>
            <td style="padding:9px 0;color:#2B2B2B;font-size:14px;font-weight:700;text-align:right;">${details.service}</td></tr>
        <tr><td style="padding:9px 0;color:#9A9A9A;font-size:13px;border-top:1px solid #E7E3DC;">Fecha</td>
            <td style="padding:9px 0;color:#2B2B2B;font-size:14px;font-weight:700;text-align:right;border-top:1px solid #E7E3DC;">${details.date}</td></tr>
        <tr><td style="padding:9px 0;color:#9A9A9A;font-size:13px;border-top:1px solid #E7E3DC;">Hora</td>
            <td style="padding:9px 0;color:#2B2B2B;font-size:14px;font-weight:700;text-align:right;border-top:1px solid #E7E3DC;">${details.time}</td></tr>
        ${details.employee ? `<tr><td style="padding:9px 0;color:#9A9A9A;font-size:13px;border-top:1px solid #E7E3DC;">Especialista</td>
            <td style="padding:9px 0;color:#2B2B2B;font-size:14px;font-weight:700;text-align:right;border-top:1px solid #E7E3DC;">${details.employee}</td></tr>` : ""}
      </table>
    </div>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/citas"
       style="display:inline-block;background:${SAGE};color:white;padding:14px 32px;border-radius:14px;text-decoration:none;font-weight:700;font-size:14px;">
      Ver mi cita
    </a>
    <p style="color:#6F6F6F;font-size:13px;margin:24px 0 0;">
      Si necesitas cancelar o reagendar, puedes hacerlo desde tu panel con al menos 24 horas de anticipación.
    </p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `✅ Cita confirmada - ${details.service} | Mi Piel Veracruz`,
    html,
  });
}

export async function sendAppointmentReminder(
  to: string,
  name: string,
  details: { service: string; date: string; time: string }
) {
  const html = emailLayout(`
    <h2 style="color:${SAGE};font-size:20px;font-weight:800;margin:0 0 6px;">⏰ Recordatorio de tu cita</h2>
    <p style="color:#4B4B4B;margin:0 0 24px;font-size:15px;">Hola <strong>${name}</strong>, te recordamos que tienes una cita mañana.</p>
    <div style="background:${SAGE};border-radius:14px;padding:24px;margin:0 0 24px;">
      <p style="margin:0;font-size:16px;font-weight:700;color:white;">${details.service}</p>
      <p style="margin:6px 0 0;font-size:15px;color:rgba(255,255,255,.8);">${details.date} · ${details.time}</p>
    </div>
    <p style="color:#2B2B2B;font-size:14px;font-weight:700;margin:0 0 10px;">Recomendaciones para tu sesión:</p>
    <ul style="color:#6F6F6F;font-size:14px;margin:0;padding-left:20px;line-height:1.8;">
      <li>No apliques cremas ni desodorantes en la zona a tratar el día de tu cita</li>
      <li>Aféitate 24–48 horas antes (no uses cera ni crema depilatoria)</li>
      <li>Llega 5 minutos antes de tu cita</li>
      <li>Evita exponerte al sol intenso 2 semanas antes del tratamiento</li>
    </ul>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E7E3DC;">
      <a href="https://wa.me/522299330014?text=Hola%2C+quiero+reagendar+mi+cita"
         style="display:inline-block;background:#22c55e;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;margin-right:8px;">
        Reagendar por WhatsApp
      </a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/citas"
         style="display:inline-block;background:#F4F2EE;color:${SAGE};padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;border:1px solid #E7E3DC;">
        Ver mi cita
      </a>
    </div>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `⏰ Recordatorio: tu cita es mañana | Mi Piel Veracruz`,
    html,
  });
}

export async function sendPasswordReset(to: string, name: string, resetUrl: string) {
  const html = emailLayout(`
    <h2 style="color:${SAGE};font-size:20px;font-weight:800;margin:0 0 6px;">Restablecer contraseña</h2>
    <p style="color:#4B4B4B;margin:0 0 24px;font-size:15px;">Hola <strong>${name}</strong>, recibimos una solicitud para restablecer tu contraseña.</p>
    <a href="${resetUrl}"
       style="display:inline-block;background:${SAGE};color:white;padding:14px 32px;border-radius:14px;text-decoration:none;font-weight:700;font-size:14px;">
      Restablecer contraseña
    </a>
    <p style="color:#9A9A9A;font-size:13px;margin:24px 0 0;">
      Este enlace expira en 1 hora. Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje con seguridad.
    </p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `🔐 Restablecer contraseña | Mi Piel Veracruz`,
    html,
  });
}
