import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  // 1. Restore Priority State
  const [priority, setPriority] = useState("Medium");

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
      // 2. Send Priority to Backend
      body: JSON.stringify({ title, description: desc, due_date: dueDate, priority })
    });
    setTitle(""); setDesc(""); setDueDate(""); setPriority("Medium");
    fetchTasks();
  };

  const updateStatus = async (name, newStatus) => {
    await fetch('/api/method/task_manager.api.update_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, status: newStatus })
    });
    fetchTasks();
  };

  const deleteTask = async (name) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    await fetch('/api/method/task_manager.api.delete_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  // --- STYLES (Kept your clean styles) ---
  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    background: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  };

  const headerStyle = {
    textAlign: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "4px"
  };

  const btnStyle = {
    padding: "8px 15px",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    fontSize: "14px"
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Task Manager</h2>
      
      {/* Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <input 
          style={inputStyle} 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          style={inputStyle} 
          placeholder="Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />
        
        {/* 3. Add Priority Dropdown */}
        <select style={inputStyle} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <input 
          type="date" 
          style={inputStyle} 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <button onClick={addTask} style={{ ...btnStyle, width: "100%" }}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div>
        {tasks.map((t) => (
          <div key={t.name} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <strong style={{ 
                  display: "block", 
                  textDecoration: t.status === "Completed" ? "line-through" : "none",
                  color: t.status === "Completed" ? "#888" : "#000"
                }}>
                  {t.title}

                  {/* 4. Add Priority Badge */}
                  <span style={{ 
                    fontSize: "10px", 
                    marginLeft: "8px", 
                    padding: "2px 6px", 
                    borderRadius: "4px",
                    // Dynamic Colors based on Priority
                    backgroundColor: t.priority === "High" ? "#ffebee" : t.priority === "Low" ? "#e8f5e9" : "#fff3e0",
                    color: t.priority === "High" ? "#c62828" : t.priority === "Low" ? "#2e7d32" : "#ef6c00",
                    border: "1px solid currentColor",
                    display: "inline-block", // Fix alignment
                    verticalAlign: "middle"
                  }}>
                    {t.priority || "Medium"}
                  </span>

                </strong>
                <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                  {t.description}
                </div>
                <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
                  Due: {t.due_date || "N/A"} | Status: {t.status}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "10px" }}>
                {t.status === "Open" && (
                  <button 
                    onClick={() => updateStatus(t.name, "Completed")} 
                    style={{ ...btnStyle, background: "green", fontSize: "12px", padding: "5px" }}
                  >
                    Done
                  </button>
                )}
                <button 
                  onClick={() => deleteTask(t.name)} 
                  style={{ ...btnStyle, background: "#d9534f", fontSize: "12px", padding: "5px" }}
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;