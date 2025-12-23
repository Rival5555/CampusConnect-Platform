import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, ArrowLeft, Trash2, Shield, Activity, Database } from 'lucide-react';
import AdminEventForm from '../components/AdminEventForm';
import { getEvents, deleteEvent } from '../lib/firestore';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'create'
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch events for list view
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (err) {
            console.warn("Failed to fetch events (likely need auth)", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (view === 'list') {
            fetchEvents();
        }
    }, [view]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            fetchEvents();
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans relative overflow-hidden">
            {/* Deep Space Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            {/* Admin Header */}
            <header className="relative z-10 glass-panel border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center neon-glow">
                            <Shield className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-wider text-white uppercase">Admin Console</h1>
                            <p className="text-xs text-slate-400 font-mono">SYS.ADMIN.V.2.0</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest border border-transparent hover:border-cyan-500/30 px-4 py-2 rounded-lg"
                        >
                            <LogOut className="h-4 w-4" />
                            Disconnect
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-4 py-8 animate-fade-in">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-light text-white mb-2">
                            {view === 'list' ? 'System Overview' : 'Initialize Event'}
                        </h2>
                        <p className="text-slate-400 font-mono text-sm">
                            {view === 'list' ? '> Monitoring active campus data streams' : '> Inputting new event protocols'}
                        </p>
                    </div>

                    {view === 'list' ? (
                        <button
                            onClick={() => setView('create')}
                            className="group flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/50 px-6 py-3 text-sm font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all neon-glow"
                        >
                            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                            <span className="uppercase tracking-wider">Inject Data</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setView('list')}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 transition-all font-mono"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Return_To_Grid
                        </button>
                    )}
                </div>

                {view === 'create' && (
                    <div className="glass-card rounded-2xl p-8 border border-white/10 bg-black/20">
                        <AdminEventForm onSuccess={() => setView('list')} />
                    </div>
                )}

                {view === 'list' && (
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-black/20 text-xs uppercase tracking-widest text-slate-500 font-mono">
                                    <tr>
                                        <th className="px-6 py-5 font-medium border-b border-white/5">Event_ID</th>
                                        <th className="px-6 py-5 font-medium border-b border-white/5">Timestamp</th>
                                        <th className="px-6 py-5 font-medium border-b border-white/5">Category</th>
                                        <th className="px-6 py-5 font-medium text-right border-b border-white/5">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-cyan-500/5 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-white">
                                                <div className="flex items-center gap-3">
                                                    <Activity className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                                                    {event.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">
                                                {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-sm bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-300">
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {events.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-20 text-center text-slate-500 font-mono">
                                                <Database className="h-8 w-8 mx-auto mb-4 opacity-50" />
                                                [NULL DATA STREAM] Awaiting input...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
