import { cn } from '../lib/utils';

export default function FilterBar({ categories, activeCategory, onSelectCategory }) {
    return (
        <div className="mb-8 flex overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2">
                <button
                    onClick={() => onSelectCategory('All')}
                    className={cn(
                        "rounded-full px-6 py-2 text-sm font-medium transition-all whitespace-nowrap",
                        activeCategory === 'All'
                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                    )}
                >
                    All Events
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={cn(
                            "rounded-full px-6 py-2 text-sm font-medium transition-all whitespace-nowrap",
                            activeCategory === category
                                ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
