import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Cpu,
    Wallet,
    Settings,
    Terminal,
    Zap,
    Globe,
    Play,
    Pause,
    Wifi
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    earnings: Math.random() * 10 + 40 + i * 2,
    compute: Math.random() * 20 + 60,
}));

export default function Dashboard() {
    const [isMining, setIsMining] = useState(true);
    const [logs, setLogs] = useState([
        "System initialized...",
        "Connecting to Nexus Network...",
        "Node verified: RTX 4090 detected",
        "Handshake successful [latency: 12ms]",
    ]);

    useEffect(() => {
        if (!isMining) return;
        const interval = setInterval(() => {
            const actions = [
                "Receiving AI model shard [ID: 88f2]",
                "Computing gradient descent...",
                "Validating proof of work...",
                "Shard committed to chain.",
                "Payment received: 0.042 NEX",
            ];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            setLogs(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${randomAction}`]);
        }, 2500);
        return () => clearInterval(interval);
    }, [isMining]);

    return (
        <div className="min-h-screen bg-cyber-dark text-white font-mono grid-bg overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-20 lg:w-64 border-r border-cyber-primary/20 p-4 flex flex-col justify-between bg-cyber-dark/80 backdrop-blur-xl z-20">
                <div>
                    <div className="flex items-center gap-3 mb-10 text-cyber-primary">
                        <Zap className="w-8 h-8 fill-current" />
                        <span className="text-xl font-bold hidden lg:block tracking-wider">NEXUS</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: Activity, label: "Dashboard", active: true },
                            { icon: Cpu, label: "Nodes" },
                            { icon: Wallet, label: "Wallet" },
                            { icon: Globe, label: "Network" },
                            { icon: Settings, label: "Settings" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${item.active ? 'bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'hover:bg-white/5 text-gray-400'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="hidden lg:block">{item.label}</span>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 hidden lg:block">
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Online (4ms)
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-10 overflow-y-auto z-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Node Dashboard</h1>
                        <p className="text-gray-400">Welcome back, Operator_01</p>
                    </div>
                    <button
                        onClick={() => setIsMining(!isMining)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${isMining ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white' : 'bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/50 hover:bg-cyber-primary hover:text-black'}`}
                    >
                        {isMining ? <><Pause className="w-4 h-4" /> STOP MINING</> : <><Play className="w-4 h-4" /> START MINING</>}
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Today's Earnings", value: "₹ 1,240.50", sub: "+12% vs yest", icon: Wallet, color: "text-cyber-primary" },
                        { label: "GPU Load", value: "94%", sub: "RTX 4090", icon: Cpu, color: "text-cyber-secondary" },
                        { label: "Uptime", value: "14h 22m", sub: "Since last sync", icon: Activity, color: "text-green-400" },
                        { label: "Network Latency", value: "12ms", sub: "Mumbai-1 Server", icon: Wifi, color: "text-yellow-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-cyber-primary/30 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                                    <div className={`text-2xl font-bold font-mono tracking-tighter ${stat.color} text-glow`}>{stat.value}</div>
                                </div>
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:bg-white/10 transition-colors`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Earnings History</h3>
                            <div className="flex gap-2 text-xs">
                                <span className="px-3 py-1 rounded bg-cyber-primary/20 text-cyber-primary cursor-pointer border border-cyber-primary/20">24H</span>
                                <span className="px-3 py-1 rounded bg-white/5 text-gray-400 cursor-pointer hover:bg-white/10">7D</span>
                                <span className="px-3 py-1 rounded bg-white/5 text-gray-400 cursor-pointer hover:bg-white/10">30D</span>
                            </div>
                        </div>
                        <div className="h-64 pl-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" hide />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#050510', borderColor: '#333' }}
                                        itemStyle={{ color: '#00f0ff' }}
                                    />
                                    <Area type="monotone" dataKey="earnings" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorEarn)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Console Logs */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-black/80 p-6 rounded-2xl border border-green-500/30 font-mono text-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <div className="flex items-center gap-2 mb-4 text-green-400">
                            <Terminal className="w-4 h-4" />
                            <span>System Logs</span>
                        </div>
                        <div className="space-y-3 h-64 overflow-hidden flex flex-col justify-end">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-gray-300 border-l-2 border-green-500/30 pl-3 py-1"
                                >
                                    <span className="text-green-500 mr-2">{'>'}</span>
                                    {log}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
