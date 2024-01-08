import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CalendarDay from './CalendarDay';

import useFetch from '../hooks/useFetch';

import { DAYS_ARRAY, getMonthDayArray } from '../utils/date';

const getTodoCountsByDate = (filteredTodos) => {
  const todoCountsByDate = {};

  filteredTodos.forEach((todo) => {
    const date = new Date(todo.last_update_date).getDate();

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
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();

    return `${currentMonth} ${year}`;
  };

  const { data: todos, isLoading } = useFetch([]);
  const sortedTodos = todos.sort((a, b) => {
    return new Date(a.last_update_date) - new Date(b.last_update_date);
  });
  const filteredTodos = sortedTodos.filter((todo) => {
    return (
      new Date(todo.last_update_date).getFullYear() === currentDate.getFullYear() &&
      new Date(todo.last_update_date).getMonth() === currentDate.getMonth()
    );
  });

  const todoCountsByDate = getTodoCountsByDate(filteredTodos);
  const monthDayArray = getMonthDayArray(year, month, todoCountsByDate);

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
  loading: {
    marginTop: '50%',
  },
  todayText: {
    fontWeight: 'bold',
  },
});

export default SimpleCalendar;
