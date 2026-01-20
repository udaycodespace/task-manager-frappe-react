import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/method/task_manager.api.get_tasks');
      const data = await res.json();
      setTasks(data.message || []);
    } catch (err) { console.error(err); }
  };

  const addTask = async () => {
    if (!title) return alert("Title is required");
    await fetch('/api/method/task_manager.api.add_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, description: desc, due_date: dueDate })
    });
    setTitle(""); setDesc(""); setDueDate("");
    fetchTasks();
  };

  // NEW: Update Function
  const updateStatus = async (name, newStatus) => {
    await fetch('/api/method/task_manager.api.update_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, status: newStatus })
    });
    fetchTasks();
  };

  const deleteTask = async (name) => {
    await fetch('/api/method/task_manager.api.delete_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Task Manager</h1>
      
      {/* Input Section */}
      <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <input style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="date" style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={addTask} style={{ width: "100%", padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Add Task</button>
      </div>

      {/* Task List */}
      <div style={{ marginTop: "30px" }}>
        {tasks.map((t) => (
          <div key={t.name} style={{ background: "white", border: "1px solid #e9ecef", padding: "15px", marginBottom: "10px", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            
            {/* Task Details */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0", textDecoration: t.status === "Completed" ? "line-through" : "none", color: t.status === "Completed" ? "#888" : "#000" }}>
                {t.title}
              </h3>
              <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>{t.description}</p>
              <small style={{ color: "#999" }}>📅 {t.due_date || "No Date"} • Status: <strong>{t.status}</strong></small>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {t.status === "Open" && (
                <button onClick={() => updateStatus(t.name, "Completed")} style={{ background: "#28a745", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                  ✓ Done
                </button>
              )}
              <button onClick={() => deleteTask(t.name)} style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                ✕ Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;