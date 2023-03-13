class Heap {
  // default : 최소 힙
  constructor(compare = (a, b) => a < b) {
    this.heap = [null];

    this.compare = compare;
  }

  insert(item) {
    this.heap.push(item);

    let i = this.heap.length - 1;

    while (i !== 1 && this.compare(item, this.heap[Math.floor(i / 2)])) {
      this.heap[i] = this.heap[Math.floor(i / 2)];

      i = Math.floor(i / 2);
    }

    this.heap[i] = item;
  }

  delete() {
    const item = this.heap[1],
      tmp = this.heap.pop(),
      len = this.heap.length - 1;

    let parent = 1,
      child = 2;

    while (child <= len) {
      if (child < len && this.compare(this.heap[child + 1], this.heap[child])) {
        child += 1;
      }

      if (this.compare(tmp, this.heap[child])) {
        break;
      }

      this.heap[parent] = this.heap[child];

      parent = child;

      child *= 2;
    }

    if (this.heap.length > 1) {
      this.heap[parent] = tmp;
    }

    return item;
  }

  empty() {
    return this.heap.length === 1;
  }
}

class PriorityQueue {
  constructor(compare) {
    this.heap = new Heap(compare);
  }

  empty() {
    return this.heap.empty();
  }

  peek() {
    return this.heap.heap[1];
  }

  push(item) {
    this.heap.insert(item);
  }

  pop() {
    if (!this.empty()) return this.heap.delete();
    else return null;
  }
}
