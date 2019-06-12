const request = new XMLHttpRequest();
const award = document.querySelector('.award');
const title = document.querySelector('.title');
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';


function changInfo(str, img, num) {
  title.innerText = str;
  award.innerHTML = img;
  if (num === 'none') {
    title.style.color = 'white';
    title.style.margin = '40% 0 0 0';
    document.body.style.background = 'black';
  } else {
    title.style.color = 'black';
    title.style.margin = '0';
    document.body.style.background = 'white';
  }
}

function first() {
  changInfo('恭喜你中頭獎了！日本東京來回雙人遊！', '<img src="img/JapanAirlines.jpg">', 'first');
}
function second() {
  changInfo('二獎！90 吋電視一台！', '<img src="img/tv.jpg">', 'second');
}
function third() {
  changInfo('恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', '<img src="img/AI-youtube.jpg">', 'third');
}
function none() {
  changInfo('銘謝惠顧', '', 'none');
}

function gotcha() {
  request.onload = function getNum() {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      const json = JSON.parse(response);
      const res = json.prize;
      switch (res) {
        case 'FIRST':
          first();
          break;
        case 'SECOND':
          second();
          break;
        case 'THIRD':
          third();
          break;
        case 'NONE':
          none();
          break;
        default:
          console.log('something is outof expected');
          break;
      }
    } else {
      alert('系統不穩定，請再試一次');
    }
  };
  request.onerror = function err() {
    alert('系統不穩定，請再試一次');
  };
  request.open('GET', url, true);
  request.send();
}

document.querySelector('button').addEventListener('click', () => {
  gotcha();
});
