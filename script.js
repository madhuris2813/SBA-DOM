const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const addTaskBtn = document.querySelector('#addTaskBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
    tasks.forEach((task, index) => renderTask(task, index));
};

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateAndAddTask();
});

function validateAndAddTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        showError('Task cannot be empty');
    } else {
        errorMessage.textContent = ''; 
        addTask(taskText);
    }
}

function addTask(taskText) {
    const task = {
        text: taskText,
        completed: false
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(task, tasks.length - 1);
    taskInput.value = ''; 
}

function renderTask(task, index) {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    li.innerHTML = `
        <span class="taskText">${task.text}</span>
        <div class="taskButtons">
            <button class="complete-btn" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
}

function editTask(index) {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => renderTask(task, index));
}

function showError(message) {
    errorMessage.textContent = message;
}

window.onbeforeunload = () => {
    if (taskInput.value !== '') {
        return 'You have unsaved changes! Are you sure you want to leave?';
    }
};

window.onfocus = () => {
    document.title = 'Task Manager';
};
window.onblur = () => {
    document.title = 'Come back to manage your tasks!';
};
