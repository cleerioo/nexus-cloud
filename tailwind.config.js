/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#050510',
                    light: '#0a0a1f',
                    primary: '#00f0ff',
                    secondary: '#7000ff',
                    accent: '#ff003c',
                }
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
