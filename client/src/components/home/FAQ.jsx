import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is my financial data secure?",
      answer: "Yes. We use industry-standard encryption to ensure your data stays private and is never shared with third parties."
    },
    {
      question: "Can I export my data to Excel?",
      answer: "Absolutely. You can download your weekly, monthly, or yearly reports in CSV or Excel format at any time."
    },
    {
      question: "Is there a limit on daily transactions?",
      answer: "No. You can track as many expenses and income sources as you need, even on the free plan."
    },
    {
      question: "How do the parental controls work?",
      answer: "Parents can set up 'Child Accounts' to monitor spending habits and receive real-time alerts on large transactions."
    }
  ];

  return (
    <section className="py-16 px-6 w-full bg-white">
      <h2 className="text-3xl font-bold text-black mb-12">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 shadow-sm hover:shadow-md transition-all cursor-pointer h-fit"
            onClick={() => toggleFAQ(index)}
          >
            {/* Question Header */}
            <div className="flex justify-between items-center gap-4">
              <h4 className="font-bold text-black text-lg">{faq.question}</h4>
              <span className={`text-gray-400 text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                ▾
              </span>
            </div>

            {/* Answer: Smoothly shows when open */}
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
