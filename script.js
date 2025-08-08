// 変数宣言&初期化
let todos = []; // タスクを管理する配列
let currentFilter = "all"; // 現在のフィルター状態
let editingId = null; // 編集中のタスクID

// HTML要素
let todoInput, addBtn, todoList, filterBtns, clearCompletedBtn, clearAllBtn;
let totalTasksEl, completedTasksEl, activeTasksEl;

// HTMLの解析が終了したときに実行される処理
document.addEventListener("DOMContentLoaded", () => {
  // HTML要素を取得して、変数に保存する
  todoInput = document.getElementById("todoInput");
  addBtn = document.getElementById("addBtn");
  todoList = document.getElementById("todoList");
  filterBtns = document.querySelectorAll(".filter-btn");
  clearCompletedBtn = document.getElementById("clearCompleted");
  clearAllBtn = document.getElementById("clearAll");
  totalTasksEl = document.getElementById("totalTasks");
  completedTasksEl = document.getElementById("completedTasks");
  activeTasksEl = document.getElementById("activeTasks");

  // 各イベントのリスナーを設定
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  // localStorageからタスクデータを読み込んで描画
  todos = loadTodos();
  renderTodos();

  // 統計情報の更新
  updateStats();
});

// タスク追加
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
  updateStats();
  todoInput.value = "";
}

// タスク完了切替
function renderTodos() {
  todoList.innerHTML = todos
    .map(
      (todo) => `
        <div class="todo-item ${
          todo.completed ? "completed" : ""
        }" data-todo-id="${todo.id}">
            <input type="checkbox"
                   class="todo-checkbox"
                   ${todo.completed ? "checked" : ""}
                   onchange="toggleTodo(${todo.id})">

            <span class="todo-text">${todo.text}</span>

            <div class="todo-actions">
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// LocalStorageへの保存
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// LocalStorageからの読み込み
function loadTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

// タスク完了切替
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
    updateStats();
  }
}

// タスク削除
function deleteTodo(id) {
  if (confirm("このタスクを削除しますか？")) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
    updateStats();
  }
}

// 統計更新
function updateStats() {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  activeTasksEl.textContent = active;
}
