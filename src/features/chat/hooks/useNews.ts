import { useMutation } from '@tanstack/react-query'
import type { NewsItem } from '../types/newsPanel.types'
import { useState, useRef, useEffect } from 'react'

const PAGE_SIZE = 3
const CACHE_TTL = 30 * 60 * 1000  // 30 minutes

const fetchNews = async (): Promise<NewsItem[]> => {
    const res = await fetch('/api/news')
    if (!res.ok) throw new Error('Failed to fetch news')
    const data = await res.json()
    return data.items
}

export function useNews() {
    const [isOpen, setIsOpen] = useState(false)
    const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([])
    const [isExhausted, setIsExhausted] = useState(false)

    const pooledNews = useRef<NewsItem[]>([])
    const pageIndex = useRef(0)
    const hasInitialized = useRef(false)
    const fetchRef = useRef<() => void>(() => {})

    useEffect(() => {
        if (!isExhausted) return
        const timer = setTimeout(() => { fetchRef.current() }, CACHE_TTL)
        return () => clearTimeout(timer)
    }, [isExhausted])

    const showPage = (index: number) => {
        const page = pooledNews.current.slice(index, index + PAGE_SIZE)
        setDisplayedNews(page)
        pageIndex.current = index
        setIsExhausted(index + PAGE_SIZE >= pooledNews.current.length)
    }

    const { mutate: doFetch, isPending: isRefetching } = useMutation({
        mutationFn: fetchNews,
        onSuccess: (items) => {
            if (!hasInitialized.current) {
                pooledNews.current = items
                hasInitialized.current = true
                showPage(0)
            } 
            else {
                const existing = new Set(pooledNews.current.map(i => i.url))
                const fresh = items.filter(i => !existing.has(i.url))
                if (fresh.length > 0)
                {
                    pooledNews.current = [...pooledNews.current, ...fresh]
                    showPage(pageIndex.current + PAGE_SIZE)
                }
                else {
                    // No new stories - wrap back to beginning
                    pageIndex.current = 0
                    setIsExhausted(false)
                    showPage(0)
                }
            }
        }
    })

    fetchRef.current = doFetch

    const toggle = () => {
        setIsOpen(prev => {
            if (!prev && !hasInitialized.current && !isRefetching) doFetch()
            return !prev
        })
    }

    const refetch = () => {
        if (isRefetching || isExhausted) return
        showPage(pageIndex.current + PAGE_SIZE)
    }

    return { news: displayedNews, isOpen, toggle, refetch, isRefetching, isExhausted }
}
