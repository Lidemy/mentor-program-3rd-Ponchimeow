const qs = document.querySelector.bind(document);
function chkDirty(input, label) {
  if (input.value != '' && !label.classList.contains('is-dirty')) {
    label.classList.add('is-dirty');
  } else if (input.value == '' && label.classList.contains('is-dirty')) {
    label.classList.remove('is-dirty');
  }
}

function chkMemberInfo(e, msg) {
    const memberInfo = qs('.member-info');
    memberInfo.innerText = "";
    memberInfo.innerText = msg;
    e.preventDefault();
}

export {
  chkDirty,
  chkMemberInfo
}