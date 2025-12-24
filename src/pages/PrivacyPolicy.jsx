import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4">Privacy Policy</h1>

                <div className="space-y-6 text-slate-600">
                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">Data Collection</h2>
                        <p className="leading-relaxed">
                            When you register, we collect your name, .edu email address, and university affiliation to verify your student status.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">Information Usage</h2>
                        <p className="leading-relaxed">
                            We use this information to ensure a safe and exclusive environment for university students. Your data is used solely for verification and account management purposes within the CampusConnect platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about our privacy practices, please contact us at <a href="mailto:hassanali93r@gmail.com" className="text-cyan-600 hover:underline">hassanali93r@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
