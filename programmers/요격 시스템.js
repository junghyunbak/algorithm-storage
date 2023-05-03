function solution(targets) {
  var answer = 0;

  const n = targets.length;

  const isDestroy = Array(n).fill(false);

  const _targets = [];

  const TYPE = {
    S: 0,
    E: 1,
  };

  targets.forEach(([s, e], i) => {
    _targets.push({ x: s, type: TYPE.S, i });
    _targets.push({ x: e, type: TYPE.E, i });
  });

  _targets.sort((a, b) => {
    if (a.x < b.x) {
      return -1;
    } else if (a.x > b.x) {
      return 1;
    } else {
      if (a.type > b.type) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  const stack = [];

  _targets.forEach(({ x, type, i }) => {
    switch (type) {
      case TYPE.S:
        stack.push(i);
        break;
      case TYPE.E:
        if (isDestroy[i]) {
          break;
        }

        while (stack.length) {
          const index = stack.pop();

          isDestroy[index] = true;
        }

        answer++;

        break;
    }
  });

  return answer;
}
