import { Moon, Sun, Monitor, Shield, Import, Download, Trash2, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Settings() {
    const { theme, accent, setTheme, setAccent } = useTheme();

    const accents = [
        { id: 'violet', color: 'bg-violet-500' },
        { id: 'blue', color: 'bg-blue-500' },
        { id: 'emerald', color: 'bg-emerald-500' },
        { id: 'amber', color: 'bg-amber-500' },
        { id: 'rose', color: 'bg-rose-500' },
        { id: 'cyan', color: 'bg-cyan-500' },
    ];

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen animate-in fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                    Personalize your vault and manage data.
                </p>
            </header>

            <div className="space-y-8">
                {/* Visual Section */}
                <section className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Monitor className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Appearance</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Theme Toggle */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-muted-foreground">App Theme</label>
                            <div className="flex bg-muted p-1 rounded-2xl w-full">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${theme === 'light' ? 'bg-background shadow-md text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${theme === 'dark' ? 'bg-background shadow-md text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </button>
                            </div>
                        </div>

                        {/* Accent Picker */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-muted-foreground">Accent Color</label>
                            <div className="flex gap-3 flex-wrap">
                                {accents.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setAccent(item.id as any)}
                                        className={`w-10 h-10 rounded-full ${item.color} relative transition-transform hover:scale-110 active:scale-95 ring-2 ring-offset-2 ring-offset-background ${accent === item.id ? 'ring-foreground' : 'ring-transparent'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Section (Mock for now, implemented in Day 7/Future) */}
                <section className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Database className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Data Management</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/50 transition-colors text-left group">
                            <Download className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold">Export Vault</h3>
                            <p className="text-xs text-muted-foreground mt-1">Download JSON backup</p>
                        </button>
                        <button className="p-4 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/50 transition-colors text-left group">
                            <Import className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold">Import Data</h3>
                            <p className="text-xs text-muted-foreground mt-1">Restore from backup</p>
                        </button>
                        <button className="p-4 border border-destructive/20 rounded-2xl bg-destructive/5 hover:bg-destructive/10 transition-colors text-left group">
                            <Trash2 className="w-6 h-6 text-destructive mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-destructive">Erase Vault</h3>
                            <p className="text-xs text-destructive/70 mt-1">Permanently delete all</p>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
