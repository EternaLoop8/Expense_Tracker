import React from 'react';

const Testimonials = () => {
  const reviews = [
    { name: "Alex Rivera", review: "The minimalist UI makes tracking my daily spending effortless. Highly recommended!" },
    { name: "Sarah Chen", review: "The Excel export feature saved me hours during tax season. Best tool for freelancers." },
    { name: "James Wilson", review: "Perfect for students. It helped me save enough to pay off my semester books early." },
    { name: "Maria Garcia", review: "The parental controls are robust and easy to manage. My kids are learning financial literacy." }
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Header and Icons Inline */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-black">Testimonials</h2>
          
          {/* Navigation Icons: Gray circles */}
          <div className="flex gap-4">
            <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-400 transition-all cursor-pointer">
              <span className="mb-0.5 mr-0.5 text-lg">&lt;</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-400 transition-all cursor-pointer">
              <span className="mb-0.5 ml-0.5 text-lg">&gt;</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
              <p className="text-gray-600 mb-6 italic leading-relaxed">"{item.review}"</p>
              <div>
                <h4 className="font-bold text-black">{item.name}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Verified User</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;