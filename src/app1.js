import './App.css';
import React, { useState } from 'react';

function App() {
  // 1. State variables
  const [todo, settodo] = useState([]);  // List of tasks
  const [inputValue, setinputValue] = useState("");  // Input field value
  const [filter, setFilter] = useState("all");  // Filter for tasks (All, Active, Completed)

  // 2. Handle input changes
  const handleInputChange = (event) => {
    setinputValue(event.target.value);
  };

  // 3. Add a new task
  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),  // unique ID for each task
        name: inputValue,
        completed: false,  // task is initially not completed
      };
      settodo([...todo, newTask]);
      setinputValue("");  // Reset the input field
    }
  };

  // 4. Toggle task completion
  const handleToggleCompletion = (id) => {
    settodo(todo.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 5. Filter tasks based on the selected filter
  const filteredTasks = todo.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="App">
      <p id='todo-header'>To-Do List</p>

      {/* Add Task Input and Button */}
      <div className='add-button-input'>
        <input 
          id='input' 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder='Add a new task...'
        />
        <button id='button' onClick={handleAddTask}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div id='buttons'>
        <button 
          id='all-button' 
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button 
          id='active-button' 
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button 
          id='completed-button' 
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div id='task-area'>
        {filteredTasks.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.name}
              </span>
            </div>
          ))
        )}
      </div>

      <p id='powered'>Powered by Pinecone Academy</p>
    </div>
  );
}

export default App;