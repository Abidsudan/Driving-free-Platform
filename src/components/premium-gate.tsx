
"use client"

import React from "react"

interface PremiumGateProps {
  children: React.ReactNode
  isLocked?: boolean
  title?: string
}

/**
 * PremiumGate has been updated to be fully transparent
 * as the academy is now free for everyone.
 */
export function PremiumGate({ children }: PremiumGateProps) {
  return <>{children}</>
}
