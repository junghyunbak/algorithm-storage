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

const [N1, M1] = input().split(" ").map(Number);

let one = [];

for (let i = 0; i < N1; i++) {
  one.push(input().split("").map(Number));
}

const [N2, M2] = input().split(" ").map(Number);

let two = [];

for (let i = 0; i < N2; i++) {
  two.push(input().split("").map(Number));
}

const rotate90deg2d = (A) => {
  const n = A.length;
  const m = A[0].length;

  const newA = Array.from(Array(m), () => Array(n));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      newA[x][n - 1 - y] = A[y][x];
    }
  }

  return newA;
};

const chk = (A, B, y1, x1, y2, x2, n1, n2, m1, m2) => {
  for (let y = 0; y < n2; y++) {
    for (let x = 0; x < m2; x++) {
      const ay = y2 + y - y1;
      const ax = x2 + x - x1;

      if (ay < 0 || ay >= n1 || ax < 0 || ax >= m1) {
        continue;
      }

      if (B[y][x] && A[ay][ax]) {
        return false;
      }
    }
  }

  return true;
};

const solve = (A, B) => {
  const n1 = A.length;
  const m1 = A[0].length;

  const n2 = B.length;
  const m2 = B[0].length;

  const n = n1 + n2;
  const m = m1 + m2;

  let ret = Infinity;

  const y1 = n2;
  const x1 = m2;

  for (let y2 = 0; y2 <= n; y2++) {
    for (let x2 = 0; x2 <= m; x2++) {
      if (y2 + n2 > n + n2 || x2 + m2 > m + m2) {
        continue;
      }

      if (chk(A, B, y1, x1, y2, x2, n1, n2, m1, m2)) {
        const height = Math.max(y1 + n1, y2 + n2) - Math.min(y1, y2);
        const width = Math.max(x1 + m1, x2 + m2) - Math.min(x1, x2);

        ret = Math.min(ret, height * width);
      }
    }
  }

  return ret;
};

let ans = Infinity;

for (let j = 0; j < 4; j++) {
  two = rotate90deg2d(two);

  ans = Math.min(ans, solve(one, two));
}

console.log(ans);
