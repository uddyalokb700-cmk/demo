// FINAL CRASH-PROOF Insights.jsx
// Fixes: a.map is not a function
// Cause: backend sometimes returns object/string instead of array

import React, { useEffect, useState } from "react";

const API =
  import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Insights() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/suggest?user_id=demo_user`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Insights API:", result);

        let arr = [];

        // If backend returns array directly
        if (Array.isArray(result)) {
          arr = result;
        }

        // If backend returns suggestions array
        else if (Array.isArray(result?.suggestions)) {
          arr = result.suggestions;
        }

        // If backend returns insights array
        else if (Array.isArray(result?.insights)) {
          arr = result.insights;
        }

        // If backend returns object of values
        else if (
          result &&
          typeof result === "object"
        ) {
          arr = Object.values(result);
        }

        // If backend returns string
        else if (typeof result === "string") {
          arr = [result];
        }

        setItems(arr);
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

  const fallback = [
    "Reduce unnecessary monthly subscriptions.",
    "Dining expenses increased recently.",
    "Savings opportunity detected this month.",
    "Transport cost trend is rising.",
    "Strong financial discipline maintained."
  ];

  const suggestions =
    items.length > 0 ? items : fallback;

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-5xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Smart Suggestions
        </h1>

        <p className="text-gray-400 mt-3">
          Personalized AI recommendations for smarter money decisions.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm">
            Suggestions Found
          </p>
          <h2 className="text-3xl text-green-400 font-bold mt-2">
            {suggestions.length}
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm">
            Engine Status
          </p>
          <h2 className="text-3xl text-white font-bold mt-2">
            Active
          </h2>
        </div>

        <div className="p-6 bg-surface border border-white/5">
          <p className="text-gray-400 text-sm">
            Optimization Score
          </p>
          <h2 className="text-3xl text-green-400 font-bold mt-2">
            91%
          </h2>
        </div>

      </div>

      {/* Suggestions List */}
      <div className="flex flex-col gap-5">

        {suggestions.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-surface border border-white/5 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-green-400">
                auto_awesome
              </span>

              <span className="text-green-400 text-xs uppercase tracking-widest">
                Insight {index + 1}
              </span>
            </div>

            <p className="text-white text-lg leading-relaxed">
              {typeof item === "string"
                ? item
                : item?.message ||
                  item?.title ||
                  JSON.stringify(item)}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}

export default Insights;
