import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#8B7CF6',
          medium: '#6D5ACF',
          dark: '#553C9A',
        },
        accent: {
          blue: '#6366F1',
          'light-purple': '#A78BFA',
        },
        background: {
          light: '#fafbfc',
          white: '#ffffff',
        },
        text: {
          dark: '#1f2937',
          medium: '#6b7280',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B7CF6 0%, #6D5ACF 50%, #553C9A 100%)',
      },
      borderRadius: {
        'standard': '16px',
        'large': '24px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
