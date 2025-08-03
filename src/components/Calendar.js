import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CalendarDay from './CalendarDay';

import useFetch from '../hooks/useFetch';

import { DAYS_ARRAY, getMonthDayArray } from '../utils/date';

const getTodoCountsByDate = (todos) => {
  const todoCountsByDate = {};

  todos.forEach((todo) => {
    const date = new Date(todo.last_update_date).toISOString().split('T')[0];

    if (todoCountsByDate[date]) {
      if (todo.isChecked) {
        todoCountsByDate[date].done++;
      } else {
        todoCountsByDate[date].todos++;
      }
    } else {
      if (todo.isChecked) {
        todoCountsByDate[date] = {
          todos: 0,
          done: 1,
        };
      } else {
        todoCountsByDate[date] = {
          todos: 1,
          done: 0,
        };
      }
    }
  });
  
  return todoCountsByDate;
};

const SimpleCalendar = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const getTitle = () => {
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

    return `${currentMonth} ${year}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleTodayPress = () => {
    setCurrentDate(new Date());
  };

  const { data: todos, isLoading } = useFetch([]);
  const todoCountsByDate = getTodoCountsByDate(todos);
  const monthDayArray = getMonthDayArray(year, month, todoCountsByDate);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.monthButton}>
          <Text style={styles.monthButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{getTitle()}</Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.monthButton}>
          <Text style={styles.monthButtonText}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTodayPress} style={styles.todayButton}>
          <Text style={styles.todayButtonText}>Today</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.constantDayContainer}>
        {DAYS_ARRAY.map((DAY, i) => (
          <View key={i} style={styles.constantDay}>
            <Text style={styles.constantDayText}>{DAY}</Text>
          </View>
        ))}
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="large" />
      ) : (
        <View style={styles.calendarContainer}>
          {monthDayArray.map(({ day, month, todo, done, year }, i) => {
            return (
              <CalendarDay
                key={i}
                year={year}
                day={day}
                month={month}
                index={i}
                todo={todo}
                done={done}
                navigation={navigation}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  },
  constantDayText: {
    color: '#727272',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  date: {
    color: '#434242',
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
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
  loading: {
    marginTop: '50%',
  },
  monthButton: {
    padding: 10,
  },
  monthButtonText: {
    color: '#434242',
    fontSize: 24,
  },
  todayButton: {
    padding: 10,
  },
  todayButtonText: {
    color: '#434242',
    fontSize: 18,
  },
  todayText: {
    fontWeight: 'bold',
  },
});

export default SimpleCalendar;
