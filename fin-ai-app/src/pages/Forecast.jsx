import React from 'react';

function Forecast() {
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Predictive Forecasts</h1>
        <p className="font-body-md text-on-surface-variant">AI-driven cash flow trajectory for the next 90 days.</p>
      </div>

      <div className="w-full p-8 bg-surface border border-white/5 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none"></div>
        <span className="text-on-surface-variant font-label-lg tracking-widest uppercase">Trajectory Graph Placeholder</span>
      </div>
    </main>
  );
}

export default Forecast;
