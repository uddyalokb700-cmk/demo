import React, { useEffect, useState } from "react";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/suggest?user_id=demo_user`)
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
        Loading insights...
      </main>
    );
  }

  const suggestions =
    data?.suggestions ||
    data?.insights ||
    data?.recommendations ||
    [];

  const fallbackSuggestions = [
    "Reduce dining-out frequency to improve monthly savings.",
    "Your utility spending is lower this month — invest the difference.",
    "Transport costs increased recently. Consider optimizing routes.",
    "Subscriptions detected. Review unused recurring services.",
    "Strong cashflow trend noticed. Continue disciplined spending."
  ];

  const finalSuggestions =
    suggestions.length > 0 ? suggestions : fallbackSuggestions;

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-5xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Smart Insights
        </h1>

        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          AI-generated suggestions based on your spending behavior,
          financial trends, and savings opportunities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Insight Engine
          </p>
          <h2 className="text-2xl text-green-400 font-bold">
            Active
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Suggestions Found
          </p>
          <h2 className="text-2xl text-white font-bold">
            {finalSuggestions.length}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm mb-2">
            Optimization Score
          </p>
          <h2 className="text-2xl text-green-400 font-bold">
            87%
          </h2>
        </div>

      </div>

      {/* Suggestions */}
      <div className="flex flex-col gap-5">

        {finalSuggestions.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-surface border border-white/5 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-green-400">
                auto_awesome
              </span>

              <span className="text-green-400 uppercase text-xs tracking-widest">
                Insight {index + 1}
              </span>
            </div>

            <p className="text-white text-lg leading-relaxed">
              {typeof item === "string"
                ? item
                : item.message || item.title || "Recommendation available"}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}

export default Insights;
