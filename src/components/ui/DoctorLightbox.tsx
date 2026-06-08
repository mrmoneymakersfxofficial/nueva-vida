'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  src: string
  alt: string
}

interface DoctorLightboxProps {
  images: LightboxImage[]
  isOpen: boolean
  onClose: () => void
}

export default function DoctorLightbox({ images, isOpen, onClose }: DoctorLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset index when lightbox opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0)
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }, [images.length])

  const goNext = useCallback(() => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }, [images.length])

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(0)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[11000] bg-black/95 flex items-center justify-center animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Cerrar galería"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white/60 text-sm font-medium z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image container with swipe support */}
      <div
        className="relative w-[90vw] max-w-[800px] flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={800}
          height={600}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          priority
        />

        {/* Nav arrows */}
        <button
          onClick={goPrev}
          className="absolute left-[-16px] sm:left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-[-16px] sm:right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-cyan w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
