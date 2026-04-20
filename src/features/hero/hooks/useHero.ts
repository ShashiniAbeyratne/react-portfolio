import { useAnimation, useReducedMotion } from "framer-motion"
import React, { useEffect, useRef } from "react"


export function useHero(onEnterChat: () => void) {
    const isReducedMotionEnabled = useReducedMotion()
    const controls = useAnimation()
    const touchStartY = useRef(0)


    useEffect(() => {
        controls.start(isReducedMotionEnabled ? "instant" : "visible")
    }, [])

    const handleSkip = () => {
        controls.stop()
        controls.start("instant")
    }

    const handleKnowMoreAboutMe = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering handleSkip
        onEnterChat()
    }

    const handleScrollDown = (e: React.WheelEvent) => {
        if (e.deltaY > 0) onEnterChat() 
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = touchStartY.current - e.changedTouches[0].clientY
        if (delta > 50) onEnterChat()   // swiped up by 50px+
    }

    const motionTransition = isReducedMotionEnabled
        ? { duration: 0 }
        : { duration: 0.3, ease: 'easeOut' }

    return { controls, handleSkip, handleKnowMoreAboutMe, handleScrollDown, handleTouchStart, 
        handleTouchEnd, motionTransition }
}