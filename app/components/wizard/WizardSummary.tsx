'use client'

import { useState } from 'react'
import { FormData } from '../../request/page'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  EyeIcon, 
  PaperAirplaneIcon,
  ChevronLeftIcon 
} from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  onBack: () => void
}

interface AIQuote {
  estimatedPrice: { min: number; max: number }
  deliveryTime: string
  complexity: 'simple' | 'moderate' | 'complex'
  breakdown: {
    design: number
    development: number
    content: number
    features: number
  }
  recommendations: string[]
}

export default function WizardSummary({ formData, onBack }: Props) {
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false)
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiQuote, setAiQuote] = useState<AIQuote | null>(null)
  const [demoUrl, setDemoUrl] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const generateQuote = async () => {
    setIsGeneratingQuote(true)
    try {
      const response = await fetch('/api/ai/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const quote = await response.json()
      setAiQuote(quote)
    } catch (error) {
      console.error('Error generating quote:', error)
    } finally {
      setIsGeneratingQuote(false)
    }
  }

  const generateDemo = async () => {
    setIsGeneratingDemo(true)
    try {
      const response = await fetch('/api/ai/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const demo = await response.json()
      setDemoUrl(demo.url)
    } catch (error) {
      console.error('Error generating demo:', error)
    } finally {
      setIsGeneratingDemo(false)
    }
  }

  const submitRequest = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          aiQuote,
          demoUrl
        })
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Request Submitted Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for choosing DIFM! We've received your website request and will get back to you within 24 hours.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• We'll review your requirements within 24 hours</li>
                <li>• You'll receive a detailed proposal via email</li>
                <li>• We'll schedule a consultation call if needed</li>
                <li>• Once approved, we start building your website!</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Review Your Website Request
          </h1>
          <p className="text-gray-600">
            Please review your information below. You can generate an AI quote and demo preview before submitting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Business Information</h3>
                  <p className="text-gray-600">{formData.businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">{formData.businessInfo.substring(0, 150)}...</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Website Goal</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm capitalize">
                    {formData.websiteGoal.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Selected Features ({formData.features.length})</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.slice(0, 6).map(feature => (
                      <span key={feature} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm capitalize">
                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    ))}
                    {formData.features.length > 6 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        +{formData.features.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Budget</h3>
                    <p className="text-gray-600">{formatPrice(formData.budget)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Timeline</h3>
                    <p className="text-gray-600 capitalize">{formData.timeline.replace('-', ' - ')}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Contact</h3>
                  <p className="text-gray-600">{formData.contactName}</p>
                  <p className="text-gray-600">{formData.contactEmail}</p>
                </div>
              </div>
            </div>

            {/* AI Quote */}
            {aiQuote && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Quote</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-green-800">Estimated Investment</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {formatPrice(aiQuote.estimatedPrice.min)} - {formatPrice(aiQuote.estimatedPrice.max)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700">Delivery Time</p>
                      <p className="font-semibold text-green-800">{aiQuote.deliveryTime}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(aiQuote.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-gray-600">{key}:</span>
                        <span className="font-medium">{formatPrice(value)}</span>
                      </div>
                    ))}
                  </div>

                  {aiQuote.recommendations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">AI Recommendations</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {aiQuote.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Demo Preview */}
            {demoUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Demo Preview</h2>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <iframe
                    src={demoUrl}
                    className="w-full h-64 rounded border"
                    title="Website Demo Preview"
                  />
                  <a 
                    href={demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mt-3"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Full Demo
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
              
              <div className="space-y-4">
                <button
                  onClick={generateQuote}
                  disabled={isGeneratingQuote || aiQuote !== null}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    aiQuote 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : isGeneratingQuote
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  <SparklesIcon className="w-5 h-5" />
                  {isGeneratingQuote ? 'Generating Quote...' : 
                   aiQuote ? '✓ Quote Generated' : 'Generate AI Quote'}
                </button>

                <button
                  onClick={generateDemo}
                  disabled={isGeneratingDemo || demoUrl !== null}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    demoUrl
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : isGeneratingDemo
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <EyeIcon className="w-5 h-5" />
                  {isGeneratingDemo ? 'Creating Demo...' : 
                   demoUrl ? '✓ Demo Created' : 'Generate Demo Site'}
                </button>

                <div className="border-t pt-4">
                  <button
                    onClick={submitRequest}
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-lg font-semibold text-lg transition-colors ${
                      isSubmitting
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Generate a quote to see estimated costs</li>
                <li>• Demo preview shows your site concept</li>
                <li>• Both are optional but recommended</li>
                <li>• You can always submit without them</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Back to Edit
          </button>

          <div className="text-sm text-gray-500">
            Questions? Contact us at hello@difm-websites.com
          </div>
        </div>
      </div>
    </div>
  )
}
