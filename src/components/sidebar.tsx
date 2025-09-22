"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, ArrowLeft } from "lucide-react"

interface SidebarProps {
  title: string
  subtitle: string
  userEmail: string
  children: React.ReactNode
}

export function Sidebar({ title, subtitle, userEmail, children }: SidebarProps) {
  const router = useRouter()

  return (
    <div className="w-80 bg-black text-white p-6 flex flex-col h-screen">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.push('/home')}
        className="justify-start text-white hover:bg-gray-800 mb-4 w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/christ-logo.png"
          alt="Christ University Logo"
          width={180}
          height={120}
          className="object-contain filter invert brightness-0"
        />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-2xl font-bold">{subtitle}</h2>
        <p className="text-gray-400 text-sm mt-2">{userEmail}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {children}
      </nav>

      {/* Logout */}
      <Button 
        variant="ghost" 
        className="justify-start text-white hover:bg-gray-800 mt-auto"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  )
}
