'use strict';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var [inputString, currentLine] = ['', 0];
process.stdin.on('data', (inputStdin) => (inputString += inputStdin));
process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((string) => string.trim());
  main();
});
var input = () => inputString[currentLine++];

var SI = () => input(); // string input
var NI = () => parseInt(input()); // number input
var SAI = (sep = ' ') => input().split(sep); // string array input
var NAI = (sep = ' ') => input().split(sep).map(Number); // number array input
var CA = (n, v = null) => Array(n).fill(v); // create array
var CAA = (n, m, v = null) => Array.from(Array(n), () => Array(m).fill(v)); // create two dimension array
var CAAA = (n, m, h, v = null) =>
  Array.from(Array(n), () => Array.from(Array(m), () => Array(h).fill(v))); // create three dimension array
var P = console.log;

/*
function main() {
  let tc = parseInt(input());
  while (tc--) {}
};
*/
