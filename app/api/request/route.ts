import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
 
const prisma = new PrismaClient()

const requestSchema = z.object({
  businessName: z.string().min(1),
  businessInfo: z.string().min(10),
  websiteGoal: z.string().min(1),
  features: z.array(z.string()),
  hasContent: z.boolean(),
  designStyle: z.string().min(1),
  designReferences: z.array(z.string()).optional(),
  domainName: z.string().optional(),
  budget: z.number().min(500),
  timeline: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  aiQuote: z.any().optional(),
  demoUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    const websiteRequest = await prisma.websiteRequest.create({
      data: {
        businessName: validatedData.businessName,
        businessInfo: validatedData.businessInfo,
        websiteGoal: validatedData.websiteGoal,
        features: validatedData.features,
        hasContent: validatedData.hasContent,
        designStyle: validatedData.designStyle,
        designReferences: validatedData.designReferences || [],
        domainName: validatedData.domainName || '',
        budget: validatedData.budget,
        timeline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone || '',
        aiSummary: JSON.stringify(validatedData),
        aiQuote: validatedData.aiQuote || null,
        aiDemoUrl: validatedData.demoUrl || '',
      },
    })

    // Send notification email (you would implement this)
    await sendNotificationEmail(websiteRequest)

    return NextResponse.json({ 
      success: true, 
      requestId: websiteRequest.id 
    })

  } catch (error) {
    console.error('Error creating website request:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendNotificationEmail(request: any) {
  // Implement email notification logic here
  // You could use services like Resend, SendGrid, or Nodemailer
  console.log('New website request:', request.id)
  
  // Example implementation:
  // await emailService.send({
  //   to: 'admin@difm-websites.com',
  //   subject: `New Website Request: ${request.businessName}`,
  //   html: generateEmailTemplate(request)
  // })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }

    const websiteRequest = await prisma.websiteRequest.findUnique({
      where: { id }
    })

    if (!websiteRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(websiteRequest)

  } catch (error) {
    console.error('Error fetching website request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
