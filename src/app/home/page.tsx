"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, BookOpen, Award, Globe, ChevronDown, Star, ExternalLink, GraduationCap } from "lucide-react"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-x-hidden font-sans" style={{background: 'linear-gradient(to bottom, #000000 0%, #0a0a0f 50%, #000000 100%)'}}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Image
                src="/christ-logo.png"
                alt="Christ University"
                width={120}
                height={40}
                className="brightness-0 invert"
              />
              <div className="hidden md:flex space-x-8 text-sm font-medium">
                <Link href="#" className="text-white/70 hover:text-amber-400 transition-colors">About</Link>
                <Link href="#" className="text-white/70 hover:text-amber-400 transition-colors">Academics</Link>
                <Link href="#" className="text-white/70 hover:text-amber-400 transition-colors">Research</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-amber-500/20 hover:text-amber-400 border border-transparent hover:border-amber-500/30 font-medium">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 font-semibold shadow-lg hover:shadow-amber-500/25">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://bkc.christuniversity.in/uploads/banners/768901298_2025-06-23_03-16-49.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-thin mb-6 tracking-tight font-sans">
            Internship
            <br />
            <span className="font-light bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'}}>
              Excellence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed font-sans">
            Empowering students through world-class internship programs and industry partnerships at Christ University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#portals">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-amber-500/30 font-sans">
                Access Portals
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="text-white border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 px-8 py-4 text-lg font-medium font-sans">
              <Play className="mr-2 w-5 h-5" />
              Watch Video
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-thin text-amber-400 font-sans">15K+</div>
              <div className="text-white/70 font-medium font-sans">Students Placed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-thin text-yellow-400 font-sans">500+</div>
              <div className="text-white/70 font-medium font-sans">Partner Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-thin text-amber-300 font-sans">98%</div>
              <div className="text-white/70 font-medium font-sans">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-thin text-yellow-300 font-sans">25+</div>
              <div className="text-white/70 font-medium font-sans">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section id="portals" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin mb-6 tracking-tight font-sans">
              Access Your
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'}}>
                Portal
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light font-sans">
              Choose your role to access the comprehensive internship management system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Admin Portal */}
            <Link href="/login?role=admin" className="group">
              <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 border border-gray-700/30 hover:border-amber-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white font-sans">Administrator</h3>
                  <p className="text-white/70 mb-6 leading-relaxed font-sans">
                    Comprehensive oversight of internship programs, student management, and system administration.
                  </p>
                  <div className="flex items-center text-amber-400 group-hover:text-amber-300 transition-colors">
                    <span className="font-medium font-sans">Access Portal</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Guide Portal */}
            <Link href="/login?role=guide" className="group">
              <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 border border-gray-700/30 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white font-sans">Faculty Guide</h3>
                  <p className="text-white/70 mb-6 leading-relaxed font-sans">
                    Mentor students, review submissions, and track progress throughout their internship journey.
                  </p>
                  <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    <span className="font-medium font-sans">Access Portal</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Student Portal */}
            <Link href="/login?role=student" className="group">
              <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 border border-gray-700/30 hover:border-amber-300/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/20">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white font-sans">Student</h3>
                  <p className="text-white/70 mb-6 leading-relaxed font-sans">
                    Track your internship progress, submit reports, and communicate with faculty guides.
                  </p>
                  <div className="flex items-center text-amber-400 group-hover:text-amber-300 transition-colors">
                    <span className="font-medium font-sans">Access Portal</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>



      {/* Schools Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin mb-6 tracking-tight font-sans">
              Academic
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'}}>
                Schools
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
              <Image
                src="https://christuniversity.in/uploads/division/banner/321526271_2025-05-24_09-16-37.webp"
                alt="School of Business"
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">School of Business and Management</h3>
                <p className="text-white/70 text-sm mb-4">UG, PG, M.Phil, and PhD programs in business</p>
                <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
                  Explore <ExternalLink className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
              <Image
                src="https://christuniversity.in/uploads/division/banner/256146921_2025-05-28_11-39-59.webp"
                alt="School of Engineering"
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">School of Engineering and Technology</h3>
                <p className="text-white/70 text-sm mb-4">UGC and AICTE approved programs</p>
                <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
                  Explore <ExternalLink className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
              <Image
                src="https://christuniversity.in/uploads/division/banner/1529395459_2025-06-16_02-45-33.webp"
                alt="School of Sciences"
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">School of Sciences</h3>
                <p className="text-white/70 text-sm mb-4">Chemistry, Physics, Math, Life Sciences</p>
                <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
                  Explore <ExternalLink className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Alumni Success Stories */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin mb-6 tracking-tight font-sans">
              Our Proud
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'}}>
                Alumni
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="https://christuniversity.in/uploads/distinguishedandalumni/medium/haresh tarani_20250619013722..jpg"
                  alt="Haresh Tharani"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">Haresh Tharani</h3>
                  <p className="text-amber-400 text-sm font-medium">Chairman & CEO, Tharanco Group</p>
                  <p className="text-white/60 text-xs">BCom - 1982</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="https://christuniversity.in/uploads/distinguishedandalumni/medium/madonna_20250619050819..jpg"
                  alt="Madonna Sebastian"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">Madonna Sebastian</h3>
                  <p className="text-amber-400 text-sm font-medium">Indian Actress</p>
                  <p className="text-white/60 text-xs">BCom Tourism - 2013</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="https://christuniversity.in/uploads/distinguishedandalumni/medium/lucas thomas_20250619043743..jpg"
                  alt="Lucas Thomas"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">Lucas Thomas</h3>
                  <p className="text-amber-400 text-sm font-medium">Senior VP, Bank of America</p>
                  <p className="text-white/60 text-xs">MCA - 2000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 px-8 py-3 font-semibold">
              View All Alumni
            </Button>
          </div>
        </div>
      </section>



      {/* Video Experience Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://christuniversity.in/uploads/homecontent/banner/ecec_20250701125732..jpg"
            alt="Campus Experience"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-gray-950/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-thin mb-6 tracking-tight font-sans">
                Experience
                <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'}}>
                  Christ University
                </span>
              </h2>
              <div className="space-y-4 text-lg text-white/80 font-light">
                <p className="flex items-center">
                  <span className="text-green-400 mr-3">|</span>
                  NURTURING EXCELLENCE
                </p>
                <p className="flex items-center">
                  <span className="text-yellow-400 mr-3">|</span>
                  ENRICHING LIVES
                </p>
                <p className="flex items-center">
                  <span className="text-purple-400 mr-3">|</span>
                  TRANSFORMING FUTURE
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-amber-500/30">
                <Play className="mr-3 w-6 h-6" />
                Watch Experience Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-thin mb-6 tracking-tight font-sans">
              Why Choose
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'}}>
                Christ University
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">Global Network</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                Connect with industry leaders and multinational corporations worldwide
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">Expert Mentorship</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                Guidance from experienced faculty and industry professionals
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">Excellence Recognition</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                Recognized for outstanding placement records and student success
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">38+ Countries</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                International student community from around the globe
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">40+ Departments</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                Diverse academic programs across multiple disciplines
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white font-sans">90,000+ Alumni</h3>
              <p className="text-white/70 leading-relaxed font-sans">
                Strong global alumni network across industries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="/christ-logo.png"
                alt="Christ University"
                width={100}
                height={30}
                className="brightness-0 invert"
              />
              <div className="text-white/70 text-sm font-medium font-sans">
                © 2025 Christ University. All rights reserved.
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-white/70 font-medium font-sans">
              <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
