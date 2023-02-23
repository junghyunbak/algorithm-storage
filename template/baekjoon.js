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

global.S = () => input();
global.I = () => parseInt(input());
global.AS = (sep = ' ') => input().split(sep);
global.AI = (sep = ' ') => input().split(sep).map(Number);
global.P = console.log;
