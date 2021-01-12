import {v4} from "uuid";
import base64 from "js-base64";

export const serialUtils = {
  generate: () => v4(),
  createCursor: (serial: string, date: Date) =>
    base64.encode(serial + "," + date.toISOString()),
  decodeCursor: (value?: string | null): [string | null, Date | null] => {
    try {
      if (!value) {
        throw null;
      }
      const [serial, isoDate] = base64.decode(value).split(",");
      return [serial, new Date(isoDate)];
    } catch (error) {
      return [null, null];
    }
  },
};
