import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
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
  const behavior = data?.behavior_profile || {};

  const categories = Array.isArray(data?.top_categories)
    ? data.top_categories.map((item) => ({
        name: item.category,
        value: item.total
      }))
    : [];

  const radarData = [
    {
      subject: "Savings",
      A: financial.savings_rate || 0
    },
    {
      subject: "Risk",
      A: behavior.risk_score || 0
    },
    {
      subject: "Budget",
      A: 80
    },
    {
      subject: "Discipline",
      A: 75
    },
    {
      subject: "Growth",
      A: 85
    }
  ];

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Analysis Engine
        </h1>

        <p className="text-gray-400 mt-2">
          Smart behavior and category intelligence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Total Inflow"
          value={`₹${financial.total_income || 0}`}
        />

        <Card
          title="Total Outflow"
          value={`₹${financial.total_expense || 0}`}
        />

        <Card
          title="Spending Type"
          value={
            behavior.spender_label || "Balanced"
          }
        />

      </div>

      {/* Category Bar */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Category Spend Analysis
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#50C878"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Behavior Radar */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Financial Behaviour Radar
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                dataKey="A"
                stroke="#50C878"
                fill="#50C878"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-6 bg-surface border border-white/5">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl text-white font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default Analysis;
