/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary": "#98FF98", // Mint
        "secondary": "#50C878", // Emerald
        "background": "#0F1111", // Deep Charcoal
        "surface": "#1A1D1D", // Charcoal surface
        "surface-container": "#222626",
        "surface-container-high": "#2A2F2F",
        "on-background": "#E0F2F1",
        "on-surface": "#F0FFF4",
        "on-surface-variant": "#A8B2B2",
        "outline-variant": "#343A3A",
        "primary-container": "#1E3A2F",
        "on-primary-container": "#98FF98",
        "on-primary": "#00391C"
      },
      "borderRadius": {
        "DEFAULT": "0px",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      "fontFamily": {
        "label-lg": ["IBM Plex Mono", "monospace"],
        "headline-xl": ["Space Grotesk", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "body-lg": ["IBM Plex Mono", "monospace"],
        "body-md": ["IBM Plex Mono", "monospace"],
        "label-sm": ["IBM Plex Mono", "monospace"],
        "headline-lg": ["Space Grotesk", "sans-serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
