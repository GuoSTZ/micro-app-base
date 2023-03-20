// 防抖
export function debounce(func: Function, delay: number) {
  let timer = null;
  return function (...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 节流
export function throttle(func: Function, delay: number) {
  let timer = null;
  return function (...args: unknown[]) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}