import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#f43f5e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mipielveracruz.com"),
  title: {
    default: "Mi Piel Veracruz | Depilación Láser Premium en Veracruz y Boca del Río",
    template: "%s | Mi Piel Veracruz",
  },
  description:
    "Clínica de depilación láser premium en Veracruz y Boca del Río. Tecnología de última generación, resultados garantizados. Agenda tu cita hoy.",
  keywords: [
    "depilación láser Veracruz",
    "depilación definitiva Veracruz",
    "eliminación de vello láser Veracruz",
    "clínica de depilación Veracruz",
    "depilación láser Boca del Río",
    "depilación láser facial Veracruz",
    "depilación láser piernas Veracruz",
    "depilación láser bikini Veracruz",
    "depilación láser hombres Veracruz",
    "mejor clínica depilación láser Veracruz",
  ],
  authors: [{ name: "Mi Piel Veracruz" }],
  creator: "Mi Piel Veracruz",
  publisher: "Mi Piel Veracruz",
  category: "health",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://mipielveracruz.com",
    siteName: "Mi Piel Veracruz",
    title: "Mi Piel Veracruz | Depilación Láser Premium",
    description:
      "Clínica de depilación láser premium en Veracruz y Boca del Río. Tecnología de última generación.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mi Piel Veracruz - Depilación Láser Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Piel Veracruz | Depilación Láser Premium",
    description: "Clínica de depilación láser premium en Veracruz y Boca del Río.",
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
  verification: {
    google: "your-google-verification-code",
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
              "@type": "LocalBusiness",
              "@id": "https://mipielveracruz.com/#organization",
              name: "Mi Piel Veracruz",
              description: "Clínica de depilación láser premium en Veracruz y Boca del Río",
              url: "https://mipielveracruz.com",
              telephone: process.env.NEXT_PUBLIC_CLINIC_PHONE,
              email: process.env.NEXT_PUBLIC_CLINIC_EMAIL,
              priceRange: "$$",
              image: "https://mipielveracruz.com/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Boca del Río",
                addressLocality: "Boca del Río",
                addressRegion: "Veracruz",
                postalCode: "94290",
                addressCountry: "MX",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "19.1009",
                longitude: "-96.1322",
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
              sameAs: [
                "https://www.facebook.com/mipielveracruz",
                "https://www.instagram.com/mipielveracruz",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
