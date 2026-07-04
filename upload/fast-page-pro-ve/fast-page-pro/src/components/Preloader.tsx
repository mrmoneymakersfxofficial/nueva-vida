'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* =============================================
   BRAND LOGO — Real Sertrade logo (white on blue bg)
   ============================================= */
function BrandLogoWhite({ size = 120 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sertrade-logo.png"
      alt="Sertrade Design"
      width={size}
      height={size}
      className="brightness-0 invert object-contain block"
    />
  );
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* Lock body scroll while preloader is visible */
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: '#004691' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: {
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
        >
          {/* Logo: Fade In + Scale (0.2s) → Hold (0.2s) → Fade Out (0.2s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.95],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.33, 0.67, 1],
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <BrandLogoWhite size={120} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
