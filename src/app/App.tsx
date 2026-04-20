import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Providers } from './providers'
import { ScreenLayout } from '@/shared/components/layout/ScreenLayout';


export function App() {
  return (
    <Providers>
      <ScreenLayout>
          <RouterProvider router={router} />
      </ScreenLayout>
    </Providers>
  )
}
