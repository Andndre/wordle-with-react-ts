export function randInt(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export function str_binarySearch(arr: string[], x: string): number {
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);
    let res = -1000;
    if (x == arr[m]) res = 0;
    if (res == 0) return m;
    if (str_greatherThan(x, arr[m])) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

export function str_greatherThan(a: string, b: string) {
  return a.localeCompare(b) > 0;
}
