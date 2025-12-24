import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-[#111827] text-gray-300 border-t border-gray-800 font-sans">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Brand & Newsletter */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                UniEvent
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Discover the latest campus events, workshops, and gatherings. Stay connected with your university community.
                        </p>

                        <div className="pt-2">
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Subscribe to updates</h4>
                            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                                <div className="relative flex-grow">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full bg-gray-800 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                        aria-label="Email address for newsletter"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group"
                                    aria-label="Subscribe to newsletter"
                                >
                                    Subscribe
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Column 2: Browse Events */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Browse Events</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/events" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 block w-max">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/trending" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 block w-max">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                    Trending Now
                                </Link>
                            </li>
                            <li>
                                <Link to="/weekend" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 block w-max">
                                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    This Weekend
                                </Link>
                            </li>
                            <li>
                                <Link to="/archived" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 block w-max">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                                    Past Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Categories</h3>
                        <ul className="space-y-4">
                            {['Music & Concerts', 'Tech & Workshops', 'Arts & Culture', 'Sports & Fitness', 'Academic Seminars'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Support & Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
                        <ul className="space-y-4 mb-8">
                            <li><Link to="/help" className="text-gray-400 hover:text-cyan-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>

                            <li className="pt-2">
                                <a href="mailto:hassanali93r@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">hassanali93r@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+923095436018" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">+92 309 543 6018</span>
                                </a>
                            </li>
                        </ul>

                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, label: 'X (Twitter)', href: 'https://twitter.com/IamHassan09' },
                                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hasanaly_____/' },
                                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/hasanali09/' },
                                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/hasanali09' },
                            ].map((Social, index) => (
                                <a
                                    key={index}
                                    href={Social.href}
                                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition-all duration-300"
                                    aria-label={Social.label}
                                >
                                    <Social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} UniEvent. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/accessibility" className="hover:text-cyan-400 transition-colors">Accessibility</Link>
                        <Link to="/sitemap" className="hover:text-cyan-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
