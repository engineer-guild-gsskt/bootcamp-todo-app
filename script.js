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
  todoInput.value = "";
}

// タスク完了切替
function renderTodos() {
  todoList.innerHTML = todos
    .map(
      (todo) => `
        <div class="todo-item">
            <span class="todo-text">${todo.text}</span>
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
