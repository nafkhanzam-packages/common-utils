import {DateInput, getMoment} from "./utils";

const toDate = (date: DateInput) => {
  return getMoment(date).format("DD MMMM YYYY");
};

const toHM = (date: DateInput) => {
  return getMoment(date).format("HH:mm");
};

const toHMS = (date: DateInput) => {
  return getMoment(date).format("HH:mm:ss");
};

const toDateTime = (date: DateInput) => {
  return `${toHM(date)} ${toDate(date)}`;
};

const toMoneyString = (value: number) => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

const toRpString = (value: number) => {
  return `Rp ${toMoneyString(value)}`;
};

const toRpPerUnitString = (value: number, unit: string) => {
  return `${toRpString(value)} / ${unit}`;
};

const toPhoneString = (phone: string) => {
  const prefix = "+62";
  if (phone.startsWith("0")) {
    return prefix + phone.substr(1);
  } else if (phone.startsWith(prefix)) {
    return phone;
  }
  return prefix + phone;
};

export const formatToString = {
  toDate,
  toHM,
  toHMS,
  toDateTime,
  toMoneyString,
  toRpString,
  toPhoneString,
  toRpPerUnitString,
};
