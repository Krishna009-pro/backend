import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Shield, Terminal, Activity, Binary, Disc } from 'lucide-react';

const HolographicSidebar = () => {
    const items = [
        { icon: Terminal, label: 'CORE', status: 'ACTIVE' },
        { icon: Activity, label: 'FLUX', status: 'STABLE' },
        { icon: Binary, label: 'DATA', status: 'ENCRYPT' },
        { icon: Disc, label: 'SYNC', status: 'SYNCING' }
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="holographic-sidebar"
            style={{
                position: 'fixed',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '2rem 1rem',
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(20px)',
                borderRadius: '40px',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)'
            }}
        >
            <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/5"
                style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }} />

            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1, x: 10 }}
                    className="group"
                    style={{ position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                    <div style={{
                        padding: '12px',
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        zIndex: 1
                    }} className="group-hover:bg-[#8b5cf6]/20">
                        <item.icon size={20} className="text-slate-400 group-hover:text-[#8b5cf6]" />
                    </div>

                    {/* Status indicator */}
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                        style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#8b5cf6',
                            boxShadow: '0 0 8px #8b5cf6'
                        }}
                    />

                    {/* Tooltip on hover */}
                    <div className="absolute left-[calc(100%+1.5rem)] opacity-0 group-hover:opacity-100 transition-opacity bg-[#8b5cf6] text-white text-[0.7rem] px-3 py-1 rounded-full font-bold tracking-widest pointer-events-none whitespace-nowrap">
                        {item.label} :: {item.status}
                    </div>
                </motion.div>
            ))}

            <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/5 pt-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="text-[#8b5cf6]/30"
                >
                    <Binary size={24} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HolographicSidebar;
