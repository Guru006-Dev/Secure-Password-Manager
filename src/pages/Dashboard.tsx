import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault } from '../context/VaultContext';
import VaultItem from '../components/VaultItem';
import EntryModal from '../components/EntryModal';
import { VaultEntry } from '../types';

export default function Dashboard() {
    const { entries, addEntry, updateEntry, deleteEntry, toggleFavorite } = useVault();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<VaultEntry | null>(null);

    const filteredEntries = entries.filter(entry =>
        entry.website.toLowerCase().includes(search.toLowerCase()) ||
        entry.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (entryData: Partial<VaultEntry>) => {
        if (editingEntry) {
            updateEntry(editingEntry.id, entryData);
        } else {
            addEntry(entryData as any);
        }
    };

    const openAddModal = () => {
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const openEditModal = (entry: VaultEntry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                        My Vault
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Securely storage for your digital life.
                    </p>
                </div>

                <button
                    onClick={openAddModal}
                    className="group bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Entry</span>
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="sticky top-4 z-20 mb-6 bg-background/80 backdrop-blur-md p-2 -mx-2 rounded-2xl border border-transparent">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search your vault..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-muted/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <button className="px-4 py-3 bg-muted/50 border border-border/50 rounded-xl hover:bg-muted transition-colors">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Vault Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {filteredEntries.map((entry) => (
                        <VaultItem
                            key={entry.id}
                            entry={entry}
                            onEdit={openEditModal}
                            onDelete={deleteEntry}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </AnimatePresence>

                {filteredEntries.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground opacity-50">
                        No entries found matching "{search}"
                    </div>
                )}
            </div>

            <EntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingEntry}
            />

            <div className="mt-12 text-center p-8 border border-dashed border-border rounded-3xl bg-muted/10">
                <p className="text-muted-foreground">
                    🚀 Day 4: Full CRUD Active.
                    <br />
                    <span className="text-xs opacity-70">Add, Edit, Delete, and Favorite entries with ease.</span>
                </p>
            </div>
        </div>
    );
}
