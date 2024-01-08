import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function CalendarDay({ day, month, index }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDatePress = (date) => {
    // setSelectedDate(date);
    // You can perform actions based on the selected date here (e.g., fetch todos for the selected date)
  };

  const getBorderStyle = (index) => {
    const NUMBER_OF_DAYS_IN_ROW = 7;
    const currentRow = Math.floor(index / NUMBER_OF_DAYS_IN_ROW);
    const isFirstRow = currentRow === 0;
    const isFirstColumn = index % NUMBER_OF_DAYS_IN_ROW === 0;

    const border = {
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderColor: 'rgba(165, 165, 165, 0.43)',
    };

    if (isFirstRow) {
      border.borderTopWidth = 1;
    }
    if (isFirstColumn && index !== 42) {
      border.borderLeftWidth = 1;
    }

    return border;
  };

  return (
    <Pressable
      style={[
        styles.dayContainer,
        selectedDate === day && styles.selectedDay,
        getBorderStyle(index),
        new Date().getMonth() + 1 !== month && styles.disableDay,
      ]}
      onPress={() => handleDatePress(day)}
    >
      <View style={styles.dayCell}>
        <Text
          style={[
            new Date().getDate() === day && new Date().getMonth() + 1 === month && styles.todayText,
            styles.dayText,
            new Date().getMonth() + 1 !== month && styles.disableDayText,
          ]}
        >
          {day}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

export default CalendarDay;
