import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

/**
 * Props del componente TodoList
 */
interface TodoListProps {
  /** Array de tareas a mostrar */
  todos: Todo[];
  /** Función callback para alternar el estado de completado de una tarea */
  onToggle: (id: string) => void;
  /** Función callback para eliminar una tarea */
  onDelete: (id: string) => void;
}

/**
 * Componente TodoList - Renderiza la lista de tareas o un estado vacío
 * 
 * Funcionalidades:
 * - Renderiza todas las tareas recibidas como props
 * - Muestra un mensaje amigable cuando no hay tareas
 * - Propaga las funciones de toggle y delete a cada TodoItem
 * - Maneja la clave única para cada elemento de la lista
 * 
 * Estados de renderizado:
 * - Lista vacía: Muestra mensaje motivacional con emoji
 * - Con tareas: Renderiza TodoItem para cada tarea con espaciado vertical
 * 
 * @param props - Las propiedades del componente
 * @returns JSX Element con la lista de tareas o estado vacío
 */
export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  // Estado vacío: mostrar mensaje motivacional
  if(todos.length === 0) {
    return (
      <div className="text-center py-12">
        {/* Emoji grande como elemento visual principal */}
        <div className="text-6xl mb-4">📝</div>
        {/* Mensaje principal */}
        <p className="text-gray-500 text-lg">No hay tareas aquí</p>
        {/* Mensaje secundario motivacional */}
        <p className="text-gray-600 text-sm">¡Agrega una nueva tarea para comenzar!</p>
      </div>
    )
  }

  // Renderizado de la lista de tareas
  return (
    <div className="space-y-3"> {/* Espaciado vertical entre elementos */}
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id}        // Clave única para optimización de React
          todo={todo}          // Objeto completo de la tarea
          onToggle={onToggle}  // Función para cambiar estado de completado
          onDelete={onDelete}  // Función para eliminar tarea
        />
      ))}
    </div>
  );
};
