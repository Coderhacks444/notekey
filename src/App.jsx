import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function App() {
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Todo App</h1>
            <h2 className="text-xl text-gray-600 mb-6">iTask - Manage your todos in one place</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
                value={todo} 
                type="text" 
                placeholder="Enter your task (min 4 characters)..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button 
                onClick={handleAdd} 
                disabled={todo.trim().length <= 3} 
                className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                {isEditing ? "Update" : "Add Task"}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Tasks ({activeCount} active, {completedCount} completed)
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded text-sm ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1 rounded text-sm ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 rounded text-sm ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  Completed
                </button>
                {completedCount > 0 && (
                  <button 
                    onClick={clearCompleted}
                    className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Clear Completed
                  </button>
                )}
              </div>
            </div>
            
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {todos.length === 0 ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
              </p>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                    <input 
                      type="checkbox" 
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className={`flex-1 ${item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {item.todo}
                    </div>
                    <button 
                      onClick={() => handleEdit(item.id)} 
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 text-white rounded-md transition-colors"
                      title="Edit task"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-md transition-colors"
                      title="Delete task"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default App;