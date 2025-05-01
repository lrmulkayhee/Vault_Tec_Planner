import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                // Fallout-specific colors
                'vault-green': {
                    DEFAULT: '#4CAF50',
                    light: '#6FBF73',
                    dark: '#388E3C',
                },
                'vault-blue': {
                    DEFAULT: '#1E88E5',
                    light: '#42A5F5',
                    dark: '#1565C0',
                },
                'vault-gold': {
                    DEFAULT: '#FFC107',
                    light: '#FFCA28',
                    dark: '#FFB300',
                },
                'terminal-bg': '#0A0A0A',
                'terminal-text': '#4CAF50',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'terminal-blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' }
                },
                'glow-pulse': {
                    '0%, 100%': {
                        textShadow: '0 0 5px rgba(76, 175, 80, 0.7)'
                    },
                    '50%': {
                        textShadow: '0 0 10px rgba(76, 175, 80, 1), 0 0 15px rgba(76, 175, 80, 0.5)'
                    }
                },
                'radiation-spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                typing: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'terminal-blink': 'terminal-blink 1s step-start infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'radiation-spin': 'radiation-spin 10s linear infinite',
                typing: 'typing 3.5s steps(40, end)'
            },
            fontFamily: {
                'mono': ['Share Tech Mono', 'monospace'],
            },
            backgroundImage: {
                'terminal-scanline': 'linear-gradient(to bottom, rgba(76, 175, 80, 0.03) 50%, rgba(0, 0, 0, 0.1) 50%)',
                'vault-metal': 'linear-gradient(to bottom, #45484d 0%, #000000 100%)',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;