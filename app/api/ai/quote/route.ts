import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const prompt = `
You are a website development consultant. Based on the following project requirements, generate a detailed quote and analysis.

Project Details:
- Business: ${formData.businessName}
- Goal: ${formData.websiteGoal}
- Features: ${formData.features.join(', ')}
- Design Style: ${formData.designStyle}
- Budget Range: €${formData.budget}
- Timeline: ${formData.timeline}
- Has Content: ${formData.hasContent}

Please provide a JSON response with:
1. estimatedPrice: {min: number, max: number} (in euros)
2. deliveryTime: string (e.g., "2-3 weeks")
3. complexity: "simple" | "moderate" | "complex"
4. breakdown: {design: number, development: number, content: number, features: number}
5. recommendations: string[] (3-5 recommendations)

Consider:
- More features = higher complexity and cost
- E-commerce adds significant complexity
- Content creation time if needed
- Design complexity based on style choice
- Timeline constraints may affect pricing

Be realistic with pricing for the European market.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert website development consultant who provides accurate project estimates and recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    let quote
    try {
      quote = JSON.parse(aiResponse)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      quote = generateFallbackQuote(formData)
    }

    // Validate and adjust the quote
    quote = validateAndAdjustQuote(quote, formData)

    return NextResponse.json(quote)

  } catch (error) {
    console.error('Error generating AI quote:', error)
    
    // Return fallback quote on error
    const fallbackQuote = generateFallbackQuote(await request.json())
    return NextResponse.json(fallbackQuote)
  }
}

function generateFallbackQuote(formData: any) {
  const basePrice = 800
  const featureMultiplier = formData.features.length * 150
  const complexityMultiplier = getComplexityMultiplier(formData.websiteGoal, formData.features)
  
  const estimatedMin = Math.max(500, basePrice + featureMultiplier * complexityMultiplier)
  const estimatedMax = estimatedMin * 1.5

  return {
    estimatedPrice: {
      min: Math.round(estimatedMin),
      max: Math.round(estimatedMax)
    },
    deliveryTime: getDeliveryTime(formData.timeline, formData.features.length),
    complexity: getComplexity(formData.features, formData.websiteGoal),
    breakdown: {
      design: Math.round(estimatedMin * 0.3),
      development: Math.round(estimatedMin * 0.4),
      content: Math.round(estimatedMin * 0.2),
      features: Math.round(estimatedMin * 0.1)
    },
    recommendations: getRecommendations(formData)
  }
}

function getComplexityMultiplier(goal: string, features: string[]) {
  if (goal === 'ecommerce' || features.includes('ecommerce')) return 1.8
  if (features.includes('booking') || features.includes('membership')) return 1.5
  if (features.length > 6) return 1.3
  return 1.0
}

function getDeliveryTime(timeline: string, featuresCount: number) {
  if (timeline === '1-2weeks') return '1-2 weeks'
  if (featuresCount > 8 || timeline === '2months') return '4-6 weeks'
  return '2-3 weeks'
}

function getComplexity(features: string[], goal: string): 'simple' | 'moderate' | 'complex' {
  if (goal === 'ecommerce' || features.includes('ecommerce') || features.length > 8) {
    return 'complex'
  }
  if (features.length > 5 || features.includes('booking') || features.includes('membership')) {
    return 'moderate'
  }
  return 'simple'
}

function getRecommendations(formData: any): string[] {
  const recommendations = []
  
  if (!formData.features.includes('seo')) {
    recommendations.push('Add SEO optimization to improve search engine visibility')
  }
  
  if (!formData.features.includes('analytics')) {
    recommendations.push('Include analytics tracking to monitor website performance')
  }
  
  if (formData.websiteGoal === 'business' && !formData.features.includes('testimonials')) {
    recommendations.push('Consider adding customer testimonials to build trust')
  }
  
  if (!formData.hasContent) {
    recommendations.push('Professional copywriting will significantly improve conversion rates')
  }
  
  recommendations.push('Mobile-first design approach recommended for better user experience')
  
  return recommendations.slice(0, 4)
}

function validateAndAdjustQuote(quote: any, formData: any) {
  // Ensure minimum viable pricing
  if (quote.estimatedPrice.min < 500) {
    quote.estimatedPrice.min = 500
  }
  
  if (quote.estimatedPrice.max < quote.estimatedPrice.min * 1.2) {
    quote.estimatedPrice.max = quote.estimatedPrice.min * 1.5
  }
  
  // Ensure breakdown adds up roughly to minimum price
  const breakdownTotal = Object.values(quote.breakdown).reduce((a: any, b: any) => a + b, 0)
  if (Math.abs(breakdownTotal - quote.estimatedPrice.min) > quote.estimatedPrice.min * 0.3) {
    const ratio = quote.estimatedPrice.min / breakdownTotal
    Object.keys(quote.breakdown).forEach(key => {
      quote.breakdown[key] = Math.round(quote.breakdown[key] * ratio)
    })
  }
  
  return quote
}
