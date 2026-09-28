import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { jungle: "#10241f", moss: "#1b3a32", sand: "#efe3cc", teal: "#2f7d6d", coral: "#e8684a" },
      fontFamily: { sans: ["var(--font-main)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
