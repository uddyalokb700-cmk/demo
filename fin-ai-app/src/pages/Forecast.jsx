import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const API = import.meta.env.VITE_API_URL;

function Forecast() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/predict?user_id=demo_user`)
      .then(res => res.json())
      .then(data => {
        const forecast = data.forecast || {};
        const overall = forecast.predicted_amount || 0;
        const band = forecast.confidence_band || {};

        const arr = [
          {
            day: '30D',
            predicted: overall * 0.82,
            low: (band.low || overall * 0.72) * 0.82,
            high: (band.high || overall * 0.92) * 0.82
          },
          {
            day: '60D',
            predicted: overall * 0.93,
            low: (band.low || overall * 0.72) * 0.93,
            high: (band.high || overall * 0.92) * 0.93
          },
          {
            day: '90D',
            predicted: overall,
            low: band.low || overall * 0.72,
            high: band.high || overall * 0.92
          }
        ];

        setChartData(arr);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">
          Predictive Forecasts
        </h1>
        <p className="font-body-md text-on-surface-variant">
          AI-driven cash flow trajectory for the next 90 days.
        </p>
      </div>

      <div className="w-full p-8 bg-surface border border-white/5 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none"></div>

        <div className="w-full h-[420px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#98FF98" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#98FF98" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8B2B2" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#A8B2B2" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2A2F2F"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                stroke="#A8B2B2"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#A8B2B2"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
              />

              <Tooltip
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
              />

              <Area
                type="monotone"
                dataKey="high"
                stroke="#A8B2B2"
                fillOpacity={1}
                fill="url(#colorBand)"
              />

              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#98FF98"
                fillOpacity={1}
                fill="url(#colorPred)"
              />

              <Area
                type="monotone"
                dataKey="low"
                stroke="#343A3A"
                fillOpacity={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Forecast;
