"use strict";
process.stdin.resume();
process.stdin.setEncoding("utf-8");
let [inputString, currentLine] = ["", 0];
process.stdin.on("data", (inputStdin) => (inputString += inputStdin));
process.stdin.on("end", (_) => {
  inputString = inputString
    .trim()
    .split("\n")
    .map((string) => string.trim());
  main();
});
const input = () => inputString[currentLine++];

const lowerBound = (arr, target) => {
  let l = 0;
  let r = arr.length;
  let m;

  while (l < r) {
    m = Math.floor((l + r) / 2);

    if (arr[m] < target) {
      l = m + 1;
    } else {
      r = m;
    }
  }

  return r;
};

const main = () => {
  let tc = parseInt(input());

  let ans = "";

  while (tc--) {
    const n = parseInt(input()),
      a = input().split(" ").map(Number),
      b = input().split(" ").map(Number);

    const ps = [0, ...b];

    for (let i = 1; i < n + 1; i++) {
      ps[i] += ps[i - 1];
    }

    const imos = Array(n * 2).fill(0),
      range = [],
      remain = [],
      eat = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      const canEat = ps[n] - ps[i];

      const target = Math.min(a[i], canEat) + ps[i];

      const index = lowerBound(ps, target) - 1;

      if (ps[index] === target) {
        range.push({ l: i, r: index });
      } else {
        if (i <= index - 1) {
          range.push({ l: i, r: index - 1 });
        }

        remain.push({ index: index, value: target - ps[index] });
      }
    }

    for (let i = 0; i < range.length; i++) {
      const { l, r } = range[i];

      imos[l * 2]++;
      imos[r * 2 + 1]--;
    }

    let now = 0;

    for (let i = 0; i < n * 2; i++) {
      now += imos[i];

      if (i % 2 === 0) {
        eat[i / 2] = b[i / 2] * now;
      }
    }

    for (let i = 0; i < remain.length; i++) {
      const { index, value } = remain[i];

      eat[index] += value;
    }

    ans += `${eat.join(" ")}\n`;
  }

  console.log(ans);
};
