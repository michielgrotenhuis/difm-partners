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
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-ghost">Sign in</button>
              <Link href="/request" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 lg:py-28">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <span className="badge-primary">✨ AI-Powered Website Creation</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Your Website,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Done For You
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Skip the complexity. Get a professional, custom website built for your business 
                with AI assistance and expert craftsmanship. No technical knowledge required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/request" className="btn-primary-lg group">
                  <RocketLaunchIcon className="w-5 h-5 mr-2 group-hover:translate-x-0.5 transition-transform" />
                  Start Your Website Request
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                <button className="btn-ghost group">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  14-day money back
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose DIFM?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine AI intelligence with human expertise to deliver websites that work
            </p>
          </motion.div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg p-6 text-center transition-all duration-300 group"
              >
                <div className={`w-12 h-12 mx-auto mb-4 p-3 rounded-xl group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to get your website done
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Tell Us About Your Business',
                description: 'Fill out our smart questionnaire with AI assistance to help define your needs and goals.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Get Your Quote & Preview',
                description: 'Receive an AI-generated quote and optional demo preview of your website concept.',
                icon: '💡'
              },
              {
                step: '03',
                title: 'We Build Your Website',
                description: 'Our team creates your professional website and delivers it in 2-3 weeks with regular updates.',
                icon: '🚀'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center h-full">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-gray-300">
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 absolute -top-2 right-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join hundreds of businesses who trust us with their online presence. 
              Get your professional website in just 2-3 weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request" className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 group">
                <RocketLaunchIcon className="w-5 h-5 mr-2 group-hover:translate-x-0.5 transition-transform" />
                Start Your Website Request
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-4 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white rounded-lg font-medium transition-colors">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">DIFM</h3>
                <p className="text-gray-400 mb-4">
                  Professional websites done for you with AI assistance and expert craftsmanship.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
              © 2024 DIFM. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
