'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface MobileMenuContextType {
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isMobileMenuOpen: false,
  setMobileMenuOpen: () => {},
})

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const setMobileMenuOpen = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open)
    // Lock/unlock body scroll when menu opens/closes
    if (typeof document !== 'undefined') {
      if (open) {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
      } else {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
      }
    }
  }, [])

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  return useContext(MobileMenuContext)
}
