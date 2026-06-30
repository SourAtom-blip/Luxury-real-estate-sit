/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          black:      "#09090A",
          dark:       "#141414",
          warm:       "#1E1C1A",
          stone:      "#5C5750",
          parchment:  "#EDE8DF",
          ivory:      "#F7F4EF",
          bronze:     "#B8965A",
          bronzeLight:"#D4B27A",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.4em",
      },
    },
  },
  plugins: [],
}