import { FormData } from '../../request/page'
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep8({ formData, updateFormData }: Props) {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Contact Information
        </h2>
        <p className="text-gray-600">
          We'll use this information to contact you about your project and send you updates.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Full Name *
            </div>
          </label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
            placeholder="Enter your full name"
            className={`form-input ${
              formData.contactName && formData.contactName.length < 2
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : ''
            }`}
          />
          {formData.contactName && formData.contactName.length < 2 && (
            <p className="mt-1 text-sm text-red-600">Please enter your full name</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4" />
              Email Address *
            </div>
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => updateFormData({ contactEmail: e.target.value })}
            placeholder="your.email@example.com"
            className={`form-input ${
              formData.contactEmail && !isValidEmail(formData.contactEmail)
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : formData.contactEmail && isValidEmail(formData.contactEmail)
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                : ''
            }`}
          />
          {formData.contactEmail && !isValidEmail(formData.contactEmail) && (
            <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
          )}
          {formData.contactEmail && isValidEmail(formData.contactEmail) && (
            <p className="mt-1 text-sm text-green-600">✓ Valid email address</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              Phone Number (Optional)
            </div>
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => updateFormData({ contactPhone: e.target.value })}
            placeholder="+31 6 12345678"
            className={`form-input ${
              formData.contactPhone && !isValidPhone(formData.contactPhone)
                ? 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500'
                : formData.contactPhone && isValidPhone(formData.contactPhone)
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                : ''
            }`}
          />
          {formData.contactPhone && !isValidPhone(formData.contactPhone) && (
            <p className="mt-1 text-sm text-yellow-600">Please check your phone number format</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            We may call you to clarify project details or schedule a brief consultation
          </p>
        </div>

        {/* Contact Preferences */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Communication Preferences</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              Send me project updates via email
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              I'm available for a brief consultation call
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Send me design tips and web development insights
            </label>
          </div>
        </div>

        {/* Data Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Privacy & Data Protection</h3>
          <p className="text-sm text-blue-700">
            Your information is secure with us. We use your details only to contact you about your website project. 
            We never share your information with third parties and you can request deletion at any time.
          </p>
        </div>

        {/* Form Validation Summary */}
        {formData.contactName && formData.contactEmail && isValidEmail(formData.contactEmail) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium text-green-800">Ready to proceed!</h3>
            </div>
            <p className="text-sm text-green-700 mt-1">
              All required information has been provided. Click "Review & Submit" to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
