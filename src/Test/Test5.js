// let a = 2
// const ans = 0
// if (a === 1) {
//     console.log(0)
// } else if (a === 2) {
//     console.log(1)
// } else {
//     if (a % 2 === 0) {
//         console.log(2)
//     } else {
//         console.log(3)
//     }
// }

// const input = '100000000000000000000000'
// let inputNum = parseInt(input)
// const ans = 0
// if (inputNum === 1) {
//     console.log(0)
// } else if (inputNum === 2) {
//     console.log(1)
// } else {
//     const inputArr = input.split('')
//     const lastNum = inputArr[inputArr.length - 1]
//     console.log(lastNum)
//     if (lastNum % 2 === 0) {
//         console.log(2)
//     } else {
//         console.log(3)
//     }
// }

let num = parseInt('123')
while(num > 0){
    const input = parseInt('111')
    const inputNum = parseInt(input)
    const ans = 0
    if (inputNum === 1) {
        console.log(0)
    } else if (inputNum === 2) {
        console.log(1)
    } else {
        const inputArr = input.split('')
        const lastNum = inputArr[inputArr.length - 1]
        if (lastNum % 2 === 0) {
            console.log(2)
        } else {
            console.log(3)
        }
    }
    num--
}