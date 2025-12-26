import "@testing-library/jest-dom/vitest";

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const message = args[0];
  if (
    typeof message === "string" &&
    message.includes("onUnmounted is called when there is no active component instance")
  ) {
    return;
  }
  originalWarn(...args);
};

globalThis.requestAnimationFrame = (cb: (time: number) => void) => {
  return setTimeout(cb, 0) as unknown as number;
};

globalThis.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

if (!globalThis.performance) {
  globalThis.performance = {} as Performance;
}

if (!globalThis.performance.now) {
  globalThis.performance.now = () => {
    return Date.now();
  };
}
