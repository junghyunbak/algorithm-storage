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

const s1 = input();
const s2 = input();

const n = s1.length;
const m = s2.length;

const dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0)); // s1(y축) x s2(x축)

let ans = 0;

for (let y = 1; y <= n; y++) {
  for (let x = 1; x <= m; x++) {
    if (s1[y - 1] === s2[x - 1]) {
      dp[y][x] = dp[y - 1][x - 1] + 1;
    } else {
      dp[y][x] = Math.max(dp[y][x], dp[y - 1][x], dp[y][x - 1]);
    }

    ans = Math.max(ans, dp[y][x]);
  }
}

console.log(ans);
