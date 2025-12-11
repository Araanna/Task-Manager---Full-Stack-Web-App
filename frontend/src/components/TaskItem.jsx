import React from 'react';

const TaskItem = ({ task, onClick, onEdit, onDelete, onToggleComplete }) => {
    return (
        <div
            onClick={onClick}
            className={`card bg-base-100 shadow-sm border border-base-300 cursor-pointer hover:shadow-md transition-shadow ${task.completed ? 'opacity-60' : ''}`}
        >
            <div className="card-body flex-row items-center justify-between p-4">
                <div className="flex-1">
                    <h3 className={`card-title ${task.completed ? 'line-through text-base-content/50' : ''}`}>{task.title}</h3>
                    <p className={`${task.completed ? 'line-through text-base-content/50' : ''}`}>{task.description}</p>
                    <div className="text-xs text-base-content/60 mt-2">
                        Created: {new Date(task.created_at).toLocaleString()}
                    </div>
                </div>
                <div className="card-actions flex-nowrap items-center gap-2">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => { e.stopPropagation(); onToggleComplete(task.id); }}
                        className="checkbox checkbox-success"
                    />
                    <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="btn btn-sm btn-info">Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
