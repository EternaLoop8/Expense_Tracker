import React from 'react'

const Features = () => {
  const features = [
    "Track daily expenses in real-time",
    "Ideal for students, parents, and professionals",
    "Minimalist UI—completely free to use",
    "Export reports to Excel (Monthly, Weekly, Yearly)",
    "Built-in parental control features"
  ];

  return (
    // Removed max-w-4xl and mx-auto to stop it from centering
    <section className="py-16 px-6 w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Features
      </h2>
      
         {/* Grid now spans the full width of the screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {features.map((text, index) => (
          <div key={index} className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-blue-600 font-bold">✓</span>
            <p className="text-gray-700 font-medium leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features