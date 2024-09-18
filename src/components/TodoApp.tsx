import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./Todoitem";
import axios from "axios";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data); // Store fetched todos in state
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        text,
        completed: false,
      });
      setTodos([...todos, response.data]);
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  const toggleTodo = async (id: number, text: string, completed: boolean) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        text,
        completed: !completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      console.error("Error updating Todo: ", err);
    }
  };

  const editTodo = async (id: number, newText: string, completed: boolean) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        text: newText,
        completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      console.error("Error updating Todo: ", err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <TodoForm addTodo={addTodo} />
      <ul className="mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
