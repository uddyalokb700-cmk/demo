import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  
  const getLinkClass = (path) => {
    const baseClass = "font-label-lg text-sm transition-colors ";
    if (location.pathname === path) {
      return baseClass + "text-primary hover:opacity-70";
    }
    return baseClass + "text-on-surface-variant hover:text-primary";
  };

  const getMobileLinkClass = (path) => {
    const baseClass = "flex flex-col items-center justify-center transition-all ";
    if (location.pathname === path) {
      return baseClass + "text-primary group";
    }
    return baseClass + "text-on-surface-variant/60 hover:text-primary";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-sm transition-all duration-150">
        <div className="flex items-center gap-3 hover:opacity-80 duration-150 cursor-pointer">
          <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center overflow-hidden border border-white/10 grayscale contrast-125">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg5erkmmYFGMN1HyfkMu-IkzJryqfQnr5MmdFOyn15FtBABLr60osjsvAzcdVk7nhP9U7pvOelFfdVeKEmkPp1WDWp29WsWZp3PKY_pf3y-5LbygsD68Z3pJLQ_J35_BTY_0E2nJWuXzfHoLeR8EpJO3jw7b0QKHewzX1iz7PS3eQ4AbZaS0lYuCXhA3abmoxyk6ylhofqQh6EIwkiClOHCc3QYqUsgq-qfi7LUqEsiLdedmrGrmr-TSxDt7GhMxf0VfZfEM1uhN_k"/>
          </div>
          <Link to="/" className="font-headline-md font-bold text-xl text-white tracking-tighter">AFT</Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link className={getLinkClass("/")} to="/">Home</Link>
          <Link className={getLinkClass("/dashboard")} to="/dashboard">Dashboard</Link>
          <Link className={getLinkClass("/upload")} to="/upload">Upload</Link>
          <Link className={getLinkClass("/analysis")} to="/analysis">Analysis</Link>
          <Link className={getLinkClass("/forecast")} to="/forecast">Forecast</Link>
          <Link className={getLinkClass("/insights")} to="/insights">Insights</Link>
        </nav>
        <button className="text-primary/70 hover:text-primary transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <div className="flex-grow">
        <Outlet />
      </div>

      <footer className="w-full border-t border-white/5 bg-background/95 py-6 mt-12 pb-24 md:pb-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label-sm text-on-surface-variant text-xs">© 2026 Autonomous Financial Twin. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/security" className="font-label-sm text-primary hover:opacity-70 transition-opacity text-xs uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">security</span>
              Security Policy
            </Link>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 h-20 bg-background/95 backdrop-blur-2xl border-t border-white/5 shadow-2xl">
        <Link className={getMobileLinkClass("/")} to="/">
          <span className="material-symbols-outlined !font-light">home</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Home</span>
        </Link>
        <Link className={getMobileLinkClass("/dashboard")} to="/dashboard">
          <span className="material-symbols-outlined !font-light">dashboard</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Dash</span>
        </Link>
        <Link className={getMobileLinkClass("/upload")} to="/upload">
          <span className="material-symbols-outlined !font-light">cloud_upload</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Upload</span>
        </Link>
        <Link className={getMobileLinkClass("/analysis")} to="/analysis">
          <span className="material-symbols-outlined !font-light">analytics</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Analysis</span>
        </Link>
        <Link className={getMobileLinkClass("/forecast")} to="/forecast">
          <span className="material-symbols-outlined !font-light">auto_graph</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Forecast</span>
        </Link>
        <Link className={getMobileLinkClass("/insights")} to="/insights">
          <span className="material-symbols-outlined !font-light">lightbulb</span>
          <span className="font-label-sm text-[9px] uppercase tracking-tighter mt-1">Insights</span>
        </Link>
      </nav>
    </div>
  );
}

export default Layout;
