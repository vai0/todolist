// model
let todoList = {
  todos: [],
  addTodo(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
  },
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll() {
    const allCompleted = this.todos.every(todo => todo.completed);
    allCompleted ?
      this.todos.forEach(todo => todo.completed = false) :
      this.todos.forEach(todo => todo.completed = true);
  }
}

// controller
const handlers = {
  addTodo() {
    const addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
    view.displayToDos();
  },
  changeTodo() {
    const changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    const changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayToDos();
  },
  deleteTodo(position) {
    todoList.deleteTodo(position);
    view.displayToDos();
  },
  toggleCompleted() {
    const toggleCompletedInput = document.getElementById('toggleCompletedInput');
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = '';
    view.displayToDos();
  },
  toggleAll() {
    todoList.toggleAll();
    view.displayToDos();
  }
}

// view
const view = {
  displayToDos() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
    todoList.todos.forEach((todo, i) => {
      const li = document.createElement('li');
      li.id = i;
      todo.completed ?
        li.innerHTML = `(x) ${todo.todoText}` :
        li.innerHTML = `( ) ${todo.todoText}`;
      li.appendChild(this.createDeleteButton());
      ul.appendChild(li);
    });
  },
  createDeleteButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Delete';
    button.className = 'deleteButton';
    return button;
  },
  setEventListeners() {
    const ul = document.querySelector('ul');
    ul.addEventListener('click', event => {
      if (event.target.className === 'deleteButton') {
        handlers.deleteTodo(event.target.parentNode.id);
      }
    });
  }
}

view.setEventListeners();
window.todoList = todoList;
window.handlers = handlers;
window.view = view;
