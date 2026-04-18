import { useInitLoader } from '../hooks/useInitLoader'
import { motion } from 'framer-motion'
import { LogLine } from '../types/init-loader.types'
import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'

const LOG_LINES: LogLine[] = [
    { text: "> Loading profile data...", showCheck: true, amber: false },
    { text: "> Building portfolio engine...", showCheck: true, amber: false },
    { text: "> Connecting AI interfaces...", showCheck: true, amber: false },
    { text: "> Ready.", showCheck: false, amber: true }
]

export function InitLoader({onComplete}: {onComplete: () => void}) {
  const { scope, progress, handleSkip, motionTransition } = useInitLoader(onComplete)

  return (
    <motion.div
          className="bg-grid-amber init-loader-bg h-screen w-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={motionTransition}
          ref={scope}
          onClick={handleSkip}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSkip() }}
          tabIndex={0}
          role="status"
          aria-label="Loading portfolio">
            <div className="w-full max-w-95 p-8">
                {/* Version label */}
                <p className="font-mono init-version-label mb-9">
                    SHASHINI.PORTFOLIO · v{new Date().getFullYear()}
                </p>

                {/* Log lines */}
                <LogLineList lines={LOG_LINES}/>

                {/* Progress bar + percentage */}
                <ProgressBar progress={progress} />
            </div>
    </motion.div>
  )
}

const LogLineList = React.memo(function LogLineList({lines}: {lines: LogLine[]}) {
  return (
      <div className="init-log-lines">
          {lines.map((line, index) => (
              <p key={index} id={`line-${index}`} className="opacity-0">
                  <span className={line.amber ? 'init-line-amber' : 'init-line-default'}>
                      {line.text}
                  </span>
                  {line.showCheck && (
                      <span className="init-check ml-1">✓</span>
                  )}
              </p>
          ))}
      </div>
  )
})

const ProgressBar = React.memo(function ProgressBar({progress}: {progress: number}) {
  return (
    <Field className="w-full">
      <Progress
          role="progressbar"
          id="init-progress"
          value={progress}
          className="progress-amber"
          aria-label={`Loading ${progress}%`}
      />
      <FieldLabel htmlFor="init-progress" className="font-mono init-progress-label">
          {progress}%
      </FieldLabel>
    </Field>
  )
})
