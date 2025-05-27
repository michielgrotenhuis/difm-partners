import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const prompt = `
Create a complete HTML webpage mockup for the following business:

Business: ${formData.businessName}
Description: ${formData.businessInfo}
Website Goal: ${formData.websiteGoal}
Design Style: ${formData.designStyle}
Features: ${formData.features.join(', ')}

Create a modern, responsive HTML page with:
1. Professional header with navigation
2. Hero section with compelling headline
3. About/Services section
4. Features or benefits section
5. Contact section
6. Footer

Requirements:
- Use Tailwind CSS classes for styling
- Make it responsive and modern
- Include realistic content based on the business description
- Match the design style preference (${formData.designStyle})
- Include placeholder images using https://images.unsplash.com/
- Add appropriate colors and styling for the business type

Return only clean HTML with embedded Tailwind styling.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert web designer who creates beautiful, responsive HTML mockups using Tailwind CSS."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 3000,
    })

    const htmlContent = completion.choices[0]?.message?.content

    if (!htmlContent) {
      throw new Error('No HTML content generated')
    }

    // Clean and enhance the HTML
    const cleanHtml = cleanAndEnhanceHtml(htmlContent, formData)

    // In a real implementation, you would save this to a file storage service
    // For now, we'll create a data URL or save to a temporary location
    const demoId = generateDemoId()
    const demoUrl = await saveDemoHtml(cleanHtml, demoId)

    return NextResponse.json({
      url: demoUrl,
      id: demoId,
      html: cleanHtml
    })

  } catch (error) {
    console.error('Error generating demo site:', error)
    
    // Return fallback demo
    const fallbackHtml = generateFallbackDemo(await request.json())
    const demoId = generateDemoId()
    const demoUrl = await saveDemoHtml(fallbackHtml, demoId)
    
    return NextResponse.json({
      url: demoUrl,
      id: demoId,
      html: fallbackHtml
    })
  }
}

function cleanAndEnhanceHtml(html: string, formData: any): string {
  // Remove any markdown formatting
  let cleanHtml = html.replace(/```html|```/g, '').trim()
  
  // Ensure proper HTML structure
  if (!cleanHtml.includes('<!DOCTYPE html>')) {
    cleanHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.businessName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${cleanHtml}
</body>
</html>`
  }
  
  // Add Tailwind CDN if not present
  if (!cleanHtml.includes('tailwindcss.com')) {
    cleanHtml = cleanHtml.replace(
      '</head>',
      '    <script src="https://cdn.tailwindcss.com"></script>\n</head>'
    )
  }
  
  return cleanHtml
}

function generateFallbackDemo(formData: any): string {
  const businessName = formData.businessName || 'Your Business'
  const businessInfo = formData.businessInfo || 'Professional services for your needs.'
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
    <!-- Header -->
    <header class="bg-blue-600 text-white">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold">${businessName}</h1>
                <nav class="hidden md:flex space-x-6">
                    <a href="#" class="hover:text-blue-200">Home</a>
                    <a href="#" class="hover:text-blue-200">About</a>
                    <a href="#" class="hover:text-blue-200">Services</a>
                    <a href="#" class="hover:text-blue-200">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to ${businessName}
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                ${businessInfo}
            </p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                Get Started
            </button>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
                Why Choose Us?
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Quality Service</h3>
                    <p class="text-gray-600">Professional quality you can trust</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
                    <p class="text-gray-600">Quick turnaround times</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Customer Focus</h3>
                    <p class="text-gray-600">Your satisfaction is our priority</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gray-50 py-20">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">
                Ready to Get Started?
            </h2>
            <p class="text-xl text-gray-600 mb-8">
                Contact us today to discuss your project
            </p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                Contact Us
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 ${businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
}

function generateDemoId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

async function saveDemoHtml(html: string, demoId: string): Promise<string> {
  // In a real implementation, you would save to cloud storage
  // For demo purposes, we'll create a data URL
  const base64Html = Buffer.from(html).toString('base64')
  return `data:text/html;base64,${base64Html}`
  
  // Real implementation might look like:
  // const fileName = `demo-${demoId}.html`
  // await uploadToS3(html, fileName)
  // return `https://your-bucket.s3.amazonaws.com/demos/${fileName}`
}
