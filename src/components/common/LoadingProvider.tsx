'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import Loader from '@/app/loader/page'

export const LoadingContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export function useLoading() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  )
} 