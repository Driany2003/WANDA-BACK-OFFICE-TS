import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Función para verificar si es móvil con debounce
    let timeoutId: NodeJS.Timeout
    
    const checkIsMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < MOBILE_BREAKPOINT
        setIsMobile(prev => {
          if (prev !== mobile) {
            console.log("useIsMobile - window width:", window.innerWidth, "isMobile:", mobile)
            return mobile
          }
          return prev
        })
      }, 100) // Debounce de 100ms
    }

    // Verificar inicialmente
    const initialMobile = window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile(initialMobile)

    // Agregar listener para cambios de tamaño con debounce
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkIsMobile()
    }
    
    mql.addEventListener("change", onChange)
    
    // También escuchar cambios de resize con debounce
    window.addEventListener("resize", checkIsMobile)
    
    return () => {
      clearTimeout(timeoutId)
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}
