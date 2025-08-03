import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

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
  if (isFirstColumn) {
    border.borderLeftWidth = 1;
  }

  return border;
};

function CalendarDay({ year, day, month, index, todo, done, navigation }) {
  const isCurrentMonth = new Date().getMonth() + 1 === month;
  const isCurrentYear = new Date().getFullYear() === year;
  const isToday =
    new Date().getDate() === day &&
    isCurrentMonth &&
    isCurrentYear;
  
  const handleDatePress = () => {
    if (!isCurrentMonth || !isCurrentYear) return;

    navigation.navigate('Todolist', { date: Date.UTC(year, month - 1, day) });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.dayContainer,
        getBorderStyle(index),
        (!isCurrentMonth || !isCurrentYear) && styles.disableDay,
        pressed && styles.shadowPropPressed,
      ]}
      onPress={() => handleDatePress()}
    >
      <View style={styles.dayCell}>
        <View style={styles.dayTextContainer}>
          <View style={isToday && styles.todayBackground}>
            <Text
              style={[
                styles.dayText,
                isToday && styles.todayText,
                (!isCurrentMonth || !isCurrentYear) && styles.disableDayText,
              ]}
            >
              {day}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.dayCellText, styles.todoColor, (!todo || !isCurrentMonth || !isCurrentYear) && styles.disableDayText]}>
            todo: {todo ?? 0}
          </Text>
          <Text style={[styles.dayCellText, styles.doneColor, (!done || !isCurrentMonth || !isCurrentYear) && styles.disableDayText]}>
            done: {done ?? 0}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    gap: 5,
  },
  dayCellText: {
    fontFamily: 'Menlo',
    fontSize: 9,
  },
  dayContainer: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 80,
    width: 50,
  },
  dayText: {
    color: '#434242',
    fontSize: 18,
  },
  dayTextContainer: {
    alignItems: 'center',
  },
  disableDay: {
    backgroundColor: '#e8e6e6',
  },
  disableDayText: {
    color: '#ccc8c8',
  },
  doneColor: {
    color: '#2E496D',
  },
  shadowPropPressed: {
    shadowColor: '#969696',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  todayBackground: {
    alignItems: 'center',
    backgroundColor: '#436E9E',
    borderRadius: 50,
    width: 25,
  },
  todayText: {
    color: 'white',
  },
  todoColor: {
    color: '#628FB5',
  },
});

export default CalendarDay;
