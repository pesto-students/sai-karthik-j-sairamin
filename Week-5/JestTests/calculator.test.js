// Importing inside CommonJS Module via Object Destructuring
const { sum, diff, product } = require("./calculator.js");

// BDD => Behaviour Driven Development
// In BDD Testing we can have a describe block called test suite that has multiple tests

// A test suite can have one main describe block with a name (1st arg) and can have multiple test blocks inside an arrow function (2nd arg) like below
describe("Calculator tests", () => {
  test("1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  test("3 + 2 = 5", () => {
    expect(sum(3, 2)).toBe(5);
  });
});

// Normal tests.... without "describe"
test("Addition Test", () => {
  expect(sum(1, 2)).toBe(3);
});

test("Subtraction Test", () => {
  let result = diff(33, 8);
  expect(result).toBe(25);
});

test("Multiplication Test", () => {
  expect(product(3, 9)).toBe(27);
});
