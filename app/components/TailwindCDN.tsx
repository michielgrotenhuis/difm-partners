'use client'

import { useEffect } from 'react'

export default function TailwindCDN() {
  useEffect(() => {
    // Add Tailwind CDN as backup if local CSS fails
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('tailwind-cdn')
      if (!existingScript) {
        const script = document.createElement('script')
        script.id = 'tailwind-cdn'
        script.src = 'https://cdn.tailwindcss.com'
        script.onload = () => {
          console.log('Tailwind CDN loaded as backup')
        }
        document.head.appendChild(script)
      }
    }
  }, [])

  return null
}
