# Contributing to DAAR

Bedankt voor je interesse om bij te dragen aan DAAR! We verwelkomen contributions van de community.

## 🚀 Getting Started

1. **Fork de repository**
2. **Clone je fork**
   ```bash
   git clone https://github.com/jouw-username/daar-nextjs.git
   cd daar-nextjs
   ```
3. **Installeer dependencies**
   ```bash
   npm install
   ```
4. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Vul je database credentials in
   ```
5. **Run development server**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branches

- `main` - Production branch (protected)
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Creating a Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/amazing-feature

# Make changes
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### Commit Messages

We volgen [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nieuwe feature
- `fix:` - Bug fix
- `docs:` - Documentatie
- `style:` - Code formatting (geen functionaliteit wijziging)
- `refactor:` - Code refactoring
- `test:` - Tests toevoegen
- `chore:` - Build process, dependencies

**Voorbeelden:**
```
feat: add VrijwilligersCheck quiz results export
fix: correct navigation menu mobile layout
docs: update README with deployment instructions
style: format platform page components
refactor: extract WorkflowStep component
test: add unit tests for quiz logic
chore: update dependencies to latest versions
```

## 🎨 Code Style

### TypeScript
- Gebruik TypeScript voor alle nieuwe files
- Define interfaces voor props
- Vermijd `any` types

### React Components
- Gebruik functional components met hooks
- Client components: `'use client'` directive
- Server components: geen directive (default)

### Naming Conventions
- **Components**: PascalCase (`PlatformFeature.tsx`)
- **Files**: kebab-case voor utilities (`format-date.ts`)
- **CSS Classes**: Tailwind utility classes

### File Structure
```tsx
// Imports
import { ... } from '...'

// Types
interface ComponentProps { ... }

// Main Component
export const Component = () => { ... }

// Helper Components (if any)
const HelperComponent = () => { ... }
```

## 🧪 Testing

Voordat je een PR indient:

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 📝 Pull Request Process

1. **Update documentatie** indien nodig
2. **Test je changes** lokaal
3. **Create Pull Request** naar `develop` branch
4. **Describe changes** duidelijk in de PR description
5. **Link related issues** met `Closes #123`

### PR Template

```markdown
## Beschrijving
Korte beschrijving van de wijzigingen

## Type wijziging
- [ ] Bug fix
- [ ] Nieuwe feature
- [ ] Breaking change
- [ ] Documentatie update

## Checklist
- [ ] Code volgt style guidelines
- [ ] Self-review gedaan
- [ ] Comments toegevoegd waar nodig
- [ ] Documentatie geüpdatet
- [ ] Geen nieuwe warnings
- [ ] Getest in development
```

## 🎯 Feature Requests

Feature requests zijn welkom! Open een issue met:
- **Titel**: Duidelijke beschrijving
- **Use case**: Waarom is dit nuttig?
- **Proposed solution**: Hoe zou je het implementeren?

## 🐛 Bug Reports

Found a bug? Help ons door een issue te openen met:
- **Titel**: Korte beschrijving van het probleem
- **To Reproduce**: Stappen om de bug te reproduceren
- **Expected behavior**: Wat zou er moeten gebeuren
- **Screenshots**: Indien van toepassing
- **Environment**: Browser, OS, etc.

## 📦 Dependencies

Nieuwe dependencies toevoegen:
```bash
npm install package-name
```

Update dependencies regelmatig:
```bash
npm update
```

## 🔒 Security

Vond je een security vulnerability? **Open GEEN public issue**.
Email in plaats daarvan naar: security@daar.nl

## ⚖️ License

Door bij te dragen ga je akkoord dat je contributions onder dezelfde license vallen als het project.

## 🙏 Questions?

Heb je vragen? Open een discussion in GitHub Discussions of stuur een email naar: dev@daar.nl

---

**Bedankt voor je bijdrage!** 🎉
