import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VAULT } from '../data/mock';
import VaultItem from '../components/VaultItem';

export default function Dashboard() {
    const [search, setSearch] = useState('');

    const filteredEntries = MOCK_VAULT.filter(entry =>
        entry.website.toLowerCase().includes(search.toLowerCase()) ||
        entry.username.toLowerCase().includes(search.toLowerCase())
    );

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

                <button disabled className="group bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/25 opacity-70 cursor-not-allowed">
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
                        <VaultItem key={entry.id} entry={entry} />
                    ))}
                </AnimatePresence>

                {filteredEntries.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground opacity-50">
                        No entries found matching "{search}"
                    </div>
                )}
            </div>

            <div className="mt-12 text-center p-8 border border-dashed border-border rounded-3xl bg-muted/10">
                <p className="text-muted-foreground">
                    🚀 Day 3: Vault Display Active.
                    <br />
                    <span className="text-xs opacity-70">Read-Only Mode. CRUD operations unlock in Day 4.</span>
                </p>
            </div>
        </div>
    );
}
