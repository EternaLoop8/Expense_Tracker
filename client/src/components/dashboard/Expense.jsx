import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import * as XLSX from "xlsx";
import Transactions from "../../pages/Transactions.jsx";
import { useLocation } from "react-router-dom";
import API from "../../api.js";

const Expense = () => {
  const location = useLocation();
  const { hash } = location;

  // ✅ Scroll to section
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");

      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hash, location]);

  // ✅ STATES
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#4F46E5", "#EF4444", "#F59E0B", "#10B981", "#8B5CF6"];

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
          API.get("/transaction/stats?range=daily"),
          API.get("/transaction/stats?range=weekly"),
          API.get("/transaction/stats?range=monthly"),
        ]);

        setDailyData(dailyRes.data.data || []);
        setWeeklyData(weeklyRes.data.data || []);
        setMonthlyData(monthlyRes.data.data || []);
      } catch (err) {
        console.error("Stats error:", err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ EXPORT SINGLE
  const downloadSingleExcel = (categoryName, chartData) => {
    if (!chartData.length) return;

    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, categoryName);
    XLSX.writeFile(workbook, `${categoryName}_Expenses.xlsx`);
  };

  // ✅ EXPORT ALL
  const downloadAllExcel = () => {
    if (!dailyData.length && !weeklyData.length && !monthlyData.length) return;

    const workbook = XLSX.utils.book_new();

    const allData = {
      Daily: dailyData,
      Weekly: weeklyData,
      Monthly: monthlyData,
    };

    Object.keys(allData).forEach((key) => {
      const worksheet = XLSX.utils.json_to_sheet(allData[key]);
      XLSX.utils.book_append_sheet(workbook, worksheet, key);
    });

    XLSX.writeFile(workbook, "Full_Expense_Report.xlsx");
  };

  // ✅ CHART COMPONENT
  const ChartSection = ({ title, chartData, type }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition">
      
      {/* HEADER */}
      <div className="flex justify-between w-full items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

        <button
          onClick={() => downloadSingleExcel(type, chartData)}
          disabled={!chartData.length}
          className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-40"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      {/* CONTENT */}
      <div className="h-64 w-full flex items-center justify-center">

        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : chartData.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expense Analytics</h1>
            <p className="text-gray-500">Track and export your spending reports</p>
          </div>

          <button
            onClick={downloadAllExcel}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md"
          >
            Export All
          </button>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartSection title="Daily Summary" chartData={dailyData} type="Daily" />
          <ChartSection title="Weekly Summary" chartData={weeklyData} type="Weekly" />
          <ChartSection title="Monthly Summary" chartData={monthlyData} type="Monthly" />
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div id="transaction-part" className="scroll-mt-20 mt-12">
        <Transactions />
      </div>
    </div>
  );
};

export default Expense;