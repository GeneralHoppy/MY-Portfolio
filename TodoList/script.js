// JavaScript for handling the Todo App functionality
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const newTodoInput = document.getElementById("new-todo");
  const todoList = document.getElementById("todo-list");
  const taskCount = document.getElementById("task-count");
  const clearBtn = document.getElementById("clear-btn");

  let todos = [];

  // Function to update the task count
  const updateTaskCount = () => {
    taskCount.textContent = `You have ${todos.length} pending tasks`;
  };

  // Function to add a new todo
  const addTodo = () => {
    const todoText = newTodoInput.value.trim();
    if (todoText) {
      todos.push(todoText);
      renderTodos();
      newTodoInput.value = "";
      updateTaskCount();
    }
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
    updateTaskCount();
  };

  // Function to render todos
  const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteTodo(index);

      todoItem.appendChild(deleteBtn);
      todoList.appendChild(todoItem);
    });
  };

  // Function to clear all todos
  const clearTodos = () => {
    todos = [];
    renderTodos();
    updateTaskCount();
  };

  // Event listeners
  addBtn.addEventListener("click", addTodo);
  newTodoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });
  clearBtn.addEventListener("click", clearTodos);
});
