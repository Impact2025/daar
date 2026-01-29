'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const navLinks = [
  { href: '/platform', label: 'Platform' },
  { href: '/quiz', label: 'Geluksmonitor' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
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
              className="text-gray-600 hover:text-brandGreen transition-colors font-medium"
            >
              Inloggen
            </Link>
            <Link
              href="/afspraak"
              className="px-6 py-2.5 bg-brandGreen text-white rounded-lg hover:bg-brandGreenHover transition-colors font-semibold shadow-sm"
            >
              Plan gesprek
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
            <div className="pt-2 mt-2 border-t border-gray-100 space-y-2">
              <Link
                href="/afspraak"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-brandGreen text-white rounded-lg text-center font-semibold hover:bg-brandGreenHover transition-colors"
              >
                Plan gesprek
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-center font-medium transition-colors"
              >
                Inloggen
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
