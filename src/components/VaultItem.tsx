import { VaultEntry } from "../types";
import { Key, User, Star, MoreVertical, Edit2, Trash2, Copy } from 'lucide-react';
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
    entry: VaultEntry;
    onEdit: (entry: VaultEntry) => void;
    onDelete: (id: number) => void;
    onToggleFavorite: (id: number) => void;
}

export default function VaultItem({ entry, onEdit, onDelete, onToggleFavorite }: Props) {
    const [showMenu, setShowMenu] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // Toast logic to be added in Day 4
        console.log("Copied:", text);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 p-5 rounded-2xl transition-all hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
                        ${entry.category === 'Work' ? 'bg-blue-500/10 text-blue-500' :
                            entry.category === 'Social' ? 'bg-pink-500/10 text-pink-500' :
                                entry.category === 'Shopping' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-primary/10 text-primary'}`}
                    >
                        {entry.website[0].toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg leading-tight">{entry.website}</h3>
                        <p className="text-sm text-muted-foreground">{entry.username}</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        onBlur={() => setTimeout(() => setShowMenu(false), 200)}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-8 w-32 bg-card border border-border rounded-xl shadow-xl z-20 py-1 flex flex-col">
                            <button onClick={() => onEdit(entry)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-left">
                                <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button onClick={() => onDelete(entry.id)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-destructive/10 text-destructive text-left">
                                <Trash2 className="w-3 h-3" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => handleCopy(entry.ciphertext)}
                    className="flex-1 bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all group/btn"
                >
                    <Key className="w-4 h-4" />
                    <span className="group-hover/btn:hidden">Password</span>
                    <span className="hidden group-hover/btn:inline">Copy</span>
                </button>
                <button
                    onClick={() => handleCopy(entry.username)}
                    className="flex-1 bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
                >
                    <User className="w-4 h-4" />
                    <span>User</span>
                </button>
            </div>

            <button
                onClick={() => onToggleFavorite(entry.id)}
                className={`absolute top-4 right-10 transition-colors ${entry.isFavorite ? 'text-yellow-500' : 'text-muted/20 group-hover:text-yellow-500/50 hover:!text-yellow-500'}`}
            >
                <Star className={`w-5 h-5 ${entry.isFavorite ? 'fill-current' : ''}`} />
            </button>
        </motion.div>
    );
}
