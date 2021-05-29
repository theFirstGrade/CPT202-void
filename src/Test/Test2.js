// const orders = [[9, 12, 5], [8, 11, 10], [14, 16, 30], [15, 17, 20]]
// let newOrders = []
// for(let i=0;i<orders.length;i++){
//     newOrders.push([])
// }
// for (let i = 0; i < orders.length; i++) {
//     let pos = 0
//     for (let j = 0; j < orders.length; j++) {
//         if (orders[i][0] > orders[j][0]) {
//             pos++
//         }
//     }
//     newOrders[pos] = orders[i]
// }
// console.log(newOrders)
//
// var input = readline()
// var inputArr = input.split(' ')
// let orderNum = parseInt(inputArr[0])
// let deskNum = parseInt(inputArr[1])
// let ans = []
// let orders1 = []
// for(let i = 0; i < orderNum; i++){
//     let a = []
//     const numArr = readline().split(' ')
//     for(let j=0; j< numArr.length; j++){
//         a.push(parseInt(numArr[j]))
//     }
//     orders1.push(a)
// }
// //orders.sort()
// let orders = []
// for(let i=0;i<orders1.length;i++){
//     orders.push([])
// }
// for (let i = 0; i < orders1.length; i++) {
//     let pos = 0
//     for (let j = 0; j < orders1.length; j++) {
//         if (orders1[i][0] > orders1[j][0]) {
//             pos++
//         }
//     }
//     orders[pos] = orders1[i]
// }
// 111
// 4 40
// 9 12 5
// 8 11 10
// 14 16 30
// 15 17 20
//
// 0 0 0 0 0 0 0 0 10 15 15 5 0 0 30 30 0 0 0 0 0 0 0 0

let ans = ''
let orders1 = [[9, 12, 5], [8, 11, 10], [14, 16, 30], [15, 17, 20]]
let deskNum = 40
let orders = []
for (let i = 0; i < orders1.length; i++) {
    orders.push([])
}
for (let i = 0; i < orders1.length; i++) {
    let pos = 0
    for (let j = 0; j < orders1.length; j++) {
        if (orders1[i][0] > orders1[j][0]) {
            pos++
        }
    }
    orders[pos] = orders1[i]
}
let startTime = []
let endTime = []
let cusNum = 0
for (let i = 0; i < orders.length; i++) {
    startTime.push(orders[i][0])
    endTime.push(orders[i][1])
}
for (let i = 0; i < 24; i++) {
    if (endTime.indexOf(i) !== -1) {
        //       console.log(endTime.indexOf(i))
        const index = endTime.indexOf(i)
        const increase = orders[index][2]
        deskNum += increase
        cusNum -= increase
    }

    if (startTime.indexOf(i) !== -1) {
        const temp = orders[startTime.indexOf(i)]
        if (deskNum - temp[2] >= 0) {
            console.log(deskNum + '--' + i)
            deskNum -= temp[2]
            cusNum += temp[2]
            //console.log(cusNum)
            ans += cusNum + ' '
        } else {
            endTime[startTime.indexOf(i)] = -10
            //console.log(0)
            ans += cusNum + ' '
        }
    } else {
        //console.log(0)
        ans += cusNum + ' '
    }
}
console.log(ans)