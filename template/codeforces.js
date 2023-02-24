'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let [inputString, currentLine] = ['', 0];
process.stdin.on('data', (inputStdin) => (inputString += inputStdin));
process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((string) => string.trim());
  global.main();
});
const input = () => inputString[currentLine++];

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

/*
global.main = () => {
  let tc = parseInt(input());
  while (tc--) {}
};
*/
