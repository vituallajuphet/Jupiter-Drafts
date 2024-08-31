import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inter: ['var(--font-inter)'],
        opensans: ['var(--font-opensans)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
