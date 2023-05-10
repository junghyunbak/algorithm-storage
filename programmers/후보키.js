function solution(relation) {
  var answer = 0;

  const colSize = relation[0].length;
  const rowSize = relation.length;

  // 유일성 확인 함수
  const chkUnique = (indexes) => {
    const keys = relation.map((tuple) =>
      indexes.map((i) => tuple[i]).join('|')
    );

    return new Set(keys).size === rowSize;
  };

  // 최소성 확인 함수
  const chkMinimal = (indexes) => {
    for (let i = 0; i < indexes.length; i++) {
      const newIndexes = [...indexes];

      newIndexes.splice(i, 1);

      if (chkUnique(newIndexes)) {
        return false;
      }
    }

    return true;
  };

  const solve = (comb, index) => {
    let isUnique = chkUnique(comb);

    if (isUnique) {
      let isMinimal = chkMinimal(comb);

      if (isMinimal) {
        answer++;
      }
    } else {
      for (let i = index + 1; i < colSize; i++) {
        comb.push(i);
        solve(comb, i);
        comb.pop();
      }
    }
  };

  solve([], -1);

  return answer;
}
