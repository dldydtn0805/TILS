const images = ['0.jpg', '1.jpg', '2.jpg'];

const image = images[Math.floor(Math.random() * images.length)];

const IMAGE_URL = 'images/';

const bg = document.createElement('img');
bg.src = `${IMAGE_URL}${image}`;
bg.classList.add('bg');
// HTML의 body 부분에 bg(img 태그) 추가
document.body.appendChild(bg);
