export interface iFileScanResult {
  filename: string;
  htmlElementCount: number;
  customElementCount: number;
  details: object;
}

export enum ElementType {
  HTML,
  Custom,
}

export type tDetail = [string, number];
