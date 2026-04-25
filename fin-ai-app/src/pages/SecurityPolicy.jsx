import React from 'react';

function SecurityPolicy() {
  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-4xl mx-auto flex flex-col gap-8 text-left">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex flex-col gap-4 text-center items-center mb-8">
        <span className="material-symbols-outlined text-primary text-5xl">shield_lock</span>
        <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">Security & Privacy Policy</h1>
        <p className="font-body-md text-on-surface-variant max-w-lg">
          At Autonomous Financial Twin (AFT), your data sovereignty and privacy are our highest priorities.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-surface p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-300"></div>
          <h2 className="font-headline-md text-2xl text-on-surface mb-4">1. Data Sovereignty & Local Processing</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Unlike traditional financial aggregators, AFT is designed with a local-first philosophy. Your raw financial data, including the CSV files you upload, are processed locally within your environment whenever possible. We do not sell, rent, or lease your financial transaction history to third-party advertisers or brokers.
          </p>
        </section>

        <section className="bg-surface p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/5 blur-2xl group-hover:bg-secondary/10 transition-all duration-300"></div>
          <h2 className="font-headline-md text-2xl text-on-surface mb-4">2. Bank-Grade Encryption</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Any data that must be transmitted for AI analysis is secured using AES-256 encryption in transit and at rest. We utilize industry-standard TLS 1.3 protocols to ensure that your connection to our intelligence engine remains impenetrable to unauthorized interception.
          </p>
        </section>

        <section className="bg-surface p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-1/2 right-0 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-300"></div>
          <h2 className="font-headline-md text-2xl text-on-surface mb-4">3. AI Anonymization</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            When generating predictive forecasts and smart insights, our Autonomous Financial Twin neural engine strips all Personally Identifiable Information (PII) from your transaction records. The AI operates strictly on numerical values, dates, and abstracted merchant categories, ensuring your specific identity is completely decoupled from the financial analysis.
          </p>
        </section>

        <section className="bg-surface p-8 border border-white/5">
          <h2 className="font-headline-md text-2xl text-on-surface mb-4">4. Total Transparency</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
            You maintain absolute control over your digital footprint. At any point, you can exercise your right to be forgotten. Executing a data deletion request will permanently scrub your predictive models, cached transactions, and profile data from our secure servers within milliseconds.
          </p>
          <button className="px-6 py-3 border border-outline-variant text-on-surface-variant font-bold uppercase tracking-widest text-xs hover:border-error hover:text-error transition-all">
            Review Data Deletion Protocol
          </button>
        </section>
      </div>
    </main>
  );
}

export default SecurityPolicy;
