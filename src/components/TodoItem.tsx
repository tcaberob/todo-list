import { Check, X } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}`}
      >
        {todo.completed && <Check size={14} />}
      </button>

      <span
        className={`flex-1 text-gray-700 transition-all duration-200 ${todo.completed ? 'line-through text-gray-500' : ''}`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <X size={18} />
      </button>
    </div>
  );
};
