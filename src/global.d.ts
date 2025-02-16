// global.d.ts
export {};

declare global {
  interface Window {
    Sanscript: {
      t?: (text: string, fromScript: string, toScript: string) => string;
    };
  }
}
