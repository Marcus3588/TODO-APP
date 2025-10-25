export function saveTasks(tasks) {
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

export function loadTasks(){
	return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function saveTasks(isDark) {
	localStorage.setItem('darkMode' ,JSON.stringify(isDark));
}

export function loadTheme(){
	return JSON.parse(localStorage.getItem('darkMode')) || false;
}