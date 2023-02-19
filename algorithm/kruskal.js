const DisjointSet = require("../data-structor/union-find");

/**
 *
 * @param {Array<Array<{ v: number, w: number }>>} adj
 */
const kruskal = (adj) => {
  /** @type { u: number, v: number, w: number } */
  const edges = [];

  const n = adj.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < adj[i].length; j++) {
      const { v, w } = adj[i][j];

      edges.push({ u: i, v, w });
    }
  }

  edges.sort((a, b) => a.w - b.w);

  let ret = 0;

  const disjointSet = new DisjointSet(n);

  for (let i = 0; i < edges.length; i++) {
    const { u, v, w } = edges[i];

    if (disjointSet.find(u) === disjointSet.find(v)) {
      continue;
    }

    disjointSet.merge(u, v);

    ret += w;
  }

  return ret;
};
