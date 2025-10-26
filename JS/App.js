const todoForm = document.querySelector('#todo-form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoLists();


todoForm.addEventListener('submit', function(e){
	e.preventDefault();
	addTodo();
})

function addTodo(){
	const todoText = todoInput.value.trim();
	if(todoText.length > 0) {
		const todoObject = {
			text: todoText,
			completed: false
		};
		allTodos.push(todoObject);
		updateTodoLists();
		saveTodos();
		todoInput.value = '';
	}
}


function createTodoItem(todo, todoIndex){
	const todoId = `todo-${todoIndex}`;
	const todoLI = document.createElement('li');
	todoLI.className = 'todo';
	todoLI.id = todoId;


	todoLI.innerHTML = `
	
  <input type="checkbox" id="${todoId}-check" ${todo.completed ? 'checked' : ''}>
  <label for="${todoId}-check" class="custom-checkbox">
    <svg class="icon"><use href="#check"></use></svg>
  </label>
  <label for="${todoId}-check" class="todo-text ${todo.completed ? 'completed' : ''}">
    ${todo.text}
  </label>
  <button class="delete-button">
    <svg class="icon"><use href="#delete"></use></svg>
  </button>
	`
	const deleteButton = todoLI.querySelector('.delete-button');
	deleteButton.addEventListener('click',()=>{
		deleteTodoItem(todoIndex);
	})


	const checkBox = todoLI.querySelector("input")
	checkBox.addEventListener('change', () => {
		allTodos[todoIndex].completed = checkBox.checked;
		saveTodos();
		updateTodoLists();
	})
	return todoLI;
}

function updateTodoLists(){
	todoListUL.innerHTML = '';
	allTodos.forEach((todo, todoIndex) => {
		 const todoItem = createTodoItem(todo,todoIndex);
		 todoListUL.appendChild(todoItem);
	});
}

function deleteTodoItem(todoIndex) {
	allTodos = allTodos.filter((_, i) => i !== todoIndex);
	saveTodos();
	updateTodoLists();
}


function saveTodos() {
	const todosJson = JSON.stringify(allTodos);
	localStorage.setItem('todos', todosJson);
}


function getTodos() {
	const todos = localStorage.getItem("todos") || "[]";
	return JSON.parse(todos);
}