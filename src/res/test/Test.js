// let a = ["Sam", "22", "男"]
// for(let e in a){
//     console.log(e)
// }

var p = new Promise(function (resolve, reject) {
    console.log(333)
    resolve('a')
    var timer = setTimeout(function () {
        console.log('执行操作1');
        reject('这是数据1');
    }, 0);
});
console.log(222)
p.then(function (data) {
    console.log(data);
    console.log('这是成功操作');
},function (data){
    console.log(data)
});
console.log(111)
// const a = 2
// console.log(typeof a)
// for (let e in a){
//     console.log(a.hasOwnProperty(e))
// }
