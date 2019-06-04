const element = document.querySelector('.view');
const button = document.querySelector('button');

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  if (r > 240 && g > 240 && b > 240) {
    randomColor();
  }
  return `rgb(${r},${g},${b})`;
}

function clickWrong() {
  alert('還沒變色唷！');
  button.style.display = 'block';
  element.removeEventListener('click', clickWrong);
}

function calTime() {
  const start = Date.now();
  function clickEvent() {
    const end = Date.now();
    const reactionTime = (end - start);
    alert(`反應時間：${reactionTime}毫秒 ${reactionTime / 1000} sec`);
    button.style.display = 'block';
    element.removeEventListener('click', clickEvent);
  }
  element.addEventListener('click', clickWrong);
  if (button.style.display === 'block') {
    return;
  }
  element.style.background = randomColor();
  console.log('removeclickWrong');
  element.removeEventListener('click', clickWrong);
  element.addEventListener('click', clickEvent);
}
button.onclick = function () {
  this.style.display = 'none';
  element.style.background = 'white';
  setTimeout(calTime, Math.random() * 2000 + 2000);
};

button.style.display = 'none';
element.addEventListener('click', clickWrong);
setTimeout(calTime, Math.random() * 2000 + 2000);
