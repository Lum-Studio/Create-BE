import { system, world } from "@minecraft/server";

// Maybe later for trains
class StackQueue {
    constructor() {
        /**
         * @type {Task[]}
         */
        this.stack = [];
        /**
       * @type {Task[]}
       */
        this.queue = [];
        this.intervals = new Map();
        system.runJob(this.tick());
    }



    *tick() {
        if (!this.isQueueEmpty()) {
            this.pushTask(this.dequeue());
        } else if (this.isStackEmpty() && this.isQueueEmpty()) {
            yield; // Yield when both stack and queue are empty
        } else {
            while (!this.isStackEmpty()) {
                const task = this.popStack()
                this.runTask(task);
                yield; // Yield after each task, this passes the execution of the next task to the next tick
            }
            yield; // Yield once stack is empty
        }
    }


    dequeue() {
        return this.queue.shift()
    }

    enqueue(task) {
        this.queue.push(task)
    }

    popStack() {
        return this.stack.pop();
    }

    pushTask(task) {
        this.stack.push(task)
    }

    isStackEmpty() {
        return this.stack.length === 0
    }

    isQueueEmpty() {
        return this.queue.length === 0
    }


    /**
        * @param {Task} task
        */
    runTask(task) {
        switch (task.type) {
            case 'interval':
                system.runInterval(task.callback)
                break;

            case 'event':
                world[task.eventType][task.eventName].subscribe(task.callback)
                break;
        }
    }
}

/**
 * @typedef {("event" | "interval")} TaskType
 */

/**
 * @typedef {("beforeEvent" | "afterEvent")} EventType
 */

/**
 * @typedef {((event?: any) => void) | (() => void)} Callback
 */
class Task {
    /**
     * 
     * @param {TaskType} type 
     * @param {EventType} eventType 
     * @param {Callback} callback 
     */
    constructor(type, callback, eventType = 'afterEvent', eventName = '') {
        this.type = type;
        this.eventType = eventType;
        this.eventName = eventName;
        this.callback = callback;
    }
}

// Example
const task = new Task('interval', () => {

})
const stackQueue = new StackQueue()
stackQueue.enqueue(task)