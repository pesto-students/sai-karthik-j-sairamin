function createStack0() {
    return {
        items: [],
        push(item) { this.items.push(item); },
        pop() { return this.items.pop(); },
        get() {
            return this.items;
        }
    };
}

// REFACTORED STACK CODE IS BELOW:
// get() is an extra function I added to know what elements are in stack.

// By closure, only the methods push, pop and get have knowledge that "items" exists
// items is available to them as it is in parent scope.

function createStack() {
    const items = [];
    return {
        push: (item) => items.push(item),
        pop: () => items.pop(),
        get: function () {
            return items;
        }
    };
}

const stack = createStack();
stack.push(10);
stack.push(5);

console.log(stack.get());

// stack.items === undefined 
// Thus encapsuation is achieved as users cannot know
// that it is "items" property that has the data  
console.log(stack.items);

// When I dont know which property has the stack data,
// I wouldn't assign like below... Hence I would not do assignment

// console.log(stack.items = [10, 100, 1000]);// Encapsulation broken

console.log(stack.pop());

console.log(stack.items); // not accessible

stack.push(11);
stack.push(22);
console.log(stack.get());
