import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        if (!initialData) {
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input input-ghost w-full text-xl font-bold placeholder:text-base-content/50 focus:bg-transparent focus:outline-none px-0"
                placeholder="Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-ghost w-full resize-none text-base placeholder:text-base-content/50 focus:bg-transparent focus:outline-none px-0 min-h-[120px]"
                placeholder="Take a note..."
            />
            <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={onCancel} className="btn btn-ghost btn-sm">Close</button>
                <button type="submit" className="btn btn-ghost btn-sm font-bold">
                    {initialData ? 'Save' : 'Add'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
