import { CheckSquare } from 'lucide-react';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">To do List</h1>
          </div>
          <p className="text-gray-600">Organiza tu día, una tarea a la vez</p>
        </div>        
      </div>
    </div>
  )
}

export default App
