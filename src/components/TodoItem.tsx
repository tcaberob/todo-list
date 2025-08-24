import { Check, X } from "lucide-react";
import type { Todo } from "../types/todo";

/**
 * Props del componente TodoItem
 */
interface TodoItemProps {
  /** Objeto de tarea con toda su información */
  todo: Todo;
  /** Función callback para alternar el estado de completado */
  onToggle: (id: string) => void;
  /** Función callback para eliminar la tarea */
  onDelete: (id: string) => void;
}

/**
 * Componente TodoItem - Representa una tarea individual en la lista
 * 
 * Funcionalidades:
 * - Checkbox personalizado para marcar/desmarcar como completada
 * - Texto de la tarea con efectos visuales según su estado
 * - Botón de eliminación que aparece al hacer hover
 * - Estilos condicionales según el estado de completado
 * - Transiciones suaves para todas las interacciones
 * 
 * Estados visuales:
 * - Activa: Fondo blanco, texto normal, checkbox vacío
 * - Completada: Opacidad reducida, texto tachado, checkbox verde con check
 * - Hover: Sombra aumentada, botón de eliminar visible
 * 
 * @param props - Las propiedades del componente
 * @returns JSX Element que representa una tarea individual
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    // Container principal con efectos de hover y estados condicionales
    <div className={`group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      
      {/* Checkbox personalizado */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white' // Estado completado: verde con check
            : 'border-gray-300 hover:border-green-400'    // Estado activo: gris con hover verde
        }`}
      >
        {/* Icono de check solo visible cuando está completada */}
        {todo.completed && <Check size={14} />}
      </button>

      {/* Texto de la tarea con estilos condicionales */}
      <span
        className={`flex-1 text-gray-700 transition-all duration-200 ${
          todo.completed 
            ? 'line-through text-gray-500' // Completada: texto tachado y gris
            : ''                           // Activa: texto normal
        }`}
      >
        {todo.text}
      </span>

      {/* Botón de eliminación - solo visible en hover del contenedor */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <X size={18} />
      </button>
    </div>
  );
};
