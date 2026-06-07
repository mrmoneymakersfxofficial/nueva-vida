import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppWidget from '@/components/widgets/WhatsAppWidget'

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
  description: 'Consultorio ginecológico especializado en ecografías, biopsias, colposcopía y control preventivo de la salud femenina. Atención médica de calidad con tecnología de última generación en Lima, Perú.',
  keywords: [
    'ginecólogo', 'ecografía ginecológica', 'ecografía obstétrica', 'biopsia', 
    'colposcopía', 'Papanicolau', 'salud femenina', 'consultorio ginecológico',
    'control prenatal', 'Lima', 'Perú',
  ],
  authors: [{ name: 'Nueva Vida - Consultorio Ginecológico' }],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Nueva Vida - Consultorio Ginecológico',
    title: 'Nueva Vida | Consultorio Ginecológico - Atención Médica Especializada',
    description: 'Atención médica ginecológica especializada con tecnología de última generación. Agende su cita hoy.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
