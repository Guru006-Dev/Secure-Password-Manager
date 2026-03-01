import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isLocked: boolean;
    isAuthenticated: boolean;
    unlock: (password: string) => boolean;
    lock: () => void;
    panic: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Default to locked initial state
    const [isLocked, setIsLocked] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Mock Master Password for Day 2
    const MASTER_PASSWORD = "1234";

    const unlock = (password: string) => {
        if (password === MASTER_PASSWORD) {
            setIsLocked(false);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const lock = () => {
        setIsLocked(true);
    };

    const panic = () => {
        setIsLocked(true);
        // In a real app, we might also clear the clipboard or close sensitive tabs here
        console.log("PANIC MODE ACTIVATED: Vault Locked.");
    };

    // Auto-lock on window blur (Optional feature for later, keeping simple for Day 2)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // lock(); // Uncomment to enable auto-lock on tab switch
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    return (
        <AuthContext.Provider value={{ isLocked, isAuthenticated, unlock, lock, panic }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
