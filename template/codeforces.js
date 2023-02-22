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

/*
global.main = () => {
  let tc = parseInt(input());
  while (tc--) {}
};
*/
