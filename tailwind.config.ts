import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2332',
        brandGreen: '#3BA273',
        brandGreenHover: '#2E855D',
        lightGreen: '#EBF7F2',
        offWhite: '#F8F9FA',

        // Samen Daar 2.0 Palet - Workflow & Impact kleuren
        // Hoofdkleuren (uit impact cards)
        'daar-navy': '#3E3D5C',        // Dark navy achtergrond
        'daar-goud': '#C8A860',        // Goud/Mustard (Tijdsbesparing)
        'daar-koraal': '#D97C6E',      // Koraal/Salmon (Tevredenheid)
        'daar-koraal-hover': '#C66B5E',
        'daar-turquoise': '#6CB4C8',   // Turquoise/Helder blauw (Retentie)
        'daar-mint': '#5BA99D',        // Mint/Teal groen (Impact)

        // Lichte achtergrondkleuren (voor workflow stappen)
        'daar-mint-light': '#D5E8E4',     // STAP 1 achtergrond
        'daar-blue-light': '#D4E4ED',     // STAP 2 achtergrond
        'daar-koraal-light': '#F4DDD6',   // STAP 3 achtergrond
        'daar-goud-light': '#F0E5D4',     // STAP 4 achtergrond

        // Legacy support (oude kleuren behouden voor backwards compatibility)
        'daar-blue': '#2D334A',
        'daar-geel': '#D4A84B',
        'daar-helder': '#5BA3BD',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h2: {
              color: '#1A2332',
              fontWeight: '700',
              marginTop: '2em',
              marginBottom: '1em',
              fontSize: '1.75rem',
              borderBottom: '2px solid #EBF7F2',
              paddingBottom: '0.5rem',
            },
            h3: {
              color: '#1A2332',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.75em',
              fontSize: '1.25rem',
            },
            h4: {
              color: '#1A2332',
              fontWeight: '600',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              lineHeight: '1.75',
            },
            a: {
              color: '#3BA273',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#1A2332',
              fontWeight: '600',
            },
            ul: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.5em',
            },
            ol: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.5em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: '#3BA273',
              borderLeftWidth: '4px',
              backgroundColor: '#F8F9FA',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              color: '#374151',
            },
            'blockquote p': {
              marginTop: '0',
              marginBottom: '0',
            },
            code: {
              color: '#1A2332',
              backgroundColor: '#EBF7F2',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            hr: {
              borderColor: '#E5E7EB',
              marginTop: '2em',
              marginBottom: '2em',
            },
            '.lead': {
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: '#4B5563',
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
