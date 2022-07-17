const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

let result = hasDuplicate([1, 5, -1, 4]); // false
console.log(result);

function hasDupes(arr) {
  const set = new Set(arr);
  if (set.size === arr.length) {
    return false;
  }
  return true;
}

result = hasDupes([1, 2, 3, 4, 5, 6]); // false
console.log(result);

result = hasDupes([1, 1, 3, 1, 2, 3]); // true
console.log(result);
