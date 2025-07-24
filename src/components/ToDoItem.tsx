import React, { useState } from 'react';
import { Check, X, Edit3, Trash2, Save } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      onEditTodo(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditText(todo.text);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <span
              className={`text-gray-800 ${
                todo.completed
                  ? 'line-through text-gray-500'
                  : ''
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;