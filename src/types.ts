export interface fileScanResult {
  filename: string;
  htmlElementCount: number;
  customElementCount: number;
  details: object;
}

export enum ElementType {
  HTML,
  Custom,
}
