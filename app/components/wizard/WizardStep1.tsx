import { FormData } from '../../request/page'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep1({ formData, updateFormData }: Props) {
  const goals = [
    {
      id: 'business',
      title: 'Business Website',
      description: 'Professional website to showcase your business and services',
      icon: '🏢'
    },
    {
      id: 'ecommerce',
      title: 'Online Store',
      description: 'Sell products online with a complete e-commerce solution',
      icon: '🛒'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: 'Showcase your work, projects, or creative portfolio',
      icon: '🎨'
    },
    {
      id: 'blog',
      title: 'Blog/Content Site',
      description: 'Share your thoughts, expertise, or build a content platform',
      icon: '📝'
    },
    {
      id: 'nonprofit',
      title: 'Non-Profit',
      description: 'Website for your organization, cause, or community group',
      icon: '❤️'
    },
    {
      id: 'booking',
      title: 'Booking/Services',
      description: 'Allow clients to book appointments or services online',
      icon: '📅'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Something else in mind? Tell us about it!',
      icon: '💡'
    }
  ]

  return (
                    <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {goal.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {formData.websiteGoal === 'other' && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us more about your website goal
            </label>
            <textarea
              value={formData.businessInfo}
              onChange={(e) => updateFormData({ businessInfo: e.target.value })}
              placeholder="Describe what you want to achieve with your website..."
              className="form-textarea"
              rows={4}
            />
          </div>
        )}
      </div>
    )
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          What's the main goal of your website?
        </h2>
        <p className="text-gray-600">
          This helps us understand your needs and suggest the right features for your project.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => updateFormData({ websiteGoal: goal.id })}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              formData.websiteGoal === goal.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{goal.icon}</span>
              <div>
