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

const [N, M] = input().split(" ").map(Number);

const A = [...input().split(" ").map(Number), 0];

const sum = A.reduce((a, c) => a + c, 0);

const chk = (A, M, s) => {
  let c = 0;

  let tmp = 0;

  for (let i = 0; i < A.length; i++) {
    tmp += A[i];

    if (tmp === s) {
      c++;
      tmp = 0;
    } else if (tmp > s) {
      c++;
      tmp = A[i];
    }
  }

  if (tmp) {
    c++;
  }

  return c <= M;
};

let l = Math.max(...A);
let r = sum;
let m;

let ans;

while (l <= r) {
  m = Math.floor((l + r) / 2);

  if (chk(A, M, m)) {
    ans = m;
    r = m - 1;
  } else {
    l = m + 1;
  }
}

console.log(ans);
