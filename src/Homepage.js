import { useEffect, useState } from "react";
import uniqueid from "lodash.uniqueid";
export const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const todos = localStorage.getItem("mytodos");
    if (!todos) return;
    setLoading(true);
    try {
      const todoJson = JSON.parse(todos);
      setTodos(todoJson);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("mytodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const todoId = uniqueid("todo-");
    if (!title || !description) {
      alert("No Fields filled");
      return;
    }
    const todo = {
      id: todoId,
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, todo]);
  };

  const updateATodo = (id) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const todoCopy = todos.filter((t) => t.id !== id);
    setTodos(todoCopy);
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl text-center mt-20">Personal To-Do</h1>
      </div>
      <div className="flex w-full items-center justify-center mt-40">
        <div className="w-6/12 border-r-2 flex-col space-y-6 px-24 h-80 flex items-center justify-center">
          <input
            placeholder="Title"
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            className={
              "border-2 w-full text-xl px-4 text-sky-800 py-2 border-red-700 outline-none focus:border-green-600"
            }
            value={title}
          />
          <textarea
            placeholder="desciption"
            type={"text"}
            className={
              "border-2 w-full text-xl px-4 text-sky-800 py-2 border-red-700 outline-none focus:border-green-600"
            }
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button
            onClick={addTodo}
            className="w-full text-white font-bold bg-red-700 py-2 rounded-lg hover:scale-105 transition-all ease-in-out"
          >
            Submit
          </button>
        </div>
        <div className="w-6/12">
          {loading ? (
            <p>Loading todos</p>
          ) : todos.length > 0 ? (
            <div className="ml-24 justify-center space-y-8 max-h-80 overflow-scroll">
              {todos.map((todo) => {
                return (
                  <div className="mb-2" key={todo.id}>
                    <p
                      className={
                        todo.completed
                          ? "font-bold text-lg line-through"
                          : "font-bold text-lg"
                      }
                    >
                      {todo.title}
                    </p>
                    <p className="text-sm text-gray-500">{todo.description}</p>
                    <div className="space-x-3 mt-2">
                      <button
                        onClick={() => updateATodo(todo.id)}
                        className="text-sm border-green-500 font-bold text-green-500 border-2 px-1"
                      >
                        {!todo.completed ? "Complete todo" : "Undo Complete"}
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-sm border-red-700 font-bold text-red-700 px-1 border-2"
                      >
                        Delete todo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center mr-5">No todos to show</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(todos, undefined, 2)
          )}`}
          download={"mytodos.json"}
          className="text-md text-center cursor-pointer select-none bg-black text-white px-2 py-2 w-40 rounded-md hover:bg-white hover:border-black hover:border-2 transition-all ease-out duration-300 hover:text-black"
        >
          Export
        </a>
      </div>
    </div>
  );
};
