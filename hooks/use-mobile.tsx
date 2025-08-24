import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Función para verificar si es móvil
    const checkIsMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      console.log("useIsMobile - window width:", window.innerWidth, "isMobile:", mobile)
      setIsMobile(mobile)
    }

    // Verificar inicialmente
    checkIsMobile()

    // Agregar listener para cambios de tamaño
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkIsMobile()
    }
    
    mql.addEventListener("change", onChange)
    
    // También escuchar cambios de resize
    window.addEventListener("resize", checkIsMobile)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}
