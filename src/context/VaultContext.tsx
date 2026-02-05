import { createContext, useContext, useState, ReactNode } from 'react';
import { VaultEntry } from '../types';
import { MOCK_VAULT } from '../data/mock';

interface VaultContextType {
    entries: VaultEntry[];
    addEntry: (entry: Omit<VaultEntry, 'id' | 'createdAt' | 'isFavorite'>) => void;
    updateEntry: (id: number, updates: Partial<VaultEntry>) => void;
    deleteEntry: (id: number) => void;
    toggleFavorite: (id: number) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: ReactNode }) {
    const [entries, setEntries] = useState<VaultEntry[]>(MOCK_VAULT);

    const addEntry = (newEntry: Omit<VaultEntry, 'id' | 'createdAt' | 'isFavorite'>) => {
        const entry: VaultEntry = {
            ...newEntry,
            id: Date.now(),
            createdAt: new Date(),
            isFavorite: false,
        };
        setEntries([entry, ...entries]); // Add to top
    };

    const updateEntry = (id: number, updates: Partial<VaultEntry>) => {
        setEntries(entries.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const deleteEntry = (id: number) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    const toggleFavorite = (id: number) => {
        setEntries(entries.map(e => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e));
    };

    return (
        <VaultContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry, toggleFavorite }}>
            {children}
        </VaultContext.Provider>
    );
}

export function useVault() {
    const context = useContext(VaultContext);
    if (context === undefined) {
        throw new Error('useVault must be used within a VaultProvider');
    }
    return context;
}
