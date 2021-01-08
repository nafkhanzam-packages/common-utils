import moment from "moment";

export type DateInput = Date | string;

export const format = {
  datetime: "YYYY-MM-DD HH:mm[:ss]",
  date: "YYYY-MM-DD",
  time: "HH:mm[:ss]",
};

export const getMoment = (
  date: DateInput,
  type?: keyof typeof format,
): moment.Moment => {
  if (typeof date === "string") {
    return moment(date, format[type ?? "datetime"]);
  } else {
    return moment(date);
  }
};
