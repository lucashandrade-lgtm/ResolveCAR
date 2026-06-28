import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          green: "#2E7D32",
          "green-light": "#66BB6A",
          "green-soft": "#E8F5E9",
          blue: "#1565C0",
          "blue-soft": "#E3F2FD",
          yellow: "#F9A825",
          red: "#C62828",
          gray: "#F5F5F5",
          line: "#BDBDBD",
          text: "#263238",
          navy: "#1B3A4B",
          cyan: "#0E7490"
        }
      },
      boxShadow: {
        panel: "0 1px 2px rgba(38, 50, 56, 0.08), 0 10px 24px rgba(38, 50, 56, 0.06)"
      }
    }
  },
  plugins: []
} satisfies Config;
