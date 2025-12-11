# Task Manager Application

This is a full-stack Task Manager application built with **Django** (Backend) and **React + Vite** (Frontend).

## Prerequisites

Before running this project, ensure you have the following installed:
- [Python](https://www.python.org/downloads/) (v3.8 or higher)
- [Node.js](https://nodejs.org/) (v14 or higher)

## 🚀 Getting Started

### 1. Backend Setup (Django)

The backend runs on port `8000` by default.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:
    - **Mac/Linux:**
      ```bash
      source venv/bin/activate
      ```
    - **Windows:**
      ```bash
      venv\Scripts\activate
      ```

4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5.  Run migrations (to set up the database):
    ```bash
    python manage.py migrate
    ```

6.  Start the server:
    ```bash
    python manage.py runserver
    ```
    The API will be available at [http://127.0.0.1:8000/api/tasks/](http://127.0.0.1:8000/api/tasks/).

### 2. Frontend Setup (React + Vite)

The frontend runs on port `5173` (by default) and proxies API requests to the backend.

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at [http://localhost:5173](http://localhost:5173).

---

## 📡 API Endpoints

The backend provides the following RESTful API endpoints for managing tasks:

| Method | Endpoint | Description | Payload (Example) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks/` | Fetch all tasks | N/A |
| **POST** | `/api/tasks/` | Create a new task | `{ "title": "New Task", "description": "Optional details" }` |
| **GET** | `/api/tasks/<id>/` | Get details of a single task | N/A |
| **PUT** | `/api/tasks/<id>/` | Update a task (title/desc) | `{ "title": "Updated Title", "description": "Updated details" }` |
| **DELETE** | `/api/tasks/<id>/` | Delete a task | N/A |
| **PATCH** | `/api/tasks/<id>/toggle_completed/` | Toggle completion status | N/A (Toggles `completed` boolean) |

---

## Project Structure

```
task_manager/
├── backend/            # Django project
│   ├── taskmanager/    # Project settings
│   └── tasks/          # App content (models, views, urls)
│
├── frontend/           # React project
│   ├── src/
│   │   ├── components/ # React components (TaskList, TaskItem)
│   │   └── services/   # API integration (api.js)
│   └── public/
```
# Task-Manager---Full-Stack-Web-App
