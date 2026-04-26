import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
const API = import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";
const trendData = [
  { month: 'Oct', balance: 4200, spend: 3200 },
  { month: 'Nov', balance: 5100, spend: 2800 },
  { month: 'Dec', balance: 4800, spend: 3900 },
  { month: 'Jan', balance: 6200, spend: 2100 },
  { month: 'Feb', balance: 7500, spend: 2400 },
  { month: 'Mar', balance: 8450, spend: 2600 },
];

const categoryData = [
  { name: 'Housing', value: 1800 },
  { name: 'Food', value: 600 },
  { name: 'Transport', value: 400 },
  { name: 'Entertainment', value: 300 },
  { name: 'Utilities', value: 250 },
];
const COLORS = ['#50C878', '#98FF98', '#A8B2B2', '#343A3A', '#2A2F2F'];

const transactions = [
  { id: 1, merchant: 'Whole Foods Market', amount: -145.20, category: 'Food', date: 'Today, 2:45 PM' },
  { id: 2, merchant: 'Uber', amount: -24.50, category: 'Transport', date: 'Yesterday, 8:12 PM' },
  { id: 3, merchant: 'Netflix', amount: -15.99, category: 'Entertainment', date: 'Mar 15, 2026' },
  { id: 4, merchant: 'Acme Corp Salary', amount: 4200.00, category: 'Income', date: 'Mar 14, 2026' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container border border-white/10 p-3 shadow-xl">
        <p className="font-headline-md text-on-surface mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-body-md text-sm">
            {entry.name}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Dashboard() {
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-headline-xl text-3xl md:text-4xl font-bold text-on-surface">Overview</h1>
          <p className="font-body-md text-on-surface-variant">Welcome back. Your financial twin is synced.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-primary/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span>
          <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-primary">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="p-6 bg-surface-container-high border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10"></div>
          <span className="font-label-lg text-on-surface-variant text-sm uppercase tracking-widest block mb-2">Net Worth</span>
          <span className="font-headline-xl text-4xl text-on-surface font-bold">₹142,450.00</span>
          <div className="flex items-center gap-1 mt-4 text-primary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-body-sm text-sm">+2.4% this month</span>
          </div>
        </div>

        <div className="p-6 bg-surface-container border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/5 blur-2xl group-hover:bg-secondary/10"></div>
          <span className="font-label-lg text-on-surface-variant text-sm uppercase tracking-widest block mb-2">Monthly Spend</span>
          <span className="font-headline-xl text-4xl text-on-surface font-bold">₹3,350.69</span>
          <div className="flex items-center gap-1 mt-4 text-secondary">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            <span className="font-body-sm text-sm">-1.2% from last month</span>
          </div>
        </div>

        <div className="p-6 bg-surface-container border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="absolute top-1/2 right-0 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10"></div>
          <span className="font-label-lg text-on-surface-variant text-sm uppercase tracking-widest block mb-2">Savings Rate</span>
          <span className="font-headline-xl text-4xl text-on-surface font-bold">24.5%</span>
          <div className="flex items-center gap-1 mt-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span className="font-body-sm text-sm">On track for goal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-surface border border-white/5">
          <h3 className="font-headline-md text-xl text-on-surface mb-6">Cashflow Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#98FF98" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#98FF98" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A8B2B2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#A8B2B2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2F2F" vertical={false} />
                <XAxis dataKey="month" stroke="#A8B2B2" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A8B2B2" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="balance" stroke="#98FF98" fillOpacity={1} fill="url(#colorBalance)" />
                <Area type="monotone" dataKey="spend" stroke="#A8B2B2" fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 bg-surface border border-white/5 h-full">
            <h3 className="font-headline-md text-xl text-on-surface mb-4">Top Categories</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {categoryData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="font-body-md text-on-surface-variant">{item.name}</span>
                  </div>
                  <span className="font-body-md text-on-surface font-semibold">₹{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-4">
        <h3 className="font-headline-md text-xl text-on-surface mb-6">Recent Transactions</h3>
        <div className="w-full flex flex-col border border-white/5 bg-surface">
          {transactions.map((tx, idx) => (
            <div key={tx.id} className={`flex justify-between items-center p-4 ${idx !== transactions.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center bg-surface-container rounded-none ${tx.amount > 0 ? 'border-l-2 border-primary' : 'border-l-2 border-outline-variant'}`}>
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                    {tx.amount > 0 ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-md text-on-surface text-base">{tx.merchant}</span>
                  <span className="font-body-sm text-on-surface-variant text-xs">{tx.date} • {tx.category}</span>
                </div>
              </div>
              <span className={`font-body-md text-base ${tx.amount > 0 ? 'text-primary' : 'text-on-surface'}`}>
                {tx.amount > 0 ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
