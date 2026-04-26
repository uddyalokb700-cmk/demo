import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate('/dashboard?demo=true');
  };

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
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-10 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            Get Started
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>

          <button
            onClick={handleDemo}
            className="w-full sm:w-auto px-10 py-4 border border-outline-variant text-primary font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
          >
            View Demo
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
