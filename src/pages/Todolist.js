import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import List from '../components/List';
import DateView from '../components/DateView';

import { getDateArray } from '../utils/date';

function Todolist({ route }) {
  const { date } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date());

  const onIndexChanged = (index) => {
    setSelectedDate(dateList[index]);
  };

  const today = date ? new Date(date) : new Date();
  const dateList = getDateArray(today);

  return (
    <View style={styles.outterContainer}>
      <View style={styles.innterContainer}>
        <DateView dateList={dateList} onIndexChanged={onIndexChanged} today={today.getDay()} />
        <List selectedDate={selectedDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    color: '#A2B7CE',
    fontSize: 16,
  },
  day: {
    color: '#165698',
    fontSize: 26,
  },
  innterContainer: {
    flex: 1,
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  },
  outterContainer: {
    flex: 1,
  },
  swiperContainer: {
    flex: 0,
  },
});

export default Todolist;
