import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const isAdminResponse = location.pathname.includes('/admin');

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md shadow-sm dark:bg-slate-950/80 dark:border-slate-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">UniEvent</span>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-500 hidden sm:inline-block">
                                Key: <span className="font-mono text-cyan-500">{currentUser.email}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className={cn(
                                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                                isAdminResponse ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"
                            )}
                        >
                            <User className="h-4 w-4" />
                            {isAdminResponse ? 'Admin Mode' : 'Admin Login'}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
