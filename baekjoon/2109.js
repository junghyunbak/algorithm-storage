// baekjoon input template
// prettier-ignore
{var fs=require('fs');var filePath=process.platform==='linux'?'/dev/stdin':'./input';var stdin=fs.readFileSync(filePath).toString().trim().split('\n').map(s=>s.trim());var input=(()=>{var line=0;return()=>stdin[line++]})();var SI=()=>input();var NI=()=>parseInt(input());var SAI=(sep=' ')=>input().split(sep);var NAI=(sep=' ')=>input().split(sep).map(Number);var CA=(n,v=null)=>Array(n).fill(v);var CAA=(n,m,v=null)=>Array.from(Array(n),()=>Array(m).fill(v));var CAAA=(n,m,h,v=null)=>Array.from(Array(n),()=>Array.from(Array(m),()=>Array(h).fill(v)));var P=console.log;}

// priority queue data structure
// prettier-ignore
{class Heap{constructor(compare=(a,b)=>a<b){this.heap=[null];this.compare=compare}insert(item){this.heap.push(item);let i=this.heap.length-1;while(i!==1&&this.compare(item,this.heap[Math.floor(i/2)])){this.heap[i]=this.heap[Math.floor(i/2)];i=Math.floor(i/2)}this.heap[i]=item}delete(){const item=this.heap[1],tmp=this.heap.pop(),len=this.heap.length-1;let parent=1,child=2;while(child<=len){if(child<len&&this.compare(this.heap[child+1],this.heap[child])){child+=1}if(this.compare(tmp,this.heap[child])){break}this.heap[parent]=this.heap[child];parent=child;child*=2}if(this.heap.length>1){this.heap[parent]=tmp}return item}empty(){return this.heap.length===1}}var PriorityQueue=class PriorityQueue{constructor(compare){this.heap=new Heap(compare)}empty(){return this.heap.empty()}peek(){return this.heap.heap[1]}push(item){this.heap.insert(item)}pop(){if(!this.empty())return this.heap.delete();else return null}};}

const n = NI();

const MAX = 10000;

const speeches = CAA(MAX + 1, 0);

CA(n).forEach(() => {
  const [p, d] = NAI();

  speeches[d].push(p);
});

let ans = 0;

const pq = new PriorityQueue((a, b) => a > b);

for (let day = MAX; day >= 1; day--) {
  const size = speeches[day].length;

  for (let i = 0; i < size; i++) {
    pq.push(speeches[day].pop());
  }

  if (!pq.empty()) {
    ans += pq.pop();
  }
}

P(ans);
