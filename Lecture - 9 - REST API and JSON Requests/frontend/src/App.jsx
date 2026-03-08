import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import QuantumBackground from './components/QuantumBackground';
import HolographicSidebar from './components/HolographicSidebar';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// for backend
import { addItem, getTodoItemsFromServer, deleteTodoItemFromServer, toggleCompletedMarksFromServer } from './api/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [booting, setBooting] = useState(true);
  const cardRef = useRef(null);

  // Custom Motion values for mouse tracking
  const rotateX = useSpring(useMotionValue(0), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useMotionValue(0), { damping: 25, stiffness: 200 });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const items = await getTodoItemsFromServer();
        setTodos(items);
        setTimeout(() => setBooting(false), 2000); // Artificial "boot" delay for effect
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Update CSS variables for spotlight effect
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Calculate rotation for 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set((y - centerY) / 40);
    rotateY.set((centerX - x) / 40);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const addTodo = async (task, date) => {
    try {
      const backendTodo = await addItem(task, date);
      setTodos([backendTodo, ...todos]);
    } catch (error) {
      console.warn("Backend error", error);
    }
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(t => t.id === id);
    if (!todoToToggle) return;
    try {
      const currentMark = await toggleCompletedMarksFromServer(id, todoToToggle.completed);
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: currentMark } : todo
      ));
    } catch (error) {
      console.error("Failed to toggle:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoItemFromServer(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <>
      <QuantumBackground />
      <HolographicSidebar />

      <AnimatePresence>
        {booting ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1rem',
              background: '#060b19'
            }}
          >
            <motion.div
              animate={{ rotate: 360, borderColor: ['#8b5cf6', '#3b82f6', '#8b5cf6'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ width: '60px', height: '60px', border: '2px solid #8b5cf6', borderRadius: '50%', borderTopColor: 'transparent' }}
            />
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#8b5cf6', letterSpacing: '0.4em', fontWeight: 800, fontSize: '0.8rem' }}
            >
              INITIALIZING QUANTUM STATE
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              position: 'relative',
              zIndex: 2
            }}
            className="glass-card"
          >
            <div style={{ transform: 'translateZ(60px)' }}>
              <Header total={todos.length} completed={todos.filter(t => t.completed).length} />
              <TodoInput onAdd={addTodo} />
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />

              <div style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--glass-border)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 900,
                opacity: 0.6
              }}>
                Interface Protocol :: v4.0.2 Stable
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
