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

    // Basic domain validation - fixed regex
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
  // Simulate domain check with some common domains being taken
  const commonTakenDomains = [
    'google.com',
    'facebook.com',
    'amazon.com',
    'microsoft.com',
    'apple.com',
    'netflix.com',
    'test.com',
    'example.com',
    'github.com',
    'stackoverflow.com',
    'youtube.com',
    'linkedin.com',
    'twitter.com',
    'instagram.com'
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))

  // Return false if it's a commonly taken domain
  if (commonTakenDomains.includes(domain)) {
    return {
      available: false,
      registrar: 'Various',
      expiryDate: '2025-12-31'
    }
  }

  // Check for some specific patterns that should be unavailable
  if (domain.includes('google') || domain.includes('facebook') || domain.includes('amazon')) {
    return {
      available: false,
      registrar: 'Protected/Trademark'
    }
  }

  // Simulate different availability based on TLD
  const tld = domain.split('.').pop()
  let availabilityChance = 0.7 // 70% chance of being available by default

  switch (tld) {
    case 'com':
      availabilityChance = 0.4 // .com domains are more likely to be taken
      break
    case 'net':
      availabilityChance = 0.6
      break
    case 'org':
      availabilityChance = 0.7
      break
    case 'io':
      availabilityChance = 0.5
      break
    case 'co':
      availabilityChance = 0.6
      break
    default:
      availabilityChance = 0.8 // Less common TLDs more available
  }

  const isAvailable = Math.random() < availabilityChance

  if (isAvailable) {
    // Simulate pricing based on TLD
    const pricing = {
      'com': 12.99,
      'net': 14.99,
      'org': 13.99,
      'io': 39.99,
      'co': 29.99,
      'nl': 8.99,
      'eu': 9.99,
      'de': 7.99,
      'uk': 11.99
    }

    return {
      available: true,
      price: pricing[tld as keyof typeof pricing] || 15.99
    }
  } else {
    return {
      available: false,
      registrar: 'Private Registration'
    }
  }
}

function generateDomainSuggestions(originalDomain: string): string[] {
  const parts = originalDomain.split('.')
  if (parts.length < 2) return []
  
  const [name, tld] = parts
  const suggestions: string[] = []

  // Alternative TLDs
  const alternativeTlds = ['com', 'net', 'org', 'io', 'co', 'nl', 'eu']
  alternativeTlds.forEach(altTld => {
    if (altTld !== tld) {
      suggestions.push(`${name}.${altTld}`)
    }
  })

  // Name variations
  const variations = [
    `${name}app`,
    `${name}pro`,
    `${name}hub`,
    `${name}site`,
    `get${name}`,
    `my${name}`,
    `the${name}`,
    `${name}co`,
    `${name}hq`
  ]

  variations.forEach(variation => {
    suggestions.push(`${variation}.${tld}`)
    if (tld !== 'com') {
      suggestions.push(`${variation}.com`)
    }
  })

  // Remove duplicates and limit to 8 suggestions
  return [...new Set(suggestions)].slice(0, 8)
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain parameter is required' },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { error: 'Use POST method for domain checking' },
    { status: 405 }
  )
}
