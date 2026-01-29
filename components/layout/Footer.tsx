import Link from 'next/link'
import { Linkedin, Facebook, Instagram } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { prisma } from '@/lib/prisma'

// X (Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialLinks = [
  { name: 'X', href: 'https://x.com/SamenDaar', icon: XIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/samendaar/', icon: Linkedin },
  { name: 'Facebook', href: 'https://www.facebook.com/samendaar', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/samendaar/', icon: Instagram },
]

async function getTopCategories() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
      articles: {
        some: {
          status: 'PUBLISHED'
        }
      }
    },
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          articles: { where: { status: 'PUBLISHED' } }
        }
      }
    },
    orderBy: { sortOrder: 'asc' },
    take: 3,
  })

  return categories
}

export async function Footer() {
  const topCategories = await getTopCategories()

  return (
    <footer className="bg-daar-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Logo className="h-6" color="white" />
            </Link>
            <p className="text-gray-300 mb-4">
              Warme Zorg door Slimme Tech. Wij helpen vrijwilligersorganisaties
              met het professionaliseren van hun vrijwilligersbeheer.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              10% van onze winst gaat naar de Impact Reserve
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-brandGreen hover:text-white transition-colors"
                  aria-label={`Volg DAAR op ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/platform" className="hover:text-white transition-colors">
                  Hoe het werkt
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="hover:text-white transition-colors">
                  Over DAAR
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Geluksmonitor
                </Link>
              </li>
            </ul>
          </div>

          {/* Kennisbank - Dynamische categorieën */}
          <div>
            <h3 className="font-semibold mb-4">Kennisbank</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/kennisbank" className="hover:text-white transition-colors">
                  Alle artikelen
                </Link>
              </li>
              {topCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/kennisbank/categorie/${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="mailto:info@daar.nl"
                  className="hover:text-white transition-colors"
                  rel="noopener noreferrer"
                >
                  info@daar.nl
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contactpagina
                </Link>
              </li>
              <li>
                <Link href="/afspraak" className="hover:text-white transition-colors">
                  Plan een gesprek
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} DAAR. Alle rechten voorbehouden.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/voorwaarden" className="hover:text-white transition-colors">
                Voorwaarden
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
