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

function fiboPrinter(iterableObj, limit) {
    for( const el of iterableObj) {
        if(el > limit) {
            break;
        }
        console.log(el);
    }
}

fiboPrinter(fibonacci, 200);