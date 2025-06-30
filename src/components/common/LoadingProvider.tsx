'use client'

import React, { useState, useEffect } from 'react'
import Loader from '@/app/loader/page'

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
    <>
      {isLoading && <Loader />}
      {children}
    </>
  )
} 