import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import { jsxs } from "react/jsx-runtime";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    let idCounterString = localStorage.getItem("idCounter");
    if (todosString) {
      let savedTodos = JSON.parse(todosString);
      setTodos(savedTodos);
    }
    if (idCounterString) {
      setIdCounter(JSON.parse(idCounterString));
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
  };

  const handleAdd = () => {
    if (isEditing) {
      setTodos(todos.map(item => 
        item.id === currentTodo.id ? { ...item, todo } : item
      ));
      setIsEditing(false);
      setCurrentTodo(null);
    } else {
      setTodos([...todos, { id: idCounter, todo, isCompleted: false }]);
      setIdCounter(idCounter + 1);
    }
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setIsEditing(true);
    setCurrentTodo(todoToEdit);
    setTodo(todoToEdit.todo);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-slate-500 p-6 rounded-lg shadow-lg w-full min-h-[80vh]">
          <h1 className="text-4xl font-bold mb-4">Todo App</h1>
          <h2 className="text-2xl font-bold mb-4"  >Itask-Mange your todo in one place</h2>

          <div className="flex mb-4">
            <input onChange={handleChange} value={todo} type="text" className="w-1/2 rounded-lg" />
            <button onClick={handleAdd} disabled={todo.length<=3} className="bg-blue-500 disabled:bg-indigo-700 hover:bg-sky-400 text-sm font-bold py-1 rounded-md text-white p-2 mx-6">
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos"> 
           $$ {todos.map(item => (
              <div key={item.id} className="todo flex w-1/2 justify-normal my-2">
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <button onClick={() => handleEdit(item.id)} className="buttons bg-orange-950 hover:bg-orange-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                <FiEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className="buttons bg-orange-500 hover:bg-amber-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;