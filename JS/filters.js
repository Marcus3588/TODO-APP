export function applyFilter(task,filter) {
	if (filter === 'completed') return task.completed;
	if (filter === 'active') return !task.completed;
	return true;
}