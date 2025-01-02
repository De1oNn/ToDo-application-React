
import './App.css';
import React, { useState } from 'react';

function App() {

  const [todo, settodo] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [filter, setfilter] = useState("");

  const handleInputChange = (event) => {
    setinputValue(event.target.value);
  }

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Data.now(),
        name: inputValue,
        completed: false
      }
    }
  }

  
  return (
    <div>
      <div className="App">
        <p id='todo-header'>To-Do List</p>
        <div className='add-button-input'>
          <input id='input' onChange={handleInputChange} placeholder='Add a new task...'/>
          <button id='button'>Add</button>
        </div>
        <div id='buttons'>
          <button id='all-button'>All</button>
          <button id='active-button'>Active</button>
          <button id='completed-button'>Completed</button>
        </div>
        <p id='task-area'>No tasks yet. Add one above!</p>
        <p id='powered'>Powered by Pinecone academy</p>
      </div>
    </div>
  );
}

export default App;
