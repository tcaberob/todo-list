/**
 * Props del componente TodoStats
 */
interface TodoStatsProps {
  /** Número de tareas activas (no completadas) */
  activeCount: number;
  /** Número de tareas completadas */
  completedCount: number;
  /** Función callback para limpiar todas las tareas completadas */
  onClearCompleted: () => void;
}

/**
 * Componente TodoStats - Muestra estadísticas de las tareas y acciones relacionadas
 * 
 * Funcionalidades:
 * - Muestra el conteo de tareas pendientes
 * - Detecta cuando todas las tareas están completadas y muestra mensaje de celebración
 * - Proporciona botón para limpiar tareas completadas
 * - Se oculta automáticamente cuando no hay tareas
 * 
 * Estados de visualización:
 * - Sin tareas: No se renderiza (retorna null)
 * - Con tareas pendientes: Muestra contador de pendientes
 * - Todas completadas: Muestra mensaje de celebración
 * - Con completadas: Muestra botón para limpiar
 * 
 * @param props - Las propiedades del componente
 * @returns JSX Element o null si no hay estadísticas que mostrar
 */
export const TodoStats: React.FC<TodoStatsProps> = ({ 
  activeCount, 
  completedCount, 
  onClearCompleted 
}) => {
  // Renderizado condicional: No mostrar estadísticas si no hay tareas
  if (activeCount === 0 && completedCount === 0) {
    return null;
  }

  return (
    // Container principal con fondo gris claro y bordes redondeados
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      
      {/* Sección izquierda: Estadísticas de tareas */}
      <div className="text-sm text-gray-600">
        {activeCount === 0
          ? // Mensaje de celebración cuando no hay tareas pendientes
            '🎉 ¡Todas las tareas completadas!'
          : // Contador de tareas pendientes con pluralización correcta
            `${activeCount} tarea${activeCount === 1 ? '' : 's'} pendiente${activeCount === 1 ? '' : 's'}`
        }
      </div>

      {/* Sección derecha: Botón para limpiar completadas (solo si existen) */}
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Limpiar completadas ({completedCount})
        </button>
      )}
    </div>
  );
};