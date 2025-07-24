import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddTodo: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <header className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My To-Do List</h1>
        <p className="text-gray-600">Stay organized and get things done</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          Add Task
        </button>
      </form>
    </header>
  );
};

export default Header;