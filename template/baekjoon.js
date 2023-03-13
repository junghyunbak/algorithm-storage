var fs = require('fs');
var filePath = process.platform === 'linux' ? '/dev/stdin' : './input';
var stdin = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.trim());
var input = (() => {
  var line = 0;
  return () => stdin[line++];
})();

var SI = () => input(); // string input
var NI = () => parseInt(input()); // number input
var SAI = (sep = ' ') => input().split(sep); // string array input
var NAI = (sep = ' ') => input().split(sep).map(Number); // number array input
var CA = (n, v = null) => Array(n).fill(v); // create array
var CAA = (n, m, v = null) => Array.from(Array(n), () => Array(m).fill(v)); // create two dimension array
var CAAA = (n, m, h, v = null) =>
  Array.from(Array(n), () => Array.from(Array(m), () => Array(h).fill(v))); // create three dimension array
var P = console.log;
