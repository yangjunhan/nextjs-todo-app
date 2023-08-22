import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      animation: {
        'pop-out': 'scale 0.15s ease-in-out'
      },
      colors: {
        success: '#52c41a'
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'rotate(1)' }
        }
      }
    }
  },
  plugins: []
}
export default config
