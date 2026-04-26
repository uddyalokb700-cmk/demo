import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

const COLORS = [
  "#50C878",
  "#98FF98",
  "#A8B2B2",
  "#343A3A",
  "#2A2F2F"
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-32 text-center text-white">Loading Dashboard...</div>;
  }

  const summary = data?.summary || {};
  const financial = data?.financial_summary || {};
  const behavior = data?.behavior_profile || {};
  const forecast = data?.forecast || {};

  const trendData = Object.entries(summary.monthly_totals || {}).map(
    ([month, value]) => ({
      month,
      spend: value
    })
  );

  const categoryData = (data?.top_categories || []).map((item) => ({
    name: item.category,
    value: item.total
  }));

  return (
    <main className="pt-24 px-6 text-white space-y-8">

      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 bg-zinc-900 rounded-xl">
          <p>Income</p>
          <h2 className="text-3xl text-green-400">
            ₹{financial.total_income || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-xl">
          <p>Expenses</p>
          <h2 className="text-3xl text-red-400">
            ₹{financial.total_expense || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-xl">
          <p>Savings</p>
          <h2 className="text-3xl text-white">
            ₹{financial.net_savings || 0}
          </h2>
        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 p-6 bg-zinc-900 rounded-xl h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area dataKey="spend" stroke="#50C878" fill="#98FF98" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-zinc-900 rounded-xl h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value">
                {categoryData.map((item, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="p-6 bg-zinc-900 rounded-xl">
        <p>Spending Personality</p>

        <h2 className="text-2xl text-green-400">
          {behavior.label || "Balanced"}
        </h2>

        <p>Score: {behavior.score || 0}</p>
      </div>

      <div className="p-6 bg-zinc-900 rounded-xl">
        <p>Forecast</p>
        <h2 className="text-3xl text-green-400">
          ₹{forecast.predicted_amount || 0}
        </h2>
      </div>

    </main>
  );
}

export default Dashboard;
