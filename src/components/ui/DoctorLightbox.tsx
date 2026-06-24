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
  startIndex?: number
}

export default function DoctorLightbox({ images, isOpen, onClose, startIndex = 0 }: DoctorLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageKey, setImageKey] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Reset index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex)
      setImageKey(Date.now())
    }
  }, [isOpen, startIndex])

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
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
      setImageKey(Date.now())
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [images.length, isTransitioning])

  const goNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
      setImageKey(Date.now())
      setTimeout(() => setIsTransitioning(false), 50)
    }, 150)
  }, [images.length, isTransitioning])

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
    <div
      className="fixed inset-0 z-[11000] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      {/* ── Top Bar: Close + Counter ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <span className="text-white/50 text-sm font-medium tracking-wide tabular-nums">
          {currentIndex + 1} <span className="text-white/25">/</span> {images.length}
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300"
          aria-label="Cerrar galería"
        >
          <X className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* ── Image Container ── */}
      <div
        className="relative w-full h-full flex items-center justify-center px-4 sm:px-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={imageKey}
          className="relative w-full max-w-[900px] mx-auto"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.97)' : 'scale(1)',
            transition: 'opacity 300ms ease, transform 300ms ease'
          }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={900}
            height={675}
            className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
            priority
          />
        </div>

        {/* ── Navigation Arrows (desktop: outside image, mobile: inside) ── */}
        <button
          onClick={goPrev}
          className="absolute left-1 sm:left-2 lg:-left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-10 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-1 sm:right-2 lg:-right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-10 active:scale-95"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ── Bottom Bar: Caption + Dots ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-5 sm:pb-6 pt-16 px-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
      >
        {/* Caption */}
        <p className="text-center text-white/70 text-sm font-medium mb-4 max-w-lg mx-auto leading-snug px-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          {images[currentIndex].alt}
        </p>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isTransitioning) return
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(i)
                  setImageKey(Date.now())
                  setTimeout(() => setIsTransitioning(false), 50)
                }, 150)
              }}
              className={`rounded-full transition-all duration-400 ease-out ${
                i === currentIndex
                  ? 'bg-cyan w-7 h-2'
                  : 'bg-white/25 hover:bg-white/40 w-2 h-2'
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}