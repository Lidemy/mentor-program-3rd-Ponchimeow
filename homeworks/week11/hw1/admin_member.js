const request = new XMLHttpRequest();
const qs = document.querySelector.bind(document);

qs('.switch-authority').addEventListener('change', (e) => {
  const dataId = e.target.getAttribute('data-member-id');
  const dataName = e.target.getAttribute('data-name');
  request.open('POST', './handle_admin.php');
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(`name=${dataName}&memberId=${dataId}&authority=${e.target.value}`);
  window.location.reload();
});
