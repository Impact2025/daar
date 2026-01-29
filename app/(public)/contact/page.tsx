'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
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
  Check,
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
        a: 'Wij meten niet alleen uren, maar Geluksmomenten - de echte impact die vrijwilligers creëren. Daarnaast bieden we de Geluksmonitor voor welzijnsmonitoring en AI-ondersteuning voor coördinatoren.',
      },
    ],
  },
  {
    category: 'Geluksmonitor',
    questions: [
      {
        q: 'Hoe werkt de Geluksmonitor?',
        a: 'De Geluksmonitor is een korte vragenlijst die het welzijn van vrijwilligers meet op 5 dimensies: waardering, communicatie, werkdruk, ontwikkeling en verbondenheid. In 5 minuten krijg je inzicht in je organisatie.',
      },
      {
        q: 'Is de Geluksmonitor gratis?',
        a: 'Ja, de basis Geluksmonitor scan is volledig gratis. Je kunt direct starten zonder registratie. Voor geavanceerde analyses en benchmarking bieden we betaalde opties.',
      },
      {
        q: 'Hoe vaak moet ik de Geluksmonitor doen?',
        a: 'Wij raden aan om de scan minimaal elk kwartaal te doen. Zo kun je trends volgen en vroegtijdig signalen oppikken voordat problemen ontstaan.',
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
        a: 'Ja, wij bieden een gratis proefperiode aan. Daarnaast kun je de Geluksmonitor direct gratis gebruiken om een eerste indruk te krijgen van onze aanpak.',
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
    title: 'Chat met ons',
    description: 'Direct antwoord van onze AI-assistent of een medewerker',
    action: 'Start chat',
    href: '#chat',
    bgColor: '#D4A84B',
    available: 'Direct beschikbaar',
  },
  {
    title: 'Plan een gesprek',
    description: 'Boek een gratis kennismakingsgesprek met ons team',
    action: 'Plan afspraak',
    href: '/afspraak',
    bgColor: '#E07A5A',
    available: 'Binnen 2 werkdagen',
  },
  {
    title: 'Stuur een e-mail',
    description: 'Voor uitgebreide vragen of documentatie',
    action: 'info@daar.nl',
    href: 'mailto:info@daar.nl',
    bgColor: '#5BA3BD',
    available: 'Reactie binnen 24 uur',
  },
  {
    title: 'Kennisbank',
    description: 'Vind zelf antwoorden in onze uitgebreide artikelen',
    action: 'Bekijk artikelen',
    href: '/kennisbank',
    bgColor: '#4BA99B',
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
      <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-daar-geel/20 border border-daar-geel/30 text-daar-blue text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-brandGreen" />
              We staan voor je klaar
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-[1.1] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Hoe kunnen we
              <span className="block text-brandGreen">je helpen?</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
              Heb je een vraag, wil je een demo of gewoon even sparren over vrijwilligersbeheer?
              Ons team staat klaar om je te helpen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
              >
                Stuur een bericht
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/afspraak"
                className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-8 py-4 rounded-full hover:bg-daar-helder/10 transition-colors text-center shadow-sm flex items-center justify-center"
              >
                Plan een gesprek
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-600 font-medium">
              <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check size={18} className="text-daar-mint mr-2" /> AVG-Proof
              </span>
              <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check size={18} className="text-daar-mint mr-2" /> 24/7 beschikbaar
              </span>
              <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Check size={18} className="text-daar-mint mr-2" /> Persoonlijk
              </span>
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
                className="relative overflow-hidden rounded-3xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 group"
                style={{ backgroundColor: option.bgColor }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
                <div className="relative p-5 lg:p-6 flex flex-col min-h-[220px]">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#FFFFFF', fontFamily: 'Nunito, sans-serif' }}>{option.title}</h3>
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: 'rgba(255,255,255,0.8)' }}>{option.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-sm group-hover:underline" style={{ color: '#FFFFFF' }}>
                      {option.action}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <Clock className="w-3 h-3" />
                      {option.available}
                    </span>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#FFFFFF', filter: 'blur(16px)' }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="py-20" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-daar-blue mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>Stuur ons een bericht</h2>
                  <p className="text-gray-600">
                    Vul het formulier in en we nemen zo snel mogelijk contact met je op.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-brandGreen/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-brandGreen" />
                    </div>
                    <h3 className="text-xl font-semibold text-daar-blue mb-2">Bericht verzonden!</h3>
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
                      <label className="block text-sm font-medium text-daar-blue mb-1">
                        Onderwerp *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent hover:border-gray-300 bg-white"
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
                      <label className="block text-sm font-medium text-daar-blue mb-1">
                        Bericht *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Vertel ons hoe we je kunnen helpen..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent hover:border-gray-300 resize-none"
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
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Direct contact</h3>
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
                      <p className="font-medium text-daar-blue group-hover:text-brandGreen transition-colors">
                        info@daar.nl
                      </p>
                    </div>
                  </a>
                  <a
                    href="tel:+31201234567"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-daar-blue/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-daar-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefoon</p>
                      <p className="font-medium text-daar-blue group-hover:text-brandGreen transition-colors">
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
                      <p className="font-medium text-daar-blue">
                        Amsterdam, Nederland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-daar-blue mb-4 flex items-center gap-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <Clock className="w-5 h-5 text-brandGreen" />
                  Bereikbaarheid
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maandag - Vrijdag</span>
                    <span className="font-medium text-daar-blue">09:00 - 17:00</span>
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
              <div className="bg-daar-blue rounded-3xl p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <Sparkles className="w-5 h-5 text-brandGreen" />
                  Snel aan de slag
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/quiz"
                    className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm">Doe de gratis Geluksmonitor scan</span>
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
      <section className="py-24 bg-offWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen/10 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-brandGreen" />
              <span className="text-sm font-semibold text-brandGreen">Veelgestelde vragen</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Heb je een vraag?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Vind snel antwoord op de meest gestelde vragen.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-bold text-daar-blue mb-4 flex items-center gap-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {category.category === 'Over DAAR' && <Building2 className="w-5 h-5 text-brandGreen" />}
                  {category.category === 'Geluksmonitor' && <Sparkles className="w-5 h-5 text-brandGreen" />}
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
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-daar-blue pr-4">{faq.q}</span>
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

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Staat je vraag er niet tussen?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
              >
                Stel je vraag
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/kennisbank"
                className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-8 py-4 rounded-full hover:bg-daar-helder/10 transition-colors flex items-center justify-center shadow-sm"
              >
                Bekijk de kennisbank
                <BookOpen className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-daar-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Liever direct in gesprek?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Plan een gratis en vrijblijvend kennismakingsgesprek. We vertellen je graag
            meer over hoe DAAR jouw organisatie kan helpen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/afspraak"
              className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1 flex items-center justify-center group"
            >
              Plan een gesprek
              <Calendar className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/quiz"
              className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors text-center"
            >
              Doe de gratis Geluksmonitor scan
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
