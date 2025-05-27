import { FormData } from '../../request/page'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep3({ formData, updateFormData }: Props) {
  const features = [
    {
      id: 'contact',
      title: 'Contact Form',
      description: 'Let visitors get in touch with you easily',
      icon: '📧',
      recommended: true
    },
    {
      id: 'blog',
      title: 'Blog/News Section',
      description: 'Share updates, articles, and news',
      icon: '📝',
      recommended: false
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      description: 'Showcase your work or products',
      icon: '🖼️',
      recommended: true
    },
    {
      id: 'testimonials',
      title: 'Customer Reviews',
      description: 'Display testimonials and reviews',
      icon: '⭐',
      recommended: true
    },
    {
      id: 'booking',
      title: 'Online Booking',
      description: 'Allow appointment scheduling',
      icon: '📅',
      recommended: false
    },
    {
      id: 'ecommerce',
      title: 'Online Store',
      description: 'Sell products online',
      icon: '🛒',
      recommended: false
    },
    {
      id: 'social',
      title: 'Social Media Integration',
      description: 'Connect your social profiles',
      icon: '📱',
      recommended: true
    },
    {
      id: 'analytics',
      title: 'Analytics Tracking',
      description: 'Track website performance',
      icon: '📊',
      recommended: true
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Help people find you on Google',
      icon: '🔍',
      recommended: true
    },
    {
      id: 'multilingual',
      title: 'Multiple Languages',
      description: 'Support different languages',
      icon: '🌍',
      recommended: false
    },
    {
      id: 'membership',
      title: 'User Accounts',
      description: 'User registration and login',
      icon: '👤',
      recommended: false
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Real-time customer support',
      icon: '💬',
      recommended: false
    }
  ]

  const toggleFeature = (featureId: string) => {
    const currentFeatures = formData.features || []
    const updatedFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId]
    
    updateFormData({ features: updatedFeatures })
  }

  const getRecommendedFeatures = () => {
    const goalFeatureMap: { [key: string]: string[] } = {
      business: ['contact', 'gallery', 'testimonials', 'social', 'analytics', 'seo'],
      ecommerce: ['ecommerce', 'contact', 'testimonials', 'analytics', 'seo'],
      portfolio: ['gallery', 'contact', 'social', 'analytics', 'seo'],
      blog: ['blog', 'contact', 'social', 'analytics', 'seo'],
      nonprofit: ['contact', 'blog', 'testimonials', 'social', 'analytics', 'seo'],
      booking: ['booking', 'contact', 'testimonials', 'analytics', 'seo'],
    }
    
    return goalFeatureMap[formData.websiteGoal] || ['contact', 'analytics', 'seo']
  }

  const recommendedFeatures = getRecommendedFeatures()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          What features do you need?
        </h2>
        <p className="text-gray-600">
          Select the features you'd like on your website. We've pre-selected some recommendations based on your goals.
        </p>
      </div>

      {recommendedFeatures.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">
            💡 Recommended for your {formData.websiteGoal} website
          </h3>
          <button
            onClick={() => updateFormData({ features: recommendedFeatures })}
            className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Select all recommended features
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const isSelected = formData.features?.includes(feature.id)
          const isRecommended = recommendedFeatures.includes(feature.id)
          
          return (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 relative group ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  Recommended
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
                
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {formData.features && formData.features.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800 mb-3">
            Selected Features ({formData.features.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.features.map(featureId => {
              const feature = features.find(f => f.id === featureId)
              return feature ? (
                <span key={featureId} className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="mr-1">{feature.icon}</span>
                  {feature.title}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
