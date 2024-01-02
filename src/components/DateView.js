import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';

import { DayNames } from '../utils/date';

function DateView({ dateList, onIndexChanged, today }) {
  return (
    <Swiper
      containerStyle={styles.swiperContainer}
      height={83}
      showsPagination={false}
      loop={false}
      loadMinimal={true}
      index={today}
      onIndexChanged={onIndexChanged}
    >
      {dateList.map((d, i) => (
        <View key={d} style={styles.dataSelector}>
          <Text style={styles.day}>{DayNames[i]}</Text>
          <Text style={styles.date}>{d.toISOString().split('T')[0].replaceAll('-', '/')}</Text>
        </View>
      ))}
    </Swiper>
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
});

export default DateView;
