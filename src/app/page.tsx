'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, Heart, DollarSign, Calendar, Wrench,
  X, Check, PieChart as PieChartIcon, TrendingUp, Clock,
  Ruler, Weight, Activity, Brain,
  Sparkles, Search, Menu, ArrowRight, Percent,
  Zap, Target, Award, BarChart3, Hash, Square,
  Timer, Globe, FileText, Shield, Moon, Sun, Droplets, Wind,
  Home, Car, CreditCard, PiggyBank, Landmark, Wallet, Receipt,
  TrendingDown, Coins, ChevronRight, Star, Info, AlertCircle, Divide,
  Palette, HardDrive, Utensils, Apple, Flame, Beef, Wheat, Carrot,
  Milk, Nut, Leaf, Drumstick, Coffee, Cookie
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import dynamic from 'next/dynamic'

// Dynamic import for Food Nutrition Analyzer
const FoodNutritionAnalyzer = dynamic(() => import('@/components/FoodNutritionAnalyzer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
    </div>
  )
})

// Dynamic import for Calculator SEO Article
const CalculatorSEOArticle = dynamic(() => import('@/components/CalculatorSEOArticle'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
    </div>
  )
})

// Dynamic import for Pricing Section
const PricingSection = dynamic(() => import('@/components/PricingSection'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
    </div>
  )
})

// Dynamic import for Footer
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-slate-900 animate-pulse"></div>
  )
})

// Custom Icons
const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
)

const ThermometerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
  </svg>
)

const PaletteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const HardDriveIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="12" x2="2" y2="12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
)

// 3D Pie Chart
const PieChart3D = ({ data, size = 180 }: { data: { label: string; value: number; color: string }[]; size?: number }) => {
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0.1), 0)
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 20
  
  const segments = data.reduce<{ startAngle: number; endAngle: number; color: string; label: string; value: number; percentage: number }[]>((acc, item, index) => {
    const prevEnd = index === 0 ? -90 : acc[index - 1].endAngle
    const angle = (Math.max(item.value, 0.1) / total) * 360
    const percentage = (Math.max(item.value, 0.1) / total) * 100
    acc.push({ startAngle: prevEnd, endAngle: prevEnd + angle, color: item.color, label: item.label, value: item.value, percentage })
    return acc
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute top-1 left-1 opacity-20 blur-sm">
          {segments.map((segment, index) => {
            const startRad = (segment.startAngle * Math.PI) / 180
            const endRad = (segment.endAngle * Math.PI) / 180
            const x1 = centerX + radius * Math.cos(startRad)
            const y1 = centerY + radius * Math.sin(startRad)
            const x2 = centerX + radius * Math.cos(endRad)
            const y2 = centerY + radius * Math.sin(endRad)
            const largeArc = (segment.endAngle - segment.startAngle) > 180 ? 1 : 0
            return <path key={index} d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={segment.color} />
          })}
        </svg>
        <svg width={size} height={size} className="relative z-10 drop-shadow-lg">
          <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
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
            const angle = segment.endAngle - segment.startAngle
            return (
              <g key={index}>
                <path d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={segment.color} stroke="white" strokeWidth="2" filter="url(#glow)" />
                {angle > 25 && <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="bold">{segment.percentage.toFixed(0)}%</text>}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.value.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Comparison Bar
const ComparisonBar = ({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit?: string }) => {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value.toFixed(1)}{unit}</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

// Result Display
const ResultDisplay = ({ label, value, unit, highlight, description, icon: Icon }: { label: string; value: string | number; unit?: string; highlight?: boolean; description?: string; icon?: React.ElementType }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${highlight ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-lg' : 'bg-muted/50 border'}`}>
    <div className="flex items-center gap-2 mb-1">
      {Icon && <Icon className={`h-4 w-4 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
    <p className={`text-2xl font-bold ${highlight ? 'text-primary' : ''}`}>
      {value} {unit && <span className="text-sm font-normal text-muted-foreground">{unit}</span>}
    </p>
    {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
  </motion.div>
)

// Formula Display
const FormulaDisplay = ({ formula, explanation, steps }: { formula: string; explanation: string; steps?: string[] }) => (
  <div className="bg-gradient-to-br from-muted to-muted/50 p-4 rounded-xl border shadow-inner">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <Hash className="h-3 w-3 text-primary" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground">Formula Used</p>
    </div>
    <code className="text-sm font-mono block bg-background/80 px-3 py-2 rounded-lg border mb-3">{formula}</code>
    <p className="text-sm text-muted-foreground mb-3">{explanation}</p>
    {steps && steps.length > 0 && (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">Step-by-step:</p>
        <ol className="list-decimal list-inside space-y-1">
          {steps.map((step, i) => <li key={i} className="text-xs text-muted-foreground">{step}</li>)}
        </ol>
      </div>
    )}
  </div>
)

// Info Card
const InfoCard = ({ title, content, variant = 'info' }: { title: string; content: string; variant?: 'info' | 'warning' | 'success' }) => {
  const variants = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300'
  }
  const icons = { info: Info, warning: AlertCircle, success: Check }
  const Icon = icons[variant]
  return (
    <div className={`p-3 rounded-lg border ${variants[variant]} flex gap-2`}>
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-xs opacity-80">{content}</p>
      </div>
    </div>
  )
}

// Calculator Config Type
interface CalculatorConfig {
  name: string
  description: string
  longDescription: string
  category: string
  icon: React.ElementType
  inputs: { id: string; label: string; placeholder: string; type?: string; options?: { value: string; label: string }[] }[]
  calculate: (inputs: Record<string, string>) => {
    results: { label: string; value: string | number; unit?: string; highlight?: boolean; description?: string; icon?: React.ElementType }[]
    pieData?: { label: string; value: number; color: string }[]
    formula?: { formula: string; explanation: string; steps?: string[] }
    comparisons?: { label: string; value: number; max: number; color: string; unit?: string }[]
    infoCards?: { title: string; content: string; variant: 'info' | 'warning' | 'success' }[]
    // Detailed results fields
    status?: { label: string; type: 'success' | 'warning' | 'danger' | 'info'; range?: string }
    meaning?: string
    limitations?: string[]
    insights?: string[]
    improvement?: {
      what: string
      keyInputs: string[]
      recommendations: { title: string; description: string }[]
      quickActions?: { title: string; description: string }[]
      mediumActions?: { title: string; description: string }[]
      longActions?: { title: string; description: string }[]
      practicalSteps: string
    }
    actionPlan?: { title: string; description: string }[]
    disclaimer?: string
    // New fields for enhanced results
    charts?: { title: string; type: string; xAxis?: string; yAxis?: string; data: { label: string; value: number; color?: string }[]; explanation: string }[]
    benchmarkComparison?: { label: string; userValue: number; benchmarkValue: number; unit?: string; status: 'better' | 'worse' | 'neutral' }[]
    faqs?: { question: string; answer: string }[]
    summaryInsight?: string
  }
}

// All Calculator Configurations - Consolidated in one place
const allCalculatorConfigs: Record<string, CalculatorConfig> = {
  // HEALTH CALCULATORS
  bmi: {
    name: 'BMI Calculator', description: 'Calculate your Body Mass Index', longDescription: 'Body Mass Index (BMI) is a widely used metric to assess whether a person has a healthy body weight relative to their height. It provides a simple numeric measure that helps categorize individuals into underweight, normal weight, overweight, or obese categories. BMI is calculated by dividing weight in kilograms by height in meters squared.', category: 'health', icon: Activity,
    inputs: [
      { id: 'unit', label: 'Unit System', placeholder: '', type: 'select', options: [{ value: 'metric', label: 'Metric (kg, cm)' }, { value: 'imperial', label: 'Imperial (lbs, in)' }] },
      { id: 'weight', label: 'Weight', placeholder: '70' },
      { id: 'height', label: 'Height', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), unit = inputs.unit || 'metric'
      if (!w || !h) return { results: [] }
      let bmi: number, heightM: number
      if (unit === 'metric') { heightM = h / 100; bmi = w / Math.pow(heightM, 2) }
      else { heightM = h * 0.0254; bmi = (w / Math.pow(h, 2)) * 703 }
      
      let category: string, color: string, risk: string, statusType: 'success' | 'warning' | 'danger' | 'info'
      if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; risk = 'Risk of nutritional deficiency and osteoporosis'; statusType = 'info' }
      else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e'; risk = 'Low health risk - maintain current lifestyle'; statusType = 'success' }
      else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; risk = 'Moderate risk of heart disease, diabetes, and joint problems'; statusType = 'warning' }
      else { category = 'Obese'; color = '#ef4444'; risk = 'High risk of heart disease, stroke, diabetes, and certain cancers'; statusType = 'danger' }
      
      const healthyMin = 18.5 * Math.pow(heightM, 2), healthyMax = 24.9 * Math.pow(heightM, 2)
      const weightDiff = bmi < 18.5 ? healthyMin - w : (bmi > 25 ? w - healthyMax : 0)
      
      return {
        results: [
          { label: 'Your BMI', value: bmi.toFixed(1), highlight: true, icon: Activity },
          { label: 'Category', value: category, icon: Target },
          { label: 'Healthy Weight Range', value: `${healthyMin.toFixed(1)} - ${healthyMax.toFixed(1)} kg` }
        ],
        pieData: [{ label: 'BMI', value: bmi, color }, { label: 'Normal Range', value: 25 - bmi, color: '#e5e7eb' }],
        formula: { formula: 'BMI = Weight (kg) ÷ Height² (m)', explanation: `Calculated: ${w} ÷ ${heightM.toFixed(2)}² = ${bmi.toFixed(1)}`, steps: [`Height: ${h} = ${heightM.toFixed(2)} m`, `Square: ${heightM.toFixed(2)}² = ${Math.pow(heightM, 2).toFixed(2)}`, `BMI: ${w} ÷ ${Math.pow(heightM, 2).toFixed(2)} = ${bmi.toFixed(1)}`] },
        comparisons: [{ label: 'Your BMI', value: bmi, max: 40, color }, { label: 'Normal (18.5-25)', value: Math.min(25, Math.max(18.5, bmi)), max: 40, color: '#22c55e' }],
        infoCards: [{ title: 'Health Implications', content: risk, variant: bmi < 18.5 || bmi >= 30 ? 'warning' : 'info' }, { title: 'BMI Limitations', content: 'BMI does not distinguish between muscle and fat mass. Athletes may have high BMI but low body fat.', variant: 'info' }],
        status: { label: category, type: statusType, range: 'Normal: 18.5 - 24.9' },
        meaning: `Your BMI of ${bmi.toFixed(1)} indicates that you are in the "${category}" category. ${bmi >= 18.5 && bmi < 25 ? 'This is considered a healthy weight range for most adults.' : bmi < 18.5 ? 'Being underweight may indicate nutritional deficiency or other health concerns.' : 'Higher BMI is associated with increased health risks including heart disease, diabetes, and joint problems.'}`,
        limitations: [
          'BMI does not distinguish between muscle mass and fat mass - athletes may be misclassified',
          'Does not account for fat distribution (visceral vs. subcutaneous fat)',
          'May not be accurate for elderly individuals or pregnant women',
          'Does not consider age, gender, or ethnicity differences in body composition'
        ],
        insights: [
          `Your healthy weight range is ${healthyMin.toFixed(1)} - ${healthyMax.toFixed(1)} kg at your height`,
          bmi < 18.5 ? 'Focus on nutrient-dense foods and strength training to reach a healthier weight' : 
          bmi > 25 ? 'Even a 5-10% weight reduction can significantly improve health markers' : 
          'Maintain your current lifestyle with regular physical activity and balanced nutrition',
          'BMI is just one indicator - consider waist circumference and body fat percentage for a complete picture'
        ],
        improvement: {
          what: bmi < 18.5 ? 'Gain healthy weight through proper nutrition and strength training' : 
                bmi > 25 ? 'Reduce body weight through balanced diet and increased physical activity' : 
                'Maintain current healthy weight through consistent lifestyle habits',
          keyInputs: ['Weight', 'Height', 'Activity Level', 'Diet Quality'],
          recommendations: [
            { title: 'Balanced Nutrition', description: 'Focus on whole foods, lean proteins, vegetables, and whole grains' },
            { title: 'Regular Exercise', description: 'Aim for 150 minutes of moderate activity or 75 minutes of vigorous activity per week' },
            { title: 'Adequate Sleep', description: 'Get 7-9 hours of quality sleep per night for optimal metabolism' }
          ],
          quickActions: [
            { title: 'Track your food intake', description: 'Use a food diary app to understand your current eating patterns' },
            { title: 'Take a 30-minute walk', description: 'Start with a simple daily walk to build exercise habits' },
            { title: 'Drink more water', description: 'Replace sugary beverages with water to reduce empty calories' }
          ],
          mediumActions: [
            { title: 'Join a fitness class', description: 'Structured exercise provides accountability and proper form guidance' },
            { title: 'Meal prep weekly', description: 'Plan and prepare healthy meals in advance to avoid poor food choices' },
            { title: 'Get a health checkup', description: 'Consult with a healthcare provider about your weight goals' }
          ],
          longActions: [
            { title: 'Build sustainable habits', description: 'Focus on lifestyle changes rather than temporary diets' },
            { title: 'Monitor progress monthly', description: 'Track BMI, body measurements, and how you feel' },
            { title: 'Consider professional support', description: 'Work with a dietitian or personal trainer for personalized guidance' }
          ],
          practicalSteps: `Start by making small, sustainable changes to your diet and activity level. Focus on whole foods, reduce processed food intake, and aim for at least 30 minutes of physical activity most days. Track your progress weekly but focus on trends rather than daily fluctuations. ${bmi < 18.5 ? 'Prioritize calorie-dense nutritious foods and strength training.' : bmi > 25 ? 'Create a moderate calorie deficit through diet and exercise.' : 'Maintain your healthy habits and regular check-ups.'}`
        },
        actionPlan: [
          { title: 'Calculate your daily calorie needs', description: 'Use our Calorie Calculator to determine your maintenance calories and adjust accordingly' },
          { title: 'Set a realistic goal', description: `Aim for ${bmi < 18.5 ? 'gaining 0.25-0.5 kg per week' : bmi > 25 ? 'losing 0.5-1 kg per week' : 'maintaining current weight'}` },
          { title: 'Plan your meals', description: 'Create a weekly meal plan focused on nutrient-dense whole foods' },
          { title: 'Schedule exercise', description: 'Plan 3-5 workout sessions per week, mixing cardio and strength training' },
          { title: 'Monitor and adjust', description: 'Weigh yourself weekly and adjust your approach based on progress' },
          { title: 'Seek professional advice', description: 'Consult healthcare professionals for personalized guidance and to rule out underlying conditions' }
        ],
        disclaimer: 'This BMI calculator is for informational purposes only and should not replace professional medical advice. BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare provider for a comprehensive health assessment.',
        charts: [
          { title: 'Your BMI vs Ideal Range', type: 'Bar Chart', xAxis: 'Category', yAxis: 'BMI Value', data: [{ label: 'Your BMI', value: bmi, color: '#6366f1' }, { label: 'Underweight', value: 18.5, color: '#3b82f6' }, { label: 'Normal Max', value: 24.9, color: '#22c55e' }, { label: 'Overweight Max', value: 29.9, color: '#f59e0b' }], explanation: 'Compares your BMI value against standard category thresholds' },
          { title: 'Weight Progression (Projected)', type: 'Line Chart', xAxis: 'Weeks', yAxis: 'BMI', data: [{ label: 'Current', value: bmi }, { label: 'Week 4', value: bmi * 0.98 }, { label: 'Week 8', value: bmi * 0.96 }, { label: 'Week 12', value: bmi * 0.94 }, { label: 'Goal', value: Math.max(21.7, bmi * 0.92) }], explanation: 'Projected BMI reduction if following recommended lifestyle changes' },
          { title: 'Body Composition', type: 'Area Chart', xAxis: 'Category', yAxis: 'Percentage', data: [{ label: 'Fat Mass', value: 25, color: '#ef4444' }, { label: 'Muscle', value: 40, color: '#22c55e' }, { label: 'Bone', value: 15, color: '#6366f1' }, { label: 'Other', value: 20, color: '#64748b' }], explanation: 'Typical body composition breakdown for your BMI category' },
          { title: 'Health Risk Distribution', type: 'Pie Chart', xAxis: '', yAxis: '', data: [{ label: 'Low Risk', value: bmi < 25 ? 60 : 30, color: '#22c55e' }, { label: 'Moderate Risk', value: bmi >= 25 && bmi < 30 ? 50 : 20, color: '#f59e0b' }, { label: 'Higher Risk', value: bmi >= 30 ? 50 : 10, color: '#ef4444' }], explanation: 'Relative health risk based on your BMI category' },
          { title: 'Population Comparison', type: 'Doughnut Chart', xAxis: '', yAxis: '', data: [{ label: 'Underweight', value: 10, color: '#3b82f6' }, { label: 'Normal', value: 30, color: '#22c55e' }, { label: 'Overweight', value: 35, color: '#f59e0b' }, { label: 'Obese', value: 25, color: '#ef4444' }], explanation: 'Distribution of BMI categories in the general population' },
          { title: 'Multi-factor Health Score', type: 'Radar Chart', xAxis: '', yAxis: '', data: [{ label: 'BMI', value: bmi < 25 ? 80 : bmi < 30 ? 60 : 40 }, { label: 'Activity', value: 65 }, { label: 'Diet', value: 70 }, { label: 'Sleep', value: 75 }, { label: 'Stress', value: 60 }], explanation: 'Your health score across multiple factors (estimated)' },
          { title: 'Weight vs Height Correlation', type: 'Scatter Plot', xAxis: 'Height (cm)', yAxis: 'Weight (kg)', data: [{ label: 'You', value: w, color: '#6366f1' }, { label: 'Avg Short', value: 60 }, { label: 'Avg Medium', value: 70 }, { label: 'Avg Tall', value: 85 }], explanation: 'Your position compared to average weights at different heights' },
          { title: 'Impact Analysis', type: 'Bubble Chart', xAxis: 'Impact', yAxis: 'Control', data: [{ label: 'Diet', value: 90 }, { label: 'Exercise', value: 85 }, { label: 'Sleep', value: 60 }, { label: 'Genetics', value: 30 }], explanation: 'Bubble size indicates impact on BMI, position shows controllability' },
          { title: 'Weekly Progress Stacking', type: 'Stacked Bar Chart', xAxis: 'Week', yAxis: 'BMI Points', data: [{ label: 'Diet Impact', value: 0.5, color: '#22c55e' }, { label: 'Exercise Impact', value: 0.3, color: '#6366f1' }, { label: 'Remaining', value: bmi - 21.7, color: '#e5e7eb' }], explanation: 'How diet and exercise contribute to BMI improvement' },
          { title: 'Category Comparison', type: 'Horizontal Bar Chart', xAxis: 'BMI Value', yAxis: 'Category', data: [{ label: 'Your BMI', value: bmi, color: '#6366f1' }, { label: 'Ideal BMI', value: 21.7, color: '#22c55e' }, { label: 'Average Adult', value: 26.5, color: '#64748b' }], explanation: 'Your BMI compared to ideal and population average' },
          { title: 'Health Score Gauge', type: 'Gauge / Meter Chart', xAxis: '', yAxis: '', data: [{ label: 'Score', value: bmi < 25 ? 80 : bmi < 30 ? 60 : 40 }], explanation: 'Overall health score based on BMI (higher is better)' },
          { title: 'BMI Distribution Histogram', type: 'Histogram', xAxis: 'BMI Range', yAxis: 'Population %', data: [{ label: '15-18', value: 8 }, { label: '18-20', value: 15 }, { label: '20-22', value: 20 }, { label: '22-25', value: 22 }, { label: '25-30', value: 23 }, { label: '30+', value: 12 }], explanation: 'Population distribution across BMI ranges with your position marked' }
        ],
        benchmarkComparison: [
          { label: 'Compared to Ideal BMI', userValue: bmi, benchmarkValue: 21.7, status: bmi < 25 ? 'better' : bmi < 30 ? 'worse' : 'worse' as 'better' | 'worse' | 'neutral' },
          { label: 'Compared to Population Average', userValue: bmi, benchmarkValue: 26.5, status: bmi < 26.5 ? 'better' : 'worse' as 'better' | 'worse' | 'neutral' },
          { label: 'Distance from Healthy Range', userValue: bmi, benchmarkValue: 22, status: bmi >= 18.5 && bmi < 25 ? 'better' : 'worse' as 'better' | 'worse' | 'neutral' }
        ],
        faqs: [
          { question: 'What is a healthy BMI range?', answer: 'A healthy BMI is generally considered to be between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is obese. However, BMI is just one indicator and should be considered alongside other health metrics.' },
          { question: 'Why doesn\'t BMI account for muscle mass?', answer: 'BMI is a simple height-to-weight ratio and cannot distinguish between fat and muscle. This means athletes or muscular individuals may be classified as overweight despite having low body fat. For a complete picture, consider body fat percentage measurements.' },
          { question: 'How quickly can I safely change my BMI?', answer: 'A safe rate of weight change is typically 0.5-1 kg per week for weight loss, or 0.25-0.5 kg per week for weight gain. Rapid changes can be unhealthy and difficult to maintain long-term.' },
          { question: 'Does BMI apply to everyone?', answer: 'BMI may not be appropriate for athletes, pregnant women, elderly individuals, or children. It also doesn\'t account for ethnic differences in body composition. Consult a healthcare provider for personalized assessment.' },
          { question: 'What other measurements should I consider?', answer: 'Along with BMI, consider waist circumference (healthier if under 94cm for men, 80cm for women), body fat percentage, and waist-to-hip ratio. These provide additional insight into health risks.' }
        ],
        summaryInsight: `Your BMI of ${bmi.toFixed(1)} places you in the "${category}" category. ${bmi >= 18.5 && bmi < 25 ? 'You are within a healthy weight range - continue maintaining balanced nutrition and regular physical activity.' : bmi < 18.5 ? `To reach a healthier weight, focus on nutrient-dense foods and strength training. A target weight of ${healthyMin.toFixed(1)} kg would place you in the normal range.` : `Reducing your weight by ${weightDiff.toFixed(1)} kg would help you reach a healthier BMI. Focus on sustainable lifestyle changes including balanced diet and regular exercise.`} Remember that BMI is just one health indicator - consider consulting a healthcare professional for a comprehensive assessment.`
      }
    }
  },
  'body-fat': {
    name: 'Body Fat Calculator', description: 'Estimate body fat percentage', longDescription: 'The Body Fat Calculator uses the US Navy method to estimate your body fat percentage based on circumference measurements. This method is widely used by military and fitness professionals.', category: 'health', icon: Percent,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'neck', label: 'Neck (cm)', placeholder: '38' },
      { id: 'waist', label: 'Waist (cm)', placeholder: '85' },
      { id: 'hip', label: 'Hip (cm) - Female only', placeholder: '95' }
    ],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), n = parseFloat(inputs.neck), w = parseFloat(inputs.waist), hp = parseFloat(inputs.hip), gender = inputs.gender || 'male'
      if (!h || !n || !w) return { results: [] }
      let bodyFat: number
      if (gender === 'male') bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
      else { if (!hp) return { results: [{ label: 'Error', value: 'Hip required' }] }; bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450 }
      bodyFat = Math.max(3, Math.min(50, bodyFat))
      return {
        results: [{ label: 'Body Fat %', value: bodyFat.toFixed(1), unit: '%', highlight: true }, { label: 'Lean Mass', value: (100 - bodyFat).toFixed(1), unit: '%' }],
        pieData: [{ label: 'Body Fat', value: bodyFat, color: '#ef4444' }, { label: 'Lean Mass', value: 100 - bodyFat, color: '#22c55e' }],
        formula: { formula: 'US Navy Method', explanation: 'Uses body measurements to estimate body fat percentage.' }
      }
    }
  },
  calorie: {
    name: 'Calorie Calculator', description: 'Daily calorie needs', longDescription: 'Calculate your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level. This is essential for weight management goals.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: '1.2', label: 'Sedentary' }, { value: '1.375', label: 'Light' }, { value: '1.55', label: 'Moderate' }, { value: '1.725', label: 'Active' }, { value: '1.9', label: 'Very Active' }] }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), activity = parseFloat(inputs.activity || '1.55'), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      const tdee = bmr * activity
      return {
        results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal/day', icon: Zap }, { label: 'Maintenance', value: Math.round(tdee), unit: 'cal/day', highlight: true }, { label: 'Weight Loss', value: Math.round(tdee - 500), unit: 'cal/day' }],
        pieData: [{ label: 'BMR', value: bmr, color: '#8b5cf6' }, { label: 'Activity', value: tdee - bmr, color: '#22c55e' }],
        formula: { formula: 'TDEE = BMR × Activity', explanation: 'Using Mifflin-St Jeor equation.' }
      }
    }
  },
  tdee: {
    name: 'TDEE Calculator', description: 'Total energy expenditure', longDescription: 'TDEE represents the total number of calories you burn daily.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: '1.2', label: 'Sedentary' }, { value: '1.55', label: 'Moderate' }, { value: '1.9', label: 'Very Active' }] }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), activity = parseFloat(inputs.activity || '1.55'), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      const tdee = bmr * activity
      return { results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal' }, { label: 'TDEE', value: Math.round(tdee), unit: 'cal/day', highlight: true }], pieData: [{ label: 'BMR', value: bmr, color: '#3b82f6' }, { label: 'Activity', value: tdee - bmr, color: '#22c55e' }], formula: { formula: 'TDEE = BMR × Activity', explanation: `TDEE: ${Math.round(tdee)} calories/day` } }
    }
  },
  bmr: {
    name: 'BMR Calculator', description: 'Basal metabolic rate', longDescription: 'BMR is calories needed at complete rest.', category: 'health', icon: Zap,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      return { results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal/day', highlight: true, icon: Zap }], formula: { formula: 'Mifflin-St Jeor Equation', explanation: 'Your BMR represents minimum calories needed at rest.' } }
    }
  },
  // FINANCIAL CALCULATORS
  'compound-interest': {
    name: 'Compound Interest Calculator', description: 'Investment growth', longDescription: 'Calculate how your investments grow over time with compound interest - the eighth wonder of the world.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'principal', label: 'Principal ($)', placeholder: '10000' },
      { id: 'rate', label: 'Annual Rate (%)', placeholder: '7' },
      { id: 'time', label: 'Years', placeholder: '10' },
      { id: 'frequency', label: 'Frequency', placeholder: '', type: 'select', options: [{ value: '1', label: 'Annually' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' }] }
    ],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.time), n = parseFloat(inputs.frequency || '12')
      if (!p || !r || !t) return { results: [] }
      const amount = p * Math.pow(1 + r / n, n * t), interest = amount - p
      return {
        results: [{ label: 'Final Amount', value: `$${amount.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true }, { label: 'Interest Earned', value: `$${interest.toLocaleString(undefined, {maximumFractionDigits: 2})}` }],
        pieData: [{ label: 'Principal', value: p, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#22c55e' }],
        formula: { formula: 'A = P(1 + r/n)^(nt)', explanation: `${inputs.rate}% compounded ${n === 1 ? 'annually' : n === 12 ? 'monthly' : 'daily'} for ${t} years.` }
      }
    }
  },
  mortgage: {
    name: 'Mortgage Calculator', description: 'Monthly mortgage payments', longDescription: 'Calculate monthly mortgage payments.', category: 'financial', icon: Home,
    inputs: [
      { id: 'price', label: 'Home Price ($)', placeholder: '350000' },
      { id: 'down', label: 'Down Payment ($)', placeholder: '70000' },
      { id: 'rate', label: 'Interest Rate (%)', placeholder: '6.5' },
      { id: 'term', label: 'Term', placeholder: '', type: 'select', options: [{ value: '15', label: '15 years' }, { value: '30', label: '30 years' }] }
    ],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), down = parseFloat(inputs.down) || 0, rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term || '30') * 12, loan = price - down
      if (!loan || !rate || !term) return { results: [] }
      const monthly = loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1), total = monthly * term, interest = total - loan
      return {
        results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }],
        pieData: [{ label: 'Principal', value: loan, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#ef4444' }],
        formula: { formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]', explanation: `Loan: $${loan.toLocaleString()}, Rate: ${(rate*100).toFixed(3)}%/month` }
      }
    }
  },
  loan: {
    name: 'Loan Calculator', description: 'Loan payments', longDescription: 'Calculate loan payments and total interest.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'amount', label: 'Loan Amount ($)', placeholder: '25000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'term', label: 'Term (years)', placeholder: '5' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term) * 12
      if (!amount || !rate || !term) return { results: [] }
      const monthly = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1), total = monthly * term, interest = total - amount
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }], pieData: [{ label: 'Principal', value: amount, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#ef4444' }], formula: { formula: 'Standard amortization formula', explanation: 'Calculates fixed monthly payments.' } }
    }
  },
  tip: {
    name: 'Tip Calculator', description: 'Calculate tips', longDescription: 'Calculate tips and split bills.', category: 'financial', icon: Receipt,
    inputs: [
      { id: 'bill', label: 'Bill Amount ($)', placeholder: '85' },
      { id: 'tip', label: 'Tip %', placeholder: '', type: 'select', options: [{ value: '15', label: '15%' }, { value: '18', label: '18%' }, { value: '20', label: '20%' }] },
      { id: 'split', label: 'Split', placeholder: '', type: 'select', options: [{ value: '1', label: '1 person' }, { value: '2', label: '2 people' }, { value: '4', label: '4 people' }] }
    ],
    calculate: (inputs) => {
      const bill = parseFloat(inputs.bill), tip = parseFloat(inputs.tip || '18'), split = parseFloat(inputs.split || '1')
      if (!bill) return { results: [] }
      const tipAmount = bill * tip / 100, total = bill + tipAmount, perPerson = total / split
      return { results: [{ label: 'Tip', value: `$${tipAmount.toFixed(2)}` }, { label: 'Total', value: `$${total.toFixed(2)}`, highlight: true }, ...(split > 1 ? [{ label: 'Per Person', value: `$${perPerson.toFixed(2)}` }] : [])], pieData: [{ label: 'Bill', value: bill, color: '#3b82f6' }, { label: 'Tip', value: tipAmount, color: '#22c55e' }], formula: { formula: 'Tip = Bill × Tip%', explanation: `${tip}% tip on $${bill}` } }
    }
  },
  discount: {
    name: 'Discount Calculator', description: 'Calculate discounts', longDescription: 'Calculate discounted prices.', category: 'financial', icon: Percent,
    inputs: [{ id: 'price', label: 'Original Price ($)', placeholder: '100' }, { id: 'discount', label: 'Discount %', placeholder: '20' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), discount = parseFloat(inputs.discount)
      if (!price) return { results: [] }
      const savings = price * discount / 100, final = price - savings
      return { results: [{ label: 'You Save', value: `$${savings.toFixed(2)}` }, { label: 'Final Price', value: `$${final.toFixed(2)}`, highlight: true }], pieData: [{ label: 'Final', value: final, color: '#22c55e' }, { label: 'Saved', value: savings, color: '#ef4444' }], formula: { formula: 'Final = Price × (1 - Discount%)', explanation: `${discount}% off $${price}` } }
    }
  },
  investment: {
    name: 'Investment Calculator', description: 'Investment returns', longDescription: 'Calculate future investment value.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'principal', label: 'Investment ($)', placeholder: '10000' }, { id: 'rate', label: 'Annual Return (%)', placeholder: '8' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, n = parseFloat(inputs.years)
      if (!p || !r || !n) return { results: [] }
      const future = p * Math.pow(1 + r, n), returns = future - p
      return { results: [{ label: 'Future Value', value: `$${Math.round(future).toLocaleString()}`, highlight: true }, { label: 'Returns', value: `$${Math.round(returns).toLocaleString()}` }], pieData: [{ label: 'Principal', value: p, color: '#3b82f6' }, { label: 'Returns', value: returns, color: '#22c55e' }], formula: { formula: 'FV = PV × (1 + r)^n', explanation: `${inputs.rate}% annual return for ${n} years.` } }
    }
  },
  savings: {
    name: 'Savings Calculator', description: 'Savings growth', longDescription: 'Calculate savings growth with contributions.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'initial', label: 'Initial ($)', placeholder: '1000' }, { id: 'monthly', label: 'Monthly ($)', placeholder: '500' }, { id: 'rate', label: 'Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initial) || 0, monthly = parseFloat(inputs.monthly) || 0, rate = parseFloat(inputs.rate) / 100 / 12, years = parseFloat(inputs.years), n = years * 12
      if (n === 0) return { results: [] }
      const fvInitial = initial * Math.pow(1 + rate, n), fvMonthly = rate > 0 ? monthly * ((Math.pow(1 + rate, n) - 1) / rate) : monthly * n, total = fvInitial + fvMonthly, contributions = initial + monthly * n, interest = total - contributions
      return { results: [{ label: 'Total Savings', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Interest Earned', value: `$${Math.round(interest).toLocaleString()}` }], pieData: [{ label: 'Contributions', value: contributions, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#22c55e' }], formula: { formula: 'FV = P(1+r)^n + PMT × [(1+r)^n - 1]/r', explanation: 'Compound growth with regular contributions.' } }
    }
  },
  // MATH CALCULATORS
  percentage: {
    name: 'Percentage Calculator', description: 'Calculate percentages', longDescription: 'Calculate percentages in various ways.', category: 'math', icon: Percent,
    inputs: [
      { id: 'mode', label: 'Type', placeholder: '', type: 'select', options: [{ value: 'what-is', label: 'What is X% of Y?' }, { value: 'is-what', label: 'X is what % of Y?' }, { value: 'increase', label: 'X + Y%' }, { value: 'decrease', label: 'X - Y%' }] },
      { id: 'value1', label: 'First Value', placeholder: '50' },
      { id: 'value2', label: 'Second Value', placeholder: '200' }
    ],
    calculate: (inputs) => {
      const v1 = parseFloat(inputs.value1), v2 = parseFloat(inputs.value2)
      if (isNaN(v1) || isNaN(v2)) return { results: [] }
      let result: string, explanation: string
      switch (inputs.mode) {
        case 'what-is': result = `${(v1 / 100 * v2).toFixed(2)}`; explanation = `${v1}% of ${v2} = ${result}`; break
        case 'is-what': result = `${(v1 / v2 * 100).toFixed(2)}%`; explanation = `${v1} is ${result} of ${v2}`; break
        case 'increase': result = `${(v1 * (1 + v2 / 100)).toFixed(2)}`; explanation = `${v1} + ${v2}% = ${result}`; break
        case 'decrease': result = `${(v1 * (1 - v2 / 100)).toFixed(2)}`; explanation = `${v1} - ${v2}% = ${result}`; break
        default: result = ''; explanation = ''
      }
      return { results: [{ label: 'Result', value: result, highlight: true }], formula: { formula: inputs.mode === 'what-is' ? 'Result = X% × Y' : inputs.mode === 'is-what' ? 'Result = (X/Y) × 100%' : inputs.mode === 'increase' ? 'Result = X × (1 + Y%)' : 'Result = X × (1 - Y%)', explanation } }
    }
  },
  scientific: {
    name: 'Scientific Calculator', description: 'Advanced math', longDescription: 'Perform advanced mathematical calculations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'expression', label: 'Expression', placeholder: '2+2*3, sin(30), sqrt(16)' }],
    calculate: (inputs) => {
      try {
        const expr = inputs.expression.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/sqrt/g, 'Math.sqrt').replace(/\^/g, '**').replace(/pi/g, 'Math.PI')
        const result = new Function(`return ${expr}`)()
        return { results: [{ label: 'Result', value: result.toString(), highlight: true }], formula: { formula: inputs.expression, explanation: `Evaluated: ${result}` } }
      } catch { return { results: [{ label: 'Error', value: 'Invalid expression' }] } }
    }
  },
  'square-root': {
    name: 'Square Root', description: 'Calculate √x', longDescription: 'Calculate square root of any non-negative number.', category: 'math', icon: Square,
    inputs: [{ id: 'value', label: 'Number', placeholder: '144' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v) || v < 0) return { results: [{ label: 'Error', value: 'Enter non-negative number' }] }
      return { results: [{ label: 'Square Root', value: Math.sqrt(v).toFixed(6), highlight: true }], formula: { formula: '√x', explanation: `√${v} = ${Math.sqrt(v).toFixed(6)}` } }
    }
  },
  gcd: {
    name: 'GCD Calculator', description: 'Greatest Common Divisor', longDescription: 'Find GCD of two or more numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '12, 24, 36' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      let result = nums[0]
      for (let i = 1; i < nums.length; i++) result = gcd(result, nums[i])
      return { results: [{ label: 'GCD', value: result, highlight: true }], formula: { formula: 'Euclidean Algorithm', explanation: `GCD of ${nums.join(', ')} is ${result}` } }
    }
  },
  average: {
    name: 'Average Calculator', description: 'Mean, median, mode', longDescription: 'Calculate statistical measures.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '5, 10, 15, 20, 25' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (nums.length === 0) return { results: [] }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const sorted = [...nums].sort((a, b) => a - b)
      const median = nums.length % 2 === 0 ? (sorted[nums.length/2 - 1] + sorted[nums.length/2]) / 2 : sorted[Math.floor(nums.length/2)]
      const range = sorted[sorted.length - 1] - sorted[0]
      return { results: [{ label: 'Mean', value: mean.toFixed(2), highlight: true }, { label: 'Median', value: median.toFixed(2) }, { label: 'Range', value: range.toFixed(2) }], formula: { formula: 'Mean = Sum / Count', explanation: `Stats for ${nums.length} numbers` } }
    }
  },
  // DATE & TIME CALCULATORS
  'date-difference': {
    name: 'Date Difference', description: 'Days between dates', longDescription: 'Calculate days between two dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end), diff = Math.abs(end.getTime() - start.getTime()), days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days', value: days, highlight: true }, { label: 'Weeks', value: Math.floor(days / 7) }, { label: 'Months', value: Math.floor(days / 30) }], formula: { formula: 'Days = |End - Start|', explanation: `${days} days between dates` } }
    }
  },
  age: {
    name: 'Age Calculator', description: 'Calculate exact age', longDescription: 'Calculate age from birth date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      let years = today.getFullYear() - birth.getFullYear(), months = today.getMonth() - birth.getMonth(), days = today.getDate() - birth.getDate()
      if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
      if (months < 0) { years--; months += 12 }
      return { results: [{ label: 'Age', value: `${years}y ${months}m ${days}d`, highlight: true }], formula: { formula: 'Age = Today - Birth', explanation: 'Your exact age.' } }
    }
  },
  countdown: {
    name: 'Countdown Calculator', description: 'Days until date', longDescription: 'Calculate days until a future date.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'date', label: 'Target Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const target = new Date(inputs.date), today = new Date()
      today.setHours(0,0,0,0); target.setHours(0,0,0,0)
      const diff = target.getTime() - today.getTime(), days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: days >= 0 ? 'Days Until' : 'Days Since', value: Math.abs(days), highlight: true }], formula: { formula: 'Countdown = Target - Today', explanation: days >= 0 ? `${days} days remaining` : `${Math.abs(days)} days passed` } }
    }
  },
  // TOOLS CALCULATORS
  temperature: {
    name: 'Temperature Converter', description: 'Convert temperatures', longDescription: 'Convert between Celsius, Fahrenheit, Kelvin.', category: 'tools', icon: ThermometerIcon,
    inputs: [{ id: 'value', label: 'Temperature', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'c', label: 'Celsius' }, { value: 'f', label: 'Fahrenheit' }, { value: 'k', label: 'Kelvin' }] }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value), from = inputs.from || 'c'
      if (isNaN(v)) return { results: [] }
      let celsius = from === 'c' ? v : from === 'f' ? (v - 32) * 5 / 9 : v - 273.15
      return { results: [{ label: 'Celsius', value: celsius.toFixed(2), unit: '°C' }, { label: 'Fahrenheit', value: (celsius * 9 / 5 + 32).toFixed(2), unit: '°F' }, { label: 'Kelvin', value: (celsius + 273.15).toFixed(2), unit: 'K', highlight: true }], formula: { formula: '°F = °C × 9/5 + 32', explanation: 'Temperature scale conversions.' } }
    }
  },
  'length-converter': {
    name: 'Length Converter', description: 'Convert length', longDescription: 'Convert between length units.', category: 'tools', icon: Ruler,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'm', label: 'Meters' }, { value: 'km', label: 'Kilometers' }, { value: 'mi', label: 'Miles' }, { value: 'ft', label: 'Feet' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'm', label: 'Meters' }, { value: 'km', label: 'Kilometers' }, { value: 'mi', label: 'Miles' }, { value: 'ft', label: 'Feet' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toMeters: Record<string, number> = { m: 1, km: 1000, mi: 1609.34, ft: 0.3048 }
      const meters = value * toMeters[inputs.from || 'm'], result = meters / toMeters[inputs.to || 'm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Unit conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'weight-converter': {
    name: 'Weight Converter', description: 'Convert weight', longDescription: 'Convert between weight units.', category: 'tools', icon: Weight,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'kg', label: 'Kilograms' }, { value: 'g', label: 'Grams' }, { value: 'lb', label: 'Pounds' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'kg', label: 'Kilograms' }, { value: 'g', label: 'Grams' }, { value: 'lb', label: 'Pounds' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKg: Record<string, number> = { kg: 1, g: 0.001, lb: 0.453592 }
      const kg = value * toKg[inputs.from || 'kg'], result = kg / toKg[inputs.to || 'kg']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Weight conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'password-generator': {
    name: 'Password Generator', description: 'Secure passwords', longDescription: 'Generate strong random passwords.', category: 'tools', icon: Shield,
    inputs: [{ id: 'length', label: 'Length', placeholder: '16' }, { id: 'options', label: 'Include', placeholder: '', type: 'select', options: [{ value: 'all', label: 'Letters, Numbers, Symbols' }, { value: 'alphanum', label: 'Letters & Numbers' }] }],
    calculate: (inputs) => {
      const length = Math.min(64, Math.max(8, parseInt(inputs.length) || 16)), options = inputs.options || 'all'
      let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (options !== 'letters') chars += '0123456789'
      if (options === 'all') chars += '!@#$%^&*'
      let password = ''
      for (let i = 0; i < length; i++) password += chars.charAt(Math.floor(Math.random() * chars.length))
      return { results: [{ label: 'Password', value: password, highlight: true }, { label: 'Strength', value: length >= 16 ? 'Very Strong' : 'Strong' }], formula: { formula: 'Random generation', explanation: `${length} character password` } }
    }
  },
  'random-number': {
    name: 'Random Number', description: 'Generate numbers', longDescription: 'Generate random numbers.', category: 'tools', icon: Hash,
    inputs: [{ id: 'min', label: 'Min', placeholder: '1' }, { id: 'max', label: 'Max', placeholder: '100' }, { id: 'count', label: 'Count', placeholder: '5' }],
    calculate: (inputs) => {
      const min = parseFloat(inputs.min) || 1, max = parseFloat(inputs.max) || 100, count = Math.min(20, parseInt(inputs.count) || 5)
      const numbers: number[] = []
      for (let i = 0; i < count; i++) numbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
      return { results: [{ label: 'Random Numbers', value: numbers.join(', '), highlight: true }], formula: { formula: 'Random(min, max)', explanation: `${count} numbers from ${min} to ${max}` } }
    }
  },
  'data-storage': {
    name: 'Data Storage Converter', description: 'Convert data units', longDescription: 'Convert between data storage units.', category: 'tools', icon: HardDriveIcon,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1024' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toBytes: Record<string, number> = { b: 1, kb: 1024, mb: 1048576, gb: 1073741824 }
      const bytes = value * toBytes[inputs.from || 'b'], result = bytes / toBytes[inputs.to || 'b']
      return { results: [{ label: 'Result', value: result.toLocaleString(), unit: inputs.to, highlight: true }], formula: { formula: 'Binary (1024 base)', explanation: `${value} ${inputs.from} = ${result.toLocaleString()} ${inputs.to}` } }
    }
  },
  // ADDITIONAL HEALTH CALCULATORS
  'ideal-weight': {
    name: 'Ideal Weight Calculator', description: 'Calculate ideal body weight', longDescription: 'Calculate your ideal body weight using various formulas.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!h) return { results: [] }
      const inches = h / 2.54, base = gender === 'male' ? 50 : 45.5
      const devine = base + 2.3 * (inches - 60)
      const robinson = gender === 'male' ? 52 + 1.9 * (inches - 60) : 49 + 1.7 * (inches - 60)
      const miller = gender === 'male' ? 56.2 + 1.41 * (inches - 60) : 53.1 + 1.36 * (inches - 60)
      return { results: [{ label: 'Devine Formula', value: `${devine.toFixed(1)} kg`, highlight: true }, { label: 'Robinson', value: `${robinson.toFixed(1)} kg` }, { label: 'Miller', value: `${miller.toFixed(1)} kg` }], formula: { formula: 'Multiple formulas used', explanation: 'Ideal weight varies by formula and body type.' } }
    }
  },
  protein: {
    name: 'Protein Calculator', description: 'Daily protein requirements', longDescription: 'Calculate your daily protein needs based on activity level.', category: 'health', icon: Zap,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: 'sedentary', label: 'Sedentary (0.8g/kg)' }, { value: 'moderate', label: 'Moderate (1.2g/kg)' }, { value: 'active', label: 'Active (1.6g/kg)' }, { value: 'athlete', label: 'Athlete (2.0g/kg)' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight)
      if (!w) return { results: [] }
      const multipliers: Record<string, number> = { sedentary: 0.8, moderate: 1.2, active: 1.6, athlete: 2.0 }
      const mult = multipliers[inputs.activity || 'moderate']
      const protein = w * mult
      return { results: [{ label: 'Daily Protein', value: `${Math.round(protein)}g`, highlight: true }, { label: 'Per Meal (4 meals)', value: `${Math.round(protein / 4)}g` }], pieData: [{ label: 'Protein', value: protein, color: '#ef4444' }, { label: 'Other Macros', value: 300 - protein, color: '#e5e7eb' }], formula: { formula: 'Protein = Weight × Activity Factor', explanation: `${w}kg × ${mult}g/kg = ${Math.round(protein)}g daily` } }
    }
  },
  macro: {
    name: 'Macro Calculator', description: 'Macronutrient breakdown', longDescription: 'Calculate your macronutrient split for your goals.', category: 'health', icon: PieChartIcon,
    inputs: [{ id: 'calories', label: 'Daily Calories', placeholder: '2000' }, { id: 'goal', label: 'Goal', placeholder: '', type: 'select', options: [{ value: 'balanced', label: 'Balanced (40/30/30)' }, { value: 'lowcarb', label: 'Low Carb (20/40/40)' }, { value: 'highprotein', label: 'High Protein (30/40/30)' }] }],
    calculate: (inputs) => {
      const cals = parseFloat(inputs.calories)
      if (!cals) return { results: [] }
      const ratios: Record<string, [number, number, number]> = { balanced: [0.4, 0.3, 0.3], lowcarb: [0.2, 0.4, 0.4], highprotein: [0.3, 0.4, 0.3] }
      const [carbP, proteinP, fatP] = ratios[inputs.goal || 'balanced']
      const carbs = (cals * carbP) / 4, protein = (cals * proteinP) / 4, fat = (cals * fatP) / 9
      return { results: [{ label: 'Carbs', value: `${Math.round(carbs)}g (${Math.round(carbP * 100)}%)` }, { label: 'Protein', value: `${Math.round(protein)}g (${Math.round(proteinP * 100)}%)` }, { label: 'Fat', value: `${Math.round(fat)}g (${Math.round(fatP * 100)}%)`, highlight: true }], pieData: [{ label: 'Carbs', value: carbs, color: '#3b82f6' }, { label: 'Protein', value: protein, color: '#ef4444' }, { label: 'Fat', value: fat, color: '#f59e0b' }], formula: { formula: 'Macro = Calories × Ratio ÷ Calorie per gram', explanation: 'Carbs/Protein: 4 cal/g, Fat: 9 cal/g' } }
    }
  },
  pace: {
    name: 'Pace Calculator', description: 'Running pace calculator', longDescription: 'Calculate your running pace, speed, and time.', category: 'health', icon: Timer,
    inputs: [{ id: 'distance', label: 'Distance (km)', placeholder: '5' }, { id: 'time', label: 'Time (mm:ss)', placeholder: '25:00' }],
    calculate: (inputs) => {
      const d = parseFloat(inputs.distance)
      const [mins, secs] = inputs.time.split(':').map(Number)
      if (!d || isNaN(mins)) return { results: [] }
      const totalMins = mins + (secs || 0) / 60
      const pace = totalMins / d
      const paceMins = Math.floor(pace), paceSecs = Math.round((pace - paceMins) * 60)
      const speed = (d / totalMins) * 60
      return { results: [{ label: 'Pace', value: `${paceMins}:${paceSecs.toString().padStart(2, '0')} /km`, highlight: true }, { label: 'Speed', value: `${speed.toFixed(1)} km/h` }], formula: { formula: 'Pace = Time ÷ Distance', explanation: `${totalMins.toFixed(1)} min ÷ ${d} km = ${paceMins}:${paceSecs.toString().padStart(2, '0')} per km` } }
    }
  },
  'one-rep-max': {
    name: 'One Rep Max Calculator', description: 'Estimate your max lift', longDescription: 'Calculate your estimated one-rep max from multiple reps.', category: 'health', icon: Award,
    inputs: [{ id: 'weight', label: 'Weight Lifted (kg)', placeholder: '80' }, { id: 'reps', label: 'Reps Completed', placeholder: '5' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), r = parseFloat(inputs.reps)
      if (!w || !r || r < 1) return { results: [] }
      const epley = w * (1 + r / 30)
      const brzycki = w * (36 / (37 - r))
      const lander = (100 * w) / (101.3 - 2.67 * r)
      return { results: [{ label: 'Epley 1RM', value: `${Math.round(epley)} kg`, highlight: true }, { label: 'Brzycki 1RM', value: `${Math.round(brzycki)} kg` }, { label: 'Lander 1RM', value: `${Math.round(lander)} kg` }], formula: { formula: '1RM = Weight × (1 + Reps/30)', explanation: 'Epley formula for estimating max strength.' } }
    }
  },
  pregnancy: {
    name: 'Pregnancy Calculator', description: 'Pregnancy due date', longDescription: 'Calculate your pregnancy due date and milestones.', category: 'health', icon: Heart,
    inputs: [{ id: 'lmp', label: 'Last Menstrual Period', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.lmp) return { results: [] }
      const lmp = new Date(inputs.lmp)
      const dueDate = new Date(lmp)
      dueDate.setDate(dueDate.getDate() + 280)
      const today = new Date(), weeks = Math.floor((today.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000))
      return { results: [{ label: 'Due Date', value: dueDate.toDateString(), highlight: true }, { label: 'Current Week', value: `${Math.max(0, weeks)} weeks` }], formula: { formula: 'Due Date = LMP + 280 days', explanation: '40 weeks from last menstrual period.' } }
    }
  },
  'water-intake': {
    name: 'Water Intake Calculator', description: 'Daily water needs', longDescription: 'Calculate your daily water intake requirements.', category: 'health', icon: Droplets,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity Level', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'moderate', label: 'Moderate' }, { value: 'high', label: 'High' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight)
      if (!w) return { results: [] }
      const base = w * 0.033
      const add = inputs.activity === 'high' ? 0.5 : inputs.activity === 'moderate' ? 0.25 : 0
      const total = base + add
      return { results: [{ label: 'Daily Water', value: `${total.toFixed(1)}L`, highlight: true }, { label: 'Glasses (250ml)', value: `${Math.round(total * 4)} glasses` }], pieData: [{ label: 'Water', value: total, color: '#3b82f6' }, { label: 'Target', value: 3 - total, color: '#e5e7eb' }], formula: { formula: 'Water = Weight × 0.033L + Activity bonus', explanation: 'Basic hydration needs plus activity adjustment.' } }
    }
  },
  sleep: {
    name: 'Sleep Calculator', description: 'Optimal sleep timing', longDescription: 'Calculate optimal bedtimes based on sleep cycles.', category: 'health', icon: Moon,
    inputs: [{ id: 'wake', label: 'Wake Time', placeholder: '07:00' }, { id: 'cycles', label: 'Sleep Cycles', placeholder: '', type: 'select', options: [{ value: '5', label: '5 cycles (7.5h)' }, { value: '6', label: '6 cycles (9h)' }, { value: '4', label: '4 cycles (6h)' }] }],
    calculate: (inputs) => {
      if (!inputs.wake) return { results: [] }
      const [h, m] = inputs.wake.split(':').map(Number)
      const wakeMinutes = h * 60 + m
      const cycles = parseInt(inputs.cycles || '6')
      const sleepMinutes = cycles * 90 + 15
      let bedMinutes = wakeMinutes - sleepMinutes
      if (bedMinutes < 0) bedMinutes += 24 * 60
      const bedH = Math.floor(bedMinutes / 60) % 24, bedM = bedMinutes % 60
      return { results: [{ label: 'Bedtime', value: `${bedH}:${bedM.toString().padStart(2, '0')}`, highlight: true }, { label: 'Sleep Duration', value: `${(cycles * 1.5).toFixed(1)} hours` }], formula: { formula: 'Bedtime = Wake - (Cycles × 90min + 15min)', explanation: '90-min cycles plus 15-min fall asleep time.' } }
    }
  },
  'heart-rate-zones': {
    name: 'Heart Rate Zones', description: 'Target heart rate zones', longDescription: 'Calculate your target heart rate zones for training.', category: 'health', icon: Heart,
    inputs: [{ id: 'age', label: 'Age', placeholder: '30' }, { id: 'resting', label: 'Resting HR (bpm)', placeholder: '65' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), resting = parseFloat(inputs.resting) || 70
      if (!age) return { results: [] }
      const maxHr = 220 - age
      const hrReserve = maxHr - resting
      const zones = [
        { name: 'Zone 1 (Recovery)', low: Math.round(resting + hrReserve * 0.5), high: Math.round(resting + hrReserve * 0.6) },
        { name: 'Zone 2 (Aerobic)', low: Math.round(resting + hrReserve * 0.6), high: Math.round(resting + hrReserve * 0.7) },
        { name: 'Zone 3 (Tempo)', low: Math.round(resting + hrReserve * 0.7), high: Math.round(resting + hrReserve * 0.8) },
        { name: 'Zone 4 (Threshold)', low: Math.round(resting + hrReserve * 0.8), high: Math.round(resting + hrReserve * 0.9) },
        { name: 'Zone 5 (Max)', low: Math.round(resting + hrReserve * 0.9), high: maxHr }
      ]
      return { results: [{ label: 'Max HR', value: `${maxHr} bpm`, highlight: true }, ...zones.map(z => ({ label: z.name, value: `${z.low}-${z.high} bpm` }))], formula: { formula: 'Karvonen Formula', explanation: 'Heart rate reserve method for zone calculation.' } }
    }
  },
  'body-surface-area': {
    name: 'Body Surface Area', description: 'Calculate BSA', longDescription: 'Calculate your body surface area using Du Bois formula.', category: 'health', icon: Ruler,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const bsa = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725)
      return { results: [{ label: 'Body Surface Area', value: `${bsa.toFixed(2)} m²`, highlight: true }], formula: { formula: 'Du Bois: BSA = 0.007184 × W^0.425 × H^0.725', explanation: 'Used for drug dosing and medical calculations.' } }
    }
  },
  'lean-body-mass': {
    name: 'Lean Body Mass', description: 'Calculate LBM', longDescription: 'Calculate your lean body mass.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!w || !h) return { results: [] }
      let lbm: number
      if (gender === 'male') lbm = 0.32810 * w + 0.33929 * h - 29.5336
      else lbm = 0.29569 * w + 0.41813 * h - 43.2933
      const fatPercent = ((w - lbm) / w) * 100
      return { results: [{ label: 'Lean Body Mass', value: `${lbm.toFixed(1)} kg`, highlight: true }, { label: 'Body Fat', value: `${fatPercent.toFixed(1)}%` }], pieData: [{ label: 'Lean Mass', value: lbm, color: '#22c55e' }, { label: 'Fat Mass', value: w - lbm, color: '#f59e0b' }], formula: { formula: 'Hume Formula', explanation: 'Estimates lean mass from height and weight.' } }
    }
  },
  'waist-to-hip': {
    name: 'Waist-to-Hip Ratio', description: 'Health indicator', longDescription: 'Calculate your waist-to-hip ratio for health assessment.', category: 'health', icon: Ruler,
    inputs: [{ id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'hip', label: 'Hip (cm)', placeholder: '95' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const waist = parseFloat(inputs.waist), hip = parseFloat(inputs.hip), gender = inputs.gender || 'male'
      if (!waist || !hip) return { results: [] }
      const ratio = waist / hip
      let risk: string
      if (gender === 'male') risk = ratio < 0.9 ? 'Low Risk' : ratio < 1 ? 'Moderate Risk' : 'High Risk'
      else risk = ratio < 0.8 ? 'Low Risk' : ratio < 0.85 ? 'Moderate Risk' : 'High Risk'
      return { results: [{ label: 'WHR', value: ratio.toFixed(2), highlight: true }, { label: 'Health Risk', value: risk }], formula: { formula: 'WHR = Waist ÷ Hip', explanation: `Waist-to-hip ratio indicates fat distribution.` } }
    }
  },
  'due-date': {
    name: 'Due Date Calculator', description: 'Pregnancy due date', longDescription: 'Calculate pregnancy due date from conception.', category: 'health', icon: Calendar,
    inputs: [{ id: 'conception', label: 'Conception Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.conception) return { results: [] }
      const conception = new Date(inputs.conception)
      const dueDate = new Date(conception)
      dueDate.setDate(dueDate.getDate() + 266)
      return { results: [{ label: 'Due Date', value: dueDate.toDateString(), highlight: true }], formula: { formula: 'Due Date = Conception + 266 days', explanation: '38 weeks from conception date.' } }
    }
  },
  ovulation: {
    name: 'Ovulation Calculator', description: 'Fertile days', longDescription: 'Calculate your fertile window.', category: 'health', icon: Calendar,
    inputs: [{ id: 'lmp', label: 'Last Period Start', placeholder: '', type: 'date' }, { id: 'cycle', label: 'Cycle Length (days)', placeholder: '28' }],
    calculate: (inputs) => {
      if (!inputs.lmp) return { results: [] }
      const lmp = new Date(inputs.lmp), cycle = parseFloat(inputs.cycle) || 28
      const ovulation = new Date(lmp)
      ovulation.setDate(ovulation.getDate() + cycle - 14)
      const fertileStart = new Date(ovulation), fertileEnd = new Date(ovulation)
      fertileStart.setDate(fertileStart.getDate() - 5)
      fertileEnd.setDate(fertileEnd.getDate() + 1)
      return { results: [{ label: 'Ovulation Date', value: ovulation.toDateString(), highlight: true }, { label: 'Fertile Window', value: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}` }], formula: { formula: 'Ovulation = LMP + (Cycle - 14)', explanation: '14 days before next period.' } }
    }
  },
  conception: {
    name: 'Conception Calculator', description: 'Conception timing', longDescription: 'Estimate conception date from due date.', category: 'health', icon: Calendar,
    inputs: [{ id: 'dueDate', label: 'Due Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.dueDate) return { results: [] }
      const dueDate = new Date(inputs.dueDate)
      const conception = new Date(dueDate)
      conception.setDate(conception.getDate() - 266)
      return { results: [{ label: 'Estimated Conception', value: conception.toDateString(), highlight: true }], formula: { formula: 'Conception = Due Date - 266 days', explanation: 'Average gestation from conception.' } }
    }
  },
  gfr: {
    name: 'GFR Calculator', description: 'Kidney function', longDescription: 'Estimate glomerular filtration rate.', category: 'health', icon: Activity,
    inputs: [{ id: 'creatinine', label: 'Serum Creatinine (mg/dL)', placeholder: '1.0' }, { id: 'age', label: 'Age', placeholder: '50' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const cr = parseFloat(inputs.creatinine), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!cr || !age) return { results: [] }
      let gfr = 175 * Math.pow(cr, -1.154) * Math.pow(age, -0.203)
      if (gender === 'female') gfr *= 0.742
      let stage: string
      if (gfr >= 90) stage = 'Normal (Stage 1)'
      else if (gfr >= 60) stage = 'Mild Decrease (Stage 2)'
      else if (gfr >= 45) stage = 'Moderate (Stage 3a)'
      else if (gfr >= 30) stage = 'Moderate (Stage 3b)'
      else if (gfr >= 15) stage = 'Severe (Stage 4)'
      else stage = 'Kidney Failure (Stage 5)'
      return { results: [{ label: 'GFR', value: `${Math.round(gfr)} mL/min`, highlight: true }, { label: 'Stage', value: stage }], formula: { formula: 'CKD-EPI Equation', explanation: 'Estimates kidney function.' } }
    }
  },
  'blood-alcohol': {
    name: 'Blood Alcohol Calculator', description: 'BAC estimation', longDescription: 'Estimate blood alcohol concentration.', category: 'health', icon: AlertCircle,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'drinks', label: 'Standard Drinks', placeholder: '3' }, { id: 'hours', label: 'Hours Drinking', placeholder: '2' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), drinks = parseFloat(inputs.drinks), hours = parseFloat(inputs.hours), gender = inputs.gender || 'male'
      if (!w || !drinks) return { results: [] }
      const r = gender === 'male' ? 0.68 : 0.55
      let bac = ((drinks * 14) / (w * 1000 * r)) * 100 - hours * 0.015
      bac = Math.max(0, bac)
      let status: string
      if (bac < 0.03) status = 'Normal'
      else if (bac < 0.08) status = 'Mild Impairment'
      else if (bac < 0.15) status = 'Significant Impairment'
      else status = 'Severe Impairment'
      return { results: [{ label: 'BAC', value: `${bac.toFixed(3)}%`, highlight: true }, { label: 'Status', value: status }], infoCards: [{ title: 'Legal Limit', content: 'Most jurisdictions: 0.08% for driving', variant: 'warning' }], formula: { formula: 'Widmark Formula', explanation: 'Estimated BAC based on drinks and body weight.' } }
    }
  },
  'calories-burned': {
    name: 'Calories Burned Calculator', description: 'Exercise calories', longDescription: 'Calculate calories burned during exercise.', category: 'health', icon: FlameIcon,
    inputs: [{ id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: 'running', label: 'Running (7 MET)' }, { value: 'cycling', label: 'Cycling (6 MET)' }, { value: 'swimming', label: 'Swimming (8 MET)' }, { value: 'walking', label: 'Walking (3.5 MET)' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'duration', label: 'Duration (min)', placeholder: '30' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), duration = parseFloat(inputs.duration)
      if (!w || !duration) return { results: [] }
      const mets: Record<string, number> = { running: 7, cycling: 6, swimming: 8, walking: 3.5 }
      const met = mets[inputs.activity || 'running']
      const calories = (met * w * duration) / 60 * 5
      return { results: [{ label: 'Calories Burned', value: Math.round(calories), unit: 'kcal', highlight: true }], pieData: [{ label: 'Burned', value: calories, color: '#ef4444' }, { label: 'Daily Target (500)', value: 500 - calories, color: '#e5e7eb' }], formula: { formula: 'Calories = MET × Weight × Time / 60 × 5', explanation: 'MET = Metabolic Equivalent of Task' } }
    }
  },
  'army-body-fat': {
    name: 'Army Body Fat Calculator', description: 'Military standard', longDescription: 'Calculate body fat using US Army standards.', category: 'health', icon: Award,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'age', label: 'Age', placeholder: '25' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'neck', label: 'Neck (cm)', placeholder: '38' }, { id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'hip', label: 'Hip (cm) - Females', placeholder: '95' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), n = parseFloat(inputs.neck), w = parseFloat(inputs.waist), hp = parseFloat(inputs.hip), gender = inputs.gender || 'male', age = parseFloat(inputs.age)
      if (!h || !n || !w) return { results: [] }
      let bodyFat: number
      if (gender === 'male') bodyFat = (86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76)
      else bodyFat = (163.205 * Math.log10(w + (hp || 0) - n) - 97.684 * Math.log10(h) - 78.387)
      bodyFat = Math.max(3, Math.min(50, bodyFat))
      const maxFat = gender === 'male' ? (age < 21 ? 20 : age < 28 ? 22 : 24) : (age < 21 ? 30 : age < 28 ? 32 : 34)
      const pass = bodyFat <= maxFat
      return { results: [{ label: 'Body Fat %', value: bodyFat.toFixed(1), unit: '%', highlight: true }, { label: 'Max Allowed', value: `${maxFat}%` }, { label: 'Status', value: pass ? 'PASSED' : 'EXCEEDED', icon: pass ? Check : AlertCircle }], infoCards: [{ title: pass ? 'Passed' : 'Failed', content: pass ? 'Meets Army body fat standards' : 'Exceeds maximum allowable body fat', variant: pass ? 'success' : 'warning' }], formula: { formula: 'US Army Method', explanation: 'Official military body fat calculation.' } }
    }
  },
  rmr: {
    name: 'RMR Calculator', description: 'Resting metabolic rate', longDescription: 'Calculate resting metabolic rate.', category: 'health', icon: Zap,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'age', label: 'Age', placeholder: '30' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!w || !h || !age) return { results: [] }
      const rmr = gender === 'male' ? (10 * w + 6.25 * h - 5 * age + 5) : (10 * w + 6.25 * h - 5 * age - 161)
      return { results: [{ label: 'RMR', value: Math.round(rmr), unit: 'cal/day', highlight: true }], formula: { formula: 'Mifflin-St Jeor Equation', explanation: 'Resting metabolic rate for basic functions.' } }
    }
  },
  'ideal-body-weight': {
    name: 'Ideal Body Weight', description: 'Medical ideal weight', longDescription: 'Calculate ideal body weight for medical dosing.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!h) return { results: [] }
      const inches = h / 2.54
      const ibw = gender === 'male' ? 50 + 2.3 * (inches - 60) : 45.5 + 2.3 * (inches - 60)
      return { results: [{ label: 'Ideal Body Weight', value: `${ibw.toFixed(1)} kg`, highlight: true }], formula: { formula: 'Devine Formula', explanation: 'Used for medication dosing calculations.' } }
    }
  },
  'adjusted-body-weight': {
    name: 'Adjusted Body Weight', description: 'For obese patients', longDescription: 'Calculate adjusted body weight for clinical use.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'weight', label: 'Actual Weight (kg)', placeholder: '90' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), w = parseFloat(inputs.weight), gender = inputs.gender || 'male'
      if (!h || !w) return { results: [] }
      const inches = h / 2.54
      const ibw = gender === 'male' ? 50 + 2.3 * (inches - 60) : 45.5 + 2.3 * (inches - 60)
      const abw = ibw + 0.4 * (w - ibw)
      return { results: [{ label: 'Ideal BW', value: `${ibw.toFixed(1)} kg` }, { label: 'Adjusted BW', value: `${abw.toFixed(1)} kg`, highlight: true }, { label: 'Actual BW', value: `${w.toFixed(1)} kg` }], formula: { formula: 'ABW = IBW + 0.4 × (Actual - IBW)', explanation: 'Used for drug dosing in obese patients.' } }
    }
  },
  'bmi-prime': {
    name: 'BMI Prime Calculator', description: 'BMI relative to limit', longDescription: 'Calculate BMI Prime - ratio of BMI to upper limit.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const heightM = h / 100, bmi = w / Math.pow(heightM, 2), bmiPrime = bmi / 25
      return { results: [{ label: 'BMI', value: bmi.toFixed(1) }, { label: 'BMI Prime', value: bmiPrime.toFixed(2), highlight: true }], formula: { formula: 'BMI Prime = BMI / 25', explanation: 'Values > 1 indicate overweight.' } }
    }
  },
  'ponderal-index': {
    name: 'Ponderal Index', description: 'Alternative to BMI', longDescription: 'Calculate Ponderal Index for height-weight assessment.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const heightM = h / 100, pi = w / Math.pow(heightM, 3)
      return { results: [{ label: 'Ponderal Index', value: pi.toFixed(2), unit: 'kg/m³', highlight: true }], formula: { formula: 'PI = Weight / Height³', explanation: 'Normal range: 11-15 kg/m³' } }
    }
  },
  ffmi: {
    name: 'Fat-Free Mass Index', description: 'FFMI calculator', longDescription: 'Calculate fat-free mass index.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '80' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'bodyfat', label: 'Body Fat %', placeholder: '15' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), bf = parseFloat(inputs.bodyfat)
      if (!w || !h || isNaN(bf)) return { results: [] }
      const heightM = h / 100, ffm = w * (1 - bf / 100), ffmi = ffm / Math.pow(heightM, 2), normalizedFfmi = ffmi + 6.1 * (1.8 - heightM)
      return { results: [{ label: 'FFMI', value: ffmi.toFixed(1), unit: 'kg/m²', highlight: true }, { label: 'Normalized FFMI', value: normalizedFfmi.toFixed(1), unit: 'kg/m²' }, { label: 'Fat-Free Mass', value: ffm.toFixed(1), unit: 'kg' }], formula: { formula: 'FFMI = FFM / Height²', explanation: 'Men: 18-20 average, 22+ indicates steroid use' } }
    }
  },
  'metabolic-age': {
    name: 'Metabolic Age', description: 'Body age vs real age', longDescription: 'Calculate your metabolic age based on BMR comparison.', category: 'health', icon: Activity,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'age', label: 'Chronological Age', placeholder: '35' }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), w = parseFloat(inputs.weight), h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!age || !w || !h) return { results: [] }
      const bmr = gender === 'male' ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * age) : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * age)
      const avgBmr = gender === 'male' ? 1800 : 1500
      const metabolicAge = Math.round(age + (bmr - avgBmr) / 30)
      return { results: [{ label: 'Metabolic Age', value: Math.max(18, metabolicAge), unit: 'years', highlight: true }, { label: 'Your BMR', value: Math.round(bmr), unit: 'cal' }], formula: { formula: 'Metabolic Age vs BMR', explanation: metabolicAge < age ? 'Your metabolism is younger than your age!' : 'Focus on improving metabolic health.' } }
    }
  },
  'body-shape-index': {
    name: 'Body Shape Index', description: 'ABSI calculator', longDescription: 'Calculate A Body Shape Index (ABSI) for health risk.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'age', label: 'Age', placeholder: '30' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), wc = parseFloat(inputs.waist), age = parseFloat(inputs.age)
      if (!w || !h || !wc || !age) return { results: [] }
      const heightM = h / 100, bmi = w / Math.pow(heightM, 2)
      const absi = wc / (Math.pow(bmi, 2/3) * Math.pow(heightM, 1/2))
      const absiZ = (absi - 0.08) / 0.01
      return { results: [{ label: 'ABSI', value: absi.toFixed(4), highlight: true }, { label: 'ABSI Z-Score', value: absiZ.toFixed(2) }], formula: { formula: 'ABSI = WC / (BMI^(2/3) × H^(1/2))', explanation: 'Higher ABSI indicates higher mortality risk.' } }
    }
  },
  'blood-pressure': {
    name: 'Blood Pressure Category', description: 'BP classification', longDescription: 'Classify your blood pressure reading.', category: 'health', icon: Activity,
    inputs: [{ id: 'systolic', label: 'Systolic (top)', placeholder: '120' }, { id: 'diastolic', label: 'Diastolic (bottom)', placeholder: '80' }],
    calculate: (inputs) => {
      const sys = parseFloat(inputs.systolic), dia = parseFloat(inputs.diastolic)
      if (!sys || !dia) return { results: [] }
      let category: string, color: string
      if (sys < 120 && dia < 80) { category = 'Normal'; color = '#22c55e' }
      else if (sys < 130 && dia < 80) { category = 'Elevated'; color = '#f59e0b' }
      else if (sys < 140 || dia < 90) { category = 'High BP Stage 1'; color = '#f97316' }
      else if (sys >= 140 || dia >= 90) { category = 'High BP Stage 2'; color = '#ef4444' }
      else { category = 'Hypertensive Crisis'; color = '#dc2626' }
      return { results: [{ label: 'BP Reading', value: `${sys}/${dia}`, unit: 'mmHg', highlight: true }, { label: 'Category', value: category }], infoCards: [{ title: 'Blood Pressure Range', content: `Normal: <120/80, Elevated: 120-129/<80, High Stage 1: 130-139/80-89`, variant: 'info' }], formula: { formula: 'AHA Guidelines', explanation: 'Based on American Heart Association categories.' } }
    }
  },
  'cholesterol-ratio': {
    name: 'Cholesterol Ratio', description: 'Heart health', longDescription: 'Calculate cholesterol ratios for heart health.', category: 'health', icon: Heart,
    inputs: [{ id: 'total', label: 'Total Cholesterol', placeholder: '200' }, { id: 'hdl', label: 'HDL Cholesterol', placeholder: '50' }, { id: 'ldl', label: 'LDL Cholesterol', placeholder: '100' }],
    calculate: (inputs) => {
      const total = parseFloat(inputs.total), hdl = parseFloat(inputs.hdl), ldl = parseFloat(inputs.ldl)
      if (!total || !hdl) return { results: [] }
      const ratio = total / hdl
      let status = ratio < 3.5 ? 'Optimal' : ratio < 5 ? 'Good' : ratio < 6 ? 'Moderate' : 'High Risk'
      return { results: [{ label: 'Total/HDL Ratio', value: ratio.toFixed(2), highlight: true }, { label: 'Risk Level', value: status }, { label: 'Non-HDL', value: total - hdl, unit: 'mg/dL' }], formula: { formula: 'Ratio = Total Cholesterol / HDL', explanation: 'Lower ratio = lower heart disease risk.' } }
    }
  },
  'blood-sugar': {
    name: 'Blood Sugar Converter', description: 'Glucose units', longDescription: 'Convert blood glucose between mg/dL and mmol/L.', category: 'health', icon: Activity,
    inputs: [{ id: 'value', label: 'Blood Glucose', placeholder: '100' }, { id: 'unit', label: 'Unit', placeholder: '', type: 'select', options: [{ value: 'mgdl', label: 'mg/dL' }, { value: 'mmol', label: 'mmol/L' }] }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (!v) return { results: [] }
      const mgdl = inputs.unit === 'mmol' ? v * 18.018 : v
      const mmol = inputs.unit === 'mgdl' ? v / 18.018 : v
      let status = mgdl < 100 ? 'Normal' : mgdl < 126 ? 'Prediabetes' : 'Diabetes Range'
      return { results: [{ label: 'mg/dL', value: mgdl.toFixed(1) }, { label: 'mmol/L', value: mmol.toFixed(2), highlight: true }, { label: 'Status (fasting)', value: status }], formula: { formula: 'mmol/L = mg/dL ÷ 18.018', explanation: 'Blood glucose unit conversion.' } }
    }
  },
  'pregnancy-weight': {
    name: 'Pregnancy Weight Gain', description: 'Recommended gain', longDescription: 'Calculate recommended pregnancy weight gain.', category: 'health', icon: Heart,
    inputs: [{ id: 'preWeight', label: 'Pre-pregnancy Weight (kg)', placeholder: '60' }, { id: 'height', label: 'Height (cm)', placeholder: '165' }, { id: 'trimester', label: 'Trimester', placeholder: '', type: 'select', options: [{ value: '1', label: 'First' }, { value: '2', label: 'Second' }, { value: '3', label: 'Third' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.preWeight), h = parseFloat(inputs.height), tri = inputs.trimester || '1'
      if (!w || !h) return { results: [] }
      const bmi = w / Math.pow(h/100, 2)
      let gainRange: string
      if (bmi < 18.5) gainRange = '12.5-18 kg'
      else if (bmi < 25) gainRange = '11.5-16 kg'
      else if (bmi < 30) gainRange = '7-11.5 kg'
      else gainRange = '5-9 kg'
      return { results: [{ label: 'Pre-pregnancy BMI', value: bmi.toFixed(1) }, { label: 'Recommended Gain', value: gainRange, highlight: true }], formula: { formula: 'IOM Guidelines', explanation: 'Weight gain recommendations by pre-pregnancy BMI.' } }
    }
  },
  'pediatric-dose': {
    name: 'Pediatric Dose', description: 'Child medication', longDescription: 'Calculate pediatric medication dose by weight.', category: 'health', icon: Activity,
    inputs: [{ id: 'adultDose', label: 'Adult Dose (mg)', placeholder: '500' }, { id: 'childWeight', label: 'Child Weight (kg)', placeholder: '20' }, { id: 'method', label: 'Method', placeholder: '', type: 'select', options: [{ value: 'clark', label: 'Clark\'s Rule' }, { value: 'young', label: 'Young\'s Rule' }] }],
    calculate: (inputs) => {
      const adult = parseFloat(inputs.adultDose), weight = parseFloat(inputs.childWeight), method = inputs.method || 'clark'
      if (!adult || !weight) return { results: [] }
      let dose: number
      if (method === 'clark') dose = (weight / 70) * adult
      else dose = (weight / (weight + 12)) * adult
      return { results: [{ label: 'Pediatric Dose', value: `${dose.toFixed(1)} mg`, highlight: true }, { label: 'Method', value: method === 'clark' ? 'Clark\'s Rule' : 'Young\'s Rule' }], infoCards: [{ title: 'Medical Disclaimer', content: 'Always consult a healthcare professional before dosing.', variant: 'warning' }], formula: { formula: method === 'clark' ? 'Dose = (Weight/70) × Adult Dose' : 'Dose = (Weight/(Weight+12)) × Adult Dose', explanation: 'Weight-based pediatric dosing estimation.' } }
    }
  },
  'height-predictor': {
    name: 'Height Predictor', description: 'Child height', longDescription: 'Predict adult height for children.', category: 'health', icon: Ruler,
    inputs: [{ id: 'fatherHeight', label: 'Father Height (cm)', placeholder: '180' }, { id: 'motherHeight', label: 'Mother Height (cm)', placeholder: '165' }, { id: 'gender', label: 'Child Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const fh = parseFloat(inputs.fatherHeight), mh = parseFloat(inputs.motherHeight), gender = inputs.gender || 'male'
      if (!fh || !mh) return { results: [] }
      let predicted: number
      if (gender === 'male') predicted = (fh + mh + 13) / 2
      else predicted = (fh + mh - 13) / 2
      const range = '±10 cm'
      return { results: [{ label: 'Predicted Height', value: `${predicted.toFixed(0)} cm`, highlight: true }, { label: 'Range', value: `${predicted - 10} - ${predicted + 10} cm` }], formula: { formula: 'Mid-parental height formula', explanation: 'Prediction ± 10cm accuracy.' } }
    }
  },
  'muscle-mass': {
    name: 'Muscle Mass Calculator', description: 'Estimate muscle', longDescription: 'Estimate your muscle mass percentage.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'bodyfat', label: 'Body Fat %', placeholder: '20' }, { id: 'boneMass', label: 'Bone Mass (kg)', placeholder: '3' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), bf = parseFloat(inputs.bodyfat), bone = parseFloat(inputs.boneMass) || 3
      if (!w || isNaN(bf)) return { results: [] }
      const fatMass = w * bf / 100
      const leanMass = w - fatMass
      const muscleMass = leanMass - bone - (w * 0.1)
      const musclePercent = (muscleMass / w) * 100
      return { results: [{ label: 'Muscle Mass', value: `${muscleMass.toFixed(1)} kg`, highlight: true }, { label: 'Muscle %', value: `${musclePercent.toFixed(1)}%` }, { label: 'Lean Mass', value: `${leanMass.toFixed(1)} kg` }], formula: { formula: 'Muscle = Lean - Bone - Organs', explanation: 'Estimated muscle mass calculation.' } }
    }
  },
  'sleep-quality': {
    name: 'Sleep Quality Index', description: 'Sleep assessment', longDescription: 'Assess your sleep quality.', category: 'health', icon: Moon,
    inputs: [{ id: 'sleepHours', label: 'Hours of Sleep', placeholder: '7' }, { id: 'timeToSleep', label: 'Time to Fall Asleep (min)', placeholder: '15' }, { id: 'wakeups', label: 'Night Wakings', placeholder: '1' }],
    calculate: (inputs) => {
      const hours = parseFloat(inputs.sleepHours), tts = parseFloat(inputs.timeToSleep), wakeups = parseFloat(inputs.wakeups) || 0
      if (!hours) return { results: [] }
      let score = 100
      if (hours < 6) score -= 30
      else if (hours < 7) score -= 15
      else if (hours > 9) score -= 10
      if (tts > 30) score -= 15
      else if (tts > 20) score -= 5
      score -= wakeups * 5
      score = Math.max(0, Math.min(100, score))
      let quality = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'
      return { results: [{ label: 'Sleep Quality Score', value: score, unit: '/100', highlight: true }, { label: 'Quality', value: quality }], formula: { formula: 'Based on duration, latency, continuity', explanation: 'Sleep quality assessment score.' } }
    }
  },
  'stress-test': {
    name: 'Stress Test Score', description: 'Perceived stress', longDescription: 'Calculate your perceived stress level.', category: 'health', icon: Activity,
    inputs: [{ id: 'q1', label: 'Upset by unexpected (0-4)', placeholder: '2' }, { id: 'q2', label: 'Unable to control (0-4)', placeholder: '2' }, { id: 'q3', label: 'Nervous/stressed (0-4)', placeholder: '2' }, { id: 'q4', label: 'Confident handling (0-4)', placeholder: '3' }],
    calculate: (inputs) => {
      const scores = [parseFloat(inputs.q1) || 0, parseFloat(inputs.q2) || 0, parseFloat(inputs.q3) || 0, 4 - (parseFloat(inputs.q4) || 0)]
      const total = scores.reduce((a, b) => a + b, 0)
      let level = total <= 4 ? 'Low' : total <= 8 ? 'Moderate' : total <= 12 ? 'High' : 'Very High'
      return { results: [{ label: 'Stress Score', value: total, unit: '/16', highlight: true }, { label: 'Stress Level', value: level }], formula: { formula: 'PSS-4 Scale', explanation: 'Perceived Stress Scale short form.' } }
    }
  },
  hydration: {
    name: 'Hydration Calculator', description: 'Water needs', longDescription: 'Calculate daily water intake needs.', category: 'health', icon: Droplets,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity Level', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'moderate', label: 'Moderate' }, { value: 'high', label: 'High' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), act = inputs.activity || 'moderate'
      if (!w) return { results: [] }
      const base = w * 30
      const multipliers: Record<string, number> = { low: 1, moderate: 1.2, high: 1.5 }
      const total = base * multipliers[act]
      return { results: [{ label: 'Daily Water', value: Math.round(total), unit: 'mL', highlight: true }, { label: 'Glasses', value: Math.round(total / 250), unit: '(250mL each)' }], pieData: [{ label: 'Water', value: total, color: '#3b82f6' }, { label: 'Target 2L', value: 2000, color: '#e5e7eb' }], formula: { formula: '30mL/kg × Activity', explanation: 'General hydration guideline.' } }
    }
  },
  'resting-hr': {
    name: 'Resting HR Analysis', description: 'Heart rate status', longDescription: 'Analyze your resting heart rate.', category: 'health', icon: Heart,
    inputs: [{ id: 'restingHr', label: 'Resting HR (bpm)', placeholder: '70' }, { id: 'age', label: 'Age', placeholder: '30' }],
    calculate: (inputs) => {
      const rhr = parseFloat(inputs.restingHr), age = parseFloat(inputs.age)
      if (!rhr) return { results: [] }
      let status: string
      if (rhr < 60) status = 'Athletic'
      else if (rhr < 70) status = 'Excellent'
      else if (rhr < 80) status = 'Good'
      else if (rhr < 90) status = 'Average'
      else status = 'Below Average'
      const maxHr = 220 - age
      const hrReserve = maxHr - rhr
      return { results: [{ label: 'Resting HR', value: rhr, unit: 'bpm', highlight: true }, { label: 'Status', value: status }, { label: 'HR Reserve', value: hrReserve, unit: 'bpm' }], formula: { formula: 'RHR Classification', explanation: 'Lower resting HR indicates better fitness.' } }
    }
  },
  // ADDITIONAL FINANCIAL CALCULATORS
  'auto-loan': {
    name: 'Auto Loan Calculator', description: 'Car loan payments', longDescription: 'Calculate auto loan monthly payments.', category: 'financial', icon: Car,
    inputs: [{ id: 'price', label: 'Car Price ($)', placeholder: '30000' }, { id: 'down', label: 'Down Payment ($)', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'term', label: 'Term (months)', placeholder: '60' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), down = parseFloat(inputs.down) || 0, rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term), loan = price - down
      if (!loan || !term) return { results: [] }
      const monthly = rate > 0 ? loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : loan / term
      const total = monthly * term, interest = total - loan
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }], formula: { formula: 'Standard loan amortization', explanation: `${term} month term at ${inputs.rate}%` } }
    }
  },
  retirement: {
    name: 'Retirement Calculator', description: 'Retirement planning', longDescription: 'Calculate retirement savings needs.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'age', label: 'Current Age', placeholder: '30' }, { id: 'retireAge', label: 'Retirement Age', placeholder: '65' }, { id: 'current', label: 'Current Savings ($)', placeholder: '50000' }, { id: 'monthly', label: 'Monthly Contribution ($)', placeholder: '500' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '7' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), retireAge = parseFloat(inputs.retireAge), current = parseFloat(inputs.current) || 0, monthly = parseFloat(inputs.monthly) || 0, rate = parseFloat(inputs.rate) / 100 / 12
      const years = retireAge - age, n = years * 12
      if (n <= 0) return { results: [{ label: 'Error', value: 'Invalid ages' }] }
      const fvCurrent = current * Math.pow(1 + rate, n), fvMonthly = rate > 0 ? monthly * ((Math.pow(1 + rate, n) - 1) / rate) : monthly * n
      const total = fvCurrent + fvMonthly
      return { results: [{ label: 'Retirement Savings', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Years to Save', value: years }], pieData: [{ label: 'Starting', value: current, color: '#3b82f6' }, { label: 'Contributions', value: monthly * n, color: '#22c55e' }, { label: 'Interest', value: total - current - monthly * n, color: '#f59e0b' }], formula: { formula: 'Compound growth formula', explanation: `${years} years of growth and contributions.` } }
    }
  },
  'percentage-change': {
    name: 'Percentage Change Calculator', description: 'Calculate % change', longDescription: 'Calculate percentage increase or decrease.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'old', label: 'Original Value', placeholder: '100' }, { id: 'new', label: 'New Value', placeholder: '150' }],
    calculate: (inputs) => {
      const oldVal = parseFloat(inputs.old), newVal = parseFloat(inputs.new)
      if (isNaN(oldVal) || isNaN(newVal)) return { results: [] }
      const change = ((newVal - oldVal) / oldVal) * 100
      return { results: [{ label: 'Change', value: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, highlight: true }, { label: 'Absolute Change', value: `${(newVal - oldVal).toFixed(2)}` }], formula: { formula: 'Change = ((New - Old) / Old) × 100%', explanation: `${oldVal} → ${newVal}` } }
    }
  },
  'sales-tax': {
    name: 'Sales Tax Calculator', description: 'Calculate sales tax', longDescription: 'Calculate sales tax on purchases.', category: 'financial', icon: Receipt,
    inputs: [{ id: 'price', label: 'Price ($)', placeholder: '100' }, { id: 'tax', label: 'Tax Rate (%)', placeholder: '8' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), tax = parseFloat(inputs.tax)
      if (!price) return { results: [] }
      const taxAmount = price * tax / 100, total = price + taxAmount
      return { results: [{ label: 'Tax Amount', value: `$${taxAmount.toFixed(2)}` }, { label: 'Total', value: `$${total.toFixed(2)}`, highlight: true }], formula: { formula: 'Total = Price × (1 + Tax%)', explanation: `${tax}% sales tax` } }
    }
  },
  'income-tax': {
    name: 'Income Tax Calculator', description: 'Estimate income tax', longDescription: 'Estimate annual income tax.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'income', label: 'Annual Income ($)', placeholder: '75000' }, { id: 'filing', label: 'Filing Status', placeholder: '', type: 'select', options: [{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married Filing Jointly' }] }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income)
      if (!income) return { results: [] }
      let tax = 0
      if (income <= 11000) tax = income * 0.10
      else if (income <= 44725) tax = 1100 + (income - 11000) * 0.12
      else if (income <= 95375) tax = 5147 + (income - 44725) * 0.22
      else if (income <= 183250) tax = 16290 + (income - 95375) * 0.24
      else tax = 37104 + (income - 183250) * 0.32
      const effective = (tax / income) * 100
      return { results: [{ label: 'Estimated Tax', value: `$${Math.round(tax).toLocaleString()}`, highlight: true }, { label: 'Effective Rate', value: `${effective.toFixed(1)}%` }, { label: 'Take Home', value: `$${Math.round(income - tax).toLocaleString()}` }], formula: { formula: '2024 US Tax Brackets', explanation: 'Simplified estimation.' } }
    }
  },
  'net-worth': {
    name: 'Net Worth Calculator', description: 'Calculate net worth', longDescription: 'Calculate your net worth.', category: 'financial', icon: Wallet,
    inputs: [{ id: 'assets', label: 'Total Assets ($)', placeholder: '500000' }, { id: 'liabilities', label: 'Total Liabilities ($)', placeholder: '200000' }],
    calculate: (inputs) => {
      const assets = parseFloat(inputs.assets), liabilities = parseFloat(inputs.liabilities) || 0
      if (!assets) return { results: [] }
      const netWorth = assets - liabilities
      return { results: [{ label: 'Net Worth', value: `$${netWorth.toLocaleString()}`, highlight: true }], pieData: [{ label: 'Net Worth', value: Math.max(0, netWorth), color: '#22c55e' }, { label: 'Liabilities', value: liabilities, color: '#ef4444' }], formula: { formula: 'Net Worth = Assets - Liabilities', explanation: 'Measure of financial health.' } }
    }
  },
  roi: {
    name: 'ROI Calculator', description: 'Return on investment', longDescription: 'Calculate return on investment.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'invested', label: 'Amount Invested ($)', placeholder: '10000' }, { id: 'returned', label: 'Amount Returned ($)', placeholder: '15000' }, { id: 'years', label: 'Years Held', placeholder: '2' }],
    calculate: (inputs) => {
      const invested = parseFloat(inputs.invested), returned = parseFloat(inputs.returned), years = parseFloat(inputs.years) || 1
      if (!invested || !returned) return { results: [] }
      const gain = returned - invested, roi = (gain / invested) * 100, annualized = (Math.pow(returned / invested, 1 / years) - 1) * 100
      return { results: [{ label: 'Total ROI', value: `${roi.toFixed(1)}%`, highlight: true }, { label: 'Gain', value: `$${gain.toLocaleString()}` }, { label: 'Annualized ROI', value: `${annualized.toFixed(1)}%` }], formula: { formula: 'ROI = (Return - Investment) / Investment × 100%', explanation: 'Annualized accounts for time.' } }
    }
  },
  apr: {
    name: 'APR Calculator', description: 'Annual percentage rate', longDescription: 'Calculate APR from interest rate and fees.', category: 'financial', icon: Percent,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '10000' }, { id: 'interest', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'fees', label: 'Fees ($)', placeholder: '500' }, { id: 'term', label: 'Term (years)', placeholder: '3' }],
    calculate: (inputs) => {
      const principal = parseFloat(inputs.principal), interest = parseFloat(inputs.interest), fees = parseFloat(inputs.fees) || 0, term = parseFloat(inputs.term)
      if (!principal || !term) return { results: [] }
      const totalCost = principal * interest / 100 * term + fees, apr = ((totalCost / principal) / term) * 100
      return { results: [{ label: 'APR', value: `${apr.toFixed(2)}%`, highlight: true }, { label: 'Total Cost', value: `$${totalCost.toLocaleString()}` }], formula: { formula: 'APR includes interest and fees', explanation: 'True cost of borrowing.' } }
    }
  },
  'debt-to-income': {
    name: 'Debt-to-Income Calculator', description: 'DTI ratio', longDescription: 'Calculate your debt-to-income ratio.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'debt', label: 'Monthly Debt Payments ($)', placeholder: '2000' }, { id: 'income', label: 'Gross Monthly Income ($)', placeholder: '6000' }],
    calculate: (inputs) => {
      const debt = parseFloat(inputs.debt), income = parseFloat(inputs.income)
      if (!debt || !income) return { results: [] }
      const dti = (debt / income) * 100
      let status: string
      if (dti <= 35) status = 'Good'
      else if (dti <= 43) status = 'Acceptable'
      else status = 'High Risk'
      return { results: [{ label: 'DTI Ratio', value: `${dti.toFixed(1)}%`, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'DTI = Monthly Debt / Gross Income × 100%', explanation: 'Lenders prefer DTI below 43%.' } }
    }
  },
  inflation: {
    name: 'Inflation Calculator', description: 'Adjust for inflation', longDescription: 'Adjust values for inflation over time.', category: 'financial', icon: TrendingDown,
    inputs: [{ id: 'amount', label: 'Amount ($)', placeholder: '100' }, { id: 'fromYear', label: 'From Year', placeholder: '2010' }, { id: 'toYear', label: 'To Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), fromYear = parseFloat(inputs.fromYear), toYear = parseFloat(inputs.toYear)
      if (!amount || !fromYear || !toYear) return { results: [] }
      const avgInflation = 0.025, years = toYear - fromYear
      const adjusted = amount * Math.pow(1 + avgInflation, years)
      return { results: [{ label: 'Adjusted Value', value: `$${adjusted.toFixed(2)}`, highlight: true }, { label: 'Purchasing Power Change', value: `${(((adjusted - amount) / amount) * 100).toFixed(1)}%` }], formula: { formula: 'FV = PV × (1 + inflation)^years', explanation: `Using ~2.5% average inflation.` } }
    }
  },
  currency: {
    name: 'Currency Converter', description: 'Convert currency', longDescription: 'Convert between major currencies (approximate).', category: 'financial', icon: Coins,
    inputs: [{ id: 'amount', label: 'Amount', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'usd', label: 'USD' }, { value: 'eur', label: 'EUR' }, { value: 'gbp', label: 'GBP' }, { value: 'jpy', label: 'JPY' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'eur', label: 'EUR' }, { value: 'usd', label: 'USD' }, { value: 'gbp', label: 'GBP' }, { value: 'jpy', label: 'JPY' }] }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount)
      if (!amount) return { results: [] }
      const rates: Record<string, Record<string, number>> = { usd: { eur: 0.92, gbp: 0.79, jpy: 149, usd: 1 }, eur: { usd: 1.09, gbp: 0.86, jpy: 162, eur: 1 }, gbp: { usd: 1.27, eur: 1.16, jpy: 189, gbp: 1 }, jpy: { usd: 0.0067, eur: 0.0062, gbp: 0.0053, jpy: 1 } }
      const rate = rates[inputs.from || 'usd']?.[inputs.to || 'eur'] || 1
      const result = amount * rate
      return { results: [{ label: 'Converted', value: `${result.toFixed(2)} ${inputs.to?.toUpperCase()}`, highlight: true }], formula: { formula: 'Approximate exchange rates', explanation: `${amount} ${inputs.from?.toUpperCase()} = ${result.toFixed(2)} ${inputs.to?.toUpperCase()}` }, infoCards: [{ title: 'Note', content: 'Rates are approximate. Check current rates for accuracy.', variant: 'info' }] }
    }
  },
  'break-even': {
    name: 'Break-Even Calculator', description: 'Business analysis', longDescription: 'Calculate break-even point for your business.', category: 'financial', icon: BarChart3,
    inputs: [{ id: 'fixed', label: 'Fixed Costs ($)', placeholder: '10000' }, { id: 'price', label: 'Price per Unit ($)', placeholder: '50' }, { id: 'variable', label: 'Variable Cost per Unit ($)', placeholder: '20' }],
    calculate: (inputs) => {
      const fixed = parseFloat(inputs.fixed), price = parseFloat(inputs.price), variable = parseFloat(inputs.variable)
      if (!fixed || !price || !variable) return { results: [] }
      const breakEven = fixed / (price - variable), revenue = breakEven * price
      return { results: [{ label: 'Break-Even Units', value: Math.ceil(breakEven), highlight: true }, { label: 'Break-Even Revenue', value: `$${Math.round(revenue).toLocaleString()}` }], formula: { formula: 'BE = Fixed Costs / (Price - Variable Cost)', explanation: 'Units needed to cover all costs.' } }
    }
  },
  amortization: {
    name: 'Amortization Calculator', description: 'Loan schedule', longDescription: 'Calculate loan amortization schedule.', category: 'financial', icon: FileText,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '200000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '6' }, { id: 'term', label: 'Term (years)', placeholder: '30' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.term) * 12
      if (!p || !r || !n) return { results: [] }
      const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const firstInterest = p * r, firstPrincipal = monthly - firstInterest
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'First Month Principal', value: `$${Math.round(firstPrincipal).toLocaleString()}` }, { label: 'First Month Interest', value: `$${Math.round(firstInterest).toLocaleString()}` }], formula: { formula: 'Standard amortization', explanation: 'Principal increases, interest decreases over time.' } }
    }
  },
  dividend: {
    name: 'Dividend Calculator', description: 'Dividend income', longDescription: 'Calculate dividend income and yield.', category: 'financial', icon: Coins,
    inputs: [{ id: 'shares', label: 'Number of Shares', placeholder: '100' }, { id: 'dividend', label: 'Dividend per Share ($)', placeholder: '2.50' }, { id: 'price', label: 'Stock Price ($)', placeholder: '100' }],
    calculate: (inputs) => {
      const shares = parseFloat(inputs.shares), dividend = parseFloat(inputs.dividend), price = parseFloat(inputs.price)
      if (!shares || !dividend) return { results: [] }
      const annual = shares * dividend * 4, yieldPercent = price ? (dividend * 4 / price) * 100 : 0
      return { results: [{ label: 'Annual Dividend', value: `$${annual.toLocaleString()}`, highlight: true }, { label: 'Quarterly Income', value: `$${(shares * dividend).toLocaleString()}` }, { label: 'Dividend Yield', value: `${yieldPercent.toFixed(2)}%` }], formula: { formula: 'Annual = Shares × Quarterly Dividend × 4', explanation: 'Assumes quarterly payments.' } }
    }
  },
  'cd-calculator': {
    name: 'CD Calculator', description: 'Certificate of Deposit', longDescription: 'Calculate CD returns.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'principal', label: 'Deposit Amount ($)', placeholder: '10000' }, { id: 'rate', label: 'APY (%)', placeholder: '5' }, { id: 'term', label: 'Term (months)', placeholder: '12' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.term) / 12
      if (!p || !r) return { results: [] }
      const interest = p * r * t, total = p + interest
      return { results: [{ label: 'Maturity Value', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Interest Earned', value: `$${Math.round(interest).toLocaleString()}` }], formula: { formula: 'Simple interest for CD', explanation: `${inputs.term} month term at ${inputs.rate}% APY.` } }
    }
  },
  refinance: {
    name: 'Refinance Calculator', description: 'Refinance analysis', longDescription: 'Analyze mortgage refinance savings.', category: 'financial', icon: Home,
    inputs: [{ id: 'balance', label: 'Current Balance ($)', placeholder: '250000' }, { id: 'currentRate', label: 'Current Rate (%)', placeholder: '7' }, { id: 'newRate', label: 'New Rate (%)', placeholder: '5' }, { id: 'remaining', label: 'Remaining Years', placeholder: '25' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), currentRate = parseFloat(inputs.currentRate) / 100 / 12, newRate = parseFloat(inputs.newRate) / 100 / 12, remaining = parseFloat(inputs.remaining) * 12
      if (!balance || !remaining) return { results: [] }
      const currentPayment = balance * (currentRate * Math.pow(1 + currentRate, remaining)) / (Math.pow(1 + currentRate, remaining) - 1)
      const newPayment = balance * (newRate * Math.pow(1 + newRate, remaining)) / (Math.pow(1 + newRate, remaining) - 1)
      const monthlySavings = currentPayment - newPayment, totalSavings = monthlySavings * remaining
      return { results: [{ label: 'Monthly Savings', value: `$${Math.round(monthlySavings).toLocaleString()}`, highlight: true }, { label: 'New Payment', value: `$${Math.round(newPayment).toLocaleString()}` }, { label: 'Total Savings', value: `$${Math.round(totalSavings).toLocaleString()}` }], formula: { formula: 'Compare payments at different rates', explanation: 'Refinancing can save money if rates drop.' } }
    }
  },
  payoff: {
    name: 'Debt Payoff Calculator', description: 'Debt payoff plan', longDescription: 'Calculate debt payoff timeline.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'balance', label: 'Current Balance ($)', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '18' }, { id: 'payment', label: 'Monthly Payment ($)', placeholder: '200' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), rate = parseFloat(inputs.rate) / 100 / 12, payment = parseFloat(inputs.payment)
      if (!balance || !payment) return { results: [] }
      if (payment <= balance * rate) return { results: [{ label: 'Error', value: 'Payment too low' }] }
      const months = Math.ceil(-Math.log(1 - (balance * rate / payment)) / Math.log(1 + rate))
      const totalPaid = payment * months, interest = totalPaid - balance
      return { results: [{ label: 'Months to Pay Off', value: months, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }, { label: 'Total Paid', value: `$${Math.round(totalPaid).toLocaleString()}` }], formula: { formula: 'Amortization formula', explanation: 'Higher payments = less interest.' } }
    }
  },
  // ADDITIONAL MATH CALCULATORS
  lcm: {
    name: 'LCM Calculator', description: 'Least Common Multiple', longDescription: 'Find LCM of numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '4, 6, 8' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
      let result = nums[0]
      for (let i = 1; i < nums.length; i++) result = lcm(result, nums[i])
      return { results: [{ label: 'LCM', value: result, highlight: true }], formula: { formula: 'LCM = (a × b) / GCD(a, b)', explanation: `LCM of ${nums.join(', ')} is ${result}` } }
    }
  },
  factorial: {
    name: 'Factorial Calculator', description: 'Calculate n!', longDescription: 'Calculate factorial of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number (0-170)', placeholder: '5' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 0 || n > 170) return { results: [{ label: 'Error', value: 'Enter 0-170' }] }
      let result = 1
      for (let i = 2; i <= n; i++) result *= i
      return { results: [{ label: `${n}!`, value: result.toLocaleString(), highlight: true }], formula: { formula: 'n! = n × (n-1) × ... × 1', explanation: `Factorial of ${n}` } }
    }
  },
  exponent: {
    name: 'Exponent Calculator', description: 'Calculate powers', longDescription: 'Calculate base raised to exponent.', category: 'math', icon: Calculator,
    inputs: [{ id: 'base', label: 'Base', placeholder: '2' }, { id: 'exponent', label: 'Exponent', placeholder: '10' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), exp = parseFloat(inputs.exponent)
      if (isNaN(base) || isNaN(exp)) return { results: [] }
      const result = Math.pow(base, exp)
      return { results: [{ label: 'Result', value: result.toLocaleString(), highlight: true }], formula: { formula: `${base}^${exp}`, explanation: `${base} raised to power ${exp}` } }
    }
  },
  logarithm: {
    name: 'Logarithm Calculator', description: 'Calculate logs', longDescription: 'Calculate logarithms.', category: 'math', icon: Divide,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'base', label: 'Base', placeholder: '10' }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value), base = parseFloat(inputs.base) || 10
      if (isNaN(value) || value <= 0) return { results: [{ label: 'Error', value: 'Enter positive number' }] }
      const result = Math.log(value) / Math.log(base)
      return { results: [{ label: `log${base}(${value})`, value: result.toFixed(6), highlight: true }], formula: { formula: 'log_b(x) = ln(x) / ln(b)', explanation: 'Change of base formula.' } }
    }
  },
  fraction: {
    name: 'Fraction Calculator', description: 'Work with fractions', longDescription: 'Perform fraction operations.', category: 'math', icon: Divide,
    inputs: [{ id: 'num1', label: 'Numerator 1', placeholder: '1' }, { id: 'den1', label: 'Denominator 1', placeholder: '2' }, { id: 'op', label: 'Operation', placeholder: '', type: 'select', options: [{ value: 'add', label: '+' }, { value: 'sub', label: '-' }, { value: 'mul', label: '×' }, { value: 'div', label: '÷' }] }, { id: 'num2', label: 'Numerator 2', placeholder: '1' }, { id: 'den2', label: 'Denominator 2', placeholder: '4' }],
    calculate: (inputs) => {
      const n1 = parseFloat(inputs.num1), d1 = parseFloat(inputs.den1), n2 = parseFloat(inputs.num2), d2 = parseFloat(inputs.den2)
      if (!d1 || !d2) return { results: [{ label: 'Error', value: 'Invalid denominators' }] }
      let rn: number, rd: number
      switch (inputs.op) {
        case 'add': rn = n1 * d2 + n2 * d1; rd = d1 * d2; break
        case 'sub': rn = n1 * d2 - n2 * d1; rd = d1 * d2; break
        case 'mul': rn = n1 * n2; rd = d1 * d2; break
        case 'div': rn = n1 * d2; rd = d1 * n2; break
        default: return { results: [] }
      }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const g = Math.abs(gcd(rn, rd))
      return { results: [{ label: 'Result', value: `${rn}/${rd}`, highlight: true }, { label: 'Simplified', value: `${rn/g}/${Math.abs(rd/g)}` }], formula: { formula: 'Fraction arithmetic', explanation: 'Standard fraction operations.' } }
    }
  },
  quadratic: {
    name: 'Quadratic Equation', description: 'Solve ax² + bx + c = 0', longDescription: 'Solve quadratic equations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'a', label: 'a', placeholder: '1' }, { id: 'b', label: 'b', placeholder: '-5' }, { id: 'c', label: 'c', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a) return { results: [{ label: 'Error', value: 'a cannot be 0' }] }
      const discriminant = b * b - 4 * a * c
      if (discriminant < 0) return { results: [{ label: 'Solutions', value: 'Complex (no real roots)' }] }
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a), x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      return { results: [{ label: 'x₁', value: x1.toFixed(4), highlight: true }, { label: 'x₂', value: x2.toFixed(4), highlight: true }], formula: { formula: 'x = (-b ± √(b²-4ac)) / 2a', explanation: 'Quadratic formula.' } }
    }
  },
  ratio: {
    name: 'Ratio Calculator', description: 'Solve ratios', longDescription: 'Solve ratio problems.', category: 'math', icon: Divide,
    inputs: [{ id: 'a', label: 'A', placeholder: '3' }, { id: 'b', label: 'B', placeholder: '4' }, { id: 'c', label: 'C', placeholder: '6' }, { id: 'findD', label: 'Find D', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }] }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a || !b || !c) return { results: [] }
      const d = (b * c) / a
      return { results: [{ label: 'D', value: d.toFixed(2), highlight: true }, { label: 'Ratio', value: `${a}:${b} = ${c}:${d.toFixed(2)}` }], formula: { formula: 'A/B = C/D', explanation: 'Cross multiplication.' } }
    }
  },
  pythagorean: {
    name: 'Pythagorean Calculator', description: 'Triangle sides', longDescription: 'Calculate triangle sides using Pythagorean theorem.', category: 'math', icon: Ruler,
    inputs: [{ id: 'a', label: 'Side a', placeholder: '3' }, { id: 'b', label: 'Side b', placeholder: '4' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b)
      if (!a || !b) return { results: [] }
      const c = Math.sqrt(a * a + b * b)
      return { results: [{ label: 'Hypotenuse (c)', value: c.toFixed(4), highlight: true }], formula: { formula: 'a² + b² = c²', explanation: `√(${a}² + ${b}²) = ${c.toFixed(4)}` } }
    }
  },
  'circle-area': {
    name: 'Circle Area Calculator', description: 'Area & circumference', longDescription: 'Calculate circle area and circumference.', category: 'math', icon: Target,
    inputs: [{ id: 'radius', label: 'Radius', placeholder: '5' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.radius)
      if (!r) return { results: [] }
      const area = Math.PI * r * r, circumference = 2 * Math.PI * r
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }, { label: 'Circumference', value: circumference.toFixed(4) }], formula: { formula: 'A = πr², C = 2πr', explanation: `π = ${Math.PI.toFixed(6)}` } }
    }
  },
  'triangle-area': {
    name: 'Triangle Area Calculator', description: 'Calculate area', longDescription: 'Calculate triangle area.', category: 'math', icon: Target,
    inputs: [{ id: 'base', label: 'Base', placeholder: '10' }, { id: 'height', label: 'Height', placeholder: '5' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), height = parseFloat(inputs.height)
      if (!base || !height) return { results: [] }
      const area = 0.5 * base * height
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }], formula: { formula: 'Area = ½ × base × height', explanation: `½ × ${base} × ${height} = ${area}` } }
    }
  },
  rectangle: {
    name: 'Rectangle Calculator', description: 'Area & perimeter', longDescription: 'Calculate rectangle area and perimeter.', category: 'math', icon: Square,
    inputs: [{ id: 'length', label: 'Length', placeholder: '10' }, { id: 'width', label: 'Width', placeholder: '5' }],
    calculate: (inputs) => {
      const l = parseFloat(inputs.length), w = parseFloat(inputs.width)
      if (!l || !w) return { results: [] }
      const area = l * w, perimeter = 2 * (l + w)
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }, { label: 'Perimeter', value: perimeter.toFixed(4) }], formula: { formula: 'A = L × W, P = 2(L + W)', explanation: `Length: ${l}, Width: ${w}` } }
    }
  },
  volume: {
    name: 'Volume Calculator', description: '3D volumes', longDescription: 'Calculate volumes of 3D shapes.', category: 'math', icon: Target,
    inputs: [{ id: 'shape', label: 'Shape', placeholder: '', type: 'select', options: [{ value: 'cube', label: 'Cube' }, { value: 'sphere', label: 'Sphere' }, { value: 'cylinder', label: 'Cylinder' }] }, { id: 'r', label: 'Side/Radius', placeholder: '5' }, { id: 'h', label: 'Height (cylinder)', placeholder: '10' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.r), h = parseFloat(inputs.h), shape = inputs.shape || 'cube'
      if (!r) return { results: [] }
      let volume: number
      switch (shape) {
        case 'cube': volume = r * r * r; break
        case 'sphere': volume = (4 / 3) * Math.PI * Math.pow(r, 3); break
        case 'cylinder': volume = Math.PI * r * r * (h || r); break
        default: volume = 0
      }
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }], formula: { formula: shape === 'cube' ? 'V = s³' : shape === 'sphere' ? 'V = 4/3 πr³' : 'V = πr²h', explanation: `${shape} volume.` } }
    }
  },
  'speed-distance-time': {
    name: 'Speed/Distance/Time', description: 'Calculate any', longDescription: 'Calculate speed, distance, or time.', category: 'math', icon: Timer,
    inputs: [{ id: 'find', label: 'Find', placeholder: '', type: 'select', options: [{ value: 'speed', label: 'Speed' }, { value: 'distance', label: 'Distance' }, { value: 'time', label: 'Time' }] }, { id: 'v1', label: 'Speed (km/h)', placeholder: '60' }, { id: 'v2', label: 'Distance (km)', placeholder: '120' }, { id: 'v3', label: 'Time (hours)', placeholder: '2' }],
    calculate: (inputs) => {
      const find = inputs.find, speed = parseFloat(inputs.v1), distance = parseFloat(inputs.v2), time = parseFloat(inputs.v3)
      let result: number, label: string
      switch (find) {
        case 'speed': result = distance / time; label = 'Speed'; break
        case 'distance': result = speed * time; label = 'Distance'; break
        case 'time': result = distance / speed; label = 'Time'; break
        default: return { results: [] }
      }
      return { results: [{ label, value: result.toFixed(2), highlight: true }], formula: { formula: 'Speed = Distance / Time', explanation: 'Basic motion equation.' } }
    }
  },
  probability: {
    name: 'Probability Calculator', description: 'Calculate probability', longDescription: 'Calculate probability of events.', category: 'math', icon: Target,
    inputs: [{ id: 'favorable', label: 'Favorable Outcomes', placeholder: '3' }, { id: 'total', label: 'Total Outcomes', placeholder: '6' }],
    calculate: (inputs) => {
      const favorable = parseFloat(inputs.favorable), total = parseFloat(inputs.total)
      if (!total) return { results: [] }
      const prob = favorable / total, percent = prob * 100
      return { results: [{ label: 'Probability', value: prob.toFixed(4), highlight: true }, { label: 'Percentage', value: `${percent.toFixed(2)}%` }], formula: { formula: 'P = Favorable / Total', explanation: `${favorable} out of ${total}` } }
    }
  },
  'prime-checker': {
    name: 'Prime Checker', description: 'Check if prime', longDescription: 'Check if a number is prime.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '17' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 2) return { results: [{ label: 'Result', value: 'Enter number ≥ 2' }] }
      let isPrime = true
      for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) { isPrime = false; break } }
      return { results: [{ label: 'Is Prime?', value: isPrime ? 'YES' : 'NO', highlight: true }], formula: { formula: 'Check divisibility up to √n', explanation: `${n} ${isPrime ? 'is' : 'is not'} a prime number.` } }
    }
  },
  fibonacci: {
    name: 'Fibonacci Generator', description: 'Generate sequence', longDescription: 'Generate Fibonacci numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'How many terms (1-50)', placeholder: '10' }],
    calculate: (inputs) => {
      const n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const fib: number[] = [0, 1]
      for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2])
      return { results: [{ label: `First ${n} terms`, value: fib.slice(0, n).join(', '), highlight: true }], formula: { formula: 'F(n) = F(n-1) + F(n-2)', explanation: 'Each number is sum of two before.' } }
    }
  },
  'arithmetic-seq': {
    name: 'Arithmetic Sequence', description: 'Calculate sequence', longDescription: 'Generate arithmetic sequence.', category: 'math', icon: Hash,
    inputs: [{ id: 'a', label: 'First Term', placeholder: '2' }, { id: 'd', label: 'Common Difference', placeholder: '3' }, { id: 'n', label: 'Number of Terms', placeholder: '10' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), d = parseFloat(inputs.d), n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      if (isNaN(a) || isNaN(d)) return { results: [] }
      const seq: number[] = []
      for (let i = 0; i < n; i++) seq.push(a + i * d)
      const sum = (n * (2 * a + (n - 1) * d)) / 2
      return { results: [{ label: 'Sequence', value: seq.join(', '), highlight: true }, { label: 'Sum', value: sum.toFixed(2) }], formula: { formula: 'aₙ = a + (n-1)d', explanation: 'Arithmetic progression.' } }
    }
  },
  'geometric-seq': {
    name: 'Geometric Sequence', description: 'Calculate sequence', longDescription: 'Generate geometric sequence.', category: 'math', icon: Hash,
    inputs: [{ id: 'a', label: 'First Term', placeholder: '2' }, { id: 'r', label: 'Common Ratio', placeholder: '3' }, { id: 'n', label: 'Number of Terms', placeholder: '10' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), r = parseFloat(inputs.r), n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      if (isNaN(a) || isNaN(r)) return { results: [] }
      const seq: number[] = []
      for (let i = 0; i < n; i++) seq.push(a * Math.pow(r, i))
      const sum = a * (Math.pow(r, n) - 1) / (r - 1)
      return { results: [{ label: 'Sequence', value: seq.join(', '), highlight: true }, { label: 'Sum', value: sum.toFixed(2) }], formula: { formula: 'aₙ = a × r^(n-1)', explanation: 'Geometric progression.' } }
    }
  },
  'complex-numbers': {
    name: 'Complex Numbers', description: 'Complex math', longDescription: 'Perform complex number operations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'a1', label: 'Real Part 1', placeholder: '3' }, { id: 'b1', label: 'Imaginary Part 1', placeholder: '4' }, { id: 'op', label: 'Operation', placeholder: '', type: 'select', options: [{ value: 'add', label: 'Add' }, { value: 'mul', label: 'Multiply' }, { value: 'mag', label: 'Magnitude' }] }, { id: 'a2', label: 'Real Part 2', placeholder: '1' }, { id: 'b2', label: 'Imaginary Part 2', placeholder: '2' }],
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.a1) || 0, b1 = parseFloat(inputs.b1) || 0, a2 = parseFloat(inputs.a2) || 0, b2 = parseFloat(inputs.b2) || 0
      let real: number, imag: number, label: string
      switch (inputs.op) {
        case 'add': real = a1 + a2; imag = b1 + b2; label = 'Sum'; break
        case 'mul': real = a1 * a2 - b1 * b2; imag = a1 * b2 + b1 * a2; label = 'Product'; break
        case 'mag': real = Math.sqrt(a1 * a1 + b1 * b1); imag = 0; label = 'Magnitude'; break
        default: return { results: [] }
      }
      return { results: [{ label, value: inputs.op === 'mag' ? real.toFixed(4) : `${real} + ${imag}i`, highlight: true }], formula: { formula: inputs.op === 'mag' ? '|z| = √(a² + b²)' : 'Complex arithmetic', explanation: 'Operations on complex numbers.' } }
    }
  },
  // ADDITIONAL MATH CALCULATORS
  'cube-root': {
    name: 'Cube Root', description: 'Calculate ∛x', longDescription: 'Calculate the cube root of any number.', category: 'math', icon: Square,
    inputs: [{ id: 'value', label: 'Number', placeholder: '27' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v)) return { results: [] }
      const result = Math.cbrt(v)
      return { results: [{ label: 'Cube Root', value: result.toFixed(6), highlight: true }, { label: 'Verification', value: `${result.toFixed(6)}³ = ${Math.pow(result, 3).toFixed(4)}` }], formula: { formula: '∛x = x^(1/3)', explanation: `∛${v} = ${result.toFixed(6)}` } }
    }
  },
  'absolute-value': {
    name: 'Absolute Value', description: 'Calculate |x|', longDescription: 'Calculate the absolute value (magnitude) of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'value', label: 'Number', placeholder: '-42' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v)) return { results: [] }
      return { results: [{ label: '|x|', value: Math.abs(v), highlight: true }, { label: 'Original', value: v }], formula: { formula: '|x| = x if x ≥ 0, else -x', explanation: `|${v}| = ${Math.abs(v)}` } }
    }
  },
  'round-numbers': {
    name: 'Round Numbers', description: 'Rounding options', longDescription: 'Round numbers to specified decimal places.', category: 'math', icon: Calculator,
    inputs: [{ id: 'value', label: 'Number', placeholder: '3.14159' }, { id: 'decimals', label: 'Decimal Places', placeholder: '2' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value), d = Math.max(0, Math.min(10, parseInt(inputs.decimals) || 0))
      if (isNaN(v)) return { results: [] }
      return { results: [{ label: 'Rounded', value: v.toFixed(d), highlight: true }, { label: 'Original', value: v }], formula: { formula: 'Round to n decimal places', explanation: `${v} rounded to ${d} decimal places` } }
    }
  },
  'ceiling-floor': {
    name: 'Ceiling & Floor', description: 'Round up/down', longDescription: 'Calculate ceiling (round up) and floor (round down) values.', category: 'math', icon: Hash,
    inputs: [{ id: 'value', label: 'Number', placeholder: '3.7' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v)) return { results: [] }
      return { results: [{ label: 'Ceiling ⌈x⌉', value: Math.ceil(v), highlight: true }, { label: 'Floor ⌊x⌋', value: Math.floor(v), highlight: true }, { label: 'Original', value: v }], formula: { formula: '⌈x⌉ = smallest integer ≥ x, ⌊x⌋ = largest integer ≤ x', explanation: 'Ceiling rounds up, Floor rounds down' } }
    }
  },
  'modulo': {
    name: 'Modulo Calculator', description: 'Remainder', longDescription: 'Calculate the remainder of division (modulo operation).', category: 'math', icon: Divide,
    inputs: [{ id: 'dividend', label: 'Dividend', placeholder: '17' }, { id: 'divisor', label: 'Divisor', placeholder: '5' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.dividend), b = parseFloat(inputs.divisor)
      if (isNaN(a) || isNaN(b) || b === 0) return { results: [{ label: 'Error', value: b === 0 ? 'Cannot divide by zero' : 'Invalid input' }] }
      const quotient = Math.floor(a / b), remainder = a % b
      return { results: [{ label: 'Remainder', value: remainder, highlight: true }, { label: 'Quotient', value: quotient }, { label: 'Expression', value: `${a} = ${b} × ${quotient} + ${remainder}` }], formula: { formula: 'a mod b = a - b × ⌊a/b⌋', explanation: `${a} mod ${b} = ${remainder}` } }
    }
  },
  'percentage-difference': {
    name: 'Percentage Difference', description: 'Between two numbers', longDescription: 'Calculate the percentage difference between two numbers.', category: 'math', icon: Percent,
    inputs: [{ id: 'value1', label: 'First Value', placeholder: '50' }, { id: 'value2', label: 'Second Value', placeholder: '75' }],
    calculate: (inputs) => {
      const v1 = parseFloat(inputs.value1), v2 = parseFloat(inputs.value2)
      if (isNaN(v1) || isNaN(v2)) return { results: [] }
      const avg = (v1 + v2) / 2, diff = Math.abs(v1 - v2), pctDiff = (diff / avg) * 100
      return { results: [{ label: 'Difference', value: diff.toFixed(2) }, { label: '% Difference', value: `${pctDiff.toFixed(2)}%`, highlight: true }, { label: 'Average', value: avg.toFixed(2) }], formula: { formula: '% Diff = |V1-V2| / ((V1+V2)/2) × 100', explanation: 'Percentage difference relative to average' } }
    }
  },
  'percentage-error': {
    name: 'Percentage Error', description: 'Error calculation', longDescription: 'Calculate percentage error between experimental and theoretical values.', category: 'math', icon: Target,
    inputs: [{ id: 'experimental', label: 'Experimental Value', placeholder: '9.5' }, { id: 'theoretical', label: 'Theoretical Value', placeholder: '10' }],
    calculate: (inputs) => {
      const exp = parseFloat(inputs.experimental), theo = parseFloat(inputs.theoretical)
      if (isNaN(exp) || isNaN(theo) || theo === 0) return { results: [] }
      const error = Math.abs(exp - theo), pctError = (error / Math.abs(theo)) * 100
      return { results: [{ label: 'Absolute Error', value: error.toFixed(4) }, { label: '% Error', value: `${pctError.toFixed(2)}%`, highlight: true }], formula: { formula: '% Error = |Experimental - Theoretical| / |Theoretical| × 100', explanation: 'Accuracy of experimental measurement' } }
    }
  },
  'proportion-calc': {
    name: 'Proportion Calculator', description: 'Solve proportions', longDescription: 'Solve proportion problems: A is to B as C is to X.', category: 'math', icon: Divide,
    inputs: [{ id: 'a', label: 'A', placeholder: '3' }, { id: 'b', label: 'B', placeholder: '4' }, { id: 'c', label: 'C', placeholder: '15' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a || !b || isNaN(c)) return { results: [] }
      const x = (b * c) / a
      return { results: [{ label: 'X (unknown)', value: x.toFixed(4), highlight: true }, { label: 'Proportion', value: `${a} : ${b} = ${c} : ${x.toFixed(2)}` }], formula: { formula: 'A/B = C/X → X = (B × C) / A', explanation: 'Cross multiplication to solve proportion' } }
    }
  },
  'inverse-percentage': {
    name: 'Inverse Percentage', description: 'Find original', longDescription: 'Find the original value before a percentage change.', category: 'math', icon: Percent,
    inputs: [{ id: 'finalValue', label: 'Final Value', placeholder: '120' }, { id: 'percentage', label: 'Percentage Change', placeholder: '20' }, { id: 'type', label: 'Change Type', placeholder: '', type: 'select', options: [{ value: 'increase', label: 'Increase' }, { value: 'decrease', label: 'Decrease' }] }],
    calculate: (inputs) => {
      const final = parseFloat(inputs.finalValue), pct = parseFloat(inputs.percentage)
      if (isNaN(final) || isNaN(pct)) return { results: [] }
      let original: number
      if (inputs.type === 'increase') original = final / (1 + pct / 100)
      else original = final / (1 - pct / 100)
      return { results: [{ label: 'Original Value', value: original.toFixed(2), highlight: true }, { label: 'Final Value', value: final }], formula: { formula: inputs.type === 'increase' ? 'Original = Final / (1 + %)' : 'Original = Final / (1 - %)', explanation: `Before ${pct}% ${inputs.type}` } }
    }
  },
  'markup-margin': {
    name: 'Markup & Margin', description: 'Business pricing', longDescription: 'Calculate markup and profit margin for pricing.', category: 'math', icon: DollarSign,
    inputs: [{ id: 'cost', label: 'Cost ($)', placeholder: '50' }, { id: 'price', label: 'Selling Price ($)', placeholder: '75' }],
    calculate: (inputs) => {
      const cost = parseFloat(inputs.cost), price = parseFloat(inputs.price)
      if (isNaN(cost) || isNaN(price) || cost === 0) return { results: [] }
      const profit = price - cost, markup = (profit / cost) * 100, margin = (profit / price) * 100
      return { results: [{ label: 'Profit', value: `$${profit.toFixed(2)}` }, { label: 'Markup', value: `${markup.toFixed(2)}%`, highlight: true }, { label: 'Margin', value: `${margin.toFixed(2)}%`, highlight: true }], formula: { formula: 'Markup = Profit/Cost × 100%, Margin = Profit/Price × 100%', explanation: 'Markup is on cost, margin is on price' } }
    }
  },
  'tax-equivalent': {
    name: 'Tax Equivalent', description: 'Pre-tax amount', longDescription: 'Calculate the original amount before tax was added.', category: 'math', icon: Receipt,
    inputs: [{ id: 'totalWithTax', label: 'Total with Tax ($)', placeholder: '110' }, { id: 'taxRate', label: 'Tax Rate (%)', placeholder: '10' }],
    calculate: (inputs) => {
      const total = parseFloat(inputs.totalWithTax), rate = parseFloat(inputs.taxRate)
      if (isNaN(total) || isNaN(rate)) return { results: [] }
      const preTax = total / (1 + rate / 100), taxAmount = total - preTax
      return { results: [{ label: 'Pre-tax Amount', value: `$${preTax.toFixed(2)}`, highlight: true }, { label: 'Tax Amount', value: `$${taxAmount.toFixed(2)}` }], formula: { formula: 'Pre-tax = Total / (1 + Tax Rate)', explanation: `${rate}% tax on $${preTax.toFixed(2)} = $${taxAmount.toFixed(2)}` } }
    }
  },
  'number-sequence': {
    name: 'Number Sequence', description: 'Generate patterns', longDescription: 'Generate number sequences with custom patterns.', category: 'math', icon: Hash,
    inputs: [{ id: 'start', label: 'Start', placeholder: '1' }, { id: 'step', label: 'Step', placeholder: '2' }, { id: 'count', label: 'Count', placeholder: '10' }],
    calculate: (inputs) => {
      const start = parseFloat(inputs.start) || 0, step = parseFloat(inputs.step) || 1, count = Math.min(50, Math.max(1, parseInt(inputs.count) || 10))
      const seq: number[] = []
      for (let i = 0; i < count; i++) seq.push(start + i * step)
      const sum = seq.reduce((a, b) => a + b, 0)
      return { results: [{ label: 'Sequence', value: seq.join(', '), highlight: true }, { label: 'Sum', value: sum.toFixed(2) }], formula: { formula: 'aₙ = start + (n-1) × step', explanation: `Arithmetic sequence starting at ${start}` } }
    }
  },
  'collatz-sequence': {
    name: 'Collatz Sequence', description: '3n+1 problem', longDescription: 'Generate the Collatz sequence (3n+1 conjecture).', category: 'math', icon: Hash,
    inputs: [{ id: 'start', label: 'Starting Number', placeholder: '27' }],
    calculate: (inputs) => {
      let n = parseInt(inputs.start)
      if (isNaN(n) || n < 1) return { results: [{ label: 'Error', value: 'Enter positive integer' }] }
      const seq: number[] = [n], maxIter = 1000
      let iter = 0
      while (n !== 1 && iter < maxIter) { n = n % 2 === 0 ? n / 2 : 3 * n + 1; seq.push(n); iter++ }
      return { results: [{ label: 'Sequence', value: seq.slice(0, 20).join(' → ') + (seq.length > 20 ? '...' : ''), highlight: true }, { label: 'Steps to 1', value: seq.length - 1 }, { label: 'Max Value', value: Math.max(...seq) }], formula: { formula: 'n even: n/2, n odd: 3n+1', explanation: 'Collatz conjecture: always reaches 1' } }
    }
  },
  'triangular-numbers': {
    name: 'Triangular Numbers', description: 'Triangle numbers', longDescription: 'Generate triangular number sequence.', category: 'math', icon: Target,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = []
      for (let i = 1; i <= count; i++) seq.push((i * (i + 1)) / 2)
      return { results: [{ label: 'Triangular Numbers', value: seq.join(', '), highlight: true }, { label: 'Formula', value: 'Tₙ = n(n+1)/2' }], formula: { formula: 'Tₙ = n(n+1)/2', explanation: 'Sum of first n natural numbers' } }
    }
  },
  'square-numbers': {
    name: 'Square Numbers', description: 'Perfect squares', longDescription: 'Generate perfect square number sequence.', category: 'math', icon: Square,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = []
      for (let i = 1; i <= count; i++) seq.push(i * i)
      return { results: [{ label: 'Square Numbers', value: seq.join(', '), highlight: true }, { label: 'Formula', value: 'n²' }], formula: { formula: 'Sₙ = n²', explanation: 'Perfect squares: 1, 4, 9, 16, 25...' } }
    }
  },
  'cube-numbers': {
    name: 'Cube Numbers', description: 'Perfect cubes', longDescription: 'Generate perfect cube number sequence.', category: 'math', icon: Square,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = []
      for (let i = 1; i <= count; i++) seq.push(i * i * i)
      return { results: [{ label: 'Cube Numbers', value: seq.join(', '), highlight: true }, { label: 'Formula', value: 'n³' }], formula: { formula: 'Cₙ = n³', explanation: 'Perfect cubes: 1, 8, 27, 64, 125...' } }
    }
  },
  'prime-factors': {
    name: 'Prime Factors', description: 'Factorize', longDescription: 'Find all prime factors of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '84' }],
    calculate: (inputs) => {
      let n = parseInt(inputs.n)
      if (isNaN(n) || n < 2) return { results: [{ label: 'Error', value: 'Enter integer ≥ 2' }] }
      const factors: number[] = []
      let d = 2
      while (d * d <= n) { while (n % d === 0) { factors.push(d); n /= d }; d++ }
      if (n > 1) factors.push(n)
      const factorization = factors.join(' × ')
      return { results: [{ label: 'Prime Factors', value: factorization, highlight: true }, { label: 'Unique Factors', value: [...new Set(factors)].join(', ') }], formula: { formula: 'Trial division', explanation: 'Break down into prime factors' } }
    }
  },
  'divisor-count': {
    name: 'Divisor Count', description: 'Number of divisors', longDescription: 'Count all divisors (factors) of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '36' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 1) return { results: [{ label: 'Error', value: 'Enter positive integer' }] }
      const divisors: number[] = []
      for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) { divisors.push(i); if (i !== n / i) divisors.push(n / i) }
      }
      divisors.sort((a, b) => a - b)
      return { results: [{ label: 'Divisor Count (d(n))', value: divisors.length, highlight: true }, { label: 'All Divisors', value: divisors.join(', ') }], formula: { formula: 'Count all factors including 1 and n', explanation: `d(${n}) = ${divisors.length}` } }
    }
  },
  'perfect-number': {
    name: 'Perfect Number Checker', description: 'Check perfect', longDescription: 'Check if a number is a perfect number.', category: 'math', icon: Star,
    inputs: [{ id: 'n', label: 'Number', placeholder: '28' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 2) return { results: [{ label: 'Error', value: 'Enter integer ≥ 2' }] }
      let sum = 0
      for (let i = 1; i < n; i++) { if (n % i === 0) sum += i }
      const isPerfect = sum === n
      return { results: [{ label: 'Is Perfect Number?', value: isPerfect ? 'YES ✓' : 'NO ✗', highlight: true }, { label: 'Sum of Proper Divisors', value: sum }, { label: 'Number', value: n }], formula: { formula: 'Perfect: Sum of proper divisors = n', explanation: isPerfect ? `${n} = ${sum} (perfect!)` : `Sum = ${sum} ≠ ${n}` } }
    }
  },
  'palindrome-number': {
    name: 'Palindrome Number', description: 'Check palindrome', longDescription: 'Check if a number reads the same forwards and backwards.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '12321' }],
    calculate: (inputs) => {
      const n = inputs.n.replace(/[^0-9]/g, '')
      if (!n) return { results: [] }
      const reversed = n.split('').reverse().join('')
      const isPalindrome = n === reversed
      return { results: [{ label: 'Is Palindrome?', value: isPalindrome ? 'YES ✓' : 'NO ✗', highlight: true }, { label: 'Original', value: n }, { label: 'Reversed', value: reversed }], formula: { formula: 'Number = Reversed', explanation: isPalindrome ? 'Reads same both ways' : 'Not the same backwards' } }
    }
  },
  'armstrong-number': {
    name: 'Armstrong Number', description: 'Narcissistic check', longDescription: 'Check if a number is an Armstrong (narcissistic) number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '153' }],
    calculate: (inputs) => {
      const n = inputs.n.trim()
      if (!n || !/^\d+$/.test(n)) return { results: [] }
      const digits = n.split('').map(Number)
      const power = digits.length
      const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0)
      const isArmstrong = sum === parseInt(n)
      const breakdown = digits.map(d => `${d}^${power}`).join(' + ')
      return { results: [{ label: 'Is Armstrong?', value: isArmstrong ? 'YES ✓' : 'NO ✗', highlight: true }, { label: 'Calculation', value: `${breakdown} = ${sum}` }], formula: { formula: 'Sum of digits^n = number', explanation: isArmstrong ? `${n} is narcissistic!` : `${sum} ≠ ${n}` } }
    }
  },
  'fibonacci-nth': {
    name: 'Nth Fibonacci', description: 'Find nth term', longDescription: 'Calculate the nth Fibonacci number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Term (n)', placeholder: '10' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 1) return { results: [{ label: 'Error', value: 'Enter positive integer' }] }
      if (n > 1000) return { results: [{ label: 'Error', value: 'Max n = 1000' }] }
      let a = 0, b = 1
      for (let i = 2; i <= n; i++) { [a, b] = [b, a + b] }
      const result = n === 1 ? 0 : b
      return { results: [{ label: `F(${n})`, value: result.toLocaleString(), highlight: true }, { label: 'Sequence Position', value: `Position ${n}` }], formula: { formula: 'F(n) = F(n-1) + F(n-2)', explanation: 'F(1)=0, F(2)=1, F(3)=1, ...' } }
    }
  },
  'lucas-numbers': {
    name: 'Lucas Numbers', description: 'Lucas sequence', longDescription: 'Generate Lucas number sequence (similar to Fibonacci).', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = [2, 1]
      for (let i = 2; i < count; i++) seq.push(seq[i - 1] + seq[i - 2])
      return { results: [{ label: 'Lucas Sequence', value: seq.slice(0, count).join(', '), highlight: true }], formula: { formula: 'L(n) = L(n-1) + L(n-2), L(0)=2, L(1)=1', explanation: 'Like Fibonacci but starts 2, 1' } }
    }
  },
  'pell-numbers': {
    name: 'Pell Numbers', description: 'Pell sequence', longDescription: 'Generate Pell number sequence.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(30, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = [0, 1]
      for (let i = 2; i < count; i++) seq.push(2 * seq[i - 1] + seq[i - 2])
      return { results: [{ label: 'Pell Sequence', value: seq.slice(0, count).join(', '), highlight: true }], formula: { formula: 'P(n) = 2×P(n-1) + P(n-2)', explanation: 'P(0)=0, P(1)=1' } }
    }
  },
  'catalan-numbers': {
    name: 'Catalan Numbers', description: 'Catalan sequence', longDescription: 'Generate Catalan number sequence (combinatorial).', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'How many terms', placeholder: '10' }],
    calculate: (inputs) => {
      const count = Math.min(20, Math.max(1, parseInt(inputs.n) || 10))
      const seq: number[] = []
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      for (let i = 0; i < count; i++) seq.push(factorial(2 * i) / (factorial(i + 1) * factorial(i)))
      return { results: [{ label: 'Catalan Sequence', value: seq.join(', '), highlight: true }], formula: { formula: 'C(n) = (2n)! / ((n+1)! × n!)', explanation: 'Used in counting problems' } }
    }
  },
  'binomial-coefficient': {
    name: 'Binomial Coefficient', description: 'n choose k', longDescription: 'Calculate binomial coefficient (n choose k).', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'n', placeholder: '10' }, { id: 'k', label: 'k', placeholder: '3' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n), k = parseInt(inputs.k)
      if (isNaN(n) || isNaN(k) || k < 0 || k > n) return { results: [{ label: 'Error', value: 'Invalid: need 0 ≤ k ≤ n' }] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const result = factorial(n) / (factorial(k) * factorial(n - k))
      return { results: [{ label: `C(${n},${k})`, value: result.toLocaleString(), highlight: true }, { label: 'Formula', value: `${n}! / (${k}! × ${n-k}!)` }], formula: { formula: 'C(n,k) = n! / (k! × (n-k)!)', explanation: 'Number of ways to choose k items from n' } }
    }
  },
  'hyperbolic-functions': {
    name: 'Hyperbolic Functions', description: 'sinh, cosh, tanh', longDescription: 'Calculate hyperbolic trigonometric functions.', category: 'math', icon: Calculator,
    inputs: [{ id: 'x', label: 'Value (x)', placeholder: '1' }],
    calculate: (inputs) => {
      const x = parseFloat(inputs.x)
      if (isNaN(x)) return { results: [] }
      const sinh = Math.sinh(x), cosh = Math.cosh(x), tanh = Math.tanh(x)
      return { results: [{ label: 'sinh(x)', value: sinh.toFixed(6), highlight: true }, { label: 'cosh(x)', value: cosh.toFixed(6) }, { label: 'tanh(x)', value: tanh.toFixed(6) }], formula: { formula: 'sinh = (eˣ - e⁻ˣ)/2, cosh = (eˣ + e⁻ˣ)/2', explanation: 'Hyperbolic trig functions' } }
    }
  },
  'inverse-trig': {
    name: 'Inverse Trig', description: 'arcsin, arccos, arctan', longDescription: 'Calculate inverse trigonometric functions.', category: 'math', icon: Calculator,
    inputs: [{ id: 'x', label: 'Value (x)', placeholder: '0.5' }],
    calculate: (inputs) => {
      const x = parseFloat(inputs.x)
      if (isNaN(x)) return { results: [] }
      const asin = Math.asin(x), acos = Math.acos(x), atan = Math.atan(x)
      const toDeg = (rad: number) => (rad * 180 / Math.PI).toFixed(2)
      return { results: [{ label: 'arcsin(x)', value: `${asin.toFixed(4)} rad (${toDeg(asin)}°)`, highlight: true }, { label: 'arccos(x)', value: `${acos.toFixed(4)} rad (${toDeg(acos)}°)` }, { label: 'arctan(x)', value: `${atan.toFixed(4)} rad (${toDeg(atan)}°)` }], formula: { formula: 'Domain: arcsin/arccos: [-1,1], arctan: all real', explanation: 'Returns angle in radians' } }
    }
  },
  'logarithm-base-n': {
    name: 'Logarithm Base N', description: 'Any base log', longDescription: 'Calculate logarithm with any base.', category: 'math', icon: Divide,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1000' }, { id: 'base', label: 'Base', placeholder: '10' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value), b = parseFloat(inputs.base)
      if (isNaN(v) || isNaN(b) || v <= 0 || b <= 0 || b === 1) return { results: [{ label: 'Error', value: 'Invalid input' }] }
      const result = Math.log(v) / Math.log(b)
      return { results: [{ label: `log${b}(${v})`, value: result.toFixed(6), highlight: true }, { label: 'Verification', value: `${b}^${result.toFixed(4)} = ${Math.pow(b, result).toFixed(2)}` }], formula: { formula: 'log_b(x) = ln(x) / ln(b)', explanation: 'Change of base formula' } }
    }
  },
  'natural-log': {
    name: 'Natural Logarithm', description: 'ln(x)', longDescription: 'Calculate the natural logarithm (base e).', category: 'math', icon: Divide,
    inputs: [{ id: 'value', label: 'Value', placeholder: '2.718' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v) || v <= 0) return { results: [{ label: 'Error', value: 'Enter positive number' }] }
      const ln = Math.log(v)
      return { results: [{ label: 'ln(x)', value: ln.toFixed(6), highlight: true }, { label: 'e', value: Math.E.toFixed(6) }, { label: 'Verification', value: `e^${ln.toFixed(4)} = ${Math.exp(ln).toFixed(4)}` }], formula: { formula: 'ln(x) = log_e(x)', explanation: `ln(${v}) = ${ln.toFixed(6)}` } }
    }
  },
  'exponential': {
    name: 'Exponential', description: 'e^x', longDescription: 'Calculate exponential function e^x.', category: 'math', icon: Calculator,
    inputs: [{ id: 'x', label: 'Exponent (x)', placeholder: '2' }],
    calculate: (inputs) => {
      const x = parseFloat(inputs.x)
      if (isNaN(x)) return { results: [] }
      const result = Math.exp(x)
      return { results: [{ label: 'e^x', value: result.toFixed(6), highlight: true }, { label: 'e (Euler\'s number)', value: Math.E.toFixed(6) }], formula: { formula: 'e^x = exp(x)', explanation: `e^${x} = ${result.toFixed(6)}` } }
    }
  },
  'distance-formula': {
    name: 'Distance Formula', description: '2D/3D distance', longDescription: 'Calculate distance between two points in 2D or 3D.', category: 'math', icon: Ruler,
    inputs: [{ id: 'x1', label: 'x₁', placeholder: '0' }, { id: 'y1', label: 'y₁', placeholder: '0' }, { id: 'x2', label: 'x₂', placeholder: '3' }, { id: 'y2', label: 'y₂', placeholder: '4' }, { id: 'z1', label: 'z₁ (optional)', placeholder: '' }, { id: 'z2', label: 'z₂ (optional)', placeholder: '' }],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0, x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0
      const z1 = parseFloat(inputs.z1), z2 = parseFloat(inputs.z2)
      let distance: number, formula: string
      if (!isNaN(z1) && !isNaN(z2)) {
        distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))
        formula = 'd = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]'
      } else {
        distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        formula = 'd = √[(x₂-x₁)² + (y₂-y₁)²]'
      }
      return { results: [{ label: 'Distance', value: distance.toFixed(4), highlight: true }], formula: { formula, explanation: `(${x1},${y1}${!isNaN(z1) ? `,${z1}` : ''}) to (${x2},${y2}${!isNaN(z2) ? `,${z2}` : ''})` } }
    }
  },
  'midpoint-formula': {
    name: 'Midpoint Formula', description: 'Point between', longDescription: 'Calculate the midpoint between two points.', category: 'math', icon: Target,
    inputs: [{ id: 'x1', label: 'x₁', placeholder: '0' }, { id: 'y1', label: 'y₁', placeholder: '0' }, { id: 'x2', label: 'x₂', placeholder: '6' }, { id: 'y2', label: 'y₂', placeholder: '8' }],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0, x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
      return { results: [{ label: 'Midpoint', value: `(${mx.toFixed(2)}, ${my.toFixed(2)})`, highlight: true }], formula: { formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', explanation: `Midpoint of (${x1},${y1}) and (${x2},${y2})` } }
    }
  },
  'slope-calculator': {
    name: 'Slope Calculator', description: 'Line slope', longDescription: 'Calculate the slope of a line between two points.', category: 'math', icon: TrendingUp,
    inputs: [{ id: 'x1', label: 'x₁', placeholder: '0' }, { id: 'y1', label: 'y₁', placeholder: '0' }, { id: 'x2', label: 'x₂', placeholder: '4' }, { id: 'y2', label: 'y₂', placeholder: '8' }],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1), y1 = parseFloat(inputs.y1), x2 = parseFloat(inputs.x2), y2 = parseFloat(inputs.y2)
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { results: [] }
      if (x2 - x1 === 0) return { results: [{ label: 'Slope', value: 'Undefined (vertical line)', highlight: true }] }
      const slope = (y2 - y1) / (x2 - x1)
      const angle = Math.atan(slope) * 180 / Math.PI
      return { results: [{ label: 'Slope (m)', value: slope.toFixed(4), highlight: true }, { label: 'Angle', value: `${angle.toFixed(2)}°` }], formula: { formula: 'm = (y₂ - y₁) / (x₂ - x₁)', explanation: `Rise over run` } }
    }
  },
  'ellipse-area': {
    name: 'Ellipse Area', description: 'Ellipse geometry', longDescription: 'Calculate area and perimeter of an ellipse.', category: 'math', icon: Target,
    inputs: [{ id: 'a', label: 'Semi-major axis (a)', placeholder: '5' }, { id: 'b', label: 'Semi-minor axis (b)', placeholder: '3' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b)
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return { results: [] }
      const area = Math.PI * a * b
      const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)))
      return { results: [{ label: 'Area', value: area.toFixed(4), unit: 'units²', highlight: true }, { label: 'Perimeter (approx)', value: perimeter.toFixed(4), unit: 'units' }], formula: { formula: 'A = πab, P ≈ π(3(a+b) - √((3a+b)(a+3b)))', explanation: 'Ellipse with semi-axes a and b' } }
    }
  },
  'sphere-volume': {
    name: 'Sphere Volume', description: '3D sphere', longDescription: 'Calculate volume and surface area of a sphere.', category: 'math', icon: Target,
    inputs: [{ id: 'radius', label: 'Radius', placeholder: '5' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.radius)
      if (isNaN(r) || r <= 0) return { results: [] }
      const volume = (4 / 3) * Math.PI * Math.pow(r, 3)
      const surface = 4 * Math.PI * r * r
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }, { label: 'Surface Area', value: surface.toFixed(4), unit: 'units²' }], formula: { formula: 'V = 4/3 × πr³, A = 4πr²', explanation: `Sphere with radius ${r}` } }
    }
  },
  'cylinder-volume': {
    name: 'Cylinder Volume', description: 'Cylinder calc', longDescription: 'Calculate volume and surface area of a cylinder.', category: 'math', icon: Target,
    inputs: [{ id: 'radius', label: 'Radius', placeholder: '3' }, { id: 'height', label: 'Height', placeholder: '5' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.radius), h = parseFloat(inputs.height)
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return { results: [] }
      const volume = Math.PI * r * r * h
      const surface = 2 * Math.PI * r * (r + h)
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }, { label: 'Surface Area', value: surface.toFixed(4), unit: 'units²' }], formula: { formula: 'V = πr²h, A = 2πr(r+h)', explanation: `Cylinder with r=${r}, h=${h}` } }
    }
  },
  'cone-volume': {
    name: 'Cone Volume', description: 'Cone calc', longDescription: 'Calculate volume and surface area of a cone.', category: 'math', icon: Target,
    inputs: [{ id: 'radius', label: 'Radius', placeholder: '3' }, { id: 'height', label: 'Height', placeholder: '5' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.radius), h = parseFloat(inputs.height)
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return { results: [] }
      const volume = (1 / 3) * Math.PI * r * r * h
      const slant = Math.sqrt(r * r + h * h)
      const surface = Math.PI * r * (r + slant)
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }, { label: 'Surface Area', value: surface.toFixed(4), unit: 'units²' }, { label: 'Slant Height', value: slant.toFixed(4) }], formula: { formula: 'V = 1/3 × πr²h, A = πr(r + l)', explanation: `Cone with r=${r}, h=${h}` } }
    }
  },
  'pyramid-volume': {
    name: 'Pyramid Volume', description: 'Pyramid calc', longDescription: 'Calculate volume of a pyramid.', category: 'math', icon: Target,
    inputs: [{ id: 'base', label: 'Base Area', placeholder: '25' }, { id: 'height', label: 'Height', placeholder: '10' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), h = parseFloat(inputs.height)
      if (isNaN(base) || isNaN(h) || base <= 0 || h <= 0) return { results: [] }
      const volume = (1 / 3) * base * h
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }], formula: { formula: 'V = 1/3 × Base Area × Height', explanation: `Pyramid with base area ${base}, height ${h}` } }
    }
  },
  'cube-surface': {
    name: 'Cube Surface Area', description: 'Cube area', longDescription: 'Calculate surface area and volume of a cube.', category: 'math', icon: Square,
    inputs: [{ id: 'side', label: 'Side Length', placeholder: '5' }],
    calculate: (inputs) => {
      const s = parseFloat(inputs.side)
      if (isNaN(s) || s <= 0) return { results: [] }
      const volume = s * s * s
      const surface = 6 * s * s
      const diagonal = s * Math.sqrt(3)
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }, { label: 'Surface Area', value: surface.toFixed(4), unit: 'units²' }, { label: 'Space Diagonal', value: diagonal.toFixed(4) }], formula: { formula: 'V = s³, A = 6s²', explanation: `Cube with side ${s}` } }
    }
  },
  // NEW MATH CALCULATORS (15)
  'dot-product': {
    name: 'Dot Product Calculator', description: 'Vector dot product', longDescription: 'Calculate the dot product (scalar product) of two vectors. The dot product is a fundamental operation in physics and engineering.', category: 'math', icon: Target,
    inputs: [
      { id: 'x1', label: 'Vector 1 - x', placeholder: '3' },
      { id: 'y1', label: 'Vector 1 - y', placeholder: '4' },
      { id: 'z1', label: 'Vector 1 - z', placeholder: '0' },
      { id: 'x2', label: 'Vector 2 - x', placeholder: '1' },
      { id: 'y2', label: 'Vector 2 - y', placeholder: '2' },
      { id: 'z2', label: 'Vector 2 - z', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0, z1 = parseFloat(inputs.z1) || 0
      const x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0, z2 = parseFloat(inputs.z2) || 0
      const dotProduct = x1 * x2 + y1 * y2 + z1 * z2
      const mag1 = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1)
      const mag2 = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2)
      const cosAngle = mag1 > 0 && mag2 > 0 ? dotProduct / (mag1 * mag2) : 0
      const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI
      return {
        results: [
          { label: 'Dot Product', value: dotProduct.toFixed(4), highlight: true },
          { label: 'Angle Between', value: `${angle.toFixed(2)}°` },
          { label: '|V1|', value: mag1.toFixed(4) },
          { label: '|V2|', value: mag2.toFixed(4) }
        ],
        formula: { formula: 'A·B = Ax×Bx + Ay×By + Az×Bz', explanation: 'Dot product equals sum of component-wise products' }
      }
    }
  },
  'cross-product': {
    name: 'Cross Product Calculator', description: 'Vector cross product', longDescription: 'Calculate the cross product (vector product) of two 3D vectors. The result is a vector perpendicular to both input vectors.', category: 'math', icon: Ruler,
    inputs: [
      { id: 'x1', label: 'Vector 1 - x', placeholder: '1' },
      { id: 'y1', label: 'Vector 1 - y', placeholder: '0' },
      { id: 'z1', label: 'Vector 1 - z', placeholder: '0' },
      { id: 'x2', label: 'Vector 2 - x', placeholder: '0' },
      { id: 'y2', label: 'Vector 2 - y', placeholder: '1' },
      { id: 'z2', label: 'Vector 2 - z', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0, z1 = parseFloat(inputs.z1) || 0
      const x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0, z2 = parseFloat(inputs.z2) || 0
      const cx = y1 * z2 - z1 * y2
      const cy = z1 * x2 - x1 * z2
      const cz = x1 * y2 - y1 * x2
      const magnitude = Math.sqrt(cx * cx + cy * cy + cz * cz)
      return {
        results: [
          { label: 'Cross Product', value: `(${cx.toFixed(4)}, ${cy.toFixed(4)}, ${cz.toFixed(4)})`, highlight: true },
          { label: 'Magnitude', value: magnitude.toFixed(4) }
        ],
        formula: { formula: 'A×B = (Ay×Bz-Az×By, Az×Bx-Ax×Bz, Ax×By-Ay×Bx)', explanation: 'Result is perpendicular to both input vectors' }
      }
    }
  },
  'matrix-determinant': {
    name: 'Matrix Determinant', description: 'Calculate det(A)', longDescription: 'Calculate the determinant of a 2x2 or 3x3 matrix. The determinant indicates if a matrix is invertible and measures volume scaling.', category: 'math', icon: Square,
    inputs: [
      { id: 'size', label: 'Matrix Size', placeholder: '', type: 'select', options: [{ value: '2x2', label: '2×2 Matrix' }, { value: '3x3', label: '3×3 Matrix' }] },
      { id: 'a11', label: 'a₁₁', placeholder: '1' },
      { id: 'a12', label: 'a₁₂', placeholder: '2' },
      { id: 'a13', label: 'a₁₃ (3×3)', placeholder: '3' },
      { id: 'a21', label: 'a₂₁', placeholder: '4' },
      { id: 'a22', label: 'a₂₂', placeholder: '5' },
      { id: 'a23', label: 'a₂₃ (3×3)', placeholder: '6' },
      { id: 'a31', label: 'a₃₁ (3×3)', placeholder: '7' },
      { id: 'a32', label: 'a₃₂ (3×3)', placeholder: '8' },
      { id: 'a33', label: 'a₃₃ (3×3)', placeholder: '9' }
    ],
    calculate: (inputs) => {
      const a11 = parseFloat(inputs.a11) || 0, a12 = parseFloat(inputs.a12) || 0, a13 = parseFloat(inputs.a13) || 0
      const a21 = parseFloat(inputs.a21) || 0, a22 = parseFloat(inputs.a22) || 0, a23 = parseFloat(inputs.a23) || 0
      const a31 = parseFloat(inputs.a31) || 0, a32 = parseFloat(inputs.a32) || 0, a33 = parseFloat(inputs.a33) || 0
      let det: number, formula: string
      if (inputs.size === '2x2') {
        det = a11 * a22 - a12 * a21
        formula = `det(A) = ${a11}×${a22} - ${a12}×${a21} = ${det}`
      } else {
        det = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31)
        formula = 'det(A) = a₁₁(a₂₂a₃₃-a₂₃a₃₂) - a₁₂(a₂₁a₃₃-a₂₃a₃₁) + a₁₃(a₂₁a₃₂-a₂₂a₃₁)'
      }
      const isInvertible = det !== 0
      return {
        results: [
          { label: 'Determinant', value: det.toFixed(4), highlight: true },
          { label: 'Invertible?', value: isInvertible ? 'Yes' : 'No (singular)' }
        ],
        formula: { formula, explanation: inputs.size === '2x2' ? '2×2 determinant formula' : 'Cofactor expansion for 3×3' }
      }
    }
  },
  'system-equations': {
    name: 'System of Equations', description: 'Solve 2×2 linear', longDescription: 'Solve a system of two linear equations in two variables using Cramer\'s rule. Enter equations in form: a₁x + b₁y = c₁.', category: 'math', icon: Calculator,
    inputs: [
      { id: 'a1', label: 'a₁ (coefficient of x)', placeholder: '2' },
      { id: 'b1', label: 'b₁ (coefficient of y)', placeholder: '3' },
      { id: 'c1', label: 'c₁ (constant)', placeholder: '7' },
      { id: 'a2', label: 'a₂ (coefficient of x)', placeholder: '1' },
      { id: 'b2', label: 'b₂ (coefficient of y)', placeholder: '-1' },
      { id: 'c2', label: 'c₂ (constant)', placeholder: '1' }
    ],
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.a1), b1 = parseFloat(inputs.b1), c1 = parseFloat(inputs.c1)
      const a2 = parseFloat(inputs.a2), b2 = parseFloat(inputs.b2), c2 = parseFloat(inputs.c2)
      if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) return { results: [] }
      const det = a1 * b2 - a2 * b1
      if (det === 0) return { results: [{ label: 'Result', value: 'No unique solution (parallel or coincident lines)', highlight: true }] }
      const x = (c1 * b2 - c2 * b1) / det
      const y = (a1 * c2 - a2 * c1) / det
      return {
        results: [
          { label: 'x', value: x.toFixed(4), highlight: true },
          { label: 'y', value: y.toFixed(4), highlight: true },
          { label: 'Determinant', value: det.toFixed(4) }
        ],
        formula: { formula: "Cramer's Rule: x = Dₓ/D, y = Dᵧ/D", explanation: `${a1}x + ${b1}y = ${c1}, ${a2}x + ${b2}y = ${c2}` }
      }
    }
  },
  'polynomial-roots': {
    name: 'Cubic Roots', description: 'Find polynomial roots', longDescription: 'Find the roots (zeros) of a cubic polynomial ax³ + bx² + cx + d = 0 using numerical methods.', category: 'math', icon: Hash,
    inputs: [
      { id: 'a', label: 'a (x³ coefficient)', placeholder: '1' },
      { id: 'b', label: 'b (x² coefficient)', placeholder: '-6' },
      { id: 'c', label: 'c (x coefficient)', placeholder: '11' },
      { id: 'd', label: 'd (constant)', placeholder: '-6' }
    ],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c), d = parseFloat(inputs.d)
      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a === 0) return { results: [{ label: 'Error', value: 'Invalid polynomial (a ≠ 0)' }] }
      // Use Newton's method to find roots
      const f = (x: number) => a * x * x * x + b * x * x + c * x + d
      const fp = (x: number) => 3 * a * x * x + 2 * b * x + c
      const findRoot = (start: number): number => {
        let x = start
        for (let i = 0; i < 100; i++) {
          const fx = f(x), fpx = fp(x)
          if (Math.abs(fpx) < 1e-10) break
          const newX = x - fx / fpx
          if (Math.abs(newX - x) < 1e-10) break
          x = newX
        }
        return x
      }
      const roots: number[] = []
      const startPoints = [-100, -10, -1, 0, 1, 10, 100]
      for (const start of startPoints) {
        const root = findRoot(start)
        const rounded = Math.round(root * 10000) / 10000
        if (!roots.some(r => Math.abs(r - rounded) < 0.001)) {
          roots.push(rounded)
        }
      }
      const uniqueRoots = roots.filter(r => Math.abs(f(r)) < 0.001).slice(0, 3)
      return {
        results: uniqueRoots.map((r, i) => ({ label: `Root ${i + 1}`, value: r.toFixed(4), highlight: i === 0 })),
        formula: { formula: 'ax³ + bx² + cx + d = 0', explanation: `Finding roots of ${a}x³ + ${b}x² + ${c}x + ${d} = 0` }
      }
    }
  },
  'derivative-point': {
    name: 'Derivative at Point', description: 'Numerical derivative', longDescription: 'Calculate the numerical derivative of a function at a specific point using the central difference method.', category: 'math', icon: TrendingUp,
    inputs: [
      { id: 'func', label: 'Function f(x)', placeholder: '', type: 'select', options: [{ value: 'x^2', label: 'x²' }, { value: 'x^3', label: 'x³' }, { value: 'sin', label: 'sin(x)' }, { value: 'cos', label: 'cos(x)' }, { value: 'exp', label: 'eˣ' }, { value: 'ln', label: 'ln(x)' }] },
      { id: 'x', label: 'Point x', placeholder: '2' }
    ],
    calculate: (inputs) => {
      const x = parseFloat(inputs.x)
      if (isNaN(x)) return { results: [] }
      const h = 0.0001
      let fPrime: number, formula: string
      const f = (val: number): number => {
        switch (inputs.func) {
          case 'x^2': return val * val
          case 'x^3': return val * val * val
          case 'sin': return Math.sin(val)
          case 'cos': return Math.cos(val)
          case 'exp': return Math.exp(val)
          case 'ln': return val > 0 ? Math.log(val) : NaN
          default: return val * val
        }
      }
      const fx = f(x)
      const fxh = f(x + h)
      const fxh2 = f(x - h)
      if (isNaN(fx) || isNaN(fxh) || isNaN(fxh2)) return { results: [{ label: 'Error', value: 'Function undefined at this point' }] }
      fPrime = (fxh - fxh2) / (2 * h) // Central difference
      const formulas: Record<string, string> = { 'x^2': "f'(x) = 2x", 'x^3': "f'(x) = 3x²", 'sin': "f'(x) = cos(x)", 'cos': "f'(x) = -sin(x)", 'exp': "f'(x) = eˣ", 'ln': "f'(x) = 1/x" }
      formula = formulas[inputs.func] || 'Central difference: (f(x+h) - f(x-h)) / 2h'
      return {
        results: [
          { label: "f'(x)", value: fPrime.toFixed(6), highlight: true },
          { label: 'f(x)', value: fx.toFixed(6) }
        ],
        formula: { formula, explanation: `Derivative of ${inputs.func} at x = ${x}` }
      }
    }
  },
  'integral-approx': {
    name: 'Integral Approximation', description: 'Numerical integration', longDescription: 'Approximate the definite integral using Simpson\'s rule. Enter function, lower and upper bounds.', category: 'math', icon: BarChart3,
    inputs: [
      { id: 'func', label: 'Function f(x)', placeholder: '', type: 'select', options: [{ value: 'x^2', label: 'x²' }, { value: 'x^3', label: 'x³' }, { value: 'sin', label: 'sin(x)' }, { value: 'cos', label: 'cos(x)' }, { value: 'exp', label: 'eˣ' }, { value: '1/x', label: '1/x' }] },
      { id: 'a', label: 'Lower Bound (a)', placeholder: '0' },
      { id: 'b', label: 'Upper Bound (b)', placeholder: '1' }
    ],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b)
      if (isNaN(a) || isNaN(b) || a >= b) return { results: [] }
      const f = (val: number): number => {
        switch (inputs.func) {
          case 'x^2': return val * val
          case 'x^3': return val * val * val
          case 'sin': return Math.sin(val)
          case 'cos': return Math.cos(val)
          case 'exp': return Math.exp(val)
          case '1/x': return val !== 0 ? 1 / val : NaN
          default: return val * val
        }
      }
      // Simpson's rule with n = 100 intervals
      const n = 100, h = (b - a) / n
      let sum = f(a) + f(b)
      for (let i = 1; i < n; i++) {
        const x = a + i * h
        if (isNaN(f(x))) return { results: [{ label: 'Error', value: 'Function undefined in interval' }] }
        sum += i % 2 === 0 ? 2 * f(x) : 4 * f(x)
      }
      const integral = (h / 3) * sum
      return {
        results: [
          { label: '∫f(x)dx', value: integral.toFixed(6), highlight: true },
          { label: 'Interval', value: `[${a}, ${b}]` }
        ],
        formula: { formula: "Simpson's Rule: (h/3)[f(a) + 4f(mid) + f(b)]", explanation: `Numerical integration of ${inputs.func} from ${a} to ${b}` }
      }
    }
  },
  'taylor-series': {
    name: 'Taylor Series', description: 'Polynomial approximation', longDescription: 'Generate Taylor series approximation of a function around a point. The series uses derivatives to approximate functions.', category: 'math', icon: Calculator,
    inputs: [
      { id: 'func', label: 'Function', placeholder: '', type: 'select', options: [{ value: 'sin', label: 'sin(x)' }, { value: 'cos', label: 'cos(x)' }, { value: 'exp', label: 'eˣ' }, { value: 'ln', label: 'ln(1+x)' }] },
      { id: 'center', label: 'Center (a)', placeholder: '0' },
      { id: 'terms', label: 'Number of Terms', placeholder: '5' },
      { id: 'evaluate', label: 'Evaluate at x', placeholder: '0.5' }
    ],
    calculate: (inputs) => {
      const center = parseFloat(inputs.center) || 0
      const terms = Math.min(10, Math.max(1, parseInt(inputs.terms) || 5))
      const x = parseFloat(inputs.evaluate) || 0
      const taylorTerms: string[] = []
      let approximation = 0
      const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1)
      // Derivatives at center for each function
      const getDerivative = (n: number, a: number): number => {
        switch (inputs.func) {
          case 'sin': return Math.sin(a + n * Math.PI / 2)
          case 'cos': return Math.cos(a + n * Math.PI / 2)
          case 'exp': return Math.exp(a)
          case 'ln': return n === 0 ? Math.log(1 + a) : Math.pow(-1, n - 1) * factorial(n - 1) / Math.pow(1 + a, n)
          default: return 0
        }
      }
      for (let n = 0; n < terms; n++) {
        const deriv = getDerivative(n, center)
        const coeff = deriv / factorial(n)
        const term = coeff * Math.pow(x - center, n)
        approximation += term
        if (n === 0) taylorTerms.push(`${coeff.toFixed(4)}`)
        else taylorTerms.push(`${coeff >= 0 ? '+' : ''}${coeff.toFixed(4)}(x-${center})^${n}`)
      }
      const actualValue = inputs.func === 'sin' ? Math.sin(x) : inputs.func === 'cos' ? Math.cos(x) : inputs.func === 'exp' ? Math.exp(x) : Math.log(1 + x)
      return {
        results: [
          { label: 'Approximation', value: approximation.toFixed(6), highlight: true },
          { label: 'Actual Value', value: actualValue.toFixed(6) },
          { label: 'Error', value: Math.abs(actualValue - approximation).toFixed(6) }
        ],
        formula: { formula: `f(x) ≈ ${taylorTerms.slice(0, 3).join(' ')}...`, explanation: `Taylor series of ${inputs.func} around x = ${center}` }
      }
    }
  },
  'vector-magnitude': {
    name: 'Vector Magnitude', description: 'Calculate |v|', longDescription: 'Calculate the magnitude (length) of a vector in 2D, 3D, or higher dimensions.', category: 'math', icon: Ruler,
    inputs: [
      { id: 'components', label: 'Vector Components (comma-separated)', placeholder: '3, 4, 5' }
    ],
    calculate: (inputs) => {
      const components = inputs.components.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (components.length === 0) return { results: [] }
      const sumSquares = components.reduce((sum, c) => sum + c * c, 0)
      const magnitude = Math.sqrt(sumSquares)
      const unitVector = components.map(c => c / magnitude)
      return {
        results: [
          { label: 'Magnitude |v|', value: magnitude.toFixed(6), highlight: true },
          { label: 'Dimensions', value: components.length },
          { label: 'Unit Vector', value: `(${unitVector.map(u => u.toFixed(4)).join(', ')})` }
        ],
        formula: { formula: '|v| = √(v₁² + v₂² + ... + vₙ²)', explanation: `Euclidean norm of vector` }
      }
    }
  },
  'unit-vector': {
    name: 'Unit Vector Calculator', description: 'Normalize vector', longDescription: 'Calculate the unit vector (normalized vector) in the direction of a given vector. A unit vector has magnitude 1.', category: 'math', icon: Target,
    inputs: [
      { id: 'components', label: 'Vector Components (comma-separated)', placeholder: '3, 4' }
    ],
    calculate: (inputs) => {
      const components = inputs.components.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (components.length === 0) return { results: [] }
      const sumSquares = components.reduce((sum, c) => sum + c * c, 0)
      const magnitude = Math.sqrt(sumSquares)
      if (magnitude === 0) return { results: [{ label: 'Error', value: 'Cannot normalize zero vector' }] }
      const unitVector = components.map(c => c / magnitude)
      const verification = unitVector.reduce((sum, u) => sum + u * u, 0)
      return {
        results: [
          { label: 'Unit Vector', value: `(${unitVector.map(u => u.toFixed(6)).join(', ')})`, highlight: true },
          { label: 'Original Magnitude', value: magnitude.toFixed(6) },
          { label: 'Verification |u|', value: Math.sqrt(verification).toFixed(6) }
        ],
        formula: { formula: 'û = v / |v|', explanation: 'Unit vector points in same direction with magnitude 1' }
      }
    }
  },
  'scalar-projection': {
    name: 'Scalar Projection', description: 'Project vectors', longDescription: 'Calculate the scalar projection of vector A onto vector B. This gives the component of A in the direction of B.', category: 'math', icon: TrendingUp,
    inputs: [
      { id: 'a1', label: 'Vector A - x', placeholder: '3' },
      { id: 'a2', label: 'Vector A - y', placeholder: '4' },
      { id: 'b1', label: 'Vector B - x', placeholder: '1' },
      { id: 'b2', label: 'Vector B - y', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.a1) || 0, a2 = parseFloat(inputs.a2) || 0
      const b1 = parseFloat(inputs.b1) || 0, b2 = parseFloat(inputs.b2) || 0
      const dotProduct = a1 * b1 + a2 * b2
      const magB = Math.sqrt(b1 * b1 + b2 * b2)
      if (magB === 0) return { results: [{ label: 'Error', value: 'Cannot project onto zero vector' }] }
      const scalarProj = dotProduct / magB
      const vectorProjX = scalarProj * b1 / magB
      const vectorProjY = scalarProj * b2 / magB
      return {
        results: [
          { label: 'Scalar Projection', value: scalarProj.toFixed(4), highlight: true },
          { label: 'Vector Projection', value: `(${vectorProjX.toFixed(4)}, ${vectorProjY.toFixed(4)})` },
          { label: 'Dot Product A·B', value: dotProduct.toFixed(4) }
        ],
        formula: { formula: 'proj_B(A) = (A·B) / |B|', explanation: 'Component of A in direction of B' }
      }
    }
  },
  'angle-vectors': {
    name: 'Angle Between Vectors', description: 'Calculate angle θ', longDescription: 'Calculate the angle between two vectors using the dot product formula. The angle is returned in degrees and radians.', category: 'math', icon: Target,
    inputs: [
      { id: 'x1', label: 'Vector A - x', placeholder: '1' },
      { id: 'y1', label: 'Vector A - y', placeholder: '0' },
      { id: 'x2', label: 'Vector B - x', placeholder: '0' },
      { id: 'y2', label: 'Vector B - y', placeholder: '1' }
    ],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0
      const x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0
      const dotProduct = x1 * x2 + y1 * y2
      const magA = Math.sqrt(x1 * x1 + y1 * y1)
      const magB = Math.sqrt(x2 * x2 + y2 * y2)
      if (magA === 0 || magB === 0) return { results: [{ label: 'Error', value: 'Cannot find angle with zero vector' }] }
      const cosAngle = Math.max(-1, Math.min(1, dotProduct / (magA * magB)))
      const angleRad = Math.acos(cosAngle)
      const angleDeg = angleRad * 180 / Math.PI
      const relationship = cosAngle > 0.001 ? 'Acute (< 90°)' : cosAngle < -0.001 ? 'Obtuse (> 90°)' : 'Perpendicular (90°)'
      return {
        results: [
          { label: 'Angle', value: `${angleDeg.toFixed(2)}°`, highlight: true },
          { label: 'In Radians', value: angleRad.toFixed(4) },
          { label: 'Relationship', value: relationship }
        ],
        formula: { formula: 'cos(θ) = (A·B) / (|A|×|B|)', explanation: `Angle = arccos(${dotProduct.toFixed(2)} / (${magA.toFixed(2)} × ${magB.toFixed(2)}))` }
      }
    }
  },
  'linear-regression': {
    name: 'Linear Regression', description: 'Best fit line', longDescription: 'Calculate the linear regression (best fit line) for a set of data points using the least squares method.', category: 'math', icon: TrendingUp,
    inputs: [
      { id: 'points', label: 'Data Points (x,y pairs)', placeholder: '1,2, 2,4, 3,5, 4,4, 5,5' }
    ],
    calculate: (inputs) => {
      const values = inputs.points.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (values.length < 4 || values.length % 2 !== 0) return { results: [{ label: 'Error', value: 'Enter at least 2 x,y pairs' }] }
      const points: [number, number][] = []
      for (let i = 0; i < values.length; i += 2) points.push([values[i], values[i + 1]])
      const n = points.length
      const sumX = points.reduce((s, p) => s + p[0], 0)
      const sumY = points.reduce((s, p) => s + p[1], 0)
      const sumXY = points.reduce((s, p) => s + p[0] * p[1], 0)
      const sumX2 = points.reduce((s, p) => s + p[0] * p[0], 0)
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      // R-squared calculation
      const meanY = sumY / n
      const ssTotal = points.reduce((s, p) => s + Math.pow(p[1] - meanY, 2), 0)
      const ssResidual = points.reduce((s, p) => s + Math.pow(p[1] - (slope * p[0] + intercept), 2), 0)
      const rSquared = 1 - ssResidual / ssTotal
      const sign = intercept >= 0 ? '+' : '-'
      return {
        results: [
          { label: 'Line Equation', value: `y = ${slope.toFixed(4)}x ${sign} ${Math.abs(intercept).toFixed(4)}`, highlight: true },
          { label: 'Slope (m)', value: slope.toFixed(4) },
          { label: 'Intercept (b)', value: intercept.toFixed(4) },
          { label: 'R²', value: rSquared.toFixed(4) }
        ],
        formula: { formula: 'y = mx + b (least squares)', explanation: `Best fit line through ${n} data points` }
      }
    }
  },
  'vector-2d-ops': {
    name: '2D Vector Operations', description: 'Add, subtract, scale', longDescription: 'Perform basic vector operations including addition, subtraction, and scalar multiplication for 2D vectors.', category: 'math', icon: Calculator,
    inputs: [
      { id: 'x1', label: 'Vector A - x', placeholder: '2' },
      { id: 'y1', label: 'Vector A - y', placeholder: '3' },
      { id: 'x2', label: 'Vector B - x', placeholder: '1' },
      { id: 'y2', label: 'Vector B - y', placeholder: '4' },
      { id: 'scalar', label: 'Scalar (for scaling)', placeholder: '2' }
    ],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1) || 0, y1 = parseFloat(inputs.y1) || 0
      const x2 = parseFloat(inputs.x2) || 0, y2 = parseFloat(inputs.y2) || 0
      const scalar = parseFloat(inputs.scalar) || 1
      const sumX = x1 + x2, sumY = y1 + y2
      const diffX = x1 - x2, diffY = y1 - y2
      const scaleAX = x1 * scalar, scaleAY = y1 * scalar
      const magA = Math.sqrt(x1 * x1 + y1 * y1)
      const magB = Math.sqrt(x2 * x2 + y2 * y2)
      return {
        results: [
          { label: 'A + B', value: `(${sumX.toFixed(2)}, ${sumY.toFixed(2)})`, highlight: true },
          { label: 'A - B', value: `(${diffX.toFixed(2)}, ${diffY.toFixed(2)})` },
          { label: `${scalar} × A`, value: `(${scaleAX.toFixed(2)}, ${scaleAY.toFixed(2)})` },
          { label: '|A|', value: magA.toFixed(4) },
          { label: '|B|', value: magB.toFixed(4) }
        ],
        formula: { formula: 'A+B = (a₁+b₁, a₂+b₂)', explanation: 'Basic 2D vector arithmetic' }
      }
    }
  },
  'quadratic-vertex': {
    name: 'Quadratic Vertex Form', description: 'Find vertex & form', longDescription: 'Convert quadratic equation to vertex form and find the vertex (maximum/minimum point) of a parabola.', category: 'math', icon: Target,
    inputs: [
      { id: 'a', label: 'a (x² coefficient)', placeholder: '1' },
      { id: 'b', label: 'b (x coefficient)', placeholder: '-4' },
      { id: 'c', label: 'c (constant)', placeholder: '3' }
    ],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) return { results: [{ label: 'Error', value: 'a cannot be zero' }] }
      const h = -b / (2 * a)
      const k = a * h * h + b * h + c
      const vertexForm = `${a}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h).toFixed(2)})² ${k >= 0 ? '+' : '-'} ${Math.abs(k).toFixed(2)}`
      const opensUp = a > 0
      const discriminant = b * b - 4 * a * c
      const rootsInfo = discriminant < 0 ? 'No real roots' : discriminant === 0 ? `One root at x = ${h.toFixed(2)}` : 'Two real roots'
      return {
        results: [
          { label: 'Vertex', value: `(${h.toFixed(4)}, ${k.toFixed(4)})`, highlight: true },
          { label: 'Vertex Form', value: vertexForm },
          { label: opensUp ? 'Minimum' : 'Maximum', value: k.toFixed(4) },
          { label: 'Roots Info', value: rootsInfo }
        ],
        formula: { formula: 'Vertex at h = -b/(2a), k = f(h)', explanation: `Parabola opens ${opensUp ? 'upward' : 'downward'}` }
      }
    }
  },
  // ADDITIONAL DATE & TIME CALCULATORS
  'add-subtract-days': {
    name: 'Add/Subtract Days', description: 'Modify dates', longDescription: 'Add or subtract days from a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'days', label: 'Days to Add', placeholder: '30' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), days = parseInt(inputs.days) || 0
      date.setDate(date.getDate() + days)
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Date + Days', explanation: `${days > 0 ? 'Added' : 'Subtracted'} ${Math.abs(days)} days.` } }
    }
  },
  'time-difference': {
    name: 'Time Difference', description: 'Hours between', longDescription: 'Calculate difference between two times.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '17:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Total Minutes', value: diff }], formula: { formula: 'End - Start', explanation: 'Time duration calculation.' } }
    }
  },
  'weekday-finder': {
    name: 'Weekday Finder', description: 'Day of week', longDescription: 'Find what day of week a date falls on.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return { results: [{ label: 'Day of Week', value: days[date.getDay()], highlight: true }], formula: { formula: 'Date.getDay()', explanation: `${inputs.date} falls on a ${days[date.getDay()]}.` } }
    }
  },
  'working-days': {
    name: 'Working Days Calculator', description: 'Business days', longDescription: 'Calculate business days between dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end)
      let count = 0, current = new Date(start)
      while (current <= end) {
        if (current.getDay() !== 0 && current.getDay() !== 6) count++
        current.setDate(current.getDate() + 1)
      }
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return { results: [{ label: 'Working Days', value: count, highlight: true }, { label: 'Total Days', value: totalDays }, { label: 'Weekend Days', value: totalDays - count }], formula: { formula: 'Exclude Sat & Sun', explanation: 'Monday-Friday count.' } }
    }
  },
  'time-zone': {
    name: 'Time Zone Converter', description: 'Convert zones', longDescription: 'Convert time between zones.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'time', label: 'Time', placeholder: '12:00' }, { id: 'fromZone', label: 'From Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }] }, { id: 'toZone', label: 'To Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }] }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const offsets: Record<string, number> = { utc: 0, est: -5, pst: -8, ist: 5.5 }
      const [h, m] = inputs.time.split(':').map(Number)
      const fromOffset = offsets[inputs.fromZone || 'utc'] || 0
      const toOffset = offsets[inputs.toZone || 'utc'] || 0
      let totalMins = h * 60 + m - fromOffset * 60 + toOffset * 60
      if (totalMins < 0) totalMins += 24 * 60
      if (totalMins >= 24 * 60) totalMins -= 24 * 60
      const newH = Math.floor(totalMins / 60), newM = totalMins % 60
      return { results: [{ label: 'Converted Time', value: `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`, highlight: true }], formula: { formula: 'Time + Offset Difference', explanation: `${inputs.fromZone} to ${inputs.toZone}` } }
    }
  },
  epoch: {
    name: 'Epoch Converter', description: 'Unix timestamp', longDescription: 'Convert Unix timestamps.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'timestamp', label: 'Unix Timestamp', placeholder: '1704067200' }],
    calculate: (inputs) => {
      const ts = parseFloat(inputs.timestamp)
      if (isNaN(ts)) return { results: [] }
      const date = new Date(ts * 1000)
      return { results: [{ label: 'Date/Time', value: date.toString(), highlight: true }, { label: 'ISO Format', value: date.toISOString() }], formula: { formula: 'Unix = seconds since Jan 1, 1970', explanation: 'Convert timestamp to readable date.' } }
    }
  },
  duration: {
    name: 'Duration Converter', description: 'Convert durations', longDescription: 'Convert between time units.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'value', label: 'Value', placeholder: '3600' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'seconds', label: 'Seconds' }, { value: 'minutes', label: 'Minutes' }, { value: 'hours', label: 'Hours' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toSeconds: Record<string, number> = { seconds: 1, minutes: 60, hours: 3600 }
      const secs = value * toSeconds[inputs.from || 'seconds']
      const hours = Math.floor(secs / 3600), mins = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60)
      return { results: [{ label: 'Hours:Minutes:Seconds', value: `${hours}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`, highlight: true }, { label: 'Total Seconds', value: secs }], formula: { formula: 'Time unit conversion', explanation: 'Convert to different time units.' } }
    }
  },
  'leap-year': {
    name: 'Leap Year Checker', description: 'Check leap year', longDescription: 'Check if a year is a leap year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year)
      if (isNaN(year)) return { results: [] }
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      return { results: [{ label: 'Is Leap Year?', value: isLeap ? 'YES' : 'NO', highlight: true }], formula: { formula: 'Leap if: (÷4 and not ÷100) or ÷400', explanation: `${year} ${isLeap ? 'is' : 'is not'} a leap year.` } }
    }
  },
  'add-months': {
    name: 'Add Months Calculator', description: 'Date arithmetic', longDescription: 'Add months to a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'months', label: 'Months to Add', placeholder: '6' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), months = parseInt(inputs.months) || 0
      date.setMonth(date.getMonth() + months)
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Date + Months', explanation: `Added ${months} months.` } }
    }
  },
  quarter: {
    name: 'Quarter Calculator', description: 'Fiscal quarter', longDescription: 'Find fiscal quarter for a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), month = date.getMonth() + 1
      const quarter = Math.ceil(month / 3)
      return { results: [{ label: 'Quarter', value: `Q${quarter}`, highlight: true }, { label: 'Year', value: date.getFullYear() }], formula: { formula: 'Q = ceil(Month / 3)', explanation: `Month ${month} falls in Q${quarter}.` } }
    }
  },
  'week-number': {
    name: 'Week Number Calculator', description: 'Week of year', longDescription: 'Find week number of the year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const start = new Date(date.getFullYear(), 0, 1)
      const week = Math.ceil(((date.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7)
      return { results: [{ label: 'Week Number', value: week, highlight: true }], formula: { formula: 'ISO Week Number', explanation: `Week ${week} of ${date.getFullYear()}.` } }
    }
  },
  'days-until-birthday': {
    name: 'Days Until Birthday', description: 'Birthday countdown', longDescription: 'Calculate days until next birthday.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Birthday', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const today = new Date(), birth = new Date(inputs.birthdate)
      let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
      if (next < today) next.setFullYear(today.getFullYear() + 1)
      const days = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Birthday', value: days, highlight: true }, { label: 'Date', value: next.toDateString() }], formula: { formula: 'Next Birthday - Today', explanation: `${days} days until your birthday!` } }
    }
  },
  'meeting-duration': {
    name: 'Meeting Duration', description: 'Calculate length', longDescription: 'Calculate meeting duration.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '10:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }], formula: { formula: 'End - Start', explanation: 'Meeting length.' } }
    }
  },
  'daylight-hours': {
    name: 'Daylight Hours', description: 'Daylight', longDescription: 'Calculate daylight hours for a date.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'lat', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date(), lat = parseFloat(inputs.lat) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
      const daylight = (2 * hourAngle / 15)
      return { results: [{ label: 'Daylight Hours', value: `${daylight.toFixed(1)} hours`, highlight: true }], formula: { formula: 'Based on latitude and date', explanation: 'Approximate daylight duration.' } }
    }
  },
  'decimal-time': {
    name: 'Decimal Time Converter', description: 'Convert time', longDescription: 'Convert between standard and decimal time.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'time', label: 'Time (HH:MM)', placeholder: '02:30' }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const [h, m] = inputs.time.split(':').map(Number)
      const decimal = h + m / 60
      return { results: [{ label: 'Decimal Hours', value: decimal.toFixed(4), highlight: true }], formula: { formula: 'Decimal = Hours + Minutes/60', explanation: `${h}h ${m}m = ${decimal.toFixed(2)} hours` } }
    }
  },
  'world-clock': {
    name: 'World Clock', description: 'Time worldwide', longDescription: 'Show time in multiple cities.', category: 'datetime', icon: Globe,
    inputs: [],
    calculate: () => {
      const now = new Date()
      const cities = [
        { name: 'New York', offset: -5 },
        { name: 'London', offset: 0 },
        { name: 'Tokyo', offset: 9 },
        { name: 'Sydney', offset: 11 },
        { name: 'Dubai', offset: 4 }
      ]
      const times = cities.map(city => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000
        const cityTime = new Date(utc + city.offset * 3600000)
        return { label: city.name, value: cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      })
      return { results: [{ label: 'UTC Time', value: now.toUTCString().slice(17, 22), highlight: true }, ...times], formula: { formula: 'Current time in major cities', explanation: 'Times shown in local time zones.' } }
    }
  },
  'time-elapsed': {
    name: 'Time Elapsed', description: 'Time since', longDescription: 'Calculate time elapsed since a date.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const start = new Date(inputs.date), now = new Date()
      const diff = now.getTime() - start.getTime()
      const days = Math.floor(diff / 86400000), hours = Math.floor((diff % 86400000) / 3600000), mins = Math.floor((diff % 3600000) / 60000)
      return { results: [{ label: 'Elapsed', value: `${days}d ${hours}h ${mins}m`, highlight: true }], formula: { formula: 'Now - Start', explanation: 'Time since the given date.' } }
    }
  },
  'date-range': {
    name: 'Date Range Generator', description: 'Generate dates', longDescription: 'Generate a list of dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }, { id: 'step', label: 'Step (days)', placeholder: '7' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end), step = parseInt(inputs.step) || 1
      const dates: string[] = []
      const current = new Date(start)
      while (current <= end) {
        dates.push(current.toDateString())
        current.setDate(current.getDate() + step)
      }
      return { results: [{ label: 'Generated Dates', value: dates.slice(0, 10).join(', ') + (dates.length > 10 ? '...' : ''), highlight: true }, { label: 'Total Dates', value: dates.length }], formula: { formula: 'Range with step', explanation: `Every ${step} days.` } }
    }
  },
  'zodiac-sign': {
    name: 'Zodiac Sign Finder', description: 'Find your sign', longDescription: 'Find your zodiac sign from birth date.', category: 'datetime', icon: Star,
    inputs: [{ id: 'birthdate', label: 'Birth Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const date = new Date(inputs.birthdate), month = date.getMonth() + 1, day = date.getDate()
      const signs = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19] },
        { name: 'Aquarius', start: [1, 20], end: [2, 18] },
        { name: 'Pisces', start: [2, 19], end: [3, 20] },
        { name: 'Aries', start: [3, 21], end: [4, 19] },
        { name: 'Taurus', start: [4, 20], end: [5, 20] },
        { name: 'Gemini', start: [5, 21], end: [6, 20] },
        { name: 'Cancer', start: [6, 21], end: [7, 22] },
        { name: 'Leo', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', start: [8, 23], end: [9, 22] },
        { name: 'Libra', start: [9, 23], end: [10, 22] },
        { name: 'Scorpio', start: [10, 23], end: [11, 21] },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
      ]
      const sign = signs.find(s => (month === s.start[0] && day >= s.start[1]) || (month === s.end[0] && day <= s.end[1])) || signs[0]
      return { results: [{ label: 'Zodiac Sign', value: sign.name, highlight: true }], formula: { formula: 'Based on birth month and day', explanation: `${month}/${day} = ${sign.name}` } }
    }
  },
  'lunar-age': {
    name: 'Lunar Age Calculator', description: 'Chinese calendar', longDescription: 'Calculate lunar age for Chinese calendar.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'birthdate', label: 'Birth Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), now = new Date()
      let lunarAge = now.getFullYear() - birth.getFullYear() + 1
      const chineseNewYear = new Date(now.getFullYear(), 1, 10)
      if (now < chineseNewYear) lunarAge--
      return { results: [{ label: 'Lunar Age', value: lunarAge, highlight: true }], formula: { formula: 'Age + 1 (born as age 1)', explanation: 'Chinese lunar calendar age.' } }
    }
  },
  'pet-age': {
    name: 'Pet Age Calculator', description: 'Pet years', longDescription: 'Calculate pet age in human years.', category: 'datetime', icon: Heart,
    inputs: [{ id: 'age', label: 'Pet Age (years)', placeholder: '3' }, { id: 'type', label: 'Pet Type', placeholder: '', type: 'select', options: [{ value: 'dog', label: 'Dog' }, { value: 'cat', label: 'Cat' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), type = inputs.type || 'dog'
      if (!age) return { results: [] }
      let humanYears: number
      if (type === 'dog') humanYears = age <= 2 ? age * 10.5 : 21 + (age - 2) * 4
      else humanYears = age <= 2 ? age * 12.5 : 25 + (age - 2) * 4
      return { results: [{ label: 'Human Years', value: humanYears.toFixed(1), highlight: true }], formula: { formula: type === 'dog' ? 'First 2 years × 10.5, then +4 per year' : 'First 2 years × 12.5, then +4 per year', explanation: `${type} age conversion.` } }
    }
  },
  // ADDITIONAL TOOLS CALCULATORS
  'volume-converter': {
    name: 'Volume Converter', description: 'Convert volume', longDescription: 'Convert between volume units.', category: 'tools', icon: Droplets,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'l', label: 'Liters' }, { value: 'gal', label: 'Gallons' }, { value: 'ml', label: 'Milliliters' }, { value: 'qt', label: 'Quarts' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'l', label: 'Liters' }, { value: 'gal', label: 'Gallons' }, { value: 'ml', label: 'Milliliters' }, { value: 'qt', label: 'Quarts' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toLiters: Record<string, number> = { l: 1, gal: 3.785, ml: 0.001, qt: 0.946 }
      const liters = value * toLiters[inputs.from || 'l'], result = liters / toLiters[inputs.to || 'l']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Volume conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'area-converter': {
    name: 'Area Converter', description: 'Convert area', longDescription: 'Convert between area units.', category: 'tools', icon: Square,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'sqm', label: 'Square Meters' }, { value: 'sqft', label: 'Square Feet' }, { value: 'acre', label: 'Acres' }, { value: 'ha', label: 'Hectares' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'sqm', label: 'Square Meters' }, { value: 'sqft', label: 'Square Feet' }, { value: 'acre', label: 'Acres' }, { value: 'ha', label: 'Hectares' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toSqm: Record<string, number> = { sqm: 1, sqft: 0.0929, acre: 4047, ha: 10000 }
      const sqm = value * toSqm[inputs.from || 'sqm'], result = sqm / toSqm[inputs.to || 'sqm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Area conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'speed-converter': {
    name: 'Speed Converter', description: 'Convert speed', longDescription: 'Convert between speed units.', category: 'tools', icon: Wind,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }, { value: 'ms', label: 'm/s' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }, { value: 'ms', label: 'm/s' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKmh: Record<string, number> = { kmh: 1, mph: 1.609, ms: 3.6 }
      const kmh = value * toKmh[inputs.from || 'kmh'], result = kmh / toKmh[inputs.to || 'kmh']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Speed conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'fuel-economy': {
    name: 'Fuel Economy Converter', description: 'MPG conversion', longDescription: 'Convert fuel economy units.', category: 'tools', icon: Car,
    inputs: [{ id: 'value', label: 'Value', placeholder: '30' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'mpg', label: 'MPG (US)' }, { value: 'lp100k', label: 'L/100km' }, { value: 'kpl', label: 'km/L' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'mpg', label: 'MPG (US)' }, { value: 'lp100k', label: 'L/100km' }, { value: 'kpl', label: 'km/L' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value) || value === 0) return { results: [] }
      const toKpl: Record<string, number> = { mpg: 0.425, lp100k: 100, kpl: 1 }
      let result: number
      if (inputs.from === 'lp100k' && inputs.to !== 'lp100k') result = 100 / value * toKpl[inputs.to || 'mpg'] / toKpl['lp100k']
      else if (inputs.to === 'lp100k') result = 100 / (value * toKpl[inputs.from || 'mpg'])
      else result = value * toKpl[inputs.from || 'mpg'] / toKpl[inputs.to || 'mpg']
      return { results: [{ label: 'Result', value: result.toFixed(2), unit: inputs.to, highlight: true }], formula: { formula: 'Fuel economy conversion', explanation: `${value} ${inputs.from}` } }
    }
  },
  'color-converter': {
    name: 'Color Converter', description: 'HEX/RGB/HSL', longDescription: 'Convert between color formats.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'hex', label: 'HEX Color', placeholder: '#FF5733' }],
    calculate: (inputs) => {
      let hex = inputs.hex.replace('#', '')
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
      if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return { results: [{ label: 'Error', value: 'Invalid HEX' }] }
      const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16)
      const h = r / 255, s = g / 255, l = b / 255
      const max = Math.max(h, s, l), min = Math.min(h, s, l)
      let hsl: number, sat: number, light = (max + min) / 2
      if (max === min) { hsl = 0; sat = 0 }
      else {
        const d = max - min
        sat = light > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case h: hsl = ((s - l) / d + (s < l ? 6 : 0)) / 6; break
          case s: hsl = ((l - h) / d + 2) / 6; break
          case l: hsl = ((h - s) / d + 4) / 6; break
          default: hsl = 0
        }
      }
      return { results: [{ label: 'HEX', value: `#${hex}`, highlight: true }, { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` }, { label: 'HSL', value: `hsl(${Math.round(hsl * 360)}, ${Math.round(sat * 100)}%, ${Math.round(light * 100)}%)` }], formula: { formula: 'Color space conversion', explanation: 'Convert between HEX, RGB, and HSL.' } }
    }
  },
  'text-counter': {
    name: 'Text Counter', description: 'Count chars', longDescription: 'Count characters, words, and lines.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Enter your text here...' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      const chars = text.length, charsNoSpace = text.replace(/\s/g, '').length, words = text.trim() ? text.trim().split(/\s+/).length : 0, lines = text ? text.split('\n').length : 0
      return { results: [{ label: 'Characters', value: chars, highlight: true }, { label: 'Characters (no spaces)', value: charsNoSpace }, { label: 'Words', value: words }, { label: 'Lines', value: lines }], formula: { formula: 'Text statistics', explanation: 'Basic text analysis.' } }
    }
  },
  'case-converter': {
    name: 'Case Converter', description: 'Convert case', longDescription: 'Convert text case.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Enter text' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      return { results: [{ label: 'UPPERCASE', value: text.toUpperCase() }, { label: 'lowercase', value: text.toLowerCase() }, { label: 'Title Case', value: text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), highlight: true }, { label: 'Sentence case', value: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() }], formula: { formula: 'Case transformation', explanation: 'Convert between text cases.' } }
    }
  },
  binary: {
    name: 'Binary Converter', description: 'Base conversion', longDescription: 'Convert between number bases.', category: 'tools', icon: Hash,
    inputs: [{ id: 'value', label: 'Value', placeholder: '255' }, { id: 'from', label: 'From Base', placeholder: '', type: 'select', options: [{ value: '10', label: 'Decimal' }, { value: '2', label: 'Binary' }, { value: '16', label: 'Hexadecimal' }, { value: '8', label: 'Octal' }] }],
    calculate: (inputs) => {
      const value = inputs.value, from = parseInt(inputs.from || '10')
      if (!value) return { results: [] }
      const decimal = parseInt(value, from)
      return { results: [{ label: 'Decimal', value: decimal.toString(), highlight: true }, { label: 'Binary', value: decimal.toString(2) }, { label: 'Hexadecimal', value: decimal.toString(16).toUpperCase() }, { label: 'Octal', value: decimal.toString(8) }], formula: { formula: 'Base conversion', explanation: `Convert ${value} from base ${from}` } }
    }
  },
  'roman-numeral': {
    name: 'Roman Numeral Converter', description: 'Convert numerals', longDescription: 'Convert between Roman and Arabic numerals.', category: 'tools', icon: Hash,
    inputs: [{ id: 'value', label: 'Number (1-3999)', placeholder: '2024' }],
    calculate: (inputs) => {
      const num = parseInt(inputs.value)
      if (isNaN(num) || num < 1 || num > 3999) return { results: [{ label: 'Error', value: 'Enter 1-3999' }] }
      const lookup: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
      let roman = '', n = num
      for (const [val, sym] of lookup) { while (n >= val) { roman += sym; n -= val } }
      return { results: [{ label: 'Roman Numeral', value: roman, highlight: true }], formula: { formula: 'Roman numeral conversion', explanation: `${num} = ${roman}` } }
    }
  },
  'qr-data': {
    name: 'QR Data Generator', description: 'QR generation', longDescription: 'Generate QR code data string.', category: 'tools', icon: Hash,
    inputs: [{ id: 'text', label: 'Text/URL', placeholder: 'https://example.com' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      return { results: [{ label: 'QR Data', value: text.slice(0, 50) + (text.length > 50 ? '...' : ''), highlight: true }, { label: 'Length', value: text.length }], infoCards: [{ title: 'Tip', content: 'Use a QR generator API with this data to create an image.', variant: 'info' }], formula: { formula: 'Text encoding', explanation: 'Data ready for QR encoding.' } }
    }
  },
  'unit-rate': {
    name: 'Unit Rate Calculator', description: 'Price per unit', longDescription: 'Calculate price per unit for comparison.', category: 'tools', icon: Calculator,
    inputs: [{ id: 'price', label: 'Total Price ($)', placeholder: '10' }, { id: 'quantity', label: 'Quantity', placeholder: '500' }, { id: 'unit', label: 'Unit', placeholder: 'g' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), qty = parseFloat(inputs.quantity)
      if (!price || !qty) return { results: [] }
      const rate = price / qty
      return { results: [{ label: 'Unit Rate', value: `$${rate.toFixed(4)} per ${inputs.unit || 'unit'}`, highlight: true }, { label: 'Per 100 units', value: `$${(rate * 100).toFixed(2)}` }], formula: { formula: 'Rate = Price / Quantity', explanation: 'Compare prices effectively.' } }
    }
  },
  proportion: {
    name: 'Proportion Calculator', description: 'Solve ratios', longDescription: 'Solve proportion problems.', category: 'tools', icon: Divide,
    inputs: [{ id: 'a', label: 'A', placeholder: '3' }, { id: 'b', label: 'B', placeholder: '4' }, { id: 'c', label: 'C', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a || !b || !c) return { results: [] }
      const d = (b * c) / a
      return { results: [{ label: 'D', value: d.toFixed(4), highlight: true }, { label: 'Proportion', value: `${a}:${b} = ${c}:${d.toFixed(2)}` }], formula: { formula: 'A:B = C:D', explanation: 'Cross multiply to solve.' } }
    }
  },
  'gcd-lcm': {
    name: 'GCD & LCM Calculator', description: 'Both together', longDescription: 'Calculate both GCD and LCM.', category: 'tools', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '12, 18, 24' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
      let g = nums[0], l = nums[0]
      for (let i = 1; i < nums.length; i++) { g = gcd(g, nums[i]); l = lcm(l, nums[i]) }
      return { results: [{ label: 'GCD', value: g, highlight: true }, { label: 'LCM', value: l, highlight: true }], formula: { formula: 'GCD and LCM algorithms', explanation: `Numbers: ${nums.join(', ')}` } }
    }
  },
  energy: {
    name: 'Energy Converter', description: 'Convert energy', longDescription: 'Convert between energy units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kwh', label: 'kWh' }, { value: 'btu', label: 'BTU' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kwh', label: 'kWh' }, { value: 'btu', label: 'BTU' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toJoules: Record<string, number> = { j: 1, cal: 4.184, kwh: 3600000, btu: 1055 }
      const joules = value * toJoules[inputs.from || 'j'], result = joules / toJoules[inputs.to || 'j']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Energy conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  angle: {
    name: 'Angle Converter', description: 'Degrees/radians', longDescription: 'Convert between angle units.', category: 'tools', icon: Target,
    inputs: [{ id: 'value', label: 'Angle', placeholder: '180' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'deg', label: 'Degrees' }, { value: 'rad', label: 'Radians' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const deg = inputs.from === 'rad' ? value * (180 / Math.PI) : value
      const rad = inputs.from === 'deg' ? value * (Math.PI / 180) : value
      return { results: [{ label: 'Degrees', value: deg.toFixed(4) + '°', highlight: true }, { label: 'Radians', value: rad.toFixed(4) + ' rad' }], formula: { formula: 'rad = deg × π/180', explanation: 'Angle unit conversion.' } }
    }
  },
  pressure: {
    name: 'Pressure Converter', description: 'Convert pressure', longDescription: 'Convert between pressure units.', category: 'tools', icon: Wind,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'ATM' }, { value: 'pa', label: 'Pascal' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'ATM' }, { value: 'pa', label: 'Pascal' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toAtm: Record<string, number> = { atm: 1, pa: 0.00000987, bar: 0.987, psi: 0.068 }
      const atm = value * toAtm[inputs.from || 'atm'], result = atm / toAtm[inputs.to || 'atm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Pressure conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  frequency: {
    name: 'Frequency Converter', description: 'Convert frequency', longDescription: 'Convert between frequency units.', category: 'tools', icon: Timer,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toHz: Record<string, number> = { hz: 1, khz: 1000, mhz: 1000000, ghz: 1000000000 }
      const hz = value * toHz[inputs.from || 'hz'], result = hz / toHz[inputs.to || 'hz']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Frequency conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  // MORE FINANCIAL CALCULATORS
  'home-affordability': {
    name: 'Home Affordability', description: 'How much house?', longDescription: 'Calculate how much home you can afford.', category: 'financial', icon: Home,
    inputs: [{ id: 'income', label: 'Annual Income ($)', placeholder: '80000' }, { id: 'down', label: 'Down Payment ($)', placeholder: '50000' }, { id: 'debts', label: 'Monthly Debts ($)', placeholder: '500' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '6.5' }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income), down = parseFloat(inputs.down) || 0, debts = parseFloat(inputs.debts) || 0, rate = parseFloat(inputs.rate) / 100 / 12
      if (!income) return { results: [] }
      const monthlyIncome = income / 12
      const maxPayment = monthlyIncome * 0.28 - debts
      const loan = rate > 0 ? maxPayment * ((Math.pow(1 + rate, 360) - 1) / (rate * Math.pow(1 + rate, 360))) : maxPayment * 360
      const maxHome = loan + down
      return { results: [{ label: 'Max Home Price', value: `$${Math.round(maxHome).toLocaleString()}`, highlight: true }, { label: 'Max Loan', value: `$${Math.round(loan).toLocaleString()}` }, { label: 'Monthly Payment', value: `$${Math.round(maxPayment).toLocaleString()}` }], formula: { formula: '28% Front-end DTI Rule', explanation: 'Based on 28% of gross income for housing.' } }
    }
  },
  'rent-vs-buy': {
    name: 'Rent vs Buy', description: 'Compare options', longDescription: 'Compare renting vs buying a home.', category: 'financial', icon: Home,
    inputs: [{ id: 'rent', label: 'Monthly Rent ($)', placeholder: '1500' }, { id: 'homePrice', label: 'Home Price ($)', placeholder: '350000' }, { id: 'down', label: 'Down Payment (%)', placeholder: '20' }, { id: 'years', label: 'Years to Stay', placeholder: '7' }],
    calculate: (inputs) => {
      const rent = parseFloat(inputs.rent), price = parseFloat(inputs.homePrice), downPct = parseFloat(inputs.down) || 20, years = parseFloat(inputs.years)
      if (!rent || !price || !years) return { results: [] }
      const down = price * downPct / 100
      const loan = price - down
      const monthlyPayment = loan * 0.005
      const propertyTax = price * 0.012 / 12
      const maintenance = price * 0.01 / 12
      const totalBuy = (monthlyPayment + propertyTax + maintenance) * years * 12 + down
      const totalRent = rent * years * 12
      const diff = totalRent - totalBuy
      return { results: [{ label: 'Total Rent Cost', value: `$${Math.round(totalRent).toLocaleString()}` }, { label: 'Total Buy Cost', value: `$${Math.round(totalBuy).toLocaleString()}` }, { label: 'Better Option', value: diff > 0 ? 'Buying' : 'Renting', highlight: true }], formula: { formula: 'Compare total costs', explanation: `After ${years} years, ${diff > 0 ? 'buying saves' : 'renting saves'} $${Math.abs(diff).toLocaleString()}` } }
    }
  },
  'credit-card-payoff': {
    name: 'Credit Card Payoff', description: 'Payoff timeline', longDescription: 'Calculate credit card payoff timeline.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'balance', label: 'Balance ($)', placeholder: '5000' }, { id: 'rate', label: 'APR (%)', placeholder: '18' }, { id: 'payment', label: 'Monthly Payment ($)', placeholder: '200' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), rate = parseFloat(inputs.rate) / 100 / 12, payment = parseFloat(inputs.payment)
      if (!balance || !payment) return { results: [] }
      const months = rate > 0 ? Math.ceil(-(Math.log(1 - (balance * rate) / payment)) / Math.log(1 + rate)) : Math.ceil(balance / payment)
      const totalPaid = payment * months
      const interest = totalPaid - balance
      return { results: [{ label: 'Months to Pay Off', value: months, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }, { label: 'Total Paid', value: `$${Math.round(totalPaid).toLocaleString()}` }], formula: { formula: 'Amortization formula', explanation: `${months} months at $${payment}/month` } }
    }
  },
  'emergency-fund': {
    name: 'Emergency Fund', description: 'Safety savings', longDescription: 'Calculate recommended emergency fund.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'expenses', label: 'Monthly Expenses ($)', placeholder: '3000' }, { id: 'months', label: 'Months Coverage', placeholder: '', type: 'select', options: [{ value: '3', label: '3 months (Minimum)' }, { value: '6', label: '6 months (Recommended)' }, { value: '12', label: '12 months (Secure)' }] }],
    calculate: (inputs) => {
      const expenses = parseFloat(inputs.expenses), months = parseFloat(inputs.months || '6')
      if (!expenses) return { results: [] }
      const total = expenses * months
      return { results: [{ label: 'Emergency Fund', value: `$${total.toLocaleString()}`, highlight: true }, { label: 'Monthly Savings (1 yr)', value: `$${Math.round(total / 12).toLocaleString()}` }], formula: { formula: 'Fund = Expenses × Months', explanation: `${months} months of expenses = $${total.toLocaleString()}` } }
    }
  },
  'college-savings': {
    name: 'College Savings', description: 'Education fund', longDescription: 'Calculate college savings goals.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'childAge', label: 'Child Age', placeholder: '5' }, { id: 'target', label: 'Target Amount ($)', placeholder: '100000' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '6' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.childAge), target = parseFloat(inputs.target), rate = parseFloat(inputs.rate) / 100 / 12
      if (!age || !target) return { results: [] }
      const yearsToCollege = 18 - age
      const n = yearsToCollege * 12
      const monthly = rate > 0 ? target / (((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate)) : target / n
      return { results: [{ label: 'Years to Save', value: yearsToCollege }, { label: 'Monthly Savings', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }], formula: { formula: 'Future value with contributions', explanation: `${yearsToCollege} years to reach $${target.toLocaleString()}` } }
    }
  },
  'student-loan': {
    name: 'Student Loan', description: 'Education debt', longDescription: 'Calculate student loan payments.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '35000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'term', label: 'Term (years)', placeholder: '10' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term) * 12
      if (!p || !term) return { results: [] }
      const monthly = rate > 0 ? p * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : p / term
      const total = monthly * term
      const interest = total - p
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }, { label: 'Total Paid', value: `$${Math.round(total).toLocaleString()}` }], formula: { formula: 'Standard amortization', explanation: `${term} monthly payments over ${inputs.term} years` } }
    }
  },
  'cagr': {
    name: 'CAGR Calculator', description: 'Compound growth', longDescription: 'Calculate Compound Annual Growth Rate.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'startValue', label: 'Starting Value ($)', placeholder: '10000' }, { id: 'endValue', label: 'Ending Value ($)', placeholder: '25000' }, { id: 'years', label: 'Years', placeholder: '5' }],
    calculate: (inputs) => {
      const start = parseFloat(inputs.startValue), end = parseFloat(inputs.endValue), years = parseFloat(inputs.years)
      if (!start || !end || !years) return { results: [] }
      const cagr = (Math.pow(end / start, 1 / years) - 1) * 100
      return { results: [{ label: 'CAGR', value: `${cagr.toFixed(2)}%`, highlight: true }, { label: 'Total Growth', value: `${((end - start) / start * 100).toFixed(1)}%` }], formula: { formula: 'CAGR = (End/Start)^(1/Years) - 1', explanation: `Annualized return over ${years} years` } }
    }
  },
  annuity: {
    name: 'Annuity Calculator', description: 'Future payouts', longDescription: 'Calculate annuity payments.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'principal', label: 'Principal ($)', placeholder: '100000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '5' }, { id: 'years', label: 'Payout Years', placeholder: '20' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), rate = parseFloat(inputs.rate) / 100 / 12, years = parseFloat(inputs.years), n = years * 12
      if (!p || !years) return { results: [] }
      const monthly = rate > 0 ? p * rate / (1 - Math.pow(1 + rate, -n)) : p / n
      const total = monthly * n
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Payout', value: `$${Math.round(total).toLocaleString()}` }], formula: { formula: 'Annuity payment formula', explanation: `${years} years of guaranteed payments` } }
    }
  },
  'ira-calculator': {
    name: 'IRA Calculator', description: 'Retirement account', longDescription: 'Calculate IRA growth potential.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'contribution', label: 'Annual Contribution ($)', placeholder: '6500' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '7' }, { id: 'years', label: 'Years to Grow', placeholder: '30' }],
    calculate: (inputs) => {
      const contrib = parseFloat(inputs.contribution), rate = parseFloat(inputs.rate) / 100, years = parseFloat(inputs.years)
      if (!contrib || !years) return { results: [] }
      const total = rate > 0 ? contrib * ((Math.pow(1 + rate, years) - 1) / rate) : contrib * years
      const contributions = contrib * years
      const earnings = total - contributions
      return { results: [{ label: 'Future Value', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Total Contributions', value: `$${contributions.toLocaleString()}` }, { label: 'Earnings', value: `$${Math.round(earnings).toLocaleString()}` }], formula: { formula: 'Future value of annuity', explanation: `${years} years of contributions` } }
    }
  },
  'capital-gains': {
    name: 'Capital Gains', description: 'Investment tax', longDescription: 'Calculate capital gains tax.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'purchase', label: 'Purchase Price ($)', placeholder: '50000' }, { id: 'sale', label: 'Sale Price ($)', placeholder: '80000' }, { id: 'holding', label: 'Holding Period', placeholder: '', type: 'select', options: [{ value: 'short', label: '< 1 year (Short-term)' }, { value: 'long', label: '> 1 year (Long-term)' }] }],
    calculate: (inputs) => {
      const purchase = parseFloat(inputs.purchase), sale = parseFloat(inputs.sale), holding = inputs.holding || 'long'
      if (!purchase || !sale) return { results: [] }
      const gain = sale - purchase
      const taxRate = holding === 'short' ? 0.32 : gain > 500000 ? 0.20 : 0.15
      const tax = gain * taxRate
      const net = sale - tax
      return { results: [{ label: 'Capital Gain', value: `$${gain.toLocaleString()}` }, { label: 'Tax Owed', value: `$${Math.round(tax).toLocaleString()}` }, { label: 'Net Proceeds', value: `$${Math.round(net).toLocaleString()}`, highlight: true }], formula: { formula: `Tax = Gain × ${taxRate * 100}%`, explanation: holding === 'long' ? 'Long-term capital gains rate' : 'Short-term (ordinary income rate)' } }
    }
  },
  'pmi-calculator': {
    name: 'PMI Calculator', description: 'Mortgage insurance', longDescription: 'Calculate Private Mortgage Insurance costs.', category: 'financial', icon: Home,
    inputs: [{ id: 'loan', label: 'Loan Amount ($)', placeholder: '280000' }, { id: 'downPct', label: 'Down Payment %', placeholder: '10' }],
    calculate: (inputs) => {
      const loan = parseFloat(inputs.loan), downPct = parseFloat(inputs.downPct) || 0
      if (!loan) return { results: [] }
      const ltv = 100 - downPct
      let pmiRate = ltv > 95 ? 0.012 : ltv > 90 ? 0.01 : ltv > 85 ? 0.006 : 0
      const monthlyPMI = loan * pmiRate / 12
      const annualPMI = monthlyPMI * 12
      return { results: [{ label: 'LTV Ratio', value: `${ltv.toFixed(1)}%` }, { label: 'Monthly PMI', value: `$${Math.round(monthlyPMI).toLocaleString()}`, highlight: true }, { label: 'Annual PMI', value: `$${Math.round(annualPMI).toLocaleString()}` }], formula: { formula: 'PMI = Loan × Rate / 12', explanation: downPct >= 20 ? 'No PMI with 20%+ down!' : 'PMI required for < 20% down' } }
    }
  },
  // ADDITIONAL FINANCIAL CALCULATORS
  'simple-interest': {
    name: 'Simple Interest Calculator', description: 'Basic interest', longDescription: 'Calculate simple interest on principal amount.', category: 'financial', icon: Percent,
    inputs: [{ id: 'principal', label: 'Principal ($)', placeholder: '10000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '5' }, { id: 'time', label: 'Time (years)', placeholder: '3' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.time)
      if (!p || !r || !t) return { results: [] }
      const interest = p * r * t
      const total = p + interest
      return { results: [{ label: 'Interest Earned', value: `$${interest.toLocaleString(undefined, {maximumFractionDigits: 2})}` }, { label: 'Total Amount', value: `$${total.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true }], formula: { formula: 'I = P × R × T', explanation: `Simple interest: ${p} × ${r*100}% × ${t} years` } }
    }
  },
  'present-value': {
    name: 'Present Value Calculator', description: 'PV of future money', longDescription: 'Calculate the present value of a future sum of money.', category: 'financial', icon: TrendingDown,
    inputs: [{ id: 'futureValue', label: 'Future Value ($)', placeholder: '50000' }, { id: 'rate', label: 'Discount Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const fv = parseFloat(inputs.futureValue), r = parseFloat(inputs.rate) / 100, n = parseFloat(inputs.years)
      if (!fv || !r || !n) return { results: [] }
      const pv = fv / Math.pow(1 + r, n)
      return { results: [{ label: 'Present Value', value: `$${Math.round(pv).toLocaleString()}`, highlight: true }, { label: 'Discount Factor', value: (1 / Math.pow(1 + r, n)).toFixed(4) }], formula: { formula: 'PV = FV / (1 + r)^n', explanation: `Today's value of $${fv.toLocaleString()} in ${n} years at ${r*100}% rate` } }
    }
  },
  'future-value': {
    name: 'Future Value Calculator', description: 'FV of current money', longDescription: 'Calculate the future value of a present sum.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'presentValue', label: 'Present Value ($)', placeholder: '10000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '7' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const pv = parseFloat(inputs.presentValue), r = parseFloat(inputs.rate) / 100, n = parseFloat(inputs.years)
      if (!pv || !r || !n) return { results: [] }
      const fv = pv * Math.pow(1 + r, n)
      const growth = fv - pv
      return { results: [{ label: 'Future Value', value: `$${Math.round(fv).toLocaleString()}`, highlight: true }, { label: 'Total Growth', value: `$${Math.round(growth).toLocaleString()}` }], formula: { formula: 'FV = PV × (1 + r)^n', explanation: `$${pv.toLocaleString()} will grow to $${Math.round(fv).toLocaleString()} in ${n} years` } }
    }
  },
  'annuity-payment': {
    name: 'Annuity Payment Calculator', description: 'Regular payment calc', longDescription: 'Calculate periodic payment for an annuity.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'presentValue', label: 'Present Value ($)', placeholder: '200000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '6' }, { id: 'periods', label: 'Number of Periods', placeholder: '360' }],
    calculate: (inputs) => {
      const pv = parseFloat(inputs.presentValue), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.periods)
      if (!pv || !n) return { results: [] }
      const payment = r > 0 ? pv * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : pv / n
      return { results: [{ label: 'Periodic Payment', value: `$${Math.round(payment).toLocaleString()}`, highlight: true }, { label: 'Total Payments', value: `$${Math.round(payment * n).toLocaleString()}` }], formula: { formula: 'PMT = PV × [r(1+r)^n] / [(1+r)^n - 1]', explanation: `${n} payments to amortize $${pv.toLocaleString()}` } }
    }
  },
  'annuity-future': {
    name: 'Annuity Future Value', description: 'Annuity FV', longDescription: 'Calculate future value of regular payments.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'payment', label: 'Monthly Payment ($)', placeholder: '500' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '7' }, { id: 'years', label: 'Years', placeholder: '20' }],
    calculate: (inputs) => {
      const pmt = parseFloat(inputs.payment), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.years) * 12
      if (!pmt || !n) return { results: [] }
      const fv = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n
      const contributions = pmt * n
      return { results: [{ label: 'Future Value', value: `$${Math.round(fv).toLocaleString()}`, highlight: true }, { label: 'Total Contributions', value: `$${Math.round(contributions).toLocaleString()}` }, { label: 'Interest Earned', value: `$${Math.round(fv - contributions).toLocaleString()}` }], formula: { formula: 'FV = PMT × [(1+r)^n - 1] / r', explanation: `Monthly $${pmt} for ${inputs.years} years` } }
    }
  },
  'sinking-fund': {
    name: 'Sinking Fund Calculator', description: 'Goal savings', longDescription: 'Calculate periodic deposits needed to reach a goal.', category: 'financial', icon: Target,
    inputs: [{ id: 'goal', label: 'Target Amount ($)', placeholder: '50000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years to Goal', placeholder: '10' }],
    calculate: (inputs) => {
      const goal = parseFloat(inputs.goal), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.years) * 12
      if (!goal || !n) return { results: [] }
      const payment = r > 0 ? goal * r / (Math.pow(1 + r, n) - 1) : goal / n
      const totalDeposits = payment * n
      return { results: [{ label: 'Monthly Deposit', value: `$${Math.round(payment).toLocaleString()}`, highlight: true }, { label: 'Total Deposits', value: `$${Math.round(totalDeposits).toLocaleString()}` }, { label: 'Interest Earned', value: `$${Math.round(goal - totalDeposits).toLocaleString()}` }], formula: { formula: 'PMT = FV × r / [(1+r)^n - 1]', explanation: `Save $${Math.round(payment)}/month to reach $${goal.toLocaleString()}` } }
    }
  },
  'loan-comparison': {
    name: 'Loan Comparison', description: 'Compare loans', longDescription: 'Compare two loan options side by side.', category: 'financial', icon: BarChart3,
    inputs: [{ id: 'amount', label: 'Loan Amount ($)', placeholder: '250000' }, { id: 'rate1', label: 'Rate Option 1 (%)', placeholder: '6.5' }, { id: 'rate2', label: 'Rate Option 2 (%)', placeholder: '7.0' }, { id: 'term', label: 'Term (years)', placeholder: '30' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), r1 = parseFloat(inputs.rate1) / 100 / 12, r2 = parseFloat(inputs.rate2) / 100 / 12, n = parseFloat(inputs.term) * 12
      if (!amount || !n) return { results: [] }
      const pmt1 = r1 > 0 ? amount * (r1 * Math.pow(1 + r1, n)) / (Math.pow(1 + r1, n) - 1) : amount / n
      const pmt2 = r2 > 0 ? amount * (r2 * Math.pow(1 + r2, n)) / (Math.pow(1 + r2, n) - 1) : amount / n
      const total1 = pmt1 * n, total2 = pmt2 * n
      const savings = total2 - total1
      return { results: [{ label: 'Option 1 Monthly', value: `$${Math.round(pmt1).toLocaleString()}` }, { label: 'Option 2 Monthly', value: `$${Math.round(pmt2).toLocaleString()}` }, { label: 'Option 1 Total', value: `$${Math.round(total1).toLocaleString()}` }, { label: 'Option 2 Total', value: `$${Math.round(total2).toLocaleString()}` }, { label: 'Savings with Option 1', value: `$${Math.round(savings).toLocaleString()}`, highlight: true }], formula: { formula: 'Compare total costs', explanation: `Option 1 saves $${Math.round(savings).toLocaleString()} over the loan term` } }
    }
  },
  'car-affordability': {
    name: 'Car Affordability', description: 'How much car can afford', longDescription: 'Calculate how much car you can afford based on budget.', category: 'financial', icon: Car,
    inputs: [{ id: 'monthly', label: 'Monthly Budget ($)', placeholder: '400' }, { id: 'rate', label: 'Loan Rate (%)', placeholder: '6' }, { id: 'term', label: 'Loan Term (months)', placeholder: '60' }, { id: 'down', label: 'Down Payment ($)', placeholder: '5000' }],
    calculate: (inputs) => {
      const monthly = parseFloat(inputs.monthly), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.term), down = parseFloat(inputs.down) || 0
      if (!monthly || !n) return { results: [] }
      const loanAmount = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))) : monthly * n
      const totalCar = loanAmount + down
      return { results: [{ label: 'Max Loan Amount', value: `$${Math.round(loanAmount).toLocaleString()}` }, { label: 'Total Car Price', value: `$${Math.round(totalCar).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round((monthly * n) - loanAmount).toLocaleString()}` }], formula: { formula: 'PV of payments + down payment', explanation: `You can afford a $${Math.round(totalCar).toLocaleString()} car` } }
    }
  },
  'hsa-calculator': {
    name: 'HSA Calculator', description: 'Health savings', longDescription: 'Calculate Health Savings Account contributions and growth.', category: 'financial', icon: Wallet,
    inputs: [{ id: 'annual', label: 'Annual Contribution ($)', placeholder: '3850' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '6' }, { id: 'years', label: 'Years to Grow', placeholder: '20' }, { id: 'withdrawal', label: 'Annual Medical Expenses ($)', placeholder: '1000' }],
    calculate: (inputs) => {
      const annual = parseFloat(inputs.annual), r = parseFloat(inputs.rate) / 100, years = parseFloat(inputs.years), withdrawal = parseFloat(inputs.withdrawal) || 0
      if (!annual || !years) return { results: [] }
      const netContrib = annual - withdrawal
      const fv = r > 0 ? netContrib * ((Math.pow(1 + r, years) - 1) / r) : netContrib * years
      const totalContrib = annual * years
      const taxSavings = totalContrib * 0.25
      return { results: [{ label: 'Total Contributions', value: `$${totalContrib.toLocaleString()}` }, { label: 'Estimated Balance', value: `$${Math.round(fv).toLocaleString()}`, highlight: true }, { label: 'Tax Savings (25% bracket)', value: `$${Math.round(taxSavings).toLocaleString()}` }], formula: { formula: 'Triple tax advantage', explanation: 'Tax-free contributions, growth, and withdrawals for medical' } }
    }
  },
  'social-security': {
    name: 'Social Security Calculator', description: 'SS benefits estimate', longDescription: 'Estimate Social Security retirement benefits.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'income', label: 'Average Annual Income ($)', placeholder: '60000' }, { id: 'currentAge', label: 'Current Age', placeholder: '50' }, { id: 'retireAge', label: 'Planned Retirement Age', placeholder: '67' }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income), currentAge = parseFloat(inputs.currentAge), retireAge = parseFloat(inputs.retireAge)
      if (!income || !currentAge || !retireAge) return { results: [] }
      const avgIndexedMonthly = income / 12 * 0.4
      const fullRetireAge = 67
      let monthlyBenefit = avgIndexedMonthly
      if (retireAge < fullRetireAge) {
        monthlyBenefit *= (1 - (fullRetireAge - retireAge) * 0.00556)
      } else if (retireAge > fullRetireAge) {
        monthlyBenefit *= (1 + (retireAge - fullRetireAge) * 0.08)
      }
      const annualBenefit = monthlyBenefit * 12
      const yearsRetired = 85 - retireAge
      const totalBenefit = annualBenefit * yearsRetired
      return { results: [{ label: 'Est. Monthly Benefit', value: `$${Math.round(monthlyBenefit).toLocaleString()}`, highlight: true }, { label: 'Annual Benefit', value: `$${Math.round(annualBenefit).toLocaleString()}` }, { label: 'Lifetime Benefit (to 85)', value: `$${Math.round(totalBenefit).toLocaleString()}` }], formula: { formula: 'Based on AIME and bend points', explanation: `Retiring at ${retireAge} affects your benefit` } }
    }
  },
  'pension-calculator': {
    name: 'Pension Calculator', description: 'Pension estimate', longDescription: 'Estimate monthly pension payments.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'salary', label: 'Final Salary ($)', placeholder: '80000' }, { id: 'years', label: 'Years of Service', placeholder: '30' }, { id: 'multiplier', label: 'Benefit Multiplier (%)', placeholder: '1.5' }],
    calculate: (inputs) => {
      const salary = parseFloat(inputs.salary), years = parseFloat(inputs.years), mult = parseFloat(inputs.multiplier) / 100
      if (!salary || !years) return { results: [] }
      const annualPension = salary * years * mult
      const monthlyPension = annualPension / 12
      const replacement = (annualPension / salary) * 100
      return { results: [{ label: 'Annual Pension', value: `$${Math.round(annualPension).toLocaleString()}` }, { label: 'Monthly Pension', value: `$${Math.round(monthlyPension).toLocaleString()}`, highlight: true }, { label: 'Income Replacement', value: `${replacement.toFixed(1)}%` }], formula: { formula: 'Pension = Salary × Years × Multiplier', explanation: `${years} years at ${mult*100}% multiplier` } }
    }
  },
  '401k-calculator': {
    name: '401(k) Calculator', description: '401k projection', longDescription: 'Calculate 401(k) growth with employer match.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'salary', label: 'Annual Salary ($)', placeholder: '75000' }, { id: 'contribution', label: 'Your Contribution (%)', placeholder: '10' }, { id: 'match', label: 'Employer Match (%)', placeholder: '4' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '7' }, { id: 'years', label: 'Years to Retirement', placeholder: '30' }],
    calculate: (inputs) => {
      const salary = parseFloat(inputs.salary), contrib = parseFloat(inputs.contribution) / 100, match = parseFloat(inputs.match) / 100, r = parseFloat(inputs.rate) / 100, years = parseFloat(inputs.years)
      if (!salary || !years) return { results: [] }
      const annualTotal = salary * (contrib + match)
      const fv = r > 0 ? annualTotal * ((Math.pow(1 + r, years) - 1) / r) : annualTotal * years
      const yourContrib = salary * contrib * years
      const employerContrib = salary * match * years
      return { results: [{ label: 'Your Contributions', value: `$${Math.round(yourContrib).toLocaleString()}` }, { label: 'Employer Match', value: `$${Math.round(employerContrib).toLocaleString()}` }, { label: 'Projected Balance', value: `$${Math.round(fv).toLocaleString()}`, highlight: true }], formula: { formula: 'FV with annual contributions', explanation: `Free money! Employer match is ${match*100}% of salary` } }
    }
  },
  'rule-of-72': {
    name: 'Rule of 72', description: 'Doubling time', longDescription: 'Calculate how long it takes for money to double.', category: 'financial', icon: Zap,
    inputs: [{ id: 'rate', label: 'Annual Return Rate (%)', placeholder: '8' }],
    calculate: (inputs) => {
      const rate = parseFloat(inputs.rate)
      if (!rate || rate <= 0) return { results: [] }
      const years = 72 / rate
      const quadruple = years * 2
      return { results: [{ label: 'Doubling Time', value: `${years.toFixed(1)} years`, highlight: true }, { label: 'Quadruple Time', value: `${quadruple.toFixed(1)} years` }, { label: 'At Rate', value: `${rate}%` }], formula: { formula: 'Years to Double = 72 / Rate', explanation: `At ${rate}% return, money doubles every ${years.toFixed(1)} years` } }
    }
  },
  'cagr-calculator': {
    name: 'CAGR Calculator', description: 'Compound annual growth', longDescription: 'Calculate Compound Annual Growth Rate for investments.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'startValue', label: 'Beginning Value ($)', placeholder: '10000' }, { id: 'endValue', label: 'Ending Value ($)', placeholder: '25000' }, { id: 'years', label: 'Number of Years', placeholder: '5' }],
    calculate: (inputs) => {
      const start = parseFloat(inputs.startValue), end = parseFloat(inputs.endValue), n = parseFloat(inputs.years)
      if (!start || !end || !n || start <= 0) return { results: [] }
      const cagr = (Math.pow(end / start, 1 / n) - 1) * 100
      const totalReturn = ((end - start) / start) * 100
      return { results: [{ label: 'CAGR', value: `${cagr.toFixed(2)}%`, highlight: true }, { label: 'Total Return', value: `${totalReturn.toFixed(1)}%` }, { label: 'Absolute Gain', value: `$${(end - start).toLocaleString()}` }], formula: { formula: 'CAGR = (End/Start)^(1/n) - 1', explanation: `Annualized return over ${n} years` } }
    }
  },
  'npv-calculator': {
    name: 'NPV Calculator', description: 'Net present value', longDescription: 'Calculate Net Present Value of an investment.', category: 'financial', icon: BarChart3,
    inputs: [{ id: 'initialInvestment', label: 'Initial Investment ($)', placeholder: '100000' }, { id: 'cashFlows', label: 'Annual Cash Flows ($)', placeholder: '25000' }, { id: 'rate', label: 'Discount Rate (%)', placeholder: '8' }, { id: 'years', label: 'Number of Years', placeholder: '5' }],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initialInvestment), cashFlow = parseFloat(inputs.cashFlows), r = parseFloat(inputs.rate) / 100, n = parseFloat(inputs.years)
      if (!initial || !cashFlow || !n) return { results: [] }
      let pvCashFlows = 0
      for (let i = 1; i <= n; i++) {
        pvCashFlows += cashFlow / Math.pow(1 + r, i)
      }
      const npv = pvCashFlows - initial
      return { results: [{ label: 'PV of Cash Flows', value: `$${Math.round(pvCashFlows).toLocaleString()}` }, { label: 'NPV', value: `$${Math.round(npv).toLocaleString()}`, highlight: true }, { label: 'Investment Decision', value: npv > 0 ? 'Profitable Investment' : 'Not Recommended' }], formula: { formula: 'NPV = Σ(CF/(1+r)^t) - Initial', explanation: npv > 0 ? 'Positive NPV indicates good investment' : 'Negative NPV - reconsider investment' } }
    }
  },
  // MORE MATH CALCULATORS
  'nth-root': {
    name: 'Nth Root', description: 'Any root', longDescription: 'Calculate the nth root of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'number', label: 'Number', placeholder: '27' }, { id: 'root', label: 'Root (n)', placeholder: '3' }],
    calculate: (inputs) => {
      const num = parseFloat(inputs.number), n = parseFloat(inputs.root)
      if (!num || !n) return { results: [] }
      const result = Math.pow(num, 1/n)
      return { results: [{ label: `${n}th Root`, value: result.toFixed(6), highlight: true }, { label: 'Verification', value: `${result.toFixed(4)}^${n} = ${Math.pow(result, n).toFixed(4)}` }], formula: { formula: 'ⁿ√x = x^(1/n)', explanation: `${n}th root of ${num}` } }
    }
  },
  permutation: {
    name: 'Permutation', description: 'nPr calculation', longDescription: 'Calculate permutations nPr.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'n (total)', placeholder: '10' }, { id: 'r', label: 'r (select)', placeholder: '3' }],
    calculate: (inputs) => {
      const n = parseFloat(inputs.n), r = parseFloat(inputs.r)
      if (isNaN(n) || isNaN(r) || r > n) return { results: [] }
      let result = 1
      for (let i = 0; i < r; i++) result *= (n - i)
      return { results: [{ label: 'Permutations (nPr)', value: result.toLocaleString(), highlight: true }], formula: { formula: 'nPr = n! / (n-r)!', explanation: `Ways to arrange ${r} items from ${n}` } }
    }
  },
  combination: {
    name: 'Combination', description: 'nCr calculation', longDescription: 'Calculate combinations nCr.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'n (total)', placeholder: '10' }, { id: 'r', label: 'r (select)', placeholder: '3' }],
    calculate: (inputs) => {
      const n = parseFloat(inputs.n), r = parseFloat(inputs.r)
      if (isNaN(n) || isNaN(r) || r > n) return { results: [] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const result = factorial(n) / (factorial(r) * factorial(n - r))
      return { results: [{ label: 'Combinations (nCr)', value: result.toLocaleString(), highlight: true }], formula: { formula: 'nCr = n! / (r! × (n-r)!)', explanation: `Ways to choose ${r} items from ${n}` } }
    }
  },
  trigonometry: {
    name: 'Trigonometry', description: 'Sin, cos, tan', longDescription: 'Calculate trigonometric functions.', category: 'math', icon: Calculator,
    inputs: [{ id: 'angle', label: 'Angle (degrees)', placeholder: '45' }],
    calculate: (inputs) => {
      const angle = parseFloat(inputs.angle)
      if (isNaN(angle)) return { results: [] }
      const rad = angle * Math.PI / 180
      return { results: [{ label: 'sin', value: Math.sin(rad).toFixed(6), highlight: true }, { label: 'cos', value: Math.cos(rad).toFixed(6) }, { label: 'tan', value: Math.tan(rad).toFixed(6) }], formula: { formula: 'Trig functions in radians', explanation: `${angle}° = ${rad.toFixed(4)} radians` } }
    }
  },
  'geometric-mean': {
    name: 'Geometric Mean', description: 'Average of ratios', longDescription: 'Calculate geometric mean.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '2, 4, 8' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter positive numbers' }] }
      const product = nums.reduce((a, b) => a * b, 1)
      const gm = Math.pow(product, 1 / nums.length)
      return { results: [{ label: 'Geometric Mean', value: gm.toFixed(4), highlight: true }], formula: { formula: 'GM = ⁿ√(x₁ × x₂ × ... × xₙ)', explanation: `Product root of ${nums.length} numbers` } }
    }
  },
  'standard-deviation': {
    name: 'Standard Deviation', description: 'Data spread', longDescription: 'Calculate standard deviation.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '5, 10, 15, 20, 25' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (nums.length < 2) return { results: [] }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length
      const stdDev = Math.sqrt(variance)
      return { results: [{ label: 'Mean', value: mean.toFixed(2) }, { label: 'Std Deviation', value: stdDev.toFixed(4), highlight: true }, { label: 'Variance', value: variance.toFixed(4) }], formula: { formula: 'σ = √(Σ(x - μ)² / n)', explanation: 'Population standard deviation' } }
    }
  },
  'binomial-probability': {
    name: 'Binomial Probability', description: 'Success trials', longDescription: 'Calculate binomial probability.', category: 'math', icon: Target,
    inputs: [{ id: 'trials', label: 'Number of Trials (n)', placeholder: '10' }, { id: 'successes', label: 'Successes (k)', placeholder: '3' }, { id: 'probability', label: 'Success Probability (p)', placeholder: '0.5' }],
    calculate: (inputs) => {
      const n = parseFloat(inputs.trials), k = parseFloat(inputs.successes), p = parseFloat(inputs.probability)
      if (isNaN(n) || isNaN(k) || isNaN(p)) return { results: [] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const comb = factorial(n) / (factorial(k) * factorial(n - k))
      const prob = comb * Math.pow(p, k) * Math.pow(1 - p, n - k)
      return { results: [{ label: 'Probability', value: `${(prob * 100).toFixed(2)}%`, highlight: true }, { label: 'Combinations', value: comb.toLocaleString() }], formula: { formula: 'P(X=k) = C(n,k) × p^k × (1-p)^(n-k)', explanation: `Probability of exactly ${k} successes in ${n} trials` } }
    }
  },
  // MORE DATETIME CALCULATORS
  'time-add-subtract': {
    name: 'Time Add/Subtract', description: 'Time arithmetic', longDescription: 'Add or subtract time.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'time', label: 'Time (HH:MM)', placeholder: '14:30' }, { id: 'hours', label: 'Hours (+/-)', placeholder: '2' }, { id: 'minutes', label: 'Minutes (+/-)', placeholder: '15' }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const [h, m] = inputs.time.split(':').map(Number)
      const hours = parseFloat(inputs.hours) || 0, mins = parseFloat(inputs.minutes) || 0
      let totalMins = h * 60 + m + hours * 60 + mins
      while (totalMins < 0) totalMins += 1440
      totalMins = totalMins % 1440
      const newH = Math.floor(totalMins / 60), newM = totalMins % 60
      return { results: [{ label: 'New Time', value: `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`, highlight: true }], formula: { formula: 'Time arithmetic', explanation: `${inputs.time} ${hours >= 0 ? '+' : ''}${hours}h ${mins >= 0 ? '+' : ''}${mins}m` } }
    }
  },
  'work-days': {
    name: 'Work Days', description: 'Business days', longDescription: 'Calculate business days between dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      let current = new Date(inputs.start), end = new Date(inputs.end)
      let workDays = 0
      while (current <= end) {
        const day = current.getDay()
        if (day !== 0 && day !== 6) workDays++
        current.setDate(current.getDate() + 1)
      }
      const totalDays = Math.ceil((end.getTime() - new Date(inputs.start).getTime()) / (1000 * 60 * 60 * 24)) + 1
      return { results: [{ label: 'Work Days', value: workDays, highlight: true }, { label: 'Total Days', value: totalDays }, { label: 'Weekends', value: totalDays - workDays }], formula: { formula: 'Excludes Sat & Sun', explanation: 'Monday through Friday only' } }
    }
  },
  'unix-timestamp': {
    name: 'Unix Timestamp', description: 'Epoch converter', longDescription: 'Convert between date and Unix timestamp.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'time', label: 'Time', placeholder: '12:00' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(`${inputs.date}T${inputs.time || '00:00'}`)
      const timestamp = Math.floor(date.getTime() / 1000)
      return { results: [{ label: 'Unix Timestamp', value: timestamp.toLocaleString(), highlight: true }, { label: 'Milliseconds', value: date.getTime().toLocaleString() }], formula: { formula: 'Seconds since Jan 1, 1970', explanation: 'Unix epoch time' } }
    }
  },
  'moon-phase': {
    name: 'Moon Phase', description: 'Lunar phase', longDescription: 'Calculate moon phase for a date.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lunarCycle = 29.53
      const knownNewMoon = new Date('2000-01-06')
      const daysSince = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
      const phase = (daysSince % lunarCycle) / lunarCycle
      let phaseName: string
      if (phase < 0.125) phaseName = '🌑 New Moon'
      else if (phase < 0.25) phaseName = '🌒 Waxing Crescent'
      else if (phase < 0.375) phaseName = '🌓 First Quarter'
      else if (phase < 0.5) phaseName = '🌔 Waxing Gibbous'
      else if (phase < 0.625) phaseName = '🌕 Full Moon'
      else if (phase < 0.75) phaseName = '🌖 Waning Gibbous'
      else if (phase < 0.875) phaseName = '🌗 Last Quarter'
      else phaseName = '🌘 Waning Crescent'
      return { results: [{ label: 'Moon Phase', value: phaseName, highlight: true }, { label: 'Illumination', value: `${Math.round(Math.abs(Math.cos(phase * 2 * Math.PI)) * 100)}%` }], formula: { formula: '29.53 day lunar cycle', explanation: 'Based on synodic month' } }
    }
  },
  'chinese-zodiac': {
    name: 'Chinese Zodiac', description: 'Animal sign', longDescription: 'Find your Chinese zodiac animal.', category: 'datetime', icon: Star,
    inputs: [{ id: 'year', label: 'Birth Year', placeholder: '1990' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year)
      if (!year) return { results: [] }
      const animals = ['Rat 🐀', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇', 'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐', 'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖']
      const animal = animals[(year - 4) % 12]
      return { results: [{ label: 'Chinese Zodiac', value: animal, highlight: true }], formula: { formula: '12-year cycle', explanation: 'Based on Chinese lunar calendar' } }
    }
  },
  // MORE DATETIME CALCULATORS
  'date-add': {
    name: 'Date Add', description: 'Add days/weeks/months', longDescription: 'Add days, weeks, or months to a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'amount', label: 'Amount', placeholder: '30' }, { id: 'unit', label: 'Unit', placeholder: '', type: 'select', options: [{ value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }] }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), amount = parseInt(inputs.amount) || 0, unit = inputs.unit || 'days'
      switch (unit) {
        case 'days': date.setDate(date.getDate() + amount); break
        case 'weeks': date.setDate(date.getDate() + amount * 7); break
        case 'months': date.setMonth(date.getMonth() + amount); break
        case 'years': date.setFullYear(date.getFullYear() + amount); break
      }
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }, { label: 'ISO Format', value: date.toISOString().split('T')[0] }], formula: { formula: `Date + ${amount} ${unit}`, explanation: `Added ${amount} ${unit} to the start date.` } }
    }
  },
  'date-subtract': {
    name: 'Date Subtract', description: 'Subtract from date', longDescription: 'Subtract days, weeks, or months from a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'amount', label: 'Amount', placeholder: '30' }, { id: 'unit', label: 'Unit', placeholder: '', type: 'select', options: [{ value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }] }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), amount = parseInt(inputs.amount) || 0, unit = inputs.unit || 'days'
      switch (unit) {
        case 'days': date.setDate(date.getDate() - amount); break
        case 'weeks': date.setDate(date.getDate() - amount * 7); break
        case 'months': date.setMonth(date.getMonth() - amount); break
        case 'years': date.setFullYear(date.getFullYear() - amount); break
      }
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }, { label: 'ISO Format', value: date.toISOString().split('T')[0] }], formula: { formula: `Date - ${amount} ${unit}`, explanation: `Subtracted ${amount} ${unit} from the start date.` } }
    }
  },
  'date-compare': {
    name: 'Date Compare', description: 'Compare two dates', longDescription: 'Compare two dates and find the difference.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date1', label: 'First Date', placeholder: '', type: 'date' }, { id: 'date2', label: 'Second Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date1 || !inputs.date2) return { results: [] }
      const d1 = new Date(inputs.date1), d2 = new Date(inputs.date2)
      const diff = d2.getTime() - d1.getTime()
      const days = Math.abs(diff / (1000 * 60 * 60 * 24))
      const weeks = days / 7, months = days / 30.44, years = days / 365.25
      const comparison = diff > 0 ? 'First date is earlier' : diff < 0 ? 'Second date is earlier' : 'Dates are equal'
      return { results: [{ label: 'Comparison', value: comparison, highlight: true }, { label: 'Days Apart', value: Math.floor(days) }, { label: 'Weeks Apart', value: weeks.toFixed(1) }, { label: 'Months Apart', value: months.toFixed(1) }], formula: { formula: 'Difference = |Date2 - Date1|', explanation: `The dates are ${Math.floor(days)} days apart.` } }
    }
  },
  'date-range-days': {
    name: 'Date Range Days', description: 'List all dates', longDescription: 'Generate a list of all dates between two dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end)
      const dates: string[] = [], current = new Date(start)
      while (current <= end) {
        dates.push(current.toDateString())
        current.setDate(current.getDate() + 1)
      }
      return { results: [{ label: 'Total Days', value: dates.length, highlight: true }, { label: 'First Date', value: start.toDateString() }, { label: 'Last Date', value: end.toDateString() }, { label: 'Sample Dates', value: dates.slice(0, 5).join(', ') + (dates.length > 5 ? '...' : '') }], formula: { formula: 'All dates from Start to End', explanation: `Generated ${dates.length} consecutive dates.` } }
    }
  },
  'business-days-add': {
    name: 'Business Days Add', description: 'Add business days', longDescription: 'Add business days (Mon-Fri) to a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'days', label: 'Business Days', placeholder: '10' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), days = parseInt(inputs.days) || 0
      let added = 0
      while (added < Math.abs(days)) {
        date.setDate(date.getDate() + (days >= 0 ? 1 : -1))
        if (date.getDay() !== 0 && date.getDay() !== 6) added++
      }
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }, { label: 'Day of Week', value: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()] }], formula: { formula: 'Add only Mon-Fri', explanation: `Added ${Math.abs(days)} business days.` } }
    }
  },
  'business-days-subtract': {
    name: 'Business Days Subtract', description: 'Subtract business days', longDescription: 'Subtract business days (Mon-Fri) from a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'days', label: 'Business Days', placeholder: '10' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), days = parseInt(inputs.days) || 0
      let subtracted = 0
      while (subtracted < Math.abs(days)) {
        date.setDate(date.getDate() - 1)
        if (date.getDay() !== 0 && date.getDay() !== 6) subtracted++
      }
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }, { label: 'Day of Week', value: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()] }], formula: { formula: 'Subtract only Mon-Fri', explanation: `Subtracted ${Math.abs(days)} business days.` } }
    }
  },
  'holiday-finder': {
    name: 'Holiday Finder', description: 'Find holidays', longDescription: 'Find major holidays for a given year.', category: 'datetime', icon: Star,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year) || new Date().getFullYear()
      const holidays = [
        { name: "New Year's Day", date: new Date(year, 0, 1) },
        { name: "Valentine's Day", date: new Date(year, 1, 14) },
        { name: "St. Patrick's Day", date: new Date(year, 2, 17) },
        { name: "April Fools' Day", date: new Date(year, 3, 1) },
        { name: "Independence Day (US)", date: new Date(year, 6, 4) },
        { name: "Halloween", date: new Date(year, 9, 31) },
        { name: "Veterans Day", date: new Date(year, 10, 11) },
        { name: "Christmas Eve", date: new Date(year, 11, 24) },
        { name: "Christmas Day", date: new Date(year, 11, 25) },
        { name: "New Year's Eve", date: new Date(year, 11, 31) }
      ]
      const results = holidays.map(h => ({ label: h.name, value: h.date.toDateString() }))
      return { results: [{ label: 'Year', value: year, highlight: true }, ...results], formula: { formula: 'Fixed date holidays', explanation: 'Major holidays for the year. Note: Floating holidays vary.' } }
    }
  },
  'weekend-finder': {
    name: 'Weekend Finder', description: 'Count weekends', longDescription: 'Count weekend days between two dates.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end)
      let saturdays = 0, sundays = 0, current = new Date(start)
      while (current <= end) {
        if (current.getDay() === 0) sundays++
        else if (current.getDay() === 6) saturdays++
        current.setDate(current.getDate() + 1)
      }
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return { results: [{ label: 'Total Weekends', value: saturdays + sundays, highlight: true }, { label: 'Saturdays', value: saturdays }, { label: 'Sundays', value: sundays }, { label: 'Total Days', value: totalDays }], formula: { formula: 'Count Sat + Sun', explanation: `${saturdays + sundays} weekend days in the range.` } }
    }
  },
  'days-in-month': {
    name: 'Days in Month', description: 'Days in specific month', longDescription: 'Find the number of days in a specific month.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'month', label: 'Month', placeholder: '', type: 'select', options: [{ value: '0', label: 'January' }, { value: '1', label: 'February' }, { value: '2', label: 'March' }, { value: '3', label: 'April' }, { value: '4', label: 'May' }, { value: '5', label: 'June' }, { value: '6', label: 'July' }, { value: '7', label: 'August' }, { value: '8', label: 'September' }, { value: '9', label: 'October' }, { value: '10', label: 'November' }, { value: '11', label: 'December' }] }, { id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const month = parseInt(inputs.month) || 0, year = parseInt(inputs.year) || new Date().getFullYear()
      const days = new Date(year, month + 1, 0).getDate()
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return { results: [{ label: 'Days', value: days, highlight: true }, { label: 'Month', value: monthNames[month] }, { label: 'Year', value: year }], formula: { formula: 'Days = last day of month', explanation: `${monthNames[month]} ${year} has ${days} days.` } }
    }
  },
  'days-in-year': {
    name: 'Days in Year', description: 'Days in year', longDescription: 'Find the number of days in a specific year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year) || new Date().getFullYear()
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      const days = isLeap ? 366 : 365
      return { results: [{ label: 'Total Days', value: days, highlight: true }, { label: 'Leap Year', value: isLeap ? 'Yes' : 'No' }, { label: 'Year', value: year }], formula: { formula: 'Leap year = 366 days, Normal = 365', explanation: `${year} has ${days} days.` } }
    }
  },
  'seconds-in-day': {
    name: 'Seconds in Day', description: 'Time conversions', longDescription: 'Calculate total seconds in any number of days.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'days', label: 'Days', placeholder: '1' }],
    calculate: (inputs) => {
      const days = parseFloat(inputs.days) || 0
      const seconds = days * 86400
      const minutes = seconds / 60, hours = minutes / 60
      return { results: [{ label: 'Seconds', value: seconds.toLocaleString(), highlight: true }, { label: 'Minutes', value: minutes.toLocaleString() }, { label: 'Hours', value: hours.toLocaleString() }, { label: 'Days', value: days }], formula: { formula: 'Seconds = Days × 86,400', explanation: 'One day has 86,400 seconds.' } }
    }
  },
  'hours-in-week': {
    name: 'Hours in Week', description: 'Time calculations', longDescription: 'Calculate total hours in any number of weeks.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'weeks', label: 'Weeks', placeholder: '1' }],
    calculate: (inputs) => {
      const weeks = parseFloat(inputs.weeks) || 0
      const hours = weeks * 168
      const days = weeks * 7, minutes = hours * 60, seconds = minutes * 60
      return { results: [{ label: 'Hours', value: hours.toLocaleString(), highlight: true }, { label: 'Days', value: days.toLocaleString() }, { label: 'Minutes', value: minutes.toLocaleString() }, { label: 'Seconds', value: seconds.toLocaleString() }], formula: { formula: 'Hours = Weeks × 168', explanation: 'One week has 168 hours.' } }
    }
  },
  'minutes-in-year': {
    name: 'Minutes in Year', description: 'Annual minutes', longDescription: 'Calculate total minutes in a year.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year) || new Date().getFullYear()
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      const days = isLeap ? 366 : 365
      const minutes = days * 24 * 60
      const hours = minutes / 60, seconds = minutes * 60
      return { results: [{ label: 'Minutes', value: minutes.toLocaleString(), highlight: true }, { label: 'Hours', value: hours.toLocaleString() }, { label: 'Seconds', value: seconds.toLocaleString() }, { label: 'Days', value: days }], formula: { formula: 'Minutes = Days × 24 × 60', explanation: `${year} has ${minutes.toLocaleString()} minutes.` } }
    }
  },
  'time-zone-convert': {
    name: 'Time Zone Convert', description: 'Convert between zones', longDescription: 'Convert time between multiple time zones.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'time', label: 'Time', placeholder: '12:00' }, { id: 'fromZone', label: 'From Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'cst', label: 'CST (UTC-6)' }, { value: 'mst', label: 'MST (UTC-7)' }, { value: 'ist', label: 'IST (UTC+5:30)' }, { value: 'jst', label: 'JST (UTC+9)' }, { value: 'cet', label: 'CET (UTC+1)' }] }, { id: 'toZone', label: 'To Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'cst', label: 'CST (UTC-6)' }, { value: 'mst', label: 'MST (UTC-7)' }, { value: 'ist', label: 'IST (UTC+5:30)' }, { value: 'jst', label: 'JST (UTC+9)' }, { value: 'cet', label: 'CET (UTC+1)' }] }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const offsets: Record<string, number> = { utc: 0, est: -5, pst: -8, cst: -6, mst: -7, ist: 5.5, jst: 9, cet: 1 }
      const [h, m] = inputs.time.split(':').map(Number)
      const fromOffset = offsets[inputs.fromZone || 'utc'] || 0
      const toOffset = offsets[inputs.toZone || 'utc'] || 0
      let totalMins = h * 60 + m - fromOffset * 60 + toOffset * 60
      if (totalMins < 0) totalMins += 24 * 60
      if (totalMins >= 24 * 60) totalMins -= 24 * 60
      const newH = Math.floor(totalMins / 60), newM = totalMins % 60
      return { results: [{ label: 'Converted Time', value: `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`, highlight: true }, { label: 'From Zone', value: inputs.fromZone?.toUpperCase() || 'UTC' }, { label: 'To Zone', value: inputs.toZone?.toUpperCase() || 'UTC' }], formula: { formula: 'Time + Offset Difference', explanation: `Converted from ${inputs.fromZone} to ${inputs.toZone}` } }
    }
  },
  'time-difference-hours': {
    name: 'Time Difference Hours', description: 'Hours between times', longDescription: 'Calculate the exact hours and minutes between two times.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '17:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60, totalHours = diff / 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Total Hours', value: totalHours.toFixed(2) }, { label: 'Total Minutes', value: diff }], formula: { formula: 'Hours = (End - Start) / 60', explanation: `${totalHours.toFixed(2)} hours between ${inputs.start} and ${inputs.end}.` } }
    }
  },
  'meeting-scheduler': {
    name: 'Meeting Scheduler', description: 'Find overlap', longDescription: 'Find overlapping time for meetings across time zones.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'zone1', label: 'Timezone 1', placeholder: '', type: 'select', options: [{ value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }, { value: 'jst', label: 'JST (UTC+9)' }] }, { id: 'zone2', label: 'Timezone 2', placeholder: '', type: 'select', options: [{ value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }, { value: 'jst', label: 'JST (UTC+9)' }] }],
    calculate: (inputs) => {
      const offsets: Record<string, number> = { est: -5, pst: -8, ist: 5.5, jst: 9 }
      const offset1 = offsets[inputs.zone1 || 'est'] || -5
      const offset2 = offsets[inputs.zone2 || 'pst'] || -8
      const diff = Math.abs(offset1 - offset2)
      const overlapStart = 9 + Math.max(offset1, offset2)
      const overlapEnd = 17 + Math.min(offset1, offset2)
      const overlapHours = Math.max(0, overlapEnd - overlapStart)
      return { results: [{ label: 'Time Difference', value: `${diff} hours`, highlight: true }, { label: 'Overlap Window', value: overlapHours > 0 ? `${overlapHours.toFixed(1)} hours` : 'No overlap' }, { label: 'Best Meeting Time (UTC)', value: `${Math.max(14, 14 + Math.max(offset1, offset2))}:00 - ${Math.min(22, 22 + Math.min(offset1, offset2))}:00` }], formula: { formula: 'Find common working hours', explanation: 'Overlap during 9 AM - 5 PM local time.' } }
    }
  },
  'age-in-days': {
    name: 'Age in Days', description: 'Days since birth', longDescription: 'Calculate your exact age in days.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      today.setHours(0, 0, 0, 0)
      const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Age in Days', value: days.toLocaleString(), highlight: true }, { label: 'Age in Weeks', value: Math.floor(days / 7).toLocaleString() }, { label: 'Birth Date', value: birth.toDateString() }], formula: { formula: 'Days = Today - Birth', explanation: `You have lived ${days.toLocaleString()} days!` } }
    }
  },
  'age-in-weeks': {
    name: 'Age in Weeks', description: 'Weeks since birth', longDescription: 'Calculate your exact age in weeks.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      today.setHours(0, 0, 0, 0)
      const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7), remainingDays = days % 7
      return { results: [{ label: 'Age in Weeks', value: weeks.toLocaleString(), highlight: true }, { label: 'Remaining Days', value: remainingDays }, { label: 'Total Days', value: days.toLocaleString() }], formula: { formula: 'Weeks = Days / 7', explanation: `You are ${weeks.toLocaleString()} weeks and ${remainingDays} days old.` } }
    }
  },
  'age-in-months': {
    name: 'Age in Months', description: 'Months since birth', longDescription: 'Calculate your exact age in months.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      let months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth())
      if (today.getDate() < birth.getDate()) months--
      const years = Math.floor(months / 12), remainingMonths = months % 12
      return { results: [{ label: 'Age in Months', value: months.toLocaleString(), highlight: true }, { label: 'Years + Months', value: `${years}y ${remainingMonths}m` }, { label: 'Birth Date', value: birth.toDateString() }], formula: { formula: 'Months = (Year diff × 12) + Month diff', explanation: `You are ${months} months old.` } }
    }
  },
  'next-birthday': {
    name: 'Next Birthday', description: 'Days until birthday', longDescription: 'Calculate days until your next birthday.', category: 'datetime', icon: Star,
    inputs: [{ id: 'birthdate', label: 'Birthday', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const today = new Date(), birth = new Date(inputs.birthdate)
      let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
      if (next < today) next.setFullYear(today.getFullYear() + 1)
      const days = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      const age = next.getFullYear() - birth.getFullYear()
      return { results: [{ label: 'Days Until Birthday', value: days, highlight: true }, { label: 'Next Birthday', value: next.toDateString() }, { label: 'Turning Age', value: age }], formula: { formula: 'Next Birthday - Today', explanation: days === 0 ? 'Happy Birthday! 🎂' : `${days} days until your birthday!` } }
    }
  },
  'birthday-day': {
    name: 'Birthday Day', description: 'Day of week born', longDescription: 'Find what day of the week you were born on.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const dayName = days[birth.getDay()]
      const poem = ['Child of the Sun', 'Fair of Face', 'Full of Grace', 'Loving and Giving', 'Works Hard for a Living', 'Loves to Travel', 'Generous and Kind'][birth.getDay()]
      return { results: [{ label: 'Day of Week', value: dayName, highlight: true }, { label: 'Birth Poem', value: poem }, { label: 'Date', value: birth.toDateString() }], formula: { formula: 'Get day from date', explanation: `You were born on a ${dayName}.` } }
    }
  },
  'anniversary-calc': {
    name: 'Anniversary Calculator', description: 'Anniversary date', longDescription: 'Calculate upcoming anniversaries.', category: 'datetime', icon: Heart,
    inputs: [{ id: 'startdate', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'years', label: 'Anniversary Years', placeholder: '25' }],
    calculate: (inputs) => {
      if (!inputs.startdate) return { results: [] }
      const start = new Date(inputs.startdate), years = parseInt(inputs.years) || 1
      const anniversary = new Date(start.getFullYear() + years, start.getMonth(), start.getDate())
      const today = new Date()
      const daysUntil = Math.ceil((anniversary.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Anniversary Date', value: anniversary.toDateString(), highlight: true }, { label: 'Days Until', value: daysUntil > 0 ? daysUntil : 'Passed' }, { label: 'Years', value: years }], formula: { formula: 'Start Date + Years', explanation: `${years} year anniversary from ${start.toDateString()}.` } }
    }
  },
  'gregorian-to-julian': {
    name: 'Gregorian to Julian', description: 'Calendar conversion', longDescription: 'Convert Gregorian calendar date to Julian calendar date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Gregorian Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const greg = new Date(inputs.date)
      // Julian date offset: currently 13 days behind Gregorian
      const julianOffset = 13
      const julian = new Date(greg)
      julian.setDate(julian.getDate() - julianOffset)
      return { results: [{ label: 'Julian Calendar Date', value: julian.toDateString(), highlight: true }, { label: 'Gregorian Date', value: greg.toDateString() }, { label: 'Day Difference', value: `${julianOffset} days` }], formula: { formula: 'Julian = Gregorian - 13 days', explanation: 'The Julian calendar is currently 13 days behind the Gregorian calendar.' } }
    }
  },
  'julian-to-gregorian': {
    name: 'Julian to Gregorian', description: 'Calendar conversion', longDescription: 'Convert Julian calendar date to Gregorian calendar date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Julian Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const julian = new Date(inputs.date)
      // Julian date offset: currently 13 days behind Gregorian
      const julianOffset = 13
      const greg = new Date(julian)
      greg.setDate(greg.getDate() + julianOffset)
      return { results: [{ label: 'Gregorian Calendar Date', value: greg.toDateString(), highlight: true }, { label: 'Julian Date', value: julian.toDateString() }, { label: 'Day Difference', value: `${julianOffset} days` }], formula: { formula: 'Gregorian = Julian + 13 days', explanation: 'The Gregorian calendar is currently 13 days ahead of the Julian calendar.' } }
    }
  },
  'julian-date': {
    name: 'Julian Day Number', description: 'Julian day number', longDescription: 'Calculate the Julian Day Number for a given date.', category: 'datetime', icon: Hash,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate()
      const a = Math.floor((14 - m) / 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3
      const jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045
      return { results: [{ label: 'Julian Day Number', value: jdn, highlight: true }, { label: 'Date', value: date.toDateString() }], formula: { formula: 'Standard Julian Day calculation', explanation: 'Continuous count of days since January 1, 4713 BC.' } }
    }
  },
  'modified-julian': {
    name: 'Modified Julian Date', description: 'MJD', longDescription: 'Calculate the Modified Julian Date for a given date.', category: 'datetime', icon: Hash,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate()
      const a = Math.floor((14 - m) / 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3
      const jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045
      const mjd = jdn - 2400000.5
      return { results: [{ label: 'Modified Julian Date', value: mjd.toFixed(1), highlight: true }, { label: 'Julian Day Number', value: jdn }, { label: 'Date', value: date.toDateString() }], formula: { formula: 'MJD = JD - 2400000.5', explanation: 'Simpler form of Julian Day, starting from November 17, 1858.' } }
    }
  },
  'unix-to-date': {
    name: 'Unix to Date', description: 'Convert timestamp', longDescription: 'Convert Unix timestamp to readable date.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'timestamp', label: 'Unix Timestamp', placeholder: '1704067200' }],
    calculate: (inputs) => {
      const ts = parseFloat(inputs.timestamp)
      if (isNaN(ts)) return { results: [] }
      const date = new Date(ts * 1000)
      const now = new Date()
      const nowTs = Math.floor(now.getTime() / 1000)
      return { results: [{ label: 'Date/Time', value: date.toString(), highlight: true }, { label: 'ISO Format', value: date.toISOString() }, { label: 'Current Timestamp', value: nowTs }], formula: { formula: 'Date = Timestamp × 1000', explanation: 'Unix timestamp is seconds since January 1, 1970 UTC.' } }
    }
  },
  'iso-week': {
    name: 'ISO Week Number', description: 'ISO week number', longDescription: 'Calculate the ISO week number for a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      const dayNum = d.getUTCDay() || 7
      d.setUTCDate(d.getUTCDate() + 4 - dayNum)
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
      return { results: [{ label: 'ISO Week', value: `${date.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`, highlight: true }, { label: 'Week Number', value: weekNum }, { label: 'ISO Year', value: d.getUTCFullYear() }], formula: { formula: 'ISO 8601 week numbering', explanation: 'Week 1 is the week containing the first Thursday of the year.' } }
    }
  },
  'quarter-dates': {
    name: 'Quarter Dates', description: 'Quarter start/end', longDescription: 'Find the start and end dates of a fiscal quarter.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }, { id: 'quarter', label: 'Quarter', placeholder: '', type: 'select', options: [{ value: '1', label: 'Q1' }, { value: '2', label: 'Q2' }, { value: '3', label: 'Q3' }, { value: '4', label: 'Q4' }] }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year) || new Date().getFullYear(), q = parseInt(inputs.quarter) || 1
      const startMonth = (q - 1) * 3, endMonth = startMonth + 2
      const startDate = new Date(year, startMonth, 1)
      const endDate = new Date(year, endMonth + 1, 0)
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return { results: [{ label: 'Quarter', value: `Q${q} ${year}`, highlight: true }, { label: 'Start Date', value: startDate.toDateString() }, { label: 'End Date', value: endDate.toDateString() }, { label: 'Total Days', value: days }], formula: { formula: 'Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec', explanation: `Quarter ${q} of ${year}.` } }
    }
  },
  'fiscal-year': {
    name: 'Fiscal Year', description: 'Fiscal year calc', longDescription: 'Calculate fiscal year based on a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'startMonth', label: 'FY Start Month', placeholder: '', type: 'select', options: [{ value: '0', label: 'January' }, { value: '3', label: 'April' }, { value: '6', label: 'July' }, { value: '9', label: 'October' }] }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const startMonth = parseInt(inputs.startMonth) || 0
      let fyYear = date.getFullYear()
      if (date.getMonth() < startMonth) fyYear--
      const fyEnd = new Date(fyYear + 1, startMonth, 0)
      const fyStart = new Date(fyYear, startMonth, 1)
      return { results: [{ label: 'Fiscal Year', value: `FY ${fyYear}-${(fyYear + 1).toString().slice(2)}`, highlight: true }, { label: 'FY Start', value: fyStart.toDateString() }, { label: 'FY End', value: fyEnd.toDateString() }], formula: { formula: 'FY starts from selected month', explanation: 'Many organizations use different fiscal year start dates.' } }
    }
  },
  'time-sheet': {
    name: 'Time Sheet', description: 'Work hours', longDescription: 'Calculate total work hours from time sheet entries.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'hours', label: 'Hours (comma-separated)', placeholder: '8, 7.5, 8, 8, 6' }],
    calculate: (inputs) => {
      const hours = (inputs.hours || '').split(',').map(h => parseFloat(h.trim())).filter(h => !isNaN(h))
      if (hours.length === 0) return { results: [] }
      const total = hours.reduce((a, b) => a + b, 0)
      const avg = total / hours.length
      const overtime = hours.reduce((a, h) => a + Math.max(0, h - 8), 0)
      return { results: [{ label: 'Total Hours', value: total.toFixed(1), highlight: true }, { label: 'Days Worked', value: hours.length }, { label: 'Average/Day', value: avg.toFixed(1) }, { label: 'Overtime Hours', value: overtime.toFixed(1) }], formula: { formula: 'Sum of daily hours', explanation: `Worked ${total.toFixed(1)} hours over ${hours.length} days.` } }
    }
  },
  'shift-calculator': {
    name: 'Shift Calculator', description: 'Shift planning', longDescription: 'Calculate shift hours and rotations.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'shiftStart', label: 'Shift Start', placeholder: '06:00' }, { id: 'shiftEnd', label: 'Shift End', placeholder: '14:00' }, { id: 'breakMins', label: 'Break (mins)', placeholder: '30' }],
    calculate: (inputs) => {
      if (!inputs.shiftStart || !inputs.shiftEnd) return { results: [] }
      const [sh, sm] = inputs.shiftStart.split(':').map(Number), [eh, em] = inputs.shiftEnd.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const breakMins = parseInt(inputs.breakMins) || 0
      const netMins = diff - breakMins
      const hours = Math.floor(netMins / 60), mins = netMins % 60
      return { results: [{ label: 'Net Work Hours', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Total Shift', value: `${(diff / 60).toFixed(1)} hours` }, { label: 'Break Time', value: `${breakMins} mins` }], formula: { formula: 'Shift Hours - Break', explanation: 'Net working time after deducting breaks.' } }
    }
  },
  'prayer-times': {
    name: 'Prayer Times', description: 'Islamic times', longDescription: 'Estimate Islamic prayer times based on location.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'lat', label: 'Latitude', placeholder: '21.4' }, { id: 'lon', label: 'Longitude', placeholder: '39.8' }],
    calculate: (inputs) => {
      const lat = parseFloat(inputs.lat) || 21.4
      const now = new Date()
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const solarNoon = 12 + (parseFloat(inputs.lon) || 39.8) / -15
      // Simplified prayer time estimates
      const fajr = solarNoon - 6 - (lat - 21.4) * 0.02
      const sunrise = solarNoon - 4
      const dhuhr = solarNoon + 0.1
      const asr = solarNoon + 3.5
      const maghrib = solarNoon + 4
      const isha = solarNoon + 5.5 + (lat - 21.4) * 0.02
      const formatTime = (h: number) => `${Math.floor(h % 24).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Fajr', value: formatTime(fajr) }, { label: 'Sunrise', value: formatTime(sunrise) }, { label: 'Dhuhr', value: formatTime(dhuhr) }, { label: 'Asr', value: formatTime(asr) }, { label: 'Maghrib', value: formatTime(maghrib), highlight: true }, { label: 'Isha', value: formatTime(isha) }], formula: { formula: 'Based on sun position', explanation: 'Approximate times. Use local mosque for exact times.' } }
    }
  },
  'sunrise-sunset': {
    name: 'Sunrise Sunset', description: 'Approximate times', longDescription: 'Estimate sunrise and sunset times for a location.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'lat', label: 'Latitude', placeholder: '40.7' }, { id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.lat) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
      const solarNoon = 12
      const sunrise = solarNoon - hourAngle / 15
      const sunset = solarNoon + hourAngle / 15
      const daylight = sunset - sunrise
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Sunrise', value: formatTime(sunrise) }, { label: 'Solar Noon', value: formatTime(solarNoon) }, { label: 'Sunset', value: formatTime(sunset), highlight: true }, { label: 'Daylight Hours', value: daylight.toFixed(1) }], formula: { formula: 'Based on latitude and sun declination', explanation: 'Approximate times for the given date and latitude.' } }
    }
  },
  'golden-hour': {
    name: 'Golden Hour', description: 'Photography timing', longDescription: 'Calculate golden hour times for photography.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'lat', label: 'Latitude', placeholder: '40.7' }, { id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.lat) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
      const solarNoon = 12
      const sunrise = solarNoon - hourAngle / 15
      const sunset = solarNoon + hourAngle / 15
      // Golden hour is roughly 1 hour after sunrise and 1 hour before sunset
      const morningGoldenStart = sunrise
      const morningGoldenEnd = sunrise + 1
      const eveningGoldenStart = sunset - 1
      const eveningGoldenEnd = sunset
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Morning Golden Hour', value: `${formatTime(morningGoldenStart)} - ${formatTime(morningGoldenEnd)}`, highlight: true }, { label: 'Evening Golden Hour', value: `${formatTime(eveningGoldenStart)} - ${formatTime(eveningGoldenEnd)}`, highlight: true }, { label: 'Sunrise', value: formatTime(sunrise) }, { label: 'Sunset', value: formatTime(sunset) }], formula: { formula: 'Golden hour = 1 hour after sunrise, 1 hour before sunset', explanation: 'Best time for warm, soft light photography.' } }
    }
  },
  'blue-hour': {
    name: 'Blue Hour', description: 'Photography timing', longDescription: 'Calculate blue hour times for photography.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'lat', label: 'Latitude', placeholder: '40.7' }, { id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.lat) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
      const solarNoon = 12
      const sunrise = solarNoon - hourAngle / 15
      const sunset = solarNoon + hourAngle / 15
      // Blue hour is roughly 30 mins before sunrise and after sunset
      const morningBlueStart = sunrise - 0.5
      const morningBlueEnd = sunrise
      const eveningBlueStart = sunset
      const eveningBlueEnd = sunset + 0.5
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Morning Blue Hour', value: `${formatTime(morningBlueStart)} - ${formatTime(morningBlueEnd)}`, highlight: true }, { label: 'Evening Blue Hour', value: `${formatTime(eveningBlueStart)} - ${formatTime(eveningBlueEnd)}`, highlight: true }, { label: 'Sunrise', value: formatTime(sunrise) }, { label: 'Sunset', value: formatTime(sunset) }], formula: { formula: 'Blue hour = 30 mins before sunrise, after sunset', explanation: 'Best time for deep blue sky and city lights.' } }
    }
  },
  // MORE TOOLS CALCULATORS
  'density-converter': {
    name: 'Density Converter', description: 'Convert density', longDescription: 'Convert between density units.', category: 'tools', icon: Weight,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'gcm3', label: 'g/cm³' }, { value: 'kgm3', label: 'kg/m³' }, { value: 'lbft3', label: 'lb/ft³' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'gcm3', label: 'g/cm³' }, { value: 'kgm3', label: 'kg/m³' }, { value: 'lbft3', label: 'lb/ft³' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toGcm3: Record<string, number> = { gcm3: 1, kgm3: 0.001, lbft3: 0.016 }
      const gcm3 = value * toGcm3[inputs.from || 'gcm3']
      const result = gcm3 / toGcm3[inputs.to || 'gcm3']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Density conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'power-converter': {
    name: 'Power Converter', description: 'Convert power', longDescription: 'Convert between power units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'w', label: 'Watts' }, { value: 'kw', label: 'Kilowatts' }, { value: 'hp', label: 'Horsepower' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'w', label: 'Watts' }, { value: 'kw', label: 'Kilowatts' }, { value: 'hp', label: 'Horsepower' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toWatts: Record<string, number> = { w: 1, kw: 1000, hp: 745.7 }
      const watts = value * toWatts[inputs.from || 'w']
      const result = watts / toWatts[inputs.to || 'w']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Power conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'torque-converter': {
    name: 'Torque Converter', description: 'Convert torque', longDescription: 'Convert between torque units.', category: 'tools', icon: Wrench,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'nm', label: 'Newton-meter' }, { value: 'lbft', label: 'Pound-foot' }, { value: 'kgm', label: 'Kilogram-meter' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'nm', label: 'Newton-meter' }, { value: 'lbft', label: 'Pound-foot' }, { value: 'kgm', label: 'Kilogram-meter' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toNm: Record<string, number> = { nm: 1, lbft: 1.356, kgm: 9.807 }
      const nm = value * toNm[inputs.from || 'nm']
      const result = nm / toNm[inputs.to || 'nm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Torque conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'heat-index': {
    name: 'Heat Index', description: 'Feels like temp', longDescription: 'Calculate heat index (feels like temperature).', category: 'tools', icon: ThermometerIcon,
    inputs: [{ id: 'temp', label: 'Temperature (°F)', placeholder: '90' }, { id: 'humidity', label: 'Humidity (%)', placeholder: '60' }],
    calculate: (inputs) => {
      const T = parseFloat(inputs.temp), RH = parseFloat(inputs.humidity)
      if (!T || !RH) return { results: [] }
      const HI = -42.379 + 2.04901523 * T + 10.14333127 * RH - 0.22475541 * T * RH - 0.00683783 * T * T - 0.05481717 * RH * RH + 0.00122874 * T * T * RH + 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH
      let risk: string
      if (HI < 80) risk = 'Comfortable'
      else if (HI < 90) risk = 'Caution'
      else if (HI < 105) risk = 'Extreme Caution'
      else if (HI < 130) risk = 'Danger'
      else risk = 'Extreme Danger'
      return { results: [{ label: 'Heat Index', value: `${Math.round(HI)}°F`, highlight: true }, { label: 'Risk Level', value: risk }], formula: { formula: 'NWS Heat Index Equation', explanation: 'Apparent temperature with humidity' } }
    }
  },
  'wind-chill': {
    name: 'Wind Chill', description: 'Cold feels like', longDescription: 'Calculate wind chill temperature.', category: 'tools', icon: Wind,
    inputs: [{ id: 'temp', label: 'Temperature (°F)', placeholder: '30' }, { id: 'wind', label: 'Wind Speed (mph)', placeholder: '15' }],
    calculate: (inputs) => {
      const T = parseFloat(inputs.temp), V = parseFloat(inputs.wind)
      if (isNaN(T) || isNaN(V)) return { results: [] }
      const WC = T <= 50 && V >= 3 ? 35.74 + 0.6215 * T - 35.75 * Math.pow(V, 0.16) + 0.4275 * T * Math.pow(V, 0.16) : T
      return { results: [{ label: 'Wind Chill', value: `${Math.round(WC)}°F`, highlight: true }, { label: 'Actual Temp', value: `${T}°F` }], formula: { formula: 'NWS Wind Chill Formula', explanation: `Feels like ${Math.round(WC)}°F in the wind` } }
    }
  },
  'dew-point': {
    name: 'Dew Point', description: 'Condensation point', longDescription: 'Calculate dew point temperature.', category: 'tools', icon: Droplets,
    inputs: [{ id: 'temp', label: 'Temperature (°F)', placeholder: '75' }, { id: 'humidity', label: 'Humidity (%)', placeholder: '60' }],
    calculate: (inputs) => {
      const T = parseFloat(inputs.temp), RH = parseFloat(inputs.humidity)
      if (!T || !RH) return { results: [] }
      const Tf = T * 9/5 + 32
      const dp = T - ((100 - RH) / 5)
      let comfort: string
      if (dp < 50) comfort = 'Dry'
      else if (dp < 60) comfort = 'Comfortable'
      else if (dp < 70) comfort = 'Sticky'
      else comfort = 'Muggy'
      return { results: [{ label: 'Dew Point', value: `${Math.round(dp)}°F`, highlight: true }, { label: 'Comfort Level', value: comfort }], formula: { formula: 'Magnus Formula Approximation', explanation: 'Temperature where air becomes saturated' } }
    }
  },
  'battery-life': {
    name: 'Battery Life', description: 'Runtime estimate', longDescription: 'Estimate battery runtime.', category: 'tools', icon: Zap,
    inputs: [{ id: 'capacity', label: 'Capacity (mAh)', placeholder: '3000' }, { id: 'current', label: 'Current Draw (mA)', placeholder: '500' }],
    calculate: (inputs) => {
      const capacity = parseFloat(inputs.capacity), current = parseFloat(inputs.current)
      if (!capacity || !current) return { results: [] }
      const hours = capacity / current
      const h = Math.floor(hours), m = Math.round((hours - h) * 60)
      return { results: [{ label: 'Runtime', value: `${h}h ${m}m`, highlight: true }, { label: 'Hours', value: hours.toFixed(2) }], formula: { formula: 'Time = Capacity / Current', explanation: `${capacity}mAh ÷ ${current}mA = ${hours.toFixed(1)}h` } }
    }
  },
  'download-time': {
    name: 'Download Time', description: 'Transfer estimate', longDescription: 'Estimate download time.', category: 'tools', icon: Timer,
    inputs: [{ id: 'size', label: 'File Size (GB)', placeholder: '10' }, { id: 'speed', label: 'Speed (Mbps)', placeholder: '100' }],
    calculate: (inputs) => {
      const size = parseFloat(inputs.size), speed = parseFloat(inputs.speed)
      if (!size || !speed) return { results: [] }
      const bits = size * 8 * 1024
      const seconds = bits / speed
      const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = Math.round(seconds % 60)
      return { results: [{ label: 'Download Time', value: h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`, highlight: true }], formula: { formula: 'Time = Size × 8 / Speed', explanation: `${size}GB at ${speed}Mbps` } }
    }
  },
  'base64-encoder': {
    name: 'Base64 Encoder', description: 'Encode text', longDescription: 'Encode text to Base64.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Hello World' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      const encoded = btoa(text)
      return { results: [{ label: 'Base64', value: encoded.slice(0, 50) + (encoded.length > 50 ? '...' : ''), highlight: true }, { label: 'Length', value: encoded.length }], formula: { formula: 'Base64 encoding', explanation: 'Binary-to-text encoding' } }
    }
  },
  'hash-generator': {
    name: 'Hash Generator', description: 'Simple hash', longDescription: 'Generate a simple hash from text.', category: 'tools', icon: Shield,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Password123' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      let hash = 0
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i)
        hash = hash & hash
      }
      const hex = Math.abs(hash).toString(16).padStart(8, '0')
      return { results: [{ label: 'Simple Hash', value: hex, highlight: true }], formula: { formula: 'DJB2-like hash', explanation: 'Simple numeric hash (not cryptographically secure)' } }
    }
  },
  'lorem-generator': {
    name: 'Lorem Ipsum', description: 'Placeholder text', longDescription: 'Generate lorem ipsum placeholder text.', category: 'tools', icon: FileText,
    inputs: [{ id: 'paragraphs', label: 'Paragraphs', placeholder: '2' }],
    calculate: (inputs) => {
      const p = Math.min(5, Math.max(1, parseInt(inputs.paragraphs) || 1))
      const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
      const text = Array(p).fill(lorem).join('\n\n')
      return { results: [{ label: 'Lorem Ipsum', value: text.slice(0, 150) + '...', highlight: true }, { label: 'Characters', value: text.length }], formula: { formula: 'Placeholder text generator', explanation: `${p} paragraphs generated` } }
    }
  },
  'mime-types': {
    name: 'MIME Types', description: 'File types', longDescription: 'Look up MIME types for file extensions.', category: 'tools', icon: FileText,
    inputs: [{ id: 'extension', label: 'Extension (e.g., pdf)', placeholder: 'pdf' }],
    calculate: (inputs) => {
      const ext = (inputs.extension || '').toLowerCase().replace('.', '')
      const mimeTypes: Record<string, string> = { pdf: 'application/pdf', jpg: 'image/jpeg', png: 'image/png', gif: 'image/gif', mp4: 'video/mp4', mp3: 'audio/mpeg', html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json', xml: 'application/xml', zip: 'application/zip', doc: 'application/msword', xls: 'application/vnd.ms-excel', ppt: 'application/vnd.ms-powerpoint' }
      const mime = mimeTypes[ext] || 'Unknown'
      return { results: [{ label: 'MIME Type', value: mime, highlight: true }], formula: { formula: 'IANA Media Types', explanation: `.${ext} → ${mime}` } }
    }
  },
  // NEW HEALTH CALCULATORS
  'pregnancy-weight-gain': {
    name: 'Pregnancy Weight Gain', description: 'Track pregnancy weight', longDescription: 'Calculate recommended weight gain during pregnancy based on pre-pregnancy BMI. The Institute of Medicine provides guidelines for healthy weight gain ranges.', category: 'health', icon: Heart,
    inputs: [
      { id: 'preWeight', label: 'Pre-pregnancy Weight (kg)', placeholder: '60' },
      { id: 'height', label: 'Height (cm)', placeholder: '165' },
      { id: 'currentWeight', label: 'Current Weight (kg)', placeholder: '68' },
      { id: 'weeks', label: 'Weeks Pregnant', placeholder: '20' }
    ],
    calculate: (inputs) => {
      const preWeight = parseFloat(inputs.preWeight), height = parseFloat(inputs.height), currentWeight = parseFloat(inputs.currentWeight), weeks = parseFloat(inputs.weeks)
      if (!preWeight || !height || !currentWeight || !weeks) return { results: [] }
      const heightM = height / 100, bmi = preWeight / (heightM * heightM)
      let recommendedGain: string, weeklyRate: string, category: string
      if (bmi < 18.5) { recommendedGain = '12.5-18 kg'; weeklyRate = '0.5 kg'; category = 'Underweight' }
      else if (bmi < 25) { recommendedGain = '11.5-16 kg'; weeklyRate = '0.4 kg'; category = 'Normal weight' }
      else if (bmi < 30) { recommendedGain = '7-11.5 kg'; weeklyRate = '0.3 kg'; category = 'Overweight' }
      else { recommendedGain = '5-9 kg'; weeklyRate = '0.2 kg'; category = 'Obese' }
      const gained = currentWeight - preWeight
      return {
        results: [
          { label: 'Pre-pregnancy BMI', value: bmi.toFixed(1), unit: 'kg/m²', icon: Activity },
          { label: 'BMI Category', value: category },
          { label: 'Recommended Total Gain', value: recommendedGain, highlight: true },
          { label: 'Current Weight Gain', value: gained.toFixed(1), unit: 'kg' },
          { label: 'Weekly Rate (2nd/3rd tri)', value: weeklyRate }
        ],
        comparisons: [{ label: 'Current Gain', value: gained, max: 20, color: '#ec4899' }],
        formula: { formula: 'IOM Guidelines 2009', explanation: `BMI: ${bmi.toFixed(1)} → ${category} → Recommended gain: ${recommendedGain}` }
      }
    }
  },
  'conception-date': {
    name: 'Conception Date', description: 'Estimate conception from due date', longDescription: 'Calculate the estimated conception date based on your due date or last menstrual period. This calculator works backward from the due date to find when conception likely occurred.', category: 'health', icon: Calendar,
    inputs: [
      { id: 'calcMethod', label: 'Calculation Method', placeholder: '', type: 'select', options: [{ value: 'dueDate', label: 'From Due Date' }, { value: 'lmp', label: 'From Last Menstrual Period' }] },
      { id: 'date', label: 'Date', placeholder: '', type: 'date' }
    ],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), method = inputs.calcMethod || 'dueDate'
      let conception: Date, dueDate: Date, lmp: Date
      if (method === 'dueDate') {
        dueDate = date
        conception = new Date(date.getTime() - 266 * 24 * 60 * 60 * 1000)
        lmp = new Date(date.getTime() - 280 * 24 * 60 * 60 * 1000)
      } else {
        lmp = date
        conception = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000)
        dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000)
      }
      return {
        results: [
          { label: 'Estimated Conception', value: conception.toLocaleDateString(), highlight: true, icon: Calendar },
          { label: 'Due Date', value: dueDate.toLocaleDateString() },
          { label: 'Last Menstrual Period', value: lmp.toLocaleDateString() }
        ],
        formula: { formula: method === 'dueDate' ? 'Conception = Due Date - 266 days' : 'Conception = LMP + 14 days', explanation: 'Average pregnancy is 280 days from LMP, conception typically occurs ~14 days after LMP.' }
      }
    }
  },
  'pregnancy-trimester': {
    name: 'Pregnancy Trimester', description: 'Which trimester', longDescription: 'Determine which trimester you are in based on your due date or last menstrual period. Each trimester has unique developmental milestones.', category: 'health', icon: Calendar,
    inputs: [
      { id: 'dueDate', label: 'Due Date', placeholder: '', type: 'date' },
      { id: 'today', label: 'Today\'s Date', placeholder: '', type: 'date' }
    ],
    calculate: (inputs) => {
      if (!inputs.dueDate) return { results: [] }
      const due = new Date(inputs.dueDate), today = inputs.today ? new Date(inputs.today) : new Date()
      today.setHours(0, 0, 0, 0)
      const totalDays = 280, daysRemaining = Math.ceil((due.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)), daysPassed = totalDays - daysRemaining, weeks = Math.floor(daysPassed / 7)
      let trimester: string, stage: string, description: string
      if (weeks < 0) { trimester = 'Not pregnant'; stage = '-'; description = 'Due date has not been reached' }
      else if (weeks < 13) { trimester = '1st Trimester'; stage = 'Weeks 1-12'; description = 'Early development, morning sickness common' }
      else if (weeks < 27) { trimester = '2nd Trimester'; stage = 'Weeks 13-26'; description = 'Energy returns, baby movements felt' }
      else if (weeks <= 42) { trimester = '3rd Trimester'; stage = 'Weeks 27-40+'; description = 'Final growth, preparation for birth' }
      else { trimester = 'Post-term'; stage = 'Weeks 42+'; description = 'Consult healthcare provider' }
      return {
        results: [
          { label: 'Current Week', value: weeks, unit: 'weeks', highlight: true, icon: Calendar },
          { label: 'Trimester', value: trimester },
          { label: 'Stage', value: stage },
          { label: 'Days Until Due', value: Math.max(0, daysRemaining) }
        ],
        infoCards: [{ title: 'This Trimester', content: description, variant: 'info' }],
        formula: { formula: 'Trimester = floor(Weeks / 13) + 1', explanation: `${weeks} weeks pregnant → ${trimester}` }
      }
    }
  },
  'fetal-height': {
    name: 'Fetal Height', description: 'Fetal length estimate', longDescription: 'Estimate fetal length (crown-rump length and crown-heel length) based on gestational age. These measurements help track fetal growth.', category: 'health', icon: Ruler,
    inputs: [
      { id: 'weeks', label: 'Gestational Weeks', placeholder: '20' }
    ],
    calculate: (inputs) => {
      const weeks = parseFloat(inputs.weeks)
      if (!weeks || weeks < 8 || weeks > 42) return { results: [{ label: 'Error', value: 'Enter weeks 8-42' }] }
      const crl = weeks < 12 ? 0.7 * weeks - 0.8 : 0, chl = weeks >= 12 ? 6.6 + 0.78 * weeks : 0, weight = Math.pow(weeks / 40, 3) * 3400
      return {
        results: [
          { label: 'Gestational Age', value: weeks, unit: 'weeks', icon: Calendar },
          { label: weeks < 12 ? 'Crown-Rump Length' : 'Crown-Heel Length', value: (weeks < 12 ? crl : chl).toFixed(1), unit: 'cm', highlight: true },
          { label: 'Estimated Weight', value: weight.toFixed(0), unit: 'g' }
        ],
        comparisons: [{ label: 'Size Progress', value: weeks, max: 40, color: '#ec4899' }],
        formula: { formula: 'CRL = 0.7 × weeks - 0.8 (weeks < 12)', explanation: `At ${weeks} weeks, fetus is approximately ${(weeks < 12 ? crl : chl).toFixed(1)} cm long.` }
      }
    }
  },
  'breastfeeding-calorie': {
    name: 'Breastfeeding Calorie', description: 'Calories while nursing', longDescription: 'Calculate the additional calorie needs for breastfeeding mothers. Milk production requires extra energy, typically 400-500 calories per day.', category: 'health', icon: Heart,
    inputs: [
      { id: 'weight', label: 'Weight (kg)', placeholder: '65' },
      { id: 'height', label: 'Height (cm)', placeholder: '165' },
      { id: 'age', label: 'Age', placeholder: '28' },
      { id: 'feedings', label: 'Feedings per Day', placeholder: '', type: 'select', options: [{ value: 'exclusive', label: 'Exclusive BF (6+ feeds)' }, { value: 'partial', label: 'Partial (3-5 feeds)' }, { value: 'minimal', label: 'Minimal (1-2 feeds)' }] }
    ],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), age = parseFloat(inputs.age), feeding = inputs.feedings || 'exclusive'
      if (!weight || !height || !age) return { results: [] }
      const bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      let extraCals: number, milkMl: number
      if (feeding === 'exclusive') { extraCals = 500; milkMl = 750 }
      else if (feeding === 'partial') { extraCals = 300; milkMl = 450 }
      else { extraCals = 150; milkMl = 200 }
      const totalDaily = bmr * 1.2 + extraCals
      return {
        results: [
          { label: 'Base Metabolic Rate', value: Math.round(bmr), unit: 'cal/day', icon: Zap },
          { label: 'Extra Calories Needed', value: extraCals, unit: 'cal/day', highlight: true },
          { label: 'Estimated Milk Output', value: milkMl, unit: 'ml/day' },
          { label: 'Total Daily Needs', value: Math.round(totalDaily), unit: 'cal/day' }
        ],
        formula: { formula: 'Extra Calories = 500 cal (exclusive BF)', explanation: 'Breastfeeding burns approximately 425-700 calories per day for exclusive nursing.' }
      }
    }
  },
  'caffeine-intake': {
    name: 'Caffeine Intake', description: 'Safe caffeine limits', longDescription: 'Calculate your daily caffeine intake and check if it\'s within safe limits. Different groups have different recommended maximum daily intake.', category: 'health', icon: Zap,
    inputs: [
      { id: 'coffee', label: 'Coffee (cups)', placeholder: '2' },
      { id: 'tea', label: 'Tea (cups)', placeholder: '1' },
      { id: 'soda', label: 'Soda (cans)', placeholder: '0' },
      { id: 'energy', label: 'Energy Drinks', placeholder: '0' },
      { id: 'status', label: 'Health Status', placeholder: '', type: 'select', options: [{ value: 'adult', label: 'Healthy Adult' }, { value: 'pregnant', label: 'Pregnant/Nursing' }, { value: 'adolescent', label: 'Adolescent' }, { value: 'sensitive', label: 'Caffeine Sensitive' }] }
    ],
    calculate: (inputs) => {
      const coffee = parseFloat(inputs.coffee) || 0, tea = parseFloat(inputs.tea) || 0, soda = parseFloat(inputs.soda) || 0, energy = parseFloat(inputs.energy) || 0, status = inputs.status || 'adult'
      const coffeeMg = coffee * 95, teaMg = tea * 47, sodaMg = soda * 40, energyMg = energy * 80
      const total = coffeeMg + teaMg + sodaMg + energyMg
      const limits: Record<string, number> = { adult: 400, pregnant: 200, adolescent: 100, sensitive: 100 }
      const limit = limits[status]
      const percentage = (total / limit) * 100, isSafe = total <= limit
      return {
        results: [
          { label: 'Total Caffeine', value: total, unit: 'mg', highlight: true, icon: Zap },
          { label: 'Daily Limit', value: limit, unit: 'mg' },
          { label: 'Status', value: isSafe ? 'Within Safe Limit' : 'Exceeds Limit' }
        ],
        pieData: [
          { label: 'Coffee', value: coffeeMg, color: '#78350f' },
          { label: 'Tea', value: teaMg, color: '#166534' },
          { label: 'Soda', value: sodaMg, color: '#dc2626' },
          { label: 'Energy', value: energyMg, color: '#7c3aed' }
        ],
        comparisons: [{ label: 'Caffeine Intake', value: total, max: limit * 1.5, color: isSafe ? '#22c55e' : '#ef4444' }],
        infoCards: [{ title: isSafe ? 'Safe Consumption' : 'High Caffeine', content: isSafe ? `You're within the recommended limit of ${limit}mg/day.` : `Reduce intake. Limit is ${limit}mg/day.`, variant: isSafe ? 'success' : 'warning' }],
        formula: { formula: 'Coffee(95mg) + Tea(47mg) + Soda(40mg) + Energy(80mg)', explanation: `Total: ${total}mg out of ${limit}mg recommended limit.` }
      }
    }
  },
  'alcohol-units': {
    name: 'Alcohol Units', description: 'Standard drinks', longDescription: 'Calculate alcohol units/standard drinks based on beverage type and volume. Understanding units helps track alcohol consumption responsibly.', category: 'health', icon: AlertCircle,
    inputs: [
      { id: 'drink', label: 'Drink Type', placeholder: '', type: 'select', options: [{ value: 'beer', label: 'Beer (5% ABV)' }, { value: 'wine', label: 'Wine (12% ABV)' }, { value: 'spirits', label: 'Spirits (40% ABV)' }, { value: 'cocktail', label: 'Cocktail (15% ABV)' }] },
      { id: 'volume', label: 'Volume (ml)', placeholder: '330' },
      { id: 'count', label: 'Number of Drinks', placeholder: '2' }
    ],
    calculate: (inputs) => {
      const abv: Record<string, number> = { beer: 0.05, wine: 0.12, spirits: 0.40, cocktail: 0.15 }
      const drink = inputs.drink || 'beer', volume = parseFloat(inputs.volume) || 330, count = parseFloat(inputs.count) || 1, drinkAbv = abv[drink]
      const pureAlcoholMl = volume * count * drinkAbv, units = pureAlcoholMl / 10, grams = pureAlcoholMl * 0.789
      const weeklyLimit = 14, dailyLimit = 4
      return {
        results: [
          { label: 'Alcohol Units', value: units.toFixed(1), unit: 'units', highlight: true, icon: AlertCircle },
          { label: 'Pure Alcohol', value: grams.toFixed(0), unit: 'grams' },
          { label: 'Weekly Units Used', value: `${units.toFixed(1)} of ${weeklyLimit}`, description: 'UK guidelines: max 14 units/week' }
        ],
        comparisons: [{ label: 'Units Consumed', value: units, max: weeklyLimit, color: '#f59e0b' }],
        formula: { formula: 'Units = (Volume × ABV × Count) ÷ 10', explanation: `${count} × ${volume}ml at ${(drinkAbv * 100).toFixed(0)}% ABV = ${units.toFixed(1)} units` }
      }
    }
  },
  'smoking-cost': {
    name: 'Smoking Cost', description: 'Cost of smoking', longDescription: 'Calculate how much money you spend on cigarettes and potential savings from quitting. This financial perspective can be a powerful motivator.', category: 'health', icon: DollarSign,
    inputs: [
      { id: 'cigarettesPerDay', label: 'Cigarettes per Day', placeholder: '20' },
      { id: 'pricePerPack', label: 'Price per Pack ($)', placeholder: '8' },
      { id: 'cigarettesPerPack', label: 'Cigarettes per Pack', placeholder: '20' },
      { id: 'yearsSmoking', label: 'Years Smoking', placeholder: '10' }
    ],
    calculate: (inputs) => {
      const perDay = parseFloat(inputs.cigarettesPerDay) || 20, price = parseFloat(inputs.pricePerPack) || 8, perPack = parseFloat(inputs.cigarettesPerPack) || 20, years = parseFloat(inputs.yearsSmoking) || 1
      const dailyCost = (perDay / perPack) * price, weeklyCost = dailyCost * 7, monthlyCost = dailyCost * 30, yearlyCost = dailyCost * 365, lifetimeCost = yearlyCost * years
      return {
        results: [
          { label: 'Daily Cost', value: `$${dailyCost.toFixed(2)}`, icon: DollarSign },
          { label: 'Weekly Cost', value: `$${weeklyCost.toFixed(2)}` },
          { label: 'Monthly Cost', value: `$${monthlyCost.toFixed(2)}` },
          { label: 'Yearly Cost', value: `$${yearlyCost.toFixed(0)}`, highlight: true },
          { label: 'Total Spent', value: `$${lifetimeCost.toFixed(0)}`, description: `Over ${years} years` }
        ],
        pieData: [{ label: 'Spent', value: lifetimeCost, color: '#ef4444' }, { label: 'Potential Savings', value: yearlyCost, color: '#22c55e' }],
        comparisons: [{ label: 'Years of Smoking', value: years, max: 50, color: '#ef4444' }],
        infoCards: [{ title: 'Alternative Purchases', content: `$${lifetimeCost.toFixed(0)} could buy a car, vacation, or home down payment.`, variant: 'warning' }],
        formula: { formula: 'Cost = (Cigs/Day ÷ Cigs/Pack) × Price', explanation: `Daily: $${dailyCost.toFixed(2)} → Yearly: $${yearlyCost.toFixed(0)}` }
      }
    }
  },
  'smoking-life': {
    name: 'Smoking Life Lost', description: 'Years lost to smoking', longDescription: 'Estimate the potential life years lost due to smoking. Research shows each cigarette reduces life expectancy by approximately 11 minutes.', category: 'health', icon: Timer,
    inputs: [
      { id: 'cigarettesPerDay', label: 'Cigarettes per Day', placeholder: '20' },
      { id: 'yearsSmoking', label: 'Years Smoking', placeholder: '15' },
      { id: 'age', label: 'Current Age', placeholder: '40' }
    ],
    calculate: (inputs) => {
      const perDay = parseFloat(inputs.cigarettesPerDay) || 20, years = parseFloat(inputs.yearsSmoking) || 1, age = parseFloat(inputs.age) || 30
      const totalCigarettes = perDay * 365 * years, minutesLost = totalCigarettes * 11, hoursLost = minutesLost / 60, daysLost = hoursLost / 24, yearsLost = daysLost / 365
      const lifeExpectancy = 80, adjustedExpectancy = lifeExpectancy - yearsLost
      return {
        results: [
          { label: 'Total Cigarettes', value: totalCigarettes.toLocaleString(), icon: Timer },
          { label: 'Time Lost', value: yearsLost.toFixed(1), unit: 'years', highlight: true },
          { label: 'Days Lost', value: Math.round(daysLost), unit: 'days' },
          { label: 'Adjusted Life Expectancy', value: adjustedExpectancy.toFixed(1), unit: 'years' }
        ],
        comparisons: [{ label: 'Life Years Lost', value: yearsLost, max: 20, color: '#ef4444' }],
        infoCards: [{ title: 'Quit Benefits', content: 'Quitting at any age can add years back to your life. After 10 years smoke-free, risk returns near non-smoker levels.', variant: 'warning' }],
        formula: { formula: 'Years Lost = Total Cigarettes × 11 min ÷ 525,600', explanation: `Each cigarette costs ~11 minutes of life. Total: ${yearsLost.toFixed(1)} years.` }
      }
    }
  },
  'vo2-max': {
    name: 'VO2 Max', description: 'Cardio fitness', longDescription: 'Estimate your VO2 max, which measures the maximum amount of oxygen your body can utilize during intense exercise. Higher VO2 max indicates better cardiovascular fitness.', category: 'health', icon: Activity,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '30' },
      { id: 'hrRest', label: 'Resting Heart Rate (bpm)', placeholder: '65' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', age = parseFloat(inputs.age), hrRest = parseFloat(inputs.hrRest)
      if (!age || !hrRest) return { results: [] }
      const vo2max = gender === 'male' ? 15 * (220 - age) / hrRest : 15.3 * (220 - age) / hrRest
      let category: string, color: string
      if (vo2max >= 50) { category = 'Excellent'; color = '#22c55e' }
      else if (vo2max >= 40) { category = 'Good'; color = '#84cc16' }
      else if (vo2max >= 35) { category = 'Average'; color = '#f59e0b' }
      else if (vo2max >= 30) { category = 'Below Average'; color = '#f97316' }
      else { category = 'Poor'; color = '#ef4444' }
      return {
        results: [
          { label: 'VO2 Max', value: vo2max.toFixed(1), unit: 'ml/kg/min', highlight: true, icon: Activity },
          { label: 'Fitness Category', value: category },
          { label: 'Fitness Age', value: gender === 'male' ? Math.round(50 - vo2max + 30) : Math.round(50 - vo2max + 35), unit: 'years' }
        ],
        comparisons: [{ label: 'VO2 Max', value: vo2max, max: 70, color }],
        formula: { formula: gender === 'male' ? 'VO2 = 15 × (220-age) ÷ HR_rest' : 'VO2 = 15.3 × (220-age) ÷ HR_rest', explanation: `Estimated VO2 max based on resting heart rate.` }
      }
    }
  },
  'rockport-test': {
    name: 'Rockport Test', description: 'Walk test fitness', longDescription: 'Calculate VO2 max using the Rockport Walk Test. Walk 1 mile as fast as possible and record your time and heart rate to estimate cardiovascular fitness.', category: 'health', icon: Activity,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '35' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'timeMin', label: 'Time (minutes)', placeholder: '14' },
      { id: 'timeSec', label: 'Time (seconds)', placeholder: '30' },
      { id: 'hr', label: 'Heart Rate at End (bpm)', placeholder: '120' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), timeMin = parseFloat(inputs.timeMin) || 0, timeSec = parseFloat(inputs.timeSec) || 0, hr = parseFloat(inputs.hr)
      if (!age || !weight || !hr) return { results: [] }
      const time = timeMin + timeSec / 60
      const vo2max = gender === 'male' ? 132.853 - 0.0769 * weight - 0.3877 * age - 3.2649 * time - 0.1565 * hr : 132.853 - 0.0769 * weight - 0.3877 * age - 3.2649 * time - 0.1565 * hr
      let category: string
      if (vo2max >= 45) category = 'Excellent'
      else if (vo2max >= 35) category = 'Good'
      else if (vo2max >= 30) category = 'Average'
      else category = 'Below Average'
      return {
        results: [
          { label: 'VO2 Max', value: vo2max.toFixed(1), unit: 'ml/kg/min', highlight: true, icon: Activity },
          { label: 'Fitness Level', value: category },
          { label: 'Walk Time', value: `${timeMin}:${timeSec.toString().padStart(2, '0')}`, unit: 'min' }
        ],
        comparisons: [{ label: 'VO2 Max', value: vo2max, max: 60, color: '#22c55e' }],
        formula: { formula: 'VO2 = 132.853 - 0.0769(W) - 0.3877(A) - 3.2649(T) - 0.1565(HR)', explanation: 'Rockport 1-mile walk test formula.' }
      }
    }
  },
  'cooper-test': {
    name: 'Cooper Test', description: 'Run test fitness', longDescription: 'Calculate VO2 max using the Cooper 12-minute run test. Run as far as possible in 12 minutes to estimate your cardiovascular fitness level.', category: 'health', icon: Timer,
    inputs: [
      { id: 'distance', label: 'Distance Run (meters)', placeholder: '2400' },
      { id: 'age', label: 'Age', placeholder: '30' },
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
    ],
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!distance || !age) return { results: [] }
      const vo2max = (distance - 504.9) / 44.73
      let category: string, color: string
      if (gender === 'male') {
        if (vo2max >= 50) { category = 'Excellent'; color = '#22c55e' }
        else if (vo2max >= 40) { category = 'Good'; color = '#84cc16' }
        else if (vo2max >= 35) { category = 'Average'; color = '#f59e0b' }
        else { category = 'Below Average'; color = '#ef4444' }
      } else {
        if (vo2max >= 45) { category = 'Excellent'; color = '#22c55e' }
        else if (vo2max >= 35) { category = 'Good'; color = '#84cc16' }
        else if (vo2max >= 30) { category = 'Average'; color = '#f59e0b' }
        else { category = 'Below Average'; color = '#ef4444' }
      }
      return {
        results: [
          { label: 'VO2 Max', value: vo2max.toFixed(1), unit: 'ml/kg/min', highlight: true, icon: Activity },
          { label: 'Fitness Level', value: category },
          { label: 'Distance', value: distance, unit: 'm' }
        ],
        comparisons: [{ label: 'VO2 Max', value: vo2max, max: 60, color }],
        formula: { formula: 'VO2 = (Distance - 504.9) ÷ 44.73', explanation: `Running ${distance}m in 12 minutes indicates VO2 max of ${vo2max.toFixed(1)}.` }
      }
    }
  },
  'running-pace': {
    name: 'Running Pace', description: 'Min/km', longDescription: 'Calculate your running pace in minutes per kilometer or mile. Understanding your pace helps with training and race planning.', category: 'health', icon: Timer,
    inputs: [
      { id: 'distance', label: 'Distance (km)', placeholder: '5' },
      { id: 'min', label: 'Minutes', placeholder: '25' },
      { id: 'sec', label: 'Seconds', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance), min = parseFloat(inputs.min) || 0, sec = parseFloat(inputs.sec) || 0
      if (!distance) return { results: [] }
      const totalSec = min * 60 + sec, paceSec = totalSec / distance, paceMin = Math.floor(paceSec / 60), paceSecRemain = Math.round(paceSec % 60)
      const speedKmh = distance / (totalSec / 3600), speedMph = speedKmh * 0.621371
      const paceMile = paceSec * 1.60934, paceMileMin = Math.floor(paceMile / 60), paceMileSec = Math.round(paceMile % 60)
      return {
        results: [
          { label: 'Pace', value: `${paceMin}:${paceSecRemain.toString().padStart(2, '0')}`, unit: 'min/km', highlight: true, icon: Timer },
          { label: 'Pace (Mile)', value: `${paceMileMin}:${paceMileSec.toString().padStart(2, '0')}`, unit: 'min/mi' },
          { label: 'Speed', value: speedKmh.toFixed(1), unit: 'km/h' },
          { label: 'Speed', value: speedMph.toFixed(1), unit: 'mph' }
        ],
        formula: { formula: 'Pace = Time ÷ Distance', explanation: `${min}:${sec.toString().padStart(2, '0')} over ${distance}km = ${paceMin}:${paceSecRemain.toString().padStart(2, '0')} per km` }
      }
    }
  },
  'cycling-speed': {
    name: 'Cycling Speed', description: 'Speed calc', longDescription: 'Calculate cycling speed, pace, and estimated time for various distances. Useful for training and event planning.', category: 'health', icon: Activity,
    inputs: [
      { id: 'distance', label: 'Distance (km)', placeholder: '40' },
      { id: 'hours', label: 'Hours', placeholder: '1' },
      { id: 'minutes', label: 'Minutes', placeholder: '30' }
    ],
    calculate: (inputs) => {
      const distance = parseFloat(inputs.distance), hours = parseFloat(inputs.hours) || 0, minutes = parseFloat(inputs.minutes) || 0
      if (!distance) return { results: [] }
      const totalHours = hours + minutes / 60, speedKmh = distance / totalHours, speedMph = speedKmh * 0.621371
      const pacePerKm = (totalHours / distance) * 60, paceKmMin = Math.floor(pacePerKm), paceKmSec = Math.round((pacePerKm - paceKmMin) * 60)
      return {
        results: [
          { label: 'Average Speed', value: speedKmh.toFixed(1), unit: 'km/h', highlight: true, icon: Activity },
          { label: 'Speed', value: speedMph.toFixed(1), unit: 'mph' },
          { label: 'Pace', value: `${paceKmMin}:${paceKmSec.toString().padStart(2, '0')}`, unit: 'min/km' }
        ],
        formula: { formula: 'Speed = Distance ÷ Time', explanation: `${distance}km in ${hours}h ${minutes}m = ${speedKmh.toFixed(1)} km/h` }
      }
    }
  },
  'swim-pace': {
    name: 'Swim Pace', description: 'Pool lap pace', longDescription: 'Calculate swimming pace per 100m or per lap. Track your swimming efficiency and set training goals.', category: 'health', icon: Activity,
    inputs: [
      { id: 'poolLength', label: 'Pool Length (m)', placeholder: '', type: 'select', options: [{ value: '25', label: '25m (Short Course)' }, { value: '50', label: '50m (Olympic)' }] },
      { id: 'distance', label: 'Total Distance (m)', placeholder: '1000' },
      { id: 'min', label: 'Minutes', placeholder: '20' },
      { id: 'sec', label: 'Seconds', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const poolLength = parseFloat(inputs.poolLength) || 25, distance = parseFloat(inputs.distance), min = parseFloat(inputs.min) || 0, sec = parseFloat(inputs.sec) || 0
      if (!distance) return { results: [] }
      const totalSec = min * 60 + sec, pace100 = (totalSec / distance) * 100, paceMin = Math.floor(pace100 / 60), paceSec = Math.round(pace100 % 60)
      const laps = distance / poolLength, lapTime = totalSec / laps, lapMin = Math.floor(lapTime / 60), lapSec = Math.round(lapTime % 60)
      return {
        results: [
          { label: 'Pace', value: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, unit: 'per 100m', highlight: true, icon: Activity },
          { label: 'Lap Time', value: `${lapMin}:${lapSec.toString().padStart(2, '0')}`, unit: `per ${poolLength}m lap` },
          { label: 'Total Laps', value: laps, unit: 'laps' },
          { label: 'Speed', value: (distance / (totalSec / 60) * 60 / 1000).toFixed(2), unit: 'km/h' }
        ],
        formula: { formula: 'Pace = Time ÷ Distance × 100', explanation: `${min}:${sec.toString().padStart(2, '0')} for ${distance}m = ${paceMin}:${paceSec.toString().padStart(2, '0')} per 100m` }
      }
    }
  },
  'steps-to-calories': {
    name: 'Steps to Calories', description: 'Pedometer calc', longDescription: 'Convert your step count to estimated calories burned. The calculation considers your weight and walking intensity.', category: 'health', icon: Activity,
    inputs: [
      { id: 'steps', label: 'Number of Steps', placeholder: '10000' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const steps = parseFloat(inputs.steps), weight = parseFloat(inputs.weight) || 70, height = parseFloat(inputs.height) || 170
      if (!steps) return { results: [] }
      const strideLength = height * 0.00415, distance = steps * strideLength, calories = steps * 0.04 * (weight / 70)
      const miles = distance / 1609.34, km = distance / 1000
      const goalPercent = (steps / 10000) * 100
      return {
        results: [
          { label: 'Calories Burned', value: Math.round(calories), unit: 'cal', highlight: true, icon: FlameIcon },
          { label: 'Distance', value: km.toFixed(2), unit: 'km' },
          { label: 'Distance', value: miles.toFixed(2), unit: 'miles' },
          { label: 'Daily Goal Progress', value: goalPercent.toFixed(0), unit: '%' }
        ],
        pieData: [{ label: 'Steps Completed', value: Math.min(steps, 10000), color: '#22c55e' }, { label: 'Remaining', value: Math.max(0, 10000 - steps), color: '#e5e7eb' }],
        comparisons: [{ label: 'Daily Goal (10k steps)', value: steps, max: 15000, color: '#22c55e' }],
        formula: { formula: 'Calories = Steps × 0.04 × (Weight/70)', explanation: `${steps.toLocaleString()} steps ≈ ${km.toFixed(2)}km ≈ ${Math.round(calories)} calories` }
      }
    }
  },
  'floors-calories': {
    name: 'Floors Calories', description: 'Stairs burned', longDescription: 'Calculate calories burned climbing stairs. Stair climbing is an excellent high-intensity exercise that burns significant calories.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'floors', label: 'Floors Climbed', placeholder: '10' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'stepsPerFloor', label: 'Steps per Floor', placeholder: '12' }
    ],
    calculate: (inputs) => {
      const floors = parseFloat(inputs.floors), weight = parseFloat(inputs.weight) || 70, stepsPerFloor = parseFloat(inputs.stepsPerFloor) || 12
      if (!floors) return { results: [] }
      const totalSteps = floors * stepsPerFloor, calories = 0.17 * weight * (totalSteps / 10)
      const flights = floors, verticalMeters = floors * 3
      return {
        results: [
          { label: 'Calories Burned', value: Math.round(calories), unit: 'cal', highlight: true, icon: FlameIcon },
          { label: 'Total Steps', value: totalSteps, unit: 'steps' },
          { label: 'Vertical Distance', value: verticalMeters.toFixed(1), unit: 'meters' },
          { label: 'Equivalent Flights', value: floors, unit: 'flights' }
        ],
        comparisons: [{ label: 'Floors Climbed', value: floors, max: 50, color: '#f97316' }],
        formula: { formula: 'Calories ≈ 0.17 × Weight × Steps ÷ 10', explanation: `${floors} floors (${totalSteps} steps) at ${weight}kg ≈ ${Math.round(calories)} calories` }
      }
    }
  },
  'sleep-debt': {
    name: 'Sleep Debt', description: 'Missed sleep', longDescription: 'Calculate your accumulated sleep debt. Chronic sleep deprivation can have serious health effects, and tracking helps identify patterns.', category: 'health', icon: Moon,
    inputs: [
      { id: 'sleepHours', label: 'Hours Slept This Week', placeholder: '42' },
      { id: 'idealHours', label: 'Ideal Hours per Night', placeholder: '8' },
      { id: 'weeks', label: 'Weeks to Calculate', placeholder: '1' }
    ],
    calculate: (inputs) => {
      const sleepHours = parseFloat(inputs.sleepHours), idealHours = parseFloat(inputs.idealHours) || 8, weeks = parseFloat(inputs.weeks) || 1
      if (!sleepHours) return { results: [] }
      const idealWeekly = idealHours * 7, debt = idealWeekly * weeks - sleepHours, debtHours = Math.max(0, debt)
      const recoveryNights = Math.ceil(debtHours / idealHours)
      return {
        results: [
          { label: 'Sleep Debt', value: debtHours.toFixed(1), unit: 'hours', highlight: true, icon: Moon },
          { label: 'Weekly Target', value: idealWeekly, unit: 'hours' },
          { label: 'Actual Sleep', value: sleepHours, unit: 'hours' },
          { label: 'Recovery Nights Needed', value: recoveryNights, description: 'Extra full nights of sleep' }
        ],
        comparisons: [{ label: 'Sleep Debt', value: debtHours, max: 40, color: debtHours > 10 ? '#ef4444' : '#f59e0b' }],
        infoCards: [{ title: 'Sleep Debt Effects', content: debtHours > 10 ? 'High sleep debt affects cognition, mood, and immune function.' : 'Managing sleep debt helps maintain optimal health.', variant: debtHours > 10 ? 'warning' : 'info' }],
        formula: { formula: 'Debt = (Ideal Hours × 7 × Weeks) - Actual Hours', explanation: `You need ${recoveryNights} extra night(s) of sleep to recover.` }
      }
    }
  },
  'circadian-rhythm': {
    name: 'Circadian Rhythm', description: 'Optimal sleep times', longDescription: 'Calculate optimal sleep and wake times based on your circadian rhythm. Understanding your body clock helps improve sleep quality.', category: 'health', icon: Moon,
    inputs: [
      { id: 'wakeTime', label: 'Wake Up Time', placeholder: '07:00' },
      { id: 'sleepCycles', label: 'Desired Sleep Cycles', placeholder: '', type: 'select', options: [{ value: '5', label: '5 cycles (7.5 hours)' }, { value: '6', label: '6 cycles (9 hours)' }, { value: '4', label: '4 cycles (6 hours)' }] }
    ],
    calculate: (inputs) => {
      const wakeTime = inputs.wakeTime || '07:00', cycles = parseInt(inputs.sleepCycles || '5')
      const [hours, minutes] = wakeTime.split(':').map(Number)
      const wakeDate = new Date(), wakeDateCopy = new Date()
      wakeDate.setHours(hours, minutes, 0, 0)
      const sleepDuration = cycles * 90, sleepTime = new Date(wakeDate.getTime() - sleepDuration * 60000)
      const formatTime = (d: Date) => `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      const bedtimes: string[] = []
      for (let i = 0; i < 4; i++) {
        const bt = new Date(wakeDate.getTime() - (sleepDuration + i * 90) * 60000)
        bedtimes.push(formatTime(bt))
      }
      return {
        results: [
          { label: 'Optimal Bedtime', value: formatTime(sleepTime), highlight: true, icon: Moon },
          { label: 'Wake Time', value: wakeTime },
          { label: 'Sleep Duration', value: (sleepDuration / 60).toFixed(1), unit: 'hours' },
          { label: 'Earlier Options', value: bedtimes.slice(1).join(', ') }
        ],
        infoCards: [{ title: 'Sleep Cycles', content: 'Each cycle is ~90 minutes. Waking at cycle end feels more refreshing.', variant: 'info' }],
        formula: { formula: 'Bedtime = Wake Time - (Cycles × 90 min)', explanation: `${cycles} cycles of 90 minutes = ${sleepDuration / 60} hours of sleep.` }
      }
    }
  },
  'hydration-needs': {
    name: 'Hydration Needs', description: 'Water by activity', longDescription: 'Calculate your daily water intake needs based on body weight and activity level. Proper hydration is essential for health and performance.', category: 'health', icon: Droplets,
    inputs: [
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'activity', label: 'Activity Level', placeholder: '', type: 'select', options: [{ value: 'sedentary', label: 'Sedentary' }, { value: 'moderate', label: 'Moderate Exercise' }, { value: 'intense', label: 'Intense Exercise' }] },
      { id: 'climate', label: 'Climate', placeholder: '', type: 'select', options: [{ value: 'normal', label: 'Normal' }, { value: 'hot', label: 'Hot/Humid' }] }
    ],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), activity = inputs.activity || 'sedentary', climate = inputs.climate || 'normal'
      if (!weight) return { results: [] }
      let baseWater = weight * 33
      if (activity === 'moderate') baseWater += 500
      else if (activity === 'intense') baseWater += 1000
      if (climate === 'hot') baseWater += 500
      const liters = baseWater / 1000, glasses = baseWater / 250
      return {
        results: [
          { label: 'Daily Water Need', value: liters.toFixed(1), unit: 'liters', highlight: true, icon: Droplets },
          { label: 'Milliliters', value: Math.round(baseWater), unit: 'ml' },
          { label: 'Glasses (250ml)', value: Math.round(glasses), unit: 'glasses' }
        ],
        comparisons: [{ label: 'Hydration Goal', value: baseWater, max: 4000, color: '#3b82f6' }],
        formula: { formula: 'Base = Weight × 33ml + Activity + Climate adjustments', explanation: `${weight}kg × 33ml + adjustments = ${Math.round(baseWater)}ml` }
      }
    }
  },
  'caffeine-half-life': {
    name: 'Caffeine Half-Life', description: 'Caffeine decay', longDescription: 'Calculate how much caffeine remains in your system over time. Caffeine has a half-life of about 5-6 hours in most adults.', category: 'health', icon: Zap,
    inputs: [
      { id: 'caffeineMg', label: 'Caffeine Consumed (mg)', placeholder: '200' },
      { id: 'hoursAgo', label: 'Hours Since Consumption', placeholder: '4' },
      { id: 'halfLife', label: 'Your Half-Life (hours)', placeholder: '', type: 'select', options: [{ value: '5', label: '5 hours (Fast metabolizer)' }, { value: '6', label: '6 hours (Average)' }, { value: '7', label: '7 hours (Slow metabolizer)' }] }
    ],
    calculate: (inputs) => {
      const caffeine = parseFloat(inputs.caffeineMg), hours = parseFloat(inputs.hoursAgo) || 0, halfLife = parseFloat(inputs.halfLife) || 6
      if (!caffeine) return { results: [] }
      const remaining = caffeine * Math.pow(0.5, hours / halfLife)
      const safeSleep = caffeine * 0.1, hoursToSafe = halfLife * Math.log2(caffeine / safeSleep)
      let timeToSafe = hoursToSafe - hours
      if (timeToSafe < 0) timeToSafe = 0
      return {
        results: [
          { label: 'Remaining Caffeine', value: remaining.toFixed(0), unit: 'mg', highlight: true, icon: Zap },
          { label: 'Hours Since Intake', value: hours, unit: 'hours' },
          { label: 'Time to Minimal Effect', value: timeToSafe.toFixed(1), unit: 'hours', description: '< 10% remaining' }
        ],
        comparisons: [{ label: 'Caffeine Remaining', value: remaining, max: caffeine, color: '#f59e0b' }],
        infoCards: [{ title: 'Sleep Impact', content: remaining > 50 ? 'Current caffeine level may affect sleep quality.' : 'Caffeine level is low enough for most people to sleep.', variant: remaining > 50 ? 'warning' : 'info' }],
        formula: { formula: 'Remaining = Initial × 0.5^(hours ÷ half-life)', explanation: `${caffeine}mg after ${hours}h with ${halfLife}h half-life = ${remaining.toFixed(0)}mg remaining` }
      }
    }
  },
  'stress-score': {
    name: 'Stress Score', description: 'Stress assessment', longDescription: 'Assess your stress level with this quick questionnaire. Understanding your stress levels helps you take appropriate action for your mental health.', category: 'health', icon: Activity,
    inputs: [
      { id: 'q1', label: 'Feeling overwhelmed (0=Never, 4=Very Often)', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Never' }, { value: '1', label: '1 - Almost Never' }, { value: '2', label: '2 - Sometimes' }, { value: '3', label: '3 - Fairly Often' }, { value: '4', label: '4 - Very Often' }] },
      { id: 'q2', label: 'Unable to control important things', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Never' }, { value: '1', label: '1 - Almost Never' }, { value: '2', label: '2 - Sometimes' }, { value: '3', label: '3 - Fairly Often' }, { value: '4', label: '4 - Very Often' }] },
      { id: 'q3', label: 'Nervous and stressed', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Never' }, { value: '1', label: '1 - Almost Never' }, { value: '2', label: '2 - Sometimes' }, { value: '3', label: '3 - Fairly Often' }, { value: '4', label: '4 - Very Often' }] },
      { id: 'q4', label: 'Unable to cope with things', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Never' }, { value: '1', label: '1 - Almost Never' }, { value: '2', label: '2 - Sometimes' }, { value: '3', label: '3 - Fairly Often' }, { value: '4', label: '4 - Very Often' }] }
    ],
    calculate: (inputs) => {
      const q1 = parseFloat(inputs.q1) || 0, q2 = parseFloat(inputs.q2) || 0, q3 = parseFloat(inputs.q3) || 0, q4 = parseFloat(inputs.q4) || 0
      const total = q1 + q2 + q3 + q4
      let level: string, color: string, recommendation: string
      if (total <= 4) { level = 'Low'; color = '#22c55e'; recommendation = 'You appear to be managing stress well.' }
      else if (total <= 8) { level = 'Moderate'; color = '#f59e0b'; recommendation = 'Consider stress reduction techniques.' }
      else if (total <= 12) { level = 'High'; color = '#f97316'; recommendation = 'Active stress management recommended.' }
      else { level = 'Very High'; color = '#ef4444'; recommendation = 'Consider speaking with a mental health professional.' }
      return {
        results: [
          { label: 'Stress Score', value: total, unit: '/ 16', highlight: true, icon: Activity },
          { label: 'Stress Level', value: level }
        ],
        comparisons: [{ label: 'Stress Level', value: total, max: 16, color }],
        infoCards: [{ title: 'Recommendation', content: recommendation, variant: total > 8 ? 'warning' : 'info' }],
        formula: { formula: 'PSS-4 Scale (Perceived Stress Scale)', explanation: `Score: ${total}/16 indicates ${level.toLowerCase()} perceived stress.` }
      }
    }
  },
  'anxiety-screening': {
    name: 'Anxiety Screening', description: 'GAD-7 based', longDescription: 'A brief screening tool based on the GAD-7 questionnaire for anxiety. This is not a diagnosis but can help identify if professional help might be beneficial.', category: 'health', icon: Brain,
    inputs: [
      { id: 'q1', label: 'Feeling nervous/anxious/on edge', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] },
      { id: 'q2', label: 'Not able to stop/control worrying', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] },
      { id: 'q3', label: 'Worrying too much about things', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] },
      { id: 'q4', label: 'Trouble relaxing', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] }
    ],
    calculate: (inputs) => {
      const q1 = parseFloat(inputs.q1) || 0, q2 = parseFloat(inputs.q2) || 0, q3 = parseFloat(inputs.q3) || 0, q4 = parseFloat(inputs.q4) || 0
      const total = q1 + q2 + q3 + q4
      let severity: string, color: string, recommendation: string
      if (total <= 4) { severity = 'Minimal'; color = '#22c55e'; recommendation = 'No significant anxiety symptoms indicated.' }
      else if (total <= 9) { severity = 'Mild'; color = '#84cc16'; recommendation = 'Monitor and consider self-help resources.' }
      else if (total <= 14) { severity = 'Moderate'; color = '#f59e0b'; recommendation = 'Consider consulting a healthcare provider.' }
      else { severity = 'Severe'; color = '#ef4444'; recommendation = 'Please consult a mental health professional.' }
      return {
        results: [
          { label: 'Anxiety Score', value: total, unit: '/ 12', highlight: true, icon: Brain },
          { label: 'Severity', value: severity }
        ],
        comparisons: [{ label: 'Anxiety Level', value: total, max: 12, color }],
        infoCards: [{ title: 'Note', content: 'This is a screening tool, not a diagnosis. Please consult a healthcare provider for proper evaluation.', variant: 'info' }, { title: 'Recommendation', content: recommendation, variant: total > 9 ? 'warning' : 'info' }],
        formula: { formula: 'GAD-7 (simplified 4-item)', explanation: `Score ${total}/12 suggests ${severity.toLowerCase()} anxiety level.` }
      }
    }
  },
  'depression-screening': {
    name: 'Depression Screening', description: 'PHQ-2 based', longDescription: 'A brief screening based on the PHQ-2 questionnaire. A positive result may warrant further evaluation with PHQ-9 or clinical assessment.', category: 'health', icon: Brain,
    inputs: [
      { id: 'q1', label: 'Little interest/pleasure in doing things', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] },
      { id: 'q2', label: 'Feeling down/depressed/hopeless', placeholder: '', type: 'select', options: [{ value: '0', label: '0 - Not at all' }, { value: '1', label: '1 - Several days' }, { value: '2', label: '2 - More than half' }, { value: '3', label: '3 - Nearly every day' }] }
    ],
    calculate: (inputs) => {
      const q1 = parseFloat(inputs.q1) || 0, q2 = parseFloat(inputs.q2) || 0
      const total = q1 + q2
      let result: string, color: string, recommendation: string
      if (total <= 2) { result = 'Negative Screen'; color = '#22c55e'; recommendation = 'No immediate concern indicated.' }
      else if (total <= 4) { result = 'Positive Screen (Mild)'; color = '#f59e0b'; recommendation = 'Consider further evaluation.' }
      else { result = 'Positive Screen (Moderate-Severe)'; color = '#ef4444'; recommendation = 'Further evaluation recommended.' }
      return {
        results: [
          { label: 'PHQ-2 Score', value: total, unit: '/ 6', highlight: true, icon: Brain },
          { label: 'Screening Result', value: result }
        ],
        comparisons: [{ label: 'Depression Risk', value: total, max: 6, color }],
        infoCards: [{ title: 'Important', content: 'This is a screening tool only. Please consult a healthcare provider for proper diagnosis and treatment.', variant: total > 2 ? 'warning' : 'info' }, { title: 'Recommendation', content: recommendation, variant: 'info' }],
        formula: { formula: 'PHQ-2 Screening', explanation: `Score ≥3 is considered positive for depression screening.` }
      }
    }
  },
  'frame-size': {
    name: 'Frame Size', description: 'Wrist based body frame', longDescription: 'Determine your body frame size (small, medium, large) based on wrist circumference. Frame size can help determine ideal weight ranges.', category: 'health', icon: Ruler,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'wrist', label: 'Wrist Circumference (cm)', placeholder: '17' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', height = parseFloat(inputs.height), wrist = parseFloat(inputs.wrist)
      if (!height || !wrist) return { results: [] }
      let frameSize: string, color: string, idealWeightAdjust: string
      if (gender === 'male') {
        const ratio = height / wrist
        if (ratio > 10.4) { frameSize = 'Small'; color = '#3b82f6'; idealWeightAdjust = '10% below standard ideal weight' }
        else if (ratio > 9.6) { frameSize = 'Medium'; color = '#22c55e'; idealWeightAdjust = 'Standard ideal weight range' }
        else { frameSize = 'Large'; color = '#f59e0b'; idealWeightAdjust = '10% above standard ideal weight' }
      } else {
        const ratio = height / wrist
        if (ratio > 11) { frameSize = 'Small'; color = '#3b82f6'; idealWeightAdjust = '10% below standard ideal weight' }
        else if (ratio > 10.1) { frameSize = 'Medium'; color = '#22c55e'; idealWeightAdjust = 'Standard ideal weight range' }
        else { frameSize = 'Large'; color = '#f59e0b'; idealWeightAdjust = '10% above standard ideal weight' }
      }
      return {
        results: [
          { label: 'Frame Size', value: frameSize, highlight: true, icon: Ruler },
          { label: 'Height/Wrist Ratio', value: (height / wrist).toFixed(2) },
          { label: 'Weight Adjustment', value: idealWeightAdjust }
        ],
        formula: { formula: gender === 'male' ? 'Frame = Height ÷ Wrist (men)' : 'Frame = Height ÷ Wrist (women)', explanation: `Ratio ${height}/${wrist} = ${(height / wrist).toFixed(2)} → ${frameSize} frame` }
      }
    }
  },
  'corpulence-index': {
    name: 'Corpulence Index', description: 'Rohrer\'s index', longDescription: 'Calculate the Corpulence Index (Rohrer\'s Index or Ponderal Index), an alternative to BMI that may be more accurate for very tall or short individuals.', category: 'health', icon: Activity,
    inputs: [
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), height = parseFloat(inputs.height)
      if (!weight || !height) return { results: [] }
      const heightM = height / 100, ci = weight / Math.pow(heightM, 3)
      let category: string, color: string
      if (ci < 10) { category = 'Underweight'; color = '#3b82f6' }
      else if (ci < 13) { category = 'Normal'; color = '#22c55e' }
      else if (ci < 15) { category = 'Overweight'; color = '#f59e0b' }
      else { category = 'Obese'; color = '#ef4444' }
      return {
        results: [
          { label: 'Corpulence Index', value: ci.toFixed(1), unit: 'kg/m³', highlight: true, icon: Activity },
          { label: 'Category', value: category },
          { label: 'BMI (for comparison)', value: (weight / (heightM * heightM)).toFixed(1), unit: 'kg/m²' }
        ],
        comparisons: [{ label: 'Corpulence Index', value: ci, max: 20, color }],
        formula: { formula: 'CI = Weight ÷ Height³ (in meters)', explanation: `${weight} ÷ ${heightM.toFixed(2)}³ = ${ci.toFixed(1)}` }
      }
    }
  },
  'bsa-dosing': {
    name: 'BSA Dosing', description: 'Drug dosing by BSA', longDescription: 'Calculate Body Surface Area (BSA) for medication dosing. Many chemotherapy drugs and other medications are dosed based on BSA.', category: 'health', icon: Activity,
    inputs: [
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'dosePer', label: 'Dose per m² (mg)', placeholder: '50' }
    ],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), dosePer = parseFloat(inputs.dosePer) || 0
      if (!weight || !height) return { results: [] }
      const bsa = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725), totalDose = bsa * dosePer
      return {
        results: [
          { label: 'Body Surface Area', value: bsa.toFixed(2), unit: 'm²', highlight: true, icon: Ruler },
          { label: 'Weight', value: weight, unit: 'kg' },
          { label: 'Height', value: height, unit: 'cm' },
          ...(dosePer > 0 ? [
            { label: 'Calculated Dose', value: totalDose.toFixed(1), unit: 'mg', highlight: true }
          ] : [])
        ],
        formula: { formula: 'BSA = 0.007184 × Weight^0.425 × Height^0.725 (Du Bois)', explanation: `Mosteller formula: BSA = ${(bsa).toFixed(2)} m²` },
        infoCards: [{ title: 'Clinical Use', content: 'BSA-based dosing is used for many medications, especially chemotherapy. Always verify with prescribing guidelines.', variant: 'info' }]
      }
    }
  },
  // ==================== NEW HEALTH CALCULATORS (15) ====================
  'resting-metabolic': {
    name: 'Resting Metabolic Rate', description: 'RMR calculation', longDescription: 'Calculate your Resting Metabolic Rate using the Mifflin-St Jeor equation. RMR represents the calories your body burns at complete rest.', category: 'health', icon: Zap,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'age', label: 'Age', placeholder: '30' }
    ],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!w || !h || !age) return { results: [] }
      const rmr = gender === 'male' ? (10 * w + 6.25 * h - 5 * age + 5) : (10 * w + 6.25 * h - 5 * age - 161)
      return {
        results: [
          { label: 'Resting Metabolic Rate', value: Math.round(rmr), unit: 'calories/day', highlight: true, icon: Zap },
          { label: 'Per Hour', value: Math.round(rmr / 24), unit: 'cal' },
          { label: 'Per Minute', value: Math.round(rmr / 1440), unit: 'cal' }
        ],
        formula: { formula: 'RMR = 10W + 6.25H - 5A + S (Mifflin-St Jeor)', explanation: `${gender === 'male' ? 'S = 5' : 'S = -161'} for ${gender}` }
      }
    }
  },
  'daily-steps': {
    name: 'Daily Steps Goal', description: 'Steps target', longDescription: 'Calculate your recommended daily steps based on your health goals and current fitness level.', category: 'health', icon: Activity,
    inputs: [
      { id: 'goal', label: 'Goal', placeholder: '', type: 'select', options: [{ value: 'health', label: 'General Health' }, { value: 'weight', label: 'Weight Loss' }, { value: 'fitness', label: 'Fitness' }] },
      { id: 'current', label: 'Current Steps/Day', placeholder: '5000' }
    ],
    calculate: (inputs) => {
      const current = parseFloat(inputs.current) || 0, goal = inputs.goal || 'health'
      const targets: Record<string, number> = { health: 7500, weight: 10000, fitness: 12000 }
      const target = targets[goal]
      const weeklyIncrease = Math.ceil((target - current) / 12)
      return {
        results: [
          { label: 'Target Steps', value: target.toLocaleString(), unit: 'steps/day', highlight: true },
          { label: 'Current Steps', value: current.toLocaleString(), unit: 'steps/day' },
          { label: 'Weekly Increase', value: weeklyIncrease.toLocaleString(), unit: 'steps' }
        ],
        formula: { formula: 'Gradual increase over 12 weeks', explanation: `Increase by ${weeklyIncrease} steps per week to reach your goal safely.` }
      }
    }
  },
  'bone-mass': {
    name: 'Bone Mass Estimator', description: 'Estimate bone weight', longDescription: 'Estimate your bone mass based on total body weight and gender. Bone mass typically accounts for 12-15% of body weight.', category: 'health', icon: Activity,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'weight', label: 'Body Weight (kg)', placeholder: '70' }
    ],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), gender = inputs.gender || 'male'
      if (!w) return { results: [] }
      const bonePercent = gender === 'male' ? 0.15 : 0.12
      const boneMass = w * bonePercent
      return {
        results: [
          { label: 'Estimated Bone Mass', value: boneMass.toFixed(1), unit: 'kg', highlight: true },
          { label: 'Percentage', value: (bonePercent * 100).toFixed(0), unit: '%' }
        ],
        pieData: [{ label: 'Bone Mass', value: boneMass, color: '#8b5cf6' }, { label: 'Other Tissues', value: w - boneMass, color: '#e5e7eb' }],
        formula: { formula: 'Bone Mass = Weight × Gender Factor', explanation: `Men: ~15%, Women: ~12% of body weight.` }
      }
    }
  },
  'sweat-rate': {
    name: 'Sweat Rate Calculator', description: 'Hydration needs', longDescription: 'Calculate your sweat rate during exercise to optimize hydration strategy.', category: 'health', icon: Droplets,
    inputs: [
      { id: 'weightBefore', label: 'Weight Before (kg)', placeholder: '70' },
      { id: 'weightAfter', label: 'Weight After (kg)', placeholder: '69' },
      { id: 'fluid', label: 'Fluid Consumed (L)', placeholder: '0.5' },
      { id: 'duration', label: 'Exercise Duration (min)', placeholder: '60' }
    ],
    calculate: (inputs) => {
      const before = parseFloat(inputs.weightBefore), after = parseFloat(inputs.weightAfter), fluid = parseFloat(inputs.fluid) || 0, duration = parseFloat(inputs.duration)
      if (!before || !after || !duration) return { results: [] }
      const weightLoss = before - after
      const sweatRate = (weightLoss + fluid) / (duration / 60)
      return {
        results: [
          { label: 'Sweat Rate', value: sweatRate.toFixed(2), unit: 'L/hour', highlight: true },
          { label: 'Weight Lost', value: weightLoss.toFixed(2), unit: 'kg' },
          { label: 'Fluid Needed/Hour', value: sweatRate.toFixed(2), unit: 'L' }
        ],
        formula: { formula: 'Sweat Rate = (Weight Loss + Fluid Consumed) / Hours', explanation: 'Use this to plan your hydration during exercise.' }
      }
    }
  },
  'daily-fiber': {
    name: 'Daily Fiber Needs', description: 'Fiber requirements', longDescription: 'Calculate your recommended daily fiber intake based on age and gender.', category: 'health', icon: Activity,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '30' },
      { id: 'calories', label: 'Daily Calories', placeholder: '2000' }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), calories = parseFloat(inputs.calories), gender = inputs.gender || 'male'
      if (!calories) return { results: [] }
      let recFiber: number
      if (age < 50) recFiber = gender === 'male' ? 38 : 25
      else recFiber = gender === 'male' ? 30 : 21
      const calBasedFiber = calories / 1000 * 14
      return {
        results: [
          { label: 'Recommended Fiber', value: recFiber, unit: 'g/day', highlight: true },
          { label: 'Calorie-Based', value: Math.round(calBasedFiber), unit: 'g/day' },
          { label: 'Upper Limit', value: recFiber + 10, unit: 'g/day' }
        ],
        formula: { formula: '14g per 1000 calories', explanation: 'Fiber helps digestion, heart health, and blood sugar control.' }
      }
    }
  },
  'vitamin-d': {
    name: 'Vitamin D Needs', description: 'Vitamin D intake', longDescription: 'Calculate recommended Vitamin D intake based on age and sun exposure.', category: 'health', icon: Sun,
    inputs: [
      { id: 'age', label: 'Age', placeholder: '30' },
      { id: 'sunExposure', label: 'Sun Exposure', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Limited (<15 min/day)' }, { value: 'moderate', label: 'Moderate (15-30 min)' }, { value: 'high', label: 'High (>30 min/day)' }] }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), sun = inputs.sunExposure || 'moderate'
      if (!age) return { results: [] }
      let baseIU = age < 70 ? 600 : 800
      if (sun === 'low') baseIU += 400
      else if (sun === 'moderate') baseIU += 200
      return {
        results: [
          { label: 'Recommended Intake', value: baseIU, unit: 'IU/day', highlight: true },
          { label: 'Safe Upper Limit', value: age < 9 ? 3000 : age < 71 ? 4000 : 4000, unit: 'IU/day' }
        ],
        infoCards: [{ title: 'Sources', content: 'Sunlight, fatty fish, fortified foods, supplements.', variant: 'info' }],
        formula: { formula: 'Age-based recommendations', explanation: 'Higher needs with limited sun exposure.' }
      }
    }
  },
  'menstrual-cycle': {
    name: 'Menstrual Cycle Calculator', description: 'Cycle tracking', longDescription: 'Track your menstrual cycle and predict future periods and fertile days.', category: 'health', icon: Calendar,
    inputs: [
      { id: 'lastPeriod', label: 'Last Period Start', placeholder: '', type: 'date' },
      { id: 'cycleLength', label: 'Cycle Length (days)', placeholder: '28' },
      { id: 'periodLength', label: 'Period Length (days)', placeholder: '5' }
    ],
    calculate: (inputs) => {
      if (!inputs.lastPeriod) return { results: [] }
      const lastPeriod = new Date(inputs.lastPeriod), cycle = parseFloat(inputs.cycleLength) || 28
      const nextPeriod = new Date(lastPeriod)
      nextPeriod.setDate(nextPeriod.getDate() + cycle)
      const ovulation = new Date(lastPeriod)
      ovulation.setDate(ovulation.getDate() + cycle - 14)
      const fertileStart = new Date(ovulation), fertileEnd = new Date(ovulation)
      fertileStart.setDate(fertileStart.getDate() - 5)
      fertileEnd.setDate(fertileEnd.getDate() + 1)
      return {
        results: [
          { label: 'Next Period', value: nextPeriod.toDateString(), highlight: true },
          { label: 'Ovulation Date', value: ovulation.toDateString() },
          { label: 'Fertile Window', value: `${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}` }
        ],
        formula: { formula: 'Ovulation = LMP + (Cycle - 14 days)', explanation: 'Cycle tracking helps family planning.' }
      }
    }
  },
  'blood-type-child': {
    name: 'Child Blood Type Predictor', description: 'Predict blood type', longDescription: 'Predict possible blood types for a child based on parents blood types.', category: 'health', icon: Heart,
    inputs: [
      { id: 'parent1', label: 'Parent 1 Blood Type', placeholder: '', type: 'select', options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'AB', label: 'AB' }, { value: 'O', label: 'O' }] },
      { id: 'parent2', label: 'Parent 2 Blood Type', placeholder: '', type: 'select', options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'AB', label: 'AB' }, { value: 'O', label: 'O' }] }
    ],
    calculate: (inputs) => {
      const p1 = inputs.parent1 || 'A', p2 = inputs.parent2 || 'A'
      const possibilities: Record<string, string[]> = {
        'A-A': ['A', 'O'], 'A-B': ['A', 'B', 'AB', 'O'], 'A-AB': ['A', 'B', 'AB'], 'A-O': ['A', 'O'],
        'B-B': ['B', 'O'], 'B-AB': ['A', 'B', 'AB'], 'B-O': ['B', 'O'],
        'AB-AB': ['A', 'B', 'AB'], 'AB-O': ['A', 'B'],
        'O-O': ['O']
      }
      const key1 = `${p1}-${p2}`, key2 = `${p2}-${p1}`
      const possible = possibilities[key1] || possibilities[key2] || ['Unknown']
      return {
        results: [
          { label: 'Possible Blood Types', value: possible.join(', '), highlight: true },
          { label: 'Parent 1', value: p1 },
          { label: 'Parent 2', value: p2 }
        ],
        formula: { formula: 'Mendelian inheritance', explanation: 'Blood type is determined by ABO genes from both parents.' }
      }
    }
  },
  'allergy-season': {
    name: 'Allergy Season Predictor', description: 'Pollen calendar', longDescription: 'Predict common allergy seasons and triggers based on your location and time of year.', category: 'health', icon: Wind,
    inputs: [
      { id: 'month', label: 'Current Month', placeholder: '', type: 'select', options: [{ value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' }, { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' }, { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' }, { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }] }
    ],
    calculate: (inputs) => {
      const month = parseInt(inputs.month) || 1
      let allergens: string[] = []
      if (month >= 2 && month <= 5) allergens = ['Tree Pollen (Birch, Oak, Maple)']
      if (month >= 5 && month <= 8) allergens = ['Grass Pollen', 'Mold Spores']
      if (month >= 8 && month <= 11) allergens = ['Ragweed', 'Mold Spores', 'Dust Mites']
      if (month === 12 || month === 1 || month === 2) allergens = ['Indoor Allergens (Dust, Pet Dander)']
      return {
        results: [
          { label: 'Active Allergens', value: allergens.join(', '), highlight: true },
          { label: 'Peak Season', value: allergens.length > 0 ? 'Yes' : 'Low season' }
        ],
        infoCards: [{ title: 'Tip', content: 'Check local pollen counts and take antihistamines before exposure.', variant: 'info' }],
        formula: { formula: 'Seasonal allergen calendar', explanation: 'Allergen levels vary by region and weather.' }
      }
    }
  },
  'sleep-apnea-risk': {
    name: 'Sleep Apnea Risk Score', description: 'OSA screening', longDescription: 'Screen for obstructive sleep apnea risk using the STOP-BANG questionnaire.', category: 'health', icon: Moon,
    inputs: [
      { id: 'snoring', label: 'Loud Snoring?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'tired', label: 'Often Tired?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'observed', label: 'Observed Stopping Breathing?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'pressure', label: 'High Blood Pressure?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'bmi', label: 'BMI > 35?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'age', label: 'Age > 50?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'neck', label: 'Neck > 40cm?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'gender', label: 'Male?', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] }
    ],
    calculate: (inputs) => {
      let score = 0
      if (inputs.snoring === 'yes') score++
      if (inputs.tired === 'yes') score++
      if (inputs.observed === 'yes') score++
      if (inputs.pressure === 'yes') score++
      if (inputs.bmi === 'yes') score++
      if (inputs.age === 'yes') score++
      if (inputs.neck === 'yes') score++
      if (inputs.gender === 'yes') score++
      let risk: string
      if (score <= 2) risk = 'Low Risk'
      else if (score <= 4) risk = 'Intermediate Risk'
      else risk = 'High Risk'
      return {
        results: [
          { label: 'STOP-BANG Score', value: `${score}/8`, highlight: true },
          { label: 'Risk Level', value: risk }
        ],
        infoCards: [{ title: score > 4 ? 'Consult a Doctor' : 'Monitor', content: score > 4 ? 'High score suggests need for sleep study evaluation.' : 'Continue monitoring symptoms.', variant: score > 4 ? 'warning' : 'info' }],
        formula: { formula: 'STOP-BANG Questionnaire', explanation: 'Validated screening tool for OSA.' }
      }
    }
  },
  'keto-ratio': {
    name: 'Keto Macro Ratio', description: 'Ketogenic macros', longDescription: 'Calculate your macronutrient ratios for a ketogenic diet.', category: 'health', icon: PieChartIcon,
    inputs: [
      { id: 'calories', label: 'Daily Calories', placeholder: '2000' },
      { id: 'protein', label: 'Protein %', placeholder: '20' }
    ],
    calculate: (inputs) => {
      const cals = parseFloat(inputs.calories), proteinPercent = parseFloat(inputs.protein) || 20
      if (!cals) return { results: [] }
      const fatPercent = 100 - proteinPercent - 5
      const carbsPercent = 5
      const fatGrams = (cals * fatPercent / 100) / 9
      const proteinGrams = (cals * proteinPercent / 100) / 4
      const carbsGrams = (cals * carbsPercent / 100) / 4
      return {
        results: [
          { label: 'Fat', value: `${Math.round(fatGrams)}g (${fatPercent}%)`, highlight: true },
          { label: 'Protein', value: `${Math.round(proteinGrams)}g (${proteinPercent}%)` },
          { label: 'Net Carbs', value: `${Math.round(carbsGrams)}g (${carbsPercent}%)` }
        ],
        pieData: [{ label: 'Fat', value: fatGrams, color: '#f59e0b' }, { label: 'Protein', value: proteinGrams, color: '#ef4444' }, { label: 'Carbs', value: carbsGrams, color: '#22c55e' }],
        formula: { formula: 'Standard Keto: 75% Fat, 20% Protein, 5% Carbs', explanation: 'Adjust protein based on activity level.' }
      }
    }
  },
  'intermittent-fasting': {
    name: 'Intermittent Fasting Scheduler', description: 'IF timing', longDescription: 'Calculate your eating and fasting windows for intermittent fasting protocols.', category: 'health', icon: Timer,
    inputs: [
      { id: 'protocol', label: 'Protocol', placeholder: '', type: 'select', options: [{ value: '16:8', label: '16:8 (16hr fast)' }, { value: '18:6', label: '18:6 (18hr fast)' }, { value: '20:4', label: '20:4 (20hr fast)' }, { value: '5:2', label: '5:2 (5 days normal)' }] },
      { id: 'startHour', label: 'Eating Window Start', placeholder: '12:00' }
    ],
    calculate: (inputs) => {
      const protocol = inputs.protocol || '16:8', start = inputs.startHour || '12:00'
      const [h, m] = start.split(':').map(Number)
      const fastingHrs: Record<string, number> = { '16:8': 16, '18:6': 18, '20:4': 20, '5:2': 16 }
      const fastHrs = fastingHrs[protocol]
      const eatHrs = 24 - fastHrs
      const endH = (h + eatHrs) % 24
      return {
        results: [
          { label: 'Fasting Duration', value: `${fastHrs} hours`, highlight: true },
          { label: 'Eating Window', value: `${eatHrs} hours` },
          { label: 'Eat From', value: `${h}:${(m || 0).toString().padStart(2, '0')} to ${endH}:${(m || 0).toString().padStart(2, '0')}` }
        ],
        formula: { formula: `${protocol} Protocol`, explanation: protocol === '5:2' ? '5 normal days, 2 very low calorie days per week' : `${fastHrs}hr fast, ${eatHrs}hr eating window` }
      }
    }
  },
  'workout-splits': {
    name: 'Workout Split Calculator', description: 'Training schedule', longDescription: 'Calculate your weekly workout split based on training frequency and goals.', category: 'health', icon: Activity,
    inputs: [
      { id: 'days', label: 'Training Days/Week', placeholder: '', type: 'select', options: [{ value: '3', label: '3 days' }, { value: '4', label: '4 days' }, { value: '5', label: '5 days' }, { value: '6', label: '6 days' }] },
      { id: 'goal', label: 'Goal', placeholder: '', type: 'select', options: [{ value: 'strength', label: 'Strength' }, { value: 'hypertrophy', label: 'Muscle Growth' }, { value: 'general', label: 'General Fitness' }] }
    ],
    calculate: (inputs) => {
      const days = parseInt(inputs.days) || 3, goal = inputs.goal || 'strength'
      let split: string
      if (days === 3) split = 'Full Body A/B/C (Mon/Wed/Fri)'
      else if (days === 4) split = 'Upper/Lower Split (Mon/Tue/Thu/Fri)'
      else if (days === 5) split = 'Push/Pull/Legs/Upper/Lower'
      else split = 'Push/Pull/Legs × 2'
      const restDays = 7 - days
      return {
        results: [
          { label: 'Recommended Split', value: split, highlight: true },
          { label: 'Training Days', value: days },
          { label: 'Rest Days', value: restDays }
        ],
        formula: { formula: 'Progressive overload principle', explanation: `Optimized for ${goal} with ${days} days/week.` }
      }
    }
  },
  'max-heart-rate': {
    name: 'Max Heart Rate', description: 'MHR estimation', longDescription: 'Calculate your maximum heart rate using multiple estimation formulas.', category: 'health', icon: Heart,
    inputs: [
      { id: 'age', label: 'Age', placeholder: '30' }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age)
      if (!age) return { results: [] }
      const fox = 220 - age
      const tanaka = 208 - (0.7 * age)
      const gellish = 207 - (0.7 * age)
      const average = (fox + tanaka + gellish) / 3
      return {
        results: [
          { label: 'Average Max HR', value: Math.round(average), unit: 'bpm', highlight: true },
          { label: 'Fox Formula', value: fox, unit: 'bpm' },
          { label: 'Tanaka Formula', value: Math.round(tanaka), unit: 'bpm' },
          { label: 'Gellish Formula', value: Math.round(gellish), unit: 'bpm' }
        ],
        comparisons: [{ label: 'Fox', value: fox, max: 220, color: '#ef4444' }, { label: 'Tanaka', value: tanaka, max: 220, color: '#22c55e' }],
        formula: { formula: 'Multiple formulas used', explanation: 'Fox: 220-age, Tanaka: 208-(0.7×age), Gellish: 207-(0.7×age)' }
      }
    }
  },
  'muscle-gain-rate': {
    name: 'Muscle Gain Rate', description: 'Expected gains', longDescription: 'Calculate realistic muscle gain expectations based on training experience.', category: 'health', icon: Activity,
    inputs: [
      { id: 'experience', label: 'Training Experience', placeholder: '', type: 'select', options: [{ value: 'beginner', label: 'Beginner (<1 year)' }, { value: 'intermediate', label: 'Intermediate (1-3 years)' }, { value: 'advanced', label: 'Advanced (3+ years)' }] },
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
    ],
    calculate: (inputs) => {
      const exp = inputs.experience || 'beginner', gender = inputs.gender || 'male'
      const rates: Record<string, Record<string, number>> = {
        beginner: { male: 1.0, female: 0.5 },
        intermediate: { male: 0.5, female: 0.25 },
        advanced: { male: 0.25, female: 0.125 }
      }
      const monthlyKg = rates[exp][gender]
      const yearlyKg = monthlyKg * 12
      return {
        results: [
          { label: 'Monthly Gain', value: monthlyKg.toFixed(2), unit: 'kg', highlight: true },
          { label: 'Yearly Gain', value: yearlyKg.toFixed(1), unit: 'kg' },
          { label: 'Weekly Gain', value: (monthlyKg / 4).toFixed(3), unit: 'kg' }
        ],
        formula: { formula: 'Lyle McDonald Model', explanation: 'Natural muscle gain limits based on training experience.' }
      }
    }
  },
  // ==================== NEW HEALTH CALCULATORS (15 - Round 2) ====================
  'hyponatremia-risk': {
    name: 'Hyponatremia Risk Calculator', description: 'Low sodium risk', longDescription: 'Assess your risk of exercise-associated hyponatremia based on exercise duration, fluid intake, and sodium loss.', category: 'health', icon: Droplets,
    inputs: [
      { id: 'duration', label: 'Exercise Duration (hours)', placeholder: '4' },
      { id: 'fluidIntake', label: 'Fluid Intake (L/hour)', placeholder: '1' },
      { id: 'sweatRate', label: 'Sweat Rate (L/hour)', placeholder: '0.8' },
      { id: 'sodiumSupplement', label: 'Sodium Supplementation', placeholder: '', type: 'select', options: [{ value: 'none', label: 'None' }, { value: 'some', label: 'Some (electrolyte drink)' }, { value: 'adequate', label: 'Adequate (salt tabs)' }] }
    ],
    calculate: (inputs) => {
      const duration = parseFloat(inputs.duration), fluidIntake = parseFloat(inputs.fluidIntake), sweatRate = parseFloat(inputs.sweatRate), supplement = inputs.sodiumSupplement || 'some'
      if (!duration || !fluidIntake) return { results: [] }
      const totalIntake = fluidIntake * duration
      const totalLoss = sweatRate * duration
      const netFluid = totalIntake - totalLoss
      const supplementFactor = supplement === 'none' ? 1.5 : supplement === 'some' ? 1 : 0.5
      const riskScore = netFluid * supplementFactor
      let risk: string, riskColor: string
      if (riskScore < 0.5) { risk = 'Low Risk'; riskColor = '#22c55e' }
      else if (riskScore < 1.5) { risk = 'Moderate Risk'; riskColor = '#f59e0b' }
      else { risk = 'High Risk'; riskColor = '#ef4444' }
      return {
        results: [
          { label: 'Risk Level', value: risk, highlight: true },
          { label: 'Net Fluid Gain', value: netFluid.toFixed(2), unit: 'L' },
          { label: 'Total Intake', value: totalIntake.toFixed(2), unit: 'L' },
          { label: 'Total Loss', value: totalLoss.toFixed(2), unit: 'L' }
        ],
        infoCards: [{ title: 'Prevention', content: riskScore > 1 ? 'Reduce fluid intake, add electrolytes, drink to thirst.' : 'Continue current hydration strategy.', variant: riskScore > 1 ? 'warning' : 'info' }],
        formula: { formula: 'Risk = (Intake - Loss) × Supplement Factor', explanation: 'Excessive water intake during endurance events can dilute blood sodium.' }
      }
    }
  },
  'basal-insulin': {
    name: 'Basal Insulin Dose', description: 'Insulin calculation', longDescription: 'Calculate estimated basal insulin requirements for type 1 and type 2 diabetes management.', category: 'health', icon: Activity,
    inputs: [
      { id: 'weight', label: 'Body Weight (kg)', placeholder: '70' },
      { id: 'diabetesType', label: 'Diabetes Type', placeholder: '', type: 'select', options: [{ value: 'type1', label: 'Type 1' }, { value: 'type2', label: 'Type 2' }] },
      { id: 'age', label: 'Age', placeholder: '35' }
    ],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), type = inputs.diabetesType || 'type2', age = parseFloat(inputs.age)
      if (!weight) return { results: [] }
      const tdd = type === 'type1' ? weight * 0.5 : weight * 0.2
      const basal = tdd * 0.5
      const bolus = tdd * 0.5
      const iCorrection = type === 'type1' ? 50 : 30
      return {
        results: [
          { label: 'Basal Insulin', value: basal.toFixed(1), unit: 'units/day', highlight: true },
          { label: 'Total Daily Dose', value: tdd.toFixed(1), unit: 'units' },
          { label: 'Bolus Insulin (est)', value: bolus.toFixed(1), unit: 'units/day' },
          { label: 'Insulin:Carb Ratio', value: `1:${Math.round(500 / tdd)}` }
        ],
        infoCards: [{ title: 'Medical Disclaimer', content: 'This is an estimate only. Always follow your healthcare provider\'s recommendations.', variant: 'warning' }],
        formula: { formula: 'Basal = 50% of TDD, TDD = Weight × Factor', explanation: `Type 1: 0.5 units/kg, Type 2: 0.2 units/kg starting dose.` }
      }
    }
  },
  'carb-diabetic': {
    name: 'Carb Calculator for Diabetics', description: 'Carb counting', longDescription: 'Calculate carbohydrate intake and insulin dose for diabetic meal planning.', category: 'health', icon: PieChartIcon,
    inputs: [
      { id: 'carbs', label: 'Carbohydrates (g)', placeholder: '60' },
      { id: 'icr', label: 'Insulin:Carb Ratio', placeholder: '10' },
      { id: 'currentGlucose', label: 'Current Glucose (mg/dL)', placeholder: '150' },
      { id: 'targetGlucose', label: 'Target Glucose (mg/dL)', placeholder: '100' },
      { id: 'isf', label: 'Insulin Sensitivity Factor', placeholder: '50' }
    ],
    calculate: (inputs) => {
      const carbs = parseFloat(inputs.carbs) || 0, icr = parseFloat(inputs.icr) || 10
      const currentG = parseFloat(inputs.currentGlucose) || 100, targetG = parseFloat(inputs.targetGlucose) || 100
      const isf = parseFloat(inputs.isf) || 50
      const mealInsulin = carbs / icr
      const correctionInsulin = Math.max(0, (currentG - targetG) / isf)
      const totalInsulin = mealInsulin + correctionInsulin
      return {
        results: [
          { label: 'Total Insulin Needed', value: totalInsulin.toFixed(1), unit: 'units', highlight: true },
          { label: 'Meal Insulin', value: mealInsulin.toFixed(1), unit: 'units' },
          { label: 'Correction Insulin', value: correctionInsulin.toFixed(1), unit: 'units' }
        ],
        formula: { formula: 'Meal: Carbs/ICR, Correction: (Current-Target)/ISF', explanation: `Carb dose: ${carbs}/${icr}, Correction: (${currentG}-${targetG})/${isf}` }
      }
    }
  },
  'blood-volume': {
    name: 'Blood Volume Calculator', description: 'Total blood volume', longDescription: 'Estimate your total blood volume using the Nadler formula based on height, weight, and gender.', category: 'health', icon: Heart,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', h = parseFloat(inputs.height), w = parseFloat(inputs.weight)
      if (!h || !w) return { results: [] }
      const heightM = h / 100
      let volume: number
      if (gender === 'male') {
        volume = (0.3669 * Math.pow(heightM, 3)) + (0.03219 * w) + 0.6041
      } else {
        volume = (0.3561 * Math.pow(heightM, 3)) + (0.03308 * w) + 0.1833
      }
      const plasma = volume * 0.55
      const rbc = volume * 0.45
      return {
        results: [
          { label: 'Total Blood Volume', value: volume.toFixed(2), unit: 'Liters', highlight: true },
          { label: 'Plasma Volume', value: plasma.toFixed(2), unit: 'L' },
          { label: 'RBC Volume', value: rbc.toFixed(2), unit: 'L' },
          { label: 'Blood Volume', value: (volume * 1000).toFixed(0), unit: 'mL' }
        ],
        pieData: [{ label: 'Plasma', value: plasma, color: '#f59e0b' }, { label: 'Red Blood Cells', value: rbc, color: '#ef4444' }],
        formula: { formula: 'Nadler Formula (1962)', explanation: 'Blood volume estimation based on body surface area calculation.' }
      }
    }
  },
  'cardiac-output': {
    name: 'Cardiac Output Calculator', description: 'CO calculation', longDescription: 'Calculate cardiac output (CO) from heart rate and stroke volume using the Fick principle.', category: 'health', icon: Heart,
    inputs: [
      { id: 'heartRate', label: 'Heart Rate (bpm)', placeholder: '72' },
      { id: 'strokeVolume', label: 'Stroke Volume (mL)', placeholder: '70' }
    ],
    calculate: (inputs) => {
      const hr = parseFloat(inputs.heartRate), sv = parseFloat(inputs.strokeVolume)
      if (!hr || !sv) return { results: [] }
      const co = (hr * sv) / 1000
      const ci = co / 1.73
      return {
        results: [
          { label: 'Cardiac Output', value: co.toFixed(2), unit: 'L/min', highlight: true },
          { label: 'Cardiac Index', value: ci.toFixed(2), unit: 'L/min/m²' },
          { label: 'Stroke Volume', value: sv, unit: 'mL/beat' },
          { label: 'Heart Rate', value: hr, unit: 'bpm' }
        ],
        formula: { formula: 'CO = HR × SV, CI = CO / BSA', explanation: `Cardiac output: ${hr} bpm × ${sv} mL = ${co.toFixed(2)} L/min` }
      }
    }
  },
  'mean-arterial-pressure': {
    name: 'Mean Arterial Pressure', description: 'MAP calculation', longDescription: 'Calculate Mean Arterial Pressure (MAP), an important indicator of tissue perfusion.', category: 'health', icon: Activity,
    inputs: [
      { id: 'systolic', label: 'Systolic BP (mmHg)', placeholder: '120' },
      { id: 'diastolic', label: 'Diastolic BP (mmHg)', placeholder: '80' }
    ],
    calculate: (inputs) => {
      const sys = parseFloat(inputs.systolic), dia = parseFloat(inputs.diastolic)
      if (!sys || !dia) return { results: [] }
      const map = dia + (1/3) * (sys - dia)
      const pp = sys - dia
      let status: string
      if (map < 60) status = 'Low - May indicate poor perfusion'
      else if (map < 70) status = 'Borderline Low'
      else if (map < 105) status = 'Normal'
      else status = 'Elevated - Consider evaluation'
      return {
        results: [
          { label: 'MAP', value: map.toFixed(1), unit: 'mmHg', highlight: true },
          { label: 'Pulse Pressure', value: pp, unit: 'mmHg' },
          { label: 'Status', value: status }
        ],
        infoCards: [{ title: 'Clinical Significance', content: 'MAP > 60 mmHg needed for adequate organ perfusion. MAP > 70 is ideal.', variant: 'info' }],
        formula: { formula: 'MAP = DBP + 1/3(SBP - DBP)', explanation: `(${dia} + 1/3 × (${sys} - ${dia})) = ${map.toFixed(1)}` }
      }
    }
  },
  'pulse-pressure': {
    name: 'Pulse Pressure Calculator', description: 'PP analysis', longDescription: 'Calculate and analyze pulse pressure, the difference between systolic and diastolic blood pressure.', category: 'health', icon: Activity,
    inputs: [
      { id: 'systolic', label: 'Systolic BP (mmHg)', placeholder: '120' },
      { id: 'diastolic', label: 'Diastolic BP (mmHg)', placeholder: '80' },
      { id: 'age', label: 'Age', placeholder: '45' }
    ],
    calculate: (inputs) => {
      const sys = parseFloat(inputs.systolic), dia = parseFloat(inputs.diastolic), age = parseFloat(inputs.age) || 40
      if (!sys || !dia) return { results: [] }
      const pp = sys - dia
      let status: string, risk: string
      if (pp < 40) { status = 'Low'; risk = 'May indicate reduced cardiac output' }
      else if (pp <= 60) { status = 'Normal'; risk = 'Healthy cardiovascular function' }
      else { status = 'Elevated'; risk = 'May indicate arterial stiffness or aortic valve issues' }
      const ageAdjusted = 40 + (age - 40) * 0.2
      return {
        results: [
          { label: 'Pulse Pressure', value: pp, unit: 'mmHg', highlight: true },
          { label: 'Status', value: status },
          { label: 'Age-Expected Range', value: `${Math.max(40, ageAdjusted - 10).toFixed(0)}-${(ageAdjusted + 10).toFixed(0)} mmHg` }
        ],
        infoCards: [{ title: 'Cardiovascular Risk', content: risk, variant: pp > 60 ? 'warning' : 'info' }],
        formula: { formula: 'PP = Systolic - Diastolic', explanation: `Normal range: 40-60 mmHg. Higher PP with age indicates arterial stiffness.` }
      }
    }
  },
  'respiratory-rate-zones': {
    name: 'Respiratory Rate Zones', description: 'Breathing analysis', longDescription: 'Analyze respiratory rate and classify into normal, abnormal, and concerning zones.', category: 'health', icon: Wind,
    inputs: [
      { id: 'respiratoryRate', label: 'Respiratory Rate (breaths/min)', placeholder: '16' },
      { id: 'age', label: 'Age', placeholder: '30' }
    ],
    calculate: (inputs) => {
      const rr = parseFloat(inputs.respiratoryRate), age = parseFloat(inputs.age) || 30
      if (!rr) return { results: [] }
      let zone: string, status: string, color: string
      if (rr < 12) { zone = 'Bradypnea'; status = 'Abnormally slow - seek medical attention if symptomatic'; color = '#f59e0b' }
      else if (rr <= 20) { zone = 'Normal'; status = 'Healthy respiratory rate'; color = '#22c55e' }
      else if (rr <= 24) { zone = 'Mild Tachypnea'; status = 'Slightly elevated - monitor'; color = '#f59e0b' }
      else { zone = 'Tachypnea'; status = 'Abnormally fast - seek medical evaluation'; color = '#ef4444' }
      const tidalVolume = age > 12 ? 500 : 250 + (age * 20)
      const minuteVentilation = rr * tidalVolume / 1000
      return {
        results: [
          { label: 'Respiratory Zone', value: zone, highlight: true },
          { label: 'Rate', value: rr, unit: 'breaths/min' },
          { label: 'Minute Ventilation (est)', value: minuteVentilation.toFixed(1), unit: 'L/min' }
        ],
        comparisons: [{ label: 'Your RR', value: rr, max: 40, color }],
        infoCards: [{ title: 'Clinical Note', content: status, variant: rr < 12 || rr > 24 ? 'warning' : 'info' }],
        formula: { formula: 'Normal Adult: 12-20 breaths/min', explanation: 'Respiratory rate varies with age, activity, and health status.' }
      }
    }
  },
  'tidal-volume': {
    name: 'Tidal Volume Calculator', description: 'Breathing volume', longDescription: 'Calculate ideal tidal volume based on ideal body weight for ventilator settings or respiratory assessment.', category: 'health', icon: Wind,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'tidalSetting', label: 'Tidal Volume Setting', placeholder: '', type: 'select', options: [{ value: '6', label: '6 mL/kg (Lung Protective)' }, { value: '8', label: '8 mL/kg (Standard)' }, { value: '10', label: '10 mL/kg (Higher)' }] }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', h = parseFloat(inputs.height), setting = parseFloat(inputs.tidalSetting) || 8
      if (!h) return { results: [] }
      const heightInch = h / 2.54
      let ibw: number
      if (gender === 'male') ibw = 50 + 2.3 * (heightInch - 60)
      else ibw = 45.5 + 2.3 * (heightInch - 60)
      const vt = ibw * setting
      return {
        results: [
          { label: 'Tidal Volume', value: Math.round(vt), unit: 'mL', highlight: true },
          { label: 'Ideal Body Weight', value: ibw.toFixed(1), unit: 'kg' },
          { label: 'Setting Used', value: `${setting} mL/kg IBW` }
        ],
        infoCards: [{ title: 'Clinical Note', content: '6-8 mL/kg IBW is lung protective. Avoid >10 mL/kg in ARDS.', variant: 'info' }],
        formula: { formula: 'Vt = IBW × mL/kg setting', explanation: 'Based on ARDSNet protocol for ventilator management.' }
      }
    }
  },
  'lean-body-mass-water': {
    name: 'Lean Body Mass Water', description: 'LBM hydration', longDescription: 'Calculate the water content in your lean body mass based on body composition.', category: 'health', icon: Droplets,
    inputs: [
      { id: 'weight', label: 'Body Weight (kg)', placeholder: '70' },
      { id: 'bodyFat', label: 'Body Fat %', placeholder: '20' }
    ],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), bf = parseFloat(inputs.bodyFat)
      if (!w || isNaN(bf)) return { results: [] }
      const fatMass = w * bf / 100
      const lbm = w - fatMass
      const lbmWater = lbm * 0.73
      const totalBodyWater = w * (1 - bf/100) * 0.73
      return {
        results: [
          { label: 'Lean Body Mass', value: lbm.toFixed(1), unit: 'kg', highlight: true },
          { label: 'Water in LBM', value: lbmWater.toFixed(1), unit: 'L' },
          { label: 'LBM Water %', value: '73', unit: '%' },
          { label: 'Fat Mass', value: fatMass.toFixed(1), unit: 'kg' }
        ],
        pieData: [{ label: 'Water', value: lbmWater, color: '#3b82f6' }, { label: 'Dry LBM', value: lbm - lbmWater, color: '#8b5cf6' }],
        formula: { formula: 'LBM Water = LBM × 0.73', explanation: 'Lean tissue is approximately 73% water by weight.' }
      }
    }
  },
  'body-water-percentage': {
    name: 'Body Water Percentage', description: 'TBW calculation', longDescription: 'Calculate your total body water percentage using the Watson formula.', category: 'health', icon: Droplets,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '30' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' }
    ],
    calculate: (inputs) => {
      const gender = inputs.gender || 'male', age = parseFloat(inputs.age), h = parseFloat(inputs.height), w = parseFloat(inputs.weight)
      if (!h || !w) return { results: [] }
      let tbw: number
      if (gender === 'male') {
        tbw = 2.447 - 0.09156 * age + 0.1074 * h + 0.3362 * w
      } else {
        tbw = -2.097 + 0.1069 * h + 0.2466 * w
      }
      const tbwPercent = (tbw / w) * 100
      const normalMin = gender === 'male' ? 50 : 45
      const normalMax = gender === 'male' ? 65 : 60
      let status: string
      if (tbwPercent < normalMin) status = 'Below Normal'
      else if (tbwPercent <= normalMax) status = 'Normal'
      else status = 'Above Normal'
      return {
        results: [
          { label: 'Total Body Water', value: tbw.toFixed(1), unit: 'Liters', highlight: true },
          { label: 'TBW Percentage', value: tbwPercent.toFixed(1), unit: '%' },
          { label: 'Status', value: status }
        ],
        infoCards: [{ title: 'Normal Ranges', content: `Men: 50-65%, Women: 45-60%. Higher in athletes, lower in elderly.`, variant: 'info' }],
        formula: { formula: 'Watson Formula (1980)', explanation: 'TBW estimation based on anthropometric measurements.' }
      }
    }
  },
  'metabolic-equivalent': {
    name: 'Metabolic Equivalent (MET)', description: 'Exercise intensity', longDescription: 'Calculate Metabolic Equivalents (METs) to measure exercise intensity and calories burned.', category: 'health', icon: Zap,
    inputs: [
      { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: 'resting', label: 'Resting/Sitting' }, { value: 'walking', label: 'Walking (3 mph)' }, { value: 'jogging', label: 'Jogging (5 mph)' }, { value: 'running', label: 'Running (7 mph)' }, { value: 'cycling', label: 'Cycling (moderate)' }, { value: 'swimming', label: 'Swimming' }, { value: 'weight', label: 'Weight Training' }] },
      { id: 'weight', label: 'Body Weight (kg)', placeholder: '70' },
      { id: 'duration', label: 'Duration (minutes)', placeholder: '30' }
    ],
    calculate: (inputs) => {
      const activity = inputs.activity || 'resting', weight = parseFloat(inputs.weight), duration = parseFloat(inputs.duration)
      if (!weight || !duration) return { results: [] }
      const metValues: Record<string, number> = { resting: 1, walking: 3.5, jogging: 7, running: 11.5, cycling: 6, swimming: 8, weight: 5 }
      const met = metValues[activity]
      const calories = met * weight * duration / 60
      const vo2 = met * 3.5
      return {
        results: [
          { label: 'MET Value', value: met, highlight: true },
          { label: 'Calories Burned', value: Math.round(calories), unit: 'kcal' },
          { label: 'VO2 (est)', value: vo2.toFixed(1), unit: 'mL/kg/min' }
        ],
        comparisons: [{ label: 'Intensity', value: met, max: 15, color: met < 3 ? '#22c55e' : met < 6 ? '#f59e0b' : '#ef4444' }],
        formula: { formula: 'Calories = MET × Weight(kg) × Time(hr)', explanation: `1 MET = 3.5 mL O2/kg/min (resting metabolic rate)` }
      }
    }
  },
  'epoc-calculator': {
    name: 'Excess Post-Exercise Oxygen Consumption', description: 'Afterburn effect', longDescription: 'Calculate estimated EPOC (afterburn) calories burned after exercise based on intensity and duration.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'intensity', label: 'Exercise Intensity', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Low (40-50% max HR)' }, { value: 'moderate', label: 'Moderate (50-70% max HR)' }, { value: 'high', label: 'High (70-85% max HR)' }, { value: 'very-high', label: 'Very High (85%+ max HR)' }] },
      { id: 'duration', label: 'Duration (minutes)', placeholder: '45' },
      { id: 'exerciseCalories', label: 'Calories During Exercise', placeholder: '400' }
    ],
    calculate: (inputs) => {
      const intensity = inputs.intensity || 'moderate', duration = parseFloat(inputs.duration), exCals = parseFloat(inputs.exerciseCalories)
      if (!duration || !exCals) return { results: [] }
      const epocFactors: Record<string, number> = { 'low': 0.03, 'moderate': 0.07, 'high': 0.13, 'very-high': 0.18 }
      const durationBonus = duration > 50 ? 1.3 : duration > 30 ? 1.15 : 1
      const epocCalories = exCals * epocFactors[intensity] * durationBonus
      const epocDuration = intensity === 'very-high' ? 24 : intensity === 'high' ? 12 : intensity === 'moderate' ? 6 : 2
      return {
        results: [
          { label: 'EPOC Calories', value: Math.round(epocCalories), unit: 'kcal', highlight: true },
          { label: 'EPOC Duration', value: epocDuration, unit: 'hours' },
          { label: 'Total Burn', value: Math.round(exCals + epocCalories), unit: 'kcal' }
        ],
        formula: { formula: 'EPOC = Exercise Calories × Intensity Factor', explanation: 'Higher intensity and longer duration increase afterburn effect.' }
      }
    }
  },
  'daily-step-calorie': {
    name: 'Daily Step Calorie Burn', description: 'Steps to calories', longDescription: 'Calculate calories burned from daily steps based on step count, pace, and body weight.', category: 'health', icon: Activity,
    inputs: [
      { id: 'steps', label: 'Total Steps', placeholder: '10000' },
      { id: 'weight', label: 'Body Weight (kg)', placeholder: '70' },
      { id: 'pace', label: 'Walking Pace', placeholder: '', type: 'select', options: [{ value: 'slow', label: 'Slow (2 mph)' }, { value: 'moderate', label: 'Moderate (3 mph)' }, { value: 'brisk', label: 'Brisk (4 mph)' }] }
    ],
    calculate: (inputs) => {
      const steps = parseFloat(inputs.steps), weight = parseFloat(inputs.weight), pace = inputs.pace || 'moderate'
      if (!steps || !weight) return { results: [] }
      const strideLength = 0.76
      const distance = steps * strideLength / 1000
      const calPerStep: Record<string, number> = { slow: 0.04, moderate: 0.045, brisk: 0.055 }
      const calsPerKm: Record<string, number> = { slow: 0.65, moderate: 0.55, brisk: 0.52 }
      const calories = steps * calPerStep[pace] * (weight / 70)
      const activeTime = distance / (pace === 'slow' ? 3.2 : pace === 'moderate' ? 4.8 : 6.4) * 60
      return {
        results: [
          { label: 'Calories Burned', value: Math.round(calories), unit: 'kcal', highlight: true },
          { label: 'Distance', value: distance.toFixed(2), unit: 'km' },
          { label: 'Active Time', value: Math.round(activeTime), unit: 'minutes' }
        ],
        formula: { formula: 'Calories ≈ Steps × 0.04-0.055 × Weight Factor', explanation: `${steps.toLocaleString()} steps at ${pace} pace.` }
      }
    }
  },
  'resting-hr-percentile': {
    name: 'Resting Heart Rate Percentile', description: 'RHR ranking', longDescription: 'Find your resting heart rate percentile ranking compared to the general population by age and gender.', category: 'health', icon: Heart,
    inputs: [
      { id: 'restingHR', label: 'Resting Heart Rate (bpm)', placeholder: '65' },
      { id: 'age', label: 'Age', placeholder: '35' },
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
    ],
    calculate: (inputs) => {
      const rhr = parseFloat(inputs.restingHR), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!rhr || !age) return { results: [] }
      const avgRHR = gender === 'male' ? 72 : 76
      const stdDev = gender === 'male' ? 10 : 11
      const zScore = (avgRHR - rhr) / stdDev
      let percentile = Math.round(50 + zScore * 34)
      percentile = Math.max(1, Math.min(99, percentile))
      let status: string
      if (percentile >= 80) status = 'Excellent - Top 20%'
      else if (percentile >= 60) status = 'Good - Above Average'
      else if (percentile >= 40) status = 'Average'
      else if (percentile >= 20) status = 'Below Average'
      else status = 'Needs Improvement'
      return {
        results: [
          { label: 'Percentile', value: `${percentile}th`, highlight: true },
          { label: 'Status', value: status },
          { label: 'Your RHR', value: rhr, unit: 'bpm' },
          { label: 'Population Average', value: avgRHR, unit: 'bpm' }
        ],
        comparisons: [{ label: 'Your RHR', value: rhr, max: 120, color: percentile >= 60 ? '#22c55e' : percentile >= 40 ? '#f59e0b' : '#ef4444' }],
        formula: { formula: 'Z-score based on population data', explanation: `Lower RHR generally indicates better cardiovascular fitness.` }
      }
    }
  },
  // ==================== NEW FINANCIAL CALCULATORS (15) ====================
  'salary-converter': {
    name: 'Salary Converter', description: 'Hourly/Annual', longDescription: 'Convert between hourly, daily, weekly, monthly, and annual salary.', category: 'financial', icon: DollarSign,
    inputs: [
      { id: 'amount', label: 'Amount', placeholder: '50000' },
      { id: 'type', label: 'Type', placeholder: '', type: 'select', options: [{ value: 'annual', label: 'Annual' }, { value: 'monthly', label: 'Monthly' }, { value: 'hourly', label: 'Hourly' }] },
      { id: 'hours', label: 'Hours/Week', placeholder: '40' }
    ],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), hours = parseFloat(inputs.hours) || 40, type = inputs.type || 'annual'
      if (!amount) return { results: [] }
      let annual: number
      if (type === 'annual') annual = amount
      else if (type === 'monthly') annual = amount * 12
      else annual = amount * hours * 52
      const hourly = annual / 52 / hours
      const weekly = annual / 52
      const monthly = annual / 12
      return {
        results: [
          { label: 'Annual', value: `$${Math.round(annual).toLocaleString()}`, highlight: true },
          { label: 'Monthly', value: `$${Math.round(monthly).toLocaleString()}` },
          { label: 'Weekly', value: `$${Math.round(weekly).toLocaleString()}` },
          { label: 'Hourly', value: `$${hourly.toFixed(2)}` }
        ],
        formula: { formula: 'Standard conversion (52 weeks/year)', explanation: `Based on ${hours} hours/week.` }
      }
    }
  },
  'hourly-to-salary': {
    name: 'Hourly to Salary', description: 'Wage conversion', longDescription: 'Convert hourly wage to equivalent annual salary.', category: 'financial', icon: DollarSign,
    inputs: [
      { id: 'hourly', label: 'Hourly Rate ($)', placeholder: '25' },
      { id: 'hours', label: 'Hours/Week', placeholder: '40' },
      { id: 'weeks', label: 'Weeks/Year', placeholder: '52' }
    ],
    calculate: (inputs) => {
      const hourly = parseFloat(inputs.hourly), hours = parseFloat(inputs.hours) || 40, weeks = parseFloat(inputs.weeks) || 52
      if (!hourly) return { results: [] }
      const annual = hourly * hours * weeks
      const monthly = annual / 12
      const weekly = hourly * hours
      return {
        results: [
          { label: 'Annual Salary', value: `$${Math.round(annual).toLocaleString()}`, highlight: true },
          { label: 'Monthly', value: `$${Math.round(monthly).toLocaleString()}` },
          { label: 'Weekly', value: `$${Math.round(weekly).toLocaleString()}` }
        ],
        formula: { formula: 'Annual = Hourly × Hours/Week × Weeks/Year', explanation: `${hourly} × ${hours} × ${weeks} = ${annual}` }
      }
    }
  },
  'markup-calculator': {
    name: 'Markup Calculator', description: 'Calculate markup', longDescription: 'Calculate markup percentage and selling price from cost.', category: 'financial', icon: Percent,
    inputs: [
      { id: 'cost', label: 'Cost ($)', placeholder: '100' },
      { id: 'markup', label: 'Markup %', placeholder: '50' }
    ],
    calculate: (inputs) => {
      const cost = parseFloat(inputs.cost), markup = parseFloat(inputs.markup)
      if (!cost) return { results: [] }
      const markupAmount = cost * markup / 100
      const sellingPrice = cost + markupAmount
      const grossMargin = (markupAmount / sellingPrice) * 100
      return {
        results: [
          { label: 'Selling Price', value: `$${sellingPrice.toFixed(2)}`, highlight: true },
          { label: 'Markup Amount', value: `$${markupAmount.toFixed(2)}` },
          { label: 'Gross Margin %', value: `${grossMargin.toFixed(1)}%` }
        ],
        pieData: [{ label: 'Cost', value: cost, color: '#3b82f6' }, { label: 'Markup', value: markupAmount, color: '#22c55e' }],
        formula: { formula: 'Selling Price = Cost × (1 + Markup%)', explanation: `${cost} × 1.${markup} = ${sellingPrice.toFixed(2)}` }
      }
    }
  },
  'margin-calculator': {
    name: 'Margin Calculator', description: 'Profit margin', longDescription: 'Calculate profit margin from revenue and cost.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'revenue', label: 'Revenue ($)', placeholder: '1000' },
      { id: 'cost', label: 'Cost ($)', placeholder: '600' }
    ],
    calculate: (inputs) => {
      const revenue = parseFloat(inputs.revenue), cost = parseFloat(inputs.cost)
      if (!revenue || !cost) return { results: [] }
      const profit = revenue - cost
      const margin = (profit / revenue) * 100
      const markup = (profit / cost) * 100
      return {
        results: [
          { label: 'Profit', value: `$${profit.toFixed(2)}`, highlight: true },
          { label: 'Profit Margin', value: `${margin.toFixed(1)}%` },
          { label: 'Markup', value: `${markup.toFixed(1)}%` }
        ],
        pieData: [{ label: 'Cost', value: cost, color: '#ef4444' }, { label: 'Profit', value: profit, color: '#22c55e' }],
        formula: { formula: 'Margin = (Revenue - Cost) / Revenue × 100', explanation: `(${revenue} - ${cost}) / ${revenue} = ${margin.toFixed(1)}%` }
      }
    }
  },
  'commission-calculator': {
    name: 'Commission Calculator', description: 'Sales commission', longDescription: 'Calculate commission from sales amount and rate.', category: 'financial', icon: DollarSign,
    inputs: [
      { id: 'sales', label: 'Sales Amount ($)', placeholder: '10000' },
      { id: 'rate', label: 'Commission Rate (%)', placeholder: '10' },
      { id: 'base', label: 'Base Salary ($)', placeholder: '0' }
    ],
    calculate: (inputs) => {
      const sales = parseFloat(inputs.sales), rate = parseFloat(inputs.rate), base = parseFloat(inputs.base) || 0
      if (!sales) return { results: [] }
      const commission = sales * rate / 100
      const total = commission + base
      return {
        results: [
          { label: 'Total Earnings', value: `$${total.toFixed(2)}`, highlight: true },
          { label: 'Commission', value: `$${commission.toFixed(2)}` },
          { label: 'Base Salary', value: `$${base.toFixed(2)}` }
        ],
        formula: { formula: 'Commission = Sales × Rate%', explanation: `${sales} × ${rate}% = ${commission.toFixed(2)}` }
      }
    }
  },
  'price-per-unit': {
    name: 'Price Per Unit', description: 'Compare prices', longDescription: 'Calculate price per unit to compare different package sizes.', category: 'financial', icon: Calculator,
    inputs: [
      { id: 'price', label: 'Price ($)', placeholder: '10' },
      { id: 'quantity', label: 'Quantity', placeholder: '500' },
      { id: 'unit', label: 'Unit', placeholder: '', type: 'select', options: [{ value: 'g', label: 'Grams' }, { value: 'kg', label: 'Kilograms' }, { value: 'ml', label: 'Milliliters' }, { value: 'l', label: 'Liters' }, { value: 'oz', label: 'Ounces' }, { value: 'items', label: 'Items' }] }
    ],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), qty = parseFloat(inputs.quantity), unit = inputs.unit || 'items'
      if (!price || !qty) return { results: [] }
      const perUnit = price / qty
      const per100 = perUnit * 100
      return {
        results: [
          { label: 'Price per Unit', value: `$${perUnit.toFixed(4)}/${unit}`, highlight: true },
          { label: 'Per 100 ' + unit, value: `$${per100.toFixed(2)}` }
        ],
        formula: { formula: 'PPU = Price / Quantity', explanation: `${price} / ${qty} = ${perUnit.toFixed(4)}` }
      }
    }
  },
  'discount-compare': {
    name: 'Discount Compare', description: 'Compare deals', longDescription: 'Compare two discount offers to find the better deal.', category: 'financial', icon: Percent,
    inputs: [
      { id: 'price1', label: 'Price 1 ($)', placeholder: '100' },
      { id: 'discount1', label: 'Discount 1 (%)', placeholder: '20' },
      { id: 'price2', label: 'Price 2 ($)', placeholder: '90' },
      { id: 'discount2', label: 'Discount 2 (%)', placeholder: '10' }
    ],
    calculate: (inputs) => {
      const p1 = parseFloat(inputs.price1), d1 = parseFloat(inputs.discount1), p2 = parseFloat(inputs.price2), d2 = parseFloat(inputs.discount2)
      if (!p1 || !p2) return { results: [] }
      const final1 = p1 * (1 - d1 / 100)
      const final2 = p2 * (1 - d2 / 100)
      const savings = Math.abs(final1 - final2)
      const better = final1 < final2 ? 'Deal 1' : 'Deal 2'
      return {
        results: [
          { label: 'Deal 1 Final', value: `$${final1.toFixed(2)}` },
          { label: 'Deal 2 Final', value: `$${final2.toFixed(2)}` },
          { label: 'Better Deal', value: better, highlight: true },
          { label: 'You Save', value: `$${savings.toFixed(2)}` }
        ],
        formula: { formula: 'Final = Price × (1 - Discount%)', explanation: 'Compare final prices to find the best deal.' }
      }
    }
  },
  'gratuity-calculator': {
    name: 'Gratuity Calculator', description: 'Tip amount', longDescription: 'Calculate gratuity/tip for various services.', category: 'financial', icon: Receipt,
    inputs: [
      { id: 'service', label: 'Service', placeholder: '', type: 'select', options: [{ value: 'restaurant', label: 'Restaurant' }, { value: 'hotel', label: 'Hotel Housekeeping' }, { value: 'spa', label: 'Spa/Salon' }, { value: 'taxi', label: 'Taxi/Rideshare' }] },
      { id: 'amount', label: 'Bill Amount ($)', placeholder: '100' },
      { id: 'quality', label: 'Service Quality', placeholder: '', type: 'select', options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'average', label: 'Average' }] }
    ],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), service = inputs.service || 'restaurant', quality = inputs.quality || 'good'
      if (!amount) return { results: [] }
      const rates: Record<string, Record<string, number>> = {
        restaurant: { excellent: 0.22, good: 0.18, average: 0.15 },
        hotel: { excellent: 5, good: 3, average: 2 },
        spa: { excellent: 0.20, good: 0.18, average: 0.15 },
        taxi: { excellent: 0.20, good: 0.15, average: 0.10 }
      }
      const rate = rates[service][quality]
      const tip = service === 'hotel' ? rate : amount * rate
      const total = service === 'hotel' ? amount + tip : amount + tip
      return {
        results: [
          { label: 'Recommended Tip', value: `$${tip.toFixed(2)}`, highlight: true },
          { label: 'Tip Rate', value: service === 'hotel' ? `$${rate} per night` : `${(rate * 100).toFixed(0)}%` },
          { label: 'Total', value: `$${total.toFixed(2)}` }
        ],
        formula: { formula: 'Standard tipping guidelines', explanation: 'Tip varies by service type and quality.' }
      }
    }
  },
  'subscription-cost': {
    name: 'Subscription Cost', description: 'Recurring costs', longDescription: 'Calculate the true annual cost of your subscriptions.', category: 'financial', icon: Receipt,
    inputs: [
      { id: 'monthly', label: 'Monthly Subscriptions ($)', placeholder: '50' },
      { id: 'yearly', label: 'Yearly Subscriptions ($)', placeholder: '200' }
    ],
    calculate: (inputs) => {
      const monthly = parseFloat(inputs.monthly) || 0, yearly = parseFloat(inputs.yearly) || 0
      const totalYearly = (monthly * 12) + yearly
      const total5Years = totalYearly * 5
      const total10Years = totalYearly * 10
      return {
        results: [
          { label: 'Annual Cost', value: `$${totalYearly.toLocaleString()}`, highlight: true },
          { label: '5-Year Cost', value: `$${total5Years.toLocaleString()}` },
          { label: '10-Year Cost', value: `$${total10Years.toLocaleString()}` }
        ],
        pieData: [{ label: 'Monthly Subs', value: monthly * 12, color: '#3b82f6' }, { label: 'Yearly Subs', value: yearly, color: '#22c55e' }],
        formula: { formula: 'Total = (Monthly × 12) + Yearly', explanation: 'Small recurring costs add up significantly over time.' }
      }
    }
  },
  // ==================== NEW MATH CALCULATORS (15) ====================
  'power-calculator': {
    name: 'Power Calculator', description: 'Calculate x^y', longDescription: 'Calculate any number raised to any power.', category: 'math', icon: Calculator,
    inputs: [{ id: 'base', label: 'Base', placeholder: '2' }, { id: 'exponent', label: 'Exponent', placeholder: '10' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), exp = parseFloat(inputs.exponent)
      if (isNaN(base) || isNaN(exp)) return { results: [] }
      const result = Math.pow(base, exp)
      return { results: [{ label: 'Result', value: result.toLocaleString(), highlight: true }], formula: { formula: `${base}^${exp}`, explanation: `${base} raised to power ${exp} = ${result.toLocaleString()}` } }
    }
  },
  'modulo-calculator': {
    name: 'Modulo Calculator', description: 'Remainder', longDescription: 'Calculate the remainder of division (modulo operation).', category: 'math', icon: Divide,
    inputs: [{ id: 'dividend', label: 'Dividend', placeholder: '17' }, { id: 'divisor', label: 'Divisor', placeholder: '5' }],
    calculate: (inputs) => {
      const dividend = parseFloat(inputs.dividend), divisor = parseFloat(inputs.divisor)
      if (isNaN(dividend) || isNaN(divisor) || divisor === 0) return { results: [{ label: 'Error', value: 'Invalid input' }] }
      const remainder = dividend % divisor
      const quotient = Math.floor(dividend / divisor)
      return { results: [{ label: 'Remainder', value: remainder, highlight: true }, { label: 'Quotient', value: quotient }], formula: { formula: `${dividend} mod ${divisor}`, explanation: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}` } }
    }
  },
  'distance-points': {
    name: 'Distance Between Points', description: '2D distance', longDescription: 'Calculate the distance between two points in 2D space.', category: 'math', icon: Ruler,
    inputs: [{ id: 'x1', label: 'X1', placeholder: '0' }, { id: 'y1', label: 'Y1', placeholder: '0' }, { id: 'x2', label: 'X2', placeholder: '3' }, { id: 'y2', label: 'Y2', placeholder: '4' }],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1), y1 = parseFloat(inputs.y1), x2 = parseFloat(inputs.x2), y2 = parseFloat(inputs.y2)
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { results: [] }
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      return { results: [{ label: 'Distance', value: distance.toFixed(4), highlight: true }], formula: { formula: 'd = √[(x2-x1)² + (y2-y1)²]', explanation: `Distance from (${x1},${y1}) to (${x2},${y2})` } }
    }
  },
  'midpoint-calculator': {
    name: 'Midpoint Calculator', description: 'Find center', longDescription: 'Calculate the midpoint between two points.', category: 'math', icon: Target,
    inputs: [{ id: 'x1', label: 'X1', placeholder: '0' }, { id: 'y1', label: 'Y1', placeholder: '0' }, { id: 'x2', label: 'X2', placeholder: '10' }, { id: 'y2', label: 'Y2', placeholder: '10' }],
    calculate: (inputs) => {
      const x1 = parseFloat(inputs.x1), y1 = parseFloat(inputs.y1), x2 = parseFloat(inputs.x2), y2 = parseFloat(inputs.y2)
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { results: [] }
      const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2
      return { results: [{ label: 'Midpoint', value: `(${midX}, ${midY})`, highlight: true }], formula: { formula: 'Midpoint = ((x1+x2)/2, (y1+y2)/2)', explanation: `Center point between (${x1},${y1}) and (${x2},${y2})` } }
    }
  },
  'trapezoid-area': {
    name: 'Trapezoid Area', description: 'Trapezoid calc', longDescription: 'Calculate area of a trapezoid.', category: 'math', icon: Target,
    inputs: [{ id: 'base1', label: 'Base 1', placeholder: '10' }, { id: 'base2', label: 'Base 2', placeholder: '6' }, { id: 'height', label: 'Height', placeholder: '4' }],
    calculate: (inputs) => {
      const b1 = parseFloat(inputs.base1), b2 = parseFloat(inputs.base2), h = parseFloat(inputs.height)
      if (isNaN(b1) || isNaN(b2) || isNaN(h)) return { results: [] }
      const area = ((b1 + b2) / 2) * h
      const perimeter = b1 + b2 + 2 * Math.sqrt(Math.pow((b1 - b2) / 2, 2) + h * h)
      return { results: [{ label: 'Area', value: area.toFixed(2), unit: 'units²', highlight: true }], formula: { formula: 'A = (b1 + b2) / 2 × h', explanation: `((${b1} + ${b2}) / 2) × ${h} = ${area.toFixed(2)}` } }
    }
  },
  'rhombus-area': {
    name: 'Rhombus Area', description: 'Rhombus calc', longDescription: 'Calculate area and perimeter of a rhombus.', category: 'math', icon: Target,
    inputs: [{ id: 'diagonal1', label: 'Diagonal 1', placeholder: '10' }, { id: 'diagonal2', label: 'Diagonal 2', placeholder: '8' }],
    calculate: (inputs) => {
      const d1 = parseFloat(inputs.diagonal1), d2 = parseFloat(inputs.diagonal2)
      if (isNaN(d1) || isNaN(d2)) return { results: [] }
      const area = (d1 * d2) / 2
      const side = Math.sqrt(Math.pow(d1/2, 2) + Math.pow(d2/2, 2))
      const perimeter = 4 * side
      return { results: [{ label: 'Area', value: area.toFixed(2), unit: 'units²', highlight: true }, { label: 'Side Length', value: side.toFixed(2), unit: 'units' }, { label: 'Perimeter', value: perimeter.toFixed(2), unit: 'units' }], formula: { formula: 'A = (d1 × d2) / 2', explanation: `(${d1} × ${d2}) / 2 = ${area.toFixed(2)}` } }
    }
  },
  // ==================== NEW DATE & TIME CALCULATORS (15) ====================
  'days-until-christmas': {
    name: 'Days Until Christmas', description: 'Holiday countdown', longDescription: 'Calculate days until next Christmas.', category: 'datetime', icon: Star,
    inputs: [],
    calculate: () => {
      const today = new Date()
      let christmas = new Date(today.getFullYear(), 11, 25)
      if (today > christmas) christmas = new Date(today.getFullYear() + 1, 11, 25)
      const diff = christmas.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Christmas', value: days, highlight: true }, { label: 'Date', value: christmas.toDateString() }], formula: { formula: 'Christmas - Today', explanation: `${days} days until December 25th` } }
    }
  },
  'days-until-newyear': {
    name: 'Days Until New Year', description: 'NYE countdown', longDescription: 'Calculate days until next New Year.', category: 'datetime', icon: Star,
    inputs: [],
    calculate: () => {
      const today = new Date()
      const newYear = new Date(today.getFullYear() + 1, 0, 1)
      const diff = newYear.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until New Year', value: days, highlight: true }, { label: 'Date', value: newYear.toDateString() }], formula: { formula: 'Jan 1 - Today', explanation: `${days} days until January 1st` } }
    }
  },
  'days-until-summer': {
    name: 'Days Until Summer', description: 'Summer countdown', longDescription: 'Calculate days until summer (June 21).', category: 'datetime', icon: Sun,
    inputs: [],
    calculate: () => {
      const today = new Date()
      let summer = new Date(today.getFullYear(), 5, 21)
      if (today > summer) summer = new Date(today.getFullYear() + 1, 5, 21)
      const diff = summer.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Summer', value: days, highlight: true }, { label: 'Date', value: summer.toDateString() }], formula: { formula: 'June 21 - Today', explanation: `${days} days until summer solstice` } }
    }
  },
  'days-until-halloween': {
    name: 'Days Until Halloween', description: 'Spooky countdown', longDescription: 'Calculate days until Halloween.', category: 'datetime', icon: Star,
    inputs: [],
    calculate: () => {
      const today = new Date()
      let halloween = new Date(today.getFullYear(), 9, 31)
      if (today > halloween) halloween = new Date(today.getFullYear() + 1, 9, 31)
      const diff = halloween.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Halloween', value: days, highlight: true }, { label: 'Date', value: halloween.toDateString() }], formula: { formula: 'Oct 31 - Today', explanation: `${days} days until Halloween` } }
    }
  },
  'days-until-easter': {
    name: 'Days Until Easter', description: 'Easter countdown', longDescription: 'Calculate days until next Easter Sunday.', category: 'datetime', icon: Star,
    inputs: [],
    calculate: () => {
      const today = new Date()
      const year = today.getFullYear()
      const easter = (() => {
        const a = year % 19, b = Math.floor(year / 100), c = year % 100
        const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
        const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
        const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
        const m = Math.floor((a + 11 * h + 22 * l) / 451)
        const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
        const day = ((h + l - 7 * m + 114) % 31) + 1
        return new Date(year, month, day)
      })()
      let e = easter
      if (today > easter) {
        const nextYear = year + 1
        const a = nextYear % 19, b = Math.floor(nextYear / 100), c = nextYear % 100
        const d = Math.floor(b / 4), e2 = b % 4, f = Math.floor((b + 8) / 25)
        const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
        const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e2 + 2 * i - h - k) % 7
        const m = Math.floor((a + 11 * h + 22 * l) / 451)
        const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
        const day = ((h + l - 7 * m + 114) % 31) + 1
        e = new Date(nextYear, month, day)
      }
      const diff = e.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Easter', value: days, highlight: true }, { label: 'Date', value: e.toDateString() }], formula: { formula: 'Computus algorithm', explanation: 'Easter date calculation using Gaussian algorithm' } }
    }
  },
  'time-until-date': {
    name: 'Time Until Date', description: 'Detailed countdown', longDescription: 'Calculate exact time remaining until a specific date.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'target', label: 'Target Date & Time', placeholder: '', type: 'datetime-local' }],
    calculate: (inputs) => {
      if (!inputs.target) return { results: [] }
      const target = new Date(inputs.target), now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff < 0) return { results: [{ label: 'Date Passed', value: 'Target is in the past', highlight: true }] }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const secs = Math.floor((diff % (1000 * 60)) / 1000)
      return { results: [{ label: 'Full Countdown', value: `${days}d ${hours}h ${mins}m ${secs}s`, highlight: true }, { label: 'Total Hours', value: Math.floor(diff / (1000 * 60 * 60)) }, { label: 'Total Minutes', value: Math.floor(diff / (1000 * 60)) }], formula: { formula: 'Target - Now', explanation: 'Precise time remaining' } }
    }
  },
  'date-from-days': {
    name: 'Date from Days', description: 'Add days to date', longDescription: 'Calculate what date it will be after X days from now.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'days', label: 'Days from Now', placeholder: '100' }],
    calculate: (inputs) => {
      const days = parseFloat(inputs.days)
      if (isNaN(days)) return { results: [] }
      const today = new Date(), target = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
      return { results: [{ label: 'Future Date', value: target.toDateString(), highlight: true }, { label: 'From Today', value: today.toDateString() }], formula: { formula: 'Today + Days', explanation: `${days} days from now` } }
    }
  },
  'date-ago': {
    name: 'Date Ago Calculator', description: 'Past date', longDescription: 'Calculate what date it was X days ago.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'days', label: 'Days Ago', placeholder: '100' }],
    calculate: (inputs) => {
      const days = parseFloat(inputs.days)
      if (isNaN(days)) return { results: [] }
      const today = new Date(), target = new Date(today.getTime() - days * 24 * 60 * 60 * 1000)
      return { results: [{ label: 'Past Date', value: target.toDateString(), highlight: true }, { label: 'From Today', value: today.toDateString() }], formula: { formula: 'Today - Days', explanation: `${days} days ago` } }
    }
  },
  'weeks-until': {
    name: 'Weeks Until Date', description: 'Weeks countdown', longDescription: 'Calculate weeks remaining until a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'target', label: 'Target Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.target) return { results: [] }
      const target = new Date(inputs.target), today = new Date()
      today.setHours(0,0,0,0); target.setHours(0,0,0,0)
      const diff = target.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      const weeks = days / 7
      const fullWeeks = Math.floor(weeks)
      const remainingDays = days % 7
      return { results: [{ label: 'Total Weeks', value: weeks.toFixed(1), highlight: true }, { label: 'Full Weeks', value: fullWeeks }, { label: 'Remaining Days', value: remainingDays }], formula: { formula: 'Days / 7', explanation: `${days} days = ${weeks.toFixed(1)} weeks` } }
    }
  },
  'months-until': {
    name: 'Months Until Date', description: 'Months countdown', longDescription: 'Calculate approximate months until a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'target', label: 'Target Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.target) return { results: [] }
      const target = new Date(inputs.target), today = new Date()
      let months = (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth())
      const remainingDays = target.getDate() - today.getDate()
      if (remainingDays < 0) months--
      return { results: [{ label: 'Total Months', value: months, highlight: true }, { label: 'Approximate Weeks', value: Math.round(months * 4.33) }], formula: { formula: 'Month difference', explanation: 'Approximate months until target date' } }
    }
  },
  'age-at-date': {
    name: 'Age at Future Date', description: 'Future age', longDescription: 'Calculate how old you will be at a future date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }, { id: 'futureDate', label: 'Future Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate || !inputs.futureDate) return { results: [] }
      const birth = new Date(inputs.birthdate), future = new Date(inputs.futureDate)
      let years = future.getFullYear() - birth.getFullYear()
      let months = future.getMonth() - birth.getMonth()
      if (months < 0) { years--; months += 12 }
      const days = future.getDate() - birth.getDate()
      return { results: [{ label: 'Age at That Date', value: `${years} years, ${months} months`, highlight: true }], formula: { formula: 'Future Date - Birth Date', explanation: `Your age on ${future.toDateString()}` } }
    }
  },
  'retirement-countdown': {
    name: 'Retirement Countdown', description: 'Days to retirement', longDescription: 'Calculate days until your retirement date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthDate', label: 'Birth Date', placeholder: '', type: 'date' }, { id: 'retireAge', label: 'Retirement Age', placeholder: '65' }],
    calculate: (inputs) => {
      if (!inputs.birthDate) return { results: [] }
      const birth = new Date(inputs.birthDate), retireAge = parseFloat(inputs.retireAge) || 65
      const retireDate = new Date(birth.getFullYear() + retireAge, birth.getMonth(), birth.getDate())
      const today = new Date()
      const diff = retireDate.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      const years = days / 365
      return { results: [{ label: 'Days Until Retirement', value: days.toLocaleString(), highlight: true }, { label: 'Years', value: years.toFixed(1) }, { label: 'Retirement Date', value: retireDate.toDateString() }], formula: { formula: 'Retirement Date - Today', explanation: `Retire at age ${retireAge}` } }
    }
  },
  'school-year': {
    name: 'School Year Calculator', description: 'Grade level', longDescription: 'Calculate school grade level based on birth year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthYear', label: 'Birth Year', placeholder: '2015' }, { id: 'schoolYear', label: 'School Year Starts', placeholder: '', type: 'select', options: [{ value: 'sep', label: 'September' }, { value: 'aug', label: 'August' }, { value: 'jan', label: 'January' }] }],
    calculate: (inputs) => {
      const birthYear = parseFloat(inputs.birthYear), currentYear = new Date().getFullYear()
      if (!birthYear) return { results: [] }
      const age = currentYear - birthYear
      let grade = age - 5
      if (inputs.schoolYear === 'jan') grade++
      const gradeName = grade < 0 ? 'Pre-K' : grade === 0 ? 'Kindergarten' : grade === 1 ? '1st Grade' : grade === 2 ? '2nd Grade' : grade === 3 ? '3rd Grade' : `${grade}th Grade`
      return { results: [{ label: 'Current Grade', value: gradeName, highlight: true }, { label: 'Age', value: age }], formula: { formula: 'Grade = Age - 5 (approx)', explanation: 'Varies by school district cutoff dates.' } }
    }
  },
  'time-duration': {
    name: 'Time Duration', description: 'Between times', longDescription: 'Calculate duration between two times on the same day.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '17:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      const startMins = sh * 60 + sm, endMins = eh * 60 + em
      let diff = endMins - startMins
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Total Minutes', value: diff }, { label: 'Decimal Hours', value: (diff / 60).toFixed(2) }], formula: { formula: 'End Time - Start Time', explanation: `${inputs.start} to ${inputs.end}` } }
    }
  },
  'day-of-year': {
    name: 'Day of Year', description: 'Day number', longDescription: 'Calculate what day number of the year a specific date is.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const start = new Date(date.getFullYear(), 0, 0)
      const diff = date.getTime() - start.getTime()
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
      const daysRemaining = (new Date(date.getFullYear(), 11, 31).getDay() === 0 ? 365 : 366) - dayOfYear
      return { results: [{ label: 'Day of Year', value: dayOfYear, highlight: true }, { label: 'Days Remaining', value: daysRemaining }], formula: { formula: 'Days since Jan 1', explanation: `${date.toDateString()} is day ${dayOfYear}` } }
    }
  },
  // ==================== NEW DATE & TIME CALCULATORS (15) ====================
  'iso-week-date': {
    name: 'ISO Week Date', description: 'ISO 8601 week date', longDescription: 'Convert a date to ISO 8601 week date format (YYYY-Www-D).', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() + 4 - (d.getDay() || 7))
      const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1))
      const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
      const dayOfWeek = date.getDay() || 7
      return { results: [{ label: 'ISO Week Date', value: `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}-${dayOfWeek}`, highlight: true }, { label: 'Year', value: d.getFullYear() }, { label: 'Week', value: weekNo }, { label: 'Day of Week', value: dayOfWeek }], formula: { formula: 'ISO 8601: YYYY-Www-D', explanation: 'Week 01 is the week with the first Thursday of the year.' } }
    }
  },
  'time-duration-sum': {
    name: 'Time Duration Sum', description: 'Sum time durations', longDescription: 'Add multiple time durations together to get total hours, minutes, and seconds.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'durations', label: 'Durations (HH:MM:SS, one per line)', placeholder: '01:30:00\n02:45:30\n00:15:45', type: 'textarea' }],
    calculate: (inputs) => {
      if (!inputs.durations) return { results: [] }
      const lines = inputs.durations.split('\n').filter(l => l.trim())
      let totalSeconds = 0
      lines.forEach(line => {
        const parts = line.trim().split(':').map(Number)
        if (parts.length >= 2) {
          const h = parts[0] || 0, m = parts[1] || 0, s = parts[2] || 0
          totalSeconds += h * 3600 + m * 60 + s
        }
      })
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      return { results: [{ label: 'Total Duration', value: `${hours}h ${minutes}m ${seconds}s`, highlight: true }, { label: 'Total Hours', value: (totalSeconds / 3600).toFixed(2) }, { label: 'Total Minutes', value: (totalSeconds / 60).toFixed(2) }, { label: 'Entries Added', value: lines.length }], formula: { formula: 'Sum all durations', explanation: `Added ${lines.length} time entries.` } }
    }
  },
  'average-time': {
    name: 'Average Time Calculator', description: 'Mean time', longDescription: 'Calculate the arithmetic mean of multiple times of day.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'times', label: 'Times (HH:MM, one per line)', placeholder: '08:30\n12:45\n18:15', type: 'textarea' }],
    calculate: (inputs) => {
      if (!inputs.times) return { results: [] }
      const lines = inputs.times.split('\n').filter(l => l.trim())
      let totalMinutes = 0, count = 0
      lines.forEach(line => {
        const parts = line.trim().split(':').map(Number)
        if (parts.length >= 2) {
          totalMinutes += parts[0] * 60 + parts[1]
          count++
        }
      })
      if (count === 0) return { results: [] }
      const avgMinutes = totalMinutes / count
      const avgH = Math.floor(avgMinutes / 60) % 24
      const avgM = Math.round(avgMinutes % 60)
      return { results: [{ label: 'Average Time', value: `${avgH.toString().padStart(2, '0')}:${avgM.toString().padStart(2, '0')}`, highlight: true }, { label: 'Total Entries', value: count }], formula: { formula: 'Mean = Sum of times / Count', explanation: `Average of ${count} time entries.` } }
    }
  },
  'time-median': {
    name: 'Time Median Calculator', description: 'Median time', longDescription: 'Calculate the median of multiple times of day.', category: 'datetime', icon: BarChart3,
    inputs: [{ id: 'times', label: 'Times (HH:MM, one per line)', placeholder: '08:30\n12:45\n18:15', type: 'textarea' }],
    calculate: (inputs) => {
      if (!inputs.times) return { results: [] }
      const lines = inputs.times.split('\n').filter(l => l.trim())
      const minutesList: number[] = []
      lines.forEach(line => {
        const parts = line.trim().split(':').map(Number)
        if (parts.length >= 2) {
          minutesList.push(parts[0] * 60 + parts[1])
        }
      })
      if (minutesList.length === 0) return { results: [] }
      minutesList.sort((a, b) => a - b)
      const mid = Math.floor(minutesList.length / 2)
      const medianMinutes = minutesList.length % 2 !== 0 ? minutesList[mid] : Math.round((minutesList[mid - 1] + minutesList[mid]) / 2)
      const medH = Math.floor(medianMinutes / 60) % 24
      const medM = medianMinutes % 60
      return { results: [{ label: 'Median Time', value: `${medH.toString().padStart(2, '0')}:${medM.toString().padStart(2, '0')}`, highlight: true }, { label: 'Total Entries', value: minutesList.length }], formula: { formula: 'Middle value in sorted times', explanation: `Median of ${minutesList.length} time entries.` } }
    }
  },
  'solar-noon': {
    name: 'Solar Noon Calculator', description: 'Calculate solar noon', longDescription: 'Calculate the approximate time of solar noon for a given location and date.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'longitude', label: 'Longitude', placeholder: '-74.006' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lon = parseFloat(inputs.longitude) || 0
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      // Equation of time approximation
      const B = (360 / 365) * (dayOfYear - 81) * Math.PI / 180
      const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
      // Solar noon = 12:00 - longitude correction + equation of time
      const solarNoonMinutes = 12 * 60 - (lon * 4) + eot
      const h = Math.floor(solarNoonMinutes / 60)
      const m = Math.round(solarNoonMinutes % 60)
      return { results: [{ label: 'Solar Noon (Local)', value: `${h.toString().padStart(2, '0')}:${Math.abs(m).toString().padStart(2, '0')}`, highlight: true }, { label: 'Equation of Time', value: `${eot.toFixed(1)} minutes` }, { label: 'Longitude Correction', value: `${(lon * 4).toFixed(1)} minutes` }], formula: { formula: 'Solar Noon = 12:00 - (Lon × 4min) + EoT', explanation: 'Solar noon is when the sun is highest in the sky.' } }
    }
  },
  'astronomical-twilight': {
    name: 'Astronomical Twilight', description: 'Sun -18° horizon', longDescription: 'Calculate astronomical twilight times when the sun is 18° below the horizon.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.latitude) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      // For astronomical twilight (-18°)
      const hourAngle = Math.acos((Math.sin(-18 * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180)) / (Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180))) * 180 / Math.PI
      const sunrise = 12 - hourAngle / 15
      const sunset = 12 + hourAngle / 15
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Morning Twilight Start', value: formatTime(sunrise), highlight: true }, { label: 'Evening Twilight End', value: formatTime(sunset), highlight: true }, { label: 'Twilight Duration', value: `${((12 - sunrise) * 2).toFixed(1)} hours` }], formula: { formula: 'Sun angle -18° below horizon', explanation: 'Astronomical twilight: sky is dark, stars clearly visible.' } }
    }
  },
  'nautical-twilight': {
    name: 'Nautical Twilight', description: 'Sun -12° horizon', longDescription: 'Calculate nautical twilight times when the sun is 12° below the horizon.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.latitude) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos((Math.sin(-12 * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180)) / (Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180))) * 180 / Math.PI
      const sunrise = 12 - hourAngle / 15
      const sunset = 12 + hourAngle / 15
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Morning Nautical Dawn', value: formatTime(sunrise), highlight: true }, { label: 'Evening Nautical Dusk', value: formatTime(sunset), highlight: true }, { label: 'Duration', value: `${((12 - sunrise) * 2).toFixed(1)} hours` }], formula: { formula: 'Sun angle -12° below horizon', explanation: 'Nautical twilight: horizon visible at sea.' } }
    }
  },
  'civil-twilight': {
    name: 'Civil Twilight Calculator', description: 'Sun -6° horizon', longDescription: 'Calculate civil twilight times when the sun is 6° below the horizon.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.latitude) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos((Math.sin(-6 * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180)) / (Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180))) * 180 / Math.PI
      const sunrise = 12 - hourAngle / 15
      const sunset = 12 + hourAngle / 15
      const formatTime = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Civil Dawn', value: formatTime(sunrise), highlight: true }, { label: 'Civil Dusk', value: formatTime(sunset), highlight: true }, { label: 'Duration', value: `${((12 - sunrise) * 2).toFixed(1)} hours` }], formula: { formula: 'Sun angle -6° below horizon', explanation: 'Civil twilight: outdoor activities possible without artificial light.' } }
    }
  },
  'sun-angle': {
    name: 'Sun Angle Calculator', description: 'Solar elevation', longDescription: 'Calculate the angle of the sun above the horizon for a given time and location.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'time', label: 'Time (HH:MM)', placeholder: '12:00' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const [h, m] = (inputs.time || '12:00').split(':').map(Number)
      const lat = parseFloat(inputs.latitude) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = ((h + m / 60) - 12) * 15 * Math.PI / 180
      const latRad = lat * Math.PI / 180
      const decRad = declination * Math.PI / 180
      const elevation = Math.asin(Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngle)) * 180 / Math.PI
      const azimuth = Math.atan2(Math.sin(hourAngle), Math.cos(hourAngle) * Math.sin(latRad) - Math.tan(decRad) * Math.cos(latRad)) * 180 / Math.PI + 180
      return { results: [{ label: 'Sun Elevation', value: `${elevation.toFixed(1)}°`, highlight: true }, { label: 'Sun Azimuth', value: `${azimuth.toFixed(1)}°` }, { label: 'Declination', value: `${declination.toFixed(2)}°` }], formula: { formula: 'Elevation = arcsin(sin(lat)sin(dec) + cos(lat)cos(dec)cos(HA))', explanation: 'Elevation is angle above horizon, azimuth is compass direction.' } }
    }
  },
  'shadow-length': {
    name: 'Shadow Length Calculator', description: 'Calculate shadow', longDescription: 'Calculate the length of a shadow based on sun angle and object height.', category: 'datetime', icon: Ruler,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'time', label: 'Time (HH:MM)', placeholder: '12:00' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }, { id: 'height', label: 'Object Height (m)', placeholder: '1.8' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const [h, m] = (inputs.time || '12:00').split(':').map(Number)
      const lat = parseFloat(inputs.latitude) || 40.7
      const objHeight = parseFloat(inputs.height) || 1.8
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = ((h + m / 60) - 12) * 15 * Math.PI / 180
      const latRad = lat * Math.PI / 180
      const decRad = declination * Math.PI / 180
      const elevation = Math.asin(Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngle)) * 180 / Math.PI
      if (elevation <= 0) return { results: [{ label: 'Status', value: 'Sun is below horizon', highlight: true }] }
      const shadowLength = objHeight / Math.tan(elevation * Math.PI / 180)
      return { results: [{ label: 'Shadow Length', value: `${shadowLength.toFixed(2)} m`, highlight: true }, { label: 'Sun Elevation', value: `${elevation.toFixed(1)}°` }, { label: 'Object Height', value: `${objHeight} m` }], formula: { formula: 'Shadow = Height / tan(Elevation)', explanation: 'Higher sun angle means shorter shadows.' } }
    }
  },
  'day-length-change': {
    name: 'Day Length Change Rate', description: 'Day length delta', longDescription: 'Calculate how quickly days are getting longer or shorter at your location.', category: 'datetime', icon: TrendingUp,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'latitude', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lat = parseFloat(inputs.latitude) || 40.7
      const calcDayLength = (doy: number) => {
        const declination = -23.45 * Math.cos((360 / 365) * (doy + 10) * Math.PI / 180)
        const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
        return (2 * hourAngle / 15)
      }
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const todayLength = calcDayLength(dayOfYear)
      const tomorrowLength = calcDayLength(dayOfYear + 1)
      const change = tomorrowLength - todayLength
      const changeMins = change * 60
      const direction = change > 0 ? 'getting longer' : 'getting shorter'
      return { results: [{ label: 'Day Length Change', value: `${changeMins > 0 ? '+' : ''}${changeMins.toFixed(1)} min/day`, highlight: true }, { label: 'Current Day Length', value: `${todayLength.toFixed(2)} hours` }, { label: 'Direction', value: direction }], formula: { formula: 'Change = Tomorrow\'s length - Today\'s length', explanation: change > 0 ? 'Days are getting longer' : 'Days are getting shorter' } }
    }
  },
  'sidereal-time': {
    name: 'Sidereal Time Calculator', description: 'Star time', longDescription: 'Calculate the local sidereal time for astronomical observations.', category: 'datetime', icon: Star,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'time', label: 'Time (HH:MM)', placeholder: '00:00' }, { id: 'longitude', label: 'Longitude', placeholder: '0' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const [h, m] = (inputs.time || '00:00').split(':').map(Number)
      const lon = parseFloat(inputs.longitude) || 0
      const J2000 = new Date('2000-01-01T12:00:00Z')
      const days = (date.getTime() - J2000.getTime()) / 86400000
      const T = days / 36525
      let GMST = 280.46061837 + 360.98564736629 * days + 0.000387933 * T * T
      GMST = GMST % 360
      if (GMST < 0) GMST += 360
      let LST = (GMST + lon) % 360
      if (LST < 0) LST += 360
      const lstHours = LST / 15
      const formatLST = `${Math.floor(lstHours).toString().padStart(2, '0')}:${Math.floor((lstHours % 1) * 60).toString().padStart(2, '0')}:${Math.round(((lstHours * 60) % 1) * 60).toString().padStart(2, '0')}`
      return { results: [{ label: 'Local Sidereal Time', value: formatLST, highlight: true }, { label: 'GMST', value: `${(GMST / 15).toFixed(2)} hours` }, { label: 'Degrees', value: `${LST.toFixed(2)}°` }], formula: { formula: 'LST = GMST + Longitude', explanation: 'Sidereal time is based on Earth\'s rotation relative to stars.' } }
    }
  },
  'solar-declination': {
    name: 'Solar Declination', description: 'Sun declination', longDescription: 'Calculate the declination angle of the sun for any day of the year.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      // More accurate formula
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      // Calculate when declination is 0 (equinox)
      const springEquinox = 81
      const fallEquinox = 266
      const toEquinox = dayOfYear < springEquinox ? springEquinox - dayOfYear : (dayOfYear < fallEquinox ? fallEquinox - dayOfYear : 365 - dayOfYear + springEquinox)
      const season = dayOfYear >= 355 || dayOfYear < 81 ? 'Winter' : dayOfYear < 173 ? 'Spring' : dayOfYear < 266 ? 'Summer' : 'Autumn'
      return { results: [{ label: 'Solar Declination', value: `${declination.toFixed(2)}°`, highlight: true }, { label: 'Season (N. Hemisphere)', value: season }, { label: 'Day of Year', value: dayOfYear }], formula: { formula: 'δ = -23.45° × cos(360°/365 × (day + 10))', explanation: 'Declination ranges from -23.45° to +23.45° throughout the year.' } }
    }
  },
  'equation-of-time': {
    name: 'Equation of Time', description: 'Solar vs clock time', longDescription: 'Calculate the difference between solar time and clock time.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const B = (360 / 365) * (dayOfYear - 81) * Math.PI / 180
      const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
      const solarNoon = 12 - eot / 60
      const sign = eot >= 0 ? '+' : ''
      return { results: [{ label: 'Equation of Time', value: `${sign}${eot.toFixed(1)} minutes`, highlight: true }, { label: 'Solar Noon (Local)', value: `${Math.floor(solarNoon)}:${Math.round((solarNoon % 1) * 60).toString().padStart(2, '0')}` }, { label: 'Mean Noon', value: '12:00' }], formula: { formula: 'EoT = 9.87sin(2B) - 7.53cos(B) - 1.5sin(B)', explanation: 'Solar time runs up to 16 minutes ahead or behind clock time.' } }
    }
  },
  'day-fraction': {
    name: 'Day Fraction Calculator', description: 'Decimal day', longDescription: 'Convert a date and time to a fractional day of the year.', category: 'datetime', icon: Hash,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'time', label: 'Time (HH:MM:SS)', placeholder: '12:30:00' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const timeParts = (inputs.time || '00:00:00').split(':').map(Number)
      const h = timeParts[0] || 0, m = timeParts[1] || 0, s = timeParts[2] || 0
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const timeFraction = (h * 3600 + m * 60 + s) / 86400
      const fractionalDay = dayOfYear + timeFraction
      const year = date.getFullYear()
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      const totalDays = isLeap ? 366 : 365
      const yearFraction = fractionalDay / totalDays
      return { results: [{ label: 'Fractional Day', value: fractionalDay.toFixed(6), highlight: true }, { label: 'Year Fraction', value: yearFraction.toFixed(6) }, { label: 'Day of Year', value: dayOfYear }, { label: 'Time Fraction', value: timeFraction.toFixed(6) }], formula: { formula: 'Day Fraction = DOY + (Time in seconds / 86400)', explanation: 'Precise representation of date/time within the year.' } }
    }
  },
  // ==================== NEW TOOLS CALCULATORS (15) ====================
  'pressure-converter': {
    name: 'Pressure Converter', description: 'Convert pressure', longDescription: 'Convert between different pressure units.', category: 'tools', icon: Wind,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'Atmosphere' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }, { value: 'kpa', label: 'kPa' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'Atmosphere' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }, { value: 'kpa', label: 'kPa' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKpa: Record<string, number> = { atm: 101.325, bar: 100, psi: 6.89476, kpa: 1 }
      const kpa = value * toKpa[inputs.from || 'atm'], result = kpa / toKpa[inputs.to || 'atm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Pressure conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'energy-converter': {
    name: 'Energy Converter', description: 'Convert energy', longDescription: 'Convert between different energy units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kcal', label: 'Kilocalories' }, { value: 'kwh', label: 'kWh' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kcal', label: 'Kilocalories' }, { value: 'kwh', label: 'kWh' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toJ: Record<string, number> = { j: 1, cal: 4.184, kcal: 4184, kwh: 3600000 }
      const j = value * toJ[inputs.from || 'j'], result = j / toJ[inputs.to || 'j']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Energy conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'frequency-converter': {
    name: 'Frequency Converter', description: 'Convert frequency', longDescription: 'Convert between different frequency units.', category: 'tools', icon: Timer,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toHz: Record<string, number> = { hz: 1, khz: 1000, mhz: 1000000, ghz: 1000000000 }
      const hz = value * toHz[inputs.from || 'hz'], result = hz / toHz[inputs.to || 'hz']
      return { results: [{ label: 'Result', value: result.toLocaleString(), unit: inputs.to, highlight: true }], formula: { formula: 'Frequency conversion', explanation: `${value} ${inputs.from} = ${result.toLocaleString()} ${inputs.to}` } }
    }
  },
  'angle-converter': {
    name: 'Angle Converter', description: 'Degrees/radians', longDescription: 'Convert between degrees and radians.', category: 'tools', icon: Target,
    inputs: [{ id: 'value', label: 'Value', placeholder: '180' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'deg', label: 'Degrees' }, { value: 'rad', label: 'Radians' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'deg', label: 'Degrees' }, { value: 'rad', label: 'Radians' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      let result: number
      if (inputs.from === 'deg' && inputs.to === 'rad') result = value * Math.PI / 180
      else if (inputs.from === 'rad' && inputs.to === 'deg') result = value * 180 / Math.PI
      else result = value
      return { results: [{ label: 'Result', value: result.toFixed(6), unit: inputs.to, highlight: true }], formula: { formula: inputs.from === 'deg' ? 'rad = deg × π/180' : 'deg = rad × 180/π', explanation: `${value} ${inputs.from} = ${result.toFixed(6)} ${inputs.to}` } }
    }
  },
  'cooking-converter': {
    name: 'Cooking Converter', description: 'Kitchen measurements', longDescription: 'Convert between common cooking measurements.', category: 'tools', icon: Droplets,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'cup', label: 'Cup' }, { value: 'tbsp', label: 'Tablespoon' }, { value: 'tsp', label: 'Teaspoon' }, { value: 'ml', label: 'Milliliters' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'cup', label: 'Cup' }, { value: 'tbsp', label: 'Tablespoon' }, { value: 'tsp', label: 'Teaspoon' }, { value: 'ml', label: 'Milliliters' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toMl: Record<string, number> = { cup: 240, tbsp: 15, tsp: 5, ml: 1 }
      const ml = value * toMl[inputs.from || 'cup'], result = ml / toMl[inputs.to || 'ml']
      return { results: [{ label: 'Result', value: result.toFixed(2), unit: inputs.to, highlight: true }], formula: { formula: 'Cooking conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(2)} ${inputs.to}` } }
    }
  },
  'shoe-size-converter': {
    name: 'Shoe Size Converter', description: 'International sizes', longDescription: 'Convert between international shoe sizes.', category: 'tools', icon: Ruler,
    inputs: [{ id: 'value', label: 'Size', placeholder: '10' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'eu', label: 'EU' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }, { value: 'eu', label: 'EU' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value), gender = inputs.gender || 'male'
      if (isNaN(value)) return { results: [] }
      const toUS: Record<string, (v: number) => number> = {
        us: (v) => v,
        uk: (v) => v + 1,
        eu: (v) => gender === 'male' ? (v + 33) * 0.75 : (v + 31) * 0.75
      }
      const fromUS: Record<string, (v: number) => number> = {
        us: (v) => v,
        uk: (v) => v - 1,
        eu: (v) => gender === 'male' ? v / 0.75 - 33 : v / 0.75 - 31
      }
      const us = toUS[inputs.from || 'us'](value), result = fromUS[inputs.to || 'us'](us)
      return { results: [{ label: 'Converted Size', value: Math.round(result * 2) / 2, unit: inputs.to, highlight: true }], formula: { formula: 'International conversion', explanation: 'Approximate conversion between sizing systems.' } }
    }
  },
  'ring-size-converter': {
    name: 'Ring Size Converter', description: 'Ring sizes', longDescription: 'Convert between ring size systems.', category: 'tools', icon: Target,
    inputs: [{ id: 'value', label: 'Size', placeholder: '7' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US/Canada' }, { value: 'uk', label: 'UK/Australia' }, { value: 'eu', label: 'EU' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US/Canada' }, { value: 'uk', label: 'UK/Australia' }, { value: 'eu', label: 'EU' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toUS: Record<string, (v: number) => number> = { us: (v) => v, uk: (v) => (v - 1) / 2.5, eu: (v) => (v - 41) / 0.8 }
      const fromUS: Record<string, (v: number) => number> = { us: (v) => v, uk: (v) => v * 2.5 + 1, eu: (v) => v * 0.8 + 41 }
      const us = toUS[inputs.from || 'us'](value), result = fromUS[inputs.to || 'us'](us)
      return { results: [{ label: 'Ring Size', value: Math.round(result), unit: inputs.to, highlight: true }], formula: { formula: 'Ring size conversion', explanation: 'Sizes may vary slightly between manufacturers.' } }
    }
  },
  'clothing-size-converter': {
    name: 'Clothing Size Converter', description: 'International clothing', longDescription: 'Convert between international clothing sizes.', category: 'tools', icon: Ruler,
    inputs: [{ id: 'value', label: 'Size', placeholder: 'M' }, { id: 'type', label: 'Type', placeholder: '', type: 'select', options: [{ value: 'top', label: 'Top/Shirt' }, { value: 'pants', label: 'Pants' }, { value: 'dress', label: 'Dress' }] }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US' }, { value: 'eu', label: 'EU' }, { value: 'uk', label: 'UK' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'us', label: 'US' }, { value: 'eu', label: 'EU' }, { value: 'uk', label: 'UK' }] }],
    calculate: (inputs) => {
      const sizes: Record<string, Record<string, string[]>> = {
        us: { top: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], pants: ['0', '2', '4', '6', '8', '10'], dress: ['0', '2', '4', '6', '8', '10'] },
        eu: { top: ['32', '34', '36', '38', '40', '42'], pants: ['32', '34', '36', '38', '40', '42'], dress: ['32', '34', '36', '38', '40', '42'] },
        uk: { top: ['6', '8', '10', '12', '14', '16'], pants: ['4', '6', '8', '10', '12', '14'], dress: ['4', '6', '8', '10', '12', '14'] }
      }
      const fromSizes = sizes[inputs.from || 'us'][inputs.type || 'top']
      const toSizes = sizes[inputs.to || 'eu'][inputs.type || 'top']
      const index = fromSizes.indexOf(inputs.value.toUpperCase())
      if (index === -1) return { results: [{ label: 'Size not found', value: 'Check size format' }] }
      const result = toSizes[index]
      return { results: [{ label: 'Converted Size', value: result, highlight: true }], formula: { formula: 'Size chart conversion', explanation: 'Sizes vary by brand. This is a general guide.' } }
    }
  },
  'color-rgb-hex': {
    name: 'RGB to HEX', description: 'Color conversion', longDescription: 'Convert RGB color values to HEX format.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'r', label: 'Red (0-255)', placeholder: '255' }, { id: 'g', label: 'Green (0-255)', placeholder: '0' }, { id: 'b', label: 'Blue (0-255)', placeholder: '128' }],
    calculate: (inputs) => {
      const r = Math.min(255, Math.max(0, parseInt(inputs.r) || 0)), g = Math.min(255, Math.max(0, parseInt(inputs.g) || 0)), b = Math.min(255, Math.max(0, parseInt(inputs.b) || 0))
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
      return { results: [{ label: 'HEX', value: hex, highlight: true }, { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` }], formula: { formula: 'HEX = R G B in hexadecimal', explanation: 'Each color channel converted to 2-digit hex.' } }
    }
  },
  'hex-to-rgb': {
    name: 'HEX to RGB', description: 'Color conversion', longDescription: 'Convert HEX color to RGB values.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'hex', label: 'HEX Color', placeholder: '#FF0080' }],
    calculate: (inputs) => {
      let hex = inputs.hex.replace('#', '')
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
      if (hex.length !== 6) return { results: [{ label: 'Error', value: 'Invalid HEX format' }] }
      const r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16)
      return { results: [{ label: 'RGB', value: `${r}, ${g}, ${b}`, highlight: true }, { label: 'CSS', value: `rgb(${r}, ${g}, ${b})` }], formula: { formula: 'Parse each 2-digit hex pair', explanation: `${hex} = R:${r} G:${g} B:${b}` } }
    }
  },
  'aspect-ratio': {
    name: 'Aspect Ratio Calculator', description: 'Screen ratios', longDescription: 'Calculate aspect ratio and dimensions.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Width', placeholder: '1920' }, { id: 'height', label: 'Height', placeholder: '1080' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const d = gcd(w, h)
      const ratioW = w / d, ratioH = h / d
      const ratio = w / h
      return { results: [{ label: 'Aspect Ratio', value: `${ratioW}:${ratioH}`, highlight: true }, { label: 'Decimal', value: ratio.toFixed(4) }], formula: { formula: 'Width:Height simplified', explanation: `${w} × ${h} = ${ratioW}:${ratioH}` } }
    }
  },
  'ppi-calculator': {
    name: 'PPI Calculator', description: 'Pixel density', longDescription: 'Calculate pixels per inch (PPI) of a display.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Width (pixels)', placeholder: '1920' }, { id: 'height', label: 'Height (pixels)', placeholder: '1080' }, { id: 'diagonal', label: 'Diagonal (inches)', placeholder: '24' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width), h = parseFloat(inputs.height), d = parseFloat(inputs.diagonal)
      if (!w || !h || !d) return { results: [] }
      const diagonalPx = Math.sqrt(w * w + h * h)
      const ppi = diagonalPx / d
      return { results: [{ label: 'PPI', value: ppi.toFixed(2), highlight: true }, { label: 'Diagonal Pixels', value: Math.round(diagonalPx) }], formula: { formula: 'PPI = √(W² + H²) / Diagonal', explanation: `${w}×${h} on ${d}" display = ${ppi.toFixed(2)} PPI` } }
    }
  },
  'file-size-converter': {
    name: 'File Size Converter', description: 'Digital storage', longDescription: 'Convert between file size units.', category: 'tools', icon: HardDriveIcon,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1024' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }, { value: 'tb', label: 'TB' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }, { value: 'tb', label: 'TB' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toBytes: Record<string, number> = { b: 1, kb: 1024, mb: 1048576, gb: 1073741824, tb: 1099511627776 }
      const bytes = value * toBytes[inputs.from || 'b'], result = bytes / toBytes[inputs.to || 'b']
      return { results: [{ label: 'Result', value: result.toLocaleString(undefined, {maximumFractionDigits: 2}), unit: inputs.to, highlight: true }], formula: { formula: 'Binary (1024 base)', explanation: `${value} ${inputs.from} = ${result.toLocaleString()} ${inputs.to}` } }
    }
  },
  // ==================== NEW FINANCIAL CALCULATORS (15) ====================
  'npv-advanced': {
    name: 'NPV Advanced', description: 'Net Present Value with cash flows', longDescription: 'Calculate Net Present Value with multiple cash flows over time. NPV helps evaluate investment profitability by discounting future cash flows to present value.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'initialInvestment', label: 'Initial Investment ($)', placeholder: '10000' },
      { id: 'discountRate', label: 'Discount Rate (%)', placeholder: '10' },
      { id: 'cashFlows', label: 'Annual Cash Flows (comma-sep)', placeholder: '3000,4000,5000,4000,3000' }
    ],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initialInvestment), rate = parseFloat(inputs.discountRate) / 100
      const cashFlows = inputs.cashFlows.split(',').map((cf: string) => parseFloat(cf.trim())).filter((cf: number) => !isNaN(cf))
      if (!initial || !rate || cashFlows.length === 0) return { results: [] }
      let npv = -initial
      cashFlows.forEach((cf: number, i: number) => { npv += cf / Math.pow(1 + rate, i + 1) })
      const totalCashFlows = cashFlows.reduce((a: number, b: number) => a + b, 0)
      const profitabilityIndex = (npv + initial) / initial
      return {
        results: [
          { label: 'Net Present Value', value: `$${npv.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true, icon: TrendingUp },
          { label: 'Total Cash Flows', value: `$${totalCashFlows.toLocaleString()}` },
          { label: 'Profitability Index', value: profitabilityIndex.toFixed(3) },
          { label: 'Investment Decision', value: npv > 0 ? 'Accept - Positive NPV' : 'Reject - Negative NPV' }
        ],
        pieData: [{ label: 'Initial Investment', value: initial, color: '#ef4444' }, { label: 'PV of Cash Flows', value: npv + initial, color: '#22c55e' }],
        formula: { formula: 'NPV = -I₀ + Σ(CFₜ / (1+r)^t)', explanation: `Discounting ${cashFlows.length} cash flows at ${inputs.discountRate}% rate` },
        infoCards: [{ title: 'NPV Interpretation', content: npv > 0 ? 'Positive NPV indicates the investment adds value and should be considered.' : 'Negative NPV suggests the investment would destroy value.', variant: npv > 0 ? 'success' : 'warning' }]
      }
    }
  },
  'irr-estimate': {
    name: 'IRR Estimate', description: 'Internal Rate of Return', longDescription: 'Estimate the Internal Rate of Return (IRR) for an investment. IRR is the discount rate that makes NPV equal to zero.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'initialInvestment', label: 'Initial Investment ($)', placeholder: '10000' },
      { id: 'cashFlows', label: 'Annual Cash Flows (comma-sep)', placeholder: '3000,4000,5000,4000,3000' }
    ],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initialInvestment)
      const cashFlows = inputs.cashFlows.split(',').map((cf: string) => parseFloat(cf.trim())).filter((cf: number) => !isNaN(cf))
      if (!initial || cashFlows.length === 0) return { results: [] }
      // Newton-Raphson method for IRR approximation
      let irr = 0.1
      for (let iter = 0; iter < 100; iter++) {
        let npv = -initial
        let derivNpv = 0
        cashFlows.forEach((cf: number, i: number) => {
          npv += cf / Math.pow(1 + irr, i + 1)
          derivNpv -= (i + 1) * cf / Math.pow(1 + irr, i + 2)
        })
        if (Math.abs(npv) < 0.001) break
        irr = irr - npv / derivNpv
      }
      irr = Math.max(-0.99, Math.min(irr, 10))
      const irrPercent = irr * 100
      return {
        results: [
          { label: 'Internal Rate of Return', value: `${irrPercent.toFixed(2)}%`, highlight: true, icon: TrendingUp },
          { label: 'IRR as Decimal', value: irr.toFixed(4) },
          { label: 'Investment Period', value: `${cashFlows.length} years` }
        ],
        comparisons: [{ label: 'IRR', value: irrPercent, max: 50, color: irrPercent > 10 ? '#22c55e' : irrPercent > 5 ? '#f59e0b' : '#ef4444' }],
        formula: { formula: 'IRR: NPV = 0 → Σ(CFₜ/(1+IRR)^t) = I₀', explanation: 'The rate where the present value of cash inflows equals initial investment' }
      }
    }
  },
  'time-value-money': {
    name: 'Time Value of Money', description: 'Present/Future value', longDescription: 'Calculate the time value of money - how the value of money changes over time based on interest rates and compounding.', category: 'financial', icon: Clock,
    inputs: [
      { id: 'amount', label: 'Amount ($)', placeholder: '10000' },
      { id: 'rate', label: 'Interest Rate (%)', placeholder: '8' },
      { id: 'periods', label: 'Number of Periods', placeholder: '10' },
      { id: 'calcType', label: 'Calculate', placeholder: '', type: 'select', options: [{ value: 'fv', label: 'Future Value' }, { value: 'pv', label: 'Present Value' }] }
    ],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), rate = parseFloat(inputs.rate) / 100, periods = parseFloat(inputs.periods), calcType = inputs.calcType || 'fv'
      if (!amount || !rate || !periods) return { results: [] }
      let result: number
      if (calcType === 'fv') {
        result = amount * Math.pow(1 + rate, periods)
        return {
          results: [
            { label: 'Future Value', value: `$${result.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true, icon: TrendingUp },
            { label: 'Present Value', value: `$${amount.toLocaleString()}` },
            { label: 'Interest Earned', value: `$${(result - amount).toLocaleString(undefined, {maximumFractionDigits: 2})}` },
            { label: 'Growth Factor', value: `${(result / amount).toFixed(2)}x` }
          ],
          pieData: [{ label: 'Principal', value: amount, color: '#3b82f6' }, { label: 'Interest', value: result - amount, color: '#22c55e' }],
          formula: { formula: 'FV = PV × (1 + r)^n', explanation: `$${amount} at ${inputs.rate}% for ${periods} periods = $${result.toFixed(2)}` }
        }
      } else {
        result = amount / Math.pow(1 + rate, periods)
        return {
          results: [
            { label: 'Present Value', value: `$${result.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true, icon: TrendingDown },
            { label: 'Future Value', value: `$${amount.toLocaleString()}` },
            { label: 'Discount Amount', value: `$${(amount - result).toLocaleString(undefined, {maximumFractionDigits: 2})}` }
          ],
          formula: { formula: 'PV = FV / (1 + r)^n', explanation: `$${amount} discounted at ${inputs.rate}% for ${periods} periods = $${result.toFixed(2)}` }
        }
      }
    }
  },
  'real-rate-return': {
    name: 'Real Rate of Return', description: 'Inflation-adjusted return', longDescription: 'Calculate the real rate of return by adjusting nominal returns for inflation. This shows your actual purchasing power gain.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'nominalRate', label: 'Nominal Rate (%)', placeholder: '8' },
      { id: 'inflationRate', label: 'Inflation Rate (%)', placeholder: '3' }
    ],
    calculate: (inputs) => {
      const nominal = parseFloat(inputs.nominalRate) / 100, inflation = parseFloat(inputs.inflationRate) / 100
      if (isNaN(nominal) || isNaN(inflation)) return { results: [] }
      // Fisher Equation: (1 + r) = (1 + n) / (1 + i)
      const realRate = ((1 + nominal) / (1 + inflation)) - 1
      const realRatePercent = realRate * 100
      const approxReal = nominal - inflation // Approximate formula
      return {
        results: [
          { label: 'Real Rate of Return', value: `${realRatePercent.toFixed(2)}%`, highlight: true, icon: TrendingUp },
          { label: 'Nominal Rate', value: `${inputs.nominalRate}%` },
          { label: 'Inflation Rate', value: `${inputs.inflationRate}%` },
          { label: 'Approximate Real Rate', value: `${(approxReal * 100).toFixed(2)}%` }
        ],
        comparisons: [{ label: 'Real Return', value: realRatePercent, max: 15, color: realRatePercent > 3 ? '#22c55e' : realRatePercent > 0 ? '#f59e0b' : '#ef4444' }],
        formula: { formula: 'Real Rate = (1 + Nominal)/(1 + Inflation) - 1', explanation: `Exact Fisher equation: ${inputs.nominalRate}% nominal - ${inputs.inflationRate}% inflation = ${realRatePercent.toFixed(2)}% real` }
      }
    }
  },
  'effective-annual-rate': {
    name: 'Effective Annual Rate', description: 'EAR calculator', longDescription: 'Calculate the Effective Annual Rate (EAR) to compare investments with different compounding frequencies. EAR shows the true annual interest rate.', category: 'financial', icon: Percent,
    inputs: [
      { id: 'nominalRate', label: 'Nominal Rate (%)', placeholder: '12' },
      { id: 'compounding', label: 'Compounding Frequency', placeholder: '', type: 'select', options: [{ value: '1', label: 'Annually' }, { value: '2', label: 'Semi-annually' }, { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' }] }
    ],
    calculate: (inputs) => {
      const nominal = parseFloat(inputs.nominalRate) / 100, n = parseFloat(inputs.compounding || '12')
      if (isNaN(nominal) || !n) return { results: [] }
      const ear = Math.pow(1 + nominal / n, n) - 1
      const earPercent = ear * 100
      const difference = earPercent - (nominal * 100)
      return {
        results: [
          { label: 'Effective Annual Rate', value: `${earPercent.toFixed(2)}%`, highlight: true, icon: Percent },
          { label: 'Nominal Rate', value: `${inputs.nominalRate}%` },
          { label: 'Additional Yield', value: `${difference.toFixed(2)}%`, description: 'Due to compounding' }
        ],
        pieData: [{ label: 'Nominal', value: nominal * 100, color: '#3b82f6' }, { label: 'Compounding Effect', value: difference, color: '#22c55e' }],
        formula: { formula: 'EAR = (1 + r/n)^n - 1', explanation: `${inputs.nominalRate}% compounded ${n === 1 ? 'annually' : n === 12 ? 'monthly' : n === 4 ? 'quarterly' : n === 2 ? 'semi-annually' : 'daily'} = ${earPercent.toFixed(2)}% EAR` }
      }
    }
  },
  'nominal-interest-rate': {
    name: 'Nominal Interest Rate', description: 'APR to nominal', longDescription: 'Calculate the nominal interest rate from the effective annual rate and compounding frequency. This is useful for comparing loan offers.', category: 'financial', icon: Percent,
    inputs: [
      { id: 'ear', label: 'Effective Annual Rate (%)', placeholder: '12.68' },
      { id: 'compounding', label: 'Compounding Periods per Year', placeholder: '', type: 'select', options: [{ value: '12', label: 'Monthly (12)' }, { value: '4', label: 'Quarterly (4)' }, { value: '2', label: 'Semi-annually (2)' }, { value: '365', label: 'Daily (365)' }] }
    ],
    calculate: (inputs) => {
      const ear = parseFloat(inputs.ear) / 100, n = parseFloat(inputs.compounding || '12')
      if (isNaN(ear) || !n) return { results: [] }
      const nominal = n * (Math.pow(ear + 1, 1 / n) - 1)
      const nominalPercent = nominal * 100
      return {
        results: [
          { label: 'Nominal Rate (APR)', value: `${nominalPercent.toFixed(2)}%`, highlight: true, icon: Percent },
          { label: 'Effective Annual Rate', value: `${inputs.ear}%` },
          { label: 'Periodic Rate', value: `${(nominalPercent / n).toFixed(4)}%` }
        ],
        formula: { formula: 'Nominal = n × ((1 + EAR)^(1/n) - 1)', explanation: `EAR of ${inputs.ear}% with ${n} periods = ${nominalPercent.toFixed(2)}% nominal APR` }
      }
    }
  },
  'loan-to-value': {
    name: 'Loan-to-Value Ratio', description: 'LTV calculator', longDescription: 'Calculate the Loan-to-Value (LTV) ratio, a key metric used by lenders to assess mortgage risk. Lower LTV typically means better loan terms.', category: 'financial', icon: Home,
    inputs: [
      { id: 'loanAmount', label: 'Loan Amount ($)', placeholder: '280000' },
      { id: 'appraisedValue', label: 'Appraised Value ($)', placeholder: '350000' }
    ],
    calculate: (inputs) => {
      const loan = parseFloat(inputs.loanAmount), value = parseFloat(inputs.appraisedValue)
      if (!loan || !value) return { results: [] }
      const ltv = (loan / value) * 100
      const equity = value - loan
      const equityPercent = 100 - ltv
      let status: string, color: string, pmi: string
      if (ltv <= 80) { status = 'Excellent - Best rates'; color = '#22c55e'; pmi = 'PMI not required' }
      else if (ltv <= 90) { status = 'Good - Standard rates'; color = '#84cc16'; pmi = 'PMI likely required' }
      else if (ltv <= 95) { status = 'Fair - Higher rates'; color = '#f59e0b'; pmi = 'PMI required' }
      else { status = 'High Risk - May not qualify'; color = '#ef4444'; pmi = 'May not qualify for conventional loan' }
      return {
        results: [
          { label: 'LTV Ratio', value: `${ltv.toFixed(2)}%`, highlight: true, icon: Home },
          { label: 'Equity', value: `$${equity.toLocaleString()}` },
          { label: 'Equity Percentage', value: `${equityPercent.toFixed(2)}%` },
          { label: 'Status', value: status }
        ],
        comparisons: [{ label: 'LTV Ratio', value: ltv, max: 100, color }],
        pieData: [{ label: 'Loan', value: loan, color: '#ef4444' }, { label: 'Equity', value: equity, color: '#22c55e' }],
        formula: { formula: 'LTV = (Loan Amount ÷ Property Value) × 100', explanation: `$${loan.toLocaleString()} / $${value.toLocaleString()} = ${ltv.toFixed(2)}%` },
        infoCards: [{ title: 'PMI Requirement', content: pmi, variant: ltv > 80 ? 'warning' : 'success' }]
      }
    }
  },
  'debt-service-coverage': {
    name: 'Debt Service Coverage', description: 'DSCR calculator', longDescription: 'Calculate the Debt Service Coverage Ratio (DSCR), used by lenders to evaluate a property\'s ability to generate enough income to cover debt payments.', category: 'financial', icon: BarChart3,
    inputs: [
      { id: 'noi', label: 'Net Operating Income ($)', placeholder: '120000' },
      { id: 'debtService', label: 'Annual Debt Service ($)', placeholder: '96000' }
    ],
    calculate: (inputs) => {
      const noi = parseFloat(inputs.noi), debt = parseFloat(inputs.debtService)
      if (!noi || !debt) return { results: [] }
      const dscr = noi / debt
      const surplus = noi - debt
      let status: string, color: string
      if (dscr >= 1.5) { status = 'Excellent - Strong coverage'; color = '#22c55e' }
      else if (dscr >= 1.25) { status = 'Good - Meets most lender requirements'; color = '#84cc16' }
      else if (dscr >= 1.0) { status = 'Fair - Barely covers debt'; color = '#f59e0b' }
      else { status = 'Poor - Insufficient income'; color = '#ef4444' }
      return {
        results: [
          { label: 'DSCR', value: dscr.toFixed(2), highlight: true, icon: BarChart3 },
          { label: 'Net Operating Income', value: `$${noi.toLocaleString()}` },
          { label: 'Annual Debt Service', value: `$${debt.toLocaleString()}` },
          { label: 'Surplus/Deficit', value: `$${surplus.toLocaleString()}`, description: surplus >= 0 ? 'Cash after debt service' : 'Shortfall' },
          { label: 'Status', value: status }
        ],
        comparisons: [{ label: 'DSCR', value: dscr, max: 3, color }],
        formula: { formula: 'DSCR = Net Operating Income ÷ Debt Service', explanation: `$${noi.toLocaleString()} / $${debt.toLocaleString()} = ${dscr.toFixed(2)}` },
        infoCards: [{ title: 'Lender Requirements', content: 'Most lenders require DSCR of 1.25 or higher for commercial loans. Below 1.0 indicates the property cannot cover its debt.', variant: dscr >= 1.25 ? 'success' : 'warning' }]
      }
    }
  },
  'price-earnings-ratio': {
    name: 'Price-to-Earnings Ratio', description: 'P/E calculator', longDescription: 'Calculate the Price-to-Earnings (P/E) ratio to evaluate if a stock is overvalued or undervalued compared to its earnings.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'stockPrice', label: 'Stock Price ($)', placeholder: '150' },
      { id: 'eps', label: 'Earnings Per Share ($)', placeholder: '5' }
    ],
    calculate: (inputs) => {
      const price = parseFloat(inputs.stockPrice), eps = parseFloat(inputs.eps)
      if (!price || !eps) return { results: [] }
      const pe = price / eps
      const earningsYield = (eps / price) * 100
      let valuation: string, color: string
      if (pe < 15) { valuation = 'Potentially Undervalued'; color = '#22c55e' }
      else if (pe < 25) { valuation = 'Fair Value Range'; color = '#84cc16' }
      else if (pe < 40) { valuation = 'Potentially Overvalued'; color = '#f59e0b' }
      else { valuation = 'High Valuation / Growth Stock'; color = '#3b82f6' }
      return {
        results: [
          { label: 'P/E Ratio', value: pe.toFixed(2), highlight: true, icon: TrendingUp },
          { label: 'Earnings Yield', value: `${earningsYield.toFixed(2)}%` },
          { label: 'Valuation Assessment', value: valuation }
        ],
        comparisons: [{ label: 'P/E Ratio', value: pe, max: 60, color }],
        formula: { formula: 'P/E = Stock Price ÷ Earnings Per Share', explanation: `$${price} / $${eps} = ${pe.toFixed(2)}` },
        infoCards: [{ title: 'P/E Interpretation', content: 'Compare P/E to industry average and historical values. High P/E may indicate growth expectations or overvaluation.', variant: 'info' }]
      }
    }
  },
  'dividend-yield': {
    name: 'Dividend Yield', description: 'Stock dividend calc', longDescription: 'Calculate the dividend yield to understand the income return from dividend-paying stocks. This helps compare income-generating investments.', category: 'financial', icon: Coins,
    inputs: [
      { id: 'annualDividend', label: 'Annual Dividend per Share ($)', placeholder: '3.60' },
      { id: 'stockPrice', label: 'Current Stock Price ($)', placeholder: '120' }
    ],
    calculate: (inputs) => {
      const dividend = parseFloat(inputs.annualDividend), price = parseFloat(inputs.stockPrice)
      if (!dividend || !price) return { results: [] }
      const yieldPercent = (dividend / price) * 100
      const quarterlyDividend = dividend / 4
      const monthlyDividend = dividend / 12
      let assessment: string, color: string
      if (yieldPercent >= 5) { assessment = 'High Yield - Check sustainability'; color = '#22c55e' }
      else if (yieldPercent >= 3) { assessment = 'Above Average Yield'; color = '#84cc16' }
      else if (yieldPercent >= 1.5) { assessment = 'Moderate Yield'; color = '#f59e0b' }
      else { assessment = 'Low Yield / Growth Focus'; color = '#3b82f6' }
      return {
        results: [
          { label: 'Dividend Yield', value: `${yieldPercent.toFixed(2)}%`, highlight: true, icon: Coins },
          { label: 'Quarterly Dividend', value: `$${quarterlyDividend.toFixed(2)}` },
          { label: 'Monthly Equivalent', value: `$${monthlyDividend.toFixed(2)}` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'Yield', value: yieldPercent, max: 10, color }],
        formula: { formula: 'Dividend Yield = Annual Dividend ÷ Stock Price × 100', explanation: `$${dividend} / $${price} = ${yieldPercent.toFixed(2)}%` }
      }
    }
  },
  'capitalization-rate': {
    name: 'Capitalization Rate', description: 'Cap rate for real estate', longDescription: 'Calculate the Capitalization Rate (Cap Rate) for real estate investments. Cap Rate helps compare properties and estimate potential returns.', category: 'financial', icon: Home,
    inputs: [
      { id: 'noi', label: 'Net Operating Income ($)', placeholder: '50000' },
      { id: 'propertyValue', label: 'Property Value ($)', placeholder: '800000' }
    ],
    calculate: (inputs) => {
      const noi = parseFloat(inputs.noi), value = parseFloat(inputs.propertyValue)
      if (!noi || !value) return { results: [] }
      const capRate = (noi / value) * 100
      const monthlyNoi = noi / 12
      let assessment: string, color: string
      if (capRate >= 8) { assessment = 'High Cap Rate - Better Returns'; color = '#22c55e' }
      else if (capRate >= 6) { assessment = 'Moderate Cap Rate - Typical Market'; color = '#84cc16' }
      else if (capRate >= 4) { assessment = 'Lower Cap Rate - Premium Property'; color = '#f59e0b' }
      else { assessment = 'Very Low Cap Rate - Appreciation Focus'; color = '#3b82f6' }
      return {
        results: [
          { label: 'Cap Rate', value: `${capRate.toFixed(2)}%`, highlight: true, icon: Home },
          { label: 'Monthly NOI', value: `$${monthlyNoi.toLocaleString()}` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'Cap Rate', value: capRate, max: 15, color }],
        formula: { formula: 'Cap Rate = Net Operating Income ÷ Property Value × 100', explanation: `$${noi.toLocaleString()} / $${value.toLocaleString()} = ${capRate.toFixed(2)}%` }
      }
    }
  },
  'cash-on-cash': {
    name: 'Cash on Cash Return', description: 'Real estate ROI', longDescription: 'Calculate Cash on Cash Return to measure the return on actual cash invested in real estate. This shows the yield on your invested capital.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'annualCashFlow', label: 'Annual Pre-Tax Cash Flow ($)', placeholder: '12000' },
      { id: 'cashInvested', label: 'Total Cash Invested ($)', placeholder: '100000' }
    ],
    calculate: (inputs) => {
      const cashFlow = parseFloat(inputs.annualCashFlow), invested = parseFloat(inputs.cashInvested)
      if (!cashFlow || !invested) return { results: [] }
      const cocReturn = (cashFlow / invested) * 100
      const monthlyCashFlow = cashFlow / 12
      const paybackYears = invested / cashFlow
      let assessment: string, color: string
      if (cocReturn >= 12) { assessment = 'Excellent Return'; color = '#22c55e' }
      else if (cocReturn >= 8) { assessment = 'Good Return'; color = '#84cc16' }
      else if (cocReturn >= 5) { assessment = 'Moderate Return'; color = '#f59e0b' }
      else { assessment = 'Below Average - Review Investment'; color = '#ef4444' }
      return {
        results: [
          { label: 'Cash on Cash Return', value: `${cocReturn.toFixed(2)}%`, highlight: true, icon: TrendingUp },
          { label: 'Monthly Cash Flow', value: `$${monthlyCashFlow.toLocaleString()}` },
          { label: 'Payback Period', value: `${paybackYears.toFixed(1)} years` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'CoC Return', value: cocReturn, max: 25, color }],
        formula: { formula: 'CoC = Annual Cash Flow ÷ Cash Invested × 100', explanation: `$${cashFlow.toLocaleString()} / $${invested.toLocaleString()} = ${cocReturn.toFixed(2)}%` }
      }
    }
  },
  'operating-expense-ratio': {
    name: 'Operating Expense Ratio', description: 'OER for properties', longDescription: 'Calculate the Operating Expense Ratio (OER) to measure a property\'s operating efficiency. Lower OER indicates better property management.', category: 'financial', icon: Receipt,
    inputs: [
      { id: 'operatingExpenses', label: 'Operating Expenses ($)', placeholder: '30000' },
      { id: 'grossIncome', label: 'Gross Operating Income ($)', placeholder: '75000' }
    ],
    calculate: (inputs) => {
      const expenses = parseFloat(inputs.operatingExpenses), income = parseFloat(inputs.grossIncome)
      if (!expenses || !income) return { results: [] }
      const oer = (expenses / income) * 100
      const noi = income - expenses
      const expensePerDollar = expenses / income
      let assessment: string, color: string
      if (oer <= 35) { assessment = 'Excellent - Very Efficient'; color = '#22c55e' }
      else if (oer <= 45) { assessment = 'Good - Above Average'; color = '#84cc16' }
      else if (oer <= 55) { assessment = 'Average - Industry Norm'; color = '#f59e0b' }
      else { assessment = 'High - Review Expenses'; color = '#ef4444' }
      return {
        results: [
          { label: 'Operating Expense Ratio', value: `${oer.toFixed(2)}%`, highlight: true, icon: Receipt },
          { label: 'Net Operating Income', value: `$${noi.toLocaleString()}` },
          { label: 'Cost per $1 Income', value: `$${expensePerDollar.toFixed(2)}` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'OER', value: oer, max: 100, color }],
        pieData: [{ label: 'Operating Expenses', value: expenses, color: '#ef4444' }, { label: 'Net Income', value: noi, color: '#22c55e' }],
        formula: { formula: 'OER = Operating Expenses ÷ Gross Income × 100', explanation: `$${expenses.toLocaleString()} / $${income.toLocaleString()} = ${oer.toFixed(2)}%` }
      }
    }
  },
  'gross-rent-multiplier': {
    name: 'Gross Rent Multiplier', description: 'GRM for investment', longDescription: 'Calculate the Gross Rent Multiplier (GRM) to quickly screen rental properties. Lower GRM may indicate better investment potential.', category: 'financial', icon: Home,
    inputs: [
      { id: 'propertyPrice', label: 'Property Price ($)', placeholder: '500000' },
      { id: 'grossRent', label: 'Annual Gross Rent ($)', placeholder: '48000' }
    ],
    calculate: (inputs) => {
      const price = parseFloat(inputs.propertyPrice), rent = parseFloat(inputs.grossRent)
      if (!price || !rent) return { results: [] }
      const grm = price / rent
      const monthlyRent = rent / 12
      const yearsToPayback = grm
      let assessment: string, color: string
      if (grm <= 8) { assessment = 'Excellent - Great Deal Potential'; color = '#22c55e' }
      else if (grm <= 12) { assessment = 'Good - Reasonable Value'; color = '#84cc16' }
      else if (grm <= 15) { assessment = 'Fair - Market Average'; color = '#f59e0b' }
      else { assessment = 'High - May Be Overpriced'; color = '#ef4444' }
      return {
        results: [
          { label: 'Gross Rent Multiplier', value: grm.toFixed(2), highlight: true, icon: Home },
          { label: 'Monthly Gross Rent', value: `$${monthlyRent.toLocaleString()}` },
          { label: 'Years to Gross Payback', value: `${yearsToPayback.toFixed(1)} years` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'GRM', value: grm, max: 25, color }],
        formula: { formula: 'GRM = Property Price ÷ Annual Gross Rent', explanation: `$${price.toLocaleString()} / $${rent.toLocaleString()} = ${grm.toFixed(2)}` }
      }
    }
  },
  'debt-ratio': {
    name: 'Debt Ratio', description: 'Total debt ratio', longDescription: 'Calculate the Debt Ratio to measure a company\'s or individual\'s financial leverage. It shows what proportion of assets is financed by debt.', category: 'financial', icon: CreditCard,
    inputs: [
      { id: 'totalDebt', label: 'Total Debt ($)', placeholder: '150000' },
      { id: 'totalAssets', label: 'Total Assets ($)', placeholder: '400000' }
    ],
    calculate: (inputs) => {
      const debt = parseFloat(inputs.totalDebt), assets = parseFloat(inputs.totalAssets)
      if (!debt || !assets) return { results: [] }
      const debtRatio = (debt / assets) * 100
      const equity = assets - debt
      const equityRatio = (equity / assets) * 100
      let assessment: string, color: string
      if (debtRatio <= 40) { assessment = 'Conservative - Low Risk'; color = '#22c55e' }
      else if (debtRatio <= 60) { assessment = 'Moderate - Manageable'; color = '#84cc16' }
      else if (debtRatio <= 80) { assessment = 'High Leverage - Monitor'; color = '#f59e0b' }
      else { assessment = 'Very High - Financial Stress Risk'; color = '#ef4444' }
      return {
        results: [
          { label: 'Debt Ratio', value: `${debtRatio.toFixed(2)}%`, highlight: true, icon: CreditCard },
          { label: 'Equity', value: `$${equity.toLocaleString()}` },
          { label: 'Equity Ratio', value: `${equityRatio.toFixed(2)}%` },
          { label: 'Assessment', value: assessment }
        ],
        comparisons: [{ label: 'Debt Ratio', value: debtRatio, max: 100, color }],
        pieData: [{ label: 'Debt', value: debt, color: '#ef4444' }, { label: 'Equity', value: equity, color: '#22c55e' }],
        formula: { formula: 'Debt Ratio = Total Debt ÷ Total Assets × 100', explanation: `$${debt.toLocaleString()} / $${assets.toLocaleString()} = ${debtRatio.toFixed(2)}%` }
      }
    }
  },
  // ==================== NEW TOOLS CALCULATORS (15) ====================
  'bandwidth-calculator': {
    name: 'Bandwidth Calculator', description: 'Data transfer rates', longDescription: 'Convert between data transfer rate units and calculate actual throughput in MB/s.', category: 'tools', icon: Zap,
    inputs: [{ id: 'speed', label: 'Connection Speed', placeholder: '100' }, { id: 'unit', label: 'Unit', placeholder: '', type: 'select', options: [{ value: 'bps', label: 'bps' }, { value: 'kbps', label: 'Kbps' }, { value: 'mbps', label: 'Mbps' }, { value: 'gbps', label: 'Gbps' }] }],
    calculate: (inputs) => {
      const speed = parseFloat(inputs.speed)
      if (isNaN(speed)) return { results: [] }
      const toMbps: Record<string, number> = { bps: 0.000001, kbps: 0.001, mbps: 1, gbps: 1000 }
      const mbps = speed * toMbps[inputs.unit || 'mbps']
      const mbPerSec = mbps / 8
      const gbPerHour = mbPerSec * 3600 / 1024
      return {
        results: [
          { label: 'Throughput', value: mbPerSec.toFixed(2), unit: 'MB/s', highlight: true },
          { label: 'Per Hour', value: gbPerHour.toFixed(2), unit: 'GB' },
          { label: 'Per Day', value: (gbPerHour * 24).toFixed(2), unit: 'GB' }
        ],
        formula: { formula: 'MB/s = Mbps ÷ 8', explanation: `${speed} ${inputs.unit} = ${mbPerSec.toFixed(2)} MB/s actual download speed` }
      }
    }
  },
  'color-contrast': {
    name: 'Color Contrast Checker', description: 'WCAG accessibility', longDescription: 'Calculate color contrast ratio for WCAG accessibility compliance. Ensures text is readable for users with visual impairments.', category: 'tools', icon: Shield,
    inputs: [{ id: 'fgR', label: 'Foreground R', placeholder: '0' }, { id: 'fgG', label: 'Foreground G', placeholder: '0' }, { id: 'fgB', label: 'Foreground B', placeholder: '0' }, { id: 'bgR', label: 'Background R', placeholder: '255' }, { id: 'bgG', label: 'Background G', placeholder: '255' }, { id: 'bgB', label: 'Background B', placeholder: '255' }],
    calculate: (inputs) => {
      const fgR = parseInt(inputs.fgR) || 0, fgG = parseInt(inputs.fgG) || 0, fgB = parseInt(inputs.fgB) || 0
      const bgR = parseInt(inputs.bgR) || 255, bgG = parseInt(inputs.bgG) || 255, bgB = parseInt(inputs.bgB) || 255
      const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) })
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
      }
      const l1 = getLuminance(fgR, fgG, fgB), l2 = getLuminance(bgR, bgG, bgB)
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      const wcagAA = ratio >= 4.5 ? 'Pass' : 'Fail'
      const wcagAAA = ratio >= 7 ? 'Pass' : 'Fail'
      const wcagAALarge = ratio >= 3 ? 'Pass' : 'Fail'
      return {
        results: [
          { label: 'Contrast Ratio', value: ratio.toFixed(2) + ':1', highlight: true },
          { label: 'WCAG AA (Normal)', value: wcagAA, description: 'Requires 4.5:1' },
          { label: 'WCAG AA (Large)', value: wcagAALarge, description: 'Requires 3:1' },
          { label: 'WCAG AAA', value: wcagAAA, description: 'Requires 7:1' }
        ],
        formula: { formula: '(L1 + 0.05) / (L2 + 0.05)', explanation: `Luminance ratio between foreground and background colors` }
      }
    }
  },
  'color-temperature': {
    name: 'Color Temperature Converter', description: 'Kelvin to RGB', longDescription: 'Convert color temperature in Kelvin to RGB values. Useful for lighting design and photography white balance.', category: 'tools', icon: ThermometerIcon,
    inputs: [{ id: 'kelvin', label: 'Temperature (Kelvin)', placeholder: '6500' }],
    calculate: (inputs) => {
      let kelvin = parseFloat(inputs.kelvin)
      if (isNaN(kelvin) || kelvin < 1000 || kelvin > 40000) return { results: [{ label: 'Error', value: 'Enter 1000-40000 K' }] }
      kelvin = kelvin / 100
      let r: number, g: number, b: number
      if (kelvin <= 66) { r = 255 } else { r = kelvin - 60; r = 329.698727446 * Math.pow(r, -0.1332047592) }
      if (kelvin <= 66) { g = kelvin; g = 99.4708025861 * Math.log(g) - 161.1195681661 } else { g = kelvin - 60; g = 288.1221695283 * Math.pow(g, -0.0755148492) }
      if (kelvin >= 66) { b = 255 } else if (kelvin <= 19) { b = 0 } else { b = kelvin - 10; b = 138.5177312231 * Math.log(b) - 305.0447927307 }
      r = Math.max(0, Math.min(255, Math.round(r)))
      g = Math.max(0, Math.min(255, Math.round(g)))
      b = Math.max(0, Math.min(255, Math.round(b)))
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
      return {
        results: [
          { label: 'RGB', value: `${r}, ${g}, ${b}`, highlight: true },
          { label: 'HEX', value: hex },
          { label: 'CSS RGB', value: `rgb(${r}, ${g}, ${b})` }
        ],
        formula: { formula: 'Kelvin → RGB algorithm', explanation: `${inputs.kelvin}K approximates to RGB(${r}, ${g}, ${b})` }
      }
    }
  },
  'cmyk-to-rgb': {
    name: 'CMYK to RGB Converter', description: 'Print to screen', longDescription: 'Convert CMYK (print) color values to RGB (screen) format for web and digital design.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'c', label: 'Cyan (0-100)', placeholder: '0' }, { id: 'm', label: 'Magenta (0-100)', placeholder: '100' }, { id: 'y', label: 'Yellow (0-100)', placeholder: '100' }, { id: 'k', label: 'Black (0-100)', placeholder: '0' }],
    calculate: (inputs) => {
      const c = parseFloat(inputs.c) / 100 || 0, m = parseFloat(inputs.m) / 100 || 0, y = parseFloat(inputs.y) / 100 || 0, k = parseFloat(inputs.k) / 100 || 0
      const r = Math.round(255 * (1 - c) * (1 - k))
      const g = Math.round(255 * (1 - m) * (1 - k))
      const b = Math.round(255 * (1 - y) * (1 - k))
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
      return {
        results: [
          { label: 'RGB', value: `${r}, ${g}, ${b}`, highlight: true },
          { label: 'HEX', value: hex },
          { label: 'CSS', value: `rgb(${r}, ${g}, ${b})` }
        ],
        formula: { formula: 'R = 255 × (1-C) × (1-K)', explanation: `CMYK(${inputs.c}, ${inputs.m}, ${inputs.y}, ${inputs.k}) → RGB(${r}, ${g}, ${b})` }
      }
    }
  },
  'hsl-to-rgb': {
    name: 'HSL to RGB Converter', description: 'Color conversion', longDescription: 'Convert HSL (Hue, Saturation, Lightness) color values to RGB format for web development.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'h', label: 'Hue (0-360)', placeholder: '120' }, { id: 's', label: 'Saturation (0-100)', placeholder: '100' }, { id: 'l', label: 'Lightness (0-100)', placeholder: '50' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.h) / 360 || 0, s = parseFloat(inputs.s) / 100 || 0, l = parseFloat(inputs.l) / 100 || 0
      let r: number, g: number, b: number
      if (s === 0) { r = g = b = l }
      else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1; if (t > 1) t -= 1
          if (t < 1/6) return p + (q - p) * 6 * t
          if (t < 1/2) return q
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
      }
      const ri = Math.round(r * 255), gi = Math.round(g * 255), bi = Math.round(b * 255)
      const hex = '#' + [ri, gi, bi].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
      return {
        results: [
          { label: 'RGB', value: `${ri}, ${gi}, ${bi}`, highlight: true },
          { label: 'HEX', value: hex },
          { label: 'CSS', value: `rgb(${ri}, ${gi}, ${bi})` }
        ],
        formula: { formula: 'HSL to RGB conversion', explanation: `HSL(${inputs.h}°, ${inputs.s}%, ${inputs.l}%) → RGB(${ri}, ${gi}, ${bi})` }
      }
    }
  },
  'rgb-to-hsl': {
    name: 'RGB to HSL Converter', description: 'Color conversion', longDescription: 'Convert RGB color values to HSL (Hue, Saturation, Lightness) format for color manipulation.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'r', label: 'Red (0-255)', placeholder: '0' }, { id: 'g', label: 'Green (0-255)', placeholder: '255' }, { id: 'b', label: 'Blue (0-255)', placeholder: '0' }],
    calculate: (inputs) => {
      const r = (parseInt(inputs.r) || 0) / 255, g = (parseInt(inputs.g) || 0) / 255, b = (parseInt(inputs.b) || 0) / 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      let h: number = 0, s: number = 0, l = (max + min) / 2
      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
          case g: h = ((b - r) / d + 2) / 6; break
          case b: h = ((r - g) / d + 4) / 6; break
        }
      }
      return {
        results: [
          { label: 'HSL', value: `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`, highlight: true },
          { label: 'Hue', value: Math.round(h * 360), unit: '°' },
          { label: 'Saturation', value: Math.round(s * 100), unit: '%' },
          { label: 'Lightness', value: Math.round(l * 100), unit: '%' }
        ],
        formula: { formula: 'RGB to HSL conversion', explanation: `RGB(${inputs.r}, ${inputs.g}, ${inputs.b}) → HSL(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` }
      }
    }
  },
  'url-encoder': {
    name: 'URL Encoder/Decoder', description: 'URL encoding', longDescription: 'Encode or decode text for URL-safe transmission. Handles special characters in web URLs.', category: 'tools', icon: Globe,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Hello World!' }, { id: 'mode', label: 'Mode', placeholder: '', type: 'select', options: [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      let result: string
      try {
        result = inputs.mode === 'decode' ? decodeURIComponent(text) : encodeURIComponent(text)
      } catch { return { results: [{ label: 'Error', value: 'Invalid input for decoding' }] } }
      return {
        results: [
          { label: inputs.mode === 'decode' ? 'Decoded' : 'Encoded', value: result, highlight: true },
          { label: 'Original', value: text }
        ],
        formula: { formula: inputs.mode === 'decode' ? 'decodeURIComponent()' : 'encodeURIComponent()', explanation: 'Converts special characters to/from URL-safe format' }
      }
    }
  },
  'html-entity-encoder': {
    name: 'HTML Entity Encoder', description: 'HTML encoding', longDescription: 'Encode or decode HTML entities for safe HTML display. Prevents XSS attacks and display issues.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: '<script>alert("XSS")</script>' }, { id: 'mode', label: 'Mode', placeholder: '', type: 'select', options: [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      const encode = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
      const decode = (str: string) => str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
      const result = inputs.mode === 'decode' ? decode(text) : encode(text)
      return {
        results: [
          { label: inputs.mode === 'decode' ? 'Decoded' : 'Encoded', value: result, highlight: true },
          { label: 'Original', value: text }
        ],
        formula: { formula: 'HTML entity conversion', explanation: 'Converts special characters to/from HTML-safe entities' }
      }
    }
  },
  'md5-hash': {
    name: 'MD5 Hash Generator', description: 'Generate MD5 hash', longDescription: 'Generate MD5 hash from text input. Note: MD5 is not cryptographically secure for passwords.', category: 'tools', icon: Shield,
    inputs: [{ id: 'text', label: 'Text to Hash', placeholder: 'Hello World' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      // Simple MD5 implementation
      const md5cycle = (x: number[], k: number[]) => {
        let a = x[0], b = x[1], c = x[2], d = x[3]
        const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => { const n = a + (b & c | ~b & d) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
        const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => { const n = a + (b & d | c & ~d) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
        const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => { const n = a + (b ^ c ^ d) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
        const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => { const n = a + (c ^ (b | ~d)) + x + t; return ((n << s) | (n >>> (32 - s))) + b }
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330)
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983)
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162)
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329)
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302)
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848)
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501)
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734)
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556)
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640)
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189)
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651)
        a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055)
        a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799)
        a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649)
        a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551)
        x[0] = a + x[0]; x[1] = b + x[1]; x[2] = c + x[2]; x[3] = d + x[3]
      }
      const md5blk = (s: string) => { const md5blks = []; for (let i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24); return md5blks }
      const rhex = (n: number) => { let s = ''; for (let i = 0; i < 4; i++) s += ('0' + ((n >> (i * 8 + 4)) & 0x0F).toString(16) + (n >> (i * 8) & 0x0F).toString(16)); return s }
      const hex = (x: number[]) => x.map(rhex).join('')
      const md5_1 = (s: string) => { const n = s.length; const state = [1732584193, -271733879, -1732584194, 271733878]; let i; for (i = 64; i <= n; i += 64) { md5cycle(state, md5blk(s.substring(i - 64, i))) } s = s.substring(i - 64); const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3); tail[i >> 2] |= 0x80 << ((i % 4) << 3); if (i > 55) { md5cycle(state, tail); for (i = 0; i < 16; i++) tail[i] = 0 } tail[14] = n * 8; md5cycle(state, tail); return state }
      const hash = hex(md5_1(text))
      return {
        results: [
          { label: 'MD5 Hash', value: hash, highlight: true },
          { label: 'Length', value: 32, unit: 'characters' }
        ],
        formula: { formula: 'MD5(text)', explanation: `128-bit hash of "${text}"` },
        infoCards: [{ title: 'Security Warning', content: 'MD5 is not recommended for security purposes. Use SHA-256 or stronger for passwords.', variant: 'warning' }]
      }
    }
  },
  'sha256-hash': {
    name: 'SHA256 Hash Generator', description: 'Generate SHA256 hash', longDescription: 'Generate SHA256 cryptographic hash from text input. Secure for integrity verification and password hashing with salt.', category: 'tools', icon: Shield,
    inputs: [{ id: 'text', label: 'Text to Hash', placeholder: 'Hello World' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      if (!text) return { results: [] }
      // SHA-256 implementation
      const sha256 = (ascii: string) => {
        const rightRotate = (value: number, amount: number) => (value >>> amount) | (value << (32 - amount))
        const mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length'
        let result = ''
        const words = [] as number[]; const asciiBitLength = ascii[lengthProperty] * 8
        let hash = [], k = [], primeCounter = 0
        const isPrime = (n: number) => { const sqrt = Math.sqrt(n); for (let i = 2; i <= sqrt; i++) if (n % i === 0) return false; return true }
        const frac = (x: number) => (x - Math.floor(x)) * 4294967296
        for (let candidate = 2; primeCounter < 64; candidate++) if (isPrime(candidate)) { k[primeCounter] = frac(mathPow(candidate, 1 / 3)); hash[primeCounter++] = frac(mathPow(candidate, 1 / 2)) }
        ascii += '\x80'
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00'
        for (let i = 0; i < ascii[lengthProperty]; i++) { words[i >> 2] |= ascii.charCodeAt(i) << ((3 - i) % 4) * 8 }
        words[words[lengthProperty]] = asciiBitLength >>> 16
        words[words[lengthProperty] + 1] = asciiBitLength & 0xffff
        for (let j = 0; j < words[lengthProperty];) {
          const w = words.slice(j, j += 16)
          const oldHash = hash.slice(0, 8)
          for (let i = 0; i < 64; i++) {
            const w15 = w[i - 15], w2 = w[i - 2]
            const a = hash[0], e = hash[4]
            const temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & hash[5]) ^ (~e & hash[6])) + k[i] + (w[i] = w[i] < 16 ? w[i] : (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) | 0)
            const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]))
            hash = [(temp1 + temp2) | 0].concat(hash.slice(0, 7)) as number[]
            hash[4] = (hash[4] + temp1) | 0
          }
          for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0
        }
        for (let i = 0; i < 8; i++) for (let j = 3; j + 1; j--) result += ((hash[i] >> (j * 8)) & 255).toString(16).padStart(2, '0')
        return result
      }
      const hash = sha256(text)
      return {
        results: [
          { label: 'SHA256 Hash', value: hash, highlight: true },
          { label: 'Length', value: 64, unit: 'characters' }
        ],
        formula: { formula: 'SHA256(text)', explanation: `256-bit hash of "${text}"` }
      }
    }
  },
  'image-file-size': {
    name: 'Image File Size Estimator', description: 'Estimate file size', longDescription: 'Estimate image file size based on dimensions, color depth, and compression format.', category: 'tools', icon: HardDriveIcon,
    inputs: [{ id: 'width', label: 'Width (pixels)', placeholder: '1920' }, { id: 'height', label: 'Height (pixels)', placeholder: '1080' }, { id: 'format', label: 'Format', placeholder: '', type: 'select', options: [{ value: 'png', label: 'PNG (Lossless)' }, { value: 'jpg90', label: 'JPEG 90%' }, { value: 'jpg75', label: 'JPEG 75%' }, { value: 'webp', label: 'WebP' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width) || 0, h = parseFloat(inputs.height) || 0
      if (!w || !h) return { results: [] }
      const pixels = w * h
      const formatRatios: Record<string, number> = { png: 0.3, jpg90: 0.08, jpg75: 0.04, webp: 0.05 }
      const bitsPerPixel: Record<string, number> = { png: 24, jpg90: 24, jpg75: 24, webp: 24 }
      const estimatedBytes = pixels * bitsPerPixel[inputs.format || 'png'] / 8 * formatRatios[inputs.format || 'png']
      const estimatedKB = estimatedBytes / 1024
      const estimatedMB = estimatedKB / 1024
      const displaySize = estimatedMB >= 1 ? `${estimatedMB.toFixed(2)} MB` : `${estimatedKB.toFixed(2)} KB`
      return {
        results: [
          { label: 'Estimated Size', value: displaySize, highlight: true },
          { label: 'Total Pixels', value: pixels.toLocaleString() },
          { label: 'Resolution', value: `${w} × ${h}` }
        ],
        formula: { formula: 'Size ≈ Pixels × Bit Depth × Compression', explanation: `Based on average compression ratios for ${inputs.format?.toUpperCase()} format` },
        infoCards: [{ title: 'Note', content: 'Actual file size varies based on image content complexity.', variant: 'info' }]
      }
    }
  },
  'guid-generator': {
    name: 'GUID/UUID Generator', description: 'Generate UUIDs', longDescription: 'Generate random GUID/UUID v4 identifiers for unique identification in databases and systems.', category: 'tools', icon: Hash,
    inputs: [{ id: 'count', label: 'Number of UUIDs', placeholder: '5' }],
    calculate: (inputs) => {
      const count = Math.min(10, Math.max(1, parseInt(inputs.count) || 1))
      const uuids: string[] = []
      for (let i = 0; i < count; i++) {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        uuids.push(uuid)
      }
      return {
        results: uuids.map((uuid, i) => ({ label: `UUID ${i + 1}`, value: uuid, highlight: i === 0 })),
        formula: { formula: 'UUID v4 Random Generation', explanation: 'Generated using random hex digits with version 4 format' }
      }
    }
  },
  'pixel-calculator': {
    name: 'Pixel Calculator', description: 'Pixel dimensions', longDescription: 'Calculate total pixels, print dimensions, and scaling for different resolutions.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Width (pixels)', placeholder: '1920' }, { id: 'height', label: 'Height (pixels)', placeholder: '1080' }, { id: 'dpi', label: 'DPI', placeholder: '300' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width) || 0, h = parseFloat(inputs.height) || 0, dpi = parseFloat(inputs.dpi) || 72
      if (!w || !h) return { results: [] }
      const totalPixels = w * h
      const megapixels = totalPixels / 1000000
      const printWidthIn = w / dpi
      const printHeightIn = h / dpi
      const printWidthCm = printWidthIn * 2.54
      const printHeightCm = printHeightIn * 2.54
      return {
        results: [
          { label: 'Total Pixels', value: totalPixels.toLocaleString(), highlight: true },
          { label: 'Megapixels', value: megapixels.toFixed(2), unit: 'MP' },
          { label: 'Print Size', value: `${printWidthIn.toFixed(2)}" × ${printHeightIn.toFixed(2)}"`, description: `at ${dpi} DPI` },
          { label: 'Print Size (cm)', value: `${printWidthCm.toFixed(1)} × ${printHeightCm.toFixed(1)} cm` }
        ],
        formula: { formula: 'Print Size = Pixels ÷ DPI', explanation: `At ${dpi} DPI, ${w}×${h} pixels = ${printWidthIn.toFixed(2)}" × ${printHeightIn.toFixed(2)}"` }
      }
    }
  },
  'screen-resolution': {
    name: 'Screen Resolution Analyzer', description: 'Display categories', longDescription: 'Categorize and analyze screen resolution with common display standards and naming conventions.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Width (pixels)', placeholder: '1920' }, { id: 'height', label: 'Height (pixels)', placeholder: '1080' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width) || 0, h = parseFloat(inputs.height) || 0
      if (!w || !h) return { results: [] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const d = gcd(w, h)
      const ratioW = w / d, ratioH = h / d
      const ratioStr = `${ratioW}:${ratioH}`
      const totalPixels = w * h
      let category = 'Custom', standard = ''
      if (w === 1920 && h === 1080) { category = 'Full HD'; standard = '1080p' }
      else if (w === 2560 && h === 1440) { category = 'QHD'; standard = '1440p' }
      else if (w === 3840 && h === 2160) { category = '4K UHD'; standard = '2160p' }
      else if (w === 1280 && h === 720) { category = 'HD'; standard = '720p' }
      else if (w === 1366 && h === 768) { category = 'HD'; standard = 'Common Laptop' }
      else if (w === 2560 && h === 1080) { category = 'Ultrawide FHD'; standard = '21:9' }
      else if (w === 3440 && h === 1440) { category = 'Ultrawide QHD'; standard = '21:9' }
      else if (w === 7680 && h === 4320) { category = '8K UHD'; standard = '4320p' }
      const aspectRatio = ratioStr === '16:9' ? 'Standard Widescreen' : ratioStr === '16:10' ? 'Common Laptop' : ratioStr === '21:9' ? 'Ultrawide' : ratioStr === '4:3' ? 'Classic' : 'Custom'
      return {
        results: [
          { label: 'Category', value: category, highlight: true },
          { label: 'Standard', value: standard || 'N/A' },
          { label: 'Aspect Ratio', value: ratioStr, description: aspectRatio },
          { label: 'Total Pixels', value: totalPixels.toLocaleString() },
          { label: 'Megapixels', value: (totalPixels / 1000000).toFixed(2), unit: 'MP' }
        ],
        formula: { formula: 'Resolution Analysis', explanation: `${w}×${h} is classified as ${category}` }
      }
    }
  },
  'data-transfer-time': {
    name: 'Data Transfer Time Calculator', description: 'Transfer duration', longDescription: 'Calculate time required to transfer data at various connection speeds.', category: 'tools', icon: Timer,
    inputs: [{ id: 'size', label: 'Data Size', placeholder: '100' }, { id: 'unit', label: 'Size Unit', placeholder: '', type: 'select', options: [{ value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }, { value: 'tb', label: 'TB' }] }, { id: 'speed', label: 'Speed (Mbps)', placeholder: '100' }],
    calculate: (inputs) => {
      let size = parseFloat(inputs.size) || 0
      const speed = parseFloat(inputs.speed) || 0
      if (!size || !speed) return { results: [] }
      const toMB: Record<string, number> = { mb: 1, gb: 1024, tb: 1048576 }
      const sizeMB = size * toMB[inputs.unit || 'mb']
      const speedMBps = speed / 8
      const seconds = sizeMB / speedMBps
      const formatTime = (s: number) => {
        if (s < 60) return `${s.toFixed(0)} seconds`
        if (s < 3600) return `${Math.floor(s / 60)} min ${Math.floor(s % 60)} sec`
        if (s < 86400) return `${Math.floor(s / 3600)} hr ${Math.floor((s % 3600) / 60)} min`
        return `${(s / 86400).toFixed(1)} days`
      }
      return {
        results: [
          { label: 'Transfer Time', value: formatTime(seconds), highlight: true },
          { label: 'Total Seconds', value: Math.round(seconds), unit: 'sec' },
          { label: 'Actual Speed', value: speedMBps.toFixed(2), unit: 'MB/s' }
        ],
        formula: { formula: 'Time = Size ÷ Speed', explanation: `${size} ${inputs.unit} at ${speed} Mbps = ${formatTime(seconds)}` }
      }
    }
  }
}

// Category definitions - ALL IDs MUST BE UNIQUE AND MATCH allCalculatorConfigs keys
const categories = [
  { id: 'health', name: 'Fitness & Health', icon: Heart, color: 'from-rose-500 to-pink-500', calculators: [
    { id: 'bmi', name: 'BMI Calculator', description: 'Body Mass Index', icon: Activity },
    { id: 'body-fat', name: 'Body Fat Calculator', description: 'Estimate body fat %', icon: Percent },
    { id: 'calorie', name: 'Calorie Calculator', description: 'Daily calorie needs', icon: FlameIcon },
    { id: 'tdee', name: 'TDEE Calculator', description: 'Total energy expenditure', icon: FlameIcon },
    { id: 'bmr', name: 'BMR Calculator', description: 'Basal metabolic rate', icon: Zap },
    { id: 'ideal-weight', name: 'Ideal Weight Calculator', description: 'Ideal weight', icon: Weight },
    { id: 'protein', name: 'Protein Calculator', description: 'Daily protein needs', icon: Zap },
    { id: 'macro', name: 'Macro Calculator', description: 'Macronutrient split', icon: PieChartIcon },
    { id: 'pace', name: 'Pace Calculator', description: 'Running pace', icon: Timer },
    { id: 'one-rep-max', name: 'One Rep Max', description: 'Max lift weight', icon: Award },
    { id: 'pregnancy', name: 'Pregnancy Calculator', description: 'Due date', icon: Heart },
    { id: 'water-intake', name: 'Water Intake', description: 'Daily water needs', icon: Droplets },
    { id: 'sleep', name: 'Sleep Calculator', description: 'Sleep timing', icon: Moon },
    { id: 'age', name: 'Age Calculator', description: 'Calculate age', icon: Calendar },
    { id: 'heart-rate-zones', name: 'Heart Rate Zones', description: 'Target heart rate', icon: Heart },
    { id: 'body-surface-area', name: 'Body Surface Area', description: 'Calculate BSA', icon: Ruler },
    { id: 'lean-body-mass', name: 'Lean Body Mass', description: 'Calculate LBM', icon: Weight },
    { id: 'waist-to-hip', name: 'Waist-to-Hip Ratio', description: 'Health indicator', icon: Ruler },
    { id: 'due-date', name: 'Due Date Calculator', description: 'Pregnancy due date', icon: Calendar },
    { id: 'ovulation', name: 'Ovulation Calculator', description: 'Fertile days', icon: Calendar },
    { id: 'conception', name: 'Conception Calculator', description: 'Conception timing', icon: Calendar },
    { id: 'gfr', name: 'GFR Calculator', description: 'Kidney function', icon: Activity },
    { id: 'blood-alcohol', name: 'Blood Alcohol', description: 'BAC estimation', icon: AlertCircle },
    { id: 'calories-burned', name: 'Calories Burned', description: 'Exercise calories', icon: FlameIcon },
    { id: 'army-body-fat', name: 'Army Body Fat', description: 'Military standard', icon: Award },
    { id: 'rmr', name: 'RMR Calculator', description: 'Resting metabolic rate', icon: Zap },
    { id: 'ideal-body-weight', name: 'Ideal Body Weight', description: 'Medical ideal', icon: Weight },
    { id: 'adjusted-body-weight', name: 'Adjusted Body Weight', description: 'For obese patients', icon: Weight },
    { id: 'bmi-prime', name: 'BMI Prime', description: 'BMI relative to limit', icon: Activity },
    { id: 'ponderal-index', name: 'Ponderal Index', description: 'Alternative to BMI', icon: Activity },
    { id: 'ffmi', name: 'Fat-Free Mass Index', description: 'FFMI calculator', icon: Activity },
    // NEW HEALTH CALCULATORS
    { id: 'pregnancy-weight-gain', name: 'Pregnancy Weight Gain', description: 'Track pregnancy weight', icon: Heart },
    { id: 'conception-date', name: 'Conception Date', description: 'Estimate conception', icon: Calendar },
    { id: 'pregnancy-trimester', name: 'Pregnancy Trimester', description: 'Which trimester', icon: Calendar },
    { id: 'fetal-height', name: 'Fetal Height', description: 'Fetal length estimate', icon: Ruler },
    { id: 'breastfeeding-calorie', name: 'Breastfeeding Calorie', description: 'Calories while nursing', icon: Heart },
    { id: 'caffeine-intake', name: 'Caffeine Intake', description: 'Safe caffeine limits', icon: Zap },
    { id: 'alcohol-units', name: 'Alcohol Units', description: 'Standard drinks', icon: AlertCircle },
    { id: 'smoking-cost', name: 'Smoking Cost', description: 'Cost of smoking', icon: DollarSign },
    { id: 'smoking-life', name: 'Smoking Life Lost', description: 'Years lost to smoking', icon: Timer },
    { id: 'blood-pressure', name: 'Blood Pressure', description: 'BP category', icon: Heart },
    { id: 'cholesterol-ratio', name: 'Cholesterol Ratio', description: 'Heart risk', icon: Heart },
    { id: 'metabolic-age', name: 'Metabolic Age', description: 'Body age vs real age', icon: Activity },
    { id: 'vo2-max', name: 'VO2 Max', description: 'Cardio fitness', icon: Activity },
    { id: 'rockport-test', name: 'Rockport Test', description: 'Walk test fitness', icon: Activity },
    { id: 'cooper-test', name: 'Cooper Test', description: 'Run test fitness', icon: Timer },
    { id: 'running-pace', name: 'Running Pace', description: 'Min/km', icon: Timer },
    { id: 'cycling-speed', name: 'Cycling Speed', description: 'Speed calc', icon: Activity },
    { id: 'swim-pace', name: 'Swim Pace', description: 'Pool lap pace', icon: Activity },
    { id: 'steps-to-calories', name: 'Steps to Calories', description: 'Pedometer calc', icon: Activity },
    { id: 'floors-calories', name: 'Floors Calories', description: 'Stairs burned', icon: FlameIcon },
    { id: 'sleep-debt', name: 'Sleep Debt', description: 'Missed sleep', icon: Moon },
    { id: 'circadian-rhythm', name: 'Circadian Rhythm', description: 'Optimal sleep times', icon: Moon },
    { id: 'hydration-needs', name: 'Hydration Needs', description: 'Water by activity', icon: Droplets },
    { id: 'caffeine-half-life', name: 'Caffeine Half-Life', description: 'Caffeine decay', icon: Zap },
    { id: 'stress-score', name: 'Stress Score', description: 'Stress assessment', icon: Activity },
    { id: 'anxiety-screening', name: 'Anxiety Screening', description: 'GAD-7 based', icon: Brain },
    { id: 'depression-screening', name: 'Depression Screening', description: 'PHQ-2 based', icon: Brain },
    { id: 'frame-size', name: 'Frame Size', description: 'Wrist based body frame', icon: Ruler },
    { id: 'corpulence-index', name: 'Corpulence Index', description: 'Rohrer\'s index', icon: Activity },
    { id: 'bsa-dosing', name: 'BSA Dosing', description: 'Drug dosing by BSA', icon: Activity },
    // NEW HEALTH CALCULATORS (15)
    { id: 'resting-metabolic', name: 'Resting Metabolic Rate', description: 'RMR calculation', icon: Zap },
    { id: 'daily-steps', name: 'Daily Steps Goal', description: 'Steps target', icon: Activity },
    { id: 'bone-mass', name: 'Bone Mass Estimator', description: 'Estimate bone weight', icon: Activity },
    { id: 'sweat-rate', name: 'Sweat Rate Calculator', description: 'Hydration needs', icon: Droplets },
    { id: 'daily-fiber', name: 'Daily Fiber Needs', description: 'Fiber requirements', icon: Activity },
    { id: 'vitamin-d', name: 'Vitamin D Needs', description: 'Vitamin D intake', icon: Sun },
    { id: 'menstrual-cycle', name: 'Menstrual Cycle', description: 'Cycle tracking', icon: Calendar },
    { id: 'blood-type-child', name: 'Child Blood Type', description: 'Predict blood type', icon: Heart },
    { id: 'allergy-season', name: 'Allergy Season', description: 'Pollen calendar', icon: Wind },
    { id: 'sleep-apnea-risk', name: 'Sleep Apnea Risk', description: 'OSA screening', icon: Moon },
    { id: 'keto-ratio', name: 'Keto Macro Ratio', description: 'Ketogenic macros', icon: PieChartIcon },
    { id: 'intermittent-fasting', name: 'Intermittent Fasting', description: 'IF timing', icon: Timer },
    { id: 'workout-splits', name: 'Workout Split', description: 'Training schedule', icon: Activity },
    { id: 'max-heart-rate', name: 'Max Heart Rate', description: 'MHR estimation', icon: Heart },
    { id: 'muscle-gain-rate', name: 'Muscle Gain Rate', description: 'Expected gains', icon: Activity },
    // NEW HEALTH CALCULATORS (15 - Round 2)
    { id: 'hyponatremia-risk', name: 'Hyponatremia Risk', description: 'Low sodium risk', icon: Droplets },
    { id: 'basal-insulin', name: 'Basal Insulin Dose', description: 'Insulin calculation', icon: Activity },
    { id: 'carb-diabetic', name: 'Carb Calculator for Diabetics', description: 'Carb counting', icon: PieChartIcon },
    { id: 'blood-volume', name: 'Blood Volume Calculator', description: 'Total blood volume', icon: Heart },
    { id: 'cardiac-output', name: 'Cardiac Output Calculator', description: 'CO calculation', icon: Heart },
    { id: 'mean-arterial-pressure', name: 'Mean Arterial Pressure', description: 'MAP calculation', icon: Activity },
    { id: 'pulse-pressure', name: 'Pulse Pressure Calculator', description: 'PP analysis', icon: Activity },
    { id: 'respiratory-rate-zones', name: 'Respiratory Rate Zones', description: 'Breathing analysis', icon: Wind },
    { id: 'tidal-volume', name: 'Tidal Volume Calculator', description: 'Breathing volume', icon: Wind },
    { id: 'lean-body-mass-water', name: 'Lean Body Mass Water', description: 'LBM hydration', icon: Droplets },
    { id: 'body-water-percentage', name: 'Body Water Percentage', description: 'TBW calculation', icon: Droplets },
    { id: 'metabolic-equivalent', name: 'Metabolic Equivalent (MET)', description: 'Exercise intensity', icon: Zap },
    { id: 'epoc-calculator', name: 'EPOC Calculator', description: 'Afterburn effect', icon: FlameIcon },
    { id: 'daily-step-calorie', name: 'Daily Step Calorie Burn', description: 'Steps to calories', icon: Activity },
    { id: 'resting-hr-percentile', name: 'Resting HR Percentile', description: 'RHR ranking', icon: Heart }
  ]},
  { id: 'financial', name: 'Financial', icon: DollarSign, color: 'from-emerald-500 to-teal-500', calculators: [
    { id: 'compound-interest', name: 'Compound Interest', description: 'Investment growth', icon: TrendingUp },
    { id: 'mortgage', name: 'Mortgage Calculator', description: 'Monthly payments', icon: Home },
    { id: 'loan', name: 'Loan Calculator', description: 'Loan payments', icon: CreditCard },
    { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips', icon: Receipt },
    { id: 'discount', name: 'Discount Calculator', description: 'Price discounts', icon: Percent },
    { id: 'investment', name: 'Investment Calculator', description: 'Returns', icon: TrendingUp },
    { id: 'savings', name: 'Savings Calculator', description: 'Savings growth', icon: PiggyBank },
    { id: 'auto-loan', name: 'Auto Loan', description: 'Car payments', icon: Car },
    { id: 'retirement', name: 'Retirement', description: 'Retirement planning', icon: PiggyBank },
    { id: 'percentage-change', name: 'Percentage Change', description: '% change', icon: TrendingUp },
    { id: 'sales-tax', name: 'Sales Tax', description: 'Calculate tax', icon: Receipt },
    { id: 'income-tax', name: 'Income Tax', description: 'Estimate tax', icon: Landmark },
    { id: 'net-worth', name: 'Net Worth', description: 'Calculate net worth', icon: Wallet },
    { id: 'roi', name: 'ROI Calculator', description: 'Return on investment', icon: TrendingUp },
    { id: 'apr', name: 'APR Calculator', description: 'Annual rate', icon: Percent },
    { id: 'debt-to-income', name: 'Debt-to-Income', description: 'DTI ratio', icon: CreditCard },
    { id: 'inflation', name: 'Inflation', description: 'Adjust for inflation', icon: TrendingDown },
    { id: 'currency', name: 'Currency Converter', description: 'Convert currency', icon: Coins },
    { id: 'break-even', name: 'Break-Even', description: 'Business analysis', icon: BarChart3 },
    { id: 'amortization', name: 'Amortization', description: 'Loan schedule', icon: FileText },
    { id: 'dividend', name: 'Dividend', description: 'Dividend income', icon: Coins },
    { id: 'cd-calculator', name: 'CD Calculator', description: 'Certificate of Deposit', icon: Landmark },
    { id: 'refinance', name: 'Refinance', description: 'Refinance analysis', icon: Home },
    { id: 'payoff', name: 'Payoff Calculator', description: 'Debt payoff', icon: CreditCard },
    // ADDITIONAL FINANCIAL CALCULATORS
    { id: 'simple-interest', name: 'Simple Interest', description: 'Basic interest', icon: Percent },
    { id: 'present-value', name: 'Present Value', description: 'PV of future money', icon: TrendingDown },
    { id: 'future-value', name: 'Future Value', description: 'FV of current money', icon: TrendingUp },
    { id: 'annuity-payment', name: 'Annuity Payment', description: 'Regular payment calc', icon: PiggyBank },
    { id: 'annuity-future', name: 'Annuity Future Value', description: 'Annuity FV', icon: TrendingUp },
    { id: 'sinking-fund', name: 'Sinking Fund', description: 'Goal savings', icon: Target },
    { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare loans', icon: CreditCard },
    { id: 'car-affordability', name: 'Car Affordability', description: 'How much car', icon: Car },
    { id: 'home-affordability', name: 'Home Affordability', description: 'House price range', icon: Home },
    { id: 'rent-vs-buy', name: 'Rent vs Buy', description: 'Compare options', icon: Home },
    { id: 'pmi-calculator', name: 'PMI Calculator', description: 'Mortgage insurance', icon: Home },
    { id: 'closing-costs', name: 'Closing Costs', description: 'Home buying costs', icon: Home },
    { id: 'property-tax', name: 'Property Tax', description: 'Annual property tax', icon: Receipt },
    { id: 'capital-gains', name: 'Capital Gains', description: 'Investment tax', icon: TrendingUp },
    { id: 'fha-loan', name: 'FHA Loan', description: 'FHA mortgage', icon: Home },
    { id: 'va-loan', name: 'VA Loan', description: 'VA mortgage', icon: Home },
    { id: 'credit-card-payoff', name: 'Credit Card Payoff', description: 'Payoff timeline', icon: CreditCard },
    { id: 'balance-transfer', name: 'Balance Transfer', description: 'Transfer savings', icon: CreditCard },
    { id: 'debt-snowball', name: 'Debt Snowball', description: 'Debt strategy', icon: TrendingDown },
    { id: 'debt-avalanche', name: 'Debt Avalanche', description: 'Interest-first debt', icon: TrendingDown },
    { id: 'emergency-fund', name: 'Emergency Fund', description: 'Safety savings', icon: PiggyBank },
    { id: 'college-savings', name: 'College Savings', description: 'Education fund', icon: PiggyBank },
    { id: 'hsa-calculator', name: 'HSA Calculator', description: 'Health savings', icon: Heart },
    { id: 'social-security', name: 'Social Security', description: 'SS benefits estimate', icon: Landmark },
    { id: 'pension-calculator', name: 'Pension', description: 'Pension estimate', icon: PiggyBank },
    { id: '401k-calculator', name: '401k Calculator', description: '401k projection', icon: TrendingUp },
    { id: 'ira-calculator', name: 'IRA Calculator', description: 'Retirement account', icon: Landmark },
    { id: 'rule-of-72', name: 'Rule of 72', description: 'Doubling time', icon: Calculator },
    { id: 'cagr', name: 'CAGR Calculator', description: 'Compound growth', icon: TrendingUp },
    { id: 'npv-calculator', name: 'NPV Calculator', description: 'Net present value', icon: TrendingUp },
    { id: 'student-loan', name: 'Student Loan', description: 'Education debt', icon: Landmark },
    { id: 'annuity', name: 'Annuity', description: 'Future payouts', icon: PiggyBank },
    // NEW FINANCIAL CALCULATORS (15)
    { id: 'salary-converter', name: 'Salary Converter', description: 'Hourly/Annual', icon: DollarSign },
    { id: 'hourly-to-salary', name: 'Hourly to Salary', description: 'Wage conversion', icon: DollarSign },
    { id: 'markup-calculator', name: 'Markup Calculator', description: 'Calculate markup', icon: Percent },
    { id: 'margin-calculator', name: 'Margin Calculator', description: 'Profit margin', icon: TrendingUp },
    { id: 'simple-interest', name: 'Simple Interest', description: 'Basic interest', icon: Percent },
    { id: 'commission-calculator', name: 'Commission Calculator', description: 'Sales commission', icon: DollarSign },
    { id: 'price-per-unit', name: 'Price Per Unit', description: 'Compare prices', icon: Calculator },
    { id: 'discount-compare', name: 'Discount Compare', description: 'Compare deals', icon: Percent },
    { id: 'emergency-fund', name: 'Emergency Fund', description: 'Savings target', icon: PiggyBank },
    { id: 'rent-vs-buy', name: 'Rent vs Buy', description: 'Housing decision', icon: Home },
    { id: 'college-savings', name: 'College Savings', description: 'Education fund', icon: PiggyBank },
    { id: 'vacation-budget', name: 'Vacation Budget', description: 'Trip planning', icon: Globe },
    { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare loans', icon: CreditCard },
    { id: 'gratuity-calculator', name: 'Gratuity Calculator', description: 'Tip amount', icon: Receipt },
    { id: 'subscription-cost', name: 'Subscription Cost', description: 'Recurring costs', icon: Receipt },
    // NEW FINANCIAL CALCULATORS (15 - Advanced Financial Metrics)
    { id: 'npv-advanced', name: 'NPV Advanced', description: 'Net Present Value with cash flows', icon: TrendingUp },
    { id: 'irr-estimate', name: 'IRR Estimate', description: 'Internal Rate of Return', icon: TrendingUp },
    { id: 'time-value-money', name: 'Time Value of Money', description: 'Present/Future value', icon: Clock },
    { id: 'real-rate-return', name: 'Real Rate of Return', description: 'Inflation-adjusted return', icon: TrendingUp },
    { id: 'effective-annual-rate', name: 'Effective Annual Rate', description: 'EAR calculator', icon: Percent },
    { id: 'nominal-interest-rate', name: 'Nominal Interest Rate', description: 'APR to nominal', icon: Percent },
    { id: 'loan-to-value', name: 'Loan-to-Value Ratio', description: 'LTV calculator', icon: Home },
    { id: 'debt-service-coverage', name: 'Debt Service Coverage', description: 'DSCR calculator', icon: BarChart3 },
    { id: 'price-earnings-ratio', name: 'Price-to-Earnings Ratio', description: 'P/E calculator', icon: TrendingUp },
    { id: 'dividend-yield', name: 'Dividend Yield', description: 'Stock dividend calc', icon: Coins },
    { id: 'capitalization-rate', name: 'Capitalization Rate', description: 'Cap rate for real estate', icon: Home },
    { id: 'cash-on-cash', name: 'Cash on Cash Return', description: 'Real estate ROI', icon: TrendingUp },
    { id: 'operating-expense-ratio', name: 'Operating Expense Ratio', description: 'OER for properties', icon: Receipt },
    { id: 'gross-rent-multiplier', name: 'Gross Rent Multiplier', description: 'GRM for investment', icon: Home },
    { id: 'debt-ratio', name: 'Debt Ratio', description: 'Total debt ratio', icon: CreditCard }
  ]},
  { id: 'math', name: 'Math', icon: Calculator, color: 'from-violet-500 to-purple-500', calculators: [
    { id: 'percentage', name: 'Percentage', description: 'Calculate percentages', icon: Percent },
    { id: 'scientific', name: 'Scientific', description: 'Advanced math', icon: Calculator },
    { id: 'square-root', name: 'Square Root', description: 'Calculate √x', icon: Square },
    { id: 'gcd', name: 'GCD Calculator', description: 'Greatest common divisor', icon: Hash },
    { id: 'lcm', name: 'LCM Calculator', description: 'Least common multiple', icon: Hash },
    { id: 'factorial', name: 'Factorial', description: 'Calculate n!', icon: Hash },
    { id: 'exponent', name: 'Exponent', description: 'Calculate powers', icon: Calculator },
    { id: 'logarithm', name: 'Logarithm', description: 'Calculate logs', icon: Divide },
    { id: 'fraction', name: 'Fraction', description: 'Work with fractions', icon: Divide },
    { id: 'average', name: 'Average', description: 'Mean, median, mode', icon: BarChart3 },
    { id: 'quadratic', name: 'Quadratic', description: 'Solve equations', icon: Calculator },
    { id: 'ratio', name: 'Ratio', description: 'Solve ratios', icon: Divide },
    { id: 'pythagorean', name: 'Pythagorean', description: 'Triangle sides', icon: Ruler },
    { id: 'circle-area', name: 'Circle Area', description: 'Area & circumference', icon: Target },
    { id: 'triangle-area', name: 'Triangle Area', description: 'Calculate area', icon: Target },
    { id: 'rectangle', name: 'Rectangle', description: 'Area & perimeter', icon: Square },
    { id: 'volume', name: 'Volume', description: '3D volumes', icon: Target },
    { id: 'speed-distance-time', name: 'Speed/Distance/Time', description: 'Calculate any', icon: Timer },
    { id: 'probability', name: 'Probability', description: 'Calculate probability', icon: Target },
    { id: 'prime-checker', name: 'Prime Checker', description: 'Check if prime', icon: Hash },
    { id: 'fibonacci', name: 'Fibonacci', description: 'Generate sequence', icon: Hash },
    { id: 'arithmetic-seq', name: 'Arithmetic Seq', description: 'Calculate sequence', icon: Hash },
    { id: 'geometric-seq', name: 'Geometric Seq', description: 'Calculate sequence', icon: Hash },
    { id: 'complex-numbers', name: 'Complex Numbers', description: 'Complex math', icon: Calculator },
    // ADDITIONAL MATH CALCULATORS
    { id: 'nth-root', name: 'Nth Root', description: 'Any root', icon: Hash },
    { id: 'permutation', name: 'Permutation', description: 'nPr calculation', icon: Hash },
    { id: 'combination', name: 'Combination', description: 'nCr calculation', icon: Hash },
    { id: 'trigonometry', name: 'Trigonometry', description: 'Sin, cos, tan', icon: Calculator },
    { id: 'geometric-mean', name: 'Geometric Mean', description: 'Average of ratios', icon: BarChart3 },
    { id: 'standard-deviation', name: 'Standard Deviation', description: 'Data spread', icon: BarChart3 },
    { id: 'binomial-probability', name: 'Binomial Probability', description: 'Success trials', icon: Target },
    { id: 'cube-root', name: 'Cube Root', description: 'Calculate ∛x', icon: Hash },
    { id: 'absolute-value', name: 'Absolute Value', description: '|x|', icon: Calculator },
    { id: 'round-numbers', name: 'Round Numbers', description: 'Rounding options', icon: Calculator },
    { id: 'ceiling-floor', name: 'Ceiling & Floor', description: 'Round up/down', icon: Calculator },
    { id: 'modulo', name: 'Modulo', description: 'Remainder', icon: Divide },
    { id: 'percentage-difference', name: 'Percentage Difference', description: 'Between two numbers', icon: Percent },
    { id: 'percentage-error', name: 'Percentage Error', description: 'Error calc', icon: Percent },
    { id: 'proportion-calc', name: 'Proportion Calc', description: 'Solve proportions', icon: Divide },
    { id: 'inverse-percentage', name: 'Inverse Percentage', description: 'Find original', icon: Percent },
    { id: 'markup-margin', name: 'Markup & Margin', description: 'Business pricing', icon: Percent },
    { id: 'tax-equivalent', name: 'Tax Equivalent', description: 'Pre-tax amount', icon: Receipt },
    { id: 'number-sequence', name: 'Number Sequence', description: 'Generate patterns', icon: Hash },
    { id: 'collatz-sequence', name: 'Collatz Sequence', description: '3n+1 problem', icon: Hash },
    { id: 'triangular-numbers', name: 'Triangular Numbers', description: 'Triangle numbers', icon: Hash },
    { id: 'square-numbers', name: 'Square Numbers', description: 'Perfect squares', icon: Square },
    { id: 'cube-numbers', name: 'Cube Numbers', description: 'Perfect cubes', icon: Hash },
    { id: 'prime-factors', name: 'Prime Factors', description: 'Factorize', icon: Hash },
    { id: 'divisor-count', name: 'Divisor Count', description: 'Number of divisors', icon: Hash },
    { id: 'perfect-number', name: 'Perfect Number', description: 'Check perfect', icon: Hash },
    { id: 'palindrome-number', name: 'Palindrome Number', description: 'Check palindrome', icon: Hash },
    { id: 'armstrong-number', name: 'Armstrong Number', description: 'Armstrong check', icon: Hash },
    { id: 'fibonacci-nth', name: 'Fibonacci Nth', description: 'Nth Fibonacci', icon: Hash },
    { id: 'lucas-numbers', name: 'Lucas Numbers', description: 'Lucas sequence', icon: Hash },
    { id: 'pell-numbers', name: 'Pell Numbers', description: 'Pell sequence', icon: Hash },
    { id: 'catalan-numbers', name: 'Catalan Numbers', description: 'Catalan sequence', icon: Hash },
    { id: 'binomial-coefficient', name: 'Binomial Coefficient', description: 'n choose k', icon: Hash },
    { id: 'hyperbolic-functions', name: 'Hyperbolic Functions', description: 'sinh, cosh, tanh', icon: Calculator },
    { id: 'inverse-trig', name: 'Inverse Trig', description: 'arcsin, arccos, arctan', icon: Calculator },
    { id: 'logarithm-base-n', name: 'Logarithm Base N', description: 'Any base log', icon: Divide },
    { id: 'natural-log', name: 'Natural Log', description: 'ln(x)', icon: Divide },
    { id: 'exponential', name: 'Exponential', description: 'e^x', icon: Calculator },
    { id: 'distance-formula', name: 'Distance Formula', description: '2D/3D distance', icon: Ruler },
    { id: 'midpoint-formula', name: 'Midpoint Formula', description: 'Point between', icon: Target },
    { id: 'slope-calculator', name: 'Slope Calculator', description: 'Line slope', icon: TrendingUp },
    { id: 'ellipse-area', name: 'Ellipse Area', description: 'Ellipse geometry', icon: Target },
    { id: 'sphere-volume', name: 'Sphere Volume', description: '3D sphere', icon: Target },
    { id: 'cylinder-volume', name: 'Cylinder Volume', description: 'Cylinder', icon: Target },
    { id: 'cone-volume', name: 'Cone Volume', description: 'Cone', icon: Target },
    { id: 'pyramid-volume', name: 'Pyramid Volume', description: 'Pyramid', icon: Target },
    { id: 'cube-surface', name: 'Cube Surface', description: 'Cube area', icon: Square },
    // NEW MATH CALCULATORS (15)
    { id: 'dot-product', name: 'Dot Product', description: 'Vector dot product', icon: Target },
    { id: 'cross-product', name: 'Cross Product', description: 'Vector cross product', icon: Ruler },
    { id: 'matrix-determinant', name: 'Matrix Determinant', description: 'Calculate det(A)', icon: Square },
    { id: 'system-equations', name: 'System of Equations', description: 'Solve 2×2 linear', icon: Calculator },
    { id: 'polynomial-roots', name: 'Cubic Roots', description: 'Find polynomial roots', icon: Hash },
    { id: 'derivative-point', name: 'Derivative at Point', description: 'Numerical derivative', icon: TrendingUp },
    { id: 'integral-approx', name: 'Integral Approximation', description: 'Numerical integration', icon: BarChart3 },
    { id: 'taylor-series', name: 'Taylor Series', description: 'Polynomial approximation', icon: Calculator },
    { id: 'vector-magnitude', name: 'Vector Magnitude', description: 'Calculate |v|', icon: Ruler },
    { id: 'unit-vector', name: 'Unit Vector', description: 'Normalize vector', icon: Target },
    { id: 'scalar-projection', name: 'Scalar Projection', description: 'Project vectors', icon: TrendingUp },
    { id: 'angle-vectors', name: 'Angle Between Vectors', description: 'Calculate angle θ', icon: Target },
    { id: 'linear-regression', name: 'Linear Regression', description: 'Best fit line', icon: TrendingUp },
    { id: 'vector-2d-ops', name: '2D Vector Operations', description: 'Add, subtract, scale', icon: Calculator },
    { id: 'quadratic-vertex', name: 'Quadratic Vertex Form', description: 'Find vertex & form', icon: Target }
  ]},
  { id: 'datetime', name: 'Date & Time', icon: Calendar, color: 'from-amber-500 to-orange-500', calculators: [
    { id: 'date-difference', name: 'Date Difference', description: 'Days between dates', icon: Calendar },
    { id: 'add-subtract-days', name: 'Add/Subtract Days', description: 'Modify dates', icon: Calendar },
    { id: 'time-difference', name: 'Time Difference', description: 'Hours between', icon: Clock },
    { id: 'age', name: 'Age Calculator', description: 'Calculate age', icon: Calendar },
    { id: 'weekday-finder', name: 'Weekday Finder', description: 'Day of week', icon: Calendar },
    { id: 'countdown', name: 'Countdown', description: 'Days until date', icon: Timer },
    { id: 'working-days', name: 'Working Days', description: 'Business days', icon: Calendar },
    { id: 'time-zone', name: 'Time Zone', description: 'Convert zones', icon: Globe },
    { id: 'epoch', name: 'Epoch Converter', description: 'Unix timestamp', icon: Clock },
    { id: 'duration', name: 'Duration', description: 'Convert durations', icon: Timer },
    { id: 'leap-year', name: 'Leap Year', description: 'Check leap year', icon: Calendar },
    { id: 'add-months', name: 'Add Months', description: 'Date arithmetic', icon: Calendar },
    { id: 'quarter', name: 'Quarter', description: 'Fiscal quarter', icon: Calendar },
    { id: 'week-number', name: 'Week Number', description: 'Week of year', icon: Calendar },
    { id: 'days-until-birthday', name: 'Days Until Birthday', description: 'Birthday countdown', icon: Calendar },
    { id: 'meeting-duration', name: 'Meeting Duration', description: 'Calculate length', icon: Clock },
    { id: 'daylight-hours', name: 'Daylight Hours', description: 'Daylight', icon: Sun },
    { id: 'decimal-time', name: 'Decimal Time', description: 'Convert time', icon: Clock },
    { id: 'world-clock', name: 'World Clock', description: 'Time worldwide', icon: Globe },
    { id: 'time-elapsed', name: 'Time Elapsed', description: 'Time since', icon: Timer },
    { id: 'date-range', name: 'Date Range', description: 'Generate dates', icon: Calendar },
    { id: 'zodiac-sign', name: 'Zodiac Sign', description: 'Find your sign', icon: Star },
    { id: 'lunar-age', name: 'Lunar Age', description: 'Chinese calendar', icon: Moon },
    { id: 'pet-age', name: 'Pet Age', description: 'Pet years', icon: Heart },
    // ADDITIONAL DATETIME CALCULATORS
    { id: 'time-add-subtract', name: 'Time Add/Subtract', description: 'Time arithmetic', icon: Clock },
    { id: 'work-days', name: 'Work Days', description: 'Business days', icon: Calendar },
    { id: 'unix-timestamp', name: 'Unix Timestamp', description: 'Epoch converter', icon: Clock },
    { id: 'moon-phase', name: 'Moon Phase', description: 'Lunar phase', icon: Moon },
    { id: 'chinese-zodiac', name: 'Chinese Zodiac', description: 'Animal sign', icon: Star },
    { id: 'date-add', name: 'Date Add', description: 'Add days/weeks/months', icon: Calendar },
    { id: 'date-subtract', name: 'Date Subtract', description: 'Subtract from date', icon: Calendar },
    { id: 'date-compare', name: 'Date Compare', description: 'Compare two dates', icon: Calendar },
    { id: 'date-range-days', name: 'Date Range Days', description: 'List of dates', icon: Calendar },
    { id: 'business-days-add', name: 'Business Days Add', description: 'Add business days', icon: Calendar },
    { id: 'business-days-subtract', name: 'Business Days Subtract', description: 'Subtract business days', icon: Calendar },
    { id: 'holiday-finder', name: 'Holiday Finder', description: 'Find holidays in year', icon: Calendar },
    { id: 'weekend-finder', name: 'Weekend Finder', description: 'Count weekends', icon: Calendar },
    { id: 'days-in-month', name: 'Days in Month', description: 'Days in specific month', icon: Calendar },
    { id: 'days-in-year', name: 'Days in Year', description: 'Days in year', icon: Calendar },
    { id: 'seconds-in-day', name: 'Seconds in Day', description: 'Time conversions', icon: Clock },
    { id: 'hours-in-week', name: 'Hours in Week', description: 'Time calculations', icon: Clock },
    { id: 'minutes-in-year', name: 'Minutes in Year', description: 'Annual minutes', icon: Timer },
    { id: 'time-zone-convert', name: 'Time Zone Convert', description: 'Convert between zones', icon: Globe },
    { id: 'time-difference-hours', name: 'Time Difference Hours', description: 'Hours between times', icon: Clock },
    { id: 'meeting-scheduler', name: 'Meeting Scheduler', description: 'Find overlap', icon: Calendar },
    { id: 'age-in-days', name: 'Age in Days', description: 'Days since birth', icon: Calendar },
    { id: 'age-in-weeks', name: 'Age in Weeks', description: 'Weeks since birth', icon: Calendar },
    { id: 'age-in-months', name: 'Age in Months', description: 'Months since birth', icon: Calendar },
    { id: 'next-birthday', name: 'Next Birthday', description: 'Days until birthday', icon: Calendar },
    { id: 'birthday-day', name: 'Birthday Day', description: 'Day of week born', icon: Calendar },
    { id: 'anniversary-calc', name: 'Anniversary Calc', description: 'Anniversary date', icon: Heart },
    { id: 'gregorian-to-julian', name: 'Gregorian to Julian', description: 'Calendar conversion', icon: Calendar },
    { id: 'julian-to-gregorian', name: 'Julian to Gregorian', description: 'Calendar conversion', icon: Calendar },
    { id: 'julian-date', name: 'Julian Date', description: 'Julian day number', icon: Calendar },
    { id: 'modified-julian', name: 'Modified Julian', description: 'MJD', icon: Calendar },
    { id: 'unix-to-date', name: 'Unix to Date', description: 'Convert timestamp', icon: Clock },
    { id: 'iso-week', name: 'ISO Week', description: 'ISO week number', icon: Calendar },
    { id: 'quarter-dates', name: 'Quarter Dates', description: 'Quarter start/end', icon: Calendar },
    { id: 'fiscal-year', name: 'Fiscal Year', description: 'Fiscal year calc', icon: Calendar },
    { id: 'time-sheet', name: 'Time Sheet', description: 'Work hours', icon: Clock },
    { id: 'shift-calculator', name: 'Shift Calculator', description: 'Shift planning', icon: Clock },
    { id: 'prayer-times', name: 'Prayer Times', description: 'Islamic times (estimate)', icon: Moon },
    { id: 'sunrise-sunset', name: 'Sunrise Sunset', description: 'Approximate times', icon: Sun },
    { id: 'golden-hour', name: 'Golden Hour', description: 'Photography timing', icon: Sun },
    { id: 'blue-hour', name: 'Blue Hour', description: 'Photography timing', icon: Moon },
    // NEW DATETIME CALCULATORS (15)
    { id: 'days-until-christmas', name: 'Days Until Christmas', description: 'Holiday countdown', icon: Star },
    { id: 'days-until-newyear', name: 'Days Until New Year', description: 'NYE countdown', icon: Star },
    { id: 'days-until-summer', name: 'Days Until Summer', description: 'Summer countdown', icon: Sun },
    { id: 'days-until-halloween', name: 'Days Until Halloween', description: 'Spooky countdown', icon: Star },
    { id: 'days-until-easter', name: 'Days Until Easter', description: 'Easter countdown', icon: Star },
    { id: 'time-until-date', name: 'Time Until Date', description: 'Detailed countdown', icon: Timer },
    { id: 'date-from-days', name: 'Date from Days', description: 'Add days to date', icon: Calendar },
    { id: 'date-ago', name: 'Date Ago Calculator', description: 'Past date', icon: Calendar },
    { id: 'weeks-until', name: 'Weeks Until Date', description: 'Weeks countdown', icon: Calendar },
    { id: 'months-until', name: 'Months Until Date', description: 'Months countdown', icon: Calendar },
    { id: 'age-at-date', name: 'Age at Future Date', description: 'Future age', icon: Calendar },
    { id: 'retirement-countdown', name: 'Retirement Countdown', description: 'Days to retirement', icon: Calendar },
    { id: 'school-year', name: 'School Year Calculator', description: 'Grade level', icon: Calendar },
    { id: 'time-duration', name: 'Time Duration', description: 'Between times', icon: Clock },
    { id: 'day-of-year', name: 'Day of Year', description: 'Day number', icon: Calendar },
    // NEW DATETIME CALCULATORS (15) - Added
    { id: 'iso-week-date', name: 'ISO Week Date', description: 'ISO 8601 week date', icon: Calendar },
    { id: 'time-duration-sum', name: 'Time Duration Sum', description: 'Sum time durations', icon: Timer },
    { id: 'average-time', name: 'Average Time Calculator', description: 'Mean time', icon: Clock },
    { id: 'time-median', name: 'Time Median Calculator', description: 'Median time', icon: BarChart3 },
    { id: 'solar-noon', name: 'Solar Noon Calculator', description: 'Calculate solar noon', icon: Sun },
    { id: 'astronomical-twilight', name: 'Astronomical Twilight', description: 'Sun -18° horizon', icon: Moon },
    { id: 'nautical-twilight', name: 'Nautical Twilight', description: 'Sun -12° horizon', icon: Moon },
    { id: 'civil-twilight', name: 'Civil Twilight Calculator', description: 'Sun -6° horizon', icon: Sun },
    { id: 'sun-angle', name: 'Sun Angle Calculator', description: 'Solar elevation', icon: Sun },
    { id: 'shadow-length', name: 'Shadow Length Calculator', description: 'Calculate shadow', icon: Ruler },
    { id: 'day-length-change', name: 'Day Length Change Rate', description: 'Day length delta', icon: TrendingUp },
    { id: 'sidereal-time', name: 'Sidereal Time Calculator', description: 'Star time', icon: Star },
    { id: 'solar-declination', name: 'Solar Declination', description: 'Sun declination', icon: Sun },
    { id: 'equation-of-time', name: 'Equation of Time', description: 'Solar vs clock time', icon: Clock },
    { id: 'day-fraction', name: 'Day Fraction Calculator', description: 'Decimal day', icon: Hash }
  ]},
  { id: 'tools', name: 'Tools', icon: Wrench, color: 'from-cyan-500 to-blue-500', calculators: [
    { id: 'temperature', name: 'Temperature', description: 'Convert temps', icon: ThermometerIcon },
    { id: 'length-converter', name: 'Length', description: 'Convert length', icon: Ruler },
    { id: 'weight-converter', name: 'Weight', description: 'Convert weight', icon: Weight },
    { id: 'volume-converter', name: 'Volume', description: 'Convert volume', icon: Droplets },
    { id: 'area-converter', name: 'Area', description: 'Convert area', icon: Square },
    { id: 'speed-converter', name: 'Speed', description: 'Convert speed', icon: Wind },
    { id: 'fuel-economy', name: 'Fuel Economy', description: 'MPG conversion', icon: Car },
    { id: 'data-storage', name: 'Data Storage', description: 'Convert data', icon: HardDriveIcon },
    { id: 'color-converter', name: 'Color Converter', description: 'HEX/RGB/HSL', icon: PaletteIcon },
    { id: 'password-generator', name: 'Password Gen', description: 'Secure passwords', icon: Shield },
    { id: 'random-number', name: 'Random Number', description: 'Generate numbers', icon: Hash },
    { id: 'text-counter', name: 'Text Counter', description: 'Count chars', icon: FileText },
    { id: 'case-converter', name: 'Case Converter', description: 'Convert case', icon: FileText },
    { id: 'binary', name: 'Binary', description: 'Base conversion', icon: Hash },
    { id: 'roman-numeral', name: 'Roman Numeral', description: 'Convert numerals', icon: Hash },
    { id: 'qr-data', name: 'QR Data', description: 'QR generation', icon: Hash },
    { id: 'unit-rate', name: 'Unit Rate', description: 'Price per unit', icon: Calculator },
    { id: 'proportion', name: 'Proportion', description: 'Solve ratios', icon: Divide },
    { id: 'gcd-lcm', name: 'GCD & LCM', description: 'Both together', icon: Hash },
    { id: 'energy', name: 'Energy', description: 'Convert energy', icon: Zap },
    { id: 'angle', name: 'Angle', description: 'Degrees/radians', icon: Target },
    { id: 'pressure', name: 'Pressure', description: 'Convert pressure', icon: Wind },
    { id: 'frequency', name: 'Frequency', description: 'Convert frequency', icon: Timer },
    // NEW TOOLS CALCULATORS (15)
    { id: 'area-converter', name: 'Area Converter', description: 'Convert area', icon: Square },
    { id: 'speed-converter', name: 'Speed Converter', description: 'Convert speed', icon: Wind },
    { id: 'pressure-converter', name: 'Pressure Converter', description: 'Convert pressure', icon: Wind },
    { id: 'energy-converter', name: 'Energy Converter', description: 'Convert energy', icon: Zap },
    { id: 'frequency-converter', name: 'Frequency Converter', description: 'Convert frequency', icon: Timer },
    { id: 'angle-converter', name: 'Angle Converter', description: 'Degrees/radians', icon: Target },
    { id: 'cooking-converter', name: 'Cooking Converter', description: 'Kitchen measurements', icon: Droplets },
    { id: 'shoe-size-converter', name: 'Shoe Size Converter', description: 'International sizes', icon: Ruler },
    { id: 'ring-size-converter', name: 'Ring Size Converter', description: 'Ring sizes', icon: Target },
    { id: 'clothing-size-converter', name: 'Clothing Size Converter', description: 'International clothing', icon: Ruler },
    { id: 'color-rgb-hex', name: 'RGB to HEX', description: 'Color conversion', icon: PaletteIcon },
    { id: 'hex-to-rgb', name: 'HEX to RGB', description: 'Color conversion', icon: PaletteIcon },
    { id: 'aspect-ratio', name: 'Aspect Ratio Calculator', description: 'Screen ratios', icon: Target },
    { id: 'ppi-calculator', name: 'PPI Calculator', description: 'Pixel density', icon: Target },
    { id: 'file-size-converter', name: 'File Size Converter', description: 'Digital storage', icon: HardDriveIcon },
    // MORE TOOLS CALCULATORS
    { id: 'density-converter', name: 'Density Converter', description: 'Convert density', icon: Weight },
    { id: 'power-converter', name: 'Power Converter', description: 'Convert power', icon: Zap },
    { id: 'torque-converter', name: 'Torque Converter', description: 'Convert torque', icon: Wrench },
    { id: 'heat-index', name: 'Heat Index', description: 'Feels like temp', icon: ThermometerIcon },
    { id: 'wind-chill', name: 'Wind Chill', description: 'Cold feels like', icon: Wind },
    { id: 'dew-point', name: 'Dew Point', description: 'Condensation point', icon: Droplets },
    { id: 'battery-life', name: 'Battery Life', description: 'Runtime estimate', icon: Zap },
    { id: 'download-time', name: 'Download Time', description: 'Transfer estimate', icon: Timer },
    { id: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode text', icon: FileText },
    { id: 'hash-generator', name: 'Hash Generator', description: 'Simple hash', icon: Shield },
    { id: 'lorem-generator', name: 'Lorem Ipsum', description: 'Placeholder text', icon: FileText },
    { id: 'mime-types', name: 'MIME Types', description: 'File types', icon: FileText }
  ]},
  { id: 'food', name: 'Food & Nutrition', icon: Utensils, color: 'from-orange-500 to-amber-500', calculators: [
    { id: 'food-analyzer', name: 'Food Nutrition Analyzer', description: 'Analyze any food', icon: Apple }
  ]}
]

// Calculator Form Component
function CalculatorForm({ calculatorId }: { calculatorId: string }) {
  const config = allCalculatorConfigs[calculatorId]
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  if (!config) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-medium">Calculator not found</p>
        <p className="text-sm text-muted-foreground">Please try another calculator.</p>
      </div>
    )
  }

  const handleCalculate = () => {
    try {
      const res = config.calculate(inputs)
      if (res.results.length === 0) {
        toast({ title: 'Please fill in all required fields', variant: 'destructive' })
        return
      }
      
      // Create detailed results data
      const resultData = {
        calculatorId,
        calculatorName: config.name,
        category: config.category,
        description: config.description,
        inputs,
        results: res.results,
        pieData: res.pieData,
        formula: res.formula,
        comparisons: res.comparisons,
        infoCards: res.infoCards,
        detailedResults: {
          formula: res.formula,
          status: res.status,
          meaning: res.meaning,
          limitations: res.limitations,
          insights: res.insights,
          improvement: res.improvement,
          actionPlan: res.actionPlan,
          disclaimer: res.disclaimer
        },
        // New enhanced result fields
        charts: res.charts,
        benchmarkComparison: res.benchmarkComparison,
        faqs: res.faqs,
        summaryInsight: res.summaryInsight
      }
      
      // Navigate to results page in the same tab
      // Use Base64 encoding to avoid URI encoding issues with special characters like %
      const dataString = btoa(encodeURIComponent(JSON.stringify(resultData)))
      router.push(`/results?data=${dataString}`)
    } catch (error) {
      toast({ title: 'Calculation error', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 p-4 rounded-xl border">
        <p className="text-sm text-muted-foreground">{config.longDescription}</p>
      </div>

      <div className="space-y-3">
        {config.inputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <Label htmlFor={input.id} className="text-sm font-medium">{input.label}</Label>
            {input.type === 'select' ? (
              <Select value={inputs[input.id] || ''} onValueChange={(v) => setInputs(prev => ({ ...prev, [input.id]: v }))}>
                <SelectTrigger className="bg-background/80 border-2 focus:border-primary">
                  <SelectValue placeholder={input.placeholder || 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                  {input.options?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={input.id}
                type={input.type || 'text'}
                value={inputs[input.id] || ''}
                onChange={(e) => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                placeholder={input.placeholder}
                className="bg-background/80 border-2 focus:border-primary"
              />
            )}
          </div>
        ))}
        <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-primary to-primary/80">
          <Sparkles className="h-4 w-4 mr-2" />
          Calculate & View Results
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">Results will open in a new tab</p>
      </div>
    </div>
  )
}

// AI Chat Component
function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m CalciLab AI. How can I help with calculations?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMessage, history: messages }) })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button suppressHydrationWarning className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)}>
        <Brain className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }} className="fixed bottom-28 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-background rounded-3xl shadow-2xl border flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Brain className="h-5 w-5" /></div>
                <div><h3 className="font-semibold">CalciLab AI</h3><p className="text-xs opacity-80">Ask me anything</p></div>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl" onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md' : 'bg-muted rounded-bl-md'}`}>{msg.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-muted p-3 rounded-2xl rounded-bl-md"><div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div></div></div>}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 rounded-xl" />
                <Button onClick={sendMessage} disabled={isLoading} className="rounded-xl"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Main App Component
export default function CalculatorHub() {
  const [selectedCategory, setSelectedCategory] = useState('health')
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const currentCategory = categories.find(c => c.id === selectedCategory)!
  const filteredCalculators = currentCategory.calculators.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalCalculators = categories.reduce((sum, cat) => sum + cat.calculators.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 p-[3px] shadow-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <span className="text-2xl font-black bg-gradient-to-br from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">C</span>
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-pulse">Calci</span>
                  <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Lab</span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium">{totalCalculators}+ Professional Calculators</p>
              </div>
            </motion.div>

            <nav className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => (
                <motion.div key={cat.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant={selectedCategory === cat.id ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-2 rounded-xl ${selectedCategory === cat.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' : ''}`}>
                    <cat.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{cat.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">{cat.calculators.length}</Badge>
                  </Button>
                </motion.div>
              ))}
            </nav>

            <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="h-5 w-5" /></Button>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="lg:hidden pt-4 pb-2 space-y-2">
              {categories.map((cat) => (
                <Button key={cat.id} variant={selectedCategory === cat.id ? 'default' : 'ghost'} size="sm" onClick={() => { setSelectedCategory(cat.id); setMobileMenuOpen(false) }} className={`w-full justify-start rounded-xl ${selectedCategory === cat.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : ''}`}>
                  <cat.icon className="h-4 w-4 mr-2" />{cat.name}
                  <Badge variant="secondary" className="ml-auto">{cat.calculators.length}</Badge>
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            Your All-in-One
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Calculator Hub</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Access {totalCalculators}+ powerful calculators for health, finance, math, date & time, and everyday tools.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder={`Search ${currentCategory.name} calculators...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 rounded-2xl border-2 shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all shadow-lg ${selectedCategory === cat.id ? `bg-gradient-to-br ${cat.color} text-white shadow-xl` : 'bg-card border hover:shadow-xl'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCategory === cat.id ? 'bg-white/20' : `bg-gradient-to-br ${cat.color}`}`}>
                  <cat.icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-sm">{cat.name}</span>
              </div>
              <p className="text-2xl font-bold">{cat.calculators.length}</p>
              <p className="text-xs opacity-80">Calculators</p>
            </motion.div>
          ))}
        </div>

        {/* Calculator Cards */}
        {selectedCategory === 'food' ? (
          <FoodNutritionAnalyzer />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCalculators.map((calc, index) => (
                <motion.div
                  key={`${calc.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.3) }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCalculator(calc.id)}
                  className="cursor-pointer"
                >
                  <Card className="h-full hover:shadow-2xl transition-all border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50 group">
                    <CardHeader className="pb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                        <calc.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{calc.name}</CardTitle>
                      <CardDescription className="text-sm">{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <span>Open</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* SEO Article for Calculator Categories */}
            <CalculatorSEOArticle categoryId={selectedCategory} />
          </>
        )}

        {/* Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Calculator Dialog */}
      <Dialog open={!!selectedCalculator} onOpenChange={() => setSelectedCalculator(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl">
          {selectedCalculator && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{allCalculatorConfigs[selectedCalculator]?.name || 'Calculator'}</DialogTitle>
                <DialogDescription>{allCalculatorConfigs[selectedCalculator]?.description || ''}</DialogDescription>
              </DialogHeader>
              <CalculatorForm calculatorId={selectedCalculator} />
            </>
          )}
        </DialogContent>
      </Dialog>

      <AIChatAssistant />
      <Toaster />
    </div>
  )
}
