import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

const COLORS = [
  "#50C878",
  "#98FF98",
  "#A8B2B2",
  "#343A3A",
  "#2A2F2F",
  "#7dd3fc"
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

  const summary = data?.summary || {};
  const financial = data?.financial_summary || {};
  const behavior = data?.behavior_profile || {};
  const forecast = data?.forecast || {};
  const tracker = data?.current_month_tracker || {};
  const alerts = data?.alerts || {};
  const topCategories = data?.top_categories || [];
  const transactions = data?.recent_transactions || [];

  const trendData = Object.entries(summary.monthly_totals || {}).map(
    ([month, value]) => ({
      month: month.slice(5),
      spend: value,
      balance:
        (financial.net_savings || 0) +
        Math.round(Math.random() * 15000)
    })
  );

  const categoryData = topCategories.map((item) => ({
    name: item.category,
    value: item.total
  }));

  const unreadAlerts = [
    ...(alerts.critical || []),
    ...(alerts.warning || []),
    ...(alerts.info || [])
  ].slice(0, 5);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-zinc-900 border border-white/10 p-3 rounded-lg">
        <p className="text-white mb-2">{label}</p>

        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8 text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Overview
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back. Your financial twin is synced.
          </p>
        </div>

        <div className="px-4 py-2 border border-green-500 rounded-lg text-green-400 text-xs uppercase tracking-widest">
          Live Data
        </div>

      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400 text-sm uppercase">
            Monthly Budget
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{tracker.monthly_budget || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400 text-sm uppercase">
            Spent So Far
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{tracker.spent_so_far || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400 text-sm uppercase">
            Savings Rate
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {financial.savings_rate || 0}%
          </h2>
        </div>

      </div>

      {/* Area + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Multi-Series Area */}
        <div className="lg:col-span-2 p-6 bg-zinc-900 rounded-2xl">

          <h3 className="text-xl font-semibold mb-6">
            Cashflow Trends
          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#50C878" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#50C878" stopOpacity={0}/>
                  </linearGradient>

                  <linearGradient id="grayFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A8B2B2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#A8B2B2" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#50C878"
                  fill="url(#greenFill)"
                />

                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#A8B2B2"
                  fill="url(#grayFill)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Donut */}
        <div className="p-6 bg-zinc-900 rounded-2xl">

          <h3 className="text-xl font-semibold mb-4">
            Top Categories
          </h3>

          <div className="h-[220px]">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {categoryData.map((item, index) => (
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

          {/* Legend */}
          <div className="mt-4 space-y-2">

            {categoryData.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[i % COLORS.length]
                    }}
                  />

                  <span>{item.name}</span>
                </div>

                <span>₹{item.value}</span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Bar Chart */}
      <div className="p-6 bg-zinc-900 rounded-2xl">

        <h3 className="text-xl font-semibold mb-4">
          Category Spending Comparison
        </h3>

        <div className="h-[300px]">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="value"
                fill="#50C878"
                radius={[8,8,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Financial Summary */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400">Income</p>
          <h2 className="text-3xl text-green-400 mt-2">
            ₹{financial.total_income || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400">Expenses</p>
          <h2 className="text-3xl text-red-400 mt-2">
            ₹{financial.total_expense || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400">Net Savings</p>
          <h2 className="text-3xl mt-2">
            ₹{financial.net_savings || 0}
          </h2>
        </div>

      </div>

      {/* AI Forecast + Personality */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400">
            Predicted Next Month Spend
          </p>

          <h2 className="text-4xl text-green-400 mt-2">
            ₹{forecast.predicted_amount || 0}
          </h2>
        </div>

        <div className="p-6 bg-zinc-900 rounded-2xl">
          <p className="text-gray-400">
            Spending Personality
          </p>

          <h2 className="text-3xl text-green-400 mt-2">
            {behavior.label || "Balanced Saver"}
          </h2>

          <p className="text-gray-400 mt-2">
            Score: {behavior.score || 0}
          </p>
        </div>

      </div>

      {/* Alerts */}
      <div className="p-6 bg-zinc-900 rounded-2xl">

        <h3 className="text-xl font-semibold mb-4">
          Smart Alerts
        </h3>

        {unreadAlerts.length === 0 ? (
          <p className="text-gray-400">
            No alerts available.
          </p>
        ) : (
          unreadAlerts.map((item, i) => (
            <div
              key={i}
              className="border-b border-white/5 py-3"
            >
              <p className="font-semibold">
                {item.title}
              </p>

              <p className="text-sm text-gray-400">
                {item.message}
              </p>
            </div>
          ))
        )}

      </div>

      {/* Transactions */}
      <div className="p-6 bg-zinc-900 rounded-2xl">

        <h3 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h3>

        {transactions.length === 0 ? (
          <p className="text-gray-400">
            No recent transactions found.
          </p>
        ) : (
          transactions.slice(0, 6).map((tx, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-white/5 py-3"
            >
              <div>
                <p>{tx.description}</p>
                <p className="text-xs text-gray-400">
                  {tx.category}
                </p>
              </div>

              <p>
                ₹{tx.amount}
              </p>
            </div>
          ))
        )}

      </div>

    </main>
  );
}

export default Dashboard;
