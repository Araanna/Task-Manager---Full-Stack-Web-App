import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
    return (
        <div className={`card bg-base-100 shadow-sm border border-base-300 ${task.completed ? 'opacity-60' : ''}`}>
            <div className="card-body flex-row items-center justify-between p-4">
                <div className="flex-1">
                    <h3 className={`card-title ${task.completed ? 'line-through text-base-content/50' : ''}`}>{task.title}</h3>
                    <p className={`${task.completed ? 'line-through text-base-content/50' : ''}`}>{task.description}</p>
                </div>
                <div className="card-actions flex-nowrap items-center gap-2">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                        className="checkbox checkbox-success"
                    />
                    <button onClick={() => onEdit(task)} className="btn btn-sm btn-info">Edit</button>
                    <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
