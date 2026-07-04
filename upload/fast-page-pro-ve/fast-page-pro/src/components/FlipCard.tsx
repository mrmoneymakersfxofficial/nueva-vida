'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  image: string;
  services: string[];
  delay?: number;
}

export default function FlipCard({
  icon: Icon,
  title,
  image,
  services,
  delay = 0,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Detect touch device on mount */
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouchDevice);
  }, []);

  const handleTap = useCallback(() => {
    if (isTouchDevice) {
      setIsFlipped((prev) => !prev);
    }
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      setIsFlipped(true);
    }
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  }, [isTouchDevice]);

  return (
    <motion.div
      className="flip-card-wrapper"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    >
      <div
        className="flip-card-perspective"
        style={{ perspective: '1000px' }}
        onClick={handleTap}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <motion.div
          className="flip-card-inner"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ===== FRONT FACE ===== */}
          <div className="flip-card-face flip-card-front">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover transition-[filter] duration-500"
              style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center center' }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,50,0.75)] via-[rgba(0,20,50,0.35)] to-[rgba(0,20,50,0.25)]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-[12px] bg-[#d4a017]/90 backdrop-blur-sm flex items-center justify-center mb-5 shadow-lg">
                <Icon size={30} strokeWidth={1.5} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-[28px] font-bold text-white uppercase tracking-[0.1em] mb-2">
                {title}
              </h3>

              {/* Hint — contextual: desktop shows hover hint, mobile shows tap hint */}
              <div className="mt-6 flex items-center gap-2 text-white/40 text-xs tracking-[0.15em] uppercase">
                <span className="hidden md:inline">Pasa el cursor</span>
                <span className="md:hidden">Toca para ver</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* ===== BACK FACE ===== */}
          <div className="flip-card-face flip-card-back">
            {/* Blurred background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: 'blur(4px)',
                transform: 'scale(1.1)',
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(0,20,50,0.82)]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8">
              {/* Icon small — centered */}
              <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center mb-5">
                <Icon size={20} strokeWidth={1.5} className="text-white" />
              </div>

              {/* Title — centered */}
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-[0.08em] mb-6 text-center">
                {title}
              </h3>

              {/* Service List — LEFT aligned, centered via mx-auto + w-fit */}
              <ul className="space-y-2.5 mb-8 text-left mx-auto w-fit max-w-[85%]">
                {services.map((service, i) => (
                  <li
                    key={i}
                    className="text-white/90 text-[13px] sm:text-sm leading-snug flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017] mt-[7px] shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button — centered */}
              <a
                href={`https://wa.me/51944106163?text=${encodeURIComponent(`Hola Sertrade Design, estoy interesado en cotizar el servicio de ${title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-3 bg-[#d4a017] text-[#003466] rounded-[8px] font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.08em] shadow-lg hover:bg-[#e0b030] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                COTIZAR SERVICIO
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
