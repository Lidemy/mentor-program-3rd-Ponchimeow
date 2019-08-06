const qs = document.querySelector.bind(document);

// 判斷 login, register 頁面 input 欄位已有輸入值
function chkDirty(input, label) {
  if (input.value !== '' && !label.classList.contains('is-dirty')) {
    label.classList.add('is-dirty');
  } else if (input.value === '' && label.classList.contains('is-dirty')) {
    label.classList.remove('is-dirty');
  }
}

// 顯示 login, register 處理資訊
function chkMemberInfo(e, msg) {
  const memberInfo = qs('.member-info');
  memberInfo.innerText = '';
  memberInfo.innerText = msg;
  e.preventDefault();
}

export {
  chkDirty,
  chkMemberInfo,
};
