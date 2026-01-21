# Task Manager - Backend (Frappe)

This directory contains the Python logic for the Task Manager.

## 📄 Key File: `api.py`
The core logic resides in `task_manager.api`. It bypasses the standard REST API to use Remote Procedure Calls (RPC).

### Setup Instructions
1. Copy the `api.py` code into your bench app: `apps/task_manager/task_manager/api.py`.
2. **Important:** Run the following SQL command to add the Priority column (since we are not using the Desk UI):
   ```sql
   ALTER TABLE `tabTask` ADD COLUMN `priority` VARCHAR(140) DEFAULT 'Medium';

```

3. Restart bench: `bench restart`.

### API Endpoints

* `task_manager.api.get_tasks` (GET)
* `task_manager.api.add_task` (POST)
* `task_manager.api.update_task` (POST)
* `task_manager.api.delete_task` (POST)