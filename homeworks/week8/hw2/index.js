const request = new XMLHttpRequest();
const url = 'https://lidemy-book-store.herokuapp.com/';
const postMsg = document.querySelector('.btn-add-msg');
const inputPost = document.querySelector('.input__post-text');
const outPosts = document.querySelector('.output__posts');

function renderMsg() {
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      outPosts.innerHTML = '';
      const response = request.responseText;
      const json = JSON.parse(response);
      json.forEach((items) => {
        const div = document.createElement('div');
        div.classList.add('output__post');
        div.innerHTML = `
        <div class="output__post__id">ID: ${items.id}</div>
        <div class="output__post__content">Content: ${items.content}</div>
        `;
        outPosts.appendChild(div);
      });
    } else {
      console.log('err');
    }
  };
  request.open('GET', `${url}posts?_limit=20&_sort=id&_order=desc`, true);
  request.send();
  inputPost.innerHTML = '';
}

renderMsg();

postMsg.addEventListener('click', (e) => {
  e.preventDefault();
  const content = inputPost.innerHTML;
  const data = `content=${content}`;
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      alert('新增留言成功');
    } else {
      alert('新增留言失敗');
    }
  };
  request.open('POST', `${url}posts`, false);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(data);
  renderMsg();
});
