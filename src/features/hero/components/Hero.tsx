import { motion } from 'framer-motion'
import { useHero } from '../hooks/useHero'
import { Button } from '@/components/ui/button'

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.26 } },
    instant: { transition: { staggerChildren: 0 } }
}

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
    instant: { opacity: 1, y: 0, transition: { duration: 0 } }
}

export function Hero({onEnterChat}: {onEnterChat: () => void}) {
    const { 
        controls,
        handleSkip, 
        handleKnowMoreAboutMe, 
        handleScrollDown, 
        handleTouchStart, 
        handleTouchEnd, 
        motionTransition 
    } = useHero(onEnterChat)

    return (
        <motion.div
            className="bg-grid-amber relative h-full w-full overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition}
            onClick={handleSkip}
            onWheel={handleScrollDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <motion.div 
                className="max-w-130 px-10 relative z-10 w-full"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <motion.span
                    className="hero-location"
                    variants={itemVariants}
                >
                    Melbourne, Australia
                </motion.span>

                <motion.h1
                    className="hero-name"
                    variants={itemVariants}
                >
                    SHASHINI
                </motion.h1>

                <motion.p
                    className="hero-tagline"
                    variants={itemVariants}
                >
                    SE &rarr; AI Engineer in progress
                </motion.p>

                <motion.p
                    className="hero-bio"
                    variants={itemVariants}
                >
                    9 years across financial services & compliance. C# · Angular · .NET — and actively building toward agentic AI engineering.
                </motion.p>

                <motion.div
                    className="flex items-center gap-4"
                    variants={itemVariants}
                >
                    <Button variant='outline' className="btn-outline-amber" onClick={handleKnowMoreAboutMe}>
                        Know more about me &rarr;
                    </Button>
                    <span className="hero-cta-hint">or scroll down</span>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
