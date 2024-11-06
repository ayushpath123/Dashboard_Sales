import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-green': '#254f1a',
        'custom-yellow':'#eba10e',
        'custom-grayy':'#c7bfaf',
        'custom-black':'#333230'
      },
    },
  },
  plugins: [],
};
export default config;
