import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL || "https://aft-1-6zfr.onrender.com";

function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
  if (!file) return;

  setIsUploading(true);

  try {
    const text = await file.text();

    const rows = text.split("/\r?\n/").slice(1).filter(Boolean);

    const transactions = rows.map(row => {
      const cols = row.split(",");

      return {
        date: cols[0]?.trim(),
        description: cols[1]?.trim(),
        amount: parseFloat(cols[2]),
        type: cols[3]?.trim() || "debit"
      };
    });

    const response = await fetch(`${API}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: "demo_user",
        transactions: transactions
      })
    });

    const data = await response.json();

    localStorage.setItem("aft_upload", JSON.stringify(data));

    navigate("/analysis");

  } catch (error) {
    alert("Upload failed.");
  }

  setIsUploading(false);
};

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-10 max-w-4xl mx-auto flex flex-col gap-8 items-center text-center">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <h1 className="font-headline-xl text-3xl md:text-5xl font-bold text-on-surface">
        Upload Data
      </h1>
      <p className="font-body-md text-on-surface-variant max-w-lg">
        Securely upload your financial transaction history in .csv format. AFT will automatically parse and categorize your data.
      </p>

      <div className="w-full mt-8 p-8 md:p-16 border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors bg-surface-container-high/30 flex flex-col items-center justify-center gap-6 rounded-sm relative group">
        <div className="w-16 h-16 rounded-none bg-surface-container flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
          <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
        </div>
        
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <span className="font-headline-md text-primary text-xl">{file.name}</span>
            <span className="font-body-sm text-on-surface-variant text-sm">
              {(file.size / 1024).toFixed(2)} KB
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="font-headline-md text-on-surface text-xl">Drag and drop your CSV</span>
            <span className="font-body-md text-on-surface-variant">or click to browse</span>
          </div>
        )}

        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="mt-4 px-12 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isUploading ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
            Processing...
          </>
        ) : (
          <>
            Initiate Analysis
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </>
        )}
      </button>
    </main>
  );
}

export default Upload;
