'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Shrink } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ZOOM_STEP = 0.5;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const DOUBLE_TAP_MS = 300;
const TAP_MOVE_THRESHOLD = 15;
const SWIPE_THRESHOLD = 50;
const SWIPE_TIME_MS = 400;

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [isLandscape, setIsLandscape] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  /* ── Refs ── */
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapCountRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const panStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const isPanning = useRef(false);
  const didPanRef = useRef(false);
  const lastTapPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Reset on open ── */
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      setOrigin({ x: 50, y: 50 });
      setIsLandscape(false);
    }
    // Clean up any pending tap timer
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
      tapTimerRef.current = null;
    }
    tapCountRef.current = 0;
  }, [isOpen, initialIndex]);

  /* ── Reset zoom on image change ── */
  useEffect(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setOrigin({ x: 50, y: 50 });
  }, [currentIndex]);

  /* ── Keyboard controls ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom > 1) resetZoom();
        else onClose();
      } else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, zoom]);

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    setCurrentIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  /* ── Zoom controls ── */
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setOrigin({ x: 50, y: 50 });
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(ZOOM_MIN, +(prev - ZOOM_STEP).toFixed(1));
      if (next <= ZOOM_MIN) {
        // Will reset in next frame
        setTimeout(() => {
          setPanOffset({ x: 0, y: 0 });
          setOrigin({ x: 50, y: 50 });
        }, 0);
      }
      return next;
    });
  }, []);

  const zoomToPoint = useCallback((xPercent: number, yPercent: number) => {
    setOrigin({ x: xPercent, y: yPercent });
    setPanOffset({ x: 0, y: 0 });
    setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)));
  }, []);

  const toggleLandscape = useCallback(() => {
    setIsLandscape((l) => !l);
    resetZoom();
  }, [resetZoom]);

  /* ══════════════════════════════════════════════
     MOBILE TOUCH LOGIC — single tap / double tap / swipe
     ══════════════════════════════════════════════ */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Cancel any pending tap timer on new touch
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
      tapTimerRef.current = null;
      tapCountRef.current = 0;
    }

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    didPanRef.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = Math.abs(endX - touchStartRef.current.x);
      const dy = Math.abs(endY - touchStartRef.current.y);
      const dt = Date.now() - touchStartRef.current.time;
      const totalMove = Math.sqrt(dx * dx + dy * dy);
      const swipeDx = endX - touchStartRef.current.x;

      /* ── If it was a pan gesture (zoomed + moved), do nothing ── */
      if (didPanRef.current) return;

      /* ── Swipe navigation (fast horizontal swipe, not zoomed) ── */
      if (zoom <= ZOOM_MIN && totalMove > SWIPE_THRESHOLD && dt < SWIPE_TIME_MS) {
        swipeDx < 0 ? goNext() : goPrev();
        return;
      }

      /* ── Small movement = TAP ── */
      if (totalMove < TAP_MOVE_THRESHOLD) {
        tapCountRef.current += 1;
        lastTapPosRef.current = { x: endX, y: endY };

        if (tapCountRef.current === 1) {
          // First tap — wait to see if second tap comes
          tapTimerRef.current = setTimeout(() => {
            // ═══ SINGLE TAP ═══
            if (tapCountRef.current === 1) {
              if (zoom > ZOOM_MIN) {
                // When zoomed: single tap resets zoom
                resetZoom();
              } else {
                // When NOT zoomed: single tap CLOSES lightbox
                onClose();
              }
            }
            tapCountRef.current = 0;
            tapTimerRef.current = null;
          }, DOUBLE_TAP_MS);
        } else if (tapCountRef.current >= 2) {
          // ═══ DOUBLE TAP ═══
          if (tapTimerRef.current) {
            clearTimeout(tapTimerRef.current);
            tapTimerRef.current = null;
          }
          tapCountRef.current = 0;

          if (zoom > ZOOM_MIN) {
            resetZoom();
          } else {
            // Zoom to tap point
            const container = containerRef.current;
            if (container) {
              const rect = container.getBoundingClientRect();
              const xPct = ((lastTapPosRef.current.x - rect.left) / rect.width) * 100;
              const yPct = ((lastTapPosRef.current.y - rect.top) / rect.height) * 100;
              setOrigin({ x: xPct, y: yPct });
              setPanOffset({ x: 0, y: 0 });
              setZoom(1.5); // First zoom level
            }
          }
        }
      }
    },
    [zoom, goNext, goPrev, resetZoom, onClose],
  );

  /* ══════════════════════════════════════════════
     PC CLICK LOGIC — click to zoom / close
     ══════════════════════════════════════════════ */
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // If we just finished panning, ignore this synthetic click
      if (didPanRef.current) {
        didPanRef.current = false;
        return;
      }

      if (zoom > ZOOM_MIN) {
        // When zoomed: click resets zoom
        resetZoom();
        return;
      }

      // When NOT zoomed: click zooms in by one step to the click point
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      zoomToPoint(xPct, yPct);
    },
    [zoom, resetZoom, zoomToPoint],
  );

  /* ══════════════════════════════════════════════
     PAN LOGIC (pointer events when zoomed)
     ══════════════════════════════════════════════ */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (zoom <= ZOOM_MIN) return;
      e.preventDefault();
      isPanning.current = true;
      didPanRef.current = false;
      panStartRef.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y };
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    },
    [zoom, panOffset],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning.current || zoom <= ZOOM_MIN) return;
      e.preventDefault();
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        didPanRef.current = true;
      }
      setPanOffset({ x: panStartRef.current.ox + dx, y: panStartRef.current.oy + dy });
    },
    [zoom],
  );

  const handlePointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  /* ── Image dimensions based on mode ── */
  const imgMaxW = isLandscape ? '100vh' : '92vw';
  const imgMaxH = isLandscape ? '100vw' : '88vh';

  const zoomPercent = Math.round(zoom * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col select-none"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          {/* ════════════════════════════════════════
              TOP BAR — Always visible, high contrast
              ════════════════════════════════════════ */}
          <div
            className="relative z-40 flex items-center justify-between shrink-0 px-3 py-2 md:px-5 md:py-3"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
              minHeight: '52px',
            }}
          >
            {/* Left: Counter */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-white text-sm md:text-base font-bold tabular-nums">
                {currentIndex + 1}
              </span>
              <span className="text-white/40 text-sm">/</span>
              <span className="text-white/60 text-sm md:text-base tabular-nums">
                {images.length}
              </span>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              {/* Reset zoom button — only when zoomed */}
              {zoom > ZOOM_MIN && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                  }}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#d4a017]/90 text-[#001C3D] flex items-center justify-center shadow-lg shadow-black/40 transition-all duration-200 active:scale-90"
                  aria-label="Restablecer zoom"
                >
                  <Shrink size={18} strokeWidth={2.5} />
                </motion.button>
              )}

              {/* Zoom out */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                  zoom > ZOOM_MIN
                    ? 'bg-white/25 text-white shadow-lg shadow-black/30'
                    : 'bg-black/30 text-white/20 pointer-events-none'
                }`}
                aria-label="Reducir zoom"
              >
                <ZoomOut size={18} strokeWidth={2} />
              </button>

              {/* Zoom in */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                  zoom >= ZOOM_MAX
                    ? 'bg-black/30 text-white/20 pointer-events-none'
                    : 'bg-white/25 text-white shadow-md shadow-black/20'
                }`}
                aria-label="Ampliar zoom"
              >
                <ZoomIn size={18} strokeWidth={2} />
              </button>

              {/* Landscape toggle — mobile only */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLandscape();
                }}
                className="md:hidden w-11 h-11 rounded-full bg-white/25 text-white flex items-center justify-center shadow-md shadow-black/20 transition-all duration-200 active:scale-90"
                aria-label="Modo horizontal"
              >
                <RotateCw
                  size={18}
                  strokeWidth={2}
                  className={isLandscape ? 'text-[#d4a017]' : ''}
                />
              </button>

              {/* Separator */}
              <div className="w-px h-7 bg-white/20" />

              {/* CLOSE — Always prominent, red */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-red-500 hover:bg-red-400 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-105 active:scale-90"
                aria-label="Cerrar galeria"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════
              IMAGE AREA
              ════════════════════════════════════════ */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-hidden relative min-h-0 z-10"
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: zoom > ZOOM_MIN ? (isPanning.current ? 'grabbing' : 'grab') : 'zoom-in',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${isLandscape}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
              >
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})${
                      isLandscape ? ' rotate(90deg)' : ''
                    }`,
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transition: isPanning.current
                      ? 'none'
                      : 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1)',
                    touchAction: zoom > ZOOM_MIN ? 'none' : 'pan-y',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    className="object-contain pointer-events-none"
                    draggable={false}
                    style={{
                      maxWidth: imgMaxW,
                      maxHeight: imgMaxH,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Zoom level indicator — only when zoomed */}
            <AnimatePresence>
              {zoom > ZOOM_MIN && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/15"
                >
                  {zoomPercent}%
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ════════════════════════════════════════
              NAVIGATION ARROWS — hidden when zoomed
              ════════════════════════════════════════ */}
          <AnimatePresence>
            {images.length > 1 && zoom <= ZOOM_MIN && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute inset-0 z-30"
                style={{ top: '60px', bottom: '80px' }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="pointer-events-auto absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15 transition-all duration-200 hover:bg-black/60 active:scale-90"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="pointer-events-auto absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15 transition-all duration-200 hover:bg-black/60 active:scale-90"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={24} strokeWidth={2} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ════════════════════════════════════════
              THUMBNAIL STRIP
              ════════════════════════════════════════ */}
          {images.length > 1 && (
            <div
              className="shrink-0 z-40 flex items-center justify-center gap-2 px-3 py-2.5 md:px-4 md:py-3 overflow-x-auto"
              style={{
                paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-90 ${
                    i === currentIndex
                      ? 'w-14 h-14 md:w-16 md:h-16 border-[#d4a017] scale-105 shadow-lg shadow-[#d4a017]/30'
                      : 'w-10 h-10 md:w-12 md:h-12 border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
