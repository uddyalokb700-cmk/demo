import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API = import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Forecast() {

  const [data, setData] = useState(null);

useEffect(() => {
  fetch(`${API}/api/dashboard?user_id=demo_user`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}, []);
  
  const forecastData = data?.forecast
  ? [
      { month: 'Now', value: data.forecast.overall_prediction?.predicted_amount || 0 },
      { month: '+30d', value: (data.forecast.overall_prediction?.predicted_amount || 0) * 1.05 },
      { month: '+60d', value: (data.forecast.overall_prediction?.predicted_amount || 0) * 1.1 },
      { month: '+90d', value: (data.forecast.overall_prediction?.predicted_amount || 0) * 1.15 },
    ]
  : [];
  
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Predictive Forecasts</h1>
        <p className="font-body-md text-on-surface-variant">AI-driven cash flow trajectory for the next 90 days.</p>
      </div>

      <div className="w-full p-8 bg-surface border border-white/5 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none"></div>
        {forecastData.length > 0 ? (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={forecastData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#50C878" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
) : (
  <span className="text-on-surface-variant">No forecast data</span>
)}
      </div>
    </main>
  );
}

export default Forecast;
