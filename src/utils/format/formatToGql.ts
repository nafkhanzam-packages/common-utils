import {DateInput, format, getMoment} from "./utils";

const toDate = (date: DateInput) => {
  return getMoment(date).format(format.date);
};

const toHMS = (date: DateInput) => {
  return getMoment(date).format("HH:mm:ss");
};

const toHM = (date: DateInput) => {
  return getMoment(date).format("HH:mm");
};

const toDateTime = (date: DateInput) => {
  return `${toDate(date)} ${toHMS(date)}`;
};

const toErrorStatus = (err: any): string | undefined => {
  try {
    return err.response.errors[0].status;
  } catch (error) {}
};

export const formatToGql = {
  toDateTime,
  toDate,
  toHMS,
  toHM,
  toErrorStatus,
};
