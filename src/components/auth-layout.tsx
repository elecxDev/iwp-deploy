"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

interface AuthLayoutProps {
  mode: 'login' | 'signup'
}

export default function AuthLayout({ mode }: AuthLayoutProps) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const handleAuth = async () => {
    setIsLoading(true)
    
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect based on role parameter
    switch(role) {
      case 'admin':
        router.push('/admin')
        break
      case 'guide':
        router.push('/guide')
        break
      case 'student':
        router.push('/student')
        break
      default:
        // If no role specified, redirect to home
        router.push('/home')
    }
  }

  const [currentMode, setCurrentMode] = useState(mode)

  const handleToggleMode = async (newMode: 'login' | 'signup') => {
    if (newMode === currentMode) return
    
    setIsSliding(true)
    
    // Wait for slide animation to complete, then switch mode
    setTimeout(() => {
      setCurrentMode(newMode)
      setIsSliding(false)
      
      // Update URL without page reload
      const newPath = newMode === 'login' ? '/login' : '/signup'
      const urlWithRole = role ? `${newPath}?role=${role}` : newPath
      window.history.pushState({}, '', urlWithRole)
    }, 300) // Match the animation duration
  }

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Sliding White Container */}
      <div 
        className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
          isSliding ? 'opacity-90' : 'opacity-100'
        }`}
        style={{
          transform: currentMode === 'login' ? 'translateX(0%)' : 'translateX(-100%)'
        }}
      >
        {/* Login Form Container */}
        <div className="flex-1 bg-black flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : 'Login to your account'}
              </h1>
              <p className="text-gray-400">
                {role ? `Access your ${role} dashboard` : 'or else'}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>

            <Button 
              className="w-full h-12 bg-gray-200 text-black hover:bg-gray-300 font-medium"
              onClick={handleAuth}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Your Account'}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account yet?{" "}
                <button 
                  onClick={() => handleToggleMode('signup')}
                  className="text-white underline cursor-pointer"
                >
                  Create an account
                </button>
              </p>
              <Link href="/forgot-password" className="text-white underline text-sm block">
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">christuniversity.in</p>
            </div>
          </div>
        </div>

        {/* White Logo Container - Positioned for Login */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center rounded-l-[2rem]">
          <div className="text-center">
            <Image
              src="/christ-logo.png"
              alt="Christ University Logo"
              width={600}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Sliding Container for Signup */}
      <div 
        className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
          isSliding ? 'opacity-90' : 'opacity-100'
        }`}
        style={{
          transform: currentMode === 'signup' ? 'translateX(0%)' : 'translateX(100%)'
        }}
      >
        {/* White Logo Container - Positioned for Signup */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center rounded-r-[2rem]">
          <div className="text-center">
            <Image
              src="/christ-logo.png"
              alt="Christ University Logo"
              width={600}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Signup Form Container */}
        <div className="flex-1 bg-black flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Sign Up` : 'Create account'}
              </h1>
              <p className="text-gray-400">
                {role ? `Create your ${role} account` : 'or else'}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>

            <Button 
              className="w-full h-12 bg-gray-200 text-black hover:bg-gray-300 font-medium"
              onClick={handleAuth}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign up'}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button 
                  onClick={() => handleToggleMode('login')}
                  className="text-white underline cursor-pointer"
                >
                  Log in
                </button>
              </p>
              <Link href="/forgot-password" className="text-white underline text-sm block">
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">christuniversity.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
