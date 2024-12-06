'use client'

import React, { useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <div className='text-white flex flex-col'>
      <div className='container mx-auto px-4 max-w-[1024px]'>
        {children}
        <Toaster />
      </div>
    </div>
  )
}
