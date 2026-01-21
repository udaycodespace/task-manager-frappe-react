import frappe

# 1. GET TASKS (Added priority to fields)
@frappe.whitelist(allow_guest=True)
def get_tasks():
    if frappe.db.exists("DocType", "Task"):
        return frappe.db.get_list("Task",
            fields=["name", "title", "status", "description", "due_date", "priority"],
            ignore_permissions=True,
            order_by="creation desc"
        )
    return []

# 2. ADD TASK (Added priority argument)
@frappe.whitelist(allow_guest=True)
def add_task(title, description=None, due_date=None, priority="Medium"):
    if not title:
        frappe.throw("Task Title is required!")

    new_task = frappe.get_doc({
        "doctype": "Task",
        "title": title,
        "status": "Open",
        "description": description,
        "due_date": due_date,
        "priority": priority
    })
    new_task.insert(ignore_permissions=True)
    return new_task

# 3. UPDATE TASK
@frappe.whitelist(allow_guest=True)
def update_task(name, status):
    if not frappe.db.exists("Task", name):
        frappe.throw(f"Task {name} not found!")
    doc = frappe.get_doc("Task", name)
    doc.status = status
    doc.save(ignore_permissions=True)
    return doc

# 4. DELETE TASK
@frappe.whitelist(allow_guest=True)
def delete_task(name):
    if not frappe.db.exists("Task", name):
        frappe.throw(f"Task {name} not found!")
    frappe.delete_doc("Task", name, ignore_permissions=True)