declare module "get-age" {
  export default (dateStr: string) => number;
}

declare module "big-roman" {
  export const numberToRoman: (value: number) => string;
  export const romanToNumber: (str: string) => number;
}
