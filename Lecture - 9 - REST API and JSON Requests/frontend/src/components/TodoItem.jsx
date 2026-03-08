import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShieldCheck, Shield, Sparkles } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', rotateX: -45 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            whileHover={{
                translateZ: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(139, 92, 246, 0.3)'
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                background: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                marginBottom: '1rem',
                gap: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                transformStyle: 'preserve-3d'
            }}
        >
            <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.8 }}
                onClick={(e) => { e.stopPropagation(); onToggle(todo.id); }}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    color: todo.completed ? 'var(--success)' : 'var(--text-muted)',
                    filter: todo.completed ? 'drop-shadow(0 0 8px var(--success))' : 'none'
                }}
            >
                {todo.completed ? <ShieldCheck size={24} /> : <Shield size={24} />}
            </motion.button>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    color: todo.completed ? 'var(--text-muted)' : 'var(--text-main)',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    letterSpacing: '0.01em',
                    transition: 'all 0.4s ease'
                }}>
                    {todo.task}
                </span>
                {todo.date && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.5 }}>
                        <Sparkles size={12} color="var(--primary)" />
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            {new Date(todo.date).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                )}
            </div>

            <motion.button
                whileHover={{ scale: 1.2, color: 'var(--danger)', filter: 'drop-shadow(0 0 8px var(--danger))' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '12px',
                    display: 'flex',
                    color: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Trash2 size={20} />
            </motion.button>
        </motion.div>
    );
};

export default TodoItem;
