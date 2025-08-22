import { CheckSquare } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';

function App() {
  const {
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredTodos,
    activeCount,
    completedCount,
  } = useTodos();

  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">TodoApp</h1>
          </div>
          <p className="text-gray-600">Organiza tu día, una tarea a la vez</p>
        </div>

        {/* Input */}
        <div className="mb-8">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
          />
        </div>

        {/* Todo List */}
        <div className="mb-6">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {/* Stats */}
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

export default App
