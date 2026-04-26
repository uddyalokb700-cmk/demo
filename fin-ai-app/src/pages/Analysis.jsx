import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API = import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";
function Analysis() {
  
  const chartData = data?.summary?.monthly_totals
  ? Object.entries(data.summary.monthly_totals).map(([month, value]) => ({
      month,
      value
    }))
  : [];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${API}/api/analyze?user_id=demo_user`)
    .then(res => res.json())
    .then(result => {
      setData(result);
      setLoading(false);
    })
    .catch(err => console.log(err));
}, []);

if (loading) {
  return (
    <div className="pt-32 text-center text-white">
      Loading financial data...
    </div>
  );
}
  
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Analysis Engine</h1>
        <p className="font-body-md text-on-surface-variant">Real-time breakdown of your categorized transactions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
  <div className="lg:col-span-2 p-8 bg-surface border border-white/5 min-h-[400px]">

    {chartData.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#50C878"
            fill="#98FF98"
          />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <span className="text-on-surface-variant">No data available</span>
    )}

  </div>
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
             <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Inflow</h3>
             <span className="font-headline-xl text-secondary text-3xl">₹{data?.financial_summary?.total_income || 0}</span>
          </div>
          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
             <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Outflow</h3>
             <span className="font-headline-xl text-on-surface text-3xl">₹{data?.financial_summary?.total_expense || 0}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analysis;
