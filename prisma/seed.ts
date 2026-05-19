import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mipielveracruz.com" },
    update: {},
    create: {
      name: "Admin Mi Piel",
      email: "admin@mipielveracruz.com",
      password: adminPassword,
      role: "ADMIN",
      medicalRecord: { create: {} },
    },
  });

  // Demo client
  const clientPassword = await bcrypt.hash("Cliente123!", 12);
  const client = await prisma.user.upsert({
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

  // Blog categories
  const blogCategories = await Promise.all([
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

  // Services
  const services = [
    { name: "Depilación Facial", slug: "depilacion-facial", duration: 20, price: 499, category: "FACIAL", description: "Labio, mentón, patillas y cejas. Resultados precisos y duraderos." },
    { name: "Depilación Axilas", slug: "depilacion-axilas", duration: 15, price: 399, category: "ARMPITS", description: "Área más popular. Rápido, efectivo y sin manchas oscuras." },
    { name: "Depilación Bikini Línea", slug: "depilacion-bikini-linea", duration: 20, price: 499, category: "BIKINI", description: "Línea de bikini clásica." },
    { name: "Depilación Bikini Completo", slug: "depilacion-bikini-completo", duration: 30, price: 699, category: "BIKINI", description: "Bikini completo o brasileño." },
    { name: "Depilación Piernas Completas", slug: "depilacion-piernas-completas", duration: 60, price: 999, category: "LEGS", description: "Piernas completas desde muslos hasta pies." },
    { name: "Depilación Medias Piernas", slug: "depilacion-medias-piernas", duration: 40, price: 699, category: "LEGS", description: "Desde la rodilla hacia abajo." },
    { name: "Depilación Cuerpo Completo (Mujer)", slug: "depilacion-cuerpo-completo-mujer", duration: 120, price: 2499, category: "FULL_BODY", description: "Paquete integral completo para mujer." },
    { name: "Depilación Espalda (Hombre)", slug: "depilacion-espalda-hombre", duration: 40, price: 799, category: "MENS", description: "Espalda completa para hombres." },
    { name: "Depilación Pecho (Hombre)", slug: "depilacion-pecho-hombre", duration: 30, price: 699, category: "MENS", description: "Pecho y abdomen para hombres." },
    { name: "Paquete Axilas + Bikini", slug: "paquete-axilas-bikini", duration: 45, price: 799, category: "PACKAGE", isPackage: true, sessionsIncluded: 6, description: "Paquete de 6 sesiones de axilas y bikini línea." },
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

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "cuanto-cuesta-depilacion-laser-veracruz" },
    update: {},
    create: {
      title: "¿Cuánto cuesta la depilación láser en Veracruz? Guía de precios 2025",
      slug: "cuanto-cuesta-depilacion-laser-veracruz",
      excerpt: "Descubre los precios reales de la depilación láser en Veracruz y Boca del Río. Comparativa de zonas, número de sesiones necesarias y factores que afectan el costo.",
      content: `<h2>Precios de depilación láser en Veracruz</h2>
      <p>Los precios de la depilación láser en Veracruz varían según la zona a tratar, el tipo de tecnología utilizada y el número de sesiones requeridas.</p>
      <h2>¿Cuántas sesiones necesito?</h2>
      <p>En promedio, se requieren entre 6 y 10 sesiones para obtener resultados permanentes del 85-95%.</p>
      <h2>¿Qué incluye el precio?</h2>
      <p>En Mi Piel Veracruz, el precio incluye la sesión de láser, el gel conductor, la valoración previa y el seguimiento post-tratamiento.</p>`,
      status: "PUBLISHED",
      publishedAt: new Date(),
      readTime: 5,
      authorId: admin.id,
      categoryId: blogCategories[0].id,
      tags: ["precios", "veracruz", "depilacion laser", "costos"],
      seoTitle: "Precios de Depilación Láser en Veracruz 2025 | Mi Piel Veracruz",
      seoDesc: "Conoce los precios actualizados de depilación láser en Veracruz y Boca del Río. Axilas desde $399, piernas desde $899, cuerpo completo desde $2,499.",
      seoKeywords: ["precio depilación láser Veracruz", "cuánto cuesta depilación láser Veracruz"],
      faqs: {
        create: [
          { question: "¿Cuánto cuesta la depilación láser en Veracruz?", answer: "Los precios varían por zona: axilas desde $399, facial desde $499, bikini desde $599, piernas desde $899 y cuerpo completo desde $2,499. Primera consulta gratis.", order: 0 },
          { question: "¿Cuántas sesiones necesito?", answer: "En promedio 6-10 sesiones según zona y tipo de vello. Siempre hacemos una valoración personalizada.", order: 1 },
        ],
      },
    },
  });

  console.log("✅ Seed complete!");
  console.log("\n📧 Admin:", admin.email, "/ Password: Admin123!");
  console.log("📧 Cliente demo:", client.email, "/ Password: Cliente123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
