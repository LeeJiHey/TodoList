const taskForm = document.querySelector(".js-TaskForm"),
  taskInupt = taskForm.querySelector("input"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pending = [];
let finished = [];

function deleteTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ulClassName = li.parentNode.className;
  if (ulClassName === "js-pending") {
    pendingList.removeChild(li);
    pending = cleanCotnet(pending, li);
  } else {
    finishedList.removeChild(li);
    finished = cleanCotnet(finished, li);
  }
  saveTask();
}

function getContent(checkTask, checkTask_li) {
  const content = checkTask.filter(function (toDo) {
    //console.log(toDo.id, li.id); //왼쪽이 숫자 / 오른쪽이 stirng
    return toDo.id === parseInt(checkTask_li.id, 10);
  });
  return content[0];
}

function cleanCotnet(checkTask, checkTask_li) {
  const content = checkTask.filter(function (toDo) {
    return toDo.id !== parseInt(checkTask_li.id, 10);
  });
  return content;
}

function moveTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ulClassName = li.parentNode.className;

  if (ulClassName === "js-pending") {
    finishedList.appendChild(li);
    btn.innerText = "⏪";
    const cotent = getContent(pending, li);
    pending = cleanCotnet(pending, li);
    finished.push(cotent);
  } else {
    pendingList.appendChild(li);
    btn.innerText = "✅";
    const cotent = getContent(finished, li);
    finished = cleanCotnet(finished, li);
    pending.push(cotent);
  }
  saveTask();
}

function addTask(text, flag = 1) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");

  const newId = pending.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTask);

  if (flag === 1) {
    checkBtn.innerText = "✅";
  } else {
    checkBtn.innerText = "⏪";
  }
  checkBtn.addEventListener("click", moveTask);
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;

  const pendingObj = {
    text: text,
    id: newId
  };

  if (flag === 1) {
    pendingList.appendChild(li);
    pending.push(pendingObj);
  } else {
    finishedList.appendChild(li);
    finished.push(pendingObj);
  }
  saveTask();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInupt.value;
  addTask(currentValue);
  taskInupt.value = "";
}

function saveTask() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
  //console.log(pending, finished);
}

function loadTask() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinshed = localStorage.getItem(FINISHED_LS);
  if (loadedPending != null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      addTask(pending.text);
    });
  }
  if (loadedFinshed != null) {
    const parsedFinished = JSON.parse(loadedFinshed);
    parsedFinished.forEach(function (finished) {
      addTask(finished.text, 2);
    });
  }
}

function init() {
  loadTask();
  taskForm.addEventListener("submit", handleSubmit);
}

init();