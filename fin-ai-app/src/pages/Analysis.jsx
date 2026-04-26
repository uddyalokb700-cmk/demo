import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pt-32 text-center text-white">
        Loading Analysis...
      </div>
    );
  }

  const monthlyData = Object.entries(
    data?.summary?.monthly_totals || {}
  ).map(([month, value]) => ({
    month,
    value
  }));

  const financial = data?.financial_summary || {};

  return (
    <main className="pt-24 px-6 text-white space-y-8">

      <h1 className="text-4xl font-bold">
        Analysis Engine
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 p-6 bg-zinc-900 rounded-xl h-[350px]">

          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#50C878"
                  fill="#98FF98"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center pt-20 text-gray-400">
              No Data Available
            </div>
          )}

        </div>

        <div className="space-y-6">

          <div className="p-6 bg-zinc-900 rounded-xl">
            <p>Total Inflow</p>
            <h2 className="text-3xl text-green-400">
              ₹{financial.total_income || 0}
            </h2>
          </div>

          <div className="p-6 bg-zinc-900 rounded-xl">
            <p>Total Outflow</p>
            <h2 className="text-3xl text-red-400">
              ₹{financial.total_expense || 0}
            </h2>
          </div>

        </div>

      </div>

    </main>
  );
}

export default Analysis;
