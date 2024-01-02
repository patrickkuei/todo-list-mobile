import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import List from '../components/List';
import DateView from '../components/DateView';

import { TODAY, getDateArray } from '../utils/date';

function Todolist() {
  const dateList = getDateArray();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onIndexChanged = (index) => {
    setSelectedDate(dateList[index]);
  };

  return (
    <View style={styles.outterContainer}>
      <View style={styles.innterContainer}>
        <DateView dateList={dateList} onIndexChanged={onIndexChanged} today={TODAY} />
        <List selectedDate={selectedDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 0,
  },
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
});

export default Todolist;
