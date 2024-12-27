declare module 'web-vitals' {
  export function getCLS(onCLS: (cls: any) => void): void;
  export function getFID(onFID: (fid: any) => void): void;
  export function getFCP(onFCP: (fcp: any) => void): void;
  export function getLCP(onLCP: (lcp: any) => void): void;
  export function getTTFB(onTTFB: (ttfb: any) => void): void;
  export type ReportHandler = (metric: any) => void;
}
