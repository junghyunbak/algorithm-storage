// baekjoon input template
// prettier-ignore
{var fs=require('fs');var filePath=process.platform==='linux'?'/dev/stdin':'./input';var stdin=fs.readFileSync(filePath).toString().trim().split('\n').map(s=>s.trim());var input=(()=>{var line=0;return()=>stdin[line++]})();var SI=()=>input();var NI=()=>parseInt(input());var SAI=(sep=' ')=>input().split(sep);var NAI=(sep=' ')=>input().split(sep).map(Number);var CA=(n,v=null)=>Array(n).fill(v);var CAA=(n,m,v=null)=>Array.from(Array(n),()=>Array(m).fill(v));var CAAA=(n,m,h,v=null)=>Array.from(Array(n),()=>Array.from(Array(m),()=>Array(h).fill(v)));var P=console.log;}

const N = NI();

const A = NAI();

let l = 0;
let r = 0;

let cur = 0;
let ans = -Infinity;

/**
 * <투 포인터 풀이>
 * 현재 범위에서 연속된 수의 합이 음수이면 모든 값을 버리고
 * 새롭게 다시 계산하고, 양수이면 범위를 포함시키는 것이 최적해이므로
 * 초기화하지 않고 범위를 늘려나가며 최대값을 갱신한다.
 * 0의 경우는 포함해도되고, 포함하지 않아도 상관없으므로 등호는 어디에 들어가도 상관이 없다.
 */
while (r < N) {
  if (cur >= 0) {
    cur += A[r];
    ans = Math.max(ans, cur);
    r++;
  } else {
    cur = 0;
    l = r;
  }
}

P(ans);
