let tasks = [];
let originalTasks = []; // Store a copy of the original tasks

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.description;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML += '<span class="delete-btn" onclick="deleteTask(' + index + ')">&#10006;</span>';
        li.addEventListener('click', () => {
            toggleTask(index);
        });
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const description = taskInput.value.trim();
    if (description !== '') {
        tasks.push({ description, completed: false });
        originalTasks.push({ description, completed: false }); // Update originalTasks array
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Please enter a task!');
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(filter) {
    if (filter === 'all') {
        tasks = originalTasks.slice(); // Reset tasks array to contain all tasks
    } else {
        const filteredTasks = originalTasks.filter(task => {
            if (filter === 'active') {
                return !task.completed;
            } else if (filter === 'completed') {
                return task.completed;
            }
        });
        tasks = filteredTasks;
    }
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
