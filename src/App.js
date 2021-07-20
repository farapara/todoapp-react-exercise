import "./App.css";
import { useState } from "react";

function App() {
  const seedTasks = [
    {
      task: "Code",
      status: "done",
    },
    {
      task: "Eat",
      status: "pending",
    },
    {
      task: "Sleep",
      status: "pending",
    },
    {
      task: "Repeat",
      status: "pending",
    },
  ];

  const [todoItems, setTodoItems] = useState(seedTasks);

  const taskListItems = todoItems.map((todo, index) => {
    return (
      <TodoListItem
        key={index}
        todoItem={todo}
        onStatusToggled={handleTodoStatusToggledClick}
        onTaskDeleted={handleTodoItemDeleteClick}
      />
    );
  });

  function handleTodoItemDeleteClick(currentTask) {
    const newTodoItems = todoItems.filter((task) => {
      return task.task !== currentTask.task;
    });
    setTodoItems(newTodoItems);
  }

  function handleTodoStatusToggledClick(currentTask) {
    const newTodoItems = todoItems.map((task) => {
      if (task.task === currentTask.task) {
        task.status = task.status === "pending" ? "done" : "pending";
      }

      return task;
    });
    setTodoItems(newTodoItems);
  }

  function TodoListItem({ todoItem, onStatusToggled, onTaskDeleted }) {
    return (
      <li className="liTodoItem">
        <button className="todoItemDelete"
          onClick={(e) => {
            console.log("deleteditem");
            onTaskDeleted(todoItem);
          }}
        >
          Delete
        </button>
        {todoItem.task}{" "}
        <button className="todoItemToggle"
          onClick={(e) => {
            console.log("statustoggled");
            onStatusToggled(todoItem);
          }}
        >
          {todoItem.status}
        </button>
      </li>
    );
  }

  console.log(taskListItems);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const addNewTodoItem = { 
      task: form.todoitemname.value, status: "pending" };
    const addNewTodoItems = [...todoItems, addNewTodoItem];
    setTodoItems(addNewTodoItems);
    form.reset();
  }

  return (
    <div className="App">
      <header className="Header">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input 
          name="todoitemname" 
          type="text" 
          placeholder="Add a Todo" />
          <button type="submit">Add</button>
        </form>
      </header>
        <div>
          <ul>{taskListItems}</ul>
        </div>
      
    </div>
  );
}

export default App;
