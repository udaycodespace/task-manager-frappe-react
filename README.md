# Task Manager Application (Frappe + React)

A full-stack Task Management application built using the **Frappe Framework** as a backend and **React** as the frontend. This project demonstrates the implementation of **Custom Whitelisted APIs** to handle CRUD operations, bypassing the standard REST API for granular control.

## 🚀 Key Features
- **Custom Backend Logic**: Utilizes a standalone controller (`api.py`) with `@frappe.whitelist` methods.
- **End-to-End CRUD**: 
  - **Create**: Add tasks with Title, Description, and Due Date.
  - **Read**: Fetch tasks with real-time status.
  - **Update**: "Mark as Done" functionality (Status transition: Open -> Completed).
  - **Delete**: Remove tasks from the database.
- **Security**: Explicit permission handling (`allow_guest=True` with `ignore_permissions=True`) for seamless local testing.
- **Frontend Integration**: React `fetch` calls proxied to the Frappe backend (`localhost:8000`).

## 🛠️ Tech Stack
- **Backend:** Frappe Framework (Python)
- **Frontend:** React.js (Create React App)
- **Database:** MariaDB (via Frappe ORM)
- **API Style:** RPC (Remote Procedure Call) via `api/method/`

## 📂 Project Structure
- `apps/task_manager/task_manager/api.py`: **The Core Logic**. Contains the custom Python functions for `get_tasks`, `add_task`, `update_task`, and `delete_task`.
- `task-frontend/src/App.js`: **The UI Logic**. React component managing state and API integration.

## 📸 Screenshots
Screenshots of the execution, network requests, and code logic can be found in the [docs/screenshots](docs/screenshots) folder.