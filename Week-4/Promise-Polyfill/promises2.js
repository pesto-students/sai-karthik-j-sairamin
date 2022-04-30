function createNum() {
    return Math.ceil(Math.random()*1000);
}

async function getNumber() {
    let promise = new Promise((resolve, reject) => {
        let randomNumber = Math.ceil(Math.random()*1000);
        if(randomNumber % 2 !== 0) {
            resolve(randomNumber);
        }
        reject(randomNumber);
    })
    return await promise;
}

getNumber().then(resolvedNumber => console.log(`resolved with : ${resolvedNumber}`)).catch(rejectedNumber => `rejected with ${rejectedNumber}`);


function getNumberCallback(resolve, reject) {
    
    let randomNumber = Math.ceil(Math.random()*1000);
        if(randomNumber % 2 !== 0) {
            resolve(randomNumber);
        }
        reject(randomNumber);
}



