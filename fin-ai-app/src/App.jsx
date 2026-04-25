import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Forecast from './pages/Forecast';
import Insights from './pages/Insights';
import SecurityPolicy from './pages/SecurityPolicy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="insights" element={<Insights />} />
          <Route path="security" element={<SecurityPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
