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

const brandStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 600px; margin: 0 auto; background: #ffffff;
`;

function emailLayout(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#fdf4f3;">
      <div style="${brandStyles}">
        <div style="background:linear-gradient(135deg,#f43f5e,#fb7185);padding:32px 40px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            Mi Piel Veracruz
          </h1>
          <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:13px;">
            Clínica de Depilación Láser Premium
          </p>
        </div>
        <div style="padding:40px;background:#ffffff;">
          ${content}
        </div>
        <div style="padding:24px 40px;background:#fdf4f3;text-align:center;border-top:1px solid #fecdd3;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            Mi Piel Veracruz · Boca del Río, Veracruz, México
          </p>
          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
            © ${new Date().getFullYear()} Mi Piel Veracruz. Todos los derechos reservados.
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
    <h2 style="color:#be123c;font-size:20px;margin:0 0 8px;">¡Cita confirmada!</h2>
    <p style="color:#374151;margin:0 0 24px;">Hola ${name}, tu cita ha sido confirmada exitosamente.</p>
    <div style="background:#fdf4f3;border-radius:12px;padding:24px;margin:0 0 24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Servicio</td>
            <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${details.service}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-top:1px solid #fecdd3;">Fecha</td>
            <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;border-top:1px solid #fecdd3;">${details.date}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-top:1px solid #fecdd3;">Hora</td>
            <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;border-top:1px solid #fecdd3;">${details.time}</td></tr>
        ${details.employee ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-top:1px solid #fecdd3;">Especialista</td>
            <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;border-top:1px solid #fecdd3;">${details.employee}</td></tr>` : ""}
      </table>
    </div>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/citas"
       style="display:inline-block;background:linear-gradient(135deg,#f43f5e,#fb7185);color:white;
              padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:600;font-size:14px;">
      Ver mi cita
    </a>
    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">
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
    <h2 style="color:#be123c;font-size:20px;margin:0 0 8px;">Recordatorio de tu cita</h2>
    <p style="color:#374151;margin:0 0 24px;">Hola ${name}, te recordamos que tienes una cita mañana.</p>
    <div style="background:#fdf4f3;border-radius:12px;padding:24px;margin:0 0 24px;">
      <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${details.service}</p>
      <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">${details.date} a las ${details.time}</p>
    </div>
    <p style="color:#374151;font-size:14px;margin:0 0 8px;"><strong>Recomendaciones:</strong></p>
    <ul style="color:#6b7280;font-size:14px;margin:0;padding-left:20px;">
      <li>No apliques cremas ni desodorantes en la zona a tratar</li>
      <li>Rasurate 24-48h antes de tu cita</li>
      <li>Llega 5 minutos antes de tu cita</li>
    </ul>
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
    <h2 style="color:#be123c;font-size:20px;margin:0 0 8px;">Restablecer contraseña</h2>
    <p style="color:#374151;margin:0 0 24px;">Hola ${name}, recibimos una solicitud para restablecer tu contraseña.</p>
    <a href="${resetUrl}"
       style="display:inline-block;background:linear-gradient(135deg,#f43f5e,#fb7185);color:white;
              padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:600;font-size:14px;">
      Restablecer contraseña
    </a>
    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">
      Este enlace expira en 1 hora. Si no solicitaste restablecer tu contraseña, ignora este mensaje.
    </p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `🔐 Restablecer contraseña | Mi Piel Veracruz`,
    html,
  });
}
