'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

/**
 * Premium ease curve inspired by Linear/Stripe/Vercel aesthetic.
 * Produces a smooth deceleration that feels natural and polished.
 */
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const

// ---------------------------------------------------------------------------
// FadeUp — Fade in + slide up on scroll
// ---------------------------------------------------------------------------

interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: PREMIUM_EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// StaggerContainer — Parent wrapper for staggered children
// ---------------------------------------------------------------------------

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants(staggerDelay)}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// StaggerItem — Child of StaggerContainer
// ---------------------------------------------------------------------------

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PREMIUM_EASE,
    },
  },
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// ScaleIn — Subtle scale reveal for images and cards
// ---------------------------------------------------------------------------

interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: PREMIUM_EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// SectionReveal — Full-section opacity reveal
// ---------------------------------------------------------------------------

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
