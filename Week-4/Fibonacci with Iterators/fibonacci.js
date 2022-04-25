// fibonacci is an object which has been made "iterable" via for-of loop
// by implementing [Symbol.iterator]() method.
const fibonacci = {
    [Symbol.iterator]() {
        let a = 0;
        let b = 1;
        // a and b are accessible to returned object via closure.
        return {
            next() {
                // parallel assignment via destructuring also works
                // [val, a, b] = [a, b, a + b];

                let val = a;
                let temp = b; // remember b's original value
                b = a+b; // b's next value
                a = temp; // a's next value = b's original value
                return { value : val };
            }
        }
    }
};

// fiboPrinter applies for-of loop on the object is made iterable
function fiboPrinter(iterableObj, limit) {
    if(limit < 0) {
        throw new Error("limit must be positive");
    }
    for( const el of iterableObj) {
        if(el > limit) {
            break;
            // when break is used, done property of object returned by next() 
            // will be set to "true". So, iteration stops. 
        }
        console.log(el);
    }
}

fiboPrinter(fibonacci, 200);
// fiboPrinter(fibonacci, -200); // throws error
// fiboPrinter(fibonacci, Infinity); // no limits printer!!