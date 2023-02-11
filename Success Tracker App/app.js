/*=============== Declearing variables ===========*/

const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".task-button");
const taskList = document.querySelector(".task-list");
// const filterOption = document.querySelector(".filter-task");



/*============== Adding event listeners ==========*/

document.addEventListener("DOMContentLoaded", getLocalTasks);
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("change", filterTask);



/*============= Functions ============= */

// if (taskInput.value === 0) {
//     alert("Please add a task")
// }

// Adding tasks
function addTask(event) {
    
    if (taskInput.value.length === 0) {
        alert("Please add a task")
    } else{
        event.preventDefault();
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const newTask = document.createElement("li");
        newTask.innerText = taskInput.value;
        newTask.classList.add("task-item");
        taskDiv.appendChild(newTask);

        // Adding local storage
        saveLocalTasks(taskInput.value);


        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-solid fa-circle-check"></li>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        taskDiv.appendChild(trashButton);

        taskList.appendChild(taskDiv);
        taskInput.value = "";
    }
    
}

function deleteCheck(e) {
    const item = e.target

    if (item.classList[0] === "trash-btn") {
        const task = item.parentElement;
        task.classList.add("slide");


        removeLocalTasks(task);
        task.addEventListener("transitionend", function () {
            task.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
}

// function filterTask(e) {
//     const tasks = taskList.childNodes;
//     tasks.forEach(function(task) {
//        switch (e.target.value) {
//             case "all":
//                 task.style.display = "flex";
//                 break;
//             case "completed":
//                 if (task.classList.contains("completed")) {
//                     task.style.display = "flex";
//                 } else {
//                     task.style.display = "none";
//                 }
//                 break;
//             case "incomplete":
//                 if (!task.classList.contains("completed")) {
//                     task.style.display = "flex";
//                 } else {
//                     task.style.display = "none";
//                 }
//                 break;
//        } 
//     });
// }

function saveLocalTasks(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("todos"));
    }
    tasks.forEach(function (task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add('task');
        const newTask = document.createElement("li");
        newTask.innerText = task;
        newTask.classList.add("task-item");
        taskDiv.appendChild(newTask);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-duotone fa-circle-check"></li>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fa-duotone fa-trash"></li>';
        trashButton.classList.add("trash-btn")
        taskDiv.appendChild(trashButton);

        taskList.appendChild(taskDiv);
    });
}

function removeLocalTasks(task) {
    let tasks;
    
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    const taskIndex = task.children[0].innerText;
    tasks.splice[tasks.indexOf(taskIndex), 1];
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// voice  command


const speaker = document.querySelector(".speaker");
const micOn = document.querySelector(".mic-on")


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// recognition.onstart = function () {
//     console.log('voice is activate, you can speak to microphones');
// };

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    taskInput.value = transcript;
    micOn.classList.remove('mic-is-on')
    // readOutLoud(transcript);
}

speaker.addEventListener('click', () => {
    micOn.classList.toggle('mic-is-on')
    recognition.start();
});

// function readOutLoud(message) {
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = message;
//     speech.volume = 2;
//     speech.rate = 1;
//     speech.pitch = 2;

//     window.speechSynthesis.speak(speech);
// }
