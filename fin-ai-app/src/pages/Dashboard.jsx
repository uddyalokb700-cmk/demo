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
  "#2A2F2F",
  "#6EE7B7"
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
        Loading Dashboard...
      </main>
    );
  }

  const dashboard = data || {};
  const tracker = dashboard.current_month_tracker || {};
  const summary = dashboard.summary || {};
  const financial = dashboard.financial_summary || {};
  const behavior = dashboard.behavior_profile || {};
  const forecast = dashboard.forecast || {};
  const alerts = dashboard.alerts || {};

  const trendData = Object.entries(summary.monthly_totals || {}).map(
    ([month, value]) => ({
      month: month.slice(5),
      spend: value
    })
  );

  const categoryData = (dashboard.top_categories || []).map((item) => ({
    name: item.category,
    value: item.total
  }));

  const unreadAlerts = [
    ...(alerts.critical || []),
    ...(alerts.warning || []),
    ...(alerts.info || [])
  ].slice(0, 5);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container border border-white/10 p-3 shadow-xl">
          <p className="text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Overview</h1>
          <p className="text-gray-400">
            Welcome back. Your financial twin is synced.
          </p>
        </div>

        <div className="px-4 py-2 border border-green-500 text-green-400 text-xs uppercase">
          Live Data
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 mb-2 uppercase text-sm">
            Monthly Budget
          </p>
          <h2 className="text-3xl font-bold text-white">
            ₹{tracker.monthly_budget || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 mb-2 uppercase text-sm">
            Spent So Far
          </p>
          <h2 className="text-3xl font-bold text-white">
            ₹{tracker.spent_so_far || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 mb-2 uppercase text-sm">
            Savings Rate
          </p>
          <h2 className="text-3xl font-bold text-green-400">
            {financial.savings_rate || 0}%
          </h2>
        </div>

      </div>

      {/* Graph + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 p-6 bg-surface border border-white/5">
          <h3 className="text-xl text-white mb-6">Monthly Spending</h3>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
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

        <div className="p-6 bg-surface border border-white/5">
          <h3 className="text-xl text-white mb-4">Top Categories</h3>

          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {categoryData.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-300">{item.name}</span>
                <span className="text-white">
                  ₹{item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400">Income</p>
          <h2 className="text-2xl text-green-400">
            ₹{financial.total_income || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400">Expenses</p>
          <h2 className="text-2xl text-red-400">
            ₹{financial.total_expense || 0}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400">Net Savings</p>
          <h2 className="text-2xl text-white">
            ₹{financial.net_savings || 0}
          </h2>
        </div>

      </div>

      {/* Forecast */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-2">
          AI Forecast
        </h3>

        <p className="text-gray-400">
          Predicted Next Month Spend:
        </p>

        <h2 className="text-3xl text-green-400 mt-2">
          ₹{forecast.predicted_amount || 0}
        </h2>
      </div>

      {/* Behavior */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-2">
          Spending Personality
        </h3>

        <p className="text-green-400 text-2xl">
          {behavior.spender_label || "N/A"}
        </p>

        <p className="text-gray-400 mt-2">
          Risk Score: {behavior.risk_score || 0}
        </p>
      </div>

      {/* Alerts */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Smart Alerts
        </h3>

        {unreadAlerts.length === 0 ? (
          <p className="text-gray-400">No alerts found.</p>
        ) : (
          unreadAlerts.map((a, i) => (
            <div
              key={i}
              className="border-b border-white/5 py-3"
            >
              <p className="text-white font-semibold">
                {a.title}
              </p>
              <p className="text-gray-400 text-sm">
                {a.message}
              </p>
            </div>
          ))
        )}
      </div>

    </main>
  );
}

export default Dashboard;
