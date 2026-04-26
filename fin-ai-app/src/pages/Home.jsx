import React from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

function Home() {
  return (
    <main className="relative z-10 pt-12 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-7xl mx-auto flex flex-col gap-12 items-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[30%] left-[10%] w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
      
      <section className="flex flex-col items-center gap-6 w-full max-w-3xl mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-primary/20 backdrop-blur-md mb-2">
          <span className="w-1.5 h-1.5 bg-primary"></span>
          <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-primary">v2.0 AI Engine Live</span>
        </div>
        <h1 className="font-headline-xl text-4xl md:text-6xl font-bold text-on-surface leading-tight tracking-tight">
          Autonomous Financial <br className="hidden sm:block"/> Twin.
        </h1>
        <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Experience the reflective edge in personal wealth management. Deep insights, automated forecasting, and institutional-grade clarity.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
          <Link to="/dashboard" className="w-full sm:w-auto px-10 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            Get Started
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <button
  onClick={handleDemoLoad}
  className="w-full sm:w-auto px-10 py-4 border border-outline-variant text-primary font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
>
  View Demo
</button>
        </div>
      </section>
      
      <section className="w-full mt-12 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-start text-left p-8 bg-surface border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10"></div>
            <div className="w-12 h-12 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[28px] !font-light">analytics</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">AI Analysis</h3>
            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
              Our neural engine categorizes transactions with 99% accuracy, revealing hidden spending patterns instantly.
            </p>
          </div>
          
          <div className="flex flex-col items-start text-left p-8 bg-surface border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/5 blur-2xl group-hover:bg-secondary/10"></div>
            <div className="w-12 h-12 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[28px] !font-light">auto_graph</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">Predictive Budgeting</h3>
            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
              Anticipate upcoming expenses before they happen. Dynamic budgets adjust based on your real-time cash flow trajectory.
            </p>
          </div>
          
          <div className="flex flex-col items-start text-left p-8 bg-surface border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="absolute top-1/2 right-0 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10"></div>
            <div className="w-12 h-12 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[28px] !font-light">lightbulb</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">Smart Suggestions</h3>
            <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
              Receive highly contextual alerts on subscription overlap, unusually high bills, and optimized saving strategies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
