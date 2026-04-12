import { useInitLoader } from '../hooks/useInitLoader'
import { motion } from 'framer-motion'
import { LogLine } from '../types/init-loader.types'
import React from 'react'
import { Progress } from '@/components/ui/progress'

export function InitLoader({onComplete}: {onComplete: () => void}) {
  const { scope, progress, handleSkip, motionTransition } = useInitLoader(onComplete)

  const lines: LogLine[] = [
    { text: "> Loading profile data...", showCheck: true, amber: false },
    { text: "> Building portfolio engine...", showCheck: true, amber: false },
    { text: "> Connecting AI interfaces...", showCheck: true, amber: false },
    { text: "> Ready.", showCheck: false, amber: true }
  ]

  return (
    <motion.div 
          className="bg-grid-amber"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={motionTransition}
          ref={scope}
          onClick={handleSkip}
          onKeyDown={handleSkip}
          tabIndex={0}
          role="status"
          aria-label="Loading portfolio">
            <p>SHASHINI.PORTFOLIO &middot; v2026</p>
            <LogLineList lines={lines}/>  
            <Progress 
                value={progress} 
                className="w-full mt-4" 
                aria-label={`Loading progress: ${progress}%`} />
    </motion.div>
  )
}

const LogLineList = React.memo(function LogLineList({lines}: {lines: LogLine[]}) {
  return (
    <p>
      {lines.map((line, index) => (
        <span key={index} id={`line-${index}`}>{line.text}</span>
      ))}
    </p>
  )
})
