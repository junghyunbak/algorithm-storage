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

const k = parseInt(input());

const tmp = input().split(" ");
const A = [">", ...tmp, ">"];
const RA = ["<", ...tmp, "<"];

const l = [];
const g = [];

for (let i = 0; i < k + 2; i++) {
  if (A[i] === ">") {
    l.push(i);
  }
}

for (let i = 0; i < k + 2; i++) {
  if (RA[i] === "<") {
    g.push(i);
  }
}

const ma = [];
const mi = [];

for (let i = 1; i < l.length; i++) {
  for (let j = l[i] - 1; j >= l[i - 1]; j--) {
    ma.push(9 - j);
  }
}

for (let i = 1; i < g.length; i++) {
  for (let j = g[i] - 1; j >= g[i - 1]; j--) {
    mi.push(j);
  }
}

console.log(ma.join(""));
console.log(mi.join(""));
