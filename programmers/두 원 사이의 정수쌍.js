const getIntegerLocationInCircle = (radius) => {
  let dup = 4;

  let count = 0;

  count += 1; // 원점

  count += radius * 4; // '좌표 축' 위의 정수 좌표 개수

  // '사분면' 위의 정수 좌표 개수
  for (let i = 0; i < 4; i++) {
    let tmp = 0;

    for (let x = 1; x <= radius - 1; x++) {
      const y = Math.sqrt(Math.pow(radius, 2) - Math.pow(x, 2));

      const lowerY = Math.floor(y);

      if (y === lowerY) {
        dup += 1;
      }

      tmp += Math.floor(lowerY);
    }

    count += tmp;
  }

  return { count, dup };
};

function solution(r1, r2) {
  let answer = 0;

  const { count: r1Count, dup: r1Dup } = getIntegerLocationInCircle(r1);
  const { count: r2Count, dup: r2Dup } = getIntegerLocationInCircle(r2);

  answer = r2Count - r1Count + r1Dup;

  return answer;
}
