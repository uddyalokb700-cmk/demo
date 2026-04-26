import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from "recharts";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Forecast() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/predict?user_id=demo_user`)
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
        Loading forecast...
      </main>
    );
  }

  const amount =
    data?.forecast?.overall_prediction?.predicted_amount || 0;

  const lineData = [
    { month: "Now", value: amount },
    { month: "+30d", value: amount * 1.04 },
    { month: "+60d", value: amount * 1.09 },
    { month: "+90d", value: amount * 1.15 }
  ];

  const categoryData = [
    { name: "Food", value: amount * 0.25 },
    { name: "Bills", value: amount * 0.30 },
    { name: "Travel", value: amount * 0.15 },
    { name: "Shopping", value: amount * 0.18 },
    { name: "Other", value: amount * 0.12 }
  ];

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Predictive Forecasts
        </h1>
        <p className="text-gray-400 mt-2">
          AI estimated next 90 days trajectory.
        </p>
      </div>

      {/* Card */}
      <div className="p-6 bg-surface border border-white/5">
        <p className="text-gray-400 text-sm mb-2">
          Next Month Predicted Spend
        </p>

        <h2 className="text-4xl text-green-400 font-bold">
          ₹{amount}
        </h2>
      </div>

      {/* Line Chart */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          90 Day Projection
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#50C878"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 bg-surface border border-white/5">
        <h3 className="text-xl text-white mb-4">
          Predicted Category Allocation
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#50C878" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </main>
  );
}

export default Forecast;
