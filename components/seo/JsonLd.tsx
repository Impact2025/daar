import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name = 'Daar B.V.',
  url = 'https://daar.nl',
  logo = 'https://daar.nl/logo.png',
  description = 'Daar is het complete platform voor vrijwilligersmanagement. Van werving tot impactmeting, met de unieke Geluksformule.',
  email = 'hallo@daar.nl',
  sameAs = [
    'https://www.linkedin.com/company/daar-nl',
    'https://twitter.com/daarnl',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 200,
      height: 60,
    },
    description,
    email,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email,
      availableLanguage: ['Dutch', 'English'],
    },
    founder: {
      '@type': 'Person',
      name: 'Daar Team',
    },
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebsiteSchema({
  name = 'Daar',
  url = 'https://daar.nl',
  description = 'Het complete platform voor vrijwilligersmanagement',
}: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/kennisbank?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daar B.V.',
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareApplicationSchemaProps {
  name?: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  features?: string[];
}

export function SoftwareApplicationSchema({
  name = 'Daar Platform',
  description = 'Het complete vrijwilligersplatform met werving, matching, beheer en impactmeting.',
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web',
  offers = { price: '0', priceCurrency: 'EUR' },
  aggregateRating,
  features = [
    'Smart Matching voor vrijwilligers',
    'Geluksformule impactmeting',
    'Centraal documentbeheer (AVG-proof)',
    'Real-time rapportages',
    'Communicatie tools',
  ],
}: SoftwareApplicationSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    },
    featureList: features,
  };

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  url: string;
  keywords?: string[];
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = { name: 'Daar Team' },
  publisher = { name: 'Daar B.V.', logo: 'https://daar.nl/logo.png' },
  url,
  keywords,
}: ArticleSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    };
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(', ');
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function LocalBusinessSchema({
  name = 'Daar B.V.',
  description = 'Vrijwilligersplatform voor organisaties in Nederland',
  url = 'https://daar.nl',
  email = 'hallo@daar.nl',
  address = {
    streetAddress: 'Nederland',
    addressLocality: 'Amsterdam',
    postalCode: '1000 AA',
    addressCountry: 'NL',
  },
  geo,
  openingHours = ['Mo-Fr 09:00-17:00'],
}: LocalBusinessSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(' ');
      const [open, close] = time.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: open,
        closes: close,
      };
    }),
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
