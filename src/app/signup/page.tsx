"use client"

import { Suspense } from "react"
import AuthLayout from "@/components/auth-layout-new"

function SignupContent() {
  return <AuthLayout />
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  )
}
