const input = '81 4'
const inputArr = input.split(' ')
let num = parseInt(inputArr[0])
let time = inputArr[1]
let ans = 0
while (time > 0) {
    ans += num
    num = Math.sqrt(num)
    time--
}
ans = Math.round(ans * 100) / 100
console.log(ans)
