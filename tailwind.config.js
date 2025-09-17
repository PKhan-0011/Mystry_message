/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
     // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
           purple: '#F5F3FF',
           indigo: '#EEF2FF',
           indigoDark: '#E0E7FF',
           LightYellow: '#FFFBEB',
           light_dark: '#008156',
           button_light: "#3B82F6",

       }
    },
  },
  plugins: [],
}

