function getNumber() {
    let num = Math.ceil(Math.random()*1000);
    console.log(num);
}

function Promiser(executor) {
    this.then = function(onResolve) {
        onResolve();
        return this;
    } 
    this.catch = function(onReject) {
        onReject();
        return this;
    }
    
    executor((resolve,reject)=> {

    })
}


const p1 = new Promiser((resolve,reject) => {
    console.log("1");
});

console.log(p1.then());

