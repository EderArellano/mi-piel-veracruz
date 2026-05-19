import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/"],
      },
    ],
    sitemap: "https://mipielveracruz.com/sitemap.xml",
    host: "https://mipielveracruz.com",
  };
}
