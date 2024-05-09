import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          100: "var(--primary-100)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
        }
      },
      fontSize: {
        "title": "28px"
      },
    },
  },
  plugins: [],
} satisfies Config