let todoList = {
  todos: [],
  displayToDos: function() {
    if (this.todos.length === 0) {
      console.log('Your todos list is empty!');
    } else {
      console.log('My Todos: ');
      this.todos.forEach(todo => {
        todo.completed ?
          console.log('(x)', todo.todoText) :
          console.log('( )', todo.todoText);
      });
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
    this.displayToDos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayToDos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayToDos();
  },
  toggleCompleted: function(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayToDos();
  },
  toggleAll: function() {
    const allCompleted = this.todos.every(todo => todo.completed);
    allCompleted ?
      this.todos.forEach(todo => todo.completed = false) :
      this.todos.forEach(todo => todo.completed = true);
    this.displayToDos();
  }
}

// add handlers
const displayTodosButton = document.getElementById('displayToDos');
const toggleAllButton = document.getElementById('toggleAll');

displayTodosButton.addEventListener('click', () => todoList.displayToDos());
toggleAllButton.addEventListener('click', () => todoList.toggleAll());

window.todoList = todoList;
