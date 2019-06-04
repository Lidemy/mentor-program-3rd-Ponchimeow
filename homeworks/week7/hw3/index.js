const keypad = document.querySelector('.keypad');
const result = document.querySelector('.result');
let operator = '';
let operation = false;
let num = 0;

keypad.addEventListener('click', (e) => {
  // 18再上去就破格子
  if (result.innerText.length > 17) {
    result.innerText = 'ERROR';
  } else if (result.innerText === 'ERROR') {
    if (e.target.classList.contains('num')) {
      result.innerHTML = `${e.target.getAttribute('data-value')}`;
      num = 0;
      operation = false;
    }
  } else if (e.target.classList.contains('num')) {
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
  } else if (e.target.classList.contains('operator')) {
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
        if (!operation) {
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
      case 'CE':
        result.innerHTML = '0';
        break;
      case '±':
        result.innerHTML = result.innerText * (-1);
        break;
      case '.':
        if (result.innerText === '0') {
          result.innerHTML = '0.';
        } else if (result.innerText.indexOf('.') > 0) {
          break;
        } else {
          result.innerHTML += '.';
        }
        break;
      case '%':
        result.innerHTML = result.innerText * 0.01;
        break;
      case '√':
        result.innerHTML = Math.sqrt(result.innerText);
        break;
      case 'ₓ²':
        result.innerHTML = result.innerText ** 2;
        break;
      case '⅟ₓ':
        result.innerHTML = 1 / result.innerHTML;
        break;
      default:
        break;
    }
  }
});
