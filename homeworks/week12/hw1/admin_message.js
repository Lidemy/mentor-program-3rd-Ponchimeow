const request = new XMLHttpRequest();
const qs = document.querySelector.bind(document);
let tmpText = '';


// 按鈕顯示
function cancel(str) {
  // [4]hiddes status, [5]edit button, [6]send button ,[7]hide button ,[8]cancel button
  qs('.msg__input-content').parentNode.parentNode.children[5].style.display = 'table-cell';
  qs('.msg__input-content').parentNode.parentNode.children[6].style.display = 'none';
  qs('.msg__input-content').parentNode.parentNode.children[7].style.display = 'table-cell';
  qs('.msg__input-content').parentNode.parentNode.children[8].style.display = 'none';
  qs('.msg__input-content').outerHTML = str;
}

qs('.table').addEventListener('click', (e) => {
  const dataName = e.target.getAttribute('data-name');
  const dataMsgId = e.target.getAttribute('data-msg-id');
  const dataPart = e.target.getAttribute('data-part');
  let sendData = '';
  switch (dataName) {
    case 'edit': {
      const text = e.target.parentNode.children[2].innerHTML;
      // 判斷是否已有開啟編輯的欄位，若有則關閉已開啟的編輯欄位，並更換按鈕顯現
      if (qs('.msg__input-content') !== null) {
        cancel(tmpText);
      }
      tmpText = text;
      e.target.parentNode.children[2].innerHTML = `<textarea class='msg__input-content' type='text'>${e.target.parentNode.children[2].innerHTML}</textarea>`;
      e.target.style.display = 'none';
      e.target.parentNode.children[6].style.display = 'table-cell';
      e.target.parentNode.children[7].style.display = 'none';
      e.target.parentNode.children[8].style.display = 'table-cell';
      break;
    }
    case 'send': {
      const content = qs('.msg__input-content').value;
      sendData = `name=${dataName}&msgId=${dataMsgId}&part=${dataPart}&content=${content}`;
      break;
    }
    case 'hide': {
      const dataHidden = e.target.getAttribute('data-hidden');
      sendData = `name=${dataName}&msgId=${dataMsgId}&part=${dataPart}&hidden=${dataHidden}`;
      break;
    }
    case 'cancel':
      cancel(tmpText);
      break;
    case 'delete':
      if (window.confirm('確認要完全刪除?')) {
        sendData = `name=${dataName}&msgId=${dataMsgId}&part=${dataPart}`;
      }
      break;
    default:
      break;
  } if (sendData !== '') {
    request.open('POST', './handle_admin.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(sendData);
    window.location.reload();
  }
});
