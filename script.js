let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

const add = () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;

  if (title.trim() !== "") {
    todos.push({
      title: title,
      description: desc,
      status: false,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  render();
};

const remove = (index) => {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
};

function toggleStatus(index) {
  todos[index].status = !todos[index].status;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  render();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.status);

  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const completed = todos.filter((todo) => todo.status).length;
  const counter = document.getElementById("taskCounter");

  counter.textContent = `${todos.length} tasks · ${completed} completed`;

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.status);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.status);
  }
  if (filteredTodos.length === 0) {
    list.innerHTML = `
        <div class="empty">
            <div>✨</div>
            <strong>No tasks here</strong>
            <p>Add a task and stay organized.</p>
        </div>
    `;
    return;
  }
  filteredTodos.forEach((todo) => {
    const i = todos.indexOf(todo);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const del = document.createElement("button");
    const div = document.createElement("div");

    span.textContent = todo.title;
    p.textContent = todo.description;
    del.textContent = "x";

    del.onclick = () => remove(i);
    span.onclick = () => toggleStatus(i);

    if (todo.status) span.classList.add("done");

    div.appendChild(span);
    div.appendChild(p);

    li.appendChild(div);
    li.appendChild(del);

    list.appendChild(li);
  });
}
render();
