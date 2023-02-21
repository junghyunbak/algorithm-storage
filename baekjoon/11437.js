const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input";
const stdin = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((s) => s.trim());
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = parseInt(input());

const adj = Array.from(Array(N + 1), () => []);

for (let i = 0; i < N - 1; i++) {
  const [u, v] = input().split(" ").map(Number);

  adj[u].push(v);
  adj[v].push(u);
}

const parent = Array(N + 1);

const dfs = (prev, cur, depth, adj, visited, parent) => {
  // 기저 사례
  if (visited[cur]) {
    return;
  }

  visited[cur] = true;

  // 재귀 호출
  parent[cur] = prev;

  for (let i = 0; i < adj[cur].length; i++) {
    const next = adj[cur][i];

    dfs(cur, next, depth + 1, adj, visited, parent);
  }
};

dfs(1, 1, 1, adj, Array(N + 1).fill(false), parent);

const setParentList = (parent, arr, cur) => {
  arr[0] = cur;

  let i, tmp;

  for (i = 1, tmp = cur; tmp !== 1; i++) {
    arr[i] = parent[tmp];

    tmp = parent[tmp];
  }

  return i;
};

const M = parseInt(input());

let ans = [];

const ap = Array(N);
const bp = Array(N);

for (let i = 0; i < M; i++) {
  const [a, b] = input().split(" ").map(Number);

  let as = setParentList(parent, ap, a);
  let bs = setParentList(parent, bp, b);

  let tmp;

  while (as-- && bs--) {
    const ar = ap[as];
    const br = bp[bs];

    if (ar !== br) {
      break;
    }

    tmp = ar;
  }

  ans.push(tmp);
}

console.log(ans.join("\n"));
