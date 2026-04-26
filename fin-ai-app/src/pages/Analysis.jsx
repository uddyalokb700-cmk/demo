import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Analysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/analyze?user_id=demo_user`)
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
        Loading analysis...
      </main>
    );
  }

  const financial = data?.financial_summary || {};
  const summary = data?.summary || {};

  const monthlyData = Object.entries(summary.monthly_totals || {}).map(
    ([month, value]) => ({
      month: month.slice(5),
      spend: value
    })
  );

  const categoryData = (data?.top_categories || []).map((item) => ({
    name: item.category,
    total: item.total
  }));

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Analysis Engine
        </h1>
        <p className="text-gray-400 mt-2">
          Deep breakdown of your real spending patterns.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Total Inflow
          </p>
          <h2 className="text-3xl text-green-400 font-bold">
            ₹{financial.total_income || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Total Outflow
          </p>
          <h2 className="text-3xl text-red-400 font-bold">
            ₹{financial.total_expense || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Net Savings
          </p>
          <h2 className="text-3xl text-white font-bold">
            ₹{financial.net_savings || 0}
          </h2>
        </div>

      </div>

      {/* Monthly Spend */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Monthly Spending Trend
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="#50C878"
                fill="#98FF98"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Category Breakdown
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#50C878" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </main>
  );
}

export default Analysis;
