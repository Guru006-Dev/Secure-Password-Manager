import { Search, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
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
            <div className="sticky top-4 z-20 mb-6 bg-background/50 backdrop-blur-md p-2 -mx-2 rounded-2xl border border-transparent">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search your vault..."
                            className="w-full bg-muted/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            disabled
                        />
                    </div>
                    <button className="px-4 py-3 bg-muted/50 border border-border/50 rounded-xl hover:bg-muted transition-colors" disabled>
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Empty State / Content Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm h-48 flex flex-col justify-center items-center text-center gap-3"
                    >
                        <div className="w-12 h-12 rounded-full bg-muted/50 animate-pulse" />
                        <div className="w-2/3 h-4 bg-muted/50 rounded animate-pulse" />
                        <div className="w-1/3 h-3 bg-muted/30 rounded animate-pulse" />
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center p-8 border border-dashed border-border rounded-3xl bg-muted/10">
                <p className="text-muted-foreground">
                    🚀 Day 1 Initialization Complete.
                    <br />
                    <span className="text-xs opacity-70">Database connection and Encryption modules will be activated in Day 2.</span>
                </p>
            </div>
        </div>
    );
}
