function addTodoHTML(value) {
  return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="list-item">${value}</div>
  <div class="btn btn-delete">X</div>
  </li>       
  `;
}

function addTodo(value) {
  const item = addTodoHTML(value);
  $('#input-todo').val('');
  $('.list-group').append(item);
}

$(document).ready(() => {
  $('#btn-addTodo').click(() => {
    if ($('#input-todo').val() !== '') {
      addTodo($('#input-todo').val());
    } else {
      alert('請填入事項');
    }
  });

  $('.list-group').click((e) => {
    if ($(e.target).hasClass('btn-delete')) {
      $(e.target).parent().remove();
    } else if ($(e.target).hasClass('list-group-item')) {
      if ($(e.target).hasClass('checked')) {
        $(e.target).removeClass('checked');
        $(e.target).children().first().removeClass('checked');
      } else {
        $(e.target).addClass('checked');
        $(e.target).children().first().addClass('checked');
      }
    }
  });
});
