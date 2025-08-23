import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * Props del componente TodoInput
 */
interface TodoInputProps {
  /** Función callback que se ejecuta cuando se agrega una nueva tarea */
  onAdd: (text: string) => void;
}

/**
 * Componente TodoInput - Campo de entrada para agregar nuevas tareas
 * 
 * Funcionalidades:
 * - Input de texto con placeholder descriptivo
 * - Botón de envío integrado con icono Plus
 * - Validación automática del texto (no permite entradas vacías)
 * - Limpieza automática del campo después del envío
 * - Auto-focus al cargar el componente
 * - Manejo de formulario completo con prevención de recarga
 * 
 * Características UX:
 * - Placeholder amigable: "¿Qué necesitas hacer?"
 * - Botón deshabilitado cuando el input está vacío
 * - Efectos de focus con borde azul y sombra
 * - Transiciones suaves en todos los estados
 * - Posicionamiento absoluto del botón dentro del input
 * 
 * Interacciones:
 * - Enter: Envía el formulario
 * - Click en botón Plus: Envía el formulario
 * - Texto vacío: Botón deshabilitado
 * 
 * @param props - Las propiedades del componente
 * @returns JSX Element con el formulario de entrada
 */
export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  // Estado local para el valor del input
  const [inputValue, setInputValue] = useState('');

  /**
   * Maneja el envío del formulario
   * - Previene la recarga de página
   * - Valida que el texto no esté vacío
   * - Llama a la función onAdd del padre
   * - Limpia el input después del envío exitoso
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de página
    if (inputValue.trim()) {
      onAdd(inputValue.trim()); // Enviar texto sin espacios extra
      setInputValue('');        // Limpiar el campo
    }
  };

  return (
    // Formulario con posicionamiento relativo para el botón absoluto
    <form onSubmit={handleSubmit} className="relative">
      {/* Input principal con estilos de focus y transiciones */}
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="¿Qué necesitas hacer?"
        className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg"
        autoFocus // Auto-focus al cargar el componente
      />
      
      {/* Botón de envío posicionado absolutamente dentro del input */}
      <button
        type="submit"
        disabled={!inputValue.trim()} // Deshabilitado si el input está vacío
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 disabled:hover:text-gray-400 transition-colors duration-200"
      >
        {/* Icono Plus de Lucide React */}
        <Plus size={20} />
      </button>
    </form>
  );
};