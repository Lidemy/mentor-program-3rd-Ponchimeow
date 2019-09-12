let list = [];
let itemId = 0;

function render() {
  $('.list-group').empty();
  $('.list-group').append(list.map((item) => {
    let classCheck = '';
    if (item.check) {
      classCheck = 'checked';
    }
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center ${classCheck}"  data-id="${item.id}">
    <div class="list-item ${classCheck} ">${item.content}</div>
    <div class="btn btn-delete">X</div>
    </li>       
    `;
  }));
}

function addTodo(todo) {
  const clear = '';
  $('#input-todo').val(clear);
  itemId += 1;
  list.push({ id: itemId, content: todo, check: false });
  render();
}

function removeTodo(id) {
  list = list.filter(item => item.id !== Number(id));
  render();
}

function renderCheck(id) {
  list.forEach(((item) => {
    if (item.id === Number(id)) {
      // eslint-disable-next-line no-param-reassign
      item.check = !item.check;
    }
  }));
  render();
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
      removeTodo($(e.target).parent().attr('data-id'));
    } else if ($(e.target).hasClass('list-group-item')) {
      renderCheck($(e.target).attr('data-id'));
    }
  });
});
