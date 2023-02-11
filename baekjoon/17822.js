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

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const DIRECTION = {
  RIGHT: 0,
  LEFT: 1,
};

const [N, M, T] = input().split(" ").map(Number);

const arr = Array.from(Array(N), () => Array(M).fill("x"));

for (let i = 0; i < N; i++) {
  const tmp = input().split(" ").map(Number);

  for (let j = 0; j < M; j++) {
    arr[i][j] = tmp[j];
  }
}

const nearSearch = (array) => {
  let isChange = false;

  const tmp = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      for (let i = 0; i < 4; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];

        if (ny === -1) {
          continue;
        }

        if (ny === N) {
          continue;
        }

        if (nx === -1) {
          nx = M - 1;
        }

        if (nx === M) {
          nx = 0;
        }

        if (array[y][x] === "x" || array[ny][nx] === "x") {
          continue;
        }

        if (array[y][x] === array[ny][nx]) {
          tmp.push({ y: ny, x: nx });
          tmp.push({ y, x });
        }
      }
    }
  }

  if (tmp.length) {
    isChange = true;

    for (let i = 0; i < tmp.length; i++) {
      const { y, x } = tmp[i];

      array[y][x] = "x";
    }
  }

  return isChange;
};

const updateArray = (array) => {
  let sum = 0;

  let tmp = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!isNaN(array[y][x])) {
        sum += array[y][x];

        tmp.push({ y, x });
      }
    }
  }

  const average = sum / tmp.length;

  for (let i = 0; i < tmp.length; i++) {
    const { y, x } = tmp[i];

    if (array[y][x] < average) {
      array[y][x]++;
    } else if (array[y][x] > average) {
      array[y][x]--;
    }
  }
};

const getSumArray = (array) => {
  let sum = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!isNaN(array[y][x])) {
        sum += array[y][x];
      }
    }
  }

  return sum;
};

const rotateArray = (array, index, direction, moveCount) => {
  if (direction === DIRECTION.LEFT) {
    for (let i = 0; i < moveCount; i++) {
      array[index].push(array[index].shift());
    }
  } else if (direction === DIRECTION.RIGHT) {
    for (let i = 0; i < moveCount; i++) {
      array[index].unshift(array[index].pop());
    }
  }
};

for (let i = 0; i < T; i++) {
  const [x, d, k] = input().split(" ").map(Number);

  for (let j = x; j <= N; j += x) {
    rotateArray(arr, j - 1, d, k);
  }

  if (!nearSearch(arr)) {
    updateArray(arr);
  }
}

console.log(getSumArray(arr));
