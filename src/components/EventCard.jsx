import { Calendar, MapPin, Tag } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function EventCard({ event }) {
    const { title, date, category, organizer, description, posterUrl } = event;
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const [isLiked, setIsLiked] = useState(false);
    const [isGoing, setIsGoing] = useState(false);

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            {/* Poster Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                    src={posterUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Date Badge */}
                <div className="absolute left-4 top-4 flex flex-col items-center justify-center rounded-lg bg-white/95 px-3 py-2 text-center text-slate-900 shadow-sm backdrop-blur-sm">
                    <span className="text-xs font-bold uppercase text-red-500">{dateObj.toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-xl font-bold font-heading leading-none">{dateObj.getDate()}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {category}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-primary-600 font-semibold">{organizer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {timeStr}</span>
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-2">{title}</h3>
                <p className="mb-4 text-sm text-slate-600 line-clamp-2 flex-grow">{description}</p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <button className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700">
                        View Details
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={cn(
                                "rounded-full p-2 transition-colors",
                                isLiked ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                            )}
                            title="Interested"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        </button>
                        <button
                            onClick={() => setIsGoing(!isGoing)}
                            className={cn(
                                "rounded-full p-2 transition-colors",
                                isGoing ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-green-600"
                            )}
                            title="Going"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isGoing ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
