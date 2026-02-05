import { useState, useEffect } from 'react';
import { X, Save, Lock, User, Globe, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VaultEntry } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: Partial<VaultEntry>) => void;
    initialData?: VaultEntry | null;
}

export default function EntryModal({ isOpen, onClose, onSave, initialData }: Props) {
    const [formData, setFormData] = useState({
        website: '',
        username: '',
        ciphertext: '',
        category: 'Other' as VaultEntry['category']
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                website: initialData.website,
                username: initialData.username,
                ciphertext: initialData.ciphertext,
                category: initialData.category
            });
        } else {
            setFormData({ website: '', username: '', ciphertext: '', category: 'Other' });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-border/10 flex justify-between items-center bg-muted/20">
                            <h2 className="text-xl font-bold">
                                {initialData ? 'Edit Entry' : 'Add New Entry'}
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Website</label>
                                    <div className="relative group">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            value={formData.website}
                                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. Netflix"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Username</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            value={formData.username}
                                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all"
                                            placeholder="e.g. user@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            type="text" // Visible for now, toggle in future
                                            value={formData.ciphertext}
                                            onChange={e => setFormData({ ...formData, ciphertext: e.target.value })}
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all font-mono"
                                            placeholder="Secret Password"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Category</label>
                                    <div className="relative group">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Other">Other</option>
                                            <option value="Social">Social</option>
                                            <option value="Work">Work</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 rounded-xl hover:bg-muted font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Entry</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
