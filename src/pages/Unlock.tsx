import { useState } from 'react';
import { Lock, Fingerprint, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Unlock() {
    const { unlock } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const success = unlock(password);
        if (!success) {
            setError(true);
            setPassword('');
            // Shake animation logic handled by framer-motion key prop usually, or simple state
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="text-center mb-10">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-primary/20 shadow-xl shadow-primary/10">
                        <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Secure Vault</h1>
                    <p className="text-muted-foreground">Enter your master password to decrypt</p>
                </div>

                <form onSubmit={handleUnlock} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full bg-muted/50 border ${error ? 'border-destructive/50 focus:border-destructive' : 'border-border/50 focus:border-primary/50'} rounded-2xl px-6 py-4 text-center text-lg tracking-widest outline-none focus:ring-4 ${error ? 'focus:ring-destructive/10' : 'focus:ring-primary/10'} transition-all`}
                                placeholder="••••"
                                autoFocus
                            />
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-y-0 right-4 flex items-center"
                                >
                                    <AlertTriangle className="w-5 h-5 text-destructive" />
                                </motion.div>
                            )}
                        </div>
                        {error && (
                            <p className="text-xs text-center text-destructive font-medium animate-pulse">
                                Incorrect password. Hint: 1234
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                    >
                        <span>Unlock Vault</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-12 flex justify-center">
                    <button
                        className="p-4 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all group"
                        title="Biometric Unlock (Coming Soon)"
                    >
                        <Fingerprint className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
