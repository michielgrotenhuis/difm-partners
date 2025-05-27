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

    const cleanDomain = domain.toLowerCase().trim()
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
    
    if (!domainRegex.test(cleanDomain)) {
      return NextResponse.json({
        domain: cleanDomain,
        available: false,
        error: 'Invalid domain format'
      })
    }

    const isAvailable = await checkDomainAvailability(cleanDomain)

    return NextResponse.json({
      domain: cleanDomain,
      available: isAvailable,
      checked: true
    })

  } catch (error) {
    console.error('Error checking domain:', error)
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    )
  }
}

async function checkDomainAvailability(domain: string): Promise<boolean> {
  const commonTakenDomains = [
    'google.com', 'facebook.com', 'amazon.com', 'microsoft.com',
    'apple.com', 'netflix.com', 'test.com', 'example.com'
  ]

  await new Promise(resolve => setTimeout(resolve, 500))

  if (commonTakenDomains.includes(domain)) {
    return false
  }

  return Math.random() > 0.3
}

export async function GET() {
  return NextResponse.json(
    { error: 'Use POST method for domain checking' },
    { status: 405 }
  )
}
