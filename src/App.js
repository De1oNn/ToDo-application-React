import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Button from './component/buttons';

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");


  const [logginVisible, setLogginVisible] = useState(false);
  const [logginTasks, setLogginTasks] = useState([]);

  const completedTasks = todo.filter(task => task.status === "Done").length;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (inputValue.length === 0) {
      setError('Please Enter ToDo Task');
      return;
    } else {
      const newTask = { text: inputValue, id: uuidv4(), status: "Active", addedTime: new Date().toLocaleString() };
      setTodo([...todo, newTask]);


      const logEntry = {
        task: inputValue,
        time: `Added at: ${new Date().toLocaleString()}`
      };
      setLogginTasks([...logginTasks, logEntry]);

      setInputValue("");
    }
  };

  const handleBox = (id) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        const newStatus = todo.status === "Active" ? "Done" : "Active";
        const completionTime = newStatus === "Done" ? new Date().toLocaleString() : null;

        return { ...todo, status: newStatus, completedTime: completionTime };
      } else {
        return todo;
      }
    });
    setTodo(newTodos);


    const completedTask = newTodos.find((todo) => todo.id === id);
    if (completedTask.status === "Done") {
      const logEntry = {
        task: completedTask.text,
        time: `Completed at: ${completedTask.completedTime}`
      };
      setLogginTasks([...logginTasks, logEntry]);
    }
  };

  const handleClearCompleted = () => {
    const newTodos = todo.filter((todo) => todo.status !== "Done");
    setTodo(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todo.filter((todo) => todo.id !== id);
    setTodo(newTodos);
  };

  const handleFiltersState = (state) => {
    setFilter(state);
    setLogginVisible(false);
  };

  const handleLogginButtonClick = () => {
    setLogginVisible(true);
  };

  return (
    <div className="App">
      <p id="todo-header">To-Do List</p>
      <div className="add-button-input">
        <input
          id="input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
        />
        <button id="button" onClick={handleAddTask}>Add</button>
      </div>

      <div id="buttons">
        <button id="all-button" onClick={() => handleFiltersState("All")}>All</button>
        <button id="active-button" onClick={() => handleFiltersState("Active")}>Active</button>
        <button id="completed-button" onClick={() => handleFiltersState("Done")}>Completed</button>
        <button id="loggin-button" onClick={handleLogginButtonClick}>Loggin</button>
      </div>

      <div>
        {error.length > 1 && <div id="error">{error}</div>}
        {todo
          .filter((todo) => {
            if (filter === "All") {
              return true;
            } else {
              return todo.status === filter;
            }
          })
          .map((todo) => {
            return (
              <div id="newtask" key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.status === "Done"}
                  id="checkbox"
                  onChange={() => handleBox(todo.id)}
                />
                <span style={{ textDecoration: todo.status === "Done" ? "line-through" : "none" }}>
                  {todo.text}
                </span>
                <button id="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            );
          })}
      </div>

      <div id="line"></div>
      <p id="task-area" style={{ display: todo.length === 0 ? 'flex' : 'none' }}>
        No tasks yet. Add one above!
      </p>

      <div className="clear-completed" style={{ display: todo.length === 0 ? 'none' : 'flex' }}>
        <p id="tasks">{completedTasks} of {todo.length} tasks completed</p>
        <p id="clear" onClick={handleClearCompleted}>Clear Completed</p>
      </div>

      {logginVisible && (
        <div id="loggin">
          {logginTasks.map((log, index) => (
            <div key={index} className="log-entry">
              <div className="log-entry-task">
                <span id="log-input">{log.task}</span>
              </div>
              <div className="log-entry-time">
                <span>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div id="powered">
        Powered by <p id="pinecone">Pinecone Academy</p>
      </div>
    </div>
  );
}

export default App;
