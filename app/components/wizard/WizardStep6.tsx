import { useState } from 'react'
import { FormData } from '../../request/page'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WizardStep6({ formData, updateFormData }: Props) {
  const [isChecking, setIsChecking] = useState(false)
  const [domainStatus, setDomainStatus] = useState<'available' | 'taken' | 'invalid' | null>(null)

  const checkDomain = async (domain: string) => {
    if (!domain) return
    
    setIsChecking(true)
    setDomainStatus(null)
    
    try {
      const response = await fetch('/api/domain-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      })
      
      const data = await response.json()
      setDomainStatus(data.available ? 'available' : 'taken')
    } catch (error) {
      setDomainStatus('invalid')
    } finally {
      setIsChecking(false)
    }
  }

  const handleDomainChange = (value: string) => {
    updateFormData({ domainName: value })
    setDomainStatus(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Domain Name Preference
        </h2>
        <p className="text-gray-600">
          What domain name would you like for your website? We can help you register it or you can use an existing one.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Domain Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.domainName}
              onChange={(e) => handleDomainChange(e.target.value)}
              placeholder="yourwebsite.com"
              className="form-input flex-1"
            />
            <button
              onClick={() => checkDomain(formData.domainName)}
              disabled={!formData.domainName || isChecking}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              {isChecking ? 'Checking...' : 'Check'}
            </button>
          </div>
          
          {domainStatus && (
            <div className={`mt-2 p-3 rounded-lg ${
              domainStatus === 'available' 
                ? 'bg-green-50 border border-green-200 text-green-700'
                : domainStatus === 'taken'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
            }`}>
              {domainStatus === 'available' && '✅ Domain is available!'}
              {domainStatus === 'taken' && '❌ Domain is already taken'}
              {domainStatus === 'invalid' && '⚠️ Please enter a valid domain name'}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Domain Options</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• We can register a new domain for you</li>
            <li>• Transfer your existing domain to our hosting</li>
            <li>• Keep your domain with current provider and point it to us</li>
            <li>• Use a free subdomain while you decide</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
