# DIFM Website Request Flow

A smart, AI-powered website request system built with Next.js, React, and OpenAI.

## Features

- 🧙‍♂️ **Smart Questionnaire Wizard** - 8-step guided form with conditional logic
- 🤖 **AI Integration** - Content generation, quote estimation, and demo site creation
- 🎨 **Modern UI** - Built with Tailwind CSS and Framer Motion animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔍 **Domain Checker** - Real-time domain availability checking
- 💰 **AI Quote Generation** - Intelligent project estimation
- 🌐 **Demo Site Preview** - AI-generated website mockups
- 💾 **Database Integration** - PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel
- **Storage**: PostgreSQL (Supabase recommended)

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fdifm-website-request)

## Manual Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd difm-website-request
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/difm_db"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Next.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Deployment on Vercel

### Step 1: Database Setup

1. Create a PostgreSQL database (recommended: [Supabase](https://supabase.com))
2. Get your database connection string

### Step 2: Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your project to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
4. Deploy!

### Step 3: Post-Deployment

1. Run database migrations:
   ```bash
   npx prisma db push
   ```

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── ai/             # AI-powered endpoints
│   │   ├── domain-check/   # Domain availability
│   │   └── request/        # Main request handling
│   ├── components/         # React components
│   │   └── wizard/         # Wizard step components
│   ├── request/           # Request wizard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── prisma/
│   └── schema.prisma      # Database schema
├── public/               # Static assets
└── README.md
```

## Key Features Explained

### Smart Questionnaire Wizard

The 8-step wizard collects comprehensive information:
1. **Website Goal** - Business type and objectives
2. **Business Info** - Company details with AI suggestions
3. **Features** - Required functionality selection
4. **Content** - File upload or AI generation
5. **Design** - Style preferences and references
6. **Domain** - Name preferences with availability check
7. **Budget & Timeline** - Project scope estimation
8. **Contact** - Client information collection

### AI Integration

- **Content Suggestions**: GPT-4 generates business descriptions
- **Quote Generation**: Intelligent pricing based on complexity
- **Demo Sites**: AI creates HTML mockups with Tailwind CSS
- **Feature Recommendations**: Smart suggestions based on business type

### API Endpoints

- `POST /api/request` - Create new website request
- `POST /api/ai/quote` - Generate AI-powered project quote
- `POST /api/ai/demo` - Create demo website mockup
- `POST /api/ai/suggestions` - Generate business content
- `POST /api/domain-check` - Check domain availability

## Customization

### Adding New Features

1. Update the features list in `WizardStep3.tsx`
2. Modify the quote calculation logic in `/api/ai/quote`
3. Update the database schema if needed

### Styling

The project uses Tailwind CSS. Customize the design by:
1. Modifying `tailwind.config.js`
2. Updating component styles
3. Changing the color scheme in `globals.css`

### AI Prompts

Customize AI behavior by editing prompts in:
- `/api/ai/quote/route.ts` - Quote generation
- `/api/ai/demo/route.ts` - Demo site creation
- `/api/ai/suggestions/route.ts` - Content suggestions

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@difm-websites.com or create an issue in the repository.
