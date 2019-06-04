/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
let flag = false;
const formEmail = document.querySelector('.form__email');
const email = document.getElementById('email');
const formNickname = document.querySelector('.form__nickname');
const nickname = document.getElementById('nickname');
const career = document.getElementById('career');
const formCareer = document.querySelector('.form__career');
const access = document.getElementById('access');
const formAccess = document.getElementById('.form__access');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');
const formType = document.querySelector('.form__type');
const experience = document.getElementById('experience');
const formExperience = document.getElementById('form__experience');
const other = document.getElementById('other');

function errMessage(part, id, msg) {
  const formPart = document.querySelector(`.${part}`);
  if (document.querySelector(`#${id}__errMsg`) !== null) {
    formPart.removeChild(document.querySelector(`#${id}__errMsg`));
  }
  formPart.style.background = '#C72C41';
  const item = document.createElement('div');
  item.setAttribute('id', `${id}__errMsg`);
  item.setAttribute('style', 'color:#EEEEEE;');
  formPart.appendChild(item);
  item.innerText = `${msg}`;

  flag = false;
}

function clearErrMsg(part, id) {
  if (document.querySelector(`#${id}__errMsg`) !== null) {
    const formPart = document.querySelector(`.${part}`);
    formPart.style.background = 'white';
    formPart.removeChild(document.querySelector(`#${id}__errMsg`));
    flag = true;
  }
}

email.addEventListener('input', () => {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
  if (!emailRegex.test(email.value)) {
    errMessage('form__email', 'email', '電子郵件格式不符合，請確認');
  } else if (document.querySelector('#email__errMsg') !== null) {
    clearErrMsg('form__email', 'email');
  }
});

nickname.addEventListener('input', () => {
  if (nickname.value !== '' && document.querySelector('#nickname__errMsg') !== null) {
    clearErrMsg('form__nickname', 'nickname');
  }
});

formType.addEventListener('input', () => {
  if (type1.checked || type2.checked) {
    clearErrMsg('form__type', 'type');
  }
});

career.addEventListener('input', () => {
  if (career.value !== '' && document.querySelector('#career__errMsg') !== null) {
    clearErrMsg('form__career', 'career');
  }
});

access.addEventListener('input', () => {
  if (document.querySelector('#access__errMsg') !== null && access.value !== '') {
    clearErrMsg('form__access', 'access');
  }
});

experience.addEventListener('input', () => {
  if (experience.value !== '' && document.querySelector('#experience__errMsg') !== null) {
    clearErrMsg('form__experience', 'experience');
  }
});

function vaildateForm() {
  if (email.value === '') {
    errMessage('form__email', 'email', '電子郵件為必填');
    flag = false;
  }
  if (nickname.value === '') {
    errMessage('form__nickname', 'nickname', '暱稱為必塡');
    flag = false;
  }
  if (!type1.checked && !type2.checked) {
    errMessage('form__type', 'type', '請擇一勾選');
    flag = false;
  }
  if (career.value === '') {
    errMessage('form__career', 'career', '職稱為必填');
    flag = false;
  }
  if (access.value === '') {
    errMessage('form__access', 'access', '請填入獲取資訊管道');
    flag = false;
  }
  if (experience.value === '') {
    errMessage('form__experience', 'experience', '請填入過去是否有相關背景');
    flag = false;
  }
  if (flag === false) {
    return false;
  }
  if (flag === true) {
    console.log(email.value);
    console.log(nickname.value);
    console.log(`type1： ${type1.value}`);
    console.log(`type2： ${type2.value}`);
    console.log(career.value);
    console.log(experience.value);
    console.log(other.value);
    alert('驗證通過');
    return true;
  }
}
