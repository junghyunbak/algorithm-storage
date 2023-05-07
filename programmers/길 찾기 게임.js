function solution(nodeinfo) {
  const yToX = new Map();

  nodeinfo.forEach(([x, y], i) => {
    if (!yToX.has(y)) {
      yToX.set(y, []);
    }

    yToX.get(y).push({ x, i: i + 1 });
  });

  yToX.forEach((value) => {
    value.sort((a, b) => a.x - b.x);
  });

  const sortedNodeInfo = [...yToX]
    .sort((a, b) => b[0] - a[0])
    .map(([y, xs]) => xs);

  const pre = [];
  const post = [];

  const traversal = (l, r, y, x) => {
    const parent = sortedNodeInfo[y][x];

    const childrens = sortedNodeInfo[y + 1];

    pre.push(parent.i);

    if (childrens) {
      childrens.forEach(({ x, i }, index) => {
        if (l < x && x < parent.x) {
          traversal(l, parent.x, y + 1, index);
        }

        if (parent.x < x && x < r) {
          traversal(parent.x, r, y + 1, index);
        }
      });
    }

    post.push(parent.i);
  };

  traversal(-1, 1e5 + 1, 0, 0);

  return [pre, post];
}
