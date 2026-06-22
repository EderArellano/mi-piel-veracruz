import type { NextConfig } from "next";

const securityHeaders = [
  // Evita clickjacking — nadie puede incrustar el sitio en un iframe
  { key: "X-Frame-Options", value: "DENY" },
  // Evita que el browser "adivine" el Content-Type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Solo envía el origin en referrer, nunca la URL completa a sitios externos
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Fuerza HTTPS por 2 años e incluye subdominios
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Deshabilita funciones del browser que no usamos
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Activa el filtro XSS del browser (legacy, aún ayuda en IE/Edge)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // DNS prefetch controlado
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js necesita unsafe-inline para sus scripts de hydration
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Framer Motion y Tailwind usan estilos inline
      "style-src 'self' 'unsafe-inline'",
      // next/font descarga las fuentes y las sirve como 'self'
      "font-src 'self' data:",
      // Imágenes: Cloudinary para fotos de servicios, Google para avatares OAuth
      "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com",
      // Conexiones solo al propio dominio (API routes + NextAuth)
      "connect-src 'self'",
      // Solo Google Maps puede ser embebido en iframe
      "frame-src https://www.google.com https://maps.google.com",
      // Este sitio no puede ser embebido en ningún otro frame
      "frame-ancestors 'none'",
      // Sin objetos embebidos (Flash, etc.)
      "object-src 'none'",
      // Sin workers externos
      "worker-src 'self' blob:",
      // Formularios solo al propio dominio
      "form-action 'self'",
      // Base URI solo al propio dominio
      "base-uri 'self'",
      // Bloquea resources mixtos (HTTP en página HTTPS)
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
  async headers() {
    return [
      {
        // Aplica a todas las rutas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
