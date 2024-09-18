import React, { useState } from "react";
import { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number, text: string, completed: boolean) => void;
  editTodo: (id: number, newText: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  editTodo,
  deleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    editTodo(todo.id, input.trim(), todo.completed);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-2 border-b hover:bg-gray-100 transition-colors duration-200">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center flex-grow">
          <input
            type="text"
            className="flex-grow p-1 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center flex-grow">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.text, todo.completed)}
              className="mr-2 cursor-pointer"
            />
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              } transition-all duration-200`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
