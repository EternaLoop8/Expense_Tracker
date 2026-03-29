import React, { useEffect, useState } from "react";
import API from "../api";
import { Trash, Pencil, Plus } from "lucide-react";

const Transactions = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    amount: "",
  });

  // FETCH
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get("/transaction/filter");

        const formatted = res.data.data.map((item) => {
          const amount = parseFloat(
            item.amount?.$numberDecimal || item.amount || 0,
          );

          return {
            id: item._id,
            n: item.category,
            d: item.description,
            rawAmount: amount,
            a: `-₹${amount.toFixed(2)}`,
          };
        });

        setExpenses(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  // SUBMIT (CREATE + EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.patch(`/transaction/${editId}`, formData);

        setExpenses((prev) =>
          prev.map((item) =>
            item.id === editId
              ? {
                  ...item,
                  n: formData.category,
                  d: formData.description,
                  rawAmount: formData.amount,
                  a: `-₹${parseFloat(formData.amount).toFixed(2)}`,
                }
              : item,
          ),
        );
      } else {
        const res = await API.post("/transaction", formData);

        const amount = parseFloat(res.data.amount);

        const newItem = {
          id: res.data._id,
          n: res.data.category,
          d: res.data.description,
          rawAmount: amount,
          a: `-₹${amount.toFixed(2)}`,
        };

        setExpenses((prev) => [newItem, ...prev]);
      }

      setShowModal(false);
      setEditId(null);
      setFormData({ category: "", description: "", amount: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      {/* LIST */}
      <div className="grid gap-4">
        {expenses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
            onClick={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
          >
            {/* TOP */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{item.n}</h2>
                <p className="text-gray-500">{item.a}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <Pencil
                  size={18}
                  className="text-blue-500 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditId(item.id);
                    setFormData({
                      category: item.n,
                      description: item.d,
                      amount: item.rawAmount,
                    });
                    setShowModal(true);
                  }}
                />

                <Trash
                  size={18}
                  className="text-red-500 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                />
              </div>
            </div>

            {/* EXPAND */}
            {expandedId === item.id && (
              <div className="mt-3 text-gray-600 border-t pt-2">
                <p>{item.d || "No description"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay (blur instead of black) */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Floating Box */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editId ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none transition"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none transition"
              />

              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none transition"
                required
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
