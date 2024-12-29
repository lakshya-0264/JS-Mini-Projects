// script.js
// Only do task when the complete WebPage is Loaded - DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const resetButton = document.getElementById("reset");

    resetButton.addEventListener("click",(e)=>{
        todoList.innerHTML = "";
        todoInput.value = "";
        tasks=[];
        localStorage.clear();
    });

    // Task taken from localStorage on Refreshing (Refraining from the Reset whenever user refresh the page)
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim(); // To remove extra spaces at end, We are using trim();
        if (taskText === ""){
            alert("Please enter some task to proceed");
            return;
        }

        const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = ""; //clear input after adding task
        console.log(tasks);
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
        <span>${task.text}</span>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
        `;


        // Whenever we click on the text, it will toggle
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                return;
            }
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector("#edit").addEventListener("click", (e) => {
            todoInput.value=task.text;
            todoInput.focus();
            li.remove();
            saveTasks();
        });

        // Whenever we click on the delete Button
        li.querySelector("#delete").addEventListener("click", (e) => {
            e.stopPropagation(); //prevent toggle from firing
            tasks = tasks.filter((t) => t.id === task.id);
            li.remove();
            saveTasks();
            alert(`
                Warning: You are about to delete a task.

                if(Want to delete) {
                    "Click OK";
                else
                    "Refresh Page";
                }`)
        });

        todoList.appendChild(li);
    }
});