import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import {Wallet,User,Briefcase,TrendingDown,Settings,LogOut, Menu,X,Plus, Calendar,
} from "lucide-react";
import {BarChart,Bar, XAxis,CartesianGrid,Tooltip,ResponsiveContainer,Cell,
} from "recharts";
import API from "../../api";

const chartData = [
  { name: "mon", income: 30, expense: 20 },
  { name: "tue", income: 45, expense: 15 },
  { name: "wed", income: 35, expense: 25 },
  { name: "thurs", income: 60, expense: 30 },
  { name: "fri", income: 40, expense: 20 },
  { name: "sat", income: 30, expense: 15 },
  { name: "sun", income: 35, expense: 18 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
  });
  const [expenses, setExpenses] = useState([]);

  // Dynamic Date
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calculate Remaining Wallet Balance (Starting from $5000 for example)
  const initialBalance = 5000;
  const totalSpent = expenses.reduce(
    (acc, curr) => acc + Math.abs(parseFloat(curr.rawAmount)),
    0,
  );
  const remainingBalance = initialBalance - totalSpent;

  const navItems = [
    { n: "Dashboard", i: <Menu size={18} />, a: true, path: "/dashboard" },
    { n: "Profile", i: <User size={18} />, path: "/profile" },
    { n: "Portfolio", i: <Briefcase size={18} />, path: "/portfolio" },
    { n: "Expense Data", i: <TrendingDown size={18} />, path: "/expense-data" },
    { n: "Settings", i: <Settings size={18} />, path: "/settings" },
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await API.get("/todayspent");
        const formattedData = response.data.data.map((item) => ({
          id: item._id,
          n: item.category,
          d: item.description,
          rawAmount: item.amount?.$numberDecimal || item.amount || 0,
          a: `-${parseFloat(item.amount?.$numberDecimal || item.amount || 0).toFixed(2)} ₹`,
        }));
        setExpenses(formattedData);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/todayspent", {
        category: formData.category,
        description: formData.description,
        amount: formData.amount,
        currency: "INR",
      });

      const newExpense = {
        id: response.data._id,
        n: response.data.category,
        d: response.data.description,
        rawAmount: response.data.amount?.$numberDecimal || response.data.amount,
        a: `-${parseFloat(response.data.amount?.$numberDecimal || response.data.amount).toFixed(2)} ₹`,
      };

      setExpenses([newExpense, ...expenses]);
      setFormData({ category: "", description: "", amount: "" });
      setShowModal(false);
    } catch (err) {
      alert("Error saving: " + (err.response?.data?.message || err.message));
    }
  };

  const handleNavClick = (item) => {
    // If clicking Dashboard while already on dashboard, close the sidebar
    if (item.path === "/dashboard" && location.pathname === "/dashboard") {
      setIsSidebarOpen(false);
    } else {
      navigate(item.path);
      // On mobile, close sidebar after navigation
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#F8F9FD] font-sans relative">
      {/* Sidebar - Handles both Mobile and Desktop toggle */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col p-8 transition-transform duration-300 ease-in-out lg:relative ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:hidden"}`}
      >
        <div className="flex items-center justify-between mb-12 text-[#5D3891]">
          <div className="flex items-center gap-3">
            <div className="bg-[#5D3891] p-1.5 rounded-lg text-white">
              <Wallet size={20} />
            </div>
            <h1 className="font-bold text-2xl tracking-tight">PennyWise</h1>
          </div>
          {/* Close button for mobile */}
        </div>

        <nav className="flex-1 space-y-4 text-sm font-bold">
          {navItems.map((item) => (
            <button
              key={item.n}
              onClick={() => handleNavClick(item)}
              className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all cursor-pointer ${location.pathname === item.path ? "bg-[#5D3891] text-white shadow-lg" : "text-gray-600 hover:text-[#5D3891]"}`}
            >
              {item.i} <span>{item.n}</span>
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-4 p-3 text-red-400 font-bold mt-auto">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 lg:p-10 overflow-x-hidden">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            {/* Hamburger Icon: Shows when sidebar is closed (Desktop) or always on Mobile */}
            {(!isSidebarOpen || window.innerWidth < 1024) && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={28} className="text-gray-600" />
              </button>
            )}
            <h2 className="text-xl lg:text-3xl flex items-center gap-2 text-gray-500 font-extrabold uppercase tracking-wider">
              <Calendar size={25} /> {today}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://ui-avatars.com" alt="user" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* WALLET BOX AREA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Wallet Card */}
              <div className="bg-[#5D3891] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-white/60 text-[10px] uppercase font-black tracking-widest mb-1">
                    Total Wallet Balance
                  </p>
                  <h3 className="text-4xl font-black mb-6">
                    {remainingBalance.toLocaleString()} ₹
                  </h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-[8px] uppercase font-bold">
                        Account Holder
                      </p>
                      <p className="text-sm font-bold uppercase tracking-tighter">
                        Rozario Chris
                      </p>
                    </div>
                    <Wallet size={32} className="opacity-40" />
                  </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Today's Spending Summary */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col justify-center">
                <p className="text-gray-300 text-[10px] uppercase font-black tracking-widest mb-1">
                  Today's Total Spend
                </p>
                <h3 className="text-3xl font-black text-[#FF8A3D]">
                  {totalSpent.toFixed(2)} ₹
                </h3>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-green-500 uppercase">
                  <TrendingDown size={14} /> x% less than yesterday
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50">
              <h3 className="font-black text-xl mb-6">Statistics</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar
                      dataKey="expense"
                      fill="#FFE5D1"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar dataKey="income" fill="#5D3891" radius={[4, 4, 0, 0]} barSize={8} >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.name === "thurs" ? "#5D3891" : "#8B5CF6"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
            <h3 className="font-black text-xl mb-6"> Recent Transactions</h3>
            <div className="space-y-6 overflow-y-auto max-h-125 pr-2 scrollbar-hide">
              {/* Use .slice(0, 5) to limit the output */}
              {expenses.slice(0, 5).map((exp, idx) => (
                <div
                  key={exp.id || idx} // Use unique ID if available for better performance
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-sm text-gray-800">{exp.n}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        {exp.d || "General"}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-red-500">
                    {exp.a}
                  </span>
                </div>
              ))}

              {/* Fallback if no expenses exist */}
              {expenses.length === 0 && (
                <p className="text-gray-300 text-sm italic text-center py-10">
                  No data found
                </p>
              )}

              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#5D3891] text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-lg hover:brightness-110 transition-all"
                >
                  <Plus size={18} /> Add New
                </button>
                <Link to ="/expense-data#transaction-part"
                  className="bg-[#5D3891] text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-lg hover:brightness-110 transition-all"
                >
                  View more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-black mb-8 text-[#5D3891]">
              New Expense
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-purple-100 transition-all"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <input
                required
                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-purple-100 transition-all"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                required
                type="number"
                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border-2 border-transparent focus:border-purple-100 transition-all"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-[#5D3891] text-white py-4 rounded-2xl font-black shadow-lg shadow-purple-100 mt-4 active:scale-95 transition-transform"
              >
                Save to Wallet
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
