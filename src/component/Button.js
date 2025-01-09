const Button = (props) => {
    
    const {setFilter, setLogginVisible } = props;
    
    const handleFiltersState = (state) => {
        setFilter(state);
        setLogginVisible(false);
      };
    
      const handleLogginButtonClick = () => {
        setLogginVisible(true);
      };
    return (
    <div id="buttons">
        <button id="all-button" onClick={() => handleFiltersState("All")}>All</button>
        <button id="active-button" onClick={() => handleFiltersState("Active")}>Active</button>
        <button id="completed-button" onClick={() => handleFiltersState("Done")}>Completed</button>
        <button id="loggin-button" onClick={handleLogginButtonClick}>Loggin</button>
    </div>
    );      
};

export default Button;   