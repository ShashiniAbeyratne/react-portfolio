import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Providers } from './providers'
import { InitLoader } from '@/features/init-loader'

export function App() {
  return (
    <Providers>
      <InitLoader onComplete={() => {}} />
      <RouterProvider router={router} />
    </Providers>
  )
}
