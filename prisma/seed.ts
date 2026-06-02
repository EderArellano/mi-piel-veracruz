import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de MiPiel...");

  // ── Admin / empleada principal ───────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mipielveracruz.com" },
    update: {},
    create: {
      name: "Mi Piel Admin",
      email: "admin@mipielveracruz.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "+52 229 933 00 14",
      medicalRecord: { create: {} },
    },
  });

  // Empleada vinculada al admin (para que aparezca en el sistema de citas)
  await prisma.employee.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      bio: "Especialista en depilación láser y tratamientos dermoestéticos.",
      specialties: ["Depilación láser", "Hidrofacial", "Celluma LED", "Skin Analyzer"],
      isActive: true,
      schedule: {
        monday:    { start: "09:00", end: "20:00" },
        tuesday:   { start: "09:00", end: "20:00" },
        wednesday: { start: "09:00", end: "20:00" },
        thursday:  { start: "09:00", end: "20:00" },
        friday:    { start: "09:00", end: "20:00" },
        saturday:  { start: "09:00", end: "15:00" },
        sunday:    null,
      },
    },
  });

  // ── Cliente demo ─────────────────────────────────────────────────────
  const clientPassword = await bcrypt.hash("Cliente123!", 12);
  await prisma.user.upsert({
    where: { email: "cliente@demo.com" },
    update: {},
    create: {
      name: "María García",
      email: "cliente@demo.com",
      password: clientPassword,
      phone: "+52 229 555 0001",
      role: "CLIENT",
      medicalRecord: {
        create: {
          skinType: "TYPE_III",
          totalSessions: 4,
        },
      },
    },
  });

  // ── Categorías de blog ───────────────────────────────────────────────
  const [catLaser, , catDerma] = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: "depilacion-laser" },
      update: {},
      create: { name: "Depilación Láser", slug: "depilacion-laser", description: "Todo sobre depilación láser" },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "cuidado-piel" },
      update: {},
      create: { name: "Cuidado de la Piel", slug: "cuidado-piel" },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "dermatologia" },
      update: {},
      create: { name: "Dermatología Estética", slug: "dermatologia" },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "belleza" },
      update: {},
      create: { name: "Belleza", slug: "belleza" },
    }),
  ]);

  // ── Servicios reales de MiPiel ────────────────────────────────────────
  const services = [
    // Depilación láser — zonas
    {
      name: "Depilación Láser Facial",
      slug: "depilacion-facial",
      duration: 20,
      price: 500,
      category: "FACIAL",
      description: "Labio, mentón, patillas y cejas. Láser diodo grado médico para una piel suave, clara y libre de vello.",
    },
    {
      name: "Depilación Láser Axilas",
      slug: "depilacion-axilas",
      duration: 15,
      price: 600,
      category: "ARMPITS",
      description: "Área más popular. Rápido, efectivo y sin manchas oscuras.",
    },
    {
      name: "Depilación Láser Bikini Clásico",
      slug: "depilacion-bikini-clasico",
      duration: 20,
      price: 800,
      category: "BIKINI",
      description: "Línea de bikini clásica. Discreta y efectiva.",
    },
    {
      name: "Depilación Láser Bikini Brasileño",
      slug: "depilacion-bikini-brasileno",
      duration: 30,
      price: 1000,
      category: "BIKINI",
      description: "Bikini integral brasileño.",
    },
    {
      name: "Depilación Láser Media Pierna",
      slug: "depilacion-media-pierna",
      duration: 40,
      price: 900,
      category: "LEGS",
      description: "Desde la rodilla hacia abajo. Piel suave sin esfuerzo.",
    },
    {
      name: "Depilación Láser Pierna Completa",
      slug: "depilacion-pierna-completa",
      duration: 60,
      price: 1200,
      category: "LEGS",
      description: "Piernas completas desde muslos hasta pies.",
    },
    {
      name: "Depilación Láser Cuerpo Completo",
      slug: "depilacion-cuerpo-completo",
      duration: 120,
      price: 4500,
      category: "FULL_BODY",
      description: "Todas las zonas incluidas. La solución definitiva para una piel perfecta.",
    },
    {
      name: "Depilación Láser Espalda (Hombre)",
      slug: "depilacion-espalda-hombre",
      duration: 40,
      price: 1500,
      category: "MENS",
      description: "Espalda completa para hombres.",
    },
    {
      name: "Depilación Láser Pecho (Hombre)",
      slug: "depilacion-pecho-hombre",
      duration: 30,
      price: 1000,
      category: "MENS",
      description: "Pecho y abdomen para hombres.",
    },
    // Nuevos servicios MiPiel
    {
      name: "Hidrofacial",
      slug: "hidrofacial",
      duration: 60,
      price: 800,
      category: "OTHER",
      description: "Revitalizamos tu rostro hidratando y rejuveneciendo. Limpieza profunda, exfoliación y nutrición en un solo tratamiento.",
    },
    {
      name: "Celluma LED",
      slug: "celluma-led",
      duration: 30,
      price: 600,
      category: "OTHER",
      description: "Fototerapia grado médico que mejora la salud y aspecto de tu piel. Estimula el colágeno y reduce imperfecciones.",
    },
    {
      name: "Skin Analyzer",
      slug: "skin-analyzer",
      duration: 30,
      price: 0,
      category: "OTHER",
      description: "Analizamos tu piel para brindarte un tratamiento 100% personalizado. Sin costo, sin compromiso.",
    },
    // Paquetes
    {
      name: "Paquete Axilas + Bikini (6 sesiones)",
      slug: "paquete-axilas-bikini",
      duration: 45,
      price: 1800,
      category: "PACKAGE",
      isPackage: true,
      sessionsIncluded: 6,
      description: "Las zonas más solicitadas. Descuento del 20% vs sesiones individuales.",
    },
    {
      name: "Paquete Axilas + Bikini + Media Pierna (6 sesiones)",
      slug: "paquete-popular",
      duration: 90,
      price: 3200,
      category: "PACKAGE",
      isPackage: true,
      sessionsIncluded: 6,
      description: "El paquete más popular. Axilas, bikini y media pierna con 20% de descuento.",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        category: service.category as never,
        currency: "MXN",
        isActive: true,
      },
    });
  }

  // ── Blog post de ejemplo ──────────────────────────────────────────────
  await prisma.blogPost.upsert({
    where: { slug: "cuanto-cuesta-depilacion-laser-veracruz" },
    update: {},
    create: {
      title: "¿Cuánto cuesta la depilación láser en Veracruz? Guía de precios 2025",
      slug: "cuanto-cuesta-depilacion-laser-veracruz",
      excerpt: "Descubre los precios reales de la depilación láser en Veracruz y Boca del Río. Comparativa de zonas, número de sesiones y factores que afectan el costo.",
      content: `<h2>Precios de depilación láser en Veracruz</h2>
<p>Los precios de la depilación láser en Veracruz varían según la zona, la tecnología y el número de sesiones.</p>
<h2>¿Cuántas sesiones necesito?</h2>
<p>En promedio se requieren entre 6 y 10 sesiones para resultados permanentes del 85–95%.</p>
<h2>¿Qué incluye el precio en MiPiel?</h2>
<p>En MiPiel Centro Dermocosmético el precio incluye la sesión de láser Diodo grado médico, el gel conductor, el Skin Analyzer previo y el seguimiento post-tratamiento.</p>`,
      status: "PUBLISHED",
      publishedAt: new Date(),
      readTime: 5,
      authorId: admin.id,
      categoryId: catLaser.id,
      tags: ["precios", "veracruz", "depilacion laser", "costos"],
      seoTitle: "Precios Depilación Láser Veracruz 2025 | MiPiel Centro Dermocosmético",
      seoDesc: "Precios actualizados de depilación láser en Veracruz y Boca del Río. Axilas $600, piernas $900–$1,200, cuerpo completo $4,500. Primera consulta gratis.",
      seoKeywords: ["precio depilación láser Veracruz", "depilación láser Boca del Río"],
      faqs: {
        create: [
          {
            question: "¿Cuánto cuesta la depilación láser en Veracruz?",
            answer: "Los precios varían por zona: axilas $600, facial $500, bikini $800–$1,000, pierna completa $1,200 y cuerpo completo $4,500. Primera consulta con Skin Analyzer gratis.",
            order: 0,
          },
          {
            question: "¿Cuántas sesiones necesito?",
            answer: "En promedio 6–10 sesiones según zona y tipo de vello. Siempre hacemos una valoración personalizada sin costo.",
            order: 1,
          },
          {
            question: "¿Duele la depilación láser?",
            answer: "Con el láser Diodo de MiPiel la incomodidad es mínima. La mayoría de las pacientes lo describen como un ligero hormigueo tolerable.",
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "que-es-hidrofacial" },
    update: {},
    create: {
      title: "¿Qué es el Hidrofacial y para qué sirve?",
      slug: "que-es-hidrofacial",
      excerpt: "El Hidrofacial es el tratamiento facial más solicitado del año. Conoce cómo funciona, sus beneficios y por qué tu piel lo necesita.",
      content: `<h2>¿Qué es el Hidrofacial?</h2>
<p>El Hidrofacial es un tratamiento de medicina estética no invasivo que combina limpieza profunda, exfoliación, extracción de impurezas e hidratación en una sola sesión.</p>
<h2>Beneficios del Hidrofacial</h2>
<ul>
<li>Limpieza profunda de poros</li>
<li>Hidratación intensa</li>
<li>Reducción de manchas y ojeras</li>
<li>Efecto glow inmediato</li>
<li>Sin tiempo de recuperación</li>
</ul>
<h2>¿Con qué frecuencia se recomienda?</h2>
<p>Para mantener resultados óptimos se recomienda una sesión mensual. En MiPiel combinamos el Hidrofacial con el Skin Analyzer para personalizar cada tratamiento.</p>`,
      status: "PUBLISHED",
      publishedAt: new Date(),
      readTime: 4,
      authorId: admin.id,
      categoryId: catDerma.id,
      tags: ["hidrofacial", "facial", "piel", "tratamiento"],
      seoTitle: "¿Qué es el Hidrofacial? Beneficios y resultados | MiPiel Veracruz",
      seoDesc: "Conoce el Hidrofacial en MiPiel Veracruz: limpieza profunda, hidratación y rejuvenecimiento en una sola sesión. Sin dolor ni tiempo de recuperación.",
      seoKeywords: ["hidrofacial Veracruz", "tratamiento facial Boca del Río"],
      faqs: {
        create: [
          {
            question: "¿Cuánto dura el Hidrofacial?",
            answer: "Una sesión de Hidrofacial dura aproximadamente 60 minutos. Los resultados se notan de inmediato.",
            order: 0,
          },
          {
            question: "¿Cuánto cuesta el Hidrofacial en MiPiel?",
            answer: "El Hidrofacial en MiPiel Veracruz tiene un costo desde $800 MXN por sesión. Contacta al 229 933 00 14 para conocer nuestros paquetes.",
            order: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completo!");
  console.log("\n📧 Admin:         admin@mipielveracruz.com  /  Admin123!");
  console.log("📧 Cliente demo:  cliente@demo.com          /  Cliente123!");
  console.log("\n🛠️  Servicios creados:", services.length);
  console.log("📝 Blog posts creados: 2");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
