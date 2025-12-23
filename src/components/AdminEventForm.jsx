import { useState } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import EventCard from './EventCard';
import { createEvent } from '../lib/firestore';

export default function AdminEventForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        category: '',
        organizer: '',
        description: '',
        posterUrl: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Combine date and time
            const datetime = new Date(`${formData.date}T${formData.time}`);
            await createEvent({
                ...formData,
                date: datetime.toISOString()
            });
            // Reset form
            setFormData({
                title: '',
                date: '',
                time: '',
                category: '',
                organizer: '',
                description: '',
                posterUrl: ''
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            alert('Error creating event: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Create a preview object
    const previewData = {
        ...formData,
        // Construct a date object for preview even if incomplete
        date: formData.date ? new Date(`${formData.date}T${formData.time || '00:00'}`) : new Date()
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {/* Form Section */}
            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                <h2 className="mb-6 text-xl font-bold text-white uppercase tracking-wider">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-mono text-slate-400">EVENT_TITLE</label>
                        <input
                            name="title"
                            required
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                            placeholder="e.g. Summer Music Fest"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-mono text-slate-400">DATE</label>
                            <input
                                name="date"
                                type="date"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm [color-scheme:dark]"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-mono text-slate-400">TIME</label>
                            <input
                                name="time"
                                type="time"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm [color-scheme:dark]"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-mono text-slate-400">CATEGORY</label>
                            <select
                                name="category"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="" className="bg-slate-900">SELECT_CATEGORY...</option>
                                <option value="Academic" className="bg-slate-900">Academic</option>
                                <option value="Entertainment" className="bg-slate-900">Entertainment</option>
                                <option value="Sports" className="bg-slate-900">Sports</option>
                                <option value="Arts" className="bg-slate-900">Arts</option>
                                <option value="Social" className="bg-slate-900">Social</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-mono text-slate-400">ORGANIZER</label>
                            <input
                                name="organizer"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                placeholder="Club or Dept Name"
                                value={formData.organizer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-mono text-slate-400">POSTER_URL</label>
                        <div className="flex gap-2">
                            <input
                                name="posterUrl"
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                placeholder="https://..."
                                value={formData.posterUrl}
                                onChange={handleChange}
                            />
                            <button type="button" className="flex-shrink-0 p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                                <ImageIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 font-mono">Recommended: Unsplash or stable image links</p>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-mono text-slate-400">DESCRIPTION</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                            placeholder="Event protocol details..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-cyan-500/10 border border-cyan-500/50 py-3 font-bold text-cyan-400 uppercase tracking-widest transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
                    >
                        {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> PROCESSING...</span> : 'INITIATE_EVENT'}
                    </button>
                </form>
            </div>

            {/* Live Preview Section */}
            <div className="flex flex-col">
                <h2 className="mb-6 text-xl font-bold text-white uppercase tracking-wider">Live Preview</h2>
                <div className="flex-1 rounded-xl bg-black/20 border border-dashed border-white/10 p-8 flex items-center justify-center">
                    <div className="w-full max-w-sm pointer-events-none transform scale-95 lg:scale-100 transition-all">
                        <EventCard event={previewData} />
                    </div>
                </div>
                <p className="mt-4 text-center text-xs text-slate-500 font-mono uppercase tracking-widest">Visual Output Simulation</p>
            </div>
        </div>
    );
}
