function solution(weights) {
  var answer = 0;

  const l = [2, 3, 4];

  const w2c = new Map(); // weight -> count

  for (let i = 0; i < weights.length; i++) {
    const w = weights[i];
    const c = w2c.get(w);

    w2c.set(w, (c || 0) + 1);
  }

  const w2p = new Map(); // weight -> pair weight

  l.forEach((l1) => {
    w2c.forEach((c1, w1) => {
      l.forEach((l2) => {
        w2c.forEach((c2, w2) => {
          const wl1 = w1 * l1;
          const wl2 = w2 * l2;

          if (wl1 === wl2 && w1 < w2) {
            if (!w2p.has(w1)) {
              w2p.set(w1, new Set());
            }

            const p = w2p.get(w1);

            p.add(w2);
          }
        });
      });
    });
  });

  w2c.forEach((c, w) => {
    answer += (c * (c - 1)) / 2;
  });

  w2p.forEach((p, w) => {
    const c1 = w2c.get(w);

    p.forEach((w) => {
      const c2 = w2c.get(w);

      answer += c1 * c2;
    });
  });

  return answer;
}
