import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Tasks = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      const todosString = localStorage.getItem("todos");
      const idCounterString = localStorage.getItem("idCounter");
      if (todosString) {
        const savedTodos = JSON.parse(todosString);
        setTodos(savedTodos);
      }
      if (idCounterString) {
        setIdCounter(JSON.parse(idCounterString));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      localStorage.removeItem("todos");
      localStorage.removeItem("idCounter");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
  }, [todos, idCounter]);

  const handleAdd = () => {
    if (todo.trim().length <= 3) return;
    
    if (isEditing) {
      handleUpdate();
    } else {
      setTodos([...todos, { id: idCounter, todo: todo.trim(), isCompleted: false }]);
      setIdCounter(idCounter + 1);
    }
    setTodo("");
  };

  const handleUpdate = () => {
    setTodos(todos.map(item => 
      item.id === currentTodo.id ? { ...item, todo: todo.trim() } : item
    ));
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && todo.trim().length > 3) {
      handleAdd();
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setIsEditing(true);
      setCurrentTodo(todoToEdit);
      setTodo(todoToEdit.todo);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(item => !item.isCompleted));
  };

  const filteredTodos = todos.filter(item => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  const completedCount = todos.filter(item => item.isCompleted).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <p className="text-xl text-white/80">Organize your life, one task at a time</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input 
              onChange={handleChange} 
              onKeyPress={handleKeyPress}
              value={todo} 
              type="text" 
              placeholder="What needs to be done? (min 4 characters)..."
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm" 
            />
            <button 
              onClick={handleAdd} 
              disabled={todo.trim().length <= 3} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 disabled:from-gray-500 disabled:to-gray-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              {isEditing ? "✏️ Update" : "➕ Add Task"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-white">
              📋 Your Tasks ({activeCount} active, {completedCount} completed)
            </h2>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all" 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg" 
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "active" 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg" 
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "completed" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg" 
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Completed
              </button>
              {completedCount > 0 && (
                <button 
                  onClick={clearCompleted}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all"
                >
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>
          
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-white/60 text-xl">
                {todos.length === 0 ? "No tasks yet. Create your first task above!" : `No ${filter} tasks found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map(item => (
                <div key={item.id} className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                      className="w-6 h-6 text-cyan-500 bg-white/10 border-white/20 rounded-lg focus:ring-cyan-400 focus:ring-2"
                    />
                    <div className={`flex-1 text-lg ${
                      item.isCompleted 
                        ? "line-through text-white/50" 
                        : "text-white"
                    }`}>
                      {item.todo}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item.id)} 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 p-3 text-white rounded-lg transition-all transform hover:scale-110"
                        title="Edit task"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 p-3 text-white rounded-lg transition-all transform hover:scale-110"
                        title="Delete task"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;