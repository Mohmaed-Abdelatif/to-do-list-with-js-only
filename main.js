let myinput = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let i = 0;
let myobject; 

// Function to add a task
function addTask() {
    let task = myinput.value;

    let mytaskdiv = document.createElement("div");
    let mytask = document.createElement("div");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    mytaskdiv.className = "mytaskdiv card p-2 mb-2";
    mytask.className = "mytask card-body";
    editbtn.className = "editbtn btn btn-primary btn-sm me-1";
    deletebtn.className = "deletebtn btn btn-danger btn-sm";

    mytask.innerText = task;
    editbtn.innerText = "Edit";
    deletebtn.innerText = "Delete";
    
    editbtn.onclick = function () {
        let newText = prompt("Enter the updated task:", mytask.innerText);
        if (newText !== null) {
            mytask.innerText = newText;
            // Update task text in localStorage
            let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
            storedTasks.forEach((item) => {
                if (item.id === myobject.id) {
                    item.title = newText;
                }
            });
            window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }
    };

    deletebtn.onclick = function () {
        tasks.removeChild(mytaskdiv);
        // Remove the task data from local storage when deleted
        let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
        storedTasks = storedTasks.filter((item) => item.id !== myobject.id);
        window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    mytaskdiv.appendChild(editbtn);
    mytaskdiv.appendChild(deletebtn);
    mytaskdiv.appendChild(mytask);

    const myobject = {
        id: i++,
        title: task,
    };

    let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    storedTasks.push(myobject);
    window.localStorage.setItem("tasks", JSON.stringify(storedTasks));

    tasks.appendChild(mytaskdiv);
    myinput.value = "";
}

btn.onclick = addTask;

myinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { 
        addTask();
    }
});

window.addEventListener("load", function () {
    let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    for (const task of storedTasks) {
        let mytaskdiv = document.createElement("div");
        let mytask = document.createElement("div");
        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");

        mytaskdiv.className = "mytaskdiv card p-2 mb-2";
        mytask.className = "mytask card-body";
        editbtn.className = "editbtn btn btn-primary btn-sm me-1";
        deletebtn.className = "deletebtn btn btn-danger btn-sm";

        mytask.innerText = task.title;
        editbtn.innerText = "Edit";
        deletebtn.innerText = "Delete";
        
        editbtn.onclick = function () {
            let newText = prompt("Enter the updated task:", mytask.innerText);
            if (newText !== 'null') {
                mytask.innerText = newText;
                // Update task text in localStorage
                let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
                storedTasks.forEach((item) => {
                    if (item.id === task.id) {
                        item.title = newText;
                    }
                });
                window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
            }
        };

        deletebtn.onclick = function () {
            tasks.removeChild(mytaskdiv);
            let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
            storedTasks = storedTasks.filter((item) => item.id !== task.id);
            window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
        };

        mytaskdiv.appendChild(editbtn);
        mytaskdiv.appendChild(deletebtn);
        mytaskdiv.appendChild(mytask);

        tasks.appendChild(mytaskdiv);
    }
});
