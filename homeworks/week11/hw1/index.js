/* eslint-disable no-param-reassign */
const request = new XMLHttpRequest();
const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);
const msgSend = qsa('.message-header__time__button-send');
const msgEdit = qsa('.message-header__time__button-edit');
const msgDelete = qsa('.message-header__time__button-delete');
const msgCancel = qsa('.message-header__time__button-cancel');
const msgContent = qsa('.message-text');
const commentSend = qsa('.comment-list-header__time__button-send');
const commentEdit = qsa('.comment-list-header__time__button-edit');
const commentDelete = qsa('.comment-list-header__time__button-delete');
const commentCancel = qsa('.comment-list-header__time__button-cancel');
const commentContent = qsa('.comment-text');

// publish，發布留言事件
const btnPublish = qs('.publish-button');
if (btnPublish !== null) {
  btnPublish.addEventListener('click', (e) => {
    const content = qs('.publish-content').value;
    if (content === '') {
      content.innerText = '不說些什麼嗎?';
      e.stopPropagation();
    }
    request.open('POST', './handle_publish.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(`content=${content}`);
    window.location.reload();
  });
}


// 主留言、子留言按鍵事件添加，classContent: message-text、comment-text
function btnEvent(btnEdit, btnSend, btnDel, btnCancel, content, className) {
  const oldContent = content.innerText;
  const dataId = btnSend.getAttribute('data-id');
  const dataPart = btnSend.getAttribute('data-part');

  // 編輯，變更欄位為可編輯
  btnEdit.addEventListener('click', () => {
    btnEdit.parentNode.parentNode.parentNode.children[1].outerHTML = `<textarea class="${className}">${oldContent}</textarea>`;
    btnEdit.style.display = 'none';
    btnSend.style.display = 'block';
    btnDel.style.display = 'none';
    btnCancel.style.display = 'block';
  });

  // 取消，取消編輯動作
  btnCancel.addEventListener('click', () => {
    btnCancel.parentNode.parentNode.parentNode.children[1].outerHTML = `<p class="${className}">${oldContent}</p>`;
    btnEdit.style.display = 'block';
    btnSend.style.display = 'none';
    btnDel.style.display = 'block';
    btnCancel.style.display = 'none';
  });

  // 送出
  btnSend.addEventListener('click', () => {
    const newContent = btnSend.parentNode.parentNode.parentNode.children[1].value;
    if (newContent === oldContent) {
      alert('無改變');
    } else if (newContent === '') {
      alert('空值');
    } else {
      request.open('POST', './handle_edit.php', true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(`dataId=${dataId}&content=${newContent}&dataPart=${dataPart}`);
      window.location.reload();
    }
  });

  // 刪除
  btnDel.addEventListener('click', () => {
    if (window.confirm('確認刪除?')) {
      request.open('POST', './handle_delete.php', true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(`dataId=${dataId}&dataPart=${dataPart}`);
      window.location.reload();
    }
  });
}

if (msgEdit !== null || msgEdit !== null || msgDelete !== null) {
  for (let i = 0; i < msgEdit.length; i += 1) {
    btnEvent(msgEdit[i], msgSend[i], msgDelete[i], msgCancel[i], msgContent[i], 'message-text');
  }
}
if (commentEdit !== null || commentSend !== null || commentDelete !== null) {
  for (let i = 0; i < commentEdit.length; i += 1) {
    btnEvent(commentEdit[i], commentSend[i], commentDelete[i], commentCancel[i], commentContent[i], 'comment-text');
  }
}
