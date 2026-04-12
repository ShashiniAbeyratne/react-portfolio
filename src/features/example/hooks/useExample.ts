import { useExampleStore } from '../store/example.store'

export function useExample() {
  const { count, increment } = useExampleStore()
  return { count, increment }
}
