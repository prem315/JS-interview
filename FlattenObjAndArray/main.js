const user = {
    name: "Vishal",
    address: {
        primary: {
            house: "109",
            street: {
                main: "21",
                cross: "32"
            }
        }
    }
};

const flattenObj = (obj = {}, res = {}, extrakey = "") => {
    for(let key in obj) {
        if(typeof obj[key] !== "object") {
            res[extrakey + key] = obj[key]
        } else {
            flattenObj(obj[key], res, `${extrakey}${key}.`)
        }
    }
    return res
}


const d = flattenObj(user)
console.log(d)


const arr = [2, 3, [4, 5], [[[[NaN, undefined]]]]]

const flattenArr = (input) => {
    let res = [];

    if(!Array.isArray(input)) {
        return input
    }

    for(let element of input) {
        res = res.concat(flattenArr(element))
    }

    return res
}

const a = flattenArr(arr)
console.log(a)