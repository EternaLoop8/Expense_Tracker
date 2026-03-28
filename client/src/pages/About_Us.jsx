import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        
        {/* Visible Header Section */}
        <header className="mb-10 text-center border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            About Team Eterna
          </h1>
          <p className="text-slate-600 leading-relaxed italic">
            "Solving real-world problems through the power of code."
          </p>
        </header>

        {/* Column Layout with Off-White Boxes */}
        <div className="space-y-6">
          
          {/* Mission Box */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Team Eterna, we specialize in building minimal, high-impact solutions for everyday challenges. 
              Our goal is to remove friction from your daily life through clean engineering and thoughtful design.
            </p>
          </section>

          {/* Join Us Box */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Join the Journey</h2>
            <p className="text-slate-600 text-sm mb-4">
              Are you a passionate developer? We are always looking for creative minds to collaborate with.
            </p>
            <a href="mailto:contact@eterna.com" className="text-sm font-semibold text-indigo-600 hover:underline">
              Reach out at contact@eterna.com
            </a>
          </section>

          {/* Feedback & Feedback Form Section */}
          <section className="p-6 bg-[#FAF9F6] border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your Experience Matters</h2>
            <p className="text-slate-600 text-sm mb-6">
              Share your thoughts on our apps or rate us on the 
              <a href="#" className="text-indigo-600 hover:underline ml-1">Google Play Store</a>.
            </p>
            
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Share your feedback..." 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
              />
              <button className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 active:scale-95 transition-all">
                Submit Feedback
              </button>
            </div>
          </section>

          {/* Footer Signature */}
          <footer className="text-center pt-8 border-t border-gray-100">
            <p className="text-slate-500 text-sm font-medium">
              Thank You! <br />
              <span className="text-slate-900 font-bold">Team Eterna</span>
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
