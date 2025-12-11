import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

const api = axios.create({
    baseURL: API_URL,
});

export const getTasks = async () => {
    const response = await api.get('/');
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await api.post('/', taskData);
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await api.put(`${id}/`, taskData);
    return response.data;
};

export const toggleTaskCompletion = async (id) => {
    // Try the specific toggle endpoint first, if it fails or if preferred, we can use PATCH
    // Based on user request: PATCH /api/tasks/{id}/toggle_completed/
    try {
        const response = await api.patch(`${id}/toggle_completed/`);
        return response.data;
    } catch (error) {
        // Fallback or alternative if the specific endpoint isn't what's implemented
        // But the user specified this endpoint, so we stick to it.
        throw error;
    }
};

export const deleteTask = async (id) => {
    await api.delete(`${id}/`);
};

export default api;
