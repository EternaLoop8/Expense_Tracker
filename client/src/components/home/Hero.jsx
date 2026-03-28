import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    
  return (
    <section className="flex flex-col md:flex-row min-h-[80vh] items-center justify-between px-10 py-20 gap-10">
      {/* Left Side: Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
          Manage Your <br />
          <span className="text-blue-600">Budget</span> <br />
          with <span className="text-blue-600">PennyWise</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-md">
          Take control of your finances with our easy-to-use tracking tools.
          Smart budgeting starts here.
        </p>

        <div className="flex gap-5">
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition cursor-pointer"
            onClick={() => navigate("/login")}
            >
            Get Started
          </button>
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition cursor-pointer"
            onClick={() => navigate("/")}
          >
            Download on Android/ IOS
          </button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex justify-end">
        <img
          src="/img.png"
          alt="Budget Illustration"
          className="w-full max-w-lg object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Hero;
