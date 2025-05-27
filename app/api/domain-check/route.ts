import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json()

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      )
    }

    // Clean the domain input
    const cleanDomain = domain.toLowerCase().trim()

    // Basic domain validation - FIXED REGEX
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
    
    if (!domainRegex.test(cleanDomain)) {
      return NextResponse.json({
        domain: cleanDomain,
        available: false,
        error: 'Invalid domain format',
        suggestions: generateDomainSuggestions(cleanDomain)
      })
    }

    // Check domain availability
    const availabilityResult = await checkDomainAvailability(cleanDomain)

    return NextResponse.json({
      domain: cleanDomain,
      available: availabilityResult.available,
      checked: true,
      suggestions: availabilityResult.available ? [] : generateDomainSuggestions(cleanDomain),
      registrar: availabilityResult.registrar || null,
      price: availabilityResult.price || null
    })

  } catch (error) {
    console.error('Error checking domain:', error)
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    )
  }
}

interface DomainCheckResult {
  available: boolean
  registrar?: string
  price?: number
  expiryDate?: string
}

async function checkDomainAvailability(domain: string): Promise<DomainCheckResult> {
  const commonTakenDomains = [
    'google.com', 'facebook.com', 'amazon.com', 'microsoft.com',
    'apple.com', 'netflix.com', 'test.com', 'example.com'
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  if (commonTakenDomains.includes(domain)) {
    return { available: false, registrar: 'Various' }
  }

  // Simple availability simulation
  const isAvailable = Math.random() > 0.3

  if (isAvailable) {
    return { available: true, price: 12.99 }
  } else {
    return { available: false, registrar: 'Private Registration' }
  }
}

function generateDomainSuggestions(originalDomain: string): string[] {
  const parts = originalDomain.split('.')
  if (parts.length < 2) return []
  
  const [name] = parts
  const suggestions = [
    `${name}.net`,
    `${name}.org`,
    `${name}app.com`,
    `get${name}.com`
  ]

  return suggestions.slice(0, 4)
}

export async function GET() {
  return NextResponse.json(
    { error: 'Use POST method for domain checking' },
    { status: 405 }
  )
}
