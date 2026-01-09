'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Send,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Headphones,
  Users,
  Sparkles,
  Building2,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// FAQ data
const faqCategories = [
  {
    category: 'Over DAAR',
    questions: [
      {
        q: 'Wat is DAAR precies?',
        a: 'DAAR is een platform dat vrijwilligerswerk slimmer, leuker en duurzamer maakt. Wij helpen organisaties bij het vinden, waarderen, behouden en verbinden van vrijwilligers met onze unieke Geluksmomenten Formule.',
      },
      {
        q: 'Voor wie is DAAR geschikt?',
        a: 'DAAR is geschikt voor alle vrijwilligersorganisaties, van kleine lokale stichtingen tot grote landelijke organisaties. Of je nu 10 of 10.000 vrijwilligers hebt, wij kunnen je helpen.',
      },
      {
        q: 'Wat maakt DAAR anders dan andere platforms?',
        a: 'Wij meten niet alleen uren, maar Geluksmomenten - de echte impact die vrijwilligers creëren. Daarnaast bieden we de VrijwilligersCheck voor welzijnsmonitoring en AI-ondersteuning voor coördinatoren.',
      },
    ],
  },
  {
    category: 'VrijwilligersCheck',
    questions: [
      {
        q: 'Hoe werkt de VrijwilligersCheck?',
        a: 'De VrijwilligersCheck is een korte vragenlijst die het welzijn van vrijwilligers meet op 5 dimensies: waardering, communicatie, werkdruk, ontwikkeling en verbondenheid. In 5 minuten krijg je inzicht in je organisatie.',
      },
      {
        q: 'Is de VrijwilligersCheck gratis?',
        a: 'Ja, de basis VrijwilligersCheck is volledig gratis. Je kunt direct starten zonder registratie. Voor geavanceerde analyses en benchmarking bieden we betaalde opties.',
      },
      {
        q: 'Hoe vaak moet ik de VrijwilligersCheck doen?',
        a: 'Wij raden aan om de check minimaal elk kwartaal te doen. Zo kun je trends volgen en vroegtijdig signalen oppikken voordat problemen ontstaan.',
      },
    ],
  },
  {
    category: 'Platform & Prijzen',
    questions: [
      {
        q: 'Wat kost het DAAR platform?',
        a: 'Wij werken met flexibele prijsmodellen gebaseerd op je organisatiegrootte en behoeften. Plan een gratis kennismakingsgesprek om een op maat gemaakte offerte te ontvangen.',
      },
      {
        q: 'Kan ik DAAR eerst uitproberen?',
        a: 'Ja, wij bieden een gratis proefperiode aan. Daarnaast kun je de VrijwilligersCheck direct gratis gebruiken om een eerste indruk te krijgen van onze aanpak.',
      },
      {
        q: 'Biedt DAAR ondersteuning bij de implementatie?',
        a: 'Absoluut! Bij elk abonnement krijg je onboarding support. Voor grotere organisaties bieden we uitgebreide implementatietrajecten met persoonlijke begeleiding.',
      },
    ],
  },
  {
    category: 'Privacy & Beveiliging',
    questions: [
      {
        q: 'Hoe gaat DAAR om met privacygevoelige gegevens?',
        a: 'Privacy staat voorop bij DAAR. Wij zijn volledig AVG-compliant, gebruiken versleuteling voor alle data en slaan gegevens op in beveiligde Nederlandse datacenters.',
      },
      {
        q: 'Wie heeft toegang tot de data van mijn vrijwilligers?',
        a: 'Alleen geautoriseerde medewerkers van jouw organisatie hebben toegang tot jullie data. DAAR-medewerkers hebben alleen toegang voor support-doeleinden en met jouw toestemming.',
      },
    ],
  },
]

// Support options
const supportOptions = [
  {
    icon: MessageCircle,
    title: 'Chat met ons',
    description: 'Direct antwoord van onze AI-assistent of een medewerker',
    action: 'Start chat',
    href: '#chat',
    color: 'bg-brandGreen',
    available: 'Direct beschikbaar',
  },
  {
    icon: Calendar,
    title: 'Plan een gesprek',
    description: 'Boek een gratis kennismakingsgesprek met ons team',
    action: 'Plan afspraak',
    href: '/afspraak',
    color: 'bg-navy',
    available: 'Binnen 2 werkdagen',
  },
  {
    icon: Mail,
    title: 'Stuur een e-mail',
    description: 'Voor uitgebreide vragen of documentatie',
    action: 'info@daar.nl',
    href: 'mailto:info@daar.nl',
    color: 'bg-purple-600',
    available: 'Reactie binnen 24 uur',
  },
  {
    icon: BookOpen,
    title: 'Kennisbank',
    description: 'Vind zelf antwoorden in onze uitgebreide artikelen',
    action: 'Bekijk artikelen',
    href: '/kennisbank',
    color: 'bg-orange-500',
    available: 'Altijd beschikbaar',
  },
]

// Contact form subjects
const subjects = [
  'Algemene vraag',
  'Demo aanvragen',
  'Technische ondersteuning',
  'Samenwerking / Partnership',
  'Feedback of suggestie',
  'Media / Pers',
  'Anders',
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Er is iets misgegaan')
      }

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch {
      setError('Er is iets misgegaan bij het versturen. Probeer het opnieuw of mail ons direct.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="bg-offWhite">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-brandGreen overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-brandGreen rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Headphones className="w-4 h-4 text-brandGreen" />
              <span className="text-sm font-medium text-white">We staan voor je klaar</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Hoe kunnen we
              <span className="block text-brandGreen">je helpen?</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Heb je een vraag, wil je een demo of gewoon even sparren over vrijwilligersbeheer?
              Ons team staat klaar om je te helpen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 bg-brandGreen text-white rounded-lg font-medium hover:bg-brandGreenHover transition-colors"
              >
                Stuur een bericht
                <Send className="w-5 h-5 ml-2" />
              </a>
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Plan een gesprek
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brandGreen font-medium text-sm group-hover:underline">
                    {option.action}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {option.available}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="py-16" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-navy mb-2">Stuur ons een bericht</h2>
                  <p className="text-gray-600">
                    Vul het formulier in en we nemen zo snel mogelijk contact met je op.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-brandGreen/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-brandGreen" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-2">Bericht verzonden!</h3>
                    <p className="text-gray-600 mb-6">
                      Bedankt voor je bericht. We nemen binnen 24 uur contact met je op.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Nog een bericht sturen
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Naam *"
                        name="name"
                        placeholder="Je volledige naam"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="E-mailadres *"
                        name="email"
                        type="email"
                        placeholder="je@email.nl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Organisatie"
                        name="organization"
                        placeholder="Naam van je organisatie"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                      <Input
                        label="Telefoonnummer"
                        name="phone"
                        type="tel"
                        placeholder="+31 6 12345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-navy mb-1">
                        Onderwerp *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent hover:border-gray-400 bg-white"
                      >
                        <option value="">Selecteer een onderwerp</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-navy mb-1">
                        Bericht *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Vertel ons hoe we je kunnen helpen..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent hover:border-gray-400 resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
                      {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                      {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Door dit formulier te verzenden ga je akkoord met ons{' '}
                      <Link href="/privacy" className="text-brandGreen hover:underline">
                        privacybeleid
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy mb-4">Direct contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@daar.nl"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-brandGreen" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">E-mail</p>
                      <p className="font-medium text-navy group-hover:text-brandGreen transition-colors">
                        info@daar.nl
                      </p>
                    </div>
                  </a>
                  <a
                    href="tel:+31201234567"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefoon</p>
                      <p className="font-medium text-navy group-hover:text-brandGreen transition-colors">
                        +31 (0)20 123 4567
                      </p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Adres</p>
                      <p className="font-medium text-navy">
                        Amsterdam, Nederland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brandGreen" />
                  Bereikbaarheid
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maandag - Vrijdag</span>
                    <span className="font-medium text-navy">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zaterdag - Zondag</span>
                    <span className="text-gray-400">Gesloten</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-lightGreen rounded-lg">
                  <p className="text-sm text-brandGreen">
                    <strong>Chat:</strong> Onze AI-assistent is 24/7 beschikbaar voor directe hulp.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brandGreen" />
                  Snel aan de slag
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/quiz"
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm">Doe de VrijwilligersCheck</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/afspraak"
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm">Plan een demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/kennisbank"
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm">Lees de kennisbank</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen/10 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-brandGreen" />
              <span className="text-sm font-medium text-brandGreen">Veelgestelde vragen</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Heb je een vraag?
            </h2>
            <p className="text-xl text-gray-600">
              Vind snel antwoord op de meest gestelde vragen.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                  {category.category === 'Over DAAR' && <Building2 className="w-5 h-5 text-brandGreen" />}
                  {category.category === 'VrijwilligersCheck' && <Sparkles className="w-5 h-5 text-brandGreen" />}
                  {category.category === 'Platform & Prijzen' && <Users className="w-5 h-5 text-brandGreen" />}
                  {category.category === 'Privacy & Beveiliging' && <CheckCircle2 className="w-5 h-5 text-brandGreen" />}
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const faqId = `${category.category}-${index}`
                    const isOpen = openFaq === faqId
                    return (
                      <div
                        key={faqId}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-navy pr-4">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-brandGreen flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Staat je vraag er niet tussen?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 bg-brandGreen text-white rounded-lg font-medium hover:bg-brandGreenHover transition-colors"
              >
                Stel je vraag
                <Send className="w-5 h-5 ml-2" />
              </a>
              <Link
                href="/kennisbank"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-navy rounded-lg font-medium hover:border-brandGreen hover:text-brandGreen transition-colors"
              >
                Bekijk de kennisbank
                <BookOpen className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brandGreen to-brandGreenHover rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Liever direct in gesprek?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Plan een gratis en vrijblijvend kennismakingsgesprek. We vertellen je graag
                meer over hoe DAAR jouw organisatie kan helpen.
              </p>
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brandGreen rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Plan een gesprek
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
