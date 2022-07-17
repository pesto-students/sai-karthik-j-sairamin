// Time Complexity O(n^3) Approach
// Space Complexity O(1)

// Create all sub arrays
// Sum each subarray.
// Find the max among the sub array sums
{
  //   let A = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  let arr = [1, 2, 3, 4];
  function maxSubArraySum(array) {
    let len = array.length;
    let maxSum = -Infinity; // placeholder
    for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
        let sum = 0;
        // Sub Array's index is from i to j
        for (let k = i; k <= j; k++) {
          sum += array[k];
          // sum all elements in sub array
        }
        maxSum = Math.max(sum, maxSum); // tracking maximum sum
      }
    }
    return maxSum;
  }

  const result = maxSubArraySum(arr);
  console.log(result);
}

// Kadane's Algorithm (Time Complexity = O(n) & Space Complexity = O(1))
// currentSum represent's a sub-array's sum.
// If currentSum is -ve, then taking next element into current sub array,
// will reduce the sum of a subarray starting from next element.
// That will reduce the maximum sum of the sub array. So don't do it.
// If currentSum < 0, start freshly from current element for currentSum.
{
  //   let A = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  let A = [1, 2, -9, 3, 4];

  function optimizedMaxSubArraySum(arr) {
    let len = A.length;
    let runningSum = A[0];
    let maxSum = A[0];
    // Start loop from index 1
    for (let i = 1; i < len; i++) {
      if (runningSum < 0) {
        runningSum = A[i];
        // start summing freshly from i'th index
        // because sum till (i-1) (that is.. runningSum) is negative
      } else {
        runningSum = runningSum + A[i];
      }
      // maximum of all "runningSum"s is the max sub-array sum
      maxSum = Math.max(maxSum, runningSum);
    }

    return maxSum;
  }

  const result = optimizedMaxSubArraySum(A);
  console.log(result);
}
