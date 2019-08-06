/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
let tmpText = '';

// ajaxStart
const loading = $('#loading').hide();
$(document).ajaxStart(() => {
  loading.show();
}).ajaxStop(() => {
  loading.hide();
});

// 取消按鈕
function cancel(str) {
  const headerTime = $('.input-content').parent().prev().children();
  headerTime.eq(1).children().eq(0).css('display', 'none'); // send，送出
  headerTime.eq(1).children().eq(1).css('display', 'block'); // edit，編輯
  headerTime.eq(1).children().eq(2).css('display', 'block'); // delete，刪除
  headerTime.eq(1).children().eq(3).css('display', 'none'); // cancel，取消
  $('.input-content').replaceWith(str);
}

// 主留言
function publishMessage(nickname, messageId, time, content) {
  const message = `
    <div class='content'>
      <div class='message'>
        <div class='message-header'>
          <div class='message-header__info'>
            <div class='message-header__info-name'>${nickname}</div>
            <div class='message-header__info-like-btn like-btn' data-name='like' data-info-id='${messageId}'> like | 0 </div>
          </div>
          <div class='message-header__time'>
            <div class='message-header__time__button message-header__time__button-send button' data-name='send' data-info-id='${messageId}' >送出</div>
            <div class='message-header__time__button message-header__time__button-edit button' data-name='edit'>編輯</div>
            <div class='message-header__time__button message-header__time__button-delete button' data-name='delete' data-info-id='${messageId}' >刪除</div>
            <div class='message-header__time__button message-header__time__button-cancel button' data-name='cancel'>取消</div>
            <div>${time}</div>
          </div>
        </div>
        <p class='message-text'>${content}</p>
      </div>
      <div class='reply'>
        <textarea name='reply' ></textarea>
      <div class='button reply-button' data-name='reply' data-parent-id='${messageId}'>回覆</div>
      </div>
    </div>
    `;
  return message;
}

// 子留言
function replyComment(nickname, messageId, time, content, poster) {
  const comment = `
  <div class='comment'>
    <div class='comment-list level-0'>
      <div class='comment-list-header'>
        <div class='comment-list-header__info'>
          <div class='comment-list-header__info-name'>${nickname}</div>
          ${poster}
          <div class='comment-header__info-like-btn like-btn' data-name='like' data-info-id='${messageId}'> like | 0 </div>
        </div>
        <div class='comment-list-header__time'>
            <div class='comment-list-header__time__button comment-list-header__time__button-send button' data-name='send' data-info-id='${messageId}'>送出</div>
            <div class='comment-list-header__time__button comment-list-header__time__button-edit button' data-name='edit'>編輯</div>
            <div class='comment-list-header__time__button comment-list-header__time__button-delete button' data-name='delete' data-info-id='${messageId}'>刪除</div>
            <div class='comment-list-header__time__button comment-list-header__time__button-cancel button' data-name='cancel'>取消</div>
            <div class='comment-list-header__time-date'>${time}</div>
        </div>
      </div>
      <p class='comment-text'>${content}</p>
    </div>
  </div>
`;
  return comment;
}
// 原po
function originPoster() {
  const str = `
  <div class='comment-list-header__info-orignal-poster'>
    原po
  </div>
`;
  return str;
}

$(document).ready(() => {
  $('.container').click((e) => {
    const target = $(e.target);
    const name = target.attr('data-name');
    const id = target.attr('data-info-id');
    const parentId = target.attr('data-parent-id');
    let sendData = '';
    switch (name) {
      // 發送留言
      case 'publish': {
        const content = $('.publish-content');
        if (content.val() === '') {
          content.attr('placeholder', '不說些什麼嗎?');
          return;
        }
        sendData = `content=${content.val()}`;
        $.ajax({
          type: 'POST',
          url: './handling/handle_publish.php',
          data: sendData,
        }).done((response) => {
          $('.publish-content').val('');
          $('.publish-content').attr('placeholder', '請輸入');
          const msg = JSON.parse(response);
          $('.content-list').prepend(publishMessage(msg.nickname, msg.messageId, msg.time, msg.content));
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      }
      // 按讚 like
      case 'like':
        sendData = `id=${id}`; // msg_id
        $.ajax({
          type: 'POST',
          url: './handling/handle_like.php',
          data: sendData,
        }).done(() => {
          const count = parseInt(target.text().match(/\d+/)[0], 10) + 1;
          target.text(` like | ${count}`);
          target.removeClass('like-btn');
          target.addClass('like-btn-liked');
          target.attr('data-name', 'liked');
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      // 收回讚
      case 'liked':
        sendData = `id=${id}`;
        $.ajax({
          type: 'POST',
          url: './handling/handle_liked.php',
          data: sendData,
        }).done(() => {
          const count = parseInt(target.text().match(/\d+/)[0], 10) - 1;
          target.text(` like | ${count}`);
          target.removeClass('like-btn-liked');
          target.addClass('like-btn');
          target.attr('data-name', 'like');
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      // 留言編輯
      case 'edit': {
        const text = target.parent().parent().next().text();
        if ($('.container').find('.input-content').length) {
          cancel(tmpText);
        }
        tmpText = text;
        target.parent().parent().next().html(`<textarea class='input-content' type='text'>${text}</textarea>`);
        target.prev().css('display', 'block'); // send，送出
        target.css('display', 'none'); // edit，編輯
        target.next().css('display', 'none'); // delete，刪除
        target.next().next().css('display', 'block'); // cancel，取消
        break;
      }
      // 僅隱藏，不為真實刪除
      case 'delete': {
        sendData = `id=${id}`;
        $.ajax({
          type: 'POST',
          url: './handling/handle_delete.php',
          data: sendData,
        }).done(() => {
          const content = target.parent().parent().parent().parent();
          content.fadeOut(500, () => { content.remove(); });
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      }
      // 送出編輯內容
      case 'send': {
        const content = target.parent().parent().next().children();
        if (content.val() === '') {
          alert('內容不可空白');
          return;
        }
        if (content.val() === tmpText) {
          alert('內容無改變');
          cancel(tmpText);
          return;
        }
        sendData = `id=${id}&content=${content}`;
        $.ajax({
          type: 'POST',
          url: './handling/handle_send.php',
          data: sendData,
        }).done(() => {
          target.parent().parent().next().text(content);
          target.css('display', 'none'); // send，送出
          target.next().css('display', 'block'); // edit，編輯
          target.next().next().css('display', 'block'); // delete，刪除
          target.next().next().next().css('display', 'none'); // cancel，取消
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      }
      // 取消編輯
      case 'cancel': {
        cancel(tmpText);
        break;
      }
      // 子留言回覆
      case 'reply': {
        const content = target.prev();
        if (content.val() === '') {
          alert('回覆不可空白');
          return;
        }
        sendData = `id=${parentId}&content=${content.val()}`;
        $.ajax({
          type: 'POST',
          url: './handling/handle_publish.php',
          data: sendData,
        }).done((response) => {
          target.prev().val('');
          const msg = JSON.parse(response);
          if (msg.nickname === target.parent().parent().find('.message-header__info-name').text()) {
            target.parent().before(replyComment(msg.nickname, msg.messageId, msg.time, msg.content, originPoster()));
          } else {
            target.parent().before(replyComment(msg.nickname, msg.messageId, msg.time, msg.content, ''));
          }
        }).fail((response) => {
          const msg = JSON.parse(response);
          alert(`${msg.result}, ${msg.message}`);
        });
        break;
      }
      default:
        break;
    }
  });
});
