function Queue() {
    this.items = []

    Queue.prototype.enqueue = element => {
        this.items.push(element)
    }

    Queue.prototype.dequeue = () => {
        return this.items.pop()
    }

    Queue.prototype.size = () => {
        return this.items.length
    }

    Queue.prototype.isEmpty = () => {
        return this.items.length === 0
    }

    Queue.prototype.toString = () => {
        let resultString = ''
        for (let i of this.items) {
            resultString += i + ''
        }
        return resultString
    }

}

const a = new Queue()
a.enqueue('a')
a.enqueue('b')
a.enqueue('c')
a.dequeue()
console.log(a.toString())
const b = new Queue()
console.log(b.size())
