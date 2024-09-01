import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  safelist: [
    ...['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray', 'orange', 'teal', 'cyan', 'rose', 'lime', 'emerald', 'violet', 'fuchsia', 'amber'].flatMap(color => 
      ['50', '100', '200', '300'].map(shade => `bg-${color}-${shade}`)
    )
  ],
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
