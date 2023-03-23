var DisjointSet = class DisjointSet {
  constructor(n) {
    this.parent = Array(n)
      .fill(null)
      .map((value, index) => index);
    this.rank = Array(n + 1).fill(1);
  }

  find(u) {
    if (this.parent[u] === u) {
      return this.parent[u];
    }

    // (path compression 최적화)
    // 중간 원소의 부모를 루트 원소로 변경한다.
    return (this.parent[u] = this.find(this.parent[u]));
  }

  // 두 원소 u, v 가 속한 집합을 합친다.
  merge(u, v) {
    u = this.find(u);
    v = this.find(v);

    // 부모가 동일할 경우 합칠 필요가 없으므로 종료
    if (u === v) {
      return;
    }

    // (union-by-rank 최적화)
    if (this.rank[u] > this.rank[v]) {
      [u, v] = [v, u];
    }

    // 원소 u의 부모를 v로 변경한다.
    this.parent[u] = v;

    // (union-by-rank 최적화)
    if (this.rank[u] === this.rank[v]) {
      this.rank[v]++;
    }
  }
};
