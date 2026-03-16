'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Calculator, Heart, DollarSign, Calendar, Wrench,
  Check, TrendingUp, Clock, Ruler, Weight, Activity,
  Zap, Target, Award, BarChart3, Hash, Square,
  Timer, Globe, FileText, Shield, Moon, Sun, Droplets, Wind,
  Home, Car, CreditCard, PiggyBank, Landmark, Wallet, Receipt,
  TrendingDown, Coins, Star, Info, AlertCircle, Divide, ArrowLeft,
  Lightbulb, AlertTriangle, ListChecks, BookOpen, Sparkles,
  ChevronRight, PieChart as PieChartIcon, HelpCircle,
  BarChart as BarChartIcon, TrendingUpIcon, CircleDot, Layers, Gauge,
  Flag, MapPin, Rocket, Coffee, Dumbbell, Apple, Bed, Brain,
  User, Users, Briefcase, GraduationCap, Medal, ThumbsUp,
  Clipboard, CalendarDays, ChartLine, HeartPulse, WalletCards
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  health: Heart,
  financial: DollarSign,
  math: Calculator,
  datetime: Calendar,
  tools: Wrench
}

// Category colors mapping
const categoryColors: Record<string, string> = {
  health: 'from-rose-500 to-pink-500',
  financial: 'from-emerald-500 to-teal-500',
  math: 'from-violet-500 to-purple-500',
  datetime: 'from-amber-500 to-orange-500',
  tools: 'from-cyan-500 to-blue-500'
}

// Character definitions with visual representations
const characters = [
  { 
    name: 'Alex', 
    role: 'The Analyzer', 
    emoji: '🔬', 
    color: 'from-blue-500 to-cyan-500', 
    icon: BookOpen,
    avatar: '👨‍🔬',
    description: 'Expert in data analysis and understanding results'
  },
  { 
    name: 'Sam', 
    role: 'The Strategist', 
    emoji: '🎯', 
    color: 'from-green-500 to-emerald-500', 
    icon: Target,
    avatar: '🎯',
    description: 'Specialist in goal setting and strategic planning'
  },
  { 
    name: 'Jordan', 
    role: 'The Optimizer', 
    emoji: '⚡', 
    color: 'from-amber-500 to-yellow-500', 
    icon: Zap,
    avatar: '⚡',
    description: 'Master of efficiency and quick improvements'
  },
  { 
    name: 'Taylor', 
    role: 'The Tracker', 
    emoji: '📊', 
    color: 'from-purple-500 to-pink-500', 
    icon: TrendingUp,
    avatar: '📈',
    description: 'Expert in monitoring progress and metrics'
  },
  { 
    name: 'Morgan', 
    role: 'The Achiever', 
    emoji: '🏆', 
    color: 'from-rose-500 to-red-500', 
    icon: Award,
    avatar: '🏅',
    description: 'Champion of consistency and long-term success'
  },
  { 
    name: 'Casey', 
    role: 'The Expert', 
    emoji: '🎓', 
    color: 'from-teal-500 to-cyan-500', 
    icon: GraduationCap,
    avatar: '👨‍🎓',
    description: 'Professional guidance and expert knowledge'
  },
]

// ============ VISUAL INFOGRAPHIC COMPONENTS ============

// Quick Actions Infographic (SVG-based)
function QuickActionsInfographic() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl overflow-hidden border">
      <svg viewBox="0 0 400 150" className="w-full h-full">
        {/* Background pattern */}
        <defs>
          <pattern id="quickGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(34, 197, 94, 0.1)" />
          </pattern>
        </defs>
        <rect width="400" height="150" fill="url(#quickGrid)" />
        
        {/* Step 1 */}
        <g transform="translate(30, 30)">
          <circle cx="25" cy="25" r="25" fill="#22c55e" opacity="0.2" />
          <circle cx="25" cy="25" r="20" fill="#22c55e" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1</text>
          <text x="25" y="70" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">VERIFY</text>
          <text x="25" y="82" textAnchor="middle" fill="#166534" fontSize="8">Inputs</text>
        </g>
        
        {/* Arrow 1 */}
        <path d="M 85 55 L 115 55" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <polygon points="115,50 125,55 115,60" fill="#22c55e" />
        
        {/* Step 2 */}
        <g transform="translate(140, 30)">
          <circle cx="25" cy="25" r="25" fill="#22c55e" opacity="0.2" />
          <circle cx="25" cy="25" r="20" fill="#10b981" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2</text>
          <text x="25" y="70" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">SETUP</text>
          <text x="25" y="82" textAnchor="middle" fill="#166534" fontSize="8">Tracking</text>
        </g>
        
        {/* Arrow 2 */}
        <polygon points="225,50 235,55 225,60" fill="#22c55e" />
        
        {/* Step 3 */}
        <g transform="translate(250, 30)">
          <circle cx="25" cy="25" r="25" fill="#22c55e" opacity="0.2" />
          <circle cx="25" cy="25" r="20" fill="#059669" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">3</text>
          <text x="25" y="70" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">TAKE</text>
          <text x="25" y="82" textAnchor="middle" fill="#166534" fontSize="8">Action</text>
        </g>
        
        {/* Clock icon representing "Today" */}
        <g transform="translate(350, 40)">
          <circle cx="15" cy="15" r="15" fill="#fbbf24" opacity="0.3" />
          <text x="15" y="20" textAnchor="middle" fontSize="16">⏰</text>
        </g>
        
        {/* Label */}
        <text x="200" y="130" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">
          QUICK ACTIONS - Do It TODAY!
        </text>
      </svg>
    </div>
  )
}

// Medium-term Actions Infographic (SVG-based)
function MediumTermInfographic() {
  return (
    <div className="relative w-full h-56 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl overflow-hidden border">
      <svg viewBox="0 0 400 180" className="w-full h-full">
        {/* Background */}
        <defs>
          <linearGradient id="mediumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="400" height="180" fill="url(#mediumGrad)" />
        
        {/* Month indicators */}
        <g>
          <rect x="50" y="20" width="80" height="25" rx="12" fill="#f59e0b" />
          <text x="90" y="37" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Month 1</text>
          
          <rect x="160" y="20" width="80" height="25" rx="12" fill="#d97706" />
          <text x="200" y="37" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Month 2</text>
          
          <rect x="270" y="20" width="80" height="25" rx="12" fill="#b45309" />
          <text x="310" y="37" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Month 3</text>
        </g>
        
        {/* Progress bar */}
        <g transform="translate(50, 55)">
          <rect x="0" y="0" width="300" height="10" rx="5" fill="#e5e7eb" />
          <rect x="0" y="0" width="300" height="10" rx="5" fill="url(#progressGrad)" />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </g>
        
        {/* Building blocks */}
        <g transform="translate(40, 80)">
          {/* Block 1 */}
          <rect x="0" y="0" width="90" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="45" y="20" textAnchor="middle" fontSize="20">🏃</text>
          <text x="45" y="40" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">Build Habits</text>
          
          {/* Block 2 */}
          <rect x="105" y="0" width="90" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="150" y="20" textAnchor="middle" fontSize="20">📋</text>
          <text x="150" y="40" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">Create Plan</text>
          
          {/* Block 3 */}
          <rect x="210" y="0" width="90" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="255" y="20" textAnchor="middle" fontSize="20">📊</text>
          <text x="255" y="40" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">Track Progress</text>
        </g>
        
        {/* Calendar icon */}
        <g transform="translate(355, 100)">
          <text x="0" y="0" fontSize="24">📅</text>
        </g>
        
        {/* Label */}
        <text x="200" y="160" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          MEDIUM-TERM - 1-3 Months Journey
        </text>
      </svg>
    </div>
  )
}

// Long-term Actions Infographic (SVG-based)
function LongTermInfographic() {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl overflow-hidden border">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Background */}
        <defs>
          <linearGradient id="longGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#longGrad)" />
        
        {/* Timeline */}
        <line x1="30" y1="100" x2="370" y2="100" stroke="#3b82f6" strokeWidth="3" />
        
        {/* Milestones */}
        <g>
          {/* Month 6 */}
          <circle cx="80" cy="100" r="15" fill="#3b82f6" />
          <text x="80" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">6M</text>
          <text x="80" y="130" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">Foundation</text>
          
          {/* Month 9 */}
          <circle cx="160" cy="100" r="15" fill="#6366f1" />
          <text x="160" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">9M</text>
          <text x="160" y="130" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="bold">Growth</text>
          
          {/* Month 12 */}
          <circle cx="240" cy="100" r="15" fill="#8b5cf6" />
          <text x="240" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">12M</text>
          <text x="240" y="130" textAnchor="middle" fill="#5b21b6" fontSize="9" fontWeight="bold">Mastery</text>
          
          {/* Year 2 */}
          <circle cx="320" cy="100" r="15" fill="#a855f7" />
          <text x="320" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2Y</text>
          <text x="320" y="130" textAnchor="middle" fill="#6b21a8" fontSize="9" fontWeight="bold">Excellence</text>
        </g>
        
        {/* Top achievements */}
        <g transform="translate(30, 20)">
          <rect x="0" y="0" width="100" height="35" rx="8" fill="#dbeafe" stroke="#3b82f6" />
          <text x="50" y="15" textAnchor="middle" fontSize="16">🏠</text>
          <text x="50" y="28" textAnchor="middle" fontSize="8" fill="#1e40af">Lifestyle</text>
        </g>
        
        <g transform="translate(150, 20)">
          <rect x="0" y="0" width="100" height="35" rx="8" fill="#ede9fe" stroke="#8b5cf6" />
          <text x="50" y="15" textAnchor="middle" fontSize="16">🤝</text>
          <text x="50" y="28" textAnchor="middle" fontSize="8" fill="#5b21b6">Support Net</text>
        </g>
        
        <g transform="translate(270, 20)">
          <rect x="0" y="0" width="100" height="35" rx="8" fill="#fae8ff" stroke="#a855f7" />
          <text x="50" y="15" textAnchor="middle" fontSize="16">🎯</text>
          <text x="50" y="28" textAnchor="middle" fontSize="8" fill="#6b21a8">Goals Met</text>
        </g>
        
        {/* Arrow showing direction */}
        <polygon points="370,95 380,100 370,105" fill="#3b82f6" />
        
        {/* Bottom label */}
        <text x="200" y="170" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          LONG-TERM TRANSFORMATION - 6+ Months to Excellence
        </text>
        
        {/* Success stars */}
        <text x="380" y="50" fontSize="16">⭐</text>
        <text x="20" y="180" fontSize="16">🏆</text>
      </svg>
    </div>
  )
}

// Summary Infographic with Characters
function SummaryInfographic() {
  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl overflow-hidden border">
      <svg viewBox="0 0 400 280" className="w-full h-full">
        {/* Central circle */}
        <circle cx="200" cy="140" r="80" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
        
        {/* Center content */}
        <text x="200" y="125" textAnchor="middle" fontSize="24">🎯</text>
        <text x="200" y="150" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="bold">YOUR</text>
        <text x="200" y="165" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="bold">JOURNEY</text>
        
        {/* Character nodes */}
        {/* Alex - Top */}
        <g transform="translate(175, 20)">
          <circle cx="25" cy="25" r="25" fill="#3b82f6" />
          <text x="25" y="32" textAnchor="middle" fontSize="20">👨‍🔬</text>
          <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="bold">Alex</text>
          <text x="25" y="77" textAnchor="middle" fontSize="7" fill="#1e40af">Analyzer</text>
        </g>
        <line x1="200" y1="70" x2="200" y2="60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
        
        {/* Sam - Right */}
        <g transform="translate(280, 115)">
          <circle cx="25" cy="25" r="25" fill="#22c55e" />
          <text x="25" y="32" textAnchor="middle" fontSize="20">🎯</text>
          <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">Sam</text>
          <text x="25" y="77" textAnchor="middle" fontSize="7" fill="#166534">Strategist</text>
        </g>
        <line x1="280" y1="140" x2="260" y2="140" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
        
        {/* Jordan - Bottom Right */}
        <g transform="translate(250, 200)">
          <circle cx="25" cy="25" r="25" fill="#f59e0b" />
          <text x="25" y="32" textAnchor="middle" fontSize="20">⚡</text>
          <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">Jordan</text>
          <text x="25" y="77" textAnchor="middle" fontSize="7" fill="#92400e">Optimizer</text>
        </g>
        <line x1="250" y1="210" x2="230" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
        
        {/* Taylor - Bottom Left */}
        <g transform="translate(100, 200)">
          <circle cx="25" cy="25" r="25" fill="#8b5cf6" />
          <text x="25" y="32" textAnchor="middle" fontSize="20">📈</text>
          <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#5b21b6" fontWeight="bold">Taylor</text>
          <text x="25" y="77" textAnchor="middle" fontSize="7" fill="#5b21b6">Tracker</text>
        </g>
        <line x1="150" y1="210" x2="170" y2="200" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" />
        
        {/* Morgan - Left */}
        <g transform="translate(20, 115)">
          <circle cx="25" cy="25" r="25" fill="#ef4444" />
          <text x="25" y="32" textAnchor="middle" fontSize="20">🏅</text>
          <text x="25" y="65" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="bold">Morgan</text>
          <text x="25" y="77" textAnchor="middle" fontSize="7" fill="#991b1b">Achiever</text>
        </g>
        <line x1="120" y1="140" x2="140" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
        
        {/* Label */}
        <text x="200" y="260" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">
          YOUR SUCCESS TEAM - Guiding You Every Step
        </text>
      </svg>
    </div>
  )
}

// Result Section Component
function ResultSection({ 
  icon: Icon, 
  title, 
  children, 
  highlight = false,
  className = ''
}: { 
  icon?: React.ElementType
  title: string
  children: React.ReactNode
  highlight?: boolean
  className?: string
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={`rounded-2xl border bg-card ${highlight ? 'border-2 border-primary shadow-lg ring-1 ring-primary/20' : ''} ${className}`}
    >
      <div className="p-4 border-b bg-muted/20">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </h2>
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  )
}

// Status Badge Component
function StatusBadge({ status, type }: { status: string; type: 'success' | 'warning' | 'danger' | 'info' }) {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
    danger: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
  }
  const icons = {
    success: Check,
    warning: AlertTriangle,
    danger: AlertCircle,
    info: Info
  }
  const Icon = icons[type]
  return (
    <div className={`${colors[type]} border px-4 py-2 rounded-xl inline-flex items-center gap-2 text-sm font-semibold`}>
      <Icon className="h-4 w-4" />
      {status}
    </div>
  )
}

// Detailed Action Card with Infographic
function DetailedActionCard({ 
  title, 
  description, 
  icon: Icon,
  color,
  delay = 0,
  infographic
}: { 
  title: string
  description: string
  icon?: React.ElementType
  color?: string
  delay?: number
  infographic?: React.ReactNode
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className={`p-6 rounded-xl border bg-gradient-to-br ${color || 'from-muted/80 to-muted/40'} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-2">{title}</h4>
        </div>
      </div>
      
      {/* Infographic */}
      {infographic && (
        <div className="mb-4">
          {infographic}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
    </motion.div>
  )
}

// Character Roadmap Step with Visual
function CharacterRoadmapStep({ 
  step, 
  title, 
  description, 
  character,
  status,
  delay
}: { 
  step: number
  title: string
  description: string
  character: typeof characters[0]
  status?: 'pending' | 'current' | 'completed'
  delay: number
}) {
  const Icon = character.icon
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15, duration: 0.5 }}
      className="relative flex gap-4"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg bg-gradient-to-br ${character.color}`}
        >
          <span className="text-2xl">{character.avatar}</span>
        </motion.div>
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ delay: delay * 0.15 + 0.4, duration: 0.3 }}
          className="w-0.5 bg-gradient-to-b from-primary/50 to-muted flex-1 min-h-[40px]"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay * 0.15 + 0.1 }}
          className="p-5 bg-gradient-to-br from-muted/80 to-muted/40 rounded-xl border hover:shadow-md transition-shadow"
        >
          {/* Character Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{character.name}</p>
              <p className="text-xs text-muted-foreground">{character.role}</p>
            </div>
            <Badge variant="outline" className="ml-auto">Step {step}</Badge>
          </div>
          
          {/* Step Content */}
          <h4 className="font-semibold text-lg mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          
          {/* Character Quote */}
          <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-4 border-primary/30">
            <p className="text-xs italic text-muted-foreground">
              💬 <strong>{character.name} says:</strong> "{getCharacterQuote(character.name, title)}"
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Get character-specific quotes
function getCharacterQuote(name: string, title: string): string {
  const quotes: Record<string, string[]> = {
    'Alex': [
      "Understanding is the first step to improvement!",
      "Let's break down the data and see what's happening.",
      "Analysis leads to action!",
      "Knowledge is power in your journey.",
    ],
    'Sam': [
      "A goal without a plan is just a wish!",
      "Strategy beats effort every time.",
      "Let's map out your path to success.",
      "Focus on what matters most.",
    ],
    'Jordan': [
      "Small changes lead to big results!",
      "Efficiency is doing things right; effectiveness is doing the right things.",
      "Let's optimize your approach!",
      "Every action counts toward your goal.",
    ],
    'Taylor': [
      "What gets measured gets managed!",
      "Tracking progress keeps you motivated.",
      "The numbers tell the story!",
      "Let's monitor your journey together.",
    ],
    'Morgan': [
      "Consistency is the key to success!",
      "Celebrate every milestone!",
      "You've got this!",
      "Determination beats talent when talent doesn't work hard.",
    ],
    'Casey': [
      "Expert guidance accelerates progress!",
      "Sometimes you need a professional perspective.",
      "Don't hesitate to seek help!",
      "Knowledge from experts saves time and effort.",
    ],
  }
  const characterQuotes = quotes[name] || quotes['Alex']
  return characterQuotes[Math.floor(Math.random() * characterQuotes.length)]
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-left flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
          {question}
        </span>
        <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 bg-background border-t">
          <p className="text-sm text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}

// Chart components (simplified for brevity - keeping existing implementations)
function BarChart({ data, height = 200 }: { data: { label: string; value: number; color?: string }[]; height?: number }) {
  const max = Math.max(...data.map(d => Math.abs(d.value)), 1)
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-around h-full gap-2 px-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${(Math.abs(item.value) / max) * 85}%` }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="w-full rounded-t-lg shadow-lg"
              style={{ backgroundColor: item.color || `hsl(${i * 45}, 70%, 50%)`, minHeight: 4 }}
            />
            <p className="text-xs text-center mt-2 text-muted-foreground truncate w-full">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PieChart({ data, size = 200 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0.1), 0)
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 30
  
  const segments = data.reduce<{ startAngle: number; endAngle: number; color: string; label: string; value: number; percentage: number }[]>((acc, item, index) => {
    const prevEnd = index === 0 ? -90 : acc[index - 1].endAngle
    const angle = (Math.max(item.value, 0.1) / total) * 360
    const percentage = (Math.max(item.value, 0.1) / total) * 100
    acc.push({ startAngle: prevEnd, endAngle: prevEnd + angle, color: item.color, label: item.label, value: item.value, percentage })
    return acc
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="drop-shadow-lg">
        {segments.map((segment, index) => {
          const startRad = (segment.startAngle * Math.PI) / 180
          const endRad = (segment.endAngle * Math.PI) / 180
          const midRad = ((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180
          const x1 = centerX + radius * Math.cos(startRad)
          const y1 = centerY + radius * Math.sin(startRad)
          const x2 = centerX + radius * Math.cos(endRad)
          const y2 = centerY + radius * Math.sin(endRad)
          const labelRadius = radius * 0.65
          const labelX = centerX + labelRadius * Math.cos(midRad)
          const labelY = centerY + labelRadius * Math.sin(midRad)
          const largeArc = (segment.endAngle - segment.startAngle) > 180 ? 1 : 0
          
          return (
            <motion.path 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} 
              fill={segment.color} 
              stroke="white" 
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="grid grid-cols-2 gap-2 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonBar({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit?: string }) {
  const percentage = Math.min((Math.abs(value) / max) * 100, 100)
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value.toFixed(1)}{unit}</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percentage}%` }} 
          transition={{ duration: 0.8 }} 
          className="h-full rounded-full" 
          style={{ backgroundColor: color }} 
        />
      </div>
    </div>
  )
}

function BenchmarkItem({ label, userValue, benchmark, unit, status }: { 
  label: string; userValue: number; benchmark: number; unit?: string; status: 'better' | 'worse' | 'neutral' 
}) {
  const diff = userValue - benchmark
  const diffPercent = ((diff / benchmark) * 100).toFixed(1)
  const statusColors = {
    better: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    worse: 'text-red-600 bg-red-50 dark:bg-red-900/20',
    neutral: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
  }
  
  return (
    <div className="p-4 rounded-xl border bg-muted/30">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{userValue.toFixed(1)}{unit}</p>
          <p className="text-xs text-muted-foreground">Your value</p>
        </div>
        <div className="text-center px-4">
          <p className="text-lg font-semibold text-muted-foreground">vs</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-muted-foreground">{benchmark.toFixed(1)}{unit}</p>
          <p className="text-xs text-muted-foreground">Benchmark</p>
        </div>
      </div>
      <div className={`mt-3 p-2 rounded-lg text-center text-sm font-medium ${statusColors[status]}`}>
        {diff > 0 ? '+' : ''}{diffPercent}% from benchmark
      </div>
    </div>
  )
}

// ============ ADDITIONAL CHART COMPONENTS ============

// 1. LineChart - Shows trends over time
function LineChart({ data, height = 200 }: { data: { label: string; value: number; color?: string }[]; height?: number }) {
  const max = Math.max(...data.map(d => Math.abs(d.value)), 1)
  const min = Math.min(...data.map(d => d.value), 0)
  const range = max - min || 1
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 100
    const y = 100 - ((d.value - min) / range) * 100
    return { x, y, value: d.value, label: d.label }
  })
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L 100 100 L 0 100 Z`

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          d={areaD}
          fill="url(#lineGrad)"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          d={pathD}
          fill="none"
          stroke="rgb(99, 102, 241)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="rgb(99, 102, 241)"
            stroke="white"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.slice(0, 5).map((d, i) => (
          <p key={i} className="text-xs text-muted-foreground truncate">{d.label}</p>
        ))}
      </div>
    </div>
  )
}

// 2. DoughnutChart - Pie chart with center hole
function DoughnutChart({ data, size = 200, centerText }: { data: { label: string; value: number; color: string }[]; size?: number; centerText?: string }) {
  const total = data.reduce((sum, d) => sum + Math.max(d.value, 0.1), 0)
  const centerX = size / 2
  const centerY = size / 2
  const outerRadius = size / 2 - 20
  const innerRadius = outerRadius * 0.6

  const segments = data.reduce<{ startAngle: number; endAngle: number; color: string; label: string; value: number }[]>((acc, item, index) => {
    const prevEnd = index === 0 ? -90 : acc[index - 1].endAngle
    const angle = (Math.max(item.value, 0.1) / total) * 360
    acc.push({ startAngle: prevEnd, endAngle: prevEnd + angle, color: item.color, label: item.label, value: item.value })
    return acc
  }, [])

  const createArcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1Outer = centerX + outerR * Math.cos(startRad)
    const y1Outer = centerY + outerR * Math.sin(startRad)
    const x2Outer = centerX + outerR * Math.cos(endRad)
    const y2Outer = centerY + outerR * Math.sin(endRad)
    const x1Inner = centerX + innerR * Math.cos(endRad)
    const y1Inner = centerY + innerR * Math.sin(endRad)
    const x2Inner = centerX + innerR * Math.cos(startRad)
    const y2Inner = centerY + innerR * Math.sin(startRad)
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0
    return `M ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner} Z`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={size} height={size} className="drop-shadow-lg">
          {segments.map((segment, index) => (
            <motion.path
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              d={createArcPath(segment.startAngle, segment.endAngle, innerRadius, outerRadius)}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-center">{centerText}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3. RadarChart - Multi-dimensional comparison
function RadarChart({ data, size = 200 }: { data: { label: string; value: number; max: number; color?: string }[]; size?: number }) {
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 30
  const angleStep = (2 * Math.PI) / data.length

  const points = data.map((d, i) => {
    const angle = angleStep * i - Math.PI / 2
    const normalizedValue = Math.min(d.value / d.max, 1)
    return {
      x: centerX + radius * normalizedValue * Math.cos(angle),
      y: centerY + radius * normalizedValue * Math.sin(angle),
      labelX: centerX + (radius + 15) * Math.cos(angle),
      labelY: centerY + (radius + 15) * Math.sin(angle),
      ...d
    }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  // Generate grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const gridPaths = gridLevels.map(level => {
    const gridPoints = data.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2
      return {
        x: centerX + radius * level * Math.cos(angle),
        y: centerY + radius * level * Math.sin(angle)
      }
    })
    return gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size + 60} height={size + 60} className="drop-shadow-lg">
        <g transform="translate(30, 30)">
          {/* Grid */}
          {gridPaths.map((path, i) => (
            <path key={i} d={path} fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1" />
          ))}
          {/* Axes */}
          {data.map((_, i) => {
            const angle = angleStep * i - Math.PI / 2
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={centerX + radius * Math.cos(angle)}
                y2={centerY + radius * Math.sin(angle)}
                stroke="rgba(156, 163, 175, 0.5)"
                strokeWidth="1"
              />
            )
          })}
          {/* Data polygon */}
          <motion.path
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5 }}
            d={pathD}
            fill="rgba(99, 102, 241, 0.3)"
            stroke="rgb(99, 102, 241)"
            strokeWidth="2"
          />
          {/* Data points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="rgb(99, 102, 241)"
              stroke="white"
              strokeWidth="2"
            />
          ))}
          {/* Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-muted-foreground"
            >
              {p.label.length > 6 ? p.label.slice(0, 6) + '...' : p.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}

// 4. GaugeChart - Semi-circular gauge
function GaugeChart({ value, max, min = 0, label, unit, thresholds }: {
  value: number
  max: number
  min?: number
  label?: string
  unit?: string
  thresholds?: { value: number; color: string; label: string }[]
}) {
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1)
  const angle = percentage * 180
  const size = 200
  const centerX = size / 2
  const centerY = size - 20
  const radius = size / 2 - 20

  const defaultThresholds = [
    { value: 0.33, color: '#22c55e', label: 'Low' },
    { value: 0.66, color: '#f59e0b', label: 'Medium' },
    { value: 1, color: '#ef4444', label: 'High' }
  ]
  const displayThresholds = thresholds || defaultThresholds

  const getNeedlePath = (angleDeg: number) => {
    const rad = ((angleDeg - 180) * Math.PI) / 180
    const needleLength = radius * 0.7
    const tipX = centerX + needleLength * Math.cos(rad)
    const tipY = centerY + needleLength * Math.sin(rad)
    return `M ${centerX} ${centerY} L ${tipX} ${tipY}`
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 40} className="drop-shadow-lg">
        {/* Background arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="rgba(156, 163, 175, 0.3)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Colored segments */}
        {displayThresholds.map((t, i) => {
          const startAngle = i === 0 ? 180 : 180 + (displayThresholds[i - 1].value * 180)
          const endAngle = 180 + (t.value * 180)
          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          const x1 = centerX + radius * Math.cos(startRad)
          const y1 = centerY + radius * Math.sin(startRad)
          const x2 = centerX + radius * Math.cos(endRad)
          const y2 = centerY + radius * Math.sin(endRad)
          const largeArc = (t.value - (i === 0 ? 0 : displayThresholds[i - 1].value)) > 0.5 ? 1 : 0
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
              fill="none"
              stroke={t.color}
              strokeWidth="20"
              strokeLinecap="round"
            />
          )
        })}
        {/* Needle */}
        <motion.path
          initial={{ rotate: -90, transformOrigin: `${centerX}px ${centerY}px` }}
          animate={{ rotate: angle - 180, transformOrigin: `${centerX}px ${centerY}px` }}
          transition={{ duration: 1, type: 'spring' }}
          d={getNeedlePath(180)}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
        />
        {/* Center circle */}
        <circle cx={centerX} cy={centerY} r="10" fill="currentColor" className="text-primary" />
        {/* Value text */}
        <text x={centerX} y={centerY + 35} textAnchor="middle" className="text-2xl font-bold fill-current">
          {value.toFixed(1)}{unit}
        </text>
      </svg>
      {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
      {/* Legend */}
      <div className="flex gap-4 mt-2">
        {displayThresholds.map((t, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
            <span className="text-xs text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 5. StackedBarChart - Shows parts of a whole
function StackedBarChart({ data, height = 200 }: { data: { segments: { label: string; value: number; color: string }[]; label: string }[] }) {
  // Pre-calculate all segment data to avoid reassignment
  const barsData = data.map(bar => {
    const total = bar.segments.reduce((sum, s) => sum + s.value, 0)
    return {
      ...bar,
      total,
      segmentsWithPercent: bar.segments.map(s => ({
        ...s,
        percentage: total > 0 ? (s.value / total) * 100 : 0
      }))
    }
  })

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex flex-col gap-4 h-full justify-center">
        {barsData.map((bar, barIndex) => (
          <motion.div
            key={barIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: barIndex * 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-medium w-24 truncate text-right">{bar.label}</span>
            <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden flex">
              {bar.segmentsWithPercent.map((segment, segIndex) => (
                <motion.div
                  key={segIndex}
                  initial={{ width: 0 }}
                  animate={{ width: `${segment.percentage}%` }}
                  transition={{ delay: barIndex * 0.1 + segIndex * 0.05, duration: 0.5 }}
                  className="h-full flex items-center justify-center"
                  style={{ backgroundColor: segment.color }}
                >
                  {segment.percentage > 10 && (
                    <span className="text-xs text-white font-medium truncate px-1">
                      {segment.percentage.toFixed(0)}%
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {barsData[0]?.segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: segment.color }} />
            <span className="text-xs text-muted-foreground">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 6. AreaChart - Filled area under a line
function AreaChart({ data, height = 200, color = 'rgb(99, 102, 241)' }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  const min = Math.min(...data.map(d => d.value), 0)
  const range = max - min || 1

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    y: 100 - ((d.value - min) / range) * 100,
    value: d.value,
    label: d.label
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L 100 100 L 0 100 Z`

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`areaGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          d={areaPath}
          fill={`url(#areaGrad-${color})`}
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 + 0.5 }}
            cx={p.x}
            cy={p.y}
            r="2"
            fill={color}
            stroke="white"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-2 overflow-x-auto">
        {data.slice(0, 6).map((d, i) => (
          <p key={i} className="text-xs text-muted-foreground whitespace-nowrap">{d.label}</p>
        ))}
      </div>
    </div>
  )
}

// Main Results Content Component
function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [resultData, setResultData] = useState<any>(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const decoded = decodeURIComponent(atob(data))
        return JSON.parse(decoded)
      } catch {
        try {
          return JSON.parse(decodeURIComponent(data))
        } catch (e2) {
          console.error('Failed to parse result data:', e2)
        }
      }
    }
    return null
  })
  const [loading, setLoading] = useState(!resultData)

  useEffect(() => {
    if (resultData) return
    const timer = setTimeout(() => setLoading(false), 100)
    return () => clearTimeout(timer)
  }, [resultData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!resultData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Results Found</h1>
          <p className="text-muted-foreground">Please calculate something first to see results.</p>
        </div>
        <Button size="lg" onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Calculators
        </Button>
      </div>
    )
  }

  const { 
    calculatorName, 
    category, 
    description, 
    inputs, 
    results, 
    detailedResults,
    pieData,
    formula,
    comparisons,
    charts,
    benchmarkComparison,
    faqs,
    summaryInsight,
    detailedImprovement
  } = resultData
  
  const CategoryIcon = categoryIcons[category] || Calculator
  const categoryColor = categoryColors[category] || 'from-gray-500 to-gray-600'

  const mainValue = parseFloat(results[0]?.value?.toString().replace(/[^0-9.-]/g, '') || '0')
  
  const displayCharts = charts || [
    { title: 'Result Comparison', type: 'Bar Chart', data: [
      { label: 'Your Value', value: mainValue, color: '#6366f1' },
      { label: 'Ideal', value: mainValue * 0.9, color: '#22c55e' }
    ], explanation: 'Compares your value against ideal range.' }
  ]

  const displayFAQs = faqs || [
    { question: `What does my result mean?`, answer: `Your result of ${results[0]?.value} indicates your current position.` },
    { question: 'How accurate is this?', answer: 'This calculator uses standard formulas. Results may vary.' }
  ]

  const quickActions = detailedImprovement?.quickActions || detailedResults?.improvement?.quickActions || []
  const mediumActions = detailedImprovement?.mediumActions || detailedResults?.improvement?.mediumActions || []
  const longActions = detailedImprovement?.longActions || detailedResults?.improvement?.longActions || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-[2px] group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                  <span className="text-lg font-black bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">C</span>
                </div>
              </div>
              <span className="font-black text-xl hidden sm:inline">
                <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Calci</span>
                <span className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">Lab</span>
              </span>
            </button>
            <Button variant="outline" className="gap-2" onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Calculator</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${categoryColor} text-white text-sm font-medium mb-4`}>
            <CategoryIcon className="h-4 w-4" />
            {category.charAt(0).toUpperCase() + category.slice(1)} Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{calculatorName}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="space-y-4">
          {/* 1. Input Summary */}
          <ResultSection icon={ListChecks} title="1. Input Summary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-semibold mt-1">{String(value) || '-'}</p>
                </div>
              ))}
            </div>
          </ResultSection>

          {/* 2. Final Result */}
          <ResultSection icon={Target} title="2. Final Result" highlight>
            <div className="text-center py-8">
              {results.map((result: any, index: number) => (
                <div key={index} className={`${index === 0 ? '' : 'mt-6 pt-6 border-t'}`}>
                  <p className="text-sm text-muted-foreground mb-2">{result.label}</p>
                  <p className={`text-4xl md:text-5xl font-bold ${result.highlight ? 'text-primary' : ''}`}>
                    {result.value}
                    {result.unit && <span className="text-xl ml-2 font-normal text-muted-foreground">{result.unit}</span>}
                  </p>
                </div>
              ))}
            </div>
          </ResultSection>

          {/* 3. Status */}
          {detailedResults?.status && (
            <ResultSection icon={Award} title="3. Category / Status">
              <div className="text-center py-4">
                <StatusBadge status={detailedResults.status.label} type={detailedResults.status.type} />
                {detailedResults.status.range && (
                  <p className="text-sm text-muted-foreground mt-3">Reference Range: {detailedResults.status.range}</p>
                )}
              </div>
            </ResultSection>
          )}

          {/* Visual Breakdown - Enhanced with Multiple Chart Types */}
          <ResultSection icon={PieChartIcon} title="Visual Breakdown" highlight>
            <div className="space-y-8">
              {/* Row 1: Pie and Doughnut Charts */}
              {pieData && pieData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-center">Distribution Overview</h4>
                    <PieChart data={pieData} size={200} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-center">Proportion View</h4>
                    <DoughnutChart 
                      data={pieData} 
                      size={200} 
                      centerText={results[0]?.value?.toString().substring(0, 8) || 'Result'} 
                    />
                  </div>
                </div>
              )}

              {/* Row 2: Bar Chart and Gauge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-center">Value Comparison</h4>
                  <BarChart 
                    data={[
                      { label: 'Your Value', value: mainValue, color: '#6366f1' },
                      { label: 'Target', value: mainValue * 0.9, color: '#22c55e' },
                      { label: 'Average', value: mainValue * 0.85, color: '#f59e0b' },
                      { label: 'Min', value: mainValue * 0.7, color: '#ef4444' }
                    ]} 
                    height={180} 
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-center">Gauge Reading</h4>
                  <GaugeChart 
                    value={mainValue} 
                    max={mainValue * 1.5} 
                    min={0} 
                    label={results[0]?.label || 'Result'} 
                    unit={results[0]?.unit || ''}
                  />
                </div>
              </div>

              {/* Row 3: Line Chart and Area Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-center">Trend Analysis</h4>
                  <LineChart 
                    data={[
                      { label: 'Start', value: mainValue * 0.7 },
                      { label: 'Week 2', value: mainValue * 0.8 },
                      { label: 'Week 4', value: mainValue * 0.85 },
                      { label: 'Week 6', value: mainValue * 0.9 },
                      { label: 'Current', value: mainValue },
                      { label: 'Target', value: mainValue * 1.1 }
                    ]} 
                    height={180} 
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-center">Progress Area</h4>
                  <AreaChart 
                    data={[
                      { label: 'Jan', value: mainValue * 0.6 },
                      { label: 'Feb', value: mainValue * 0.7 },
                      { label: 'Mar', value: mainValue * 0.75 },
                      { label: 'Apr', value: mainValue * 0.85 },
                      { label: 'May', value: mainValue * 0.95 },
                      { label: 'Jun', value: mainValue }
                    ]} 
                    height={180}
                    color="#22c55e"
                  />
                </div>
              </div>

              {/* Row 4: Radar Chart */}
              <div className="flex justify-center">
                <div className="space-y-2 w-full max-w-md">
                  <h4 className="text-sm font-semibold text-center">Multi-Factor Analysis</h4>
                  <div className="flex justify-center">
                    <RadarChart 
                      data={[
                        { label: 'Current', value: mainValue, max: mainValue * 1.5 },
                        { label: 'Target', value: mainValue * 1.1, max: mainValue * 1.5 },
                        { label: 'Progress', value: mainValue * 0.85, max: mainValue * 1.5 },
                        { label: 'Potential', value: mainValue * 0.9, max: mainValue * 1.5 },
                        { label: 'Baseline', value: mainValue * 0.7, max: mainValue * 1.5 }
                      ]} 
                      size={180} 
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Stacked Bar Chart */}
              {pieData && pieData.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-center">Component Breakdown</h4>
                  <StackedBarChart 
                    data={[
                      {
                        label: 'Breakdown',
                        segments: pieData.map((item: any) => ({
                          label: item.label,
                          value: item.value,
                          color: item.color
                        }))
                      },
                      {
                        label: 'Normalized',
                        segments: pieData.map((item: any) => ({
                          label: item.label,
                          value: item.value * 0.8,
                          color: item.color
                        }))
                      }
                    ]} 
                    height={120} 
                  />
                </div>
              )}
            </div>
          </ResultSection>

          {/* Comparison */}
          {comparisons && comparisons.length > 0 && (
            <ResultSection icon={BarChart3} title="Comparison">
              <div className="space-y-4">
                {comparisons.map((comp: any, i: number) => (
                  <ComparisonBar key={i} label={comp.label} value={comp.value} max={comp.max} color={comp.color} unit={comp.unit} />
                ))}
              </div>
            </ResultSection>
          )}

          {/* 4. Meaning */}
          <ResultSection icon={BookOpen} title="4. What This Result Means">
            <p className="text-muted-foreground leading-relaxed">
              {detailedResults?.meaning || `Your calculated result of ${results[0]?.value} ${results[0]?.unit || ''} is based on the inputs you provided.`}
            </p>
          </ResultSection>

          {/* 5. Explanation */}
          <ResultSection icon={Hash} title="5. Detailed Explanation">
            <div className="space-y-4">
              {(formula || detailedResults?.formula) && (
                <div className="p-4 bg-muted/30 rounded-xl border font-mono text-sm">
                  {(formula || detailedResults?.formula)?.formula}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {(formula || detailedResults?.formula)?.explanation || 'The calculation uses standard formulas.'}
              </p>
            </div>
          </ResultSection>

          {/* 6. Notes */}
          <ResultSection icon={AlertTriangle} title="6. Important Notes & Limitations">
            <div className="space-y-3">
              {detailedResults?.limitations?.length > 0 ? (
                detailedResults.limitations.map((limitation: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{limitation}</p>
                  </div>
                ))
              ) : (
                <div className="flex gap-3 items-start p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">This calculator provides estimates. For important decisions, consult professionals.</p>
                </div>
              )}
            </div>
          </ResultSection>

          {/* 7. Insights */}
          <ResultSection icon={Lightbulb} title="7. Practical Insights">
            <div className="space-y-3">
              {detailedResults?.insights?.length > 0 ? (
                detailedResults.insights.map((insight: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))
              ) : (
                <div className="flex gap-3 items-start p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Understanding your result helps you make better decisions.</p>
                </div>
              )}
            </div>
          </ResultSection>

          {/* 8. HOW TO IMPROVE - WITH INFOGRAPHICS AND DETAILED DESCRIPTIONS */}
          <ResultSection icon={TrendingUp} title="8. How to Improve This Result" highlight>
            <div className="space-y-8">
              {/* What to improve */}
              <div>
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  What should be improved:
                </p>
                <p className="text-sm text-muted-foreground pl-6">
                  {detailedResults?.improvement?.what || 'Based on your results, there are areas that could benefit from optimization.'}
                </p>
              </div>

              {/* Key factors */}
              <div>
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Key factors that influence this result:
                </p>
                <div className="flex flex-wrap gap-2 pl-6">
                  {detailedResults?.improvement?.keyInputs?.length > 0 ? (
                    detailedResults.improvement.keyInputs.map((input: string, i: number) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1">{input}</Badge>
                    ))
                  ) : (
                    Object.keys(inputs).slice(0, 3).map((input, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 capitalize">{input}</Badge>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Actions - 350+ words with infographic */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-green-600 text-lg">Quick Actions (Today)</h3>
                    <p className="text-xs text-muted-foreground">Immediate steps you can take right now</p>
                  </div>
                </div>
                
                {/* Infographic */}
                <QuickActionsInfographic />
                
                <div className="space-y-4 mt-4">
                  {quickActions.length > 0 ? (
                    quickActions.map((action: any, i: number) => (
                      <DetailedActionCard key={i} title={action.title} description={action.description} icon={Zap} color="from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10" delay={i} />
                    ))
                  ) : (
                    <>
                      <DetailedActionCard
                        title="Review and Verify Your Inputs"
                        description={`Taking time to carefully review your inputs is essential for accurate results. This foundational step ensures that all subsequent calculations and recommendations are based on correct information.

Why Verification Matters: The accuracy of any calculation depends entirely on the quality of input data. A small error—such as a transposed number, misplaced decimal point, or unit confusion—can lead to significantly different results and potentially misguided decisions.

Step-by-Step Verification Process:
1. Cross-reference each value against your actual measurements or official records
2. Check for common errors like transposed digits (e.g., 175 vs 157)
3. Verify unit consistency (pounds vs kilograms, feet vs centimeters)
4. Compare with recent medical records, fitness apps, or financial documents

Taking Corrective Action: If you find any discrepancies, correct them immediately and recalculate. Document your verified values for future reference—this creates a reliable baseline for tracking progress and helps when consulting professionals.

Building Confidence: Once verified, you can proceed with complete confidence in your results. This small investment of time prevents confusion and misdirection later, making all your subsequent efforts more effective.`}
                        icon={Check}
                        color="from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
                        delay={0}
                      />
                      <DetailedActionCard
                        title="Set Up Your Progress Tracking System"
                        description={`Establishing a systematic approach to tracking progress is crucial for maintaining motivation and measuring improvement. This immediate action creates the infrastructure for sustained success.

The Science of Tracking: Research consistently demonstrates that people who track their progress are significantly more likely to achieve their goals. Tracking creates accountability, reveals patterns, and provides the objective data needed for informed adjustments.

Choosing Your Tracking Method: Select an approach that fits your lifestyle—whether a simple notebook, a detailed spreadsheet, or a specialized mobile app. The best system is one you'll use consistently. Consider factors like ease of entry, visualization capabilities, and ability to add contextual notes.

What to Record: At minimum, capture the date, your primary metrics from this calculation, and relevant contextual factors. For health metrics, you might also track related behaviors like exercise sessions, meals, or sleep quality. For financial calculations, note significant events or decisions.

Creating Reminders: Set up calendar alerts for regular recalculation. Health metrics might benefit from weekly or monthly reassessment, while financial calculations may warrant quarterly or annual review. Consistency in timing makes your data more comparable over time.`}
                        icon={Calendar}
                        color="from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
                        delay={1}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Medium-term Actions - 550+ words with infographic */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📅</span>
                  <div>
                    <h3 className="font-bold text-amber-600 text-lg">Medium-term Actions (1-3 months)</h3>
                    <p className="text-xs text-muted-foreground">Sustainable changes that build lasting improvement</p>
                  </div>
                </div>
                
                {/* Infographic */}
                <MediumTermInfographic />
                
                <div className="space-y-4 mt-4">
                  {mediumActions.length > 0 ? (
                    mediumActions.map((action: any, i: number) => (
                      <DetailedActionCard key={i} title={action.title} description={action.description} icon={TrendingUp} color="from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10" delay={i} />
                    ))
                  ) : (
                    <>
                      <DetailedActionCard
                        title="Build Sustainable Daily Habits"
                        description={`Creating lasting change requires establishing sustainable daily habits that support your goals. This comprehensive guide will help you develop and maintain habits that lead to meaningful improvement over the 1-3 month timeframe and beyond.

Understanding Habit Formation: Habits are automatic behaviors that require minimal conscious effort once established. Research suggests it takes an average of 66 days to form a new habit—perfectly aligning with the medium-term timeframe. By transforming desired actions into automatic behaviors, you free mental energy while still making progress.

The Habit Loop Framework: Every habit consists of three components working together:
• CUE (Trigger): The signal that initiates the behavior—could be a time, location, or preceding action
• ROUTINE (Behavior): The actual habit you want to establish
• REWARD (Benefit): The positive outcome that reinforces the behavior

Starting Small for Big Results: The most common mistake is attempting too much change at once. Begin with "micro-habits"—versions so small they seem almost trivial. Want to exercise more? Start with just 5 minutes daily. Want healthier eating? Begin by adding one serving of vegetables. These small wins build momentum and confidence for larger changes.

Habit Stacking Strategy: One of the most effective techniques is "stacking" new behaviors onto existing routines. Identify habits you already perform consistently—like brushing teeth or drinking morning coffee—and attach your new behavior immediately before or after. For example: "After I pour my morning coffee, I will review my goals for 5 minutes."

Environmental Design: Your surroundings profoundly influence behavior. Redesign your environment to make good habits easier and bad habits harder. Keep healthy options visible, prepare workout clothes the night before, remove distractions from your workspace.

Tracking and Accountability: Implement a tracking system—even a simple calendar where you mark completed days creates powerful motivation to maintain your streak. Consider finding an accountability partner who shares similar goals for mutual support and encouragement.

Overcoming Obstacles: Anticipate challenges and prepare responses in advance. What will you do when traveling? When sick? When motivation wanes? Having predetermined contingency plans prevents temporary setbacks from becoming permanent failures.`}
                        icon={Activity}
                        color="from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10"
                        delay={0}
                      />
                      <DetailedActionCard
                        title="Develop a Structured Improvement Plan"
                        description={`A well-structured improvement plan transforms vague intentions into concrete actions. This detailed guide will help you create a comprehensive roadmap for the next 1-3 months, maximizing your probability of achieving meaningful results.

Why Structure Matters: Without a structured plan, it's easy to drift through weeks without measurable progress. A clear plan provides direction, creates urgency, and enables objective success measurement. Think of it as a detailed map—you might occasionally detour, but you always know your destination and general route.

Setting SMART Goals: Build your plan around goals that are:
• Specific: Clearly defined outcomes, not vague intentions
• Measurable: Quantifiable metrics for tracking progress
• Achievable: Realistic given your resources and constraints
• Relevant: Aligned with your values and broader objectives
• Time-bound: Clear deadlines and milestones

Timeline Breakdown: Divide your 1-3 month period into weekly segments. For each week, identify specific actions and milestones. This granularity makes progress tangible and allows regular course corrections. Leave buffer time for unexpected challenges.

Resource Assessment: Identify everything you'll need:
• Time: Schedule specific blocks in your calendar
• Money: Budget for equipment, services, or professional guidance
• Knowledge: Research, courses, or expert consultation needed
• Support: Family, friends, or professional assistance

Leverage Points and the 80/20 Principle: Not all actions are equally impactful. Identify the 20% of activities that will produce 80% of your results. Focus your energy on these high-leverage areas while maintaining minimum viable effort on lower-priority items.

Checkpoint System: Schedule regular progress reviews—weekly self-assessments, bi-weekly measurements, or monthly comprehensive evaluations. At each checkpoint, evaluate progress, identify working strategies and obstacles, and adjust your approach accordingly.

Contingency Planning: Anticipate potential obstacles and develop backup strategies before you need them. What if illness interrupts your routine? What if work becomes overwhelming? What if you hit a plateau? Pre-planned responses prevent decision fatigue during challenging times.

Documentation Protocol: Decide what to track and how—daily logs, weekly summaries, progress photos, or measurement charts. The act of documentation reinforces commitment and provides valuable data for refining your approach over time.`}
                        icon={Target}
                        color="from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10"
                        delay={1}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Long-term Actions - 750+ words with infographic */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-blue-600 text-lg">Long-term Actions (6+ months)</h3>
                    <p className="text-xs text-muted-foreground">Strategic transformations for lasting excellence</p>
                  </div>
                </div>
                
                {/* Infographic */}
                <LongTermInfographic />
                
                <div className="space-y-4 mt-4">
                  {longActions.length > 0 ? (
                    longActions.map((action: any, i: number) => (
                      <DetailedActionCard key={i} title={action.title} description={action.description} icon={Flag} color="from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10" delay={i} />
                    ))
                  ) : (
                    <>
                      <DetailedActionCard
                        title="Transform Your Lifestyle for Sustainable Results"
                        description={`Achieving lasting results requires more than temporary changes—it demands fundamental lifestyle transformation. This comprehensive guide provides the framework for sustainable changes that will serve you for years to come.

THE TRANSFORMATION IMPERATIVE: Quick fixes and temporary measures might produce short-term results, but they rarely lead to lasting change. True transformation occurs when healthy, productive behaviors become so integrated into daily life that they require minimal conscious effort. This is the ultimate goal—making the right choice the easy choice.

UNDERSTANDING YOUR CURRENT LIFESTYLE: Before transforming, you must deeply understand your current patterns. Conduct a thorough audit of habits, routines, and choices. Track how you spend time for a full week. Note what you eat, how much you move, how you sleep, and how these factors relate to your results. This baseline reveals where transformation is most needed.

THE IDENTITY SHIFT: Lasting change often requires shifting your self-perception. Instead of "someone trying to improve," begin to see yourself as someone who embodies desired behaviors. An identity of "I am someone who prioritizes health" is more powerful than "I am trying to be healthier." This shift makes positive choices feel natural rather than forced.

ENVIRONMENTAL TRANSFORMATION: Your environment shapes behavior more than willpower ever could. Transform your physical surroundings to support goals:
• Reorganize your kitchen for healthy eating
• Set up a dedicated workout space
• Create a productive work environment
• Remove temptations and distractions
Your environment should make good choices convenient and poor choices inconvenient.

RELATIONSHIP ASSESSMENT AND CULTIVATION: The people around you profoundly influence behaviors and outcomes. Assess relationships in the context of your goals. Which support your transformation? Which might hinder it? Invest more deeply in supportive relationships and set appropriate boundaries with those who undermine progress. Seek communities of people who share your values and goals.

PROFESSIONAL SUPPORT INTEGRATION: For lasting transformation, integrate professional support into your lifestyle. This might include regular healthcare visits, ongoing coaching, professional organization memberships, or support group participation. Professionals provide expertise, accountability, and a safety net for challenging times.

FINANCIAL ALIGNMENT: Your financial choices should align with transformation goals. Review spending to identify support or hindrance patterns. Reallocate resources from unhealthy habits toward beneficial ones—quality food, gym memberships, professional services, or supportive equipment.

TIME MANAGEMENT REVOLUTION: Lasting change requires dedicated time. Audit current time use and identify reallocation opportunities. Reduce low-value activities (excessive screen time, etc.) to create space for high-value pursuits. Protect priority time fiercely—treat appointments with yourself as non-negotiable.

STRESS MANAGEMENT INTEGRATION: Chronic stress undermines virtually all progress. Integrate robust stress management into your lifestyle transformation—regular meditation, physical activities you enjoy, time in nature, creative pursuits, or meaningful social connections. Stress management isn't a luxury; it's essential for sustainable transformation.

SLEEP OPTIMIZATION: Sleep is foundational to virtually every aspect of health and performance. Make sleep optimization a cornerstone: create consistent schedules, develop wind-down routines, optimize your sleep environment, and prioritize sleep even when other demands compete.

CONTINUOUS LEARNING AND ADAPTATION: Commit to ongoing education related to your goals. The landscape of best practices evolves, and your needs change over time. Build learning into your lifestyle—through reading, courses, podcasts, or mentorship. This keeps your approach current and maintains engagement with your transformation journey.

MEASURING AND CELEBRATING PROGRESS: Establish meaningful tracking systems beyond simple metrics to include qualitative assessments of energy, mood, relationships, and overall life satisfaction. Regularly celebrate progress—both destination and journey. Recognition of how far you've come fuels motivation for the road ahead.`}
                        icon={Rocket}
                        color="from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10"
                        delay={0}
                      />
                      <DetailedActionCard
                        title="Build a Comprehensive Professional Support Network"
                        description={`Creating a robust professional support network is essential for achieving and maintaining optimal results over the long term. This guide helps you identify, engage, and maximize professional relationships that support your journey.

THE VALUE OF PROFESSIONAL SUPPORT: While self-directed efforts can produce results, professional support dramatically increases success probability. Professionals bring expertise from working with hundreds or thousands of individuals facing similar challenges. They identify blind spots, provide objective feedback, offer evidence-based strategies, and hold you accountable in ways self-guided efforts cannot match.

IDENTIFYING YOUR PROFESSIONAL NEEDS: The specific professionals you need depend on goals and circumstances. For health-related goals: primary care physicians, specialists, registered dietitians, physical therapists, personal trainers, mental health professionals. For financial goals: financial advisors, accountants, estate planning attorneys. For career or personal development: executive coaches, career counselors.

FINDING QUALIFIED PROFESSIONALS: Seek professionals with appropriate credentials, relevant experience, and philosophy aligning with your values and preferences. Ask trusted sources for recommendations, read reviews, and interview potential professionals before committing. The right professional relationship can be transformative; the wrong one frustrating and counterproductive.

BUILDING THE RELATIONSHIP: Professional relationships require investment to yield maximum value. Come prepared to appointments with questions, progress updates, and honest reporting of challenges. Be open to feedback and willing to discuss sensitive topics. The more your professional understands your complete situation, the better they can tailor advice.

COORDINATING CARE: When working with multiple professionals, coordination becomes essential. Ensure providers are aware of each other and have permission to communicate. Consider designating one professional as your primary coordinator who can integrate advice from various sources into a cohesive plan.

MAXIMIZING APPOINTMENT VALUE: Professional time is valuable and often expensive. Make the most of each interaction by preparing questions in advance, bringing relevant data and records, taking notes during appointments, and clarifying instructions before leaving. Follow up on recommendations and report outcomes at subsequent visits.

UNDERSTANDING COSTS AND INSURANCE: Professional support often involves significant costs. Understand your insurance coverage, out-of-pocket expenses, and payment options. Some professionals offer sliding scale fees or package pricing. Consider professional support an investment—prevention and optimization costs are typically far less than addressing problems after they develop.

COMMUNICATION PROTOCOLS: Clarify how and when to communicate between appointments. Many providers offer patient portals, email access, or phone consultations. Understanding these protocols prevents frustration and ensures you can get help when needed.

SELF-ADVOCACY: You are the expert on your own experience. Don't hesitate to advocate for your needs, ask questions, or seek second opinions when necessary. Good professionals welcome engaged, informed patients who take active roles in their care.

RECOGNIZING WHEN TO CHANGE: Not every professional relationship will be a good fit. Signs you might need to make a change include feeling unheard or dismissed, receiving advice conflicting with your values, or simply not seeing progress despite following recommendations. It's okay to seek different support if current arrangements aren't working.

INTEGRATING ADVICE INTO DAILY LIFE: Professional advice only works if implemented. Develop systems for translating recommendations into daily actions—calendars, reminders, accountability partners, or environmental cues. Review implementation regularly and discuss challenges at your next appointment.`}
                        icon={GraduationCap}
                        color="from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10"
                        delay={1}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </ResultSection>

          {/* 9. Step-by-Step Action Plan with Characters */}
          <ResultSection icon={MapPin} title="9. Step-by-Step Action Plan" highlight>
            <p className="text-sm text-muted-foreground mb-4">
              Our team of expert guides will walk you through each step. Each character brings unique expertise to help you succeed.
            </p>
            <div className="relative py-4">
              {detailedResults?.actionPlan?.length > 0 ? (
                detailedResults.actionPlan.map((step: any, i: number) => (
                  <CharacterRoadmapStep key={i} step={i + 1} title={step.title} description={step.description} character={characters[i % characters.length]} status={i === 0 ? 'current' : 'pending'} delay={i} />
                ))
              ) : (
                <>
                  <CharacterRoadmapStep step={1} title="Understand Your Result Deeply" description="Take time to fully comprehend what your result means for your specific situation. Review all sections of this report and identify how each piece applies to you." character={characters[0]} status="current" delay={0} />
                  <CharacterRoadmapStep step={2} title="Identify Priority Areas" description="Based on your result and recommendations, identify the top 3 areas for greatest impact. Focus initial efforts on these high-leverage areas." character={characters[1]} delay={1} />
                  <CharacterRoadmapStep step={3} title="Set Meaningful Goals" description="Transform priorities into specific, measurable goals with clear timelines. Write them down and create visual reminders." character={characters[2]} delay={2} />
                  <CharacterRoadmapStep step={4} title="Implement Consistent Actions" description="Begin taking daily actions aligned with your goals. Start small and build momentum—consistency beats intensity." character={characters[3]} delay={3} />
                  <CharacterRoadmapStep step={5} title="Track Progress Regularly" description="Establish a tracking system and review weekly. Note what's working and what needs adjustment." character={characters[4]} delay={4} />
                  <CharacterRoadmapStep step={6} title="Seek Expert Guidance" description="For complex decisions, consult qualified professionals. Their expertise can accelerate progress and prevent mistakes." character={characters[5]} delay={5} />
                </>
              )}
              
              {/* Finish */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="flex items-center gap-3 ml-12 mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Flag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">🎉 Goal Achieved!</p>
                  <p className="text-sm text-muted-foreground">You've completed all steps. Recalculate to see improved results!</p>
                </div>
              </motion.div>
            </div>
          </ResultSection>

          {/* 10. Charts */}
          <ResultSection icon={BarChart3} title="10. Visual Comparison & Charts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayCharts.map((chart: any, i: number) => (
                <div key={i} className="p-4 border rounded-xl bg-muted/20">
                  <p className="font-medium text-sm mb-2">{chart.title}</p>
                  <BarChart data={chart.data} height={150} />
                  <p className="text-xs text-muted-foreground mt-2">{chart.explanation}</p>
                </div>
              ))}
            </div>
          </ResultSection>

          {/* 11. Benchmarks */}
          <ResultSection icon={Target} title="11. Benchmark Comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benchmarkComparison?.length > 0 ? (
                benchmarkComparison.map((b: any, i: number) => (
                  <BenchmarkItem key={i} label={b.label} userValue={b.userValue} benchmark={b.benchmarkValue} unit={b.unit} status={b.status} />
                ))
              ) : (
                <>
                  <BenchmarkItem label="Compared to Ideal" userValue={mainValue} benchmark={mainValue * 0.9} status={mainValue >= mainValue * 0.9 ? 'better' : 'worse'} />
                  <BenchmarkItem label="Compared to Average" userValue={mainValue} benchmark={mainValue * 1.1} status={mainValue <= mainValue * 1.1 ? 'better' : 'worse'} />
                </>
              )}
            </div>
          </ResultSection>

          {/* 12. FAQs */}
          <ResultSection icon={HelpCircle} title="12. Frequently Asked Questions">
            <div className="space-y-2">
              {displayFAQs.map((faq: any, i: number) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </ResultSection>

          {/* 13. SUMMARY INSIGHT - 650+ words with character infographic */}
          <ResultSection icon={Sparkles} title="13. Comprehensive Summary & Insights" highlight>
            <div className="space-y-6">
              {/* Character Infographic */}
              <SummaryInfographic />
              
              {/* Summary Content */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="text-sm leading-relaxed space-y-4">
                  <h3 className="text-lg font-bold text-primary">Executive Overview</h3>
                  <p>
                    Your {calculatorName} calculation has been completed successfully, yielding a result of {results[0]?.value} {results[0]?.unit || ''}. This comprehensive analysis provides actionable insights, detailed explanations, and a clear roadmap for improvement based on your specific inputs and circumstances. Our team of expert guides—Alex, Sam, Jordan, Taylor, Morgan, and Casey—have collaborated to bring you personalized guidance at every step.
                  </p>
                  
                  <h3 className="text-lg font-bold text-primary">Understanding Your Result</h3>
                  <p>
                    The value of {results[0]?.value} represents your current position within the context of this calculation. This figure has been derived using industry-standard formulas and methodologies, taking into account all the input parameters you provided: {Object.entries(inputs).map(([k, v]) => `${k} (${v})`).join(', ')}. Each input plays a specific role in determining the outcome, and understanding the relationship between these inputs and your result is crucial for making informed decisions about potential improvements.
                  </p>
                  
                  <h3 className="text-lg font-bold text-primary">What Your Team of Guides Recommends</h3>
                  <p>
                    <strong>Alex (The Analyzer)</strong> has reviewed your data and identified key patterns. Understanding is the foundation of improvement—take time to review each metric and its implications. <strong>Sam (The Strategist)</strong> recommends focusing on the highest-impact areas first. Strategy beats effort when direction is clear. <strong>Jordan (The Optimizer)</strong> suggests implementing small daily changes that compound over time. Every action, no matter how small, moves you toward your goal.
                  </p>
                  <p>
                    <strong>Taylor (The Tracker)</strong> emphasizes the importance of monitoring progress. What gets measured gets managed—establish your tracking system today. <strong>Morgan (The Achiever)</strong> reminds you that consistency is the key to success. Celebrate every milestone and maintain your momentum. <strong>Casey (The Expert)</strong> advises seeking professional guidance when needed. Expert knowledge accelerates progress and prevents costly mistakes.
                  </p>
                  
                  <h3 className="text-lg font-bold text-primary">Key Findings and Practical Implications</h3>
                  <p>
                    {detailedResults?.meaning || 'Your result provides valuable insights that can guide your decision-making process. By understanding what this result means in practical terms, you can take appropriate action to optimize your situation.'}
                  </p>
                  <p>
                    Based on your calculation, several key findings emerge: Your current status places you in a specific category that helps identify where you stand. There is clear potential for improvement in specific areas. Understanding your result helps identify any areas that may require immediate attention. Setting specific targets helps maintain motivation and track progress over time.
                  </p>
                  
                  <h3 className="text-lg font-bold text-primary">Your Path Forward</h3>
                  <p>
                    Throughout this analysis, we have provided detailed recommendations across three timeframes: Immediate Actions you can implement today, Medium-term Actions for sustainable changes over 1-3 months, and Long-term Actions for lasting transformation over 6+ months. Following these recommendations systematically will help you achieve optimal results. Remember that consistency is key—small incremental improvements often lead to significant long-term gains.
                  </p>
                  
                  <h3 className="text-lg font-bold text-primary">Final Thoughts</h3>
                  <p>
                    This comprehensive analysis provides you with a detailed understanding of your result and actionable steps for improvement. The combination of quantitative analysis and qualitative recommendations gives you a complete picture of your current situation and a clear path forward. Remember that this calculation is just one tool in your decision-making toolkit. For important decisions, especially those related to health or finance, consulting with qualified professionals is always recommended. We encourage you to use this calculator periodically to track your progress and adjust your approach as needed. Consistent monitoring and adjustment are key to achieving your desired outcomes.
                  </p>
                </div>
              </div>
            </div>
          </ResultSection>

          {/* Disclaimer */}
          <div className="p-4 bg-muted/30 rounded-xl border text-center">
            <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {detailedResults?.disclaimer || 'This calculator is for informational purposes only and should not replace professional advice.'}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => router.push('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Calculate Another
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
