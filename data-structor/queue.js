class Node {
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
    const node = new Node(item);

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

    if (this.size() === 1) {
      this._size--;

      const tmp = this._front.item;

      this._front = this._rear = null;

      return tmp;
    }

    this._size--;

    const tmp = this._front.item;

    this._front = this._front.next;

    return tmp;
  }

  size() {
    return this._size;
  }

  empty() {
    return !this._size ? 1 : 0;
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
