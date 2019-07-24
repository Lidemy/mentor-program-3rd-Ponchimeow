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
  const name = e.target.getAttribute('data-name');
  const id = e.target.getAttribute('data-info-id');
  const parentId = e.target.getAttribute('data-parent-id');
  let sendData = '';
  switch (name) {
    // 發送留言
    case 'publish': {
      const content = qs('.publish-content');
      if (content.value === '') {
        content.placeholder = '不說些什麼嗎?';
        stop = true;
      }
      sendData = `name=${name}&content=${content.value}`;
      break;
    }
    // 按讚 like
    case 'like':
      sendData = `name=${name}&id=${id}`;
      break;
    // 收回讚
    case 'liked':
      sendData = `name=${name}&id=${id}`;
      break;
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
      sendData = `name=${name}&id=${id}`;
      break;
    }
    // 送出編輯內容
    case 'send': {
      const content = e.target.parentNode.parentNode.nextSibling.children[0];
      if (content.value === '') {
        alert('內容不可空白');
        stop = true;
      } else if (content.value === tmpText) {
        alert('內容無改變');
        cancel(tmpText);
        stop = true;
      }
      sendData = `name=${name}&id=${id}&content=${content.value}`;
      break;
    }
    // 取消編輯
    case 'cancel': {
      cancel(tmpText);
      break;
    }
    // 子留言回覆
    case 'reply': {
      const content = e.target.previousSibling;
      if (content.value === '') {
        alert('回覆不可空白');
        stop = true;
      }
      sendData = `name=${name}&id=${parentId}&content=${content.value}`;
      console.log(sendData);
      break;
    }
    default:
      break;
  }
  if (!stop) {
    if (sendData !== '') {
      request.open('POST', './handling/handle_index.php', true); // false，同步，執行完動作後再更新畫面
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(sendData);
      window.location.reload();
    }
  } else {
    stop = false;
  }
});
