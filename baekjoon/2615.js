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

const board = [];

for (let i = 0; i < 19; i++) {
  board.push(input().split(" ").map(Number));
}

// 0: right, 1: down, 2: left & down 3: right & down
const visited = Array.from(Array(4), () =>
  Array.from(Array(19), () => Array(19).fill(false))
);

const dy = [0, 1, 1, 1]; // → ↓ ↙ ↘
const dx = [1, 0, -1, 1];

const isFive = (arr) => {
  if (arr.length !== 5) {
    return false;
  }

  if (!arr.every((value) => value === arr[0])) {
    return false;
  }

  return true;
};

const chk = (d, y, x) => {
  visited[d][y][x] = true;

  let ny = y,
    nx = x,
    arr = [];

  arr.push(board[y][x]);

  while (true) {
    ny += dy[d];
    nx += dx[d];

    if (nx < 0 || nx >= 19 || ny < 0 || ny >= 19) {
      break;
    }

    if (board[ny][nx] !== board[y][x]) {
      break;
    }

    visited[d][ny][nx] = true;
    arr.push(board[ny][nx]);
  }

  return isFive(arr);
};

let ans = "";

outer: for (let y = 0; y < 19; y++) {
  for (let x = 0; x < 19; x++) {
    for (let d = 0; d < 4; d++) {
      if (!board[y][x]) {
        continue;
      }

      if (visited[d][y][x]) {
        continue;
      }

      if (!chk(d, y, x)) {
        continue;
      }

      ans += `${board[y][x]}\n`;
      ans += d === 2 ? `${y + 4 + 1} ${x - 4 + 1}` : `${y + 1} ${x + 1}`;
      break outer;
    }
  }
}

console.log(ans ? ans : 0);
