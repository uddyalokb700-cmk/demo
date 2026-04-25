import React, { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API_URL;
function Analysis() {
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Analysis Engine</h1>
        <p className="font-body-md text-on-surface-variant">Real-time breakdown of your categorized transactions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 p-8 bg-surface border border-white/5 min-h-[400px] flex items-center justify-center">
          <span className="text-on-surface-variant font-label-lg tracking-widest uppercase">Cashflow Chart Placeholder</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
             <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Inflow</h3>
             <span className="font-headline-xl text-secondary text-3xl">$12,450.00</span>
          </div>
          <div className="p-6 bg-surface-container border border-white/5 min-h-[190px]">
             <h3 className="font-headline-md text-lg text-on-surface mb-2">Total Outflow</h3>
             <span className="font-headline-xl text-on-surface text-3xl">$8,230.50</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analysis;
