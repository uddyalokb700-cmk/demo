import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

const API = import.meta.env.VITE_API_URL;

const COLORS = ['#50C878', '#A8B2B2'];

function Analysis() {
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/dashboard?user_id=demo_user`)
      .then(res => res.json())
      .then(data => {
        const fs = data.financial_summary || {};
        setInflow(fs.total_income || 0);
        setOutflow(fs.total_expense || 0);
      })
      .catch(console.error);
  }, []);

  const chartData = [
    { name: 'Inflow', value: inflow },
    { name: 'Outflow', value: outflow }
  ];

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Analysis Engine</h1>
        <p className="font-body-md text-on-surface-variant">Real-time breakdown of your categorized transactions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 p-8 bg-surface border border-white/5 min-h-[400px] flex items-center justify-center">
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Inflow</h3>
            <span className="font-headline-xl text-secondary text-3xl">₹{inflow.toLocaleString()}</span>
          </div>

          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Outflow</h3>
            <span className="font-headline-xl text-on-surface text-3xl">₹{outflow.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analysis;
