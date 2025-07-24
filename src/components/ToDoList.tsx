import React from 'react';
import ToDoItem from './ToDoItem';
import { CheckCircle2, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Circle size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Add your first task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-500" />
            <span className="font-medium text-gray-700">Progress</span>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%',
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;