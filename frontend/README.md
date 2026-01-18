# Task Management Application (Frappe + React)

This project is a complete Task Management solution built as part of the internship assignment. It demonstrates full-stack development using **Frappe Framework** for the backend and **React (Vite) + Redux Toolkit** for the frontend.

## 🚀 Tech Stack
* **Backend:** Frappe Framework (Python/MariaDB)
* **Frontend:** React.js (Vite)
* **State Management:** Redux Toolkit (RTK Query)
* **API:** REST API (Frappe DocType Resources)

## 🛠️ Features Implemented
1.  **Authentication:**
    * Login flow using Frappe's authentication.
    * Global state management for user sessions using Redux slices.
2.  **Task Management (CRUD):**
    * **Create:** Add new tasks with 'Pending' status.
    * **Read:** Fetch tasks via RTK Query with caching.
    * **Update:** Mark tasks as 'Completed' (Optimistic updates).
    * **Delete:** Remove tasks instantly.
3.  **Real-time Synchronization:** Uses `providesTags` and `invalidatesTags` in RTK Query to ensure UI stays in sync with the database.

## ⚙️ Setup Instructions

### Backend (Frappe)
The backend is built on a standard Frappe Bench installation.
1.  **Create Site:**
    \`\`\`bash
    bench new-site task-manager.local
    \`\`\`
2.  **Install App:**
    \`\`\`bash
    bench --site task-manager.local install-app task_manager
    \`\`\`
3.  **CORS & Developer Mode:**
    \`\`\`bash
    bench --site task-manager.local set-config developer_mode 1
    bench --site task-manager.local set-config allow_cors "*"
    \`\`\`

### Frontend (React)
The frontend proxies requests to port 8000 to avoid CORS issues during development.
1.  **Install Dependencies:**
    \`\`\`bash
    npm install
    \`\`\`
2.  **Run Development Server:**
    \`\`\`bash
    npm run dev
    \`\`\`
3.  **Access:** Open \`http://localhost:5173\` and login with Administrator credentials.

## 📂 Project Structure
* \`/src/apiSlice.js\`: Centralized RTK Query API definition.
* \`/src/store.js\`: Redux Store configuration.
* \`/vite.config.js\`: Proxy configuration for connecting to Frappe.