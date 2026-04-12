import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api-client'
import type { Example } from '../types/example.types'

export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: async () => {
      const { data } = await apiClient.get<Example[]>('/examples')
      return data
    },
  })
}
