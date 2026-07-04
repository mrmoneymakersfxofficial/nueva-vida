import type { Metadata } from "next";
import { draftMode } from "next/headers";
import "./globals.css";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLiveWithToken } from "@/components/SanityLiveWithToken";
import LayoutShell from "@/components/LayoutShell";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

/* ═══════════════════════════════════════════════════
   SITE METADATA — Personaliza con tus datos de negocio
   ═══════════════════════════════════════════════════ */
const SITE_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Fast Page Pro";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Sitio web de ${SITE_NAME}.`,
  keywords: [SITE_NAME, "sitio web", "CMS", "Sanity"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_NAME,
    description: `Sitio web de ${SITE_NAME}.`,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: `Sitio web de ${SITE_NAME}.`,
  },
  robots: { index: true, follow: true },
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
