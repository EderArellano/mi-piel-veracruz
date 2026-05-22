import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mipielveracruz.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/servicios/facial`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/servicios/piernas`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/servicios/axilas`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/servicios/bikini`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/servicios/cuerpo-completo`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/servicios/hombres`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: "daily" as const },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/precios`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/agendar`, lastModified: new Date(), priority: 0.95, changeFrequency: "always" as const },
  ];

  try {
    const [posts, services] = await Promise.all([
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const blogUrls = posts.map((p: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));

    const serviceUrls = services.map((s: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/servicios/${s.slug}`,
      lastModified: s.updatedAt,
      priority: 0.85,
    }));

    return [...staticPages, ...blogUrls, ...serviceUrls];
  } catch {
    return staticPages;
  }
}
