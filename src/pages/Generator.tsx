import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePassword, calculateStrength, GeneratorOptions } from '../utils/generator';

export default function Generator() {
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState<'Weak' | 'Medium' | 'Strong'>('Weak');
    const [options, setOptions] = useState<GeneratorOptions>({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    useEffect(() => {
        handleGenerate();
    }, [options]);

    const handleGenerate = () => {
        const newPassword = generatePassword(options);
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen">
            <header className="mb-10">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                    Generator
                </h1>
                <p className="text-muted-foreground mt-1">
                    Create mathematically unbreakable passwords.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visualizer Side */}
                <div className="space-y-6">
                    <motion.div
                        layout
                        className="relative bg-card border border-border/50 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center min-h-[240px] overflow-hidden group"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={password}
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                className="text-3xl md:text-4xl font-mono font-bold tracking-wider text-center break-all max-w-full"
                            >
                                {password}
                            </motion.div>
                        </AnimatePresence>

                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-colors duration-500
                            ${strength === 'Strong' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                strength === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                    'bg-red-500/10 text-red-500 border-red-500/20'}`}
                        >
                            {strength === 'Strong' ? <ShieldCheck className="w-3 h-3" /> :
                                strength === 'Medium' ? <Shield className="w-3 h-3" /> :
                                    <ShieldAlert className="w-3 h-3" />}
                            {strength}
                        </div>
                    </motion.div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleGenerate}
                            className="flex-1 bg-muted/50 hover:bg-muted py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Regenerate
                        </button>
                        <button
                            onClick={handleCopy}
                            className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? 'Copied!' : 'Copy Password'}
                        </button>
                    </div>
                </div>

                {/* Controls Side */}
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 space-y-8">
                    {/* Length Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="font-semibold">Length</label>
                            <span className="text-2xl font-mono font-bold text-primary">{options.length}</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="50"
                            value={options.length}
                            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                            <span>8</span>
                            <span>24</span>
                            <span>50</span>
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    {/* Toggles */}
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { key: 'uppercase', label: 'Uppercase (A-Z)', ex: 'ABC' },
                            { key: 'lowercase', label: 'Lowercase (a-z)', ex: 'abc' },
                            { key: 'numbers', label: 'Numbers (0-9)', ex: '123' },
                            { key: 'symbols', label: 'Symbols (!@#)', ex: '!@#' },
                        ].map((toggle) => (
                            <div key={toggle.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setOptions({ ...options, [toggle.key]: !options[toggle.key as keyof GeneratorOptions] } as any)}>
                                <div>
                                    <div className="font-medium">{toggle.label}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Example: {toggle.ex}</div>
                                </div>
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${options[toggle.key as keyof GeneratorOptions] ? 'bg-primary' : 'bg-muted'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${options[toggle.key as keyof GeneratorOptions] ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
