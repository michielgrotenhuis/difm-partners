'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  RocketLaunchIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Design',
      description: 'Smart content generation and design suggestions tailored to your business',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Fast Delivery',
      description: 'Get your website delivered in 2-3 weeks with regular updates',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: ClockIcon,
      title: 'No Hassle',
      description: 'Just fill out our smart questionnaire and we handle the rest',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: CheckCircleIcon,
      title: 'Professional Quality',
      description: 'Hand-crafted by experienced developers and designers',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const stats = [
    { value: '500+', label: 'Websites Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '2-3', label: 'Weeks Average Delivery' },
    { value: '24/7', label: 'Support Available' }
  ]

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DIFM
                </h1>
              </div>
              <div className="hidden md:flex space-x-6">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="btn-ghost">Sign in</Link>
              <Link href="/request" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Additional sections like Hero, Features, Stats, How It Works, CTA, Footer would follow here, unchanged */}
    </div>
  )
}
