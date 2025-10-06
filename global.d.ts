declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}
export {};
