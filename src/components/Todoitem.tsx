import React, { useState } from "react";
import { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
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
    editTodo(todo.id, input.trim());
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-grow flex">
          <input
            type="text"
            className="flex-grow p-1 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 p-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <div
            className={`flex-grow cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-500"
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
