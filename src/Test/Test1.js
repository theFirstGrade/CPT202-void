// const input = '2 30';
// const order1 = '0 1 10'
// const order2 = '1 2 30'
// const inputArr = input.split(' ');
// const orderNum = inputArr[0]
// let deskNum = inputArr[1]
// let orders = []
// // for (let i = 0; i < orderNum; i++){
// // orders.push(order1.split(' '))
// // orders.push(order2.split(' '))
// // for(let i = 0; i < orderNum; i++){
// const startTime = []
// const endTime = []
// const numArr = order1.split(' ')
// const numArr2 = order2.split(' ')
// let a = []
// for (let j = 0; j < numArr.length; j++) {
//     a.push(parseInt(numArr[j]))
//     if (j === 0) {
//         startTime.push(parseInt(j))
//     }
//     if (j === 1) {
//         endTime.push(parseInt(j))
//     }
// }
// orders.push(a)
// a = []
//
// for (let j = 0; j < numArr2.length; j++) {
//     a.push(parseInt(numArr2[j]))
//
//     if (j === 0) {
//         console.log('start---' + )
//         startTime.push(parseInt(j))
//     }
//     if (j === 1) {
//         endTime.push(parseInt(j))
//     }
// }
// orders.push(a)
//
// // }
// // }
// // orders.push(order1)
// // orders.push(order2)
// // console.log(orderNum, deskNum)
// console.log(orders)
// orders.sort()
// console.log(orders)
//
// let cusNum = 0
//
// for (let i = 0; i < 24; i++) {
//     if (endTime.indexOf(i) !== -1) {
//
//         const index = endTime.indexOf(i)
//         const increase = orders[index][2]
//         deskNum += increase
//         cusNum -= increase
//     }
//
//     if (startTime.indexOf(i) !== -1) {
//         const temp = orders[startTime.indexOf(i)]
//         if (deskNum - temp[2] >= 0) {
//             deskNum -= temp[2]
//             cusNum += temp[2]
//             console.log(cusNum)
//         } else {
//             orders[startTime.indexOf(i)][1] = -10
//             console.log(0)
//         }
//     } else {
//         console.log(0)
//
//     }
//
// }
// console.log(startTime)
