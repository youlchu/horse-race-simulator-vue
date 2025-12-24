/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        "deafult-horse-color": "#F59E0B",
      },
    },
  },
  plugins: [],
};
