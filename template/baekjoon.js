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
