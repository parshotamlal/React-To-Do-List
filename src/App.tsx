import React, { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React fundamentals', completed: true },
    { id: 2, text: 'Build a todo application', completed: false },
    { id: 3, text: 'Practice TypeScript', completed: false },
  ]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation for demo
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: newText }
        : todo
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header onAddTodo={addTodo} />
        <ToDoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;