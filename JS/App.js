import { toggleTheme} from './themeToggle.js';
import  {saveTasks, loadTasks} from './storage.js';
import {applyFilter} from './filters.js'

const taskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTask')
const todoList = document.getElementById('todoList');
let tasks = loadTasks()

function renderTasks(filter = 'all') {
	todoList.innerHTML = '';
	tasks
	.filter(task => applyFilter (task ,filter))
	.forEach((task, index)=>{
		const li =  document.createElement('li');
		li.classList.toggle('completed',task.completed);
		li.innerHTML = `
		<span>${task.text}</span>
		<div> 
		  <button onclick="toggleTask(${index})"></button>
		  <button onclick="deleteTask(${index})"></button>
		</div>
		`;
		todoList.appendChild(li);
	});
	saveTasks(tasks);
}

window.toggleTask = (index) =>{
	tasks[index].completed = !tasks[index].completed;
	renderTasks();
}

window.deleteTask = (index) =>{
	tasks.splice(index,1);
	renderTasks
}

addTaskBtn.addEventListener('click',() => {
	const text = taskInput.ariaValueMax.trim();
	if(text) {
		tasks.push({text,completed:false})
		taskInput.value = '';
		renderTasks();
	}
})

document.querySelectorAll('.filters button').forEach(btn => {
	btn.addEventListener('click' ,() => {
		document.querySelector('.filters button.active')?.classList.remove('active');
		btn.classList.add('active');
		renderTasks(btn.dataset.filter);
	});
});

toggleTheme();
renderTasks();