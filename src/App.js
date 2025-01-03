import { use } from 'react';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  // const [filter, setfilter] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleAddTask = () => {
    if(inputValue.length === 0) {
      setError('Please Enter ToDo Task');
      return;
    } else {
      setTodo([...todo, inputValue]);
      setInputValue("");
    }
  };

  
    // if (inputValue.trim()) {
    //   const newTask = {
    //     id: Date.now(),
    //     name: inputValue,
    //     completed: false,
    //   };
    //   console.log(todo);
    //   settodo([...todo, newTask]);
    //   setinputValue("");
    //   }
    // };

    // const handleToggleCompletion = (id) => {

    // }

  
  return (
    <div>
      <div className="App">
        <p id='todo-header'>To-Do List</p>
        <div className='add-button-input'>
          <input id='input' value={inputValue} onChange={handleInputChange} placeholder='Add a new task...'/>
          <button id='button' onClick={handleAddTask}>Add</button>
        </div>
        <div id='buttons'>
          <button id='all-button'>All</button>
          <button id='active-button'>Active</button>
          <button id='completed-button'>Completed</button>
        </div>
        <div>
        {error.length > 1 && <div id='error'>{error}</div>}
        {todo.map((todo) => {
            return <div id='newtask'>{todo}</div>
          })}
        
        </div>
        <div id='line'></div>
        <p id='task-area'>No tasks yet. Add one above!</p>
        <p id='powered'>Powered by Pinecone academy</p>
      </div>
    </div>
  );
}

export default App;
