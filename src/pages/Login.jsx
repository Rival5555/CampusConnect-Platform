import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield, Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('ACCESS_DENIED: Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0f172a] px-4 relative overflow-hidden font-sans text-slate-100">
            {/* Deep Space Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="glass-card rounded-2xl p-8 border border-white/10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center neon-glow">
                            <Shield className="h-6 w-6 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-wider uppercase mb-1">Admin//Portal</h1>
                        <p className="text-xs text-slate-400 font-mono tracking-widest">SECURE_LOGIN_REQUIRED</p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-mono text-red-400 flex items-center justify-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Identity_Key (Email)</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pl-10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                    placeholder="admin@campus.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Access_Code (Password)</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pl-10 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-cyan-600/80 border border-cyan-500 px-4 py-3 font-bold text-white uppercase tracking-widest transition-all hover:bg-cyan-500 hover:text-black neon-glow disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!loading && <span className="group-hover:translate-x-1 transition-transform">Authenticate_Session</span>}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
                    Restricted Access Area • V.2.0.4
                </p>
            </div>
        </div>
    );
}
