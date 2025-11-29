const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

render();

function newTodo() {
  const text = prompt('Введіть нову справу:');
  
  if (text && text.trim() !== '') {
    const todo = {
      id: Date.now(),
      text: text,
      checked: false
    };

    todos.push(todo);
    console.log(todo);

    saveData();
    render();
  }
}

function renderTodo(todo) {
  const isChecked = todo.checked ? 'checked' : '';
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : '';
  
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="${todo.id}" 
        ${isChecked} 
        onchange="checkTodo(${todo.id})"
      />
      <label for="${todo.id}">
        <span class="${textClass}">${todo.text}</span>
      </label>
      <button 
        class="btn btn-danger btn-sm float-end" 
        onclick="deleteTodo(${todo.id})">delete
      </button>
    </li>
  `;
}

function render() {
  list.innerHTML = '';
  const htmlMarkup = todos.map(todo => renderTodo(todo)).join('');
  list.insertAdjacentHTML('beforeend', htmlMarkup);
  updateCounter();
}

function updateCounter() {
  itemCountSpan.innerText = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  uncheckedCountSpan.innerText = uncheckedCount;
}

function deleteTodo(id) {
  if (confirm('Видалити цю справу?')) {
    todos = todos.filter(todo => todo.id !== id);
    saveData();
    render();
  }
}

function checkTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    saveData();
    render();
  }
}

function saveData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}