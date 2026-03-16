'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, ChevronRight, Flame, Beef, Wheat, Apple, Carrot,
  Milk, Nut, Leaf, Drumstick, Coffee, Cookie, Utensils,
  Heart, AlertTriangle, Info, Check, TrendingUp, Target,
  BarChart3, PieChart as PieChartIcon, Activity, Zap, Award,
  FileText, ClipboardList, Clock, Thermometer, Shield, Package,
  ArrowRight, ArrowDown, Play, Pause, Settings, Users, Wrench,
  AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Workflow
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  foodDatabase, foodCategories, dailyValues, FoodItem, getFoodSOP
} from '@/lib/food-database'
import { CommercialSOP, FlowchartNode } from '@/lib/food-sop'
import dynamic from 'next/dynamic'

// Dynamic import for SEO Article to avoid SSR issues with JSON-LD
const SEOArticleDisplay = dynamic(() => import('./SEOArticleDisplay'), { ssr: false })

// Local helper functions (to avoid Turbopack cache issues)
function searchFoods(query: string): FoodItem[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return foodDatabase
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery) ||
    food.healthBenefits.some(b => b.toLowerCase().includes(lowerQuery))
  )
}

function getFoodsByCategory(category: string): FoodItem[] {
  return foodDatabase.filter(food => food.category === category)
}

// Get count of foods per category
function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  foodDatabase.forEach(food => {
    counts[food.category] = (counts[food.category] || 0) + 1
  })
  return counts
}

function calculateDV(value: number, dailyValue: number): number {
  if (!dailyValue || dailyValue === 0) return 0
  return Math.round((value / dailyValue) * 100)
}

// Icons for nutrients
const nutrientIcons: Record<string, React.ElementType> = {
  calories: Flame,
  protein: Beef,
  carbohydrates: Wheat,
  fat: Milk,
  fiber: Leaf,
  sugar: Apple
}

// Circular Progress Ring Component
function CircularProgressRing({ value, max, size = 120, strokeWidth = 12, color = '#6366f1', label, unit }: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  color?: string
  label: string
  unit?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = Math.min((value / max) * 100, 100)
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(229, 231, 235, 0.3)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{value.toFixed(1)}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  )
}

// Nutrition Summary Card
function NutritionSummaryCard({ icon: Icon, label, value, unit, dailyValue, color, percentage }: {
  icon: React.ElementType
  label: string
  value: number
  unit: string
  dailyValue?: number
  color: string
  percentage?: number
}) {
  const dvPercent = percentage ?? (dailyValue ? calculateDV(value, dailyValue) : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-bold">
            {value.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
          </p>
        </div>
      </div>
      {dailyValue && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">% Daily Value</span>
            <span className="font-medium">{dvPercent}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(dvPercent, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Macronutrient Pie Chart
function MacroPieChart({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  const total = protein + carbs + fat
  const data = [
    { label: 'Protein', value: protein, color: '#ef4444', percentage: (protein / total) * 100 },
    { label: 'Carbs', value: carbs, color: '#22c55e', percentage: (carbs / total) * 100 },
    { label: 'Fat', value: fat, color: '#f59e0b', percentage: (fat / total) * 100 }
  ]

  const size = 200
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 30

  let currentAngle = -90

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="drop-shadow-lg">
        {data.map((item, index) => {
          const angle = (item.value / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          currentAngle = endAngle

          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          const x1 = centerX + radius * Math.cos(startRad)
          const y1 = centerY + radius * Math.sin(startRad)
          const x2 = centerX + radius * Math.cos(endRad)
          const y2 = centerY + radius * Math.sin(endRad)
          const largeArc = angle > 180 ? 1 : 0

          return (
            <motion.path
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="flex gap-4 flex-wrap justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">{item.label}: {item.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Vitamin Bar Chart
function NutrientBarChart({ title, nutrients, dailyVals }: {
  title: string
  nutrients: { name: string; value: number; dvKey: keyof typeof dailyValues }[]
  dailyVals: typeof dailyValues
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm">{title}</h4>
      <div className="space-y-2">
        {nutrients.map((nutrient, i) => {
          const dvPercent = calculateDV(nutrient.value, dailyVals[nutrient.dvKey])
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{nutrient.name}</span>
                <span className="text-muted-foreground">
                  {nutrient.value.toFixed(2)} ({dvPercent}% DV)
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(dvPercent, 100)}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Health Score Gauge
function HealthScoreGauge({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return '#22c55e'
    if (s >= 60) return '#84cc16'
    if (s >= 40) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Very Healthy'
    if (s >= 60) return 'Healthy'
    if (s >= 40) return 'Moderate'
    return 'Less Healthy'
  }

  const color = getScoreColor(score)
  const percentage = score

  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width="180" height="100" viewBox="0 0 180 100">
          {/* Background arc */}
          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="rgba(229, 231, 235, 0.5)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Colored arc */}
          <motion.path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>
      <Badge
        className="mt-2"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {getScoreLabel(score)}
      </Badge>
    </div>
  )
}

// Food Comparison Tool
function FoodComparison({ food1, food2, onClose }: {
  food1: FoodItem
  food2: FoodItem
  onClose: () => void
}) {
  const nutrients = [
    { key: 'calories', label: 'Calories', unit: 'kcal' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbohydrates', label: 'Carbs', unit: 'g' },
    { key: 'totalFat', label: 'Fat', unit: 'g' },
    { key: 'fiber', label: 'Fiber', unit: 'g' },
    { key: 'sugar', label: 'Sugar', unit: 'g' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Food Comparison</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
          <p className="font-semibold">{food1.name}</p>
          <p className="text-sm text-muted-foreground">per 100g</p>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground">vs</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
          <p className="font-semibold">{food2.name}</p>
          <p className="text-sm text-muted-foreground">per 100g</p>
        </div>
      </div>

      <div className="space-y-4">
        {nutrients.map(nutrient => {
          const val1 = food1[nutrient.key]
          const val2 = food2[nutrient.key]
          const max = Math.max(val1, val2, 1)
          const diff = val1 - val2

          return (
            <div key={nutrient.key} className="space-y-2">
              <p className="text-sm font-medium text-center">{nutrient.label}</p>
              <div className="flex items-center gap-2">
                <span className="w-16 text-right text-sm">{val1.toFixed(1)}</span>
                <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(val1 / max) * 50}%` }}
                    className="absolute left-0 top-0 h-full bg-violet-500 rounded-l-full"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(val2 / max) * 50}%` }}
                    className="absolute right-0 top-0 h-full bg-pink-500 rounded-r-full"
                  />
                </div>
                <span className="w-16 text-sm">{val2.toFixed(1)}</span>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {diff > 0 ? `${food1.name} has ${diff.toFixed(1)}${nutrient.unit} more` :
                 diff < 0 ? `${food2.name} has ${Math.abs(diff).toFixed(1)}${nutrient.unit} more` :
                 'Equal amount'}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-sm text-muted-foreground">Health Score</p>
          <p className="text-2xl font-bold text-violet-600">{food1.healthScore}</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-sm text-muted-foreground">Health Score</p>
          <p className="text-2xl font-bold text-pink-600">{food2.healthScore}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Flowchart Visualizer Component
function FlowchartVisualizer({ nodes }: { nodes: FlowchartNode[] }) {
  const getNodeStyle = (type: string): string => {
    switch (type) {
      case 'start':
        return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300'
      case 'end':
        return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
      case 'decision':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 text-yellow-700 dark:text-yellow-300 transform rotate-0'
      case 'quality':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300'
      case 'storage':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-400 text-gray-700 dark:text-gray-300'
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start': return <Play className="h-4 w-4" />
      case 'end': return <Pause className="h-4 w-4" />
      case 'decision': return <ChevronDown className="h-4 w-4" />
      case 'quality': return <CheckCircle2 className="h-4 w-4" />
      case 'storage': return <Package className="h-4 w-4" />
      default: return <ArrowRight className="h-4 w-4" />
    }
  }

  return (
    <div className="relative overflow-x-auto pb-4">
      <div className="flex flex-col items-center gap-2 min-w-max">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1
          const hasBranch = node.branch && !isLast
          
          return (
            <div key={node.id} className="flex flex-col items-center">
              {/* Connection line from previous node */}
              {index > 0 && !hasBranch && (
                <div className="h-4 w-0.5 bg-gray-300 dark:bg-gray-600" />
              )}
              
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative px-4 py-2 rounded-lg border-2 min-w-[140px] text-center ${getNodeStyle(node.type)}`}
              >
                <div className="flex items-center justify-center gap-2">
                  {getNodeIcon(node.type)}
                  <span className="text-sm font-medium">{node.label}</span>
                </div>
                {node.description && (
                  <p className="text-xs mt-1 opacity-75 max-w-[200px]">{node.description}</p>
                )}
              </motion.div>

              {/* Branch for decision nodes */}
              {hasBranch && node.branch && (
                <div className="flex items-start gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-0.5 bg-gray-300 dark:bg-gray-600" />
                    <span className="text-xs text-green-600 font-medium">Yes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-0.5 bg-gray-300 dark:bg-gray-600" />
                    <span className="text-xs text-red-600 font-medium">No</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// SOP Step Card Component
function SOPStepCard({ step, index }: { step: NonNullable<CommercialSOP['steps']>[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm overflow-hidden"
    >
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {step.step}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{step.title}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {step.duration && (
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.duration}
                </Badge>
              )}
              {step.temperature && (
                <Badge variant="outline" className="text-xs">
                  <Thermometer className="h-3 w-3 mr-1" />
                  {step.temperature}
                </Badge>
              )}
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 border-t pt-4">
              <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

              {step.equipment && step.equipment.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    Equipment
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {step.equipment.map((eq, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{eq}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {step.criticalPoints && step.criticalPoints.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-semibold uppercase text-amber-600 mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Critical Points
                  </h5>
                  <ul className="space-y-1">
                    {step.criticalPoints.map((point, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.safetyNotes && step.safetyNotes.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold uppercase text-red-600 mb-2 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Safety Notes
                  </h5>
                  <ul className="space-y-1">
                    {step.safetyNotes.map((note, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-red-500">⚠</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// SOP Display Component
function SOPDisplay({ sop }: { sop: CommercialSOP }) {
  const [activeSection, setActiveSection] = useState<'steps' | 'flowchart' | 'qc' | 'storage' | 'safety'>('steps')

  return (
    <div className="space-y-6">
      {/* SOP Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8" />
            <div>
              <h3 className="text-lg font-bold">{sop.title}</h3>
              <p className="text-sm opacity-90">{sop.purpose}</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Scope
              </h4>
              <p className="text-xs">{sop.scope}</p>
            </div>
            <div>
              <h4 className="font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Responsibility
              </h4>
              <div className="flex flex-wrap gap-1">
                {sop.responsibility.map((r, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{r}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Materials
              </h4>
              <div className="flex flex-wrap gap-1">
                {sop.materials.slice(0, 4).map((m, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{m}</Badge>
                ))}
                {sop.materials.length > 4 && (
                  <Badge variant="secondary" className="text-xs">+{sop.materials.length - 4} more</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'steps', label: 'Procedure Steps', icon: ClipboardList },
          { id: 'flowchart', label: 'Flowchart', icon: Workflow },
          { id: 'qc', label: 'Quality Control', icon: CheckCircle2 },
          { id: 'storage', label: 'Storage', icon: Package },
          { id: 'safety', label: 'Safety', icon: Shield },
        ].map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection(section.id as typeof activeSection)}
            className="gap-2"
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </Button>
        ))}
      </div>

      {/* Steps Section */}
      {activeSection === 'steps' && (
        <div className="space-y-3">
          {sop.steps.map((step, index) => (
            <SOPStepCard key={step.step} step={step} index={index} />
          ))}
        </div>
      )}

      {/* Flowchart Section */}
      {activeSection === 'flowchart' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              Process Flowchart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FlowchartVisualizer nodes={sop.flowchart} />
            
            {/* Legend */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Legend</h4>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500" />
                  <span>Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-400" />
                  <span>Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-500" />
                  <span>Decision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-500" />
                  <span>Quality Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500" />
                  <span>Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-500" />
                  <span>End</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quality Control Section */}
      {activeSection === 'qc' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-500" />
                Checkpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sop.qualityControl.checkpoints.map((cp, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    {cp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sop.qualityControl.standards.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Corrective Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sop.qualityControl.correctiveActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Storage Section */}
      {activeSection === 'storage' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Storage Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Thermometer className="h-5 w-5 text-blue-500 mb-2" />
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold">{sop.storage.temperature}</p>
              </div>
              {sop.storage.humidity && (
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <Activity className="h-5 w-5 text-cyan-500 mb-2" />
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{sop.storage.humidity}</p>
                </div>
              )}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-green-500 mb-2" />
                <p className="text-xs text-muted-foreground">Shelf Life</p>
                <p className="font-semibold text-sm">{sop.storage.shelfLife}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Package className="h-5 w-5 text-purple-500 mb-2" />
                <p className="text-xs text-muted-foreground">Packaging</p>
                <p className="font-semibold text-sm">{sop.storage.packaging}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Section */}
      {activeSection === 'safety' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Hazards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sop.safety.hazards.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sop.safety.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Personal Protective Equipment (PPE)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sop.safety.ppe.map((p, i) => (
                  <Badge key={i} variant="outline" className="py-1.5 px-3">
                    <Shield className="h-3 w-3 mr-1" />
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Main Food Nutrition Analyzer Component
export default function FoodNutritionAnalyzer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareFood, setCompareFood] = useState<FoodItem | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Filter foods based on search and category
  const filteredFoods = useMemo(() => {
    if (searchQuery.trim()) {
      return searchFoods(searchQuery)
    }
    if (selectedCategory) {
      return getFoodsByCategory(selectedCategory)
    }
    return foodDatabase // Show all foods by default
  }, [searchQuery, selectedCategory])

  // Get category counts
  const categoryCounts = useMemo(() => getCategoryCounts(), [])

  const handleSelectFood = (food: FoodItem) => {
    if (compareMode && compareFood && compareFood.id !== food.id) {
      // Already have a food to compare, show comparison
      setSelectedFood(food)
    } else if (compareMode) {
      setCompareFood(food)
      setSelectedFood(null)
    } else {
      setSelectedFood(food)
    }
  }

  const startCompare = (food: FoodItem) => {
    setCompareMode(true)
    setCompareFood(food)
    setSelectedFood(null)
  }

  // If we have two foods to compare
  if (compareMode && compareFood && selectedFood) {
    return (
      <div className="space-y-4">
        <FoodComparison
          food1={compareFood}
          food2={selectedFood}
          onClose={() => {
            setCompareMode(false)
            setCompareFood(null)
            setSelectedFood(null)
          }}
        />
      </div>
    )
  }

  // If a food is selected, show detailed view
  if (selectedFood) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedFood(null)}>
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Back
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{selectedFood.name}</h2>
            <p className="text-sm text-muted-foreground">
              {foodCategories.find(c => c.id === selectedFood.category)?.name} • Per 100g
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => startCompare(selectedFood)}
          >
            Compare
          </Button>
        </div>

        {/* Health Score */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <HealthScoreGauge score={selectedFood.healthScore} />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">Nutrition Quality Score</h3>
                <p className="text-sm text-muted-foreground">
                  This score is calculated based on nutrient density, presence of beneficial nutrients,
                  and overall health impact. Higher scores indicate more nutritious options.
                </p>
                {selectedFood.servingSize && (
                  <p className="text-sm"><strong>Serving Size:</strong> {selectedFood.servingSize}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NutritionSummaryCard
            icon={Flame}
            label="Calories"
            value={selectedFood.calories}
            unit="kcal"
            dailyValue={dailyValues.calories}
            color="#ef4444"
          />
          <NutritionSummaryCard
            icon={Beef}
            label="Protein"
            value={selectedFood.protein}
            unit="g"
            dailyValue={dailyValues.protein}
            color="#6366f1"
          />
          <NutritionSummaryCard
            icon={Wheat}
            label="Carbs"
            value={selectedFood.carbohydrates}
            unit="g"
            dailyValue={dailyValues.carbohydrates}
            color="#22c55e"
          />
          <NutritionSummaryCard
            icon={Milk}
            label="Fat"
            value={selectedFood.totalFat}
            unit="g"
            dailyValue={dailyValues.totalFat}
            color="#f59e0b"
          />
          <NutritionSummaryCard
            icon={Leaf}
            label="Fiber"
            value={selectedFood.fiber}
            unit="g"
            dailyValue={dailyValues.fiber}
            color="#10b981"
          />
          <NutritionSummaryCard
            icon={Apple}
            label="Sugar"
            value={selectedFood.sugar}
            unit="g"
            color="#ec4899"
          />
        </div>

        {/* Macronutrient Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Macronutrient Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex justify-center">
                <MacroPieChart
                  protein={selectedFood.protein * 4}
                  carbs={selectedFood.carbohydrates * 4}
                  fat={selectedFood.totalFat * 9}
                />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <CircularProgressRing
                  value={selectedFood.protein}
                  max={dailyValues.protein}
                  color="#ef4444"
                  label="Protein"
                  unit="g"
                />
                <CircularProgressRing
                  value={selectedFood.carbohydrates}
                  max={dailyValues.carbohydrates}
                  color="#22c55e"
                  label="Carbs"
                  unit="g"
                />
                <CircularProgressRing
                  value={selectedFood.totalFat}
                  max={dailyValues.totalFat}
                  color="#f59e0b"
                  label="Fat"
                  unit="g"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed info */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="macros">Macros</TabsTrigger>
            <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
            <TabsTrigger value="minerals">Minerals</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="sop">Commercial SOP</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Detailed Nutrition Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complete Nutrition Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Basic Nutrition</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span>Calories</span><span>{selectedFood.calories} kcal</span></div>
                      <div className="flex justify-between"><span>Protein</span><span>{selectedFood.protein} g</span></div>
                      <div className="flex justify-between"><span>Carbohydrates</span><span>{selectedFood.carbohydrates} g</span></div>
                      <div className="flex justify-between"><span>Sugar</span><span>{selectedFood.sugar} g</span></div>
                      <div className="flex justify-between"><span>Fiber</span><span>{selectedFood.fiber} g</span></div>
                      <div className="flex justify-between"><span>Total Fat</span><span>{selectedFood.totalFat} g</span></div>
                      <div className="flex justify-between"><span>Saturated Fat</span><span>{selectedFood.saturatedFat} g</span></div>
                      <div className="flex justify-between"><span>Cholesterol</span><span>{selectedFood.cholesterol} mg</span></div>
                      <div className="flex justify-between"><span>Water</span><span>{selectedFood.water} g</span></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Vitamins</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span>Vitamin A</span><span>{selectedFood.vitaminA} mcg</span></div>
                      <div className="flex justify-between"><span>Vitamin C</span><span>{selectedFood.vitaminC} mg</span></div>
                      <div className="flex justify-between"><span>Vitamin D</span><span>{selectedFood.vitaminD} mcg</span></div>
                      <div className="flex justify-between"><span>Vitamin E</span><span>{selectedFood.vitaminE} mg</span></div>
                      <div className="flex justify-between"><span>Vitamin K</span><span>{selectedFood.vitaminK} mcg</span></div>
                      <div className="flex justify-between"><span>Vitamin B12</span><span>{selectedFood.vitaminB12} mcg</span></div>
                      <div className="flex justify-between"><span>Folate</span><span>{selectedFood.folate} mcg</span></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Minerals</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span>Calcium</span><span>{selectedFood.calcium} mg</span></div>
                      <div className="flex justify-between"><span>Iron</span><span>{selectedFood.iron} mg</span></div>
                      <div className="flex justify-between"><span>Magnesium</span><span>{selectedFood.magnesium} mg</span></div>
                      <div className="flex justify-between"><span>Potassium</span><span>{selectedFood.potassium} mg</span></div>
                      <div className="flex justify-between"><span>Sodium</span><span>{selectedFood.sodium} mg</span></div>
                      <div className="flex justify-between"><span>Zinc</span><span>{selectedFood.zinc} mg</span></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Other Nutrients</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span>Phosphorus</span><span>{selectedFood.phosphorus} mg</span></div>
                      <div className="flex justify-between"><span>Copper</span><span>{selectedFood.copper} mg</span></div>
                      <div className="flex justify-between"><span>Selenium</span><span>{selectedFood.selenium} mcg</span></div>
                      <div className="flex justify-between"><span>Manganese</span><span>{selectedFood.manganese} mg</span></div>
                      <div className="flex justify-between"><span>Vitamin B6</span><span>{selectedFood.vitaminB6} mg</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="macros" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Macro Breakdown</h4>
                    <NutrientBarChart
                      title="Macronutrients"
                      nutrients={[
                        { name: 'Protein', value: selectedFood.protein, dvKey: 'protein' },
                        { name: 'Total Carbs', value: selectedFood.carbohydrates, dvKey: 'carbohydrates' },
                        { name: 'Dietary Fiber', value: selectedFood.fiber, dvKey: 'fiber' },
                        { name: 'Total Fat', value: selectedFood.totalFat, dvKey: 'totalFat' },
                        { name: 'Saturated Fat', value: selectedFood.saturatedFat, dvKey: 'saturatedFat' },
                      ]}
                      dailyVals={dailyValues}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <MacroPieChart
                      protein={selectedFood.protein * 4}
                      carbs={selectedFood.carbohydrates * 4}
                      fat={selectedFood.totalFat * 9}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitamins" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <NutrientBarChart
                  title="Vitamin Content (% Daily Value)"
                  nutrients={[
                    { name: 'Vitamin A', value: selectedFood.vitaminA, dvKey: 'vitaminA' },
                    { name: 'Vitamin B1 (Thiamine)', value: selectedFood.vitaminB1, dvKey: 'vitaminB1' },
                    { name: 'Vitamin B2 (Riboflavin)', value: selectedFood.vitaminB2, dvKey: 'vitaminB2' },
                    { name: 'Vitamin B3 (Niacin)', value: selectedFood.vitaminB3, dvKey: 'vitaminB3' },
                    { name: 'Vitamin B6', value: selectedFood.vitaminB6, dvKey: 'vitaminB6' },
                    { name: 'Vitamin B12', value: selectedFood.vitaminB12, dvKey: 'vitaminB12' },
                    { name: 'Vitamin C', value: selectedFood.vitaminC, dvKey: 'vitaminC' },
                    { name: 'Vitamin D', value: selectedFood.vitaminD, dvKey: 'vitaminD' },
                    { name: 'Vitamin E', value: selectedFood.vitaminE, dvKey: 'vitaminE' },
                    { name: 'Vitamin K', value: selectedFood.vitaminK, dvKey: 'vitaminK' },
                    { name: 'Folate', value: selectedFood.folate, dvKey: 'folate' },
                  ]}
                  dailyVals={dailyValues}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minerals" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <NutrientBarChart
                  title="Mineral Content (% Daily Value)"
                  nutrients={[
                    { name: 'Calcium', value: selectedFood.calcium, dvKey: 'calcium' },
                    { name: 'Iron', value: selectedFood.iron, dvKey: 'iron' },
                    { name: 'Magnesium', value: selectedFood.magnesium, dvKey: 'magnesium' },
                    { name: 'Phosphorus', value: selectedFood.phosphorus, dvKey: 'phosphorus' },
                    { name: 'Potassium', value: selectedFood.potassium, dvKey: 'potassium' },
                    { name: 'Sodium', value: selectedFood.sodium, dvKey: 'sodium' },
                    { name: 'Zinc', value: selectedFood.zinc, dvKey: 'zinc' },
                    { name: 'Copper', value: selectedFood.copper, dvKey: 'copper' },
                    { name: 'Selenium', value: selectedFood.selenium, dvKey: 'selenium' },
                    { name: 'Manganese', value: selectedFood.manganese, dvKey: 'manganese' },
                  ]}
                  dailyVals={dailyValues}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  Health Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedFood.healthBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {selectedFood.healthRisks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Things to Consider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedFood.healthRisks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Recommended Serving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedFood.recommendedServing}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sop" className="mt-4">
            <SOPDisplay sop={getFoodSOP(selectedFood)} />
          </TabsContent>
        </Tabs>
      </motion.div>
    )
  }

  // Main food browser view
  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Food & Nutrition Database</h2>
          <p className="text-sm text-muted-foreground">
            {foodDatabase.length} foods across {foodCategories.length} categories
          </p>
        </div>
        {selectedCategory && (
          <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
            <X className="h-4 w-4 mr-1" />
            Clear Filter
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for any food (apple, banana, chicken, rice...)"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setSelectedCategory(null)
          }}
          className="pl-10 h-12 text-lg"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="gap-1"
        >
          <span>All</span>
          <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
            {foodDatabase.length}
          </Badge>
        </Button>
        {foodCategories.map((cat) => {
          const count = categoryCounts[cat.id] || 0
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-1"
              style={selectedCategory === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.name}</span>
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {count}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredFoods.length} food{filteredFoods.length !== 1 ? 's' : ''}
          {selectedCategory && ` in ${foodCategories.find(c => c.id === selectedCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
      </div>

      {/* Compare Mode Banner */}
      {compareMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Comparing: <span className="text-violet-600">{compareFood?.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">Select another food to compare</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCompareMode(false)}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Food Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(index * 0.01, 0.5) }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                onClick={() => handleSelectFood(food)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${foodCategories.find(c => c.id === food.category)?.color}20` }}
                    >
                      {foodCategories.find(c => c.id === food.category)?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{food.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {food.category}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                      <p className="text-muted-foreground">Calories</p>
                      <p className="font-bold">{food.calories}</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                      <p className="text-muted-foreground">Protein</p>
                      <p className="font-bold">{food.protein}g</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Score: {food.healthScore}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: food.healthScore >= 80 ? '#22c55e' :
                            food.healthScore >= 60 ? '#84cc16' :
                            food.healthScore >= 40 ? '#f59e0b' : '#ef4444'
                        }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {food.healthScore >= 80 ? 'Very Healthy' :
                          food.healthScore >= 60 ? 'Healthy' :
                          food.healthScore >= 40 ? 'Moderate' : 'Indulgent'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No foods found</p>
          <p className="text-sm text-muted-foreground">Try a different search term</p>
        </div>
      )}

      {/* SEO Article Section - Shows for main categories */}
      {selectedCategory && ['fruits', 'vegetables', 'dairy', 'nonveg', 'cereals', 'pulses'].includes(selectedCategory) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: `${foodCategories.find(c => c.id === selectedCategory)?.color}20` }}
            >
              {foodCategories.find(c => c.id === selectedCategory)?.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {foodCategories.find(c => c.id === selectedCategory)?.name} Guide
              </h2>
              <p className="text-sm text-muted-foreground">
                Complete nutrition information, health benefits, and expert tips
              </p>
            </div>
          </div>
          <SEOArticleDisplay categoryId={selectedCategory} />
        </motion.div>
      )}
    </div>
  )
}
