import React, { useState } from 'react';
import type { Todo, FilterType } from '../types/types';
import { HeaderComponent } from './HeaderComponent';

const InitialTodos = [
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
    { id: 4, text: 'Read for 1 hour', completed: false },
    { id: 5, text: 'Pick up groceries', completed: false },
    { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false },
];


export const TaskComponent: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(InitialTodos);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState<FilterType>('All');

    const addTodo = (e: React.KeyboardEvent | React.FormEvent) => {
            e.preventDefault();
            if (newTodo.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: newTodo.trim(),
                completed: false
            }]);
            setNewTodo('');
            }
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className="app">
            <div className="background"></div>
            <div className="container">
                <HeaderComponent />

                <div className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
                    placeholder="Create a new todo..."
                    className="todo-input"
                />
                </div>

                <div className="todo-list-container">
                <div className="todo-list">
                    {filteredTodos.map(todo => (
                    <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <div className="todo-content">
                        <button
                            className={`check-button ${todo.completed ? 'checked' : ''}`}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.completed && <span className="checkmark">✓</span>}
                        </button>
                        <span className="todo-text">{todo.text}</span>
                        </div>
                        <button
                        className="delete-button"
                        onClick={() => deleteTodo(todo.id)}
                        >
                        ×
                        </button>
                    </div>
                    ))}
                </div>

                <div className="todo-footer">
                    <span className="items-left">{activeCount} items left</span>
                    <div className="filter-buttons">
                    {(['All', 'Active', 'Completed'] as FilterType[]).map(filterType => (
                        <button
                        key={filterType}
                        className={`filter-button ${filter === filterType ? 'active' : ''}`}
                        onClick={() => setFilter(filterType)}
                        >
                        {filterType}
                        </button>
                    ))}
                    </div>
                    <button className="clear-button" onClick={clearCompleted}>
                    Clear Completed
                    </button>
                </div>
                </div>

                <p className="drag-hint">Drag and drop to reorder list</p>
            </div>
        </div>
    );
};