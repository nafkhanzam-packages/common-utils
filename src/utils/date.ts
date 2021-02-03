import moment from "moment";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const dateUtils = {
  daysInCurrentMonth: (): number => moment().daysInMonth(),
  getWeekdayInCurrentMonth: (day: number): DayIndex =>
    moment().startOf("month").add(day, "day").weekday() as DayIndex,
  getWeekday: (date: string | Date): DayIndex =>
    moment(date).weekday() as DayIndex,
  firstDayOfCurrentMonth: (): Date => moment().startOf("month").toDate(),
  lastDayOfCurrentMonth: (): Date => moment().endOf("month").toDate(),
  yearDiff: (a: Date, b: Date): number =>
    new Date(Math.abs(a.getTime() - b.getTime())).getFullYear() - 1970,
  getToday: (): Date => moment().startOf("day").toDate(),
  getAge(a: Date, b: Date) {
    var ageDifMs = Math.abs(a.getTime() - b.getTime());
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
  getRemainingSeconds: (endDateTime: Date) =>
    moment.duration(moment(endDateTime).diff(moment())).asSeconds(),
};
