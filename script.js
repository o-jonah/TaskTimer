const addTaskButton = document.getElementById('add-task');
const taskNameInput = document.getElementById("task-name");
const taskList = document.getElementById('task-list');

//store tasks in aaray

let tasks = [];

//Task add function

function addTask() {
  const taskName = taskNameInput.value.trim();
  if (taskName) {
    const task = {
      id: Date.now(),
      name: taskName,
      time: 0,
      intervalid: null,
    };
    
    tasks.push(task);
    renderTasks();
    taskNameInput.value = '';

  }
}

// render task to the DOM `

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    li.innerHTML = `
    <span class="task-name">${task.name}</span>
    <span class="timer">${formatTime(task.time)}</span>
    <div className="task-actions">
      <button class="start-btn">Start</button>
      <button class="stop-btn" disabled >Stop</button>
      <button class="delete-btn">Delete</button>
    </div>
    `;
    taskList.appendChild(li);
  })
}

//start timer

function startTimer(id) {
  const task = tasks.find((task) => task.id === id);
  if (task && !task.intervalId){
task.intervalId = setInterval(() => {
  task.time += 1;
  renderTasks();
}, 1000);

  }

}

//stop Timer


function stopTimer(id) {
  const task =tasks.find((task) => task.id === id);
  if (task && task.intervalId) {
    clearInterval(task.intervalId);
    task.intervalId = null;
  }

  }    


  //delete task

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  }

  //function to format time in HH:MM:SS

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  addTaskButton.addEventListener('click', addTask);

  //Event Delegation

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-btn')) {
      const taskId = parseInt(e.target.closest('.task-item').dataset.id,10);
      startTimer(taskId);
      e.target.disabled = true;
      e.target.nextElementSibling.disabled = false;
    } else if (e.target.classList.contains('stop-btn')) {
      const taskId = parseInt(e.target.closest('.task-item').dataset.id, 10);
      stopTimer(taskId);
      e.target.disabled = true;
      e.target.previousElementSibling.disabled = false;
    } else if (e.target.classList.contains('delete-btn')) {
      const taskId = parseInt(e.target.closest('.task-item').dataset.id, 10)
      deleteTask(taskId);
    }
  })