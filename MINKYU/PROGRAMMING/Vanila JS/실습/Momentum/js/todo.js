const toDoForm = document.querySelector('#todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('#todo-list');
const TODOS_KEY = 'todos';

let toDos = localStorage.getItem(TODOS_KEY)
  ? JSON.parse(localStorage.getItem(TODOS_KEY))
  : [];
console.log(toDos);
if (toDos.length > 0) {
  toDos.forEach((item) => {
    addToDo(item);
  });
}

//
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
// 새로운 todo 작성 후 엔터
function handleToDoSubmit(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  toDoInput.value = '';
  const toDoObj = {
    text: toDo,
    id: Date.now(),
  };
  addToDo(toDoObj);
  toDos.push(toDoObj);
  saveToDos();
}

function handleRemoveToDo(event) {
  event.preventDefault();
  // 이벤트가 발생한 타깃의 부모 요소 태그
  const li = event.target.parentElement;
  // 해당 li 태그 삭제
  li.remove();
  toDos = toDos.filter((item) => item.id !== parseInt(li.id));
  saveToDos();
}
// ㅇ
function addToDo(toDoObj) {
  const li = document.createElement('li');
  li.id = toDoObj.id;
  const span = document.createElement('span');

  span.innerText = toDoObj.text;
  li.appendChild(span);

  const button = document.createElement('button');
  button.innerText = 'X';
  button.addEventListener('click', handleRemoveToDo);
  li.appendChild(button);

  toDoList.appendChild(li);
}

toDoForm.addEventListener('submit', handleToDoSubmit);
