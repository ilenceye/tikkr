// 转换
export const transformer = (seconds: number): [number, number, number] => {
  let hh = 0,
    mm = 0;

  const ss = seconds % 60;
  // 0 % 60 = 0
  // 50 % 60 = 50
  // 60 % 60 = 0
  // 70 % 60 = 10
  // 120 % 60 = 0
  // 130 % 60 = 10

  // seconds - ss !== 0
  if (seconds >= 60 && seconds < 3600) {
    // 0 ~ 59
    // seconds: 3599, mm: 59
    mm = (seconds - ss) / 60;
  }

  if (seconds >= 3600) {
    // seconds: 3600, mm: 0
    // seconds: 3601, mm: 0
    // seconds: 3660, mm: 1
    // seconds: 3661, mm: 1
    mm = ((seconds - ss) / 60) % 60;

    // seconds: 3600, hh = 1
    // seconds: 3601, hh = 1
    // seconds: 7200, hh = 2
    // 3600*3: hh = 3
    hh = (seconds - mm * 60 - ss) / 3600;
  }

  return [hh, mm, ss];
};

// 格式化
export const timify = (ss: number, mm: number = 0, hh: number = 0) => {
  const hour = `0${hh}`.slice(-2);
  const minute = `0${mm}`.slice(-2);
  const seconds = `0${ss}`.slice(-2);
  return `${hour}:${minute}:${seconds}`;
};
