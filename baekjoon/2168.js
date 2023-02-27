// prettier-ignore
{const t=require('fs');const e=process.platform==='linux'?'/dev/stdin':'./input';const r=t.readFileSync(e).toString().trim().split('\n').map(t=>t.trim());const i=(()=>{let t=0;return()=>r[t++]})();global.input=i;global.SI=()=>i();global.NI=()=>parseInt(i());global.SAI=(t=' ')=>i().split(t);global.NAI=(t=' ')=>i().split(t).map(Number);global.CA=(t,e=null)=>Array(t).fill(e);global.CAA=(t,e,r=null)=>Array.from(Array(t),()=>Array(e).fill(r));global.CAAA=(t,e,r,i=null)=>Array.from(Array(t),()=>Array.from(Array(e),()=>Array(r).fill(i)));global.P=console.log;const s=(t,e)=>{let r=0;let i=t.length;let s;while(r<i){s=Math.floor((r+i)/2);if(t[s]<e){r=s+1}else{i=s}}return i};global.lowerBound=s;class h{constructor(t){this.item=t;this.next=null}}class l{constructor(){this._size=0;this._front=null;this._rear=null}push(t){const e=new h(t);if(this.empty()){this._front=this._rear=e;this._size++;return}this._rear.next=e;this._rear=e;this._size++}pop(){if(this.empty()){return-1}if(this.size()===1){this._size--;const t=this._front.item;this._front=this._rear=null;return t}this._size--;const t=this._front.item;this._front=this._front.next;return t}size(){return this._size}empty(){return!this._size?1:0}front(){if(this.empty()){return-1}return this._front.item}back(){if(this.empty()){return-1}return this._rear.item}}global.QueueNode=h;global.Queue=l;class n{constructor(t=(t,e)=>t<e){this.heap=[null];this.compare=t}insert(t){this.heap.push(t);let e=this.heap.length-1;while(e!==1&&this.compare(t,this.heap[Math.floor(e/2)])){this.heap[e]=this.heap[Math.floor(e/2)];e=Math.floor(e/2)}this.heap[e]=t}delete(){const t=this.heap[1],e=this.heap.pop(),r=this.heap.length-1;let i=1,s=2;while(s<=r){if(s<r&&this.compare(this.heap[s+1],this.heap[s])){s+=1}if(this.compare(e,this.heap[s])){break}this.heap[i]=this.heap[s];i=s;s*=2}if(this.heap.length>1){this.heap[i]=e}return t}empty(){return this.heap.length===1}}class a{constructor(t){this.heap=new n(t)}empty(){return this.heap.empty()}peek(){return this.heap.heap[1]}push(t){this.heap.insert(t)}pop(){if(!this.empty())return this.heap.delete();else return null}}global.Heap=n;global.PriorityQueue=a;class o{constructor(t){this.parent=Array(t).fill(null).map((t,e)=>e);this.rank=Array(t+1).fill(1)}find(t){if(this.parent[t]===t){return this.parent[t]}return this.parent[t]=this.find(this.parent[t])}merge(t,e){t=this.find(t);e=this.find(e);if(t===e){return}if(this.rank[t]>this.rank[e]){[t,e]=[e,t]}this.parent[t]=e;if(this.rank[t]===this.rank[e]){this.rank[e]++}}}global.DisjointSet=o}

const [x, y] = NAI();

const GCD = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return GCD(b, a % b);
  }
};

const gcd = GCD(x, y);

const xx = x / gcd;
const yy = y / gcd;

P(gcd * (xx + yy - 1));
