/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta FinanceMind - Confiança e Educação Financeira
        brand: {
          teal: {
            50: '#f0f9f7',
            100: '#d4f0ea',
            200: '#a9e1d5',
            300: '#75ccbb',
            400: '#4ab19d',
            500: '#2d9687', // Verde petróleo principal
            600: '#217568',
            700: '#1a5e54',
            800: '#164b44',
            900: '#133f38',
          },
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b', // Cinza azulado
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
        },
        risk: {
          low: '#10b981',     // Verde - Risco mínimo
          medium: '#f59e0b',  // Amarelo/Laranja - Risco médio
          high: '#ef4444',    // Vermelho - Alto risco
        },
        financial: {
          profit: '#22c55e',
          loss: '#ef4444',
          neutral: '#6b7280',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
