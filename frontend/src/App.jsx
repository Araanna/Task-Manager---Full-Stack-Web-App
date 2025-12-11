import React from 'react';
import "./styles/App.css";
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <header className="w-full bg-yellow-300 text-primary-content p-4 shadow-md flex justify-center">
        <h1 className="text-3xl font-bold text-black font-mono">Task Manager</h1>
      </header>
      <main className="w-full max-w-3xl p-4">
        <TaskList />
      </main>
    </div>
  );
}

export default App;
