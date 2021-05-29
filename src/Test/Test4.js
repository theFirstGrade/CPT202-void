// const arr = [5, 5, 5, 10, 10, 10, 5, 10, 10, 10]
// const k = 3
// let first = 0
// let total = 0
// let max = 0
// let lastIndex = 0
// for (let i = 0; i < arr.length; i++) {
//
//     if (i < k) {
//         if (i === 0) {
//             first = arr[i]
//         }
//         total += arr[i]
//     } else {
//         total = total - first + arr[i]
//         if (max < total) {
//             max = total
//             lastIndex = i
//         }
//         first = arr[i - k + 1]
//     }
// }
// const ans = (lastIndex + lastIndex - k + 1)/2
// console.log(ans+1)

let input = '5 11'.split(' ')
let size = parseInt(input[0])
let k = parseInt(input[1])
let inputArr = '3 4 6 8 1'.split(' ')
let arr = []
for (let i = 0; i < inputArr.length; i++) {
    arr[i] = parseInt(inputArr[i])
}
let first = 0
let total = 0
let max = 0
let lastIndex = 0
let flag = false
for (let i = 0; i < arr.length; i++) {

    if (i < k) {
        if (i === 0) {
            first = arr[i]
        }
        if (i === k - 1) {
            lastIndex = i
        }
        total += arr[i]
    } else {
        flag = true
        total = total - first + arr[i]
        if (max < total) {
            max = total
            lastIndex = i
        }
        first = arr[i - k + 1]
    }
}
console.log(lastIndex)
const ans = (lastIndex + lastIndex - k + 1) / 2
if (size === 1) {
    console.log(1)
} else if (k >= size) {
    console.log(Math.floor(size / 2) + 1)
} else {
    if (!flag) {
        console.log(ans)
    } else {
        console.log(ans + 1)
    }
}