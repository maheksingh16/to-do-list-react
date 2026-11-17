

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("my-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("All");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // Mark task as completed or incomplete
  const toggleTask = (id) => {
    setTasks(
        tasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter(
      (task) => !task.completed
  ).length;

  return (
      <div className="app">
        <div className="todo-container">

          <header className="header">
            <div className="logo">✓</div>
            <h1>My Tasks</h1>
            <p>Organize your day, one task at a time.</p>
          </header>

          <form className="task-form" onSubmit={addTask}>
            <input
                type="text"
                placeholder="What do you need to do?"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />

            <button type="submit">+ Add</button>
          </form>

          <div className="task-summary">
            <span>{remainingTasks} tasks remaining</span>
            <span>{tasks.length} total tasks</span>
          </div>

          <div className="filters">
            {["All", "Active", "Completed"].map((item) => (
                <button
                    key={item}
                    className={filter === item ? "filter active" : "filter"}
                    onClick={() => setFilter(item)}
                    type="button"
                >
                  {item}
                </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No tasks here!</h3>
                  <p>Add a task and start being productive.</p>
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <div className="task-item" key={task.id}>
                      <div className="task-details">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />

                        <span
                            className={
                              task.completed ? "task-text completed" : "task-text"
                            }
                        >
                    {task.text}
                  </span>
                      </div>

                      <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                      >
                        ✕
                      </button>
                    </div>
                ))
            )}
          </div>

          {tasks.some((task) => task.completed) && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed tasks
              </button>
          )}

          <footer>
            Made with ❤️ using React
          </footer>

        </div>
      </div>
  );
}

export default App;
