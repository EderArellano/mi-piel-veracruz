import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#5F7C71",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mipielveracruz.com"),
  title: {
    default: "Mi Piel Veracruz | Depilación Láser en Veracruz y Boca del Río",
    template: "%s | Mi Piel Veracruz",
  },
  description:
    "Clínica de depilación láser en Veracruz y Boca del Río. Tecnología grado médico, resultados permanentes desde la 1.ª sesión. Hidrofacial, Celluma LED y Skin Analyzer. Primera consulta gratis.",
  keywords: [
    // Short tail — alta demanda
    "depilación láser Veracruz",
    "depilación láser Boca del Río",
    "depilación definitiva Veracruz",
    "clínica estética Veracruz",
    // Middle tail — demanda media, alta conversión
    "precio depilación láser Veracruz",
    "depilación láser piernas Veracruz",
    "depilación láser axilas Veracruz",
    "depilación láser bikini Veracruz",
    "clínica dermocosmética Veracruz",
    "hidrofacial Veracruz",
    "Celluma LED Veracruz",
    "skin analyzer Veracruz",
    "depilación láser caballeros Veracruz",
    // Long tail — alta intención de compra
    "cuánto cuesta depilación láser axilas Veracruz",
    "depilación láser piel morena Veracruz",
    "primera consulta gratis depilación láser Veracruz",
    "depilación láser bikini integral Boca del Río",
    "eliminar vello encarnado Veracruz",
    "manchas post depilación solución Veracruz",
    "depilación láser hombres Boca del Río",
    // GEO alternativo
    "depilación láser Xalapa",
    "clínica depilación láser sur Veracruz",
    // Futuro 10 años — IA / personalización
    "análisis piel inteligencia artificial Veracruz",
    "skin care personalizado Veracruz",
    "fototerapia LED antienvejecimiento Veracruz",
  ],
  authors: [{ name: "Mi Piel Centro Dermocosmético" }],
  creator: "Mi Piel Centro Dermocosmético",
  publisher: "Mi Piel Centro Dermocosmético",
  category: "health",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://mipielveracruz.com",
    siteName: "Mi Piel Veracruz",
    title: "Mi Piel Veracruz | Depilación Láser en Veracruz y Boca del Río",
    description:
      "Clínica de depilación láser en Veracruz y Boca del Río. Primera consulta gratis. Tecnología grado médico con resultados permanentes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mi Piel Veracruz — Depilación Láser en Veracruz y Boca del Río",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Piel Veracruz | Depilación Láser en Veracruz",
    description: "Clínica de depilación láser en Veracruz. Primera consulta gratis.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["MedicalClinic", "HealthAndBeautyBusiness"],
                  "@id": "https://mipielveracruz.com/#clinic",
                  name: "Mi Piel Centro Dermocosmético",
                  alternateName: "MiPiel Veracruz",
                  description:
                    "Clínica de depilación láser, hidrofacial, Celluma LED y análisis de piel en Veracruz y Boca del Río. Tecnología grado médico con más de 5,000 pacientes atendidas.",
                  url: "https://mipielveracruz.com",
                  telephone: "+52-229-933-0014",
                  email: "contacto@mipielveracruz.com",
                  priceRange: "$$",
                  currenciesAccepted: "MXN",
                  paymentAccepted: "Efectivo, Tarjeta de crédito, Tarjeta de débito",
                  image: "https://mipielveracruz.com/og-image.jpg",
                  logo: "https://mipielveracruz.com/logo.png",
                  hasMap: "https://maps.google.com/?q=Av.+R.+Flores+Magón,+Veracruz,+Ver.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Av. R. Flores Magón & Alacio Pérez",
                    addressLocality: "Veracruz",
                    addressRegion: "Veracruz",
                    postalCode: "91700",
                    addressCountry: "MX",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "19.1738",
                    longitude: "-96.1342",
                  },
                  areaServed: [
                    { "@type": "City", name: "Veracruz" },
                    { "@type": "City", name: "Boca del Río" },
                    { "@type": "City", name: "Medellín de Bravo" },
                    { "@type": "City", name: "Xalapa" },
                    { "@type": "City", name: "Coatzacoalcos" },
                  ],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "49",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "09:00",
                      closes: "20:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: "Saturday",
                      opens: "09:00",
                      closes: "15:00",
                    },
                  ],
                  medicalSpecialty: "Dermatology",
                  availableService: [
                    { "@type": "MedicalTherapy", name: "Depilación Láser Diodo" },
                    { "@type": "MedicalTherapy", name: "Hidrofacial" },
                    { "@type": "MedicalTherapy", name: "Fototerapia Celluma LED" },
                    { "@type": "MedicalTherapy", name: "Análisis de Piel Skin Analyzer" },
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+52-229-933-0014",
                    contactType: "customer service",
                    areaServed: "MX",
                    availableLanguage: "Spanish",
                  },
                  sameAs: [
                    "https://www.facebook.com/mipielveracruz",
                    "https://www.instagram.com/mipielveracruz",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mipielveracruz.com/#website",
                  url: "https://mipielveracruz.com",
                  name: "Mi Piel Centro Dermocosmético",
                  publisher: { "@id": "https://mipielveracruz.com/#clinic" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://mipielveracruz.com/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
