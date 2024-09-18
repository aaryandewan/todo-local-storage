import React from "react";
import { TodoApp } from "./components";
import "./styles/index.css"; // Import global styles

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-5">Todo App</h1>
      <TodoApp />
    </div>
  );
};

export default App;
