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

const L = [0, 3];

for (let k = 1, S = 3; S < 1e9; k++) {
  let tmp = 2 * S + 1 + k + 2;
  L.push(tmp);
  S = tmp;
}

const lowerBound = (arr, target) => {
  let left = 0,
    right = arr.length - 1,
    middle = 0;

  while (left <= right) {
    middle = Math.floor((left + right) / 2);

    if (arr[middle] >= target) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return arr[middle] < target ? middle + 1 : middle;
};

let N = parseInt(input());

while (true) {
  const i = lowerBound(L, N);

  N -= L[i - 1];

  const k = i - 1;

  if (N <= 1 + k + 2) {
    console.log(N === 1 ? "m" : "o");
    break;
  } else {
    N -= 1 + k + 2;
  }
}
