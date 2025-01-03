import { use } from 'react';
import './App.css';
import React, { useState } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard'; 
import { v4 as uuidv4 } from 'uuid';

const todo = {
  text: "hello",
  id: 1,
  status: 'Active' | 'Completed',
}

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  // const [filter, setfilter] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError("")
  }

  const handleAddTask = () => {
    if(inputValue.length === 0) {
      setError('Please Enter ToDo Task');
      return;
    } else {
      setTodo([...todo, {text: inputValue, id: uuidv4(), status: "Active"}]);
      setInputValue("");
    }
  };
  const handleCheckBox = (id) => {
    console.log(id);
  } 
  console.log(todo);
  
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
            return <div id='newtask'>
              <input type='checkbox' onChange = {handleCheckBox(todo.id)}></input>
              {todo.text}</div>
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
