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
export const TODAY = new Date().getDay();

export const getSundayTime = () => {
  return new Date().getTime() - ONE_DAY_TIME * TODAY;
};

export const getDateArray = () => {
  const res = [];

  for (let i = 0; i < 7; i++) {
    res.push(new Date(getSundayTime() + ONE_DAY_TIME * i));
  }

  return res;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getMonthDayArray = (year, month) => {
  const totalDaysInMonth = getDaysInMonth(year, month);
  const firstDate = new Date(year, month - 1, 1).getDay();

  const daysArray = new Array(43);

  for (let i = 0; i < firstDate; i++) {
    daysArray[i] = {
      day: new Date(year, month - 1, 0).getDate() - firstDate + i + 1,
      month: month - 1,
    };
  }

  for (let i = 0; i < totalDaysInMonth; i++) {
    daysArray[firstDate + i] = { day: i + 1, month };
  }

  for (let i = 0; i < 42 - totalDaysInMonth - firstDate; i++) {
    daysArray[totalDaysInMonth + firstDate + i + 1] = { day: i + 1, month: month + 1 };
  }

  return daysArray;
};
