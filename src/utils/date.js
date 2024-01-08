export const DayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const DAYS_ARRAY = ['s', 'm', 't', 'w', 't', 'f', 's'];

export const ONE_DAY_TIME = 86400000;

export const getSundayTime = (selectedDate) => {
  return selectedDate.getTime() - ONE_DAY_TIME * selectedDate.getDay();
};

export const getDateArray = (selectedDate) => {
  const res = [];

  for (let i = 0; i < 7; i++) {
    res.push(new Date(getSundayTime(selectedDate) + ONE_DAY_TIME * i));
  }

  return res;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthDayArray = (year, month, todoCount) => {
  const totalDaysInMonth = getDaysInMonth(year, month);
  const firstDate = new Date(year, month - 1, 1).getDay();

  const daysArray = new Array(42);

  const lastMonth = month === 1 ? 12 : month - 1;
  const nextMonth = month === 12 ? 1 : month + 1;
  const lastYear = month === 1 ? year - 1 : year;
  const nextYear = month === 12 ? year + 1 : year;

  for (let i = 0; i < firstDate; i++) {
    daysArray[i] = {
      day: new Date(year, month - 1, 0).getDate() - firstDate + i + 1,
      month: lastMonth,
      year: lastYear,
    };
  }

  for (let i = 0; i < totalDaysInMonth; i++) {
    daysArray[firstDate + i] = {
      day: i + 1,
      month,
      year,
      todo: todoCount[i + 1]?.todos || 0,
      done: todoCount[i + 1]?.done || 0,
    };
  }

  for (let i = 0; i < 42 - totalDaysInMonth - firstDate; i++) {
    daysArray[totalDaysInMonth + firstDate + i] = {
      day: i + 1,
      month: nextMonth,
      year: nextYear,
    };
  }

  return daysArray;
};
