import frappe

# 1. GET TASKS
@frappe.whitelist(allow_guest=True)
def get_tasks():
    if frappe.db.exists("DocType", "Task"):
        return frappe.db.get_list("Task", 
            fields=["name", "title", "status", "description", "due_date"],
            ignore_permissions=True
        )
    return []

# 2. ADD TASK
@frappe.whitelist(allow_guest=True)
def add_task(title, description=None, due_date=None):
    new_task = frappe.get_doc({
        "doctype": "Task",
        "title": title,
        "status": "Open",
        "description": description,
        "due_date": due_date
    })
    new_task.insert(ignore_permissions=True)
    return new_task

# 3. UPDATE TASK (The Missing Piece!)
@frappe.whitelist(allow_guest=True)
def update_task(name, status):
    doc = frappe.get_doc("Task", name)
    doc.status = status
    doc.save(ignore_permissions=True)
    return doc

# 4. DELETE TASK
@frappe.whitelist(allow_guest=True)
def delete_task(name):
    frappe.delete_doc("Task", name, ignore_permissions=True)
    return "Deleted"
