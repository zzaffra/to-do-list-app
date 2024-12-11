
// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const addTaskBtn = document.getElementById('addTaskBtn');
const taskPopup = document.getElementById('taskPopup');
const closePopup = document.getElementById('closePopup');
const taskForm = document.getElementById('taskForm');
const cancelButton = document.getElementById("cancelButton");
const popup = document.getElementById("taskPopup");
let editingIndex = -1;

// Open the popup when the "Add Task" button is clicked
addTaskBtn.addEventListener('click', () => {
  taskPopup.style.display = 'flex';
});

// Close the popup when the "X" button is clicked
closePopup.addEventListener('click', () => {
  taskPopup.style.display = 'none';
});

cancelButton.addEventListener("click", function() {
    popup.style.display = "none"; // Hide the popup
  });

  // When the user clicks the close button (x), close the popup
  closePopup.addEventListener("click", function() {
    popup.style.display = "none"; // Hide the popup
  });

  // Optional: Close the popup if the user clicks outside of the popup content
  window.addEventListener("click", function(event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

// Handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
  
    // Create a new task object
    const task = {
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      completed: false // Initial state of the task
    };
  
    if (editingIndex >= 0) {
      // Update the existing task
      todo[editingIndex] = task;
      editingIndex = -1; // Reset editingIndex
      document.querySelector('.button-submit').textContent = 'Add Task'; // Reset button text
    } else {
      // Add the new task
      todo.push(task);
    }
  
    // Save tasks to localStorage
    localStorage.setItem('todo', JSON.stringify(todo));
  
    // Update the task list display
    displayTasks();
  
    // Close the popup
    taskPopup.style.display = 'none';
  
    // Reset the form
    taskForm.reset();
  });
  

// Delete all tasks
deleteButton.addEventListener('click', () => {
  todo = [];
  localStorage.setItem('todo', JSON.stringify(todo)); // Clear from localStorage
  displayTasks();
});

// Function to display tasks
function displayTasks() {
  todoList.innerHTML = ''; // Clear the current list
  todo.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
    <input type="checkbox" id="checkbox-${index}" ${task.completed ? 'checked' : ''} />
    <div class="task-content">
      <h3>${task.name}</h3>
      <p>Description: ${task.description}</p>
      <p>Due: ${task.dueDate}</p>
    </div>
    <button class="edit-button" onclick="editTask(${index})">Edit</button>
  `;

    // Add checkbox event listener to mark task as completed
    const checkbox = li.querySelector(`#checkbox-${index}`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      localStorage.setItem('todo', JSON.stringify(todo));
    });

    todoList.appendChild(li);
  });

  // Update the task count
  todoCount.textContent = todo.length;
}

function editTask(index) {
    const task = todo[index];
  
    // Set the form values to the current task
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskDueDate').value = task.dueDate;
  
    // Open the popup
    taskPopup.style.display = 'flex';
  
    // Set the editing index
    editingIndex = index;
  
    // Change the button text to "Update Task" for editing
    document.querySelector('.button-submit').textContent = 'Update Task';
  }

// Initialize: Display tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
});
