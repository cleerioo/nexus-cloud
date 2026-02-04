import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Clock, CreditCard, Play, Terminal, CheckCircle } from 'lucide-react';

export default function DemandDashboard() {
  const [gpu, setGpu] = useState('RTX 4090');
  const [count, setCount] = useState(4);
  const [hours, setHours] = useState(24);
  const [deploying, setDeploying] = useState(false);

  const prices = {
    'RTX 4090': 0.45,
    'RTX 3090': 0.35,
    'A100 (80GB)': 1.80,
    'H100': 2.90
  };

  const awsPrices = {
    'RTX 4090': 1.20,
    'RTX 3090': 0.95,
    'A100 (80GB)': 4.10,
    'H100': 5.50
  };

  const cost = (prices[gpu] * count * hours).toFixed(2);
  const savings = ((awsPrices[gpu] * count * hours) - cost).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#05050a] p-6 hidden lg:block">
        <div className="flex items-center gap-2 text-blue-500 mb-10 font-bold tracking-wider">
          <Server className="w-6 h-6" /> NEXUS <span className="text-white">DEV</span>
        </div>
        <nav className="space-y-1">
          {['Clusters', 'Deployments', 'Billing', 'API Keys', 'Settings'].map((item, i) => (
            <div key={item} className={`px-4 py-3 rounded-lg cursor-pointer ${i === 0 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:bg-white/5'}`}>
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Deploy New Cluster</h1>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400">
               Credit: <span className="text-white font-bold">$1,250.00</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">JS</div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Config Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* GPU Selection */}
            <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" /> 1. Select Hardware
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(prices).map(model => (
                  <div 
                    key={model}
                    onClick={() => setGpu(model)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${gpu === model ? 'bg-blue-500/10 border-blue-500 ring-1 ring-blue-500' : 'bg-black/20 border-white/10 hover:border-white/30'}`}
                  >
                    <div className="font-bold mb-1">{model}</div>
                    <div className="text-sm text-gray-400">${prices[model]}/hr</div>
                    {model.includes('100') && <div className="mt-2 text-xs text-green-400 bg-green-500/10 inline-block px-2 py-1 rounded">Enterprise</div>}
                    {model.includes('4090') && <div className="mt-2 text-xs text-purple-400 bg-purple-500/10 inline-block px-2 py-1 rounded">Best Value</div>}
                  </div>
                ))}
              </div>
            </section>

            {/* Sliders */}
            <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-6 flex items-center gap-2">
                <Server className="w-4 h-4" /> 2. Configuration
              </h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">GPU Count</label>
                  <span className="text-blue-400 font-bold">{count} x {gpu}</span>
                </div>
                <input 
                  type="range" min="1" max="64" value={count} 
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>64 Nodes</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">Duration</label>
                  <span className="text-blue-400 font-bold">{hours} Hours</span>
                </div>
                <input 
                  type="range" min="1" max="168" value={hours} 
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </section>

             {/* Deployment Console (Mock) */}
             {deploying && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }} 
                 animate={{ opacity: 1, height: 'auto' }}
                 className="bg-black border border-green-500/30 rounded-xl p-4 font-mono text-xs text-green-400"
               >
                 <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                   <Terminal className="w-3 h-3" /> System Output
                 </div>
                 <p>{'>'} Initializing Nexus Cluster [ID: nxs-8822]...</p>
                 <p>{'>'} Provisioning {count}x {gpu} nodes in Mumbai/Bangalore...</p>
                 <p>{'>'} Pulling Docker image: pytorch/latest...</p>
                 <p className="animate-pulse">{'>'} Waiting for handshake...</p>
               </motion.div>
             )}
          </div>

          {/* Summary Panel */}
          <div>
            <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-6">Cost Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Compute ({count}x {gpu})</span>
                  <span>${prices[gpu]}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span>{hours} Hours</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-gray-400">Total Estimates</span>
                  <span className="text-3xl font-bold text-white">${cost}</span>
                </div>
                
                <div className="bg-green-500/10 text-green-400 p-3 rounded-lg text-xs text-center border border-green-500/20">
                  <span className="font-bold">You save ${savings}</span> compared to AWS
                </div>
              </div>

              <button 
                onClick={() => setDeploying(!deploying)}
                className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
              >
                {deploying ? <><Clock className="w-4 h-4 animate-spin" /> Provisioning...</> : <><Play className="w-4 h-4" /> Deploy Cluster</>}
              </button>

              <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
                <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                Your job will be distributed across the Nexus Decentralized Network. Latency optimized for Asia-Pacific.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
