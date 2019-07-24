/* eslint-disable import/extensions */
import { chkDirty, chkMemberInfo } from './render_login_register.js';

const qs = document.querySelector.bind(document);
const regNicknameInput = qs('.register-group__nickname input');
const regNicknameInputLabel = qs('.register-group__nickname .input__label');
const regUsernameInput = qs('.register-group__username input');
const regUsernameInputLabel = qs('.register-group__username .input__label');
const regPwInput = qs('.register-group__password input');
const regPwInputLabel = qs('.register-group__password .input__label');
const regSecPwInput = qs('.register-group__second-password input');
const regSecPwInputLabel = qs('.register-group__second-password .input__label');
const regButton = qs('.register-group__button');
let flag = false;

function chkLength(input, word) {
  const memberInfo = qs('.member-info');
  if (word.length > 16) {
    memberInfo.innerText = `${input}不可超過16字元`;
    flag = false;
  } else if (regPwInput.value.length <= 16 && regUsernameInput.value.length <= 16) {
    memberInfo.innerText = '';
    flag = true;
  }
}

regNicknameInput.addEventListener('input', () => {
  chkDirty(regNicknameInput, regNicknameInputLabel);
});

regUsernameInput.addEventListener('input', () => {
  chkDirty(regUsernameInput, regUsernameInputLabel);
  chkLength('帳號', regUsernameInput.value);
});

regPwInput.addEventListener('input', () => {
  chkDirty(regPwInput, regPwInputLabel);
  chkLength('密碼', regPwInput.value);
});

regSecPwInput.addEventListener('input', () => {
  chkDirty(regSecPwInput, regSecPwInputLabel);
});

regButton.addEventListener('click', (e) => {
  if (regNicknameInput.value === '' || regUsernameInput.value === '' || regPwInput.value === '' || regSecPwInput.value === '') {
    chkMemberInfo(e, '皆為必填欄位');
    e.preventDefault();
  }
  if (!flag) {
    e.preventDefault();
  }
});
