import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';

import { DAYS_ARRAY, getMonthDayArray } from '../utils/date';

const SimpleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const monthDayArray = getMonthDayArray(year, month);

  const getTitle = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();

    return `${currentMonth} ${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.constantDayContainer}>
        {DAYS_ARRAY.map((DAY, i) => (
          <View key={i} style={styles.constantDay}>
            <Text style={styles.constantDayText}>{DAY}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{getTitle()}</Text>
      </View>
      <View style={styles.calendarContainer}>
        {monthDayArray.map(({ day, month }, i) => (
          <CalendarDay key={i} day={day} month={month} index={i} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  constantDayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(165, 165, 165, 0.43)',
    marginTop: -38,
    marginHorizontal: -8,
  },
  constantDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  constantDayText: {
    color: '#727272',
  },
  dateContainer: {
    height: 90,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  date: {
    fontSize: 24,
    color: '#434242',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    justifyContent: 'flex-start',
  },
  dayContainer: {
    width: 50,
    height: 80,
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  todayText: {
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 18,
    color: '#434242',
  },
  disableDay: {
    backgroundColor: '#e8e6e6',
  },
  disableDayText: {
    color: '#ccc8c8',
  },
});

export default SimpleCalendar;