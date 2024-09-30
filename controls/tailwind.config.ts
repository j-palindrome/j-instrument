import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      mono: 'Fira Code'
    },
    extend: {}
  },
  plugins: []
}
export default config
