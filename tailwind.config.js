/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/app/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/styles/**/*.{ts,tsx}',
        './src/lib/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
