import { FormData } from '../../request/page'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep7({ formData, updateFormData }: Props) {
  const budgetRanges = [
    { min: 500, max: 999, label: '€500 - €999', description: 'Basic website with essential features' },
    { min: 1000, max: 1999, label: '€1,000 - €1,999', description: 'Professional site with custom design' },
    { min: 2000, max: 3999, label: '€2,000 - €3,999', description: 'Advanced features and integrations' },
    { min: 4000, max: 7999, label: '€4,000 - €7,999', description: 'Complex functionality and e-commerce' },
    { min: 8000, max: 15000, label: '€8,000+', description: 'Enterprise-level website with all features' }
  ]

  const timelineOptions = [
    { value: '1-2weeks', label: '1-2 weeks', description: 'Rush project (may incur extra fees)' },
    { value: '2-3weeks', label: '2-3 weeks', description: 'Standard timeline (recommended)' },
    { value: '1month', label: '1 month', description: 'Relaxed timeline with revisions' },
    { value: '2months', label: '2+ months', description: 'Complex project or no rush' }
  ]

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Budget & Timeline
        </h2>
        <p className="text-gray-600">
          Help us understand your budget and timeline expectations so we can provide an accurate quote.
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Budget Range</h3>
          <div className="space-y-3">
            {budgetRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => updateFormData({ budget: range.min })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  formData.budget >= range.min && (range.max === 15000 || formData.budget <= range.max)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{range.label}</h4>
                    <p className="text-sm text-gray-600">{range.description}</p>
                  </div>
                  <div className="text-2xl">
                    {range.min <= 999 ? '🌱' : 
                     range.min <= 1999 ? '🚀' : 
                     range.min <= 3999 ? '⭐' : 
                     range.min <= 7999 ? '💎' : '👑'}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Budget Slider */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <label className="font-medium text-gray-900">Custom Budget</label>
              <span className="font-bold text-primary-600">{formatBudget(formData.budget)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="100"
              value={formData.budget}
              onChange={(e) => updateFormData({ budget: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>€500</span>
              <span>€15,000+</span>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Preferred Timeline</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {timelineOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFormData({ timeline: option.value })}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  formData.timeline === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-1">{option.label}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Breakdown Preview */}
        {formData.budget > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-3">What's Included in Your Budget</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Custom Design & Development</span>
                <span>{formatBudget(formData.budget * 0.6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Content Creation & SEO</span>
                <span>{formatBudget(formData.budget * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Project Management & Testing</span>
                <span>{formatBudget(formData.budget * 0.15)}</span>
              </div>
              <div className="flex justify-between">
                <span>Launch & Training</span>
                <span>{formatBudget(formData.budget * 0.05)}</span>
              </div>
              <div className="border-t border-blue-300 pt-2 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total Investment</span>
                  <span>{formatBudget(formData.budget)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
