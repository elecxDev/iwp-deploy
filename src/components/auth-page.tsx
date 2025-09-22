"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import AuthLayout from "@/components/auth-layout"

export default function AuthPage() {
  const pathname = usePathname()
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    // Determine mode based on current path
    if (pathname === '/signup') {
      setMode('signup')
    } else {
      setMode('login')
    }
  }, [pathname])

  return <AuthLayout mode={mode} />
}
