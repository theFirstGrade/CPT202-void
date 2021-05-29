const input = [1, 2, 3, 6]
const num = 4
const aver = input.reduce((a, b) => a + b) / 4
let count = 0
for (let i = 0; i < input.length; i++) {
    if (aver === input[i]) {
        count++
    }
}
console.log(num - 1 - count)