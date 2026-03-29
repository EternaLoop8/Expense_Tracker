import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import API from "../../api";

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FORM STATE (moved to top)
  const [form, setForm] = useState({
    name: "",
    spent: "",
    total: "",
    color: "bg-blue-500",
  });

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        console.log("Calling API...");
        const res = await API.get("/portfolio");

        console.log("DATA:", res.data);

        setPortfolios(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/portfolio", form);

      setPortfolios((prev) => [...prev, res.data]);

      setForm({
        name: "",
        spent: "",
        total: "",
        color: "bg-blue-500",
      });
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // ✅ UPDATE
  const handleEdit = async (item) => {
    const newSpent = prompt("Enter new spent amount:", item.spent);
    if (!newSpent) return;

    try {
      const res = await API.put(`/portfolio/${item._id}`, {
        ...item,
        spent: newSpent,
      });

      setPortfolios((prev) =>
        prev.map((p) => (p._id === item._id ? res.data : p))
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ✅ LOADING
  if (loading) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  // ✅ EMPTY STATE
  if (portfolios.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No data found. Add one 👇
      </div>
    );
  }

  return (
   <div className="p-8 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="mb-8">
    <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
    <p className="text-gray-500 text-sm">Manage your budget categories and spending.</p>
  </div>

  {/* ✅ ENHANCED FORM */}
  <form onSubmit={handleSubmit} className="flex gap-4 mb-10 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 items-end flex-wrap">
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-400 ml-1">CATEGORY</label>
      <input
        type="text"
        name="name"
        placeholder="e.g. Groceries"
        value={form.name}
        onChange={handleChange}
        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 rounded-xl border outline-none transition-all w-48"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-400 ml-1">SPENT</label>
      <input
        type="number"
        name="spent"
        placeholder="₹0"
        value={form.spent}
        onChange={handleChange}
        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 rounded-xl border outline-none transition-all w-32"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-400 ml-1">LIMIT</label>
      <input
        type="number"
        name="total"
        placeholder="₹0"
        value={form.total}
        onChange={handleChange}
        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2.5 rounded-xl border outline-none transition-all w-32"
      />
    </div>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
      Add Category
    </button>
  </form>

  {/* ✅ ENHANCED GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {portfolios.map((item) => {
      const spent = Number(item.spent) || 0;
      const total = Number(item.total) || 1;
      const percentage = Math.min((spent / total) * 100, 100);
      const isOverBudget = percentage >= 100;

      return (
        <div
          key={item._id}
          className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Action Buttons (Visible on Hover) */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => handleEdit(item)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Pencil size={16} />
            </button>
          </div>

          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
            {item.name}
          </span>

          <div className="flex items-baseline gap-1 mt-1 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">₹{spent.toLocaleString()}</h2>
            <span className="text-gray-400 text-sm">/ ₹{total.toLocaleString()}</span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative">
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div
                className={`transition-all duration-700 ease-out rounded-full ${
                  isOverBudget ? "bg-red-500" : (item.color || "bg-blue-600")
                }`}
                style={{ width: `${percentage}%`, height: "100%" }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className={`text-xs font-bold ${isOverBudget ? "text-red-500" : "text-blue-600"}`}>
                {isOverBudget ? "Limit Reached" : `${percentage.toFixed(0)}% used`}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                ₹{Math.max(total - spent, 0).toLocaleString()} left
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

  );
};

export default Portfolio;