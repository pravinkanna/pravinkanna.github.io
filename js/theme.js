if (window.tailwind) {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    slate: {
                        900: '#0f172a',
                        800: '#1e293b',
                        700: '#334155',
                        200: '#e2e8f0',
                        400: '#94a3b8',
                        500: '#64748b',
                    },
                    accent: '#06b6d4',
                },
                fontFamily: {
                    sans: ['"Inter"', 'sans-serif'],
                    mono: ['"Fira Code"', '"Roboto Mono"', 'monospace'],
                },
            }
        }
    }
}
