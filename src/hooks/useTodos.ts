import { useState, useEffect } from 'react';
import type { Todo, FilterType } from '../types/todo';

const STORAGE_KEY = 'todoapp-todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Cargar todos desde localStorage al inicializar
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = (JSON.parse(savedTodos) as Todo[]).map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  // Guardar todos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [...prev, newTodo]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredTodos,
    activeCount,
    completedCount
  };
};