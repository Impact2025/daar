'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Linkedin, Facebook, Instagram } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

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

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/platform', label: 'Platform' },
  { href: '/kennisbank', label: 'Kennisbank' },
  { href: '/quiz', label: 'Geluksmonitor' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
]

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo className="h-7" color="#2D334A" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive(link.href)
                      ? 'text-brandGreen font-medium'
                      : 'text-gray-600 hover:text-brandGreen'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreenHover transition-colors"
              >
                Inloggen
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-brandGreen transition-colors"
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'bg-lightGreen text-brandGreen font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brandGreen'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-brandGreen text-white rounded-lg text-center font-medium hover:bg-brandGreenHover transition-colors"
                >
                  Inloggen
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
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

            {/* Kennisbank */}
            <div>
              <h3 className="font-semibold mb-4">Kennisbank</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/kennisbank" className="hover:text-white transition-colors">
                    Alle artikelen
                  </Link>
                </li>
                <li>
                  <Link href="/kennisbank/categorie/vrijwilligersbeheer" className="hover:text-white transition-colors">
                    Vrijwilligersbeheer
                  </Link>
                </li>
                <li>
                  <Link href="/kennisbank/categorie/impact-meten" className="hover:text-white transition-colors">
                    Impact Meten
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="mailto:info@daar.nl" className="hover:text-white transition-colors">
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

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} DAAR. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
