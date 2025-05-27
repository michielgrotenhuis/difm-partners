'use client'

import Link from 'next/link'
import { 
  RocketLaunchIcon, 
  SparklesIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Design',
      description: 'Smart content generation and design suggestions tailored to your business'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Fast Delivery',
      description: 'Get your website delivered in 2-3 weeks with regular updates'
    },
    {
      icon: ClockIcon,
      title: 'No Hassle',
      description: 'Just fill out our smart questionnaire and we handle the rest'
    },
    {
      icon: CheckCircleIcon,
      title: 'Professional Quality',
      description: 'Hand-crafted by experienced developers and designers'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section" style={{ 
        background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Website,{' '}
              <span className="bg-gradient-to-r">
                Done For You
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Skip the complexity. Get a professional, custom website built for your business 
              with AI assistance and expert craftsmanship. No technical knowledge required.
            </p>
            <Link href="/request" className="btn-primary">
              <RocketLaunchIcon className="w-5 h-5" />
              Start Your Website Request
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DIFM?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine AI intelligence with human expertise to deliver websites that work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your website done
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell Us About Your Business',
                description: 'Fill out our smart questionnaire with AI assistance'
              },
              {
                step: '02',
                title: 'Get Your Quote & Preview',
                description: 'Receive an AI-generated quote and demo preview'
              },
              {
                step: '03',
                title: 'We Build Your Website',
                description: 'Our team creates your professional website in 2-3 weeks'
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-blue-600">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of businesses who trust us with their online presence
            </p>
            <Link 
              href="/request" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'white',
                color: '#2563eb',
                fontWeight: '600',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontSize: '1.125rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Start Your Website Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
