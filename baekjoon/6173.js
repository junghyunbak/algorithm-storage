console.log(ans.join("\n"));
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

const S = [];

const T = [];

for (let i = 0; i < N; i++) {
  S.push(input());
}

const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
};

const leftOrRight = (s, e, S) => {
  let l = s;
  let r = e;

  while (l < r) {
    if (S[l] < S[r]) {
      return DIRECTION.LEFT;
    } else if (S[l] > S[r]) {
      return DIRECTION.RIGHT;
    } else {
      l++;
      r--;
    }
  }

  return DIRECTION.LEFT;
};

const solve = (S, T) => {
  let l = 0;
  let r = N - 1;

  while (l <= r) {
    const direction = leftOrRight(l, r, S);

    if (direction === DIRECTION.LEFT) {
      T.push(S[l]);
      l++;
    } else {
      T.push(S[r]);
      r--;
    }
  }
};

solve(S, T);

let ans = [];

for (let i = 0; i < Math.ceil(T.length / 80) * 80; i += 80) {
  ans.push(T.slice(i, i + 80).join(""));
}

console.log(ans.join("\n"));
