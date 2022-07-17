let array = [0, 2, 1, 2, 0];

// Two Pass Approach
// Count number of 0s, 1s and 2s (in first pass)
// Fill the original array with those many 0s, 1s & 2s (in 2nd pass)
// This approach will have Time Complexity = O(2n) = O(n)
// Space Complexity = O(1) as this becomes inplace sort.

// Another (optimal) approach is...
// Dutch National Flag Algorithm (One Pass Algorithm)
// This has Time Complexity = O(n) and Space Complexity = O(1)
// Take 3 pointers (lo & mid) at first index and (hi) at last index
// while (mid <= hi)
// if array[mid] is 0, swap mid and lo and increment mid & lo
// if array[mid] is 1, just increment mid. No swap needed.
// if array[mid] is 2, swap mid and hi and decrement hi

function onePassSorter(array) {
  let n = array.length;
  let lo = 0;
  let mid = 0;
  let hi = n - 1;
  while (mid <= hi) {
    if (array[mid] === 0) {
      array[mid] = array[lo];
      array[lo] = 0;
      lo++;
      mid++;
    } else if (array[mid] === 1) {
      mid++;
    } else {
      array[mid] = array[hi];
      array[hi] = 2;
      hi--;
    }
  }
  return array;
}

console.log(onePassSorter(array));

// Practice
// function dutchAlgoSorter(array) {
//   let lo = 0;
//   let mid = 0;
//   let hi = array.length - 1;
//   while (mid <= hi) {
//     if (array[mid] === 0) {
//       // swap lo and mid
//       array[mid] = array[lo];
//       array[lo] = 0;
//       lo++;
//       mid++;
//     } else if (array[mid] === 1) {
//       // no swaps needed
//       mid++;
//     } else {
//       // swap mid and hi
//       array[mid] = array[hi];
//       array[hi] = 2;
//       hi--;
//     }
//   }
//   return array;
// }

// console.log(dutchAlgoSorter(array));
