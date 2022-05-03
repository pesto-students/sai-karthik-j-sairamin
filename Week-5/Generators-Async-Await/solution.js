// These are callbacks which return a promise.
function doTask1(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`resolved after ${ms / 1000} seconds`);
    }, ms);
  });
}
function doTask2(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`resolved after ${ms / 1000} seconds`);
    }, ms);
  });
}
function doTask3(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`resolved after ${ms / 1000} seconds `);
    }, ms);
  });
}

async function asyncAwaitDemo(cb1, cb2, cb3) {
  // whatever value a promise resolves with is taken by variables
  cb1 = doTask1;
  cb2 = doTask2;
  cb3 = doTask3;
  const result1 = await cb1(1000);
  console.log(`${result1} from async-await`);
  const result2 = await cb2(500);
  console.log(`${result2} from async-await`);
  const result3 = await cb3(200);
  console.log(`${result3} from async-await`);
  console.log("async-await completed");
}

// async-await functionality achieved.
asyncAwaitDemo();

// Now I will try to achieve the same functionality using Generators
async function* generatorsExample(cb1, cb2, cb3) {
  cb1 = doTask1;
  cb2 = doTask2;
  cb3 = doTask3;
  try {
    const result1 = cb1(2000);
    yield (await result1) + " from generator";
    const result2 = cb2(4000);
    yield (await result2) + " from generator";
    const result3 = cb3(6000);
    yield (await result3) + " from generator";
  } catch (err) {
    console.log(err);
  }
  return "generators completed";
}

const it = generatorsExample();

it.next().then((resolved) => console.log(resolved.value));
it.next().then((resolved) => console.log(resolved.value));
it.next().then((resolved) => console.log(resolved.value));
it.next().then((resolved) => console.log(resolved.value));
