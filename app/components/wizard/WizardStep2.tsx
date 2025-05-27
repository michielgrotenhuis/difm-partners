import { useState } from 'react'
import { FormData } from '../../request/page'
import { SparklesIcon } from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep2({ formData, updateFormData }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSuggestions = async () => {
    if (!formData.businessName) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessName: formData.businessName,
          goal: formData.websiteGoal 
        })
      })
      
      const data = await response.json()
      if (data.suggestions) {
        updateFormData({ businessInfo: data.suggestions })
      }
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Tell us about your business
        </h2>
        <p className="text-gray-600">
          Help us understand your business so we can create the perfect website for you.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business/Project Name *
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="Enter your business or project name"
            className="form-input"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Business Description *
            </label>
            {formData.businessName && (
              <button
                onClick={generateSuggestions}
                disabled={isGenerating}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                <SparklesIcon className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'AI Suggestions'}
              </button>
            )}
          </div>
          <textarea
            value={formData.businessInfo}
            onChange={(e) => updateFormData({ businessInfo: e.target.value })}
            placeholder="Describe your business, what you do, your target audience, and what makes you unique..."
            className="form-textarea"
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            The more details you provide, the better we can tailor your website
          </p>
        </div>

        {formData.businessInfo.length > 50 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">Great start! 🎉</h3>
            <p className="text-sm text-green-700">
              We have enough information to create a personalized website for your business.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
