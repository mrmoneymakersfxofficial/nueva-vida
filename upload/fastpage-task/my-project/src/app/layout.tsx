import type { Metadata } from "next";
import { draftMode } from "next/headers";
import "./globals.css";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLiveWithToken } from "@/components/SanityLiveWithToken";
import LayoutShell from "@/components/LayoutShell";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

export const metadata: Metadata = {
  metadataBase: new URL("https://sertrade.vercel.app"),
  title: {
    default: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    template: "%s | Sertrade Design",
  },
  description:
    "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
  keywords: [
    "arquitectura comercial",
    "diseño comercial",
    "Sertrade Design",
    "arquitectura Perú",
    "diseño de espacios",
    "modelado 3D",
    "recorridos virtuales",
    "EPCM",
    "diseño salud",
    "diseño residencial",
    "arquitectura Colombia",
    "arquitectura Ecuador",
    "infoarquitectura",
    "construcción comercial",
    "remodelación comercial",
    "ingeniería premium",
    "implementación inmersiva",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    description:
      "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
    url: "https://sertrade.vercel.app",
    siteName: "Sertrade Design",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://sertrade.vercel.app/img/sertrade-og-branding.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sertrade Design | Construimos Confianza, Diseñamos Futuro",
    description:
      "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva.",
    images: ["https://sertrade.vercel.app/img/sertrade-og-branding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return fetchCMS<SanitySiteSettings>(SITE_SETTINGS_QUERY);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="text/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#004691" />
        <meta name="theme-color" content="#004691" />
      </head>
      <body className="antialiased bg-background text-foreground">
        {isDraftMode && <SanityLiveWithToken includeDrafts />}
        <LayoutShell siteSettings={siteSettings}>{children}</LayoutShell>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}