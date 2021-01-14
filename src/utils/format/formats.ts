import {numberToRoman, romanToNumber} from "big-roman";
import getAge from "get-age";

export const formats = {
  toAge: (dateStr: string): number => getAge(dateStr),
  numberToRoman: (value: number): string => numberToRoman(value),
  romanToNumber: (str: string): number => romanToNumber(str),
};
