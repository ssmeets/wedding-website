import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/slices/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      curly: ["EyeCatching", "Cursive", "Times", "serif"],
      menu: ["FuturaStdBold", "Times", "serif"],
      content: ["PublicoHeadlineRoman", "Arial", "sans-serif"],
    },
    extend: {
      scale: {
        "40": "0.4", // Adds scale-40
        "60": "0.6", // Adds scale-40
      },
      animation: {
        bgFade: "bgFade 12s infinite",
      },
      keyframes: {
        bgFade: {
          "0%, 100%": { opacity: "0" },
          "33%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tw-elements/plugin.cjs"),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px 4px rgba(0, 0, 0, 1)", // Custom text shadow
        },
        ".text-shadow-md": {
          textShadow: "2px 2px 5px rgba(0, 0, 0, 1)", // Medium text shadow
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 1)", // Large text shadow
        },
      });
    },
  ],
} satisfies Config;
