// login-form id값을 가지는 div 가져오기
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
// 로그인 후 인삿말 h1 가져오기
const greeting = document.querySelector('#greeting');
// hiddlen 클래스
const HIDDEN_CLASSNAME = 'hidden';
// username 키
const USERNAME_KEY = 'username';

// 주어진 userName을 greeting에 작성해주는 함수
function paintGreetings(userName) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello, ${userName}`;
}

// localStorage에 저장된 username
const userName = localStorage.getItem(USERNAME_KEY);
if (userName === null) {
  // username이 없을 경우, LoginForm 보여주기
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  // username이 있을 경우, greeting 보여주기
  paintGreetings(userName);
}

// 로그인 버튼(form 내부의 submit형 input) 클릭 시 새로고침
// 우리는 새로고침이 아닌, 유저 정보가 저장되기를 원함
// 모든 EventListener의 첫 번째 인자는 막 벌어진 일(event)에 대한 정보
function onLoginSubmit(event) {
  // event의 기본 행동을 막기
  // 브라우저가 기본적으로 수행하도록(ex. form을 submit할 경우 새로고침) 하는 걸 막는 것
  event.preventDefault();

  // loginForm을 화면에서 사라지게 하는 classname 추가
  loginForm.classList.add(HIDDEN_CLASSNAME);

  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

loginForm.addEventListener('submit', onLoginSubmit);
