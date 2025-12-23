import { useState, useEffect } from 'react';
import { ChevronRight, Search, Calendar, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { getEvents } from '../lib/firestore';

const DUMMY_EVENTS = [
    {
        id: '1',
        title: 'Neon Nights Music Festival',
        date: '2023-11-15T20:00:00',
        category: 'Entertainment',
        organizer: 'Student Union',
        description: 'Experience the biggest campus concert of the year under neon lights. Featuring local bands and DJ sets all night long.',
        posterUrl: 'https://images.unsplash.com/photo-1459749411177-287ce63e3ba0?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        title: 'Future Tech Summit 2023',
        date: '2023-11-20T09:00:00',
        category: 'Academic',
        organizer: 'Computer Science Dept',
        description: 'Join industry leaders and academic pioneers for a day of talks on AI, Quantum Computing, and the future of tech.',
        posterUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '3',
        title: 'Campus Art Showcase',
        date: '2023-11-25T14:00:00',
        category: 'Arts',
        organizer: 'Fine Arts Club',
        description: 'A gallery walk featuring student works including painting, sculpture, and digital media. Light refreshments provided.',
        posterUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60'
    },
];

const CATEGORIES = ['Academic', 'Entertainment', 'Sports', 'Arts', 'Social'];

import Typewriter from '../components/Typewriter';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Attempt to fetch from Firestore
                const data = await getEvents();
                if (data.length > 0) {
                    setEvents(data);
                } else {
                    // Fallback to dummy data if empty (or if credentials missing implies empty result/error handled)
                    setEvents(DUMMY_EVENTS);
                }
            } catch (err) {
                console.warn("Firestore fetch failed, using dummy data", err);
                setEvents(DUMMY_EVENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" className="h-full w-full object-cover opacity-20" alt="Campus" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-300 mb-6 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary-400 mr-2 animate-pulse"></span>
                        Live Campus Updates
                    </div>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto leading-tight min-h-[1.2em]">
                        <Typewriter
                            typingSpeed={70}
                            segments={[
                                { text: "Discover What's Happening on ", className: "" },
                                { text: "Campus", className: "text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400" }
                            ]}
                        />
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
                        Your central hub for university events. From academic workshops to weekend parties, never miss out on the campus life experience.
                    </p>

                    <div className="mx-auto max-w-lg relative group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 opacity-25 blur transition duration-200 group-hover:opacity-50"></div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for events..."
                                className="w-full rounded-full border-0 bg-white/10 px-6 py-4 pl-12 text-white placeholder:text-slate-400 backdrop-blur-md focus:ring-2 focus:ring-primary-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Container */}
            <section className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="rounded-3xl bg-slate-50 p-8 pt-12"> {/* Used slate-50 to blend, added padding */}

                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Calendar className="h-6 w-6 text-primary-600" />
                            Upcoming Events
                        </h2>
                        <FilterBar
                            categories={CATEGORIES}
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />
                    </div>

                    {loading ? (
                        <div className="py-20 text-center text-slate-500">Loading experience...</div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}

                            {filteredEvents.length === 0 && (
                                <div className="col-span-full py-20 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                        <Search className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900">No events found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
