import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pt-32 text-center text-white">
        Loading Forecast...
      </div>
    );
  }

  const amount =
    data?.forecast?.overall_prediction?.predicted_amount || 0;

  const forecastData = [
    { month: "Now", value: amount },
    { month: "+30d", value: amount * 1.05 },
    { month: "+60d", value: amount * 1.10 },
    { month: "+90d", value: amount * 1.15 }
  ];

  return (
    <main className="pt-24 px-6 text-white space-y-8">

      <h1 className="text-4xl font-bold">
        Predictive Forecasts
      </h1>

      <div className="p-6 bg-zinc-900 rounded-xl h-[420px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
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

      <div className="p-6 bg-zinc-900 rounded-xl">
        <p>Predicted Next Month Spend</p>

        <h2 className="text-3xl text-green-400">
          ₹{amount}
        </h2>
      </div>

    </main>
  );
}

export default Forecast;
