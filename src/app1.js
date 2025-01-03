import { use } from 'react';
import './App.css';
import React, { useState } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard'; 
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All"); // Add filter state

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError(""); // Clear error on input change
  };

  // Add a new task
  const handleAddTask = () => {
    if (inputValue.length === 0) {
      setError("Please Enter ToDo Task");
      return;
    } else {
      setTodo([
        ...todo,
        { text: inputValue, id: uuidv4(), status: "Active" },
      ]);
      setInputValue(""); // Clear input field
    }
  };

  // Toggle the task status (Active <-> Completed)
  const handleCheckBox = (id) => {
    setTodo(
      todo.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: task.status === "Active" ? "Completed" : "Active", // Toggle status
          };
        }
        return task;
      })
    );
  };

  // Delete a task
  const handleDelete = (id) => {
    setTodo(todo.filter((task) => task.id !== id)); // Remove task by id
  };

  // Filter tasks based on the selected filter
  const filteredTodos = todo.filter((task) => {
    if (filter === "Active") return task.status === "Active";
    if (filter === "Completed") return task.status === "Completed";
    return true; // Show all tasks for "All"
  });

  return (
    <div className="App">
      <p id="todo-header">To-Do List</p>
      <div className="add-button-input">
        <input
          id="input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button id="button" onClick={handleAddTask}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div id="buttons">
        <button id="all-button" onClick={() => setFilter("All")}>
          All
        </button>
        <button id="active-button" onClick={() => setFilter("Active")}>
          Active
        </button>
        <button id="completed-button" onClick={() => setFilter("Completed")}>
          Completed
        </button>
      </div>

      {/* Display error message */}
      {error.length > 0 && <div id="error">{error}</div>}

      {/* Display the tasks */}
      <div>
        {filteredTodos.length === 0 && (
          <p id="task-area">No tasks yet. Add one above!</p>
        )}
        {filteredTodos.map((task) => (
          <div key={task.id} id="newtask">
            <input
              type="checkbox"
              checked={task.status === "Completed"}
              onChange={() => handleCheckBox(task.id)} // Toggle status
            />
            {task.text}
            <button id="delete" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div id="line"></div>
      <p id="powered">Powered by Pinecone Academy</p>
    </div>
  );
}

export default App;