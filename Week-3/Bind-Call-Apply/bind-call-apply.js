/**
 * NOTE:
 * 
 * bind(), call() and apply() are methods to be
 * applied on functions.
 * 
 * These are methods on Function prototype.
 * So, they are applicable on instances of Function / functions
 * 
 * Function.prototype.bind()
 * Function.prototype.call()
 * Function.prototype.apply()
 * 
 * First argument of bind is the new "this" to which the
 * function will be bound...
 * 
 * Second (and more) arguments are bound to the arguments
 * sequentially that a function needs.
 */

/** USAGE OF BIND() */

function fn(arg) {
    const arr = [`${this.name}`, "Its difficulty is"]
    console.log(arr.join(" "), arg);
}

let obj = {
    name: ".bind()",
    difficulty: "medium"
}

// .bind() serves 2 purposes
// 1. It can bind "this" of a function to someother object
// 2. It can bind also arguments of a function,
// thus creating template functions
// Once the arguments are bound, they are permanent. 

// The "this" of fn is bound to "obj" object
const boundedFn = fn.bind(obj);

boundedFn("simple");

// In above function there is still option to send argument
// as I bound only "this" so far....
// I will bind that argument also like below

const boundedArgsAlso = fn.bind(obj, obj.difficulty);

boundedArgsAlso();

/** Another example which demonstrates argument binding */

function summer(a, b) {
    console.log(a + b);
    // return a + b;
}

// give first argument as null for bind
// because I'm not interested in "this" context in this function

// a will be bound to 2
const boundedArgsSum = summer.bind(null, 2);

// Whenever I call the boundef function... 
// Only passing one argument is enough.
boundedArgsSum(5); // 7 is logged

// I can also bind both arguments.
// But this is rarely used.
const boundedAllArgs = summer.bind(null, 2, 10);

// Whenever I call boundedAllArgs() only the bounded values
// are considered... and any new arguments passed to it are
// completely ignored.

boundedAllArgs(); // this is enough. Prints 12
boundedAllArgs(10, 100); // arguments are ignored. Prints 12 only.


/**
 * call() and apply() are very similar
 * 
 * "this" of function is bound to first argument 
 * of call() and apply() methods.
 * 
 * This is the common feature among both call() and apply()
 * 
 */

const obj1 = {
    a: "test1",
    b: "test2",
    c: 3,
    print: function () {
        console.log(`this is ${this.a}`);
        console.log(`this is ${this.b}`);
        console.log(`this is ${this.c}`);
    }
}

const obj2 = {
    a: "Karthik",
    b: "Sai",
    c: "the end"
}

// Below call() and apply() are binding the "this"
// of obj1.print() method to obj2
// So, values will be taken from obj2

obj1.print.call(obj2);

obj1.print.apply(obj2);

// both have SAME effect.

/**
 * The uncommon feature among call() and apply() is...
 * 
 * If the function needs arguments, 
 * they are passed sequentially one after other
 * into call() from second argument.
 * 
 * If the function needs arguments... 
 * apply() wants array as second argument.
 * All elements of array are then passed sequentially to the function
 * as arguments
 */

function summerEg(...args) {
    let result = 0;
    args.forEach(num => result += num);
    console.log(result);
    // return result;
}

// I dont need to do any bind here
// So, give first argument to both as null

summerEg.call(null, 3, 4, 5, 6, 7); // 25
// CALL wants INDIVIDUAL arguments that the function needs

summerEg.apply(null, [3, 4, 5, 6, 7]); // 25
// APPLY wants args in ARRAY for second argument.

