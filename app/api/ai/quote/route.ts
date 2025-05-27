import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Generate a simple quote based on form data
    const quote = generateQuote(formData)

    return NextResponse.json(quote)

  } catch (error) {
    console.error('Error generating quote:', error)
    
    // Return fallback quote on error
    const fallbackQuote = {
      estimatedPrice: { min: 1000, max: 1500 },
      deliveryTime: '2-3 weeks',
      complexity: 'moderate' as const,
      breakdown: {
        design: 400,
        development: 500,
        content: 200,
        features: 100
      },
      recommendations: [
        'Mobile-first design approach recommended',
        'SEO optimization will improve visibility',
        'Professional copywriting enhances conversion'
      ]
    }
    
    return NextResponse.json(fallbackQuote)
  }
}

function generateQuote(formData: any) {
  const basePrice = 800
  const featureCount = formData.features?.length || 3
  const featureMultiplier = featureCount * 150
  
  // Calculate complexity
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple'
  if (formData.websiteGoal === 'ecommerce' || featureCount > 8) {
    complexity = 'complex'
  } else if (featureCount > 5) {
    complexity = 'moderate'
  }
  
  // Calculate pricing
  const complexityMultiplier = complexity === 'complex' ? 1.8 : complexity === 'moderate' ? 1.3 : 1.0
  const estimatedMin = Math.max(500, Math.round(basePrice + featureMultiplier * complexityMultiplier))
  const estimatedMax = Math.round(estimatedMin * 1.5)

  // Generate timeline
  let deliveryTime = '2-3 weeks'
  if (formData.timeline === '1-2weeks') {
    deliveryTime = '1-2 weeks'
  } else if (complexity === 'complex') {
    deliveryTime = '4-6 weeks'
  }

  // Create breakdown
  const breakdown = {
    design: Math.round(estimatedMin * 0.3),
    development: Math.round(estimatedMin * 0.4),
    content: Math.round(estimatedMin * 0.2),
    features: Math.round(estimatedMin * 0.1)
  }

  // Generate recommendations
  const recommendations = []
  if (!formData.features?.includes('seo')) {
    recommendations.push('Add SEO optimization to improve search visibility')
  }
  if (!formData.features?.includes('analytics')) {
    recommendations.push('Include analytics tracking to monitor performance')
  }
  if (!formData.hasContent) {
    recommendations.push('Professional copywriting will improve conversion rates')
  }
  recommendations.push('Mobile-first design approach recommended')

  return {
    estimatedPrice: { min: estimatedMin, max: estimatedMax },
    deliveryTime,
    complexity,
    breakdown,
    recommendations: recommendations.slice(0, 4)
  }
}
