// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = loadTasks;

// Add task button click
addBtn.addEventListener("click", addTask);

// Add task when pressing Enter
TaskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task");

  const task = {
    text: taskText,
    completed: false
  };

  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = "";
}

// Add task to UI
function addTaskToDOM(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
    <div>
      <button class="delete">X</button>
    </div>
  `;

  // Toggle complete
  li.querySelector(".task-text").addEventListener("click", function () {
    this.classList.toggle("completed");
    updateLocalStorage();
  });

  // Delete task
  li.querySelector(".delete").addEventListener("click", function () {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage when tasks change
function updateLocalStorage() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.querySelector(".task-text").classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks into the DOM
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}
