import { CheckSquare } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';

/**
 * Componente principal de la aplicación TodoApp
 * 
 * Responsabilidades:
 * - Orquesta todos los componentes de la aplicación
 * - Gestiona el estado global de las tareas usando el hook useTodos
 * - Proporciona el layout principal y distribución de componentes
 * - Establece el diseño visual con Tailwind CSS
 * 
 * Estructura de la aplicación:
 * - Header con título e icono
 * - Input para agregar nuevas tareas
 * - Filtros para mostrar diferentes vistas
 * - Lista de tareas filtradas
 * - Estadísticas y acciones adicionales
 */
function App() {
  // Destructuración del hook personalizado para obtener estado y funciones
  const {
    filter,           // Filtro actual aplicado (all, active, completed)
    setFilter,        // Función para cambiar el filtro activo
    addTodo,          // Función para agregar una nueva tarea
    toggleTodo,       // Función para marcar/desmarcar tareas como completadas
    deleteTodo,       // Función para eliminar tareas
    clearCompleted,   // Función para eliminar todas las tareas completadas
    getFilteredTodos, // Función que retorna las tareas según el filtro actual
    activeCount,      // Número de tareas pendientes
    completedCount,   // Número de tareas completadas
  } = useTodos();

  // Obtener las tareas filtradas según el filtro actual
  const filteredTodos = getFilteredTodos();

  return (
    // Contenedor principal con gradiente de fondo
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Container responsive centrado con padding */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        
        {/* Header Section - Título y descripción de la aplicación */}
        <div className="text-center mb-8">
          {/* Título con icono */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">TodoApp</h1>
          </div>
          {/* Subtítulo descriptivo */}
          <p className="text-gray-600">Organiza tu día, una tarea a la vez</p>
        </div>

        {/* Input Section - Componente para agregar nuevas tareas */}
        <div className="mb-8">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filter Section - Componente para filtrar tareas por estado */}
        <div className="mb-6">
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
          />
        </div>

        {/* List Section - Componente que muestra la lista de tareas filtradas */}
        <div className="mb-6">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {/* Stats Section - Componente con estadísticas y acciones adicionales */}
        <div className="mb-6">
          <TodoStats
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
