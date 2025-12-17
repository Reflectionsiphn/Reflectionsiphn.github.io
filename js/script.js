let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

function updateTaskCount() {
    const count = tasks.filter(t => !t.completed).length;
    taskCount.textContent = count;
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        alert("Please enter a task!");
        return;
    }
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, i) => {
        const li = document.createElement('li');
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span onclick="toggleTask(${i})" style="cursor:pointer;">${task.text}</span>
            <button onclick="deleteTask(${i})">✕</button>
        `;
        taskList.appendChild(li);
    });
    updateTaskCount();
}
