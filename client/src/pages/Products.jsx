import React from 'react';

const Products = () => {
  const productList = [
    { name: "ShopEZ", description: "Smart shopping assistance app." },
    { name: "Health & Fitness", description: "Comprehensive wellness and activity tracker." },
    { name: "Smart To-do List", description: "AI-enabled task management for peak productivity." },
    { name: "SafeKids", description: "Real-time tracking and contact tool for parents." },
    { name: "Parental Control", description: "Unified safety features for Web, Android, and iOS." }
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Visible Heading with high contrast */}
        <header className="mb-10 text-center border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            Our Product Pipeline
          </h1>
          <p className="text-slate-600 leading-relaxed">
            We are engineering innovative solutions to address real-world challenges. 
            Explore our upcoming ecosystem of intelligent applications.
          </p>
        </header>

        {/* Column Layout with Off-White Boxes */}
        <div className="space-y-4">
          {productList.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-5 bg-[#FAF9F6] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
