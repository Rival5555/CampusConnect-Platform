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
            <div className="rounded-xl bg-white p-6 shadow-md border border-slate-100">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Event Title</label>
                        <input
                            name="title"
                            required
                            className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="e.g. Summer Music Fest"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
                            <input
                                name="date"
                                type="date"
                                required
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Time</label>
                            <input
                                name="time"
                                type="time"
                                required
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                            <select
                                name="category"
                                required
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                <option value="Academic">Academic</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts">Arts</option>
                                <option value="Social">Social</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Organizer</label>
                            <input
                                name="organizer"
                                required
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="Club or Dept Name"
                                value={formData.organizer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Poster Image URL</label>
                        <div className="flex gap-2">
                            <input
                                name="posterUrl"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                placeholder="https://..."
                                value={formData.posterUrl}
                                onChange={handleChange}
                            />
                            <button type="button" className="flex-shrink-0 p-2 text-slate-400 hover:text-primary-600">
                                <ImageIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">Use Unsplash or similar for quick links.</p>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            placeholder="Event details..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                    >
                        {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</span> : 'Publish Event'}
                    </button>
                </form>
            </div>

            {/* Live Preview Section */}
            <div className="flex flex-col">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Live Preview</h2>
                <div className="flex-1 rounded-xl bg-slate-50 border border-dashed border-slate-300 p-8 flex items-center justify-center">
                    <div className="w-full max-w-sm pointer-events-none transform scale-95 lg:scale-100 transition-all">
                        <EventCard event={previewData} />
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-slate-500">This is how the event card will appear to students.</p>
            </div>
        </div>
    );
}
