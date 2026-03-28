import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About_Us from "./pages/About_Us";
import Login from "./components/home/Login";
import SignUp from "./components/home/SignUp";
import TermsNConditions from "./pages/TermsNConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicies from "./pages/CookiesPolicies";
import Dashboard from './components/dashboard/Dashboard';
import Expense from './components/dashboard/Expense';
import Notification from './components/dashboard/Notification';
import Portfolio from './components/dashboard/Portfolio';
import Profile from './components/dashboard/Profile';
import Settings from './components/dashboard/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about_us" element={<About_Us />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditons" element={<TermsNConditions />} />
          <Route path="/cookies-policies" element={<CookiesPolicies />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense-data" element={<Expense />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App