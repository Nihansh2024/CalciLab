'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, ChevronDown, ChevronUp, BarChart2, Lightbulb,
  Search, HelpCircle, Check, ArrowRight, TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SEOArticle, getSEOArticle } from '@/lib/calculator-seo-articles'

// SEO Article Section Component
function ArticleSection({ 
  heading, 
  content, 
  bulletPoints, 
  subSections,
  index 
}: { 
  heading: string
  content: string
  bulletPoints?: string[]
  subSections?: { heading: string; content: string }[]
  index: number
}) {
  const [expanded, setExpanded] = useState(index < 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {heading}
        </h2>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 border-t">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{content}</p>

                {bulletPoints && bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {subSections && subSections.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {subSections.map((sub, i) => (
                      <div key={i} className="pl-4 border-l-2 border-primary/20">
                        <h3 className="font-semibold text-base mb-2">{sub.heading}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// FAQ Accordion Component
function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <span className="font-medium flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="p-4 pt-0 border-t">
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Statistics Card Component
function StatisticCard({ stat, index }: { stat: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
    >
      <div className="flex items-start gap-2">
        <BarChart2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm font-medium">{stat}</p>
      </div>
    </motion.div>
  )
}

// Expert Tips Component
function ExpertTips({ tips }: { tips: string[] }) {
  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Lightbulb className="h-5 w-5" />
          Expert Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-amber-900 dark:text-amber-100">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Related Searches Component
function RelatedSearches({ searches }: { searches: string[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          Related Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {searches.map((search, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {search}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Main SEO Article Component
interface CalculatorSEOArticleProps {
  categoryId: string
}

export default function CalculatorSEOArticle({ categoryId }: CalculatorSEOArticleProps) {
  const article = getSEOArticle(categoryId)

  if (!article) {
    return null
  }

  return (
    <div className="space-y-6 mt-12 pt-8 border-t">
      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {article.secondaryKeywords.slice(0, 5).map((keyword, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>

        {/* Introduction */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {article.content.introduction}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-4">
        {article.content.sections.map((section, index) => (
          <ArticleSection
            key={index}
            heading={section.heading}
            content={section.content}
            bulletPoints={section.bulletPoints}
            subSections={section.subSections}
            index={index}
          />
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FAQAccordion items={article.content.faq} />
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {article.statistics.map((stat, i) => (
              <StatisticCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Tips */}
      <ExpertTips tips={article.expertTips} />

      {/* Conclusion */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">Conclusion</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {article.content.conclusion}
          </p>
        </CardContent>
      </Card>

      {/* Related Searches */}
      <RelatedSearches searches={article.relatedSearches} />
    </div>
  )
}
