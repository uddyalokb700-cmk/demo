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
      <div className="pt-32 text-center text-white">
        Loading Suggestions...
      </div>
    );
  }

  const suggestions = data?.suggestions || [];

  const renderSuggestion = (item) => {
    if (typeof item === "string") return item;

    if (typeof item === "object" && item !== null) {
      return item.message || item.title || JSON.stringify(item);
    }

    return "Suggestion available";
  };

  return (
    <main className="pt-24 px-6 max-w-4xl mx-auto text-white space-y-8">

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">
          Smart Suggestions
        </h1>

        <p className="text-gray-400">
          AI-driven financial improvement recommendations.
        </p>
      </div>

      <div className="space-y-4">

        {suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900 rounded-xl border-l-4 border-green-400"
            >
              <p className="text-sm text-green-400 uppercase mb-2">
                AI Suggestion {index + 1}
              </p>

              <p className="text-lg">
                {renderSuggestion(item)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            No suggestions available.
          </div>
        )}

      </div>

    </main>
  );
}

export default Insights;
