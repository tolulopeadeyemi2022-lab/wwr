import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eefbf3",
          100: "#d6f5e1",
          200: "#b0e9c8",
          300: "#7ad7a8",
          400: "#45bd85",
          500: "#22a06a",
          600: "#158055",
          700: "#126647",
          800: "#12513a",
          900: "#0f4230",
          950: "#07251b",
        },
        ink: {
          50: "#f5f7fa",
          100: "#e9edf3",
          200: "#cfd9e6",
          300: "#a6b8cf",
          400: "#7691b3",
          500: "#557399",
          600: "#425c7e",
          700: "#374b67",
          800: "#304057",
          900: "#1c2635",
          950: "#12192a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            a: { color: "#158055", fontWeight: "500", textDecoration: "underline", textUnderlineOffset: "2px" },
            "h2,h3,h4": { fontFamily: "var(--font-serif)", scrollMarginTop: "6rem" },
            code: { color: "#126647" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
