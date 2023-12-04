let myinput = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let i = 0;
let myobject; // Define myobject at a higher scope

// if(){

// }
btn.onclick = function () {
    let task = myinput.value;

    let mytaskdiv = document.createElement("div");
    let mytask = document.createElement("div");
    let deletebtn = document.createElement("button");

    mytaskdiv.className = "mytaskdiv";
    mytask.className = "mytask";
    deletebtn.className = "deletebtn";

    mytask.innerText = task;
    deletebtn.innerText = "delete";
    deletebtn.onclick = function x() {
        tasks.removeChild(mytaskdiv); //delete the task from the visible task lest
        // Remove the task data from local storage when deleted
        let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
        storedTasks = storedTasks.filter((item) => item.id !== myobject.id); //find task that has id deleted
        window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    mytaskdiv.appendChild(mytask);
    mytaskdiv.appendChild(deletebtn);

    const myobject = {
        id: i++,
        title: task,
    };

    // Store the task data in local storage
    //not overide,if impity put[]
    let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || []; 
    storedTasks.push(myobject); //add a new takd for tasks object in local storge
    window.localStorage.setItem("tasks", JSON.stringify(storedTasks)); //stored task to update local storge

    tasks.appendChild(mytaskdiv);
    myinput.value = "";
};

// Load tasks from local storage on page load
window.addEventListener("load", function () {
    let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    for (const task of storedTasks) {
        let mytaskdiv = document.createElement("div");
        let mytask = document.createElement("div");
        let deletebtn = document.createElement("button");

        mytaskdiv.className = "mytaskdiv";
        mytask.className = "mytask";
        deletebtn.className = "deletebtn";

        mytask.innerText = task.title;
        deletebtn.innerText = "delete";
        deletebtn.onclick = function () {
            tasks.removeChild(mytaskdiv);
            // Remove the task data from local storage when deleted
            let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
            storedTasks = storedTasks.filter((item) => item.id !== task.id); // Use task.id
            window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
        };

        mytaskdiv.appendChild(mytask);
        mytaskdiv.appendChild(deletebtn);

        tasks.appendChild(mytaskdiv);
    }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// let myinput = document.querySelector(".input");
// let btn = document.querySelector(".add");
// let tasks = document.querySelector(".tasks");
// let i = 0;

// function createTaskElement(task, id) {
//     let taskDiv = document.createElement("div");
//     let taskTitle = document.createElement("div");
//     let deleteButton = document.createElement("button");

//     taskDiv.className = "mytaskdiv";
//     taskTitle.className = "mytask";
//     deleteButton.className = "deletebtn";

//     taskTitle.innerText = task;
//     deleteButton.innerText = "delete";

//     deleteButton.onclick = function () {
//         deleteTask(id);
//     };

//     taskDiv.appendChild(taskTitle);
//     taskDiv.appendChild(deleteButton);

//     return taskDiv;
// }

// function deleteTask(id) {
//     let storedTasks = getStoredTasks();
//     let updatedTasks = storedTasks.filter((item) => item.id !== id);
//     updateStoredTasks(updatedTasks);
//     updateTaskList();
// }

// function getStoredTasks() {
//     return JSON.parse(window.localStorage.getItem("tasks")) || [];
// }

// function updateStoredTasks(tasks) {
//     window.localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function updateTaskList() {
//     let storedTasks = getStoredTasks();
//     tasks.innerHTML = ""; // Clear the existing task list

//     for (const task of storedTasks) {
//         let taskDiv = createTaskElement(task.title, task.id);
//         tasks.appendChild(taskDiv);
//     }
// }

// btn.onclick = function () {
//     let task = myinput.value;

//     if (task.trim() === "") {
//         alert("Please enter a task.");
//         return;
//     }

//     const myobject = {
//         id: i++,
//         title: task,
//     };

//     let storedTasks = getStoredTasks();
//     storedTasks.push(myobject);
//     updateStoredTasks(storedTasks);
//     updateTaskList();

//     myinput.value = "";
// };

// // Load tasks from local storage on page load
// window.addEventListener("load", function () {
//     updateTaskList();
// });
