import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="¿Qué necesitas hacer?"
        className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg"
        autoFocus
      />
      <button
        type="submit"
        disabled={!inputValue.trim}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 disabled:hover:text-gray-400 transition-colors duration-200">
          <Plus size={20} />
      </button>
    </form>
  );
};