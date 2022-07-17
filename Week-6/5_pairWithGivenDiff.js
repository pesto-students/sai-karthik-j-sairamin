let A = [5, 10, 3, 2, 50, 80];
let B = 78;
// let A = [-10, 20],
// let B = 30;

// BRUTE FORCE - NESTED LOOPS APPROACH
// TC - O(n^2)
// SC - O(1)

function pairWithDiff(arr, diff) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len; j++) {
      if (Math.abs(arr[i] - arr[j]) === diff) {
        // console.log(`found`, arr[i], arr[j]);
        return 1;
      }
    }
  }
  //   console.log("not found");
  return 0;
}

// console.log(pairWithDiff(A, B));

/** nlogn TC Method - Two Pointer Approach
 * Space Complexity is O(1)
 */

function nlongn_PairDiff(arr, diff) {
  arr.sort((a, b) => a - b); // ascending sort

  console.log(arr);
  // sort the array
  // Apply 2 pointer method

  let i = 0;
  let j = arr.length - 1;
  while (i <= j) {
    if (Math.abs(arr[i] - arr[j]) === diff) {
      return 1; // found pair
    }
    i++;
    j--;
  }
  return 0; // not found
}

// console.log(nlongn_PairDiff(A, B));

/** HASH MAP/SET APPROACH */
// This has best TC = O(n)
// Space Complexity is O(n)

function pairDiffWithSet(arr, diff) {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (!set.has(Math.abs(diff - arr[i]))) {
      set.add(arr[i]);
    } else {
      return 1; // found!
    }
  }
  return 0; // not found
}

console.log(pairDiffWithSet(A, B));
