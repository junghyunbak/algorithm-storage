const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input';
const stdin = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.trim());
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

global.input = input;
global.SI = () => input(); // string input
global.NI = () => parseInt(input()); // number input
global.SAI = (sep = ' ') => input().split(sep); // string array input
global.NAI = (sep = ' ') => input().split(sep).map(Number); // number array input
global.A = (n, v = null) => Array(n).fill(v);
global.AA = (n, m, v = null) => Array.from(Array(n), () => Array(m).fill(v));
global.AAA = (n, m, h, v = null) =>
  Array.from(Array(n), () => Array.from(Array(m), () => Array(h).fill(v)));
global.P = console.log;
