const Newtask = (props) => {

    const {handleBox, handleDelete, filter, todo, error} = props;

    return (
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
    );
};
export default Newtask;