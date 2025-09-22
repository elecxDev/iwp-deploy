"use client"

import { Suspense } from "react"
import AuthLayout from "@/components/auth-layout-new"

function LoginContent() {
  return <AuthLayout />
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
