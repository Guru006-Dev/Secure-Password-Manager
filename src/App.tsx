import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Unlock from './pages/Unlock';
import Settings from './pages/Settings';
import Generator from './pages/Generator';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VaultProvider } from './context/VaultContext';
import { ThemeProvider } from './context/ThemeContext';

function AuthenticatedApp() {
    const { isLocked } = useAuth();

    if (isLocked) {
        return <Unlock />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row transition-colors duration-500">
            {/* Navigation Sidebar/Top bar */}
            <Navigation />

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[10px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[10px]" />
                </div>

                <div className="relative z-10 h-full overflow-auto">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/generator" element={<Generator />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <VaultProvider>
                    <Router>
                        <AuthenticatedApp />
                    </Router>
                </VaultProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
