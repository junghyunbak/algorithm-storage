function solution(stones, k) {
  var answer = 0;

  const canGo = (c) => {
    let tmp = k;

    for (let i = 0; i < stones.length; i++) {
      if (stones[i] - c < 0) {
        if (!--tmp) {
          return false;
        }
      } else {
        tmp = k;
      }
    }

    return true;
  };

  let l = 1;
  let r = 2e8;

  while (l < r) {
    const m = Math.floor((l + r) / 2);

    if (canGo(m)) {
      answer = m;
      l = m + 1;
    } else {
      r = m;
    }
  }

  return answer;
}
