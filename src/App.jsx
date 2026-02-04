import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Landing from './Landing';
import DemandDashboard from './DemandDashboard';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'dashboard' (supply), 'demand' (devs)

  return (
    <>
      {/* Dev Toggle (Hidden in prod) */}
      <div className="fixed bottom-4 right-4 z-[100] flex gap-2 bg-black/80 p-2 rounded-full border border-white/10 backdrop-blur-md">
        <button onClick={() => setView('landing')} className={`px-3 py-1 text-xs rounded-full ${view === 'landing' ? 'bg-white text-black' : 'text-gray-400'}`}>Market</button>
        <button onClick={() => setView('dashboard')} className={`px-3 py-1 text-xs rounded-full ${view === 'dashboard' ? 'bg-cyber-primary text-black' : 'text-gray-400'}`}>Supply</button>
        <button onClick={() => setView('demand')} className={`px-3 py-1 text-xs rounded-full ${view === 'demand' ? 'bg-blue-500 text-black' : 'text-gray-400'}`}>Demand</button>
      </div>

      {view === 'landing' && <Landing onLaunchApp={() => setView('dashboard')} />}
      {view === 'dashboard' && <Dashboard />}
      {view === 'demand' && <DemandDashboard />}
    </>
  );
}

export default App;
