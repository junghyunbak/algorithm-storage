// baekjoon input template
// prettier-ignore
{var fs=require('fs');var filePath=process.platform==='linux'?'/dev/stdin':'./input';var stdin=fs.readFileSync(filePath).toString().trim().split('\n').map(s=>s.trim());var input=(()=>{var line=0;return()=>stdin[line++]})();var SI=()=>input();var NI=()=>parseInt(input());var SAI=(sep=' ')=>input().split(sep);var NAI=(sep=' ')=>input().split(sep).map(Number);var CA=(n,v=null)=>Array(n).fill(v);var CAA=(n,m,v=null)=>Array.from(Array(n),()=>Array(m).fill(v));var CAAA=(n,m,h,v=null)=>Array.from(Array(n),()=>Array.from(Array(m),()=>Array(h).fill(v)));var P=console.log;}

const N = NI();

const T = NAI();

T.unshift(0);

for (let i = 1; i < N + 1; i++) {
  T[i] += T[i - 1];
}

const C = NI();

const dp = CAA(3, N + 1, -1);

const solve = (num, idx) => {
  if (idx + C - 1 > N) {
    return 0;
  }

  if (num === 3) {
    return 0;
  }

  if (dp[num][idx] !== -1) {
    return dp[num][idx];
  }

  let ret = 0;

  ret = Math.max(
    solve(num, idx + 1),
    solve(num + 1, idx + C) + (T[idx + C - 1] - T[idx - 1])
  );

  return (dp[num][idx] = ret);
};

P(solve(0, 1));
