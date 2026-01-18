import React, { useState } from 'react';
import { useLoginMutation, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from './apiSlice';

function App() {
  const [user, setUser] = useState(null);
  
  if (!user) return <Login onLogin={setUser} />;
  return <TaskManager user={user} />;
}

function Login({ onLogin }) {
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ usr, pwd }).unwrap();
      onLogin(usr);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={usr} onChange={(e) => setUsr(e.target.value)} style={{ display: 'block', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} style={{ display: 'block', marginBottom: '10px' }} />
        <button disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        {error && <p style={{ color: 'red' }}>Login failed</p>}
      </form>
    </div>
  );
}

function TaskManager({ user }) {
  const { data: tasksData, isLoading } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  
  const [title, setTitle] = useState('');
  const tasks = tasksData?.data || [];

  const handleAdd = async () => {
    if (!title) return;
    await createTask({ title, status: 'Pending' });
    setTitle('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager (User: {user})</h1>
      <div style={{ marginBottom: '2rem' }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task Title" style={{ marginRight: '10px' }} />
        <button onClick={handleAdd}>Add Task</button>
      </div>
      {isLoading ? <p>Loading...</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task.name} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <strong>{task.title}</strong> - {task.status}
              <br />
              <button onClick={() => updateTask({ name: task.name, status: 'Completed' })}>Mark Completed</button>
              <button onClick={() => deleteTask(task.name)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;