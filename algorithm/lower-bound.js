const lowerBound = (a, k) => {
  let l = 0;
  let r = a.length;
  let m;

  while (l < r) {
    m = Math.floor((l + r) / 2);

    if (a[m] < k) {
      l = m + 1;
    } else {
      r = m;
    }
  }

  return r;
};

global.lowerBound = lowerBound;
