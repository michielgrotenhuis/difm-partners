import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { businessName, goal } = await request.json()

    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
        { status: 400 }
      )
    }

    const prompt = `
Generate a professional business description for a website based on this information:

Business Name: ${businessName}
Website Goal: ${goal}

Create a compelling 2-3 paragraph description that includes:
1. What the business does
2. Target audience
3. Key value propositions
4. What makes them unique

Keep it professional but engaging, suitable for a business website's about section.
Focus on benefits to customers and avoid generic language.
Make it sound authentic and specific to the business type suggested by the name.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter who creates compelling business descriptions for websites. Write in a professional but approachable tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    const suggestions = completion.choices[0]?.message?.content

    if (!suggestions) {
      throw new Error('No suggestions generated')
    }

    return NextResponse.json({
      suggestions: suggestions.trim()
    })

  } catch (error) {
    console.error('Error generating suggestions:', error)
    
    // Return fallback suggestions
    const fallbackSuggestions = generateFallbackSuggestions(await request.json())
    return NextResponse.json({
      suggestions: fallbackSuggestions
    })
  }
}

function generateFallbackSuggestions({ businessName, goal }: { businessName: string, goal: string }): string {
  const templates = {
    business: `${businessName} is a professional service provider dedicated to delivering exceptional results for our clients. We specialize in innovative solutions that help businesses grow and succeed in today's competitive market.

Our experienced team combines industry expertise with personalized service to ensure every client receives the attention and quality they deserve. We're committed to building long-term relationships based on trust, reliability, and outstanding results.`,
    
    ecommerce: `${businessName} is your trusted online destination for high-quality products and exceptional customer service. We carefully curate our selection to bring you the best value and latest trends in the market.

With secure shopping, fast shipping, and dedicated customer support, we make online shopping easy and enjoyable. Our commitment to quality and customer satisfaction has made us a preferred choice for thousands of satisfied customers.`,
    
    portfolio: `${businessName} showcases creative excellence and professional expertise through innovative design and artistic vision. Our portfolio represents years of experience and a passion for creating meaningful, impactful work.

We believe in the power of visual storytelling and strive to create designs that not only look beautiful but also communicate effectively with your target audience. Every project is approached with creativity, attention to detail, and professional dedication.`,
    
    default: `${businessName} is dedicated to providing exceptional service and value to our clients. We combine professional expertise with personalized attention to deliver results that exceed expectations.

Our commitment to quality, innovation, and customer satisfaction sets us apart in the industry. We're passionate about what we do and take pride in helping our clients achieve their goals.`
  }

  return templates[goal as keyof typeof templates] || templates.default
}
