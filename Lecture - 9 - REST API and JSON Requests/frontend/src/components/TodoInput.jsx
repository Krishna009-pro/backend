import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Command } from 'lucide-react';

const TodoInput = ({ onAdd }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() && date) {
            onAdd(task, date);
            setTask('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '3rem' }}>
            <motion.div
                animate={{
                    scale: isFocused ? 1.02 : 1,
                    boxShadow: isFocused ? '0 0 30px rgba(139, 92, 246, 0.2)' : '0 0 0px transparent'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '1.5rem',
                    borderRadius: '24px',
                    border: '1px solid var(--glass-border)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background Liquid Pulse */}
                <AnimatePresence>
                    {isFocused && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.1, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '200px',
                                height: '200px',
                                background: 'var(--primary)',
                                filter: 'blur(50px)',
                                borderRadius: '50%',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </AnimatePresence>

                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Command size={18} style={{ position: 'absolute', left: '1.25rem', color: isFocused ? 'var(--primary)' : 'var(--text-muted)', transition: 'color 0.3s' }} />
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Initialize task..."
                        style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid transparent',
                            borderRadius: '16px',
                            padding: '1.25rem 1.5rem 1.25rem 3.5rem',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit',
                            fontWeight: 500
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                            flex: 1,
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid transparent',
                            borderRadius: '16px',
                            padding: '1rem 1.25rem',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                            outline: 'none',
                            fontFamily: 'inherit',
                            colorScheme: 'dark'
                        }}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={{
                            background: 'linear-gradient(45deg, var(--primary), #3b82f6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '0 1.5rem',
                            height: '52px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.5)'
                        }}
                    >
                        <Plus size={20} strokeWidth={3} />
                        Inject
                    </motion.button>
                </div>
            </motion.div>
        </form>
    );
};

export default TodoInput;
