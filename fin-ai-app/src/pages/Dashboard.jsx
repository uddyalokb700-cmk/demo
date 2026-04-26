import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

const COLORS = [
  "#50C878",
  "#8BFFB0",
  "#7A7A7A",
  "#4B4B4B",
  "#2F2F2F"
];

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/dashboard?user_id=demo_user`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="pt-32 text-center text-white">
        Loading dashboard...
      </main>
    );
  }

  const financial = data?.financial_summary || {};
  const tracker = data?.current_month_tracker || {};
  const summary = data?.summary || {};

  const trendData = Object.entries(
    summary.monthly_totals || {}
  ).map(([month, value]) => ({
    month: month.slice(5),
    balance: value * 1.4,
    spend: value
  }));

  const categoryData = Array.isArray(data?.top_categories)
    ? data.top_categories.map((item) => ({
        name: item.category,
        value: item.total
      }))
    : [];

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Overview
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back. Your financial twin is synced.
          </p>
        </div>

        <div className="px-3 py-1 border border-green-500 text-green-400 text-xs uppercase">
          Live Data
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Net Worth"
          value={`₹${financial.net_savings || 0}`}
          sub="+ Live backend"
        />

        <Card
          title="Monthly Spend"
          value={`₹${tracker.spent_so_far || 0}`}
          sub="Current month"
        />

        <Card
          title="Savings Rate"
          value={`${financial.savings_rate || 0}%`}
          sub="Based on sample data"
        />

      </div>

      {/* Chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Area Chart */}
        <div className="lg:col-span-2 p-6 bg-surface border border-white/5">
          <h3 className="text-xl text-white mb-5">
            Cashflow Trends
          </h3>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient
                    id="greenFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#50C878"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="#50C878"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#8BFFB0"
                  fillOpacity={1}
                  fill="url(#greenFill)"
                />

                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#7A7A7A"
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut */}
        <div className="p-6 bg-surface border border-white/5">
          <h3 className="text-xl text-white mb-5">
            Top Categories
          </h3>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {categoryData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 space-y-2">
            {categoryData.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-300">
                  {item.name}
                </span>

                <span className="text-white">
                  ₹{item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
}

function Card({ title, value, sub }) {
  return (
    <div className="p-6 bg-surface border border-white/5">
      <p className="text-gray-400 text-sm uppercase">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>

      <p className="text-green-400 text-sm mt-3">
        {sub}
      </p>
    </div>
  );
}

export default Dashboard;
