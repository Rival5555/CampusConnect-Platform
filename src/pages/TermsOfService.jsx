import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-8 text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4">Terms of Service</h1>

                <div className="space-y-8 text-slate-600">
                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">1. User Eligibility (The ".edu" Rule)</h2>
                        <p className="leading-relaxed">
                            To use UniEvent, you must be a currently enrolled student, faculty member, or staff member with a valid university-issued email address. Accounts created with non-educational emails may be suspended.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">2. No Agency (The "We Don't Run the Party" Clause)</h2>
                        <p className="leading-relaxed">
                            UniEvent is a discovery platform. We do not host, manage, or organize the events listed. UniEvent is not responsible for event cancellations, changes in venue, or the conduct of any person attending an event discovered through the app.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">3. User-Generated Content (UGC)</h2>
                        <p className="leading-relaxed">
                            By posting an event, you grant UniEvent a non-exclusive, royalty-free license to display and distribute that content. You represent that you own the rights to any photos or text you upload.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">4. Prohibited Conduct (The "Safety" Clause)</h2>
                        <p className="leading-relaxed">
                            Users may not post events that promote illegal activities, underage drinking, hazing, or harassment. Events must comply with both local laws and the Student Code of Conduct of the respective University. We reserve the right to remove any listing at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">5. Limitation of Liability (The "Risk" Clause)</h2>
                        <p className="leading-relaxed">
                            You attend events at your own risk. UniEvent shall not be liable for any personal injury, property damage, or theft occurring at or in connection with any event listed on our platform.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
