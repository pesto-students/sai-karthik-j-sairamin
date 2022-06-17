let prices = [7, 1, 5, 3, 6, 4];

/**
 * BRUTE FORCE APPROACH
 * This Nested Loops Approach has TC = O(n^2)
 * Space Complexity = Constant O(1)
 */

function marketTimer(pricesArray) {
  let maxGain = -Infinity;
  let buyAndSellIndices = [];
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let currentProfit = prices[j] - prices[i];
      if (currentProfit > maxGain) {
        maxGain = Math.max(maxGain, currentProfit);
        buyAndSellIndices = [i, j];
      }
    }
  }
  return maxGain === -Infinity ? 0 : maxGain;
  //   console.log(maxGain);
  //   console.log(buyAndSellIndices);
}

console.log(marketTimer(prices));

// Optimal Approach
// Time Complexity = O(n)
// Space Complexity = O(1)
// Max gain is obtained by difference of maximum price and minimum price
// So, as I iterate...
// First...I will keep track of minPrice as I move along...
// Next.. I will try to calculate gain on every step...
// and keep track of maximum value of gain...

// Thus lowest price is captured in minPrice
// As I move forward, I will encounter maximum price.
// Thus I can get maximum gain with this approach.

// Even if minimum price updates, as I calculate profit on every step and
// keep track of it... I will eventually end up with maximum gain.

function stockTimerOptimal(pricesArr) {
  let minPrice = pricesArr[0]; // assume
  let maxGain = 0; // assume
  for (let i = 0; i < pricesArr.length; i++) {
    minPrice = Math.min(minPrice, pricesArr[i]);
    maxGain = Math.max(maxGain, pricesArr[i] - minPrice);
  }
  return maxGain;
}

console.log(stockTimerOptimal(prices));
