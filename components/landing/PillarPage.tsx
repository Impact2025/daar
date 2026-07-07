import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export interface PillarFAQ {
  q: string
  a: string
}

export interface PillarBlogLink {
  href: string
  title: string
  desc: string
}

export interface PillarSection {
  icon: React.ReactNode
  title: string
  body: React.ReactNode
}

interface PillarPageProps {
  eyebrow: string
  title: string
  subtitle: string
  heroIcon: React.ReactNode
  cta: { href: string; label: string }
  ctaSecondary?: { href: string; label: string }
  sections: PillarSection[]
  blogs: PillarBlogLink[]
  faqs: PillarFAQ[]
  canonical: string
}

export function PillarPage({
  eyebrow,
  title,
  subtitle,
  heroIcon,
  cta,
  ctaSecondary,
  sections,
  blogs,
  faqs,
  canonical,
}: PillarPageProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://daar.nl/' },
      { '@type': 'ListItem', position: 2, name: eyebrow, item: canonical },
    ],
  }
  return (
    <div className="min-h-screen bg-white text-daar-blue">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-brandGreen/10 via-daar-helder to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-brandGreen">
              {heroIcon}
              {eyebrow}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-navy">
              {title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center gap-2 bg-brandGreen text-white font-bold px-7 py-3.5 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/10 transform hover:-translate-y-0.5"
              >
                {cta.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 text-navy font-semibold px-7 py-3.5 rounded-xl hover:bg-white transition-colors"
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Clusters / sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brandGreen/10 flex items-center justify-center text-brandGreen">
                  {s.icon}
                </div>
                <h2 className="text-xl font-bold text-navy">{s.title}</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-3">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related blog posts */}
      <section className="bg-daar-helder py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-navy mb-8">
            Dieper ingaan op {eyebrow.toLowerCase()}? Lees onze blogs
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {blogs.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <h3 className="font-bold text-navy group-hover:text-brandGreen transition-colors">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{b.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brandGreen">
                  Lees blog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + JSON-LD */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-navy mb-8">
          Veelgestelde vragen
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-100 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-navy">
                {f.q}
                <span className="text-brandGreen text-xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Klaar om jouw vrijwilligersbeleid naar het volgende niveau te tillen?
          </h2>
          <p className="mt-3 text-daar-helder/80">
            Doe de gratis VrijwilligersCheck en krijg in 10 minuten inzicht in je
            sterke en zwakke punten.
          </p>
          <Link
            href="/vrijwilligerscheck"
            className="mt-7 inline-flex items-center justify-center gap-2 bg-brandGreen text-white font-bold px-8 py-3.5 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/20"
          >
            Start de VrijwilligersCheck
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  )
}
