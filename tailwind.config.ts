import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", //16px
          sm: "1rem", // 16px
          md: "1.5rem", // 24px
          lg: "2rem", // 32px
          xl: "3rem", // 48px
          "2xl": "4rem", // 64px
        },
      },
      fontFamily: {
        noto: ["var(--noto)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
