function Deque() {
  const arr = [];
  this.push = function (end) {
    arr[arr.length] = end;
  };
  this.pop = () => {
    const res = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    return res;
  };
  this.shift = () => {
    const res = arr[0];
    arr.splice(0, 1);
    return res;
  };
  this.unshift = function (front) {
    arr.splice(0, 0, front);
  };
}

// 預設最大優先
function PriorityQueue() {
  const arr = [];
  this.push = function (element, priority) {
    const obj = { element, priority };
    arr[arr.length] = obj;
  };
  this.pop = () => {
    arr.sort((a, b) => (a.priority - b.priority));
    return arr.splice(arr.length - 1, 1);
  };
}

// ----- test -----

const deque = new Deque();
deque.push(10);
deque.push(5);
console.log('----- Deque -----');
console.log(deque.pop()); // 5
deque.unshift(1);
console.log(deque.shift()); // 1

const pq = new PriorityQueue();
pq.push('a', 2);
pq.push('b', 5);
pq.push('c', 1);
console.log('----- PriorityQueue -----');
console.log(pq.pop()); // [ { element: 'b', priority: 5 } ]
