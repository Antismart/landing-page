import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#edfcf4',
          100: '#d3f9e0',
          200: '#aaf0c4',
          300: '#7de2a8',
          400: '#4bce85',
          500: '#2ab369',
          600: '#158f54',
          700: '#107346',
          800: '#105c39',
          900: '#0e4b30',
          950: '#072a1c',
        },
        eco: {
          darkgreen: '#0e4b30',
          green: '#2ab369',
          lightgreen: '#7de2a8',
          earth: '#8a6d3b',
          soil: '#6b513d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-montserrat)'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(42, 179, 105, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'scroll-horizontal': 'scroll-horizontal 25s linear infinite',
        'float-up-down': 'float-up-down 3s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-up-down': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.02)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': 'url("/textures/noise.png")',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
