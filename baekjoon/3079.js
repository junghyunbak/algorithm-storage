// baekjoon input template
// prettier-ignore
{var fs=require('fs');var filePath=process.platform==='linux'?'/dev/stdin':'./input';var stdin=fs.readFileSync(filePath).toString().trim().split('\n').map(s=>s.trim());var input=(()=>{var line=0;return()=>stdin[line++]})();var SI=()=>input();var NI=()=>parseInt(input());var SAI=(sep=' ')=>input().split(sep);var NAI=(sep=' ')=>input().split(sep).map(Number);var CA=(n,v=null)=>Array(n).fill(v);var CAA=(n,m,v=null)=>Array.from(Array(n),()=>Array(m).fill(v));var CAAA=(n,m,h,v=null)=>Array.from(Array(n),()=>Array.from(Array(m),()=>Array(h).fill(v)));var P=console.log;}

const [N, M] = NAI();

const T = [];

CA(N).forEach(() => {
  const tmp = BigInt(NI());

  T.push(tmp);
});

const chk = (time) => {
  let cnt = 0n;

  T.forEach((v) => {
    cnt += time / v;
  });

  return cnt >= BigInt(M);
};

let l = 1n;
let r = BigInt(1e18);
let mid;
let ans = BigInt(1e18);

while (l < r) {
  mid = (l + r) / 2n;

  if (chk(mid)) {
    if (ans > mid) {
      ans = mid;
    }

    r = mid;
  } else {
    l = mid + 1n;
  }
}

P(ans.toString());
