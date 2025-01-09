const Search = (props) => {
  
  const {setInputValue, setError, inputValue, handleAddTask} = props;
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };
  return (
    <input
    id="input"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    placeholder="Add a new task..."
  />)
}
export default Search;
