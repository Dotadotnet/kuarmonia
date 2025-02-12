/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '116': '28rem', 
        '128': '32rem', 
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))', 
      },
      colors: {
        light: '#edf2f9',
        dark: '#152e4d',
        darker: '#12263f',

        // رنگ‌های cyan
        'color-cyan': '#0891b2',
        'color-cyan-50': '#ecfeff',
        'color-cyan-100': '#cffafe',
        'color-cyan-light': '#06b6d4',
        'color-cyan-lighter': '#22d3ee',
        'color-cyan-dark': '#0e7490',
        'color-cyan-darker': '#155e75',

        // رنگ‌های green
        'color-green': '#16a34a',
        'color-green-50': '#f0fdf4',
        'color-green-100': '#dcfce7',
        'color-green-light': '#22c55e',
        'color-green-lighter': '#4ade80',
        'color-green-dark': '#15803d',
        'color-green-darker': '#166534',

        // رنگ‌های blue
        'color-blue': '#2563eb',
        'color-blue-50': '#eff6ff',
        'color-blue-100': '#dbeafe',
        'color-blue-light': '#3b82f6',
        'color-blue-lighter': '#60a5fa',
        'color-blue-dark': '#1d4ed8',
        'color-blue-darker': '#1e40af',

        // سایر رنگ‌ها
        'color-teal': '#0d9488',
        'color-teal-50': '#f0fdfa',
        'color-teal-100': '#ccfbf1',
        'color-teal-light': '#14b8a6',
        'color-teal-lighter': '#2dd4bf',
        'color-teal-dark': '#0f766e',
        'color-teal-darker': '#115e59',

        'color-fuchsia': '#c026d3',
        'color-fuchsia-50': '#fdf4ff',
        'color-fuchsia-100': '#fae8ff',
        'color-fuchsia-light': '#d946ef',
        'color-fuchsia-lighter': '#e879f9',
        'color-fuchsia-dark': '#a21caf',
        'color-fuchsia-darker': '#86198f',

        'color-violet': '#7c3aed',
        'color-violet-50': '#f5f3ff',
        'color-violet-100': '#ede9fe',
        'color-violet-light': '#8b5cf6',
        'color-violet-lighter': '#a78bfa',
        'color-violet-dark': '#6d28d9',
        'color-violet-darker': '#5b21b6',
      },
      borderRadius: {
        DEFAULT: "10px",
        primary: "1.5rem",
        secondary: "9999px",
      },
      fontSize: {
        tiny: '0.625rem',   // 10px
        small: '0.75rem',   // 12px
        default: '1rem',    // 16px
        big: '1.25rem',     // 20px
        huge: '1.5rem',     // 24px
      },
      padding: {
        primary: "1rem",
        secondary: "1.5rem",
      },
      colors: {
        primary: "#01BC1FD6",
        secondary: "#E4FFEA",
        neutral: "#515151",
      },screens: {
       // Extra small plus
       'xsplus': { 'max': '575px', 'min': '480px' },    // between 480px and 575px

       // Small plus
       'smplus': { 'max': '640px', 'min': '576px' },    // between 576px and 640px

       // Medium plus
       'mdplus': { 'max': '900px', 'min': '690px' },    // between 690px and 768px

       // Large plus
       'lgplus': { 'max': '1024px', 'min': '900px' },   // between 900px and 1024px

       'lgplus2': { 'max': '1100px', 'min': '1024px' },   // between 900px and 1024px

       // Larger large plus
       'lgplus3': { 'max': '1190px', 'min': '1100px' }, // between 1100px and 1190px

       // Extra large plus
       'xlgplus': { 'max': '1200px', 'min': '1100px' }, // between 1100px and 1200px

       // Extra extra large plus
       'xxlgplus': { 'max': '1400px', 'min': '1280px' }, // between 1280px and 1400px

       // Ultra large plus
       'ulgplus': { 'max': '1600px', 'min': '1440px' }, // between 1440px and 1600px

       // Super large plus
       'slgplus': { 'max': '1920px', 'min': '1680px' }, // between 1680px and 1920px

       // Extra super large plus
       'eslgplus': { 'max': '2560px', 'min': '2048px' }, // between 2048px and 2560px// Custom breakpoint for 1194px
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
