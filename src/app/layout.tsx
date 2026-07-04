import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import { MobileMenuProvider } from '@/context/MobileMenuContext'
import GlobalScrollSpy from '@/components/animations/ScrollSpy'
import { VisualEditing } from '@/components/VisualEditing'
import { SanityLiveWithToken } from '@/components/SanityLiveWithToken'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nueva Vida | Consultorio Ginecológico - Atención Médica Especializada',
    template: '%s | Nueva Vida - Consultorio Ginecológico',
  },
  description: 'Consultorio ginecológico especializado en ecografías, biopsias, colposcopía y control preventivo de la salud femenina. Atención médica de calidad con tecnología de última generación en Chincha, Perú.',
  keywords: [
    'ginecólogo', 'ecografía ginecológica', 'ecografía obstétrica', 'biopsia',
    'colposcopía', 'Papanicolau', 'salud femenina', 'consultorio ginecológico',
    'control prenatal', 'Chincha', 'Perú',
  ],
  authors: [{ name: 'Nueva Vida - Consultorio Ginecológico' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/favicon-16x16.webp', sizes: '16x16', type: 'image/webp' },
    ],
    apple: [
      { url: '/apple-touch-icon.webp', sizes: '180x180', type: 'image/webp' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Nueva Vida - Consultorio Ginecológico',
    title: 'Nueva Vida | Consultorio Ginecológico - Atención Médica Especializada',
    description: 'Atención médica ginecológica especializada con tecnología de última generación. Agende su cita hoy.',
    images: ['/logo-nuevavida.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {isDraftMode && <SanityLiveWithToken includeDrafts />}
        <MobileMenuProvider>
          <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <MobileBottomNav />
          <GlobalScrollSpy />
        </MobileMenuProvider>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}