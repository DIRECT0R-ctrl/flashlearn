/** @type {import('tailwindcss').Config} */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'body-bg': '#0c0f16',
        'aymane-pink': '#ff00cc',
        'aymane-cyan': '#00ffff',
        'aymane-green': '#00ff99',
        'aymane-violet': '#9d4edd',
        'aymane-gray': '#1a1f2b',
        'aymane-text': '#e0e7ff',
      },
      fontFamily: {
        'ay-cyber': ['Orbitron', 'sans-serif'],
        'ay-clean': ['Inter', 'sans-serif'],
        'ay-mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'ay-cyber': '0 0 10px #00ffff80',
        'ay-pink': '0 0 10px #ff00cc80',
        'ay-clean': '0 0 20px #06b6d4aa',
      },
      backgroundImage: {
        'ay-gradient': 'linear-gradient(135deg, #0c0f16 0%, #1a1f2b 100%)',
        'ay-radial': 'radial-gradient(circle, #0c0f16 0%, #1a1f2b 100%)',
      },
      dropShadow: {
        'ay-cyber': '0 0 10px #00ffff',
      },
    },
  },
  plugins: [],
};



// @typo --> jsdoc annotation for Editors and IDE
// .config making the editor warning me 

