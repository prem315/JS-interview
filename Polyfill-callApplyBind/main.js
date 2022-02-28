console.log("Call Apply And Bind")

const obj = {
    a: 10,
    b: 20
}

function log(a, b) {
    return `${this.a} || ${this.b} || ${a} || ${b}`
}

// normal bind --> bind returns function
const bindExecutor = log.bind(obj, 100, 200);
console.log(bindExecutor())

// polyfill for bind
Function.prototype.myBind = function(scope, ...args) {
    scope._this = this;

    return function() {
        return scope._this(...args)
    }
}

// using myBind
const myBindExecutor = log.myBind(obj, 100, 200);
console.log("my bind", myBindExecutor())

console.log(log.call(obj, 100, 200));
console.log(log.apply(obj, [100, 200]));

// polyfill for call

Function.prototype.myCall = function(scope, ...args) {
    scope._this = this;
    return scope._this(...args)
}

console.log("my call", log.myCall(obj, 100, 200));

// polyfill for apply

Function.prototype.myApply = function(scope, args) {
    scope._this = this;
    return scope._this(...args)
}

console.log("my apply", log.myApply(obj, [100, 200]));