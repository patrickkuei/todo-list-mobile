import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
  },
  constantDay: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  constantDayContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(165, 165, 165, 0.43)',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: -8,
    marginTop: -38,
  },
  constantDayText: {
    color: '#727272',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  date: {
    color: '#434242',
    fontSize: 24,
  },
  dateContainer: {
    height: 90,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  dayContainer: {
    alignItems: 'center',
    height: 80,
    width: 50,
  },
  dayText: {
    color: '#434242',
    fontSize: 18,
  },
  disableDay: {
    backgroundColor: '#e8e6e6',
  },
  disableDayText: {
    color: '#ccc8c8',
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  todayText: {
    fontWeight: 'bold',
  },
});

export default SimpleCalendar;
