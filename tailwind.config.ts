import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      'blue': '#87c5d4', // AzulTurquesaClaro
      'white': '#fefefe', // BlancoNieve
      'turquoise': '#64b8c8', // AzulTurquesa
      'orange': '#f7b83d', // AmarilloNaranja
      'black': '#000000', // Negro
      'gray': '#f2f2f2', // GRIS 
      'green': '#16a34a',
      'slate': '#94a3b8' // SLATE
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
