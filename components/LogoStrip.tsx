'use client';

import React from 'react';

// Placeholder logos - vervang later met echte klantlogo's
const partners = [
  { name: 'Gemeente Amsterdam', placeholder: 'GA' },
  { name: 'Humanitas', placeholder: 'HU' },
  { name: 'Rode Kruis', placeholder: 'RK' },
  { name: 'Stichting Present', placeholder: 'SP' },
  { name: 'Buurtwerk', placeholder: 'BW' },
  { name: 'Zorggroep', placeholder: 'ZG' },
];

const LogoStrip: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-500 mb-8">
          Vertrouwd door vrijwilligersorganisaties door heel Nederland
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex items-center justify-center"
            >
              {/* Placeholder - vervang met <Image> wanneer je echte logo's hebt */}
              <div className="h-10 px-6 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 font-bold text-sm tracking-wider opacity-60 hover:opacity-100 transition-opacity">
                {partner.placeholder}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
