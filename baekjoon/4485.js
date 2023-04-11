// baekjoon input template
// prettier-ignore
{ var fs = require('fs'); var filePath = process.platform === 'linux' ? '/dev/stdin' : './input'; var stdin = fs.readFileSync(filePath).toString().trim().split('\n').map(s => s.trim()); var input = (() => { var line = 0; return () => stdin[line++] })(); var SI = () => input(); var NI = () => parseInt(input()); var SAI = (sep = ' ') => input().split(sep); var NAI = (sep = ' ') => input().split(sep).map(Number); var CA = (n, v = null) => Array(n).fill(v); var CAA = (n, m, v = null) => Array.from(Array(n), () => Array(m).fill(v)); var CAAA = (n, m, h, v = null) => Array.from(Array(n), () => Array.from(Array(m), () => Array(h).fill(v))); var P = console.log; }

// priority queue data structure
// prettier-ignore
{ class Heap { constructor(compare = (a, b) => a < b) { this.heap = [null]; this.compare = compare } insert(item) { this.heap.push(item); let i = this.heap.length - 1; while (i !== 1 && this.compare(item, this.heap[Math.floor(i / 2)])) { this.heap[i] = this.heap[Math.floor(i / 2)]; i = Math.floor(i / 2) } this.heap[i] = item } delete() { const item = this.heap[1], tmp = this.heap.pop(), len = this.heap.length - 1; let parent = 1, child = 2; while (child <= len) { if (child < len && this.compare(this.heap[child + 1], this.heap[child])) { child += 1 } if (this.compare(tmp, this.heap[child])) { break } this.heap[parent] = this.heap[child]; parent = child; child *= 2 } if (this.heap.length > 1) { this.heap[parent] = tmp } return item } empty() { return this.heap.length === 1 } } var PriorityQueue = class PriorityQueue { constructor(compare) { this.heap = new Heap(compare) } empty() { return this.heap.empty() } peek() { return this.heap.heap[1] } push(item) { this.heap.insert(item) } pop() { if (!this.empty()) return this.heap.delete(); else return null } }; }

const dy = [-1, 1, 0, 0];
const dx = [0, 0, 1, -1];

let ans = [];

const coord2num = (y, x, n) => (y * n) + (x % n);

while (true) {
  const N = NI();

  if (!N) {
    break;
  }

  const cave = [];

  CA(N).forEach(() => {
    cave.push(NAI());
  });

  const adj = CAA((N + 1) * (N + 1), 0);

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny >= N + 1 || nx < 0 || nx >= N + 1) {
          continue;
        }

        adj[coord2num(y, x, N + 1)].push([cave[y][x], coord2num(ny, nx, N + 1)]);
      }
    }
  }

  const pq = new PriorityQueue((a, b) => a[0] < b[0]);

  pq.push([0, 0]);

  const dist = CA((N + 1) * (N + 1), Infinity);

  dist[0] = 0;

  while (!pq.empty()) {
    const [cost, here] = pq.pop();

    if (dist[here] < cost) {
      continue;
    }

    for (let i = 0; i < adj[here].length; i++) {
      let [nextDist, there] = adj[here][i];

      nextDist += cost;

      if (nextDist < dist[there]) {
        dist[there] = nextDist;

        pq.push([nextDist, there]);
      }
    }
  }

  ans.push(dist[(N + 1) * (N + 1) - 2])
}

if (!ans.length) {
  process.exit(0);
}

P(ans.map((v, i) => `Problem ${i + 1}: ${v}`).join('\n'));
