import { useState, useEffect } from 'react';
import type { Todo, FilterType } from '../types/todo';

/**
 * Clave utilizada para almacenar las tareas en localStorage
 */
const STORAGE_KEY = 'todoapp-todos';

/**
 * Hook personalizado para gestionar el estado y las operaciones de una lista de tareas
 *
 * Características principales:
 * - Persistencia automática en localStorage
 * - Filtrado de tareas por estado (todas, activas, completadas)
 * - Operaciones CRUD completas (crear, leer, actualizar, eliminar)
 * - Contadores automáticos de tareas activas y completadas
 *
 * @returns {Object} Objeto con el estado y funciones para gestionar las tareas
 */
export const useTodos = () => {
  /** Estado que contiene todas las tareas */
  const [todos, setTodos] = useState<Todo[]>([]);

  /** Estado que controla el filtro actual aplicado a las tareas */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * Efecto para cargar las tareas guardadas desde localStorage al inicializar el componente
   * Se ejecuta una sola vez al montar el componente
   */
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        // Parsear y reconstruir las fechas que se serializaron como strings
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

  /**
   * Efecto para guardar automáticamente las tareas en localStorage
   * Se ejecuta cada vez que el array de tareas cambia
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /**
   * Función para agregar una nueva tarea a la lista
   *
   * @param {string} text - El texto de la nueva tarea
   *
   * Características:
   * - Valida que el texto no esté vacío después de quitar espacios
   * - Genera un ID único usando crypto.randomUUID()
   * - Establece la tarea como no completada por defecto
   * - Registra la fecha de creación
   */
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

  /**
   * Función para alternar el estado de completado de una tarea específica
   *
   * @param {string} id - El identificador único de la tarea a modificar
   *
   * Utiliza el patrón de inmutabilidad, creando un nuevo array con la tarea modificada
   * en lugar de mutar el estado existente
   */
  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Función para eliminar una tarea específica de la lista
   *
   * @param {string} id - El identificador único de la tarea a eliminar
   *
   * Crea un nuevo array excluyendo la tarea con el ID especificado
   */
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  /**
   * Función para eliminar todas las tareas marcadas como completadas
   *
   * Mantiene únicamente las tareas que no están completadas
   */
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  /**
   * Función para obtener las tareas filtradas según el filtro actual
   *
   * @returns {Todo[]} Array de tareas filtradas
   *
   * Tipos de filtro:
   * - 'active': Solo tareas no completadas
   * - 'completed': Solo tareas completadas
   * - 'all': Todas las tareas (por defecto)
   */
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

  /** Contador de tareas activas (no completadas) */
  const activeCount = todos.filter(todo => !todo.completed).length;

  /** Contador de tareas completadas */
  const completedCount = todos.filter(todo => todo.completed).length;

  /**
   * Retorna el estado y las funciones disponibles para gestionar las tareas
   *
   * @returns {Object} Objeto con:
   * - todos: Array completo de tareas
   * - filter: Filtro actual aplicado
   * - setFilter: Función para cambiar el filtro
   * - addTodo: Función para agregar nueva tarea
   * - toggleTodo: Función para alternar estado de completado
   * - deleteTodo: Función para eliminar tarea
   * - clearCompleted: Función para limpiar tareas completadas
   * - getFilteredTodos: Función para obtener tareas filtradas
   * - activeCount: Número de tareas activas
   * - completedCount: Número de tareas completadas
   */
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