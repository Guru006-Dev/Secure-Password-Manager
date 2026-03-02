import { Shield, LayoutDashboard, Lock, Settings, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { panic } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Shield, label: 'Generator', path: '/generator' },
        { icon: Settings, label: 'Settings', path: '/settings' }, // Enabled
    ];

    return (
        <aside className="w-full md:w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl md:h-screen sticky top-0 z-50 flex flex-col">
            <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">Secure Vault</h1>
                        <p className="text-xs text-muted-foreground">Day 2: Authentication</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => !item.disabled && navigate(item.path)}
                            disabled={item.disabled}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                : item.disabled
                                    ? 'opacity-50 cursor-not-allowed text-muted-foreground'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {item.disabled && <span className="ml-auto text-[10px] uppercase font-bold bg-muted px-1.5 py-0.5 rounded">Soon</span>}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-border/20 space-y-4">
                <button
                    onClick={panic}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 font-medium group"
                >
                    <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    <span>Panic Lock</span>
                </button>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Welcome User</p>
                            <p className="text-xs text-muted-foreground">Project Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
