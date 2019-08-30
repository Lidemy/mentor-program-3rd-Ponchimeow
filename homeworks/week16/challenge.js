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
  this.arr = arr;
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
  this.arr = arr;
}

// ----- test -----

const deque = new Deque();
deque.push(10);
deque.push(5);
console.log('----- Deque -----');
console.log(deque.arr); // [ 10, 5]
console.log(deque.pop()); // 5
deque.unshift(1);
console.log(deque.arr); // [ 1, 10]
console.log(deque.shift()); // 1

const pq = new PriorityQueue();
pq.push('a', 2);
pq.push('b', 5);
pq.push('c', 1);
console.log('----- PriorityQueue -----');
console.log(pq.arr);
// [ { element: 'a', priority: 2 },
// { element: 'b', priority: 5 },
// { element: 'c', priority: 1 } ]
console.log(pq.pop()); // [ { element: 'b', priority: 5 } ]
console.log(pq.arr);
// [ { element: 'c', priority: 1 },
// { element: 'a', priority: 2 } ]
