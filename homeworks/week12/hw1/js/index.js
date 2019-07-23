/* eslint-disable no-param-reassign */
const request = new XMLHttpRequest();
const qs = document.querySelector.bind(document);
let tmpText = '';
let stop = false;

function cancel(str) {
  const headerTime = qs('.input-content').parentNode.previousSibling.children[1];
  headerTime.children[0].style.display = 'none'; // send，送出
  headerTime.children[1].style.display = 'block'; // edit，編輯
  headerTime.children[2].style.display = 'block'; // delete，刪除
  headerTime.children[3].style.display = 'none'; // cancel，取消
  qs('.input-content').outerHTML = str;
}

qs('.container').addEventListener('click', (e) => {
  const dataName = e.target.getAttribute('data-name');
  const dataPart = e.target.getAttribute('data-part');
  const dataId = e.target.getAttribute('data-info-id');
  let sendData = '';
  switch (dataName) {
    // 發送留言
    case 'publish': {
      const content = qs('.publish-content');
      if (content.value === '') {
        content.placeholder = '不說些什麼嗎?';
        stop = true;
      }
      sendData = `name=${dataName}&part=${dataPart}&content=${content.value}`;
      break;
    }
    // 留言編輯
    case 'edit': {
      const text = e.target.parentNode.parentNode.nextSibling.innerText;
      if (qs('.input_content') !== null) {
        cancel(tmpText);
      }
      tmpText = text;
      e.target.parentNode.parentNode.nextSibling.innerHTML = `<textarea class='input-content' type='text'>${text}</textarea>`;
      e.target.previousSibling.style.display = 'block'; // send，送出
      e.target.style.display = 'none'; // edit，編輯
      e.target.nextSibling.style.display = 'none'; // delete，刪除
      e.target.nextSibling.nextSibling.style.display = 'block'; // cancel，取消
      break;
    }
    // 僅隱藏，不為真實刪除
    case 'delete': {
      sendData = `name=${dataName}&part=${dataPart}&id=${dataId}`;
      break;
    }
    // 送出編輯內容
    case 'send': {
      const content = e.target.parentNode.parentNode.nextSibling.children[0].value;
      if (content === '') {
        alert('內容不可空白');
        stop = true;
      } else if (content === tmpText) {
        alert('內容無改變');
        cancel(tmpText);
        stop = true;
      }
      sendData = `name=${dataName}&part=${dataPart}&id=${dataId}&content=${content}`;
      break;
    }
    // 取消編輯
    case 'cancel': {
      cancel(tmpText);
      break;
    }
    // 子留言回覆
    case 'reply': {
      const content = e.target.previousSibling.value;
      if (content === '') {
        alert('回覆不可空白');
        stop = true;
      }
      sendData = `name=${dataName}&part=${dataPart}&id=${dataId}&content=${content}`;
      break;
    }
    default:
      break;
  }
  if (!stop) {
    if (sendData !== '') {
      request.open('POST', './controller/handle_index.php', true); // false，同步，執行完動作後再更新畫面
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(sendData);
      window.location.reload();
    }
  } else {
    stop = false;
  }
});
