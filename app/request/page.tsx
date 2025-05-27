]

  const currentStepData = steps.find(step => step.id === currentStep)
  const CurrentStepComponent = currentStepData?.component

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Show summary
      setCurrentStep(totalSteps + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.websiteGoal.length > 0
      case 2:
        return formData.businessInfo.length > 10 && formData.businessName.length > 0
      case 3:
        return formData.features.length > 0
      case 4:
        return true // Optional step
      case 5:
        return formData.designStyle.length > 0
      case 6:
        return true // Optional step
      case 7:
        return formData.budget > 0 && formData.timeline.length > 0
      case 8:
        return formData.contactName.length > 0 && formData.contactEmail.length > 0
      default:
        return true
    }
  }

  if (currentStep > totalSteps) {
    return <WizardSummary formData={formData} onBack={() => setCurrentStep(totalSteps)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Website Request Wizard
            </h1>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {CurrentStepComponent && (
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps ? 'Review & Submit' : 'Next'}
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  SparklesIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  CurrencyEuroIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import WizardStep1 from '../components/wizard/WizardStep1'
import WizardStep2 from '../components/wizard/WizardStep2'
import WizardStep3 from '../components/wizard/WizardStep3'
import WizardStep4 from '../components/wizard/WizardStep4'
import WizardStep5 from '../components/wizard/WizardStep5'
import WizardStep6 from '../components/wizard/WizardStep6'
import WizardStep7 from '../components/wizard/WizardStep7'
import WizardStep8 from '../components/wizard/WizardStep8'
import WizardSummary from '../components/wizard/WizardSummary'

export interface FormData {
  websiteGoal: string
  businessInfo: string
  businessName: string
  features: string[]
  hasContent: boolean
  contentFiles: File[]
  designStyle: string
  designReferences: string[]
  domainName: string
  budget: number
  timeline: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export default function RequestWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    websiteGoal: '',
    businessInfo: '',
    businessName: '',
    features: [],
    hasContent: false,
    contentFiles: [],
    designStyle: '',
    designReferences: [],
    domainName: '',
    budget: 1000,
    timeline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  })

  const totalSteps = 8
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { 
      id: 1, 
      title: 'Website Goal', 
      icon: SparklesIcon,
      component: WizardStep1 
    },
    { 
      id: 2, 
      title: 'Business Info', 
      icon: DocumentTextIcon,
      component: WizardStep2 
    },
    { 
      id: 3, 
      title: 'Features', 
      icon: SparklesIcon,
      component: WizardStep3 
    },
    { 
      id: 4, 
      title: 'Content', 
      icon: DocumentTextIcon,
      component: WizardStep4 
    },
    { 
      id: 5, 
      title: 'Design', 
      icon: PaintBrushIcon,
      component: WizardStep5 
    },
    { 
      id: 6, 
      title: 'Domain', 
      icon: SparklesIcon,
      component: WizardStep6 
    },
    { 
      id: 7, 
      title: 'Budget & Timeline', 
      icon: CurrencyEuroIcon,
      component: WizardStep7 
    },
    { 
      id: 8, 
      title: 'Contact Info', 
      icon: UserIcon,
      component: WizardStep8 
    }
