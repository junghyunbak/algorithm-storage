class QueueNode {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this._size = 0;
    this._front = null;
    this._rear = null;
  }

  push(item) {
    const node = new QueueNode(item);

    if (this.empty()) {
      this._front = this._rear = node;
      this._size++;
      return;
    }

    this._rear.next = node;
    this._rear = node;
    this._size++;
  }

  pop() {
    if (this.empty()) {
      return -1;
    }

    const item = this._front.item;
    this._front = this._front.next;
    this._size--;
    return item;
  }

  get size() {
    return this._size;
  }

  empty() {
    return this._front === null ? 1 : 0;
  }

  front() {
    if (this.empty()) {
      return -1;
    }

    return this._front.item;
  }

  back() {
    if (this.empty()) {
      return -1;
    }

    return this._rear.item;
  }
}
