import { useAnimate, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function useInitLoader(onComplete: () => void) {
    const isReducedMotionEnabled = useReducedMotion()
    const [scope, animate] = useAnimate()
    const [progress, setProgress] = useState(0)
    const skippedRef = useRef(false)

    useEffect(() => {
        const runAnimations = async () => {
            if (isReducedMotionEnabled) {
              setTimeout(() => {
                    if (skippedRef.current) return
                    animate("#line-0", { opacity: 1 }, { duration: 0 })
                    animate("#line-1", { opacity: 1 }, { duration: 0 })
                    animate("#line-2", { opacity: 1 }, { duration: 0 })
                    animate("#line-3", { opacity: 1 }, { duration: 0 })
                    setProgress(100)
                    setSessionStorageFlag()                    
                    onComplete()
                }, 300)
            } 
            else {
                setProgress(30)
                await animate("#line-0", { opacity: 1 }, { duration: 0.5 })
                if (skippedRef.current) return

                setProgress(58)
                await animate("#line-1", { opacity: 1 }, { duration: 0.5 })
                if (skippedRef.current) return
                
                setProgress(84)
                await animate("#line-2", { opacity: 1 }, { duration: 0.5 })
                if (skippedRef.current) return
                
                setProgress(100)
                await animate("#line-3", { opacity: 1 }, { duration: 0.5 })
                if (skippedRef.current) return
                
                setSessionStorageFlag()                    
                onComplete()
            }
        }

        runAnimations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSkip = () => {
        skippedRef.current = true
        sessionStorage.setItem("portfolio_init_seen", "1")
        onComplete()
    }

    const motionTransition = isReducedMotionEnabled
        ? { duration: 0 }
        : { duration: 0.3, ease: 'easeOut' }

    return { scope, progress, handleSkip, motionTransition }
}

const setSessionStorageFlag = () => {
    sessionStorage.setItem("portfolio_init_seen", "1")
}