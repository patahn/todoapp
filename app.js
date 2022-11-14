const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("ul");

let toDos = [];

function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

function renderToDo(text) {
  const toDo = document.createElement("li");
  toDo.id = toDos.length + 1;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", handleDelete);
  deleteBtn.className = ".toDo__button";
  const span = document.createElement("span");
  span.innerText = `${text} `;
  toDo.appendChild(deleteBtn);
  toDo.prepend(span);
  list.prepend(toDo);
  list.prepend(document.createElement("br"));
  saveToDo(text);

  if(li.innerText.length >= screen.width){
    list.appendChild(document.createElement("br"));
  }
}

function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  renderToDo(value);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      renderToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();