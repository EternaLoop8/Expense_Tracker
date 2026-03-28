import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6 w-full mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
        
        {/* Column 1: Branding & Copyright */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter text-white italic">
            Expense <span className="text-blue-500">Tracker</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Simplifying finance for students, parents, and professionals worldwide.
          </p>
          <p className="text-gray-500 text-xs mt-6">
            © {new Date().getFullYear()} Expense Tracker | All Rights Reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Platform</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Features</li>
            <li className="hover:text-white cursor-pointer transition-colors">Services</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-white cursor-pointer transition-colors">Excel Reports</li>
          </ul>
        </div>

        {/* Column 3: Contact & About */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Get in Touch</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact Us:</li>
            <li className="text-blue-400 font-medium">support@expensetracker.com</li>
            <li className="text-sm text-gray-500 mt-2">Bhopal, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Minimal Strip */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
        <div className="flex gap-6">
          <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-400 cursor-pointer">Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
