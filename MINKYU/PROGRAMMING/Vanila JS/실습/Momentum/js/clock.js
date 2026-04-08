const clock = document.querySelector('#clock');

function getClock() {
  const date = new Date();
  // 2자리로 만들고, 빈 칸 앞에는 0을 채워넣음
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  clock.innerText = `${hour}:${minute}:${second}`;
  // console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}
// 한 번 실행 후, 1초마다 계속 실행
getClock();
setInterval(getClock, 1000);
