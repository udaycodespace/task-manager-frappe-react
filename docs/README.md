# 📸 Documentation & Proof of Work

This directory contains execution screenshots and evidence of the project's development lifecycle, from environment setup to the final implementation of Custom Whitelisted APIs.

## 📂 Evidence Structure

### 1. [Installation & Setup](./screenshots-installation)
**Phase 1: Environment Configuration**
* Screenshots verifying the successful installation of Frappe Framework.
* Creation of the `Task` DocType in the MariaDB database.
* Initial Bench setup and site creation.

### 2. [Standard REST API Execution](./screenshots-execution)
**Phase 2: Initial Prototype**
* Evidence of the application working using Frappe's default REST API (`/api/resource/Task`).
* *Note: This approach was used initially to validate the frontend before migrating to custom logic.*

### 3. [Whitelisted API Execution (Final)](./screenshots-whitelist-api)
**Phase 3: Custom Backend Logic (Current Version)**
* **The Final Deliverable.**
* Screenshots demonstrating the fully functional application using `api.py`.
* Network tab evidence showing calls to custom endpoints (`task_manager.api.add_task`, `get_tasks`, etc.).
* Validation errors (e.g., "Title is required") and Priority Badge rendering.

---

## 🔍 Verification Checklist
If reviewing the code, please refer to the **Phase 3** screenshots to see the current state of the application, including:
* ✅ Custom Priority System (High/Medium/Low)
* ✅ Server-side Validations
* ✅ Custom SQL Schema Updates