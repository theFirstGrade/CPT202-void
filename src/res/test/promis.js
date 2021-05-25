// function myPromise(constructor) {
//     let self = this;
//     self.status = 'pending'
//     self.value = undefined
//     self.reason = undefined
//
//     function resolve(value) {
//         if (self.status === 'pending') {
//             self.value = value
//             self.status = 'resolved'
//         }
//     }
//
//     function reject(value) {
//         if (self.status === 'pending') {
//             self.value = value
//             self.status = 'rejected'
//         }
//     }
//
//     try {
//         constructor(resolve, reject)
//     } catch (e) {
//         reject(e)
//     }
// }
//
// myPromise.prototype.then = function (onFullfilled, onRejected) {
//     let self = this
//     switch (self.status) {
//         case 'resolved':
//             onFullfilled(self.value)
//             break
//         case 'rejected':
//             onRejected(self.value)
//             break
//         default:
//     }
// }
//
// const p = new myPromise(function (resolve, reject) {
//     resolve(1)
// });
// p.then(function (x) {
//     console.log(x)
// })

// var p=new myPromise(function(resolve,reject){setTimeout(function(){resolve(1)},1000)});
//
// p.then(function(x){console.log(x)})
// //无输出

// setTimeout(function() {
//     console.log(1)
// }, 0);
// new Promise(function(resolve, reject) {
//     console.log(2)
//     for (var i = 0; i < 10000; i++) {
//         if(i === 10) {console.log(10)}
//         i === 9999 && resolve();
//     }
//     console.log(3)
// }).then(function() {
//     console.log(4)
// }).then(function (){
//     console.log(0)
// })
// console.log(5);

console.log(typeof Symbol() === 'symbol')