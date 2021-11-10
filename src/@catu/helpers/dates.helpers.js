export function getDefaultDates() {
  let date_start, date_end;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const thisYear = today.getFullYear();
  if (thisMonth >= 10) {
    date_start = new Date(thisYear, 9, 1);
    date_end = new Date(thisYear + 1, 8, 30);
  } else {
    date_start = new Date(thisYear, 9, 1);
    date_end = new Date(thisYear, 8, 30);
  }
  return [date_start, date_end];
}

/**
 * Returns an array of Date objects of a the week
 * of a given data starting with sunday
 * @param Date current
 * @author Mohheddine K.
 * @returns Array<Date>
 */
export function daysOfAWeek(current) {
  const week = [];
  if (!isValidDate(current)) {
    return week;
  }
  let first = current.getDate() - current.getDay();
  for (let i = 0; i < 7; i++) {
    week.push(new Date(current.setDate(first++)));
  }
  return week;
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function isSameDay(day, today) {
  if (!day || !today) return false;
  return (
    today.getDate() === day.getDate() &&
    today.getMonth() === day.getMonth() &&
    today.getFullYear() === day.getFullYear()
  );
}
