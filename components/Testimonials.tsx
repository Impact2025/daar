'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  organization: string;
  image: string;
  metric?: { value: string; label: string };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Eindelijk hebben we harde cijfers voor onze subsidieaanvraag, zonder dat het menselijke aspect verloren gaat. De Geluksformule is precies wat we nodig hadden.",
    author: "Marieke de Vries",
    role: "Coördinator",
    organization: "Buurtwerk Amsterdam",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    metric: { value: "156u", label: "bespaard/jaar" }
  },
  {
    id: 2,
    quote: "Als kleine voetbalvereniging dachten we dat zo'n platform niet voor ons was. Maar Daar schaalt perfect mee. We hebben nu eindelijk overzicht over al onze vrijwilligers.",
    author: "Peter Jansen",
    role: "Voorzitter",
    organization: "VV Schoonhoven",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    metric: { value: "50%", label: "snellere matching" }
  },
  {
    id: 3,
    quote: "We zagen vrijwilligers afhaken zonder te weten waarom. Nu krijgen we vroegtijdige signalen en kunnen we ingrijpen voordat het te laat is. Ons verloop is met 17% gedaald.",
    author: "Sandra Bakker",
    role: "Directeur",
    organization: "Museum Het Valkhof",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    metric: { value: "-17%", label: "minder verloop" }
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <section
      className="py-20 lg:py-28 bg-daar-blue relative overflow-hidden"
      aria-label="Klantervaringen"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brandGreen/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-daar-mint/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Wat onze klanten zeggen
          </h2>
          <p className="text-gray-400 text-lg">
            Van gemeentes tot sportverenigingen — organisaties die de overstap maakten
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl relative">
          {/* Quote icon */}
          <div className="absolute -top-6 left-8 w-12 h-12 bg-brandGreen rounded-2xl flex items-center justify-center shadow-lg">
            <Quote className="w-6 h-6 text-white fill-current" />
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Quote content */}
            <div className="lg:col-span-8 mb-8 lg:mb-0" aria-live="polite">
              <blockquote className="text-xl lg:text-2xl text-daar-blue leading-relaxed mb-8 font-medium">
                "{active.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-daar-helder/30">
                  <Image
                    src={active.image}
                    alt={active.author}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-daar-blue">{active.author}</p>
                  <p className="text-gray-500 text-sm">{active.role}, {active.organization}</p>
                </div>
              </div>
            </div>

            {/* Metric highlight */}
            {active.metric && (
              <div className="lg:col-span-4">
                <div className="bg-gradient-to-br from-brandGreen/10 to-daar-mint/10 rounded-2xl p-6 text-center border border-brandGreen/20">
                  <p className="text-4xl lg:text-5xl font-extrabold text-brandGreen mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {active.metric.value}
                  </p>
                  <p className="text-gray-600 font-medium">{active.metric.label}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  role="tab"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-brandGreen'
                      : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Testimonial van ${t.author}`}
                  aria-selected={index === activeIndex}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-daar-blue hover:bg-brandGreen hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-daar-blue hover:bg-brandGreen hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-gray-400 text-sm">Organisaties</p>
          </div>
          <div className="w-px bg-gray-700" />
          <div>
            <p className="text-3xl font-bold text-white">10.000+</p>
            <p className="text-gray-400 text-sm">Vrijwilligers</p>
          </div>
          <div className="w-px bg-gray-700" />
          <div>
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-gray-400 text-sm">Tevreden klanten</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
