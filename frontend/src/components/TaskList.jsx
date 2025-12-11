import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import LoadingSpinner from './LoadingSpinner';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError('Failed to fetch tasks. Is the backend server running on port 8000?');
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks([...tasks, newTask]);
            setIsModalOpen(false);
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const updatedTask = await updateTask(editingTask.id, taskData);
            setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
            setEditingTask(null);
            setIsModalOpen(false);
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const updatedTask = await toggleTaskCompletion(id);
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        } catch (err) {
            setError('Failed to toggle task completion');
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingTask(null);
        setIsModalOpen(false);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="alert alert-error shadow-lg my-4"><span>{error}</span></div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <button onClick={openCreateModal} className="btn btn-primary gap-2 bg-amber-300 text-black border-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Create Task
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={openEditModal}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                    />
                ))}
            </div>

            {/* Modal */}
            <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <TaskForm
                        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                        initialData={editingTask}
                        onCancel={closeModal}
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TaskList;
