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
  const [filter, setfilter] = useState("All");

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
  const handleBox = (id) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        return {...todo, status: "Done"}
      } else {
        return todo;
      };
    });
    setTodo(newTodos);
  } 
  console.log(filter);

  const handlefiltersstate = (state) => {
    setfilter(state)
  }
  
  
  return (
      <div className="App">
        <p id='todo-header'>To-Do List</p>
        <div className='add-button-input'>
          <input id='input' value={inputValue} onChange={handleInputChange} placeholder='Add a new task...'/>
          <button id='button' onClick={handleAddTask}>Add</button>
        </div>
        <div id='buttons'>
          <button id='all-button' onClick={() => handlefiltersstate("All")}>All</button>
          <button id='active-button' onClick={() => handlefiltersstate("Active")}>Active</button>
          <button id='completed-button' onClick={() => handlefiltersstate("Done")}>Completed</button>
        </div>
        <div>
        {error.length > 1 && <div id='error'>{error}</div>}
        {todo.filter((todo) => {
          if (filter === "All") {
            return true
          } else {
            return todo.status === filter;
          }
        }).map((todo) => {
            return <div id='newtask'>
              <input type='checkbox' checked={todo.status === "Done"} id='checkbox' onChange = {() => handleBox(todo.id)}></input>
              {todo.text}
              <button id='delete'>Delete</button>
              </div>
          })}

        </div>
        <div id='line'></div>
        <p id='task-area'>No tasks yet. Add one above!</p>
        <p id='powered'>Powered by Pinecone academy</p>
      </div>
  );
}

export default App;
