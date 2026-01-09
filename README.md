# 🌱 DAAR - Vrijwilligersmanagement Platform

**Warme Zorg door Slimme Tech**

DAAR is een modern vrijwilligersmanagement platform dat organisaties helpt met werving, beheer en impactmeting. Van AI-matching tot welzijnsmonitoring - alles wat je nodig hebt om vrijwilligerswerk slimmer, leuker en duurzamer te maken.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

---

## ✨ Features

### 📊 Platform Modules
- **Smart Matching** - AI-gedreven matching tussen vrijwilligers en opdrachten
- **Centraal Dossier** - AVG-proof documentbeheer voor VOG's en contracten
- **Impact Dashboard** - Real-time analytics met SDG-koppeling
- **Vrijwilligers Check** - Welzijnsmonitoring met stoplicht-systeem
- **Declaratie App** - Automatische bonnetverwerking met OCR
- **Communicatie Hub** - Centrale inbox voor groepschats en updates

### 🎨 Website Features
- **Landing Page** - Hero, modules, testimonials en CTA's
- **Platform Pagina** - Complete workflow uitleg met 4-staps proces
- **Kennisbank** - Artikelen over vrijwilligersbeheer met zoeken en categorieën
- **VrijwilligersCheck Quiz** - Interactieve welzijnsmeting met radar chart
- **Over Ons** - Team, missie, visie en kernwaarden
- **Afspraak Boeken** - Calendly integratie voor demo's
- **Admin Dashboard** - CMS voor artikelen en afspraken

### 🚀 Tech Highlights
- **Next.js 16** - App Router met Server Components
- **TypeScript** - Type-safe development
- **Prisma** - Type-safe ORM met PostgreSQL (Neon)
- **Tailwind CSS** - Utility-first styling met custom design system
- **SEO Optimized** - Metadata, Open Graph, Schema.org structured data
- **AI Chat Widget** - Claude-powered assistent
- **Responsive Design** - Mobile-first approach

---

## 🏗️ Project Structure

```
daar-nextjs/
├── app/
│   ├── (admin)/              # Admin routes met eigen layout
│   │   ├── admin/
│   │   │   ├── login/        # Admin login
│   │   │   ├── artikelen/    # Artikel CMS
│   │   │   ├── afspraken/    # Afspraken beheer
│   │   │   └── quiz/         # Quiz resultaten
│   │   └── layout.tsx        # Admin layout
│   ├── (public)/             # Public routes met header/footer
│   │   ├── kennisbank/       # Kennisbank met artikelen
│   │   ├── platform/         # Platform uitleg pagina
│   │   ├── quiz/             # VrijwilligersCheck quiz
│   │   ├── over-ons/         # Over DAAR pagina
│   │   ├── afspraak/         # Booking widget
│   │   └── layout.tsx        # Public layout met nav/footer
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/
│   ├── platform/             # Platform page components
│   ├── kennisbank/           # Kennisbank components
│   ├── quiz/                 # Quiz components
│   ├── home/                 # Homepage components
│   ├── chat/                 # AI chat widget
│   ├── booking/              # Booking widget
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jouw-org/daar-nextjs.git
cd daar-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://..."

# Optional: Admin credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="..."

# Optional: OpenAI for chat
OPENAI_API_KEY="sk-..."
```

4. **Setup database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📄 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage met hero, modules en CTA's |
| `/platform` | Platform workflow uitleg (SEO optimized) |
| `/kennisbank` | Artikelen met zoeken en categorieën |
| `/quiz` | VrijwilligersCheck welzijnsmeting |
| `/over-ons` | Team, missie en visie |
| `/afspraak` | Demo booking met Calendly |
| `/admin` | CMS voor artikelen en afspraken |

---

## 🎨 Design System

### Colors
```css
--brandGreen: #3BA273      /* Primary green */
--brandGreenHover: #2d8a5f /* Hover state */
--lightGreen: #E8F5F0      /* Backgrounds */
--navy: #1A2332            /* Text & headers */
--offWhite: #FAFBFC        /* Page background */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Tracking**: Tight tracking voor headings

---

## 🔍 SEO Features

### Platform Page SEO
✅ **Title**: "Platform | Hoe werkt DAAR Vrijwilligersmanagement?"
✅ **Meta Description**: 150 karakters met keywords
✅ **Open Graph**: Facebook/LinkedIn optimized
✅ **Twitter Card**: Large image card
✅ **Schema.org**: SoftwareApplication structured data
✅ **Canonical URL**: https://daar.nl/platform
✅ **Semantic HTML**: `<article>`, `<section>`, proper headings
✅ **Keywords**: 10+ relevante zoektermen

### Technical SEO
- Server-side rendering (SSR)
- Automatic sitemap generation
- robots.txt configured
- Image optimization met Next.js Image
- Font optimization met next/font
- Responsive meta tags

---

## 📦 Database Schema

### Key Models
```prisma
model Article {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  content       String    @db.Text
  excerpt       String?
  featuredImage String?
  publishedAt   DateTime?
  status        Status    @default(DRAFT)
  category      Category  @relation(...)
  author        User      @relation(...)
}

model QuizResult {
  id               String   @id @default(cuid())
  email            String
  organisatie      String
  scores           Json     // Radar chart data
  recommendations  String[] // AI recommendations
  createdAt        DateTime @default(now())
}

model Appointment {
  id          String   @id @default(cuid())
  name        String
  email       String
  telefoon    String?
  organisatie String
  status      String   @default("pending")
  createdAt   DateTime @default(now())
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Add environment variables:
  - `DATABASE_URL`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
- Click **Deploy**

3. **Setup Neon Database**
- Create database at [neon.tech](https://neon.tech)
- Copy connection string to Vercel env vars
- Run Prisma migrations: `npx prisma db push`

### Custom Deployment
```bash
npm run build
npm start
```

---

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
```

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Desktop)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting
- **Images**: WebP with lazy loading

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📝 License

Copyright © 2025 DAAR B.V. Alle rechten voorbehouden.

---

## 🆘 Support

- **Email**: info@daar.nl
- **Website**: [daar.nl](https://daar.nl)
- **LinkedIn**: [DAAR](https://linkedin.com/company/samendaar)
- **Issues**: [GitHub Issues](https://github.com/jouw-org/daar-nextjs/issues)

---

## 🎯 Roadmap

- [ ] Multi-tenancy voor verschillende organisaties
- [ ] Native iOS/Android apps
- [ ] Advanced analytics dashboard
- [ ] WhatsApp Business integratie
- [ ] Automatische subsidieaanvraag generator
- [ ] AI-gedreven vrijwilliger retention predictor

---

**Made with ❤️ by the DAAR team** - Vrijwilligerswerk slimmer, leuker en duurzamer.
