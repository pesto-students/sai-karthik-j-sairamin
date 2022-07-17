// BRUTE FORCE SOLUTION
// Time Complexity : O(n^3)
// Space Complexity : O(n)
// GIVES TLE on LeetCode for large inputs(Question No. 16 on Leetcode)

let array = [-1, 2, 1, -4];
let target = 1;
// I need to find the sum of 3 elements whose sum is closest to target

function closest3Sum(array, target) {
  let len = array.length;
  let minDiff = Number.MAX_VALUE; // placeholder
  let sumOfMinDiffNumbers = Number.MAX_VALUE; // placeholder
  for (let i = 0; i < len - 2; i++) {
    for (j = i + 1; j < len - 1; j++) {
      for (k = j + 1; k < len; k++) {
        let _3sum = array[i] + array[j] + array[k];
        let diff = Math.abs(target - _3sum);
        if (diff < minDiff) {
          minDiff = diff;
          sumOfMinDiffNumbers = _3sum;
        }
      }
    }
  }
  return sumOfMinDiffNumbers;
}
console.log(closest3Sum(array, target));

// Optimal Approach
// Time Complexity = O(n^2)
// Space Complexity = O(1);

function optimalClosest3Sum(arr, target) {
  arr.sort((a, b) => a - b); // sort the array

  let len = arr.length;
  let minDiff = Number.MAX_VALUE; // placeholder
  let sumOfMinDiffNumbers = Number.MAX_VALUE; // placeholder

  // Apply 2 pointer Approach

  // Must stop outer loop at len-3
  for (let i = 0; i < len - 2; i++) {
    let start = i + 1;
    let end = len - 1;
    while (start < end) {
      let sum = arr[i] + arr[start] + arr[end];
      let diff = Math.abs(target - sum);

      // I want "sum" of least "diff" numbers in the array compared to "target"

      if (diff < minDiff) {
        minDiff = diff;
        sumOfMinDiffNumbers = sum;
      }

      // Pointers moving logic is completely separated out for "clean code"
      if (sum < target) {
        start++;
      } else {
        end--;
      }
    }
  }
  return sumOfMinDiffNumbers;
}
