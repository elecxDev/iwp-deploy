"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function AuthLayout() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>('login')
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const role = searchParams.get('role')

  // Set initial mode based on pathname
  useEffect(() => {
    if (pathname === '/signup') {
      setCurrentMode('signup')
    } else {
      setCurrentMode('login')
    }
  }, [pathname])

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

  const handleToggleMode = (newMode: 'login' | 'signup') => {
    if (newMode === currentMode) return
    
    setCurrentMode(newMode)
    
    // Update URL without page reload
    const newPath = newMode === 'login' ? '/login' : '/signup'
    const urlWithRole = role ? `${newPath}?role=${role}` : newPath
    window.history.pushState({}, '', urlWithRole)
  }

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Login Form - Fixed position on left */}
      <div className="absolute left-0 w-1/2 h-full flex items-center justify-center p-8 z-0">
        <div className={`w-full max-w-md space-y-6 transition-opacity duration-500 ${
          currentMode === 'login' ? 'opacity-100' : 'opacity-30'
        }`}>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : 'Login to your account'}
            </h1>
            <p className="text-gray-400">
              {role ? `Access your ${role} dashboard` : 'Welcome back!'}
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
            disabled={isLoading || currentMode !== 'login'}
          >
            {isLoading ? 'Logging in...' : 'Login to Your Account'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account yet?{" "}
              <button 
                onClick={() => handleToggleMode('signup')}
                className="text-white underline cursor-pointer hover:text-gray-300 transition-colors"
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

      {/* Signup Form - Fixed position on right */}
      <div className="absolute right-0 w-1/2 h-full flex items-center justify-center p-8 z-0">
        <div className={`w-full max-w-md space-y-6 transition-opacity duration-500 ${
          currentMode === 'signup' ? 'opacity-100' : 'opacity-30'
        }`}>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Sign Up` : 'Create account'}
            </h1>
            <p className="text-gray-400">
              {role ? `Create your ${role} account` : 'Welcome aboard!'}
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
            disabled={isLoading || currentMode !== 'signup'}
          >
            {isLoading ? 'Creating Account...' : 'Sign up'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button 
                onClick={() => handleToggleMode('login')}
                className="text-white underline cursor-pointer hover:text-gray-300 transition-colors"
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

      {/* Sliding White Background Rectangle */}
      <div 
        className="absolute top-0 w-1/2 h-full bg-gray-50 transition-all duration-700 ease-in-out z-10"
        style={{
          transform: currentMode === 'login' ? 'translateX(100%)' : 'translateX(0%)',
          borderRadius: currentMode === 'login' ? '2rem 0 0 2rem' : '0 2rem 2rem 0'
        }}
      >
        {/* Logo - Always centered in the white rectangle */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Image
              src="/christ-logo.png"
              alt="Christ University Logo"
              width={500}
              height={350}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
