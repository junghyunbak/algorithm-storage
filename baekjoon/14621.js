// baekjoon input template
// prettier-ignore
{var fs=require('fs');var filePath=process.platform==='linux'?'/dev/stdin':'./input';var stdin=fs.readFileSync(filePath).toString().trim().split('\n').map(r=>r.trim());var input=(()=>{var r=0;return()=>stdin[r++]})();var SI=()=>input();var NI=()=>parseInt(input());var SAI=(r=' ')=>input().split(r);var NAI=(r=' ')=>input().split(r).map(Number);var CA=(r,a=null)=>Array(r).fill(a);var CAA=(r,a,i=null)=>Array.from(Array(r),()=>Array(a).fill(i));var CAAA=(r,a,i,l=null)=>Array.from(Array(r),()=>Array.from(Array(a),()=>Array(i).fill(l)));var P=console.log;}

// union-find data structure template
// prettier-ignore
{var DisjointSet=class DisjointSet{constructor(n){this.parent=Array(n).fill(null).map((value,index)=>index);this.rank=Array(n+1).fill(1)}find(u){if(this.parent[u]===u){return this.parent[u]}return this.parent[u]=this.find(this.parent[u])}merge(u,v){u=this.find(u);v=this.find(v);if(u===v){return}if(this.rank[u]>this.rank[v]){[u,v]=[v,u]}this.parent[u]=v;if(this.rank[u]===this.rank[v]){this.rank[v]++}}}}

const [N, M] = NAI();

const type = SAI();

const adj = CAA(N, 0);

CA(M).forEach(() => {
  const [u, v, d] = NAI();

  adj[u - 1].push({ v: v - 1, w: d });
  adj[v - 1].push({ v: u - 1, w: d });
});

const edges = [];

const dfs = (u, visited) => {
  if (visited[u]) {
    return;
  }

  visited[u] = true;

  for (let i = 0; i < adj[u].length; i++) {
    const tmp = adj[u][i];

    const v = tmp.v;

    if (type[u] === type[v]) {
      continue;
    }

    edges.push({ u, ...tmp });
    dfs(v, visited);
  }
};

const visited = CA(N, false);

dfs(0, visited);

if (visited.some((v) => !v)) {
  P(-1);
  process.exit(0);
}

/**
 * @param { u: number, v: number, w: number } edges
 */
const kruskal = (edges) => {
  edges.sort((a, b) => a.w - b.w);

  let ret = 0;

  const disjointSet = new DisjointSet(N);

  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];

    if (disjointSet.find(u) === disjointSet.find(v)) {
      continue;
    }

    disjointSet.merge(u, v);

    ret += w;
  }

  return ret;
};

P(kruskal(edges));
