interface TodoStatsProps {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ activeCount, completedCount, onClearCompleted }) => {
  if (activeCount === 0 && completedCount === 0) {
    return null; // No stats to show
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="text-sm text-gray-600">
        {activeCount === 0
          ? '🎉 ¡Todas las tareas completadas!'
          : `${activeCount} tarea${activeCount === 1 ? '' : 's'} pendiente${activeCount === 1 ? '' : 's'}`
        }
      </div>

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
}