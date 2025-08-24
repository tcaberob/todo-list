import type { FilterType } from "../types/todo";

/**
 * Props del componente TodoFilter
 */
interface TodoFilterProps {
  /** Filtro actualmente seleccionado */
  currentFilter: FilterType;
  /** Función callback para cambiar el filtro activo */
  onFilterChange: (filter: FilterType) => void;
  /** Número de tareas activas (no completadas) */
  activeCount: number;
  /** Número de tareas completadas */
  completedCount: number;
}

/**
 * Componente TodoFilter - Sistema de filtros para visualizar diferentes vistas de tareas
 * 
 * Funcionalidades:
 * - Botones de filtro con estados visual activo/inactivo
 * - Contadores dinámicos para cada categoría de tareas
 * - Cálculo automático del total de tareas
 * - Transiciones suaves entre estados
 * - Diseño centrado y responsive
 * 
 * Filtros disponibles:
 * - 'Todas': Muestra todas las tareas (activas + completadas)
 * - 'Activas': Solo tareas no completadas
 * - 'Completadas': Solo tareas completadas
 * 
 * Estados visuales:
 * - Filtro activo: Fondo azul, texto blanco, sombra
 * - Filtro inactivo: Texto gris, hover con fondo gris claro
 * 
 * @param props - Las propiedades del componente
 * @returns JSX Element con los botones de filtro
 */
export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount
}) => {
  // Configuración de filtros con sus etiquetas y contadores
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { 
      key: 'all', 
      label: 'Todas', 
      count: activeCount + completedCount // Total de tareas
    },
    { 
      key: 'active', 
      label: 'Activas', 
      count: activeCount // Solo tareas pendientes
    },
    { 
      key: 'completed', 
      label: 'Completadas', 
      count: completedCount // Solo tareas terminadas
    }
  ];

  return (
    // Container principal con diseño centrado y espaciado entre botones
    <div className="flex justify-center gap-2">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentFilter === key
              ? // Estilo para filtro activo: azul con sombra
                'bg-blue-500 text-white shadow-md'
              : // Estilo para filtro inactivo: gris con hover
                'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {/* Texto del filtro con contador entre paréntesis */}
          {label} ({count})
        </button>
      ))}
    </div>
  );
};