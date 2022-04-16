/** Normal Sum Function 
 * 
 * It will perform calculation every single time
*/

function add(...args) {
    let sum = 0;
    args.forEach((num) => sum += num);
    return sum;
}

/** Memoized Sum Function */

function memoize(add) {
    const cache = new Map();
    return function (...args) {
        const key = args.join("-");
        // if already present return that
        if (cache.has(key)) {
            console.log("used cache");
            return cache.get(key)
        }
        // if not present, call the function to calculate sum
        // and then save sum for the new key in cache
        console.log("calculated this");
        cache.set(key, add(...args));
        return cache.get(key);
    }
}

const memoizeAdd = memoize(add);

console.log(memoizeAdd(2, 3, 4)); // calculated
console.log(memoizeAdd(2, 3, 4)); // used cache
console.log(memoizeAdd(100, 100)); // calculated 
console.log(memoizeAdd(100));  // calculated
console.log(memoizeAdd(100, 200)) // calculated
console.log(memoizeAdd(100, 100)) // used cache