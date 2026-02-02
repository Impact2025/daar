'use client';

import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Van chaos naar controle
          </h2>
          <p className="text-lg text-gray-600">
            Herken je dit? Je bent meer tijd kwijt aan administratie dan aan je vrijwilligers.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Problem Column */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6">
              <X size={16} className="mr-2" />
              Zonder Daar
            </div>

            <ul className="space-y-4">
              {[
                'Excel-sheets die niemand begrijpt',
                'Geen overzicht wie kan en wil meedoen',
                'Vrijwilligers die afhaken zonder waarschuwing',
                'Mensen worden per ongeluk overgeslagen',
                'Subsidieaanvragen zonder harde cijfers',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <X size={14} className="text-red-500" />
                  </div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Column */}
          <div className="bg-gradient-to-br from-brandGreen/5 to-daar-mint/10 rounded-3xl p-8 lg:p-10 border border-brandGreen/20 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandGreen/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brandGreen/10 text-brandGreen text-sm font-semibold mb-6">
                <Check size={16} className="mr-2" />
                Met Daar
              </div>

              <ul className="space-y-4">
                {[
                  'Eén overzichtelijk dashboard voor alles',
                  'Projectoverzicht: wie kan, wil en doet mee',
                  'Eerlijke verdeling — niemand wordt vergeten',
                  'Smart Matching vindt de perfecte vrijwilliger',
                  'Kant-en-klare impactrapporten met één klik',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brandGreen/20 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-brandGreen" />
                    </div>
                    <span className="text-daar-blue font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Meer dan <span className="font-semibold text-daar-blue">667% ROI</span> in het eerste jaar
          </p>
          <a
            href="#producten"
            className="inline-flex items-center text-brandGreen font-semibold hover:underline group"
          >
            Bekijk hoe het werkt
            <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
