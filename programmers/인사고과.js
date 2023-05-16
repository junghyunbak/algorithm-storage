function solution(scores) {
  var answer = 1;

  const n = scores.length;

  const isInsentive = Array(n).fill(true);

  const aToBs = (() => {
    const aToBs = new Map();

    scores.forEach(([a, b], i) => {
      if (!aToBs.has(a)) {
        aToBs.set(a, []);
      }

      aToBs.get(a).push({ v: b, i });
    });

    return aToBs;
  })();

  let threshold = 0;

  [...aToBs]
    .sort((a, b) => b[0] - a[0])
    .forEach(([a, bs]) => {
      bs.forEach((b) => {
        if (threshold > b.v) {
          isInsentive[b.i] = false;
        }
      });

      threshold = Math.max(threshold, ...bs.map((b) => b.v));
    });

  if (!isInsentive[0]) {
    return -1;
  }

  const sums = scores
    .map(([a, b], i) => ({ s: a + b, i }))
    .filter(({ i }) => isInsentive[i])
    .sort((a, b) => b.s - a.s);

  let prev = Infinity;

  for (let i = 0, j = 0; i < sums.length; i++) {
    const cur = sums[i];

    if (prev !== cur.s) {
      j = i;
    }

    if (cur.i === 0) {
      answer = j + 1;
      break;
    }

    prev = cur.s;
  }

  return answer;
}
