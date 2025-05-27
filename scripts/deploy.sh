#!/bin/bash

# DIFM Website Request - Deployment Script
echo "🚀 Starting deployment process..."

# Check if required environment variables are set
if [[ -z "$DATABASE_URL" ]]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

if [[ -z "$OPENAI_API_KEY" ]]; then
    echo "❌ ERROR: OPENAI_API_KEY environment variable is not set"
    exit 1
fi

echo "✅ Environment variables verified"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma db push

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Deployment preparation complete!"
echo ""
echo "🌟 Your DIFM Website Request application is ready!"
echo ""
echo "Next steps for Vercel deployment:"
echo "1. Push your code to GitHub/GitLab/Bitbucket"
echo "2. Connect your repository to Vercel"
echo "3. Add environment variables in Vercel dashboard:"
echo "   - DATABASE_URL"
echo "   - OPENAI_API_KEY"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo "4. Deploy!"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
