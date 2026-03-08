import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <AnimatePresence mode='popLayout'>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TodoList;
