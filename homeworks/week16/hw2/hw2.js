function Stack() {
  const arr = [];
  this.push = function (str) {
    arr[arr.length] = str;
  };
  this.pop = function () {
    const res = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    return res;
  };
}

function Queue() {
  const arr = [];
  this.push = function (str) {
    arr[arr.length] = str;
  };
  this.pop = () => {
    const res = arr[0];
    arr.splice(0, 1);
    return res;
  };
}

// ----- test -----

const stack = new Stack();
stack.push(10);
stack.push(5);
stack.push(1);
console.log('----- Stack -----');
console.log(stack.pop()); // 1
console.log(stack.pop()); // 5


const queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(5);
console.log('----- Queue -----');
console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
