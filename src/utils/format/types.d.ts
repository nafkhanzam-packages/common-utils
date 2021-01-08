type DateInput = Date | string;
const getMoment = (
  date: DateInput,
  type?: keyof typeof format,
): moment.Moment => {
  if (typeof date === "string") {
    return moment(date, format[type ?? "datetime"]);
  } else {
    return moment(date);
  }
};

export {};
