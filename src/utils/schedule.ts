import moment from "moment";

export type NumberRange = {
  start: number;
  end: number;
};

const isOverlap = (a: NumberRange, b: NumberRange): boolean => {
  const {start: a1, end: a2} = a;
  const {start: b1, end: b2} = b;
  return Math.max(a2, b2) - Math.min(a1, b1) < a2 - a1 + b2 - b1;
};

const isValidSchedule = (
  books: NumberRange[],
  target: NumberRange,
  isSorted: boolean = false,
): boolean => {
  if (!isSorted) {
    books.sort((a, b) => a.start - b.start);
  }
  for (const book of books) {
    // Doesn't handle overflow. If javascript has overflow anyway
    if (isOverlap(book, target)) {
      return false;
    }
  }
  return true;
};

// Shamelessly O(N^2)
const filterSchedules = (
  schedules: NumberRange[],
  books: NumberRange[],
): NumberRange[] => {
  schedules.sort((a, b) => a.start - b.start);
  books.sort((a, b) => a.start - b.start);
  let result: NumberRange[] = [];
  for (const schedule of schedules) {
    let pass = true;
    for (const book of books) {
      if (book.start > schedule.end) {
        break;
      }
      if (isOverlap(schedule, book)) {
        pass = false;
        break;
      }
    }
    if (pass) {
      result.push(schedule);
    }
  }
  return result;
};

const getMsTimeDate = (
  date: Date,
  hours: number,
  round?: "up" | "down",
): number => {
  let res = moment(date).hours(hours);
  if (round === "up") {
    res = res.endOf("h").add(1, "milliseconds");
  } else if (round === "down") {
    res = res.startOf("h");
  }
  return res.toDate().getTime();
};

const toLocalAsUTC = (dt: Date) => moment(dt).add(7, "hours").toDate();

export const scheduleUtils = {
  isValidSchedule,
  filterSchedules,
  getMsTimeDate,
  toLocalAsUTC,
};
