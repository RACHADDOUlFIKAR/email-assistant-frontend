/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Chemins vers tous vos fichiers React
    "./public/index.html",       // (Optionnel) Si vous utilisez un fichier HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

