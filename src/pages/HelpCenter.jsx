import React from 'react';
import { HelpCircle, Shield, Calendar, Users, Mail } from 'lucide-react';

export default function HelpCenter() {
    const sections = [
        {
            title: "Getting Started",
            icon: Users,
            faqs: [
                {
                    q: "How do I verify my account?",
                    a: "After signing up, check your inbox for a verification link sent to your .edu email address. Click the link to complete the verification process. This ensures that only verified students and faculty can access the platform."
                },
                {
                    q: "I didn’t receive my verification email.",
                    a: "Please check your Spam or Junk folder. Sometimes university firewalls block external emails. If you still don't see it, try resending the verification email from the login page or contact support."
                },
                {
                    q: "Can I use the app if I’m an alum or faculty?",
                    a: "Yes! Faculty and staff with a valid .edu email address are welcome. Alumni may use the app if they still retain access to their university email account."
                }
            ]
        },
        {
            title: "For Event Attendees",
            icon: Calendar,
            faqs: [
                {
                    q: "How do I RSVP?",
                    a: "Simply click the 'Going' button on an event card to confirm your attendance. You can use 'Interested' to save an event to your bookmarks without committing."
                },
                {
                    q: "How do I find events on my specific campus?",
                    a: "Use the filter bar on the homepage to browse events by category, date, or popularity. We prioritize events happening on your verified campus."
                },
                {
                    q: "Is my data private?",
                    a: "Yes. Your specific attendance list is visible only to you and the event organizer for logistics purposes. We do not share your personal data with third-party advertisers."
                },
                {
                    q: "How do I report a suspicious or 'fake' event?",
                    a: "If you encounter a listing that seems incorrect or dangerous, please contact support immediately via the footer link or email us directly."
                }
            ]
        },
        {
            title: "For Event Organizers",
            icon: HelpCircle,
            faqs: [
                {
                    q: "How do I list a new event?",
                    a: "Log in to the Admin Portal, navigate to 'Inject Data' (Event Creation), and fill out the details including title, date, venue, and a poster image. Click 'Initiate Event' to publish."
                },
                {
                    q: "How do I get a 'Verified Organization' badge?",
                    a: "Official student government clubs and departments can request verification by emailing us with proof of status. Verified badges help students trust your events."
                },
                {
                    q: "Can I edit an event after it's published?",
                    a: "Yes, you can edit event details from your dashboard at any time before the event starts."
                },
                {
                    q: "How do I see who has RSVP'd?",
                    a: "Your organizer dashboard provides analytics showing the number of 'Going' and 'Interested' responses."
                }
            ]
        },
        {
            title: "Safety & Community",
            icon: Shield,
            faqs: [
                {
                    q: "Reporting Harassment",
                    a: "We have zero tolerance for harassment. If you experience misconduct in comments or at an event, report it specific user or event to us immediately. We will investigate and take appropriate action, including account suspension."
                },
                {
                    q: "Event Guidelines",
                    a: "All events must comply with local laws and university codes of conduct. We prohibit listings that promote illegal drugs, violence, hazing, or hate speech. See our Terms of Service for the full list of prohibited conduct."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">How can we help?</h1>
                    <p className="text-lg text-slate-600">Browse common questions about using UniEvent.</p>
                </div>

                <div className="grid gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                                <section.icon className="w-6 h-6 text-cyan-600" />
                                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                            </div>
                            <div className="p-6 grid gap-6">
                                {section.faqs.map((faq, fIdx) => (
                                    <div key={fIdx} className="space-y-2">
                                        <h3 className="font-semibold text-slate-800 text-lg">{faq.q}</h3>
                                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Still need support?</h3>
                    <p className="text-slate-600 mb-6">Our team is available to assist you with any other inquiries.</p>
                    <a href="mailto:hassanali93r@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-colors">
                        <Mail className="w-5 h-5" />
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
