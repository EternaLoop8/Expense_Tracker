import React from "react";

const Services = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Visible Header Section */}
        <header className="mb-10 text-center border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            Our Services
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Take command of your financial future with our intelligent expense
            tracking ecosystem.
          </p>
        </header>

        <div className="space-y-6">
          {/* Main App Description */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Smart Expense Tracker
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Designed to make your life more convenient, our tracker provides a
              clear overview of your spending habits, helping you cultivate
              better financial discipline.
            </p>
            {/* YouTube Placeholder */}
            <div className="relative aspect-video bg-slate-200 rounded-lg flex items-center justify-center border border-dashed border-slate-400 overflow-hidden">
              {/* The Placeholder (Always in the background) */}
              <p className="absolute text-slate-500 text-xs font-medium uppercase tracking-widest">
                Video Demo Coming Soon
              </p>

              {/* The Video (Sits on top if src is valid) */}
              <iframe
                className="w-full h-full z-10"
                src="https://www.youtube.com" // Use embed URL, not base site
                title="App Demo"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Parental Control Feature */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-slate-800">
                Family Safety
              </h2>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                NEW
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              Integrated parental controls allow you to monitor family spending
              and set healthy financial boundaries for younger users.
            </p>
          </section>

          {/* Support Section */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                Support & Queries
              </h2>
              <p className="text-slate-600 text-sm">
                Have doubts? Our team is here to help you 24/7.
              </p>
            </div>
            <button className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
              Contact Support
            </button>
          </section>

          {/* Quick Guide Placeholder */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              App Walkthrough
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 italic">
                Settings Screenshot
              </div>
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 italic">
                Dashboard View
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Services;
