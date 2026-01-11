import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
        accent: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#50bff5',
        secondary: '#31f5e3',
        cta: '#50bff5',
        success: '#31f5e3',
        warning: '#fbbf24',
        error: '#ef4444',
        neutral: '#1f2937',
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          from: {
            opacity: '0',
            maxHeight: '0',
          },
          to: {
            opacity: '1',
            maxHeight: '500px',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
