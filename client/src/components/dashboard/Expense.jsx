import React, { useState, useEffect } from 'react'; // Combined imports
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import Transactions from '../../pages/Transactions.jsx';
import { useLocation } from 'react-router-dom';

const Expense = () => {
    // 1. Get location and hash
  const location = useLocation();
  const { hash } = location;

  useEffect(() => {
    if (hash) {
      // Find the ID (removing the # character)
      const targetId = hash.replace('#', '');
      
      // Use a slightly longer delay to wait for API data/rendering
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 500); // 500ms is safer for MERN apps

      return () => clearTimeout(timer);
    }
  }, [hash, location]); // Watch both hash and location

  const [data] = useState({
    daily: [
      { name: 'Food', value: 400 },
      { name: 'Transport', value: 100 },
      { name: 'Entertainment', value: 50 },
    ],
    weekly: [
      { name: 'Groceries', value: 2500 },
      { name: 'Rent/Bills', value: 1500 },
      { name: 'Shopping', value: 1200 },
    ],
    monthly: [
      { name: 'Housing', value: 15000 },
      { name: 'Investments', value: 8000 },
      { name: 'Healthcare', value: 2000 },
    ],
  });

  const COLORS = ['#4F46E5', '#EF4444', '#F59E0B', '#10B981'];

  const downloadSingleExcel = (categoryName, chartData) => {
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, categoryName);
    XLSX.writeFile(workbook, `${categoryName}_Expenses.xlsx`);
  };

  const downloadAllExcel = () => {
    const workbook = XLSX.utils.book_new();
    Object.keys(data).forEach(key => {
      const worksheet = XLSX.utils.json_to_sheet(data[key]);
      XLSX.utils.book_append_sheet(workbook, worksheet, key.toUpperCase());
    });
    XLSX.writeFile(workbook, "Full_Expense_Report.xlsx");
  };

  const ChartSection = ({ title, chartData, type }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <button 
          onClick={() => downloadSingleExcel(type, chartData)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expense Analytics</h1>
            <p className="text-gray-500">Track and export your individual spending reports</p>
          </div>
          <button 
            onClick={downloadAllExcel}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartSection title="Daily Summary" chartData={data.daily} type="Daily" />
          <ChartSection title="Weekly Summary" chartData={data.weekly} type="Weekly" />
          <ChartSection title="Monthly Summary" chartData={data.monthly} type="Monthly" />
        </div>
      </div>

      {/* Added scroll-mt-20 to handle fixed headers */}
      <div id='transaction-part' className="scroll-mt-20 mt-12">
        <Transactions />
      </div>
    </div>
  );
};

export default Expense;
