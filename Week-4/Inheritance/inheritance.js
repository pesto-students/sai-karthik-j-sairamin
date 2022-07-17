var Person = function() {};

Person.prototype.initialize = function(name, age) {
    this.name = name;
    this.age = age;
}

var Teacher = function() {
    Person.call(this) 
    // It acts as super() call
    // it enables inheriting properties of parent.
    // By the way, in this example... there are no instance variables 
    // inside the parent Person.
    // Therefore, this has no effect in this example.
};

// making methods of Person (parent) accessible to Teacher (child);
// this enables inheritance of methods of parent
Object.setPrototypeOf(Teacher.prototype, Person.prototype);

Teacher.prototype.teach = function(subject){
    console.log(`${this.name} is now teaching ${subject}`)
}

var him = new Teacher();

him.initialize("Adam", 45);
him.teach("Inheritance");

// This will print "Adam is now teaching Inheritance"

console.log(Person.prototype.isPrototypeOf(Teacher.prototype)); // true
// isPrototypeOf() is to be used to check prototype connection between parent and child.

// The prototype of "him" is "Teacher.prototype"
// console.log(Object.getPrototypeOf(him) === Teacher.prototype); // true
// console.log(Object.getPrototypeOf(Teacher) === Function.prototype); // true
// console.log(Object.getPrototypeOf(Person) === Function.prototype); // true



console.log("-----------------------------------------");
// METHOD 2 : ALTERNATE which does NOT satisfy all conditions of the question.
// BUT. this method also demonstrates inheritance via Object.create()

// Another way to set prototype is using Object.create

// setting prototype of him2 to Person.prototype so that I can 
// get access to initialize() method of Person class/constructor function
var him2 = Object.create(Person.prototype);

// him2 has prototype = Person.prototype
console.log(Object.getPrototypeOf(him2) === Person.prototype); // true

// Person.prototype IS prototype of him2
console.log(Person.prototype.isPrototypeOf(him2)); // true

// him2 is a normal EMPTY object whose prototype is set to Person.prototype
console.log(him2); // {}

// ADDED new property (a method) to him2 object
// ALTERNATIVELY, this teach method could be added to Person.prototype
// so that him2 can access it.
him2.teach = function(subject) {
    console.log(`${this.name} is now teaching ${subject}`);
}

// Since him2 is a normal object, and NOT a function constructor,
// Therefore, I cant add "teach" method to him2.prototype

// prototype is an "undefined" property on him2 object
console.log(him.prototype); // undefined

him2.initialize("Adam", 42);
him2.teach("Inheritance");

// This will ALSO print.... "Adam is now teaching Inheritance"
// ----------------------------------------------