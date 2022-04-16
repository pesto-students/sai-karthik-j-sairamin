function createIncrement() {
    let count = 0;
    function increment() {
        count++;
    }

    let message = `Count is ${count}`;

    function log() {
        console.log(message);
    }

    return [increment, log];
    // two inner functions 'increment' and 'log'
    // are being returned by the createIncrement() function
    // by putting both of them in an array.

    // So, finally an array of functions is returned.
}

// fn1 === increment (returned from createIncrement()) 
// fn2 === log (returned from createIncrement())
const [fn1, fn2] = createIncrement();
// Instead of using different names like fn1 and fn2, 
// for returned functions, By using below...
// I am assigning the same name.

// Study this ES6 Array Destructring Assignment Syntax
const [a1, a2] = [12, 24];
console.log(a1); // 12
console.log(a2); // 24

// createIncrement() returns an array of two functions
// those are simply saved in increment and log.
const [increment, log] = createIncrement();

// Note that function definitions are saved inside 
// increment and log and.. there is NO connection left
// with the original context. 
// Hence.. 

// "this" in below increment() functions points to window/global objects
// this.count is undefined.
// So they try to incremnet 'count' variable that is 'undefined'
// and present on window/global object
increment();
increment();
increment();

// The log method when returned has a ***hardcoded*** string "message"
// with text "Count is 0"
// That is printed. 
// The log method's message is hardcoded because of its placement in code.
// Even if count is incremented with using bind/call/apply,
// due to its placement, the "message" variable is never updated.
// and the log() is taking the hardcoded message and prints it

log();
// Above logs...
// Count is 0 



