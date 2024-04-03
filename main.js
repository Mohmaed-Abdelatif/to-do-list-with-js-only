let myinput = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let myobject;
let idCounter = parseInt(window.localStorage.getItem("idCounter")) || 0;

function addTask() {
  if (myinput.value == "") {
    alert("10 Write A Task");
  } else {
    let task = myinput.value;

    let mytaskdiv = document.createElement("div");
    let mytask = document.createElement("div");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");
    let donebtn = document.createElement("button");
    let btnsContainer = document.createElement("div");

    mytaskdiv.className = "mytaskdiv card p-2 mb-2";
    mytask.className = "mytask card-body";
    editbtn.className = "editbtn btn btn-primary btn-sm me-1 flex-grow-1";
    deletebtn.className = "deletebtn btn btn-danger btn-sm flex-grow-1";
    donebtn.className = "donebtn btn btn-success btn-sm flex-grow-1";
    btnsContainer.className = "d-flex justify-content-between";

    mytask.innerText = task;
    editbtn.innerText = "Edit";
    deletebtn.innerText = "Delete";
    donebtn.innerText = "Done";

    editbtn.onclick = function () {
      let newText = prompt("Enter the updated task:", mytask.innerText);
      if (newText !== null) {
        mytask.innerText = newText;
        let storedTasks =
          JSON.parse(window.localStorage.getItem("tasks")) || [];
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
      let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
      storedTasks = storedTasks.filter((item) => item.id !== myobject.id);
      window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    donebtn.onclick = function () {
      mytask.classList.toggle("completed");
      // Update completion status in localStorage
      let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
      storedTasks.forEach((item) => {
        if (item.id === myobject.id) {
          item.completed = !item.completed; 
        }
      });
      window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    btnsContainer.appendChild(editbtn);
    btnsContainer.appendChild(deletebtn);
    btnsContainer.appendChild(donebtn);
    mytaskdiv.appendChild(btnsContainer);
    mytaskdiv.appendChild(mytask);

    const myobject = {
      id: idCounter++,
      title: task,
      completed: false, 
    };

    let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    storedTasks.push(myobject);
    window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    window.localStorage.setItem("idCounter", idCounter.toString());

    tasks.appendChild(mytaskdiv);
    myinput.value = "";
  }
}

btn.onclick = addTask;

myinput.addEventListener("keyup", function (event) {
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
    let donebtn = document.createElement("button");
    let btnsContainer = document.createElement("div");

    mytaskdiv.className = "mytaskdiv card p-2 mb-2";
    mytask.className = "mytask card-body";
    editbtn.className = "editbtn btn btn-primary btn-sm me-1 flex-grow-1";
    deletebtn.className = "deletebtn btn btn-danger btn-sm flex-grow-1";
    donebtn.className = "donebtn btn btn-success btn-sm flex-grow-1";
    btnsContainer.className = "d-flex justify-content-between";

    mytask.innerText = task.title;
    if (task.completed) {
      mytask.classList.add("completed");
    }
    editbtn.innerText = "Edit";
    deletebtn.innerText = "Delete";
    donebtn.innerText = "Done";

    editbtn.onclick = function () {
      let newText = prompt("Enter the updated task:", mytask.innerText);
      if (newText !== "null") {
        mytask.innerText = newText;
        let storedTasks =
          JSON.parse(window.localStorage.getItem("tasks")) || [];
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

    donebtn.onclick = function () {
      mytask.classList.toggle("completed");
      let storedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
      storedTasks.forEach((item) => {
        if (item.id === task.id) {
          item.completed = !item.completed; 
        }
      });
      window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    btnsContainer.appendChild(editbtn);
    btnsContainer.appendChild(deletebtn);
    btnsContainer.appendChild(donebtn);
    mytaskdiv.appendChild(btnsContainer);
    mytaskdiv.appendChild(mytask);

    tasks.appendChild(mytaskdiv);
  }
});
