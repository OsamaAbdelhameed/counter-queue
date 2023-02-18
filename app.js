var FIFOqueue = /** @class */ (function () {
    function FIFOqueue() {
        this.queue = [];
        this.size = 0;
    }
    FIFOqueue.prototype.enqueue = function (value) {
        this.queue.push(value);
        this.size++;
        return this.queue;
    };
    FIFOqueue.prototype.dequeue = function () {
        if (this.queue.length >= 1) {
            var x = this.queue.shift() || "";
            this.size--;
            return x;
        }
        else
            return "the queue is empty";
    };
    FIFOqueue.prototype.getQueue = function () {
        return this.queue;
    };
    return FIFOqueue;
}());
var LIFOqueue = /** @class */ (function () {
    function LIFOqueue() {
        this.stack = [];
        this.size = 0;
    }
    LIFOqueue.prototype.enqueue = function (value) {
        this.stack.push(value);
        this.size++;
        return this.stack;
    };
    LIFOqueue.prototype.dequeue = function () {
        if (this.stack.length >= 1) {
            var x = this.stack.pop() || "";
            this.size--;
            return x;
        }
        else
            return "the stack is empty";
    };
    LIFOqueue.prototype.getQueue = function () {
        return this.stack;
    };
    return LIFOqueue;
}());
var fifo = new FIFOqueue();
var lifo = new LIFOqueue();
console.log(fifo.getQueue(), fifo.size);
console.log(lifo.getQueue(), lifo.size);
fifo.enqueue("Osama");
lifo.enqueue("Osama");
fifo.enqueue("Ahmed");
lifo.enqueue("Ahmed");
fifo.enqueue("Hassan");
lifo.enqueue("Hassan");
console.log(fifo.getQueue(), fifo.size);
console.log(lifo.getQueue(), lifo.size);
console.log(fifo.dequeue());
console.log(lifo.dequeue());
console.log(fifo.getQueue(), fifo.size);
console.log(lifo.getQueue(), lifo.size);
fifo.dequeue();
fifo.dequeue();
lifo.dequeue();
lifo.dequeue();
console.log(fifo.dequeue());
console.log(lifo.dequeue());
// answer B
//? 1- I will test how the functions are working
//? 2- Make a quick summary if it has a lots of conditions and arguments
//? 3- Implement and test them 
//? for example I used shift
function shift(arr) {
    if (arr.length === 0)
        return undefined;
    var e = arr[0];
    for (var i = 0; i < arr.length - 2; i++) {
        arr[i] = arr[i + 1];
    }
    arr.length = arr.length - 1;
    return e;
}
// Answer C
//? In this kind of data structure, I would use observer design pattern
//? because it helps to notify observers about the changes in the queue
//? so I would like to implement it on the second assignment, see you.
