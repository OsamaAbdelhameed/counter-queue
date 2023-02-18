// Answer A
interface IQueuable {
    //adds value to queue and returns new queue
    enqueue: (value: string)=> string[];
    //removes item from queue, and returns the item removed
    dequeue: ()=> string;
    //returns a list of all the items in the queue
    getQueue: ()=> string[];
    //returns the number of items in the queue
    size: number;
}

class FIFOqueue implements IQueuable {
    private queue: string[];
    size: number;

    constructor() {
        this.queue = [];
        this.size = 0;
    }

    enqueue(value: string) {
        this.queue.push(value);
        this.size++;
        return this.queue;
    }

    dequeue(){
         if(this.queue.length>=1){
            let x = this.queue.shift() || "";
            this.size--;
            return x
        }
        else 
        return "the queue is empty"
    }

    getQueue() {
        return this.queue;
    }
}

class LIFOqueue implements IQueuable {
    
    private stack: string[];
    size: number;

    constructor() {
        this.stack = [];
        this.size = 0;
    }

    enqueue(value: string) {
        this.stack.push(value);
        this.size++;
        return this.stack;
    }

    dequeue(){
         if(this.stack.length>=1){
            let x = this.stack.pop() || "";
            this.size--;
            return x
        }
        else 
        return "the stack is empty"
    }

    getQueue() {
        return this.stack;
    }
}

const fifo= new FIFOqueue();
const lifo= new LIFOqueue();

console.log(fifo.getQueue(), fifo.size)
console.log(lifo.getQueue(), lifo.size)

fifo.enqueue("Osama");
lifo.enqueue("Osama");


fifo.enqueue("Ahmed");
lifo.enqueue("Ahmed");

fifo.enqueue("Hassan");
lifo.enqueue("Hassan");

console.log(fifo.getQueue(), fifo.size)
console.log(lifo.getQueue(), lifo.size)

console.log(fifo.dequeue())
console.log(lifo.dequeue())

console.log(fifo.getQueue(), fifo.size)
console.log(lifo.getQueue(), lifo.size)

fifo.dequeue()
fifo.dequeue()
lifo.dequeue()
lifo.dequeue()

console.log(fifo.dequeue())
console.log(lifo.dequeue())

// answer B
//? 1- I will test how the functions are working
//? 2- Make a quick summary if it has a lots of conditions and arguments
//? 3- Implement and test them 
//? for example I used shift

function shift(arr: string[]) {
  if (arr.length === 0)
    return undefined;
  
  const e = arr[0];
  for (let i = 0; i < arr.length-2; i++) {
    arr[i] = arr[i+1];
  }
  arr.length = arr.length-1;
  return e;
}

// Answer C
//? In this kind of data structure, I would use observer design pattern
//? because it helps to notify observers about the changes in the queue
//? so I would like to implement it on the second assignment, see you.