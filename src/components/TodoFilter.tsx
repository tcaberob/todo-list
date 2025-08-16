import type { FilterType } from "../types/todo";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount
}) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'Todas', count: activeCount + completedCount },
    { key: 'active', label: 'Activas', count: activeCount },
    { key: 'completed', label: 'Completadas', count: completedCount }
  ];

  return (
    <div className="flex justify-center gap-2">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentFilter === key
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}