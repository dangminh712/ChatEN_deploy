/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: "class",
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./assets/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {},
   },
   plugins: [require("flowbite/plugin")],
};
