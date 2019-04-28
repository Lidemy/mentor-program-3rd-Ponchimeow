const arr = [1, 3, 10, 14, 39];
const n = 14;

// 使用二分搜尋法，對折再對折
function search(array, num) {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const mid = Math.round(start + (end - start) / 2);
    if (array[mid] === num) {
      return mid;
    }
    if (array[mid] > num) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}
console.time('time');
search(arr, n);
console.timeEnd('time');
