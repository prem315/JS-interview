console.log("Promise")

class MyPromise {
    
    resolvedVal;
    rejectedVal;

    resolvedChain = [];
    rejectedChain = [];

    isResolved = false;
    isRejected = false;

    static resolve(value) {
        return new MyPromise((resolve) => {
          resolve(value)
        })
    }
    
    static reject(value) {
        return new MyPromise((resolve, reject) => {
          reject(value)
        })
    }

    static all(promises) {
        const results = [];
        const fullfilled = [];

        return new MyPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then((data) => {
                    fullfilled.push(true)
                    results[index] = data
                    if(results.length === fullfilled.length) {
                        resolve(results)
                    }
                }).catch((error) => {
                    reject(error)
                })        
            });
        })
    }
    
    constructor(executor) {

        const resolve = (val) => {
            this.isResolved = true
            this.resolvedVal = val;

            if(this.resolvedChain.length) {
                this.resolvedChain.reduce((acc, fn) => {
                    return fn(acc)
                }, this.resolvedVal)
            }
        }

        const reject = (val) => {
            this.isRejected = true;
            this.rejectedVal = val;
        }

        executor(resolve, reject)
    }

    then(fn) {
        this.resolvedChain.push(fn)
        if(this.isResolved) {
            this.resolvedChain.reduce((acc, fn) => {
                return fn(acc)
            }, this.resolvedVal)
        }
        return this
    }

    catch(fn) {
        this.rejectedChain.push(fn)
        if(this.isRejected) {
            this.rejectedChain.reduce((acc, fn) => {
                return fn(acc)
            }, this.rejectedVal)
        }
        return this
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
}).then((data) => {
    return data * 2
}).then((data) => {
    console.log(data)
})

MyPromise.all([MyPromise.resolve("resolving promise"), MyPromise.resolve("resolving promise 2"), MyPromise.resolve("resolving promise 3")]).then((data) => {
    console.log(data)
})
  
MyPromise.resolve("resolving promise").then((data) => {
    console.log(data)
})

MyPromise.reject("rejecting promise").catch((data) => {
    console.log(data)
})