// if (window.localStorage.getItem("tasks") == null) {
//   window.localStorage.setItem("tasks", JSON.stringify([]));
// }


$(document).ready(function () {
  $(".bottom-nav .btns button").click(function () {
    for (i = 0; i < document.querySelectorAll(".bottom-nav .btns button").length; i++) {
      document.querySelectorAll(".bottom-nav .btns button")[i].classList.remove("active-type")
    }
    this.classList.add("active-type");
  });

  $(".clear").click(function () {
    $(".completed").remove()
    countItemsLeft()
  })

  $(".all-btn").click(function () {
    $(".task").show()
  });

  $(".active-btn").click(function () {
    $(".task").show();
    $(".completed").hide();
  });

  $(".completed-btn").click(function () {
    $(".task").hide();
    $(".completed").show();
  })

  $(".add").click(function () {
    if (document.querySelector(".type input").value != "") {
      let circle = document.createElement("div");
      circle.classList.add("circle");
      let checkMark = document.createElement("i");
      checkMark.classList.add("fas", "fa-check");
      circle.appendChild(checkMark);
      let taskText = document.createElement("p");
      taskText.appendChild(document.createTextNode(document.querySelector(".type input").value));
      let delBtn = document.createElement("div");
      delBtn.classList.add("del");
      let xMark = document.createElement("i");
      xMark.classList.add("fas", "fa-times");
      delBtn.appendChild(xMark);
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.appendChild(circle);
      taskDiv.appendChild(taskText);
      taskDiv.appendChild(delBtn);
      taskDiv.dataset.id = Date.now();
      delBtn.onclick = function () {
        this.parentElement.remove();
        tasksObject.filter(function (ele) {
          if (ele.id == this.parentElement.dataset.id) {
            ele.pop()
          }
        });
        countItemsLeft()
      };
      document.querySelector(".tasks").prepend(taskDiv);
      countItemsLeft()
      circle.onclick = function () {
        this.classList.toggle("checked");
        this.parentElement.classList.toggle("completed");
        if (taskDiv.classList.contains("completed")) {
          activity =  true;
        } else {
          activity = false;
        };
        console.log(this.dataset.id)
        countItemsLeft()
      };
      if (typeof window.localStorage.getItem("tasks") != "string") {
        tasksObject = []
      } else {
        tasksObject = JSON.parse(window.localStorage.getItem("tasks"))
      };
      activity = false;
      tasksObject.push({
        id: taskDiv.dataset.id,
        text: document.querySelector(".type input").value,
        active: activity,
      });
      window.localStorage.setItem("tasks", JSON.stringify(tasksObject))
      document.querySelector(".type input").value = "";
    }
  });
})


for (i = 0; i < JSON.parse(window.localStorage.getItem("tasks")).length; i++) {
  let circle = document.createElement("div");
  circle.classList.add("circle");
  let checkMark = document.createElement("i");
  checkMark.classList.add("fas", "fa-check");
  circle.appendChild(checkMark);
  let taskText = document.createElement("p");
  taskText.appendChild(document.createTextNode(JSON.parse(window.localStorage.getItem("tasks"))[i].text));
  let delBtn = document.createElement("div");
  delBtn.classList.add("del");
  let xMark = document.createElement("i");
  xMark.classList.add("fas", "fa-times");
  delBtn.appendChild(xMark);
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.appendChild(circle);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(delBtn);
  taskDiv.dataset.id = JSON.parse(window.localStorage.getItem("tasks"))[i].id;
  delBtn.onclick = function (e) {
    taskDelThisCopy = e.target.parentElement;
    taskDelThis = taskDelThisCopy.parentElement;
    for (i = 0; i < JSON.parse(window.localStorage.getItem("tasks")).length; i++) {
      arr = JSON.parse(window.localStorage.getItem("tasks"));
      if (taskDelThis.dataset.id == arr[i].id) {
        arrCopy = arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
        window.localStorage.setItem("tasks", JSON.stringify(arrCopy));
      }
    }
    this.parentElement.remove();
    countItemsLeft()
  };
  document.querySelector(".tasks").prepend(taskDiv);
  countItemsLeft()
  circle.onclick = function (e) {
    this.classList.toggle("checked");
    this.parentElement.classList.toggle("completed");
    taskThisCopy = e.target.parentElement;
    taskThis = taskThisCopy.parentElement;
    if (taskDiv.classList.contains("completed")) {
      taskThis.setAttribute("data-activity", true);
    } else {
      taskThis.setAttribute("data-activity", false);
    };
    for (i = 0; i < JSON.parse(window.localStorage.getItem("tasks")).length; i++) {
      arr = JSON.parse(window.localStorage.getItem("tasks"));
      if (taskThis.dataset.id == arr[i].id) {
        arr[i].active = taskThis.dataset.activity;
        window.localStorage.setItem("tasks", JSON.stringify(arr));
      }
    }
    countItemsLeft()
  };
  if (JSON.parse(window.localStorage.getItem("tasks"))[i].active == "true") {
    circle.classList.add("checked");
    taskDiv.classList.add("completed");
    countItemsLeft()
  } else if (JSON.parse(window.localStorage.getItem("tasks"))[i].active == "false") {
    circle.classList.remove("checked");
    taskDiv.classList.remove("completed");
    countItemsLeft()
  }
  document.querySelector(".type input").value = "";
}

// $(".clear").click(function () {
//   $(".completed").remove()
//   countItemsLeft()
// })


document.querySelector(".clear").onclick = function () {
  completedList = document.querySelectorAll(".completed");
  for (i = 0; i < completedList.length; i++) {
    arr = JSON.parse(window.localStorage.getItem("tasks"));
    for (j = 0; j < arr.length; j++ ) {
      if (completedList[i].dataset.id == arr[j].id) {
        arrCopy = arr.slice(0, j).concat(arr.slice(j + 1, arr.length))
        window.localStorage.setItem("tasks", JSON.stringify(arrCopy));
      }
    }
  }
}

// Functions

function checkItems() {
  if (document.querySelectorAll(".task").length == 0) {
    document.querySelector(".empty").style.display = "block";
  } else {
    document.querySelector(".empty").style.display = "none";
  }
}

function countItemsLeft() {
  items = document.querySelectorAll(".task").length;
  itemsCompleted = document.querySelectorAll(".completed").length;
  itemsLeft = items - itemsCompleted;
  document.querySelector(".items span").textContent = itemsLeft;
  checkItems()
}

countItemsLeft()

// Variables 

// document.documentElement.style.setProperty()

document.querySelector(".theme img:first-child").onclick = function () {
  window.localStorage.setItem("theme", "light");
  document.documentElement.style.setProperty("--body-color", "hsl(236, 33%, 92%)")
  document.documentElement.style.setProperty("--list-color", "#fff")
  document.documentElement.style.setProperty("--input-font-color", "#000")
  document.documentElement.style.setProperty("--font-color", "hsl(235, 19%, 35%)")
  document.documentElement.style.setProperty("--btns-font-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--cheched-font-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--add-border-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--circle-border-color", "hsl(236, 9%, 61%)")
  document.querySelector(".theme img:last-child").style.display = "block";
  document.querySelector(".back .desk-light").style.display = "block";
  document.querySelector(".back-mob .mob-light").style.display = "block";
  document.querySelector(".theme img:first-child").style.display = "none";
  document.querySelector(".back .desk-dark").style.display = "none";
  document.querySelector(".back-mob .mob-dark").style.display = "none";
}

document.querySelector(".theme img:last-child").onclick = function () {
  window.localStorage.setItem("theme", "dark");
  document.documentElement.style.setProperty("--body-color", "hsl(235, 21%, 11%)")
  document.documentElement.style.setProperty("--list-color", "hsl(235, 24%, 19%)")
  document.documentElement.style.setProperty("--input-font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--btns-font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--cheched-font-color", "hsl(233, 14%, 35%)")
  document.documentElement.style.setProperty("--add-border-color", "hsl(237, 14%, 26%)")
  document.documentElement.style.setProperty("--circle-border-color", "hsl(237, 14%, 26%)")
  document.querySelector(".theme img:first-child").style.display = "block";
  document.querySelector(".back .desk-dark").style.display = "block";
  document.querySelector(".back-mob .mob-dark").style.display = "block";
  document.querySelector(".theme img:last-child").style.display = "none";
  document.querySelector(".back .desk-light").style.display = "none";
  document.querySelector(".back-mob .mob-light").style.display = "none";
}

if (window.localStorage.getItem("theme") == "light") {
  window.localStorage.setItem("theme", "light");
  document.documentElement.style.setProperty("--body-color", "hsl(236, 33%, 92%)")
  document.documentElement.style.setProperty("--list-color", "#fff")
  document.documentElement.style.setProperty("--input-font-color", "#000")
  document.documentElement.style.setProperty("--font-color", "hsl(235, 19%, 35%)")
  document.documentElement.style.setProperty("--btns-font-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--cheched-font-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--add-border-color", "hsl(236, 9%, 61%)")
  document.documentElement.style.setProperty("--circle-border-color", "hsl(236, 9%, 61%)")
  document.querySelector(".theme img:last-child").style.display = "block";
  document.querySelector(".back .desk-light").style.display = "block";
  document.querySelector(".back-mob .mob-light").style.display = "block";
  document.querySelector(".theme img:first-child").style.display = "none";
  document.querySelector(".back .desk-dark").style.display = "none";
  document.querySelector(".back-mob .mob-dark").style.display = "none";
} else {  
  window.localStorage.setItem("theme", "dark");
  document.documentElement.style.setProperty("--body-color", "hsl(235, 21%, 11%)")
  document.documentElement.style.setProperty("--list-color", "hsl(235, 24%, 19%)")
  document.documentElement.style.setProperty("--input-font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--btns-font-color", "hsl(234, 39%, 85%)")
  document.documentElement.style.setProperty("--cheched-font-color", "hsl(233, 14%, 35%)")
  document.documentElement.style.setProperty("--add-border-color", "hsl(237, 14%, 26%)")
  document.documentElement.style.setProperty("--circle-border-color", "hsl(237, 14%, 26%)")
  document.querySelector(".theme img:first-child").style.display = "block";
  document.querySelector(".back .desk-dark").style.display = "block";
  document.querySelector(".back-mob .mob-dark").style.display = "block";
  document.querySelector(".theme img:last-child").style.display = "none";
  document.querySelector(".back .desk-light").style.display = "none";
  document.querySelector(".back-mob .mob-light").style.display = "none";
}
