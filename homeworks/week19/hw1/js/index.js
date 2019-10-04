const url = 'https://ponchimeow.com.tw/todolist/api.php';

function render() {
  $.ajax({
    type: 'GET',
    url,
  }).done((response) => {
    $('.list-group').empty();
    $('#input-todo').val('');
    const content = JSON.parse(response);
    $('.list-group').append(content.map((item) => {
      const ckeck = item.status ? 'checked="true"' : '';
      return `
      <li class="list-group-item">
      <label>
      <span class="item-content">${item.content}</span>
      <input class="checkbox" type="checkbox" ${ckeck} data-id="${item.id}">
      <span class="checkmark"></span>
      </label>
      <input type="text" class="item-input" value="${item.content}">
      <span class="btn btn-edit"></span>
      <span class="btn btn-save" data-id="${item.id}"></span>
      <span class="btn btn-delete" data-id="${item.id}"></span>
      <span class="btn btn-cancel"></span>
      </li>       
      `;
    }));
  });
}

function create(content) {
  $.ajax({
    type: 'POST',
    url,
    data: {
      content,
    },
  }).done(() => {
    render();
  }).fail((err) => {
    console.error(`failed to create: ${err}`);
  });
}

function del(id) {
  $.ajax({
    type: 'DELETE',
    url: `${url}?id=${id}`,
  }).done(() => {
    render();
  }).fail((err) => {
    alert('刪除失敗');
    console.error(`failed to delete: ${err}`);
  });
}

function edit(id, text) {
  $.ajax({
    type: 'PATCH',
    url: `${url}?id=${id}`,
    data: {
      case: 'edit',
      content: text,
    },
  }).done(() => {
    render();
  }).fail((err) => {
    alert('編輯失敗');
    console.error(`failed to edit: ${err}`);
  });
}

function status(id) {
  $.ajax({
    type: 'PATCH',
    url: `${url}?id=${id}`,
    data: {
      case: 'status',
    },
  }).done(() => {
  }).fail((err) => {
    alert('確認失敗');
    console.error(`failed to check: ${err}`);
  });
}

render();

$(document).ready(() => {
  $('.btn-add').click(() => {
    const content = $('#input-todo').val();
    if (content !== '') {
      create(content);
    } else {
      alert('請填入事項');
    }
  });

  $('.list-group').click((e) => {
    const id = $(e.target).attr('data-id');

    if ($(e.target).hasClass('checkbox')) {
      status(id);
    }

    if ($(e.target).hasClass('btn-edit')) {
      if ($(e.target).parent().find('.checkbox').prop('checked')) {
        alert('已完成事項無法編輯');
        return;
      }
      $(e.target).prev().prev().children()
        .eq(0)
        .hide(); // item-content,label value
      $(e.target).prev().show(); // input
      $(e.target).hide(); // edit
      $(e.target).nextAll().eq(0).show(); // save
      $(e.target).nextAll().eq(0).addClass('active');
      $(e.target).nextAll().eq(1).hide(); // delete
      $(e.target).nextAll().eq(2).show(); // cancel
      $(e.target).nextAll().eq(2).addClass('active');
    }

    if ($(e.target).hasClass('btn-delete')) {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-restricted-globals
      if (confirm('確認要刪除?')) {
        del(id);
      }
    }

    if ($(e.target).hasClass('btn-save')) {
      const content = $(e.target).parent().find('.item-input').val();
      edit(id, content);
    }

    if ($(e.target).hasClass('btn-cancel')) {
      render();
    }
  });
});
