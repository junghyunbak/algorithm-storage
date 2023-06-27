function solution(play_time, adv_time, logs) {
  const n = 100 * 60 * 60;
  const imos = Array(n + 1).fill(0);
  const playEnd = Array(n + 1).fill(0);

  const hmsToSecond = (h, m, s) => h * 60 * 60 + m * 60 + s;

  const secondToHMS = (second) => {
    const h = Math.floor(second / 60 / 60);
    const m = Math.floor((second - h * 60 * 60) / 60);
    const s = second % 60;

    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  logs.forEach((log) => {
    const [start, end] = log.split('-');

    const [h1, m1, s1] = start.split(':').map(Number);
    const [h2, m2, s2] = end.split(':').map(Number);

    const startSecond = hmsToSecond(h1, m1, s1);
    const endSecond = hmsToSecond(h2, m2, s2);

    playEnd[startSecond] += 1;
    playEnd[endSecond] -= 1;
  });

  for (let i = 0; i < n + 1; i++) {
    imos[i] = (imos[i - 1] || 0) + playEnd[i];
  }

  const ps = [...imos];

  for (let i = 1; i < n + 1; i++) {
    // += 가 아니라 = 로 오타를 냈음
    ps[i] += ps[i - 1];
  }

  const candidates = [];

  const playTimeSecond = hmsToSecond(...play_time.split(':').map(Number));
  const advTimeSecond = hmsToSecond(...adv_time.split(':').map(Number));

  for (let i = 0; i < playTimeSecond - advTimeSecond + 1; i++) {
    // 재생 시간 또한 종료 시각은 포함되지 않는다...
    const s = i;
    const e = i + advTimeSecond - 1;

    candidates.push({
      entireTime: ps[e] - (ps[s - 1] || 0),
      startTime: s,
    });
  }

  candidates.sort((a, b) => {
    if (a.entireTime > b.entireTime) {
      return -1;
    } else if (a.entireTime < b.entireTime) {
      return 1;
    } else {
      return a.startTime - b.startTime;
    }
  });

  return secondToHMS(candidates[0].startTime);
}
