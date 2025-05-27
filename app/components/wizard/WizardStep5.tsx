import { FormData } from '../../request/page'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep5({ formData, updateFormData }: Props) {
  const designStyles = [
    {
      id: 'modern',
      title: 'Modern & Clean',
      description: 'Minimalist design with lots of white space',
      preview: '🎨',
      colors: ['#ffffff', '#f8fafc', '#3b82f6']
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Corporate look with structured layout',
      preview: '💼',
      colors: ['#1f2937', '#ffffff', '#6b7280']
    },
    {
      id: 'creative',
      title: 'Creative & Bold',
      description: 'Vibrant colors and unique layouts',
      preview: '🌈',
      colors: ['#ec4899', '#8b5cf6', '#06b6d4']
    },
    {
      id: 'elegant',
      title: 'Elegant & Luxury',
      description: 'Sophisticated with premium feel',
      preview: '✨',
      colors: ['#000000', '#d4af37', '#ffffff']
    },
    {
      id: 'playful',
      title: 'Playful & Fun',
      description: 'Friendly and approachable design',
      preview: '🎉',
      colors: ['#fbbf24', '#f87171', '#34d399']
    },
    {
      id: 'traditional',
      title: 'Traditional',
      description: 'Classic and timeless design',
      preview: '🏛️',
      colors: ['#92400e', '#fef3c7', '#374151']
    }
  ]

  const addReference = () => {
    const url = prompt('Enter a website URL that you like:')
    if (url && url.trim()) {
      const currentRefs = formData.designReferences || []
      updateFormData({ designReferences: [...currentRefs, url.trim()] })
    }
  }

  const removeReference = (index: number) => {
    const currentRefs = formData.designReferences || []
    updateFormData({ 
      designReferences: currentRefs.filter((_, i) => i !== index)
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          What's your design preference?
        </h2>
        <p className="text-gray-600">
          Choose a design style that matches your brand and business personality.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Design Style</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateFormData({ designStyle: style.id })}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  formData.designStyle === style.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{style.preview}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{style.title}</h4>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {style.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Reference Websites (Optional)
            </h3>
            <button
              onClick={addReference}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <PlusIcon className="w-4 h-4" />
              Add Reference
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Share websites you like so we can understand your visual preferences better.
          </p>

          {formData.designReferences && formData.designReferences.length > 0 ? (
            <div className="space-y-2">
              {formData.designReferences.map((url, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    🔗
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{url}</p>
                  </div>
                  <button
                    onClick={() => removeReference(index)}
                    className="text-red-600 hover:text-red-700 p-1 flex-shrink-0"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-gray-400 mb-2">🔗</div>
              <p className="text-sm text-gray-600">
                No reference websites added yet
              </p>
            </div>
          )}
        </div>

        {formData.designStyle && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">
              Design Style Selected ✨
            </h3>
            <p className="text-sm text-green-700">
              We'll create a {designStyles.find(s => s.id === formData.designStyle)?.title.toLowerCase()} design that matches your business goals.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
