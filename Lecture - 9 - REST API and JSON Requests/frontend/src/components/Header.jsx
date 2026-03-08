import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

const Header = ({ total, completed }) => {
  return (
    <div style={{ marginBottom: '3rem', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        className="flex items-center gap-6"
      >
        <div style={{ position: 'relative' }}>
          {/* Pulsing Light Orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-10px',
              background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
              filter: 'blur(15px)',
              zIndex: 0
            }}
          />
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            padding: '1rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.5)',
            position: 'relative',
            zIndex: 1
          }}>
            <Zap size={28} color="white" fill="white" />
          </div>
        </div>

        <div>
          <h1 className="hologram-text" style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '0.25rem'
          }}>
            SYSTEM
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ height: '2px', background: 'linear-gradient(90deg, var(--primary), transparent)', marginBottom: '0.5rem' }}
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: 500
        }}
      >
        {total === 0 ? "No active streams" : `Syncing: ${completed}/${total} units finalized`}
      </motion.p>
    </div>
  );
};

export default Header;
