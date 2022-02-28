
const debounce = (fn, delay) => {
    let timeoutId;

    return (...args) => {
        if(timeoutId) {
            // clear
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const debounceBtn = document.getElementById("btn1")
debounceBtn.addEventListener("click", debounce(() => {
    console.log("clicked")
}, 2000))

const throttle = (fn, delay) => {
    let last = 0;

    return (...args) => {
        let now = new Date().getTime()
        if(now - last < delay) {
            return
        }
        last = now;
        fn(...args)
    }
}

const throttleBtn = document.getElementById("btn2")
throttleBtn.addEventListener("click", throttle(() => {
    console.log("clicked")
}, 2000))

