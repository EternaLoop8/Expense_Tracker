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
    <div className="p-6">
      {/* ✅ FORM */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          name="name"
          placeholder="Category"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="spent"
          placeholder="Spent"
          value={form.spent}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="total"
          placeholder="Total"
          value={form.total}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* ✅ GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolios.map((item) => {
          const spent = Number(item.spent) || 0;
          const total = Number(item.total) || 1;
          const percentage = Math.min((spent / total) * 100, 100);

          return (
            <div
              key={item._id}
              className="relative bg-white p-6 rounded-xl border shadow-sm"
            >
              {/* EDIT */}
              <div
                onClick={() => handleEdit(item)}
                className="absolute top-4 right-4 cursor-pointer"
              >
                <Pencil size={18} />
              </div>

              <p className="text-xs uppercase mb-2">{item.name}</p>

              <h2 className="text-xl font-bold mb-4">
                ₹{spent} / ₹{total}
              </h2>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className={item.color || "bg-blue-500"}
                  style={{ width: `${percentage}%`, height: "100%" }}
                />
              </div>

              <p className="text-xs text-right mt-2">
                {percentage.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;