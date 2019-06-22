const qs = document.querySelector.bind(document);
const loginUserInput = qs('.login-group__username input');
const loginUserInputLabel = qs('.login-group__username .input__label');
const loginPwInput = qs('.login-group__password input');
const loginPwInputLabel = qs('.login-group__password .input__label');
const loginButton = qs('.login-group__button');

import { chkDirty, chkMemberInfo } from './index.js';

loginUserInput.addEventListener('input', () => {
  chkDirty(loginUserInput, loginUserInputLabel);
})

loginPwInput.addEventListener('input', () => {
  chkDirty(loginPwInput, loginPwInputLabel);
})

loginButton.addEventListener('click', (e) => {
  if (loginUserInput.value === '' || loginPwInput.value === '') {
    chkMemberInfo(e, '皆為必填欄位');
  }
})


