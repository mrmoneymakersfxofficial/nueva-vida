import type { Metadata } from 'next';
import LibroReclamaciones from '@/components/LibroReclamaciones';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones | Sertrade Design',
  description: 'Libro de Reclamaciones de Sertrade Design E.I.R.L. Conforme al Código de Protección y Defensa del Consumidor — Ley N° 29571. Registre su reclamo o queja de forma rápida y segura.',
  openGraph: {
    title: 'Libro de Reclamaciones | Sertrade Design',
    description: 'Registre su reclamo o queja conforme a la Ley N° 29571. Atención personalizada y respuesta en un plazo máximo de 30 días hábiles.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LibroReclamacionesPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 md:py-24 bg-gradient-to-b from-[#F4F7FA] to-white">
      <LibroReclamaciones />
    </div>
  );
}
