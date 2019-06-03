const keypad = document.querySelector('.keypad');
const result = document.querySelector('.result');
let operator = '';
let operation = false;
let num = 0;

keypad.addEventListener('click', (e) => {
  if (e.target.classList.contains('num')) {
    if (result.innerText === '0') {
      result.innerText = '';
    }
    if (operator !== '') {
      if (!operation) {
        num = result.innerText;
        operation = true;
        result.innerHTML = '';
        result.innerHTML += e.target.getAttribute('data-value');
      } else {
        // 上一個按鍵為運算符號且為組成新數字時
        result.innerHTML += e.target.getAttribute('data-value');
      }
    } else {
      result.innerHTML += e.target.getAttribute('data-value');
    }
  }
  if (e.target.classList.contains('operator')) {
    switch (e.target.getAttribute('data-value')) {
      case '+':
        operator = '+';
        break;
      case '－':
        operator = '－';
        break;
      case '×':
        operator = '×';
        break;
      case '÷':
        operator = '÷';
        break;
      case '=':
        if (operation) {
          break;
        }
        if (operator === '+') {
          result.innerHTML = parseFloat(num) + parseFloat(result.innerText);
        }
        if (operator === '－') {
          result.innerHTML = parseFloat(num) - parseFloat(result.innerText);
        }
        if (operator === '×') {
          result.innerHTML = parseFloat(num) * parseFloat(result.innerText);
        }
        if (operator === '÷') {
          result.innerHTML = parseFloat(num) / parseFloat(result.innerText);
        }
        operation = false;
        operator = '';
        break;
      case '←':
        if (result.innerText === '0') {
          break;
        } else if (result.innerText.length === 1) {
          result.innerHTML = '0';
        } else {
          result.innerHTML = result.innerText.substring(0, result.innerText.length - 1);
        }
        break;
      case 'C':
        operator = '';
        num = 0;
        result.innerHTML = '0';
        break;
      default:
        break;
    }
  }
});
