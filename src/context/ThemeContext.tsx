import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Accent = 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'cyan';

interface ThemeContextType {
    theme: Theme;
    accent: Accent;
    setTheme: (theme: Theme) => void;
    setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Load from storage or default
    const [theme, setThemeState] = useState<Theme>(() =>
        (localStorage.getItem('theme') as Theme) || 'dark'
    );
    const [accent, setAccentState] = useState<Accent>(() =>
        (localStorage.getItem('accent') as Accent) || 'violet'
    );

    // Persist & Apply Theme
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Persist & Apply Accent
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old accent classes if any (handled via data-attribute or dynamic class in real app)
        // For Tailwind integration, we'll use a data-attribute to scoped styling
        root.setAttribute('data-accent', accent);
        localStorage.setItem('accent', accent);

        // Dynamic CSS variables for Tailwind
        const colors: Record<Accent, string> = {
            violet: '262 83% 58%',
            blue: '221 83% 53%',
            emerald: '158 64% 52%',
            amber: '45 93% 47%',
            rose: '344 87% 55%',
            cyan: '188 86% 53%',
        };

        // We update the --primary variable
        root.style.setProperty('--primary', colors[accent]);
        // Force primary foreground to white for better contrast on colorful backgrounds
        root.style.setProperty('--primary-foreground', '210 40% 98%');
    }, [accent]);

    const setTheme = (t: Theme) => setThemeState(t);
    const setAccent = (a: Accent) => setAccentState(a);

    return (
        <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
