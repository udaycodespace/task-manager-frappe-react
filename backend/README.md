# Frappe Backend

The backend for this project is built on the **Frappe Framework**.

## 📂 Location
The source code runs in a standard Frappe Bench environment on WSL (Ubuntu).
* **Bench Path:** `~/frappe-bench`
* **Site:** `task-manager.local`
* **Custom App:** `task_manager`

## 🛠️ Configuration
* **DocType:** `Task` (Custom Module)
* **Fields:**
    * `Title` (Data, Mandatory)
    * `Status` (Select: Pending, In Progress, Completed)
    * `Description` (Text Editor)

## 🚀 How to Run
1.  Start the bench server:
    ```bash
    bench start
    ```
2.  The API is accessible at: `http://localhost:8000/api/resource/Task`