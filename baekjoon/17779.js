// prettier-ignore
{const t=require('fs');const e=process.platform==='linux'?'/dev/stdin':'./input';const r=t.readFileSync(e).toString().trim().split('\n').map(t=>t.trim());const i=(()=>{let t=0;return()=>r[t++]})();global.input=i;global.SI=()=>i();global.NI=()=>parseInt(i());global.SAI=(t=' ')=>i().split(t);global.NAI=(t=' ')=>i().split(t).map(Number);global.A=(t,e=null)=>Array(t).fill(e);global.AA=(t,e,r=null)=>Array.from(Array(t),()=>Array(e).fill(r));global.AAA=(t,e,r,i=null)=>Array.from(Array(t),()=>Array.from(Array(e),()=>Array(r).fill(i)));global.P=console.log;const s=(t,e)=>{let r=0;let i=t.length;let s;while(r<i){s=Math.floor((r+i)/2);if(t[s]<e){r=s+1}else{i=s}}return i};global.lowerBound=s;class h{constructor(t){this.item=t;this.next=null}}class l{constructor(){this._size=0;this._front=null;this._rear=null}push(t){const e=new h(t);if(this.empty()){this._front=this._rear=e;this._size++;return}this._rear.next=e;this._rear=e;this._size++}pop(){if(this.empty()){return-1}if(this.size()===1){this._size--;const t=this._front.item;this._front=this._rear=null;return t}this._size--;const t=this._front.item;this._front=this._front.next;return t}size(){return this._size}empty(){return!this._size?1:0}front(){if(this.empty()){return-1}return this._front.item}back(){if(this.empty()){return-1}return this._rear.item}}global.QueueNode=h;global.Queue=l;class n{constructor(t=(t,e)=>t<e){this.heap=[null];this.compare=t}insert(t){this.heap.push(t);let e=this.heap.length-1;while(e!==1&&this.compare(t,this.heap[Math.floor(e/2)])){this.heap[e]=this.heap[Math.floor(e/2)];e=Math.floor(e/2)}this.heap[e]=t}delete(){const t=this.heap[1],e=this.heap.pop(),r=this.heap.length-1;let i=1,s=2;while(s<=r){if(s<r&&this.compare(this.heap[s+1],this.heap[s])){s+=1}if(this.compare(e,this.heap[s])){break}this.heap[i]=this.heap[s];i=s;s*=2}if(this.heap.length>1){this.heap[i]=e}return t}empty(){return this.heap.length===1}}class a{constructor(t){this.heap=new n(t)}empty(){return this.heap.empty()}peek(){return this.heap.heap[1]}push(t){this.heap.insert(t)}pop(){if(!this.empty())return this.heap.delete();else return null}}global.Heap=n;global.PriorityQueue=a;class o{constructor(t){this.parent=Array(t).fill(null).map((t,e)=>e);this.rank=Array(t+1).fill(1)}find(t){if(this.parent[t]===t){return this.parent[t]}return this.parent[t]=this.find(this.parent[t])}merge(t,e){t=this.find(t);e=this.find(e);if(t===e){return}if(this.rank[t]>this.rank[e]){[t,e]=[e,t]}this.parent[t]=e;if(this.rank[t]===this.rank[e]){this.rank[e]++}}}global.DisjointSet=o}

const N = NI();

const arr = [];

for (let i = 0; i < N; i++) {
  arr.push(NAI());
}

const dy = [-1, 1, 0, 0];
const dx = [0, 0, 1, -1];

const conqure = (cy, cx, v, area, visited) => {
  if (area[cy][cx] === 0) {
    visited[cy][cx] = true;
    area[cy][cx] = v;
  }

  for (let i = 0; i < 4; i++) {
    const ny = cy + dy[i];
    const nx = cx + dx[i];

    if (ny < 0 || ny >= N || nx < 0 || nx >= N) {
      continue;
    }

    if (visited[ny][nx]) {
      continue;
    }

    if (area[ny][nx] === 0) {
      conqure(ny, nx, v, area, visited);
    }
  }
};

let ans = Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    for (let d1 = 1; d1 < N - 1; d1++) {
      for (let d2 = 1; d2 < N - 1; d2++) {
        if (
          x + d1 + d2 <= N - 1 &&
          0 <= y - d1 &&
          y - d1 < y &&
          y < y + d2 &&
          y + d2 <= N - 1
        ) {
          const area = AA(N, N, 0);
          const visited = AA(N, N, false);

          for (let i = 0; i <= d1; i++) {
            area[y - i][x + i] = 5;
          }

          for (let i = 0; i <= d2; i++) {
            area[y - d1 + i][x + d1 + i] = 5;
          }

          for (let i = 0; i <= d2; i++) {
            area[y + i][x + i] = 5;
          }

          for (let i = 0; i <= d1; i++) {
            area[y + d2 - i][x + d2 + i] = 5;
          }

          for (let i = 0; i < x; i++) {
            area[y][i] = 3;
          }

          for (let i = 0; i < y - d1; i++) {
            area[i][x + d1] = 1;
          }

          for (let i = x + d1 + d2 + 1; i < N; i++) {
            area[y - d1 + d2][i] = 2;
          }

          for (let i = y + d2 + 1; i < N; i++) {
            area[i][x + d2] = 4;
          }

          conqure(0, 0, 1, area, visited);
          conqure(0, N - 1, 2, area, visited);
          conqure(N - 1, 0, 3, area, visited);
          conqure(N - 1, N - 1, 4, area, visited);

          const sum = A(6, 0);

          for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
              const num = area[r][c];
              const count = arr[r][c];
              switch (num) {
                case 1:
                case 2:
                case 3:
                case 4:
                  sum[num] += count;
                  break;
                case 5:
                case 0:
                  sum[5] += count;
                  break;
              }
            }
          }

          const maxC = Math.max(...sum.slice(1));
          const minC = Math.min(...sum.slice(1));

          ans = Math.min(ans, Math.abs(maxC - minC));
        }
      }
    }
  }
}

console.log(ans);
