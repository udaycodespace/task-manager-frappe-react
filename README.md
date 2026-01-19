# Task Manager Application (Frappe + React)

A full-stack Task Management application built as part of the internship assignment. This project demonstrates the integration of a **Frappe Framework** backend with a **React (Vite)** frontend, utilizing **Redux Toolkit** for efficient state management and API handling.

---

## 📸 Proof of Work
> **Note:** Full verification screenshots are available in the `docs/screenshots` folder.

| **Frontend UI** | **Backend Schema** |
| :---: | :---: |
| ![Frontend UI](docs/screenshots/5_final_application_ui.png) | ![Backend Schema](docs/screenshots/2_backend_task_schema.png) |

---

## 🚀 Tech Stack

### **Backend (Frappe Framework)**
* **Framework:** Frappe (Python/MariaDB)
* **DocType:** Custom `Task` module
* **API:** Standard REST API (`/api/resource/Task`)
* **Environment:** WSL (Ubuntu)

### **Frontend (React)**
* **Build Tool:** Vite
* **State Management:** Redux Toolkit (RTK) & RTK Query
* **Styling:** Standard CSS
* **Proxy:** Configured to forward API requests to port `8000`

---

## 🛠️ Features
1.  **Authentication:** Secure login validated against Frappe Users (`Administrator`).
2.  **Create Task:** Add new tasks with a default status of "Pending".
3.  **Read Tasks:** Fetch and display tasks in real-time from the database.
4.  **Update Task:** Mark tasks as "Completed" (Optimistic UI updates).
5.  **Delete Task:** Remove tasks permanently from the database.
6.  **Real-Time Sync:** RTK Query tags ensure the UI stays synchronized with the server.

---

## ⚙️ Setup Instructions

### 1. Backend Setup (Frappe)
*The backend runs on a standard Frappe Bench installation within WSL.*

1.  Navigate to your bench directory:
    ```bash
    cd ~/frappe-bench
    ```
2.  Start the Frappe server:
    ```bash
    bench start
    ```
3.  **Verify:** Ensure the server is running on `http://localhost:8000`.

### 2. Frontend Setup (React)
*The frontend is located in the `frontend/` directory of this repository.*

1.  Open a new terminal and navigate to the folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  **Access App:** Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```text
task-manager-frappe-react/
├── backend/            # Documentation regarding the Frappe DocType setup
├── docs/               # Screenshots and Proof of Work
├── frontend/           # The React Application Source Code
│   ├── src/
│   │   ├── apiSlice.js # RTK Query API Definitions
│   │   ├── store.js    # Redux Store Configuration
│   │   ├── App.jsx     # Main UI Logic
│   └── vite.config.js  # Proxy Configuration (Port 8000)
└── README.md           # Project Documentation

```

## 🔗 API Reference

The application communicates with the following Frappe endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/method/login` | User Authentication |
| `GET` | `/api/resource/Task` | Fetch all tasks |
| `POST` | `/api/resource/Task` | Create a new task |
| `PUT` | `/api/resource/Task/:id` | Update task status |
| `DELETE` | `/api/resource/Task/:id` | Delete a task |

---

## 📝 Note on Custom APIs

Currently, this application utilizes Frappe's **Standard REST API** (`/api/resource/Task`) which is the recommended approach for standard CRUD operations.

However, I am familiar with creating custom endpoints using the **`@frappe.whitelist`** decorator in Python. If required for this assignment, I can refactor the backend to demonstrate custom API creation for specific logic.