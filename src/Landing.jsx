import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, Shield, ArrowRight, Wallet, Globe } from 'lucide-react';

export default function Landing({ onLaunchApp }) {
    const [gpuType, setGpuType] = useState('RTX 4090');

    const earnings = {
        'RTX 4090': '₹ 12,000',
        'RTX 3060': '₹ 4,500',
        'RTX 3080': '₹ 8,200',
        'GTX 1660': '₹ 1,500'
    };

    return (
        <div className="min-h-screen bg-cyber-dark text-white font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-cyber-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyber-primary">
                        <Zap className="w-8 h-8 fill-current" />
                        <span className="text-xl font-bold font-mono tracking-wider">NEXUS CLOUD</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <a href="#" className="hover:text-cyber-primary transition-colors">How it Works</a>
                        <a href="#" className="hover:text-cyber-primary transition-colors">Earnings</a>
                        <a href="#" className="hover:text-cyber-primary transition-colors">For AI Devs</a>
                    </div>
                    <button
                        onClick={onLaunchApp}
                        className="px-6 py-2 bg-cyber-primary text-black font-bold rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                        Launch App
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 grid-bg">
                <div className="absolute inset-0 bg-gradient-to-b from-cyber-primary/5 to-cyber-dark pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1 mb-6 rounded-full border border-cyber-secondary/50 bg-cyber-secondary/10 text-cyber-secondary text-sm font-mono">
                            🚀 NEW: Now live in Mumbai & Bangalore
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Turn Your Idle GPUs <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary text-glow">
                                Into Passive Income
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                            Join India's largest decentralized compute network. Rent your Gaming PC's power to AI startups while you sleep.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={onLaunchApp}
                                className="px-8 py-4 bg-cyber-primary text-black text-lg font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                            >
                                Start Earning Now <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/5 transition-colors">
                                View Calculator
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats/Calculator Section */}
            <section className="py-20 px-6 bg-cyber-light">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-primary/20 blur-[100px] rounded-full" />

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Calculate Potential</h2>
                                <p className="text-gray-400 mb-8">
                                    Estimate your monthly recurring revenue based on your hardware. We pay per hour of uptime.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">Select Your GPU</label>
                                        <select
                                            value={gpuType}
                                            onChange={(e) => setGpuType(e.target.value)}
                                            className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:border-cyber-primary focus:outline-none transition-colors"
                                        >
                                            {Object.keys(earnings).map(gpu => (
                                                <option key={gpu} value={gpu}>{gpu}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-2xl p-8 text-center border border-cyber-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                                <div className="text-gray-400 mb-2">Monthly Earnings</div>
                                <div className="text-5xl font-mono font-bold text-cyber-primary text-glow mb-4">
                                    {earnings[gpuType]}<span className="text-xl text-gray-500">/mo</span>
                                </div>
                                <div className="text-sm text-green-400 flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    High Demand Area
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Join Nexus?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Wallet,
                                title: "Instant Payouts",
                                desc: "Get paid daily in Rupees directly to your UPI or Bank Account. No crypto complexity."
                            },
                            {
                                icon: Shield,
                                title: "Safe & Secure",
                                desc: "Our sandbox technology ensures your personal files are completely isolated from AI jobs."
                            },
                            {
                                icon: Globe,
                                title: "Global Demand",
                                desc: "We aggregate jobs from US & EU startups, bringing dollar revenues to Indian cafes."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-cyber-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-cyber-primary/10 rounded-xl flex items-center justify-center text-cyber-primary mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>© 2026 Nexus Cloud Infrastructure. All rights reserved.</p>
                <p className="mt-2 text-xs opacity-50">Operational in: Mumbai • Bangalore • Delhi • Hyderabad</p>
            </footer>
        </div>
    );
}
