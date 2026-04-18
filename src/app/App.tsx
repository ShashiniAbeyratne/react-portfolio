import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Providers } from './providers'
import { InitLoader } from '@/features/init-loader'
import { useState } from 'react';
import { Screen } from '@/shared/types/screen.types';
import { AnimatePresence } from 'framer-motion';

const hasSeenInit = sessionStorage.getItem("portfolio_init_seen") === "1"

export function App() {
  const [screen, setScreen] = useState<Screen>(hasSeenInit ? Screen.Hero : Screen.Loader)

  return (
    <Providers>
      <AnimatePresence mode="wait" initial={hasSeenInit ? false : undefined}>
          {screen === Screen.Loader && 
              <InitLoader key={Screen.Loader} onComplete={() => setScreen(Screen.Hero)} />}
          {screen === Screen.Hero && 
              <RouterProvider key={Screen.Hero} router={router} />}
      </AnimatePresence>
    </Providers>
  )
}
