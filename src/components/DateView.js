import React from 'react';
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
      {dateList.map((d) => (
        <View key={d} style={styles.dataSelector}>
          <Text style={styles.day}>{DayNames[d.getDay()]}</Text>
          <Text style={styles.date}>{d.toISOString().split('T')[0].replaceAll('-', '/')}</Text>
        </View>
      ))}
    </Swiper>
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
  swiperContainer: {
    flex: 0,
  },
});

export default DateView;
