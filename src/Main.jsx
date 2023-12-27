import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Topbar from './components/Topbar';
import List from './components/List';
import OutsidePressProvider from './context/OutsidePressContext';
import DateView from './components/DateView';

const ONE_DAY_TIME = 86400000;
const TODAY = new Date().getDay();

const getSundayTime = () => {
  return new Date().getTime() - ONE_DAY_TIME * TODAY;
};

const getDateArray = () => {
  const res = [];

  for (let i = 0; i < 7; i++) {
    res.push(new Date(getSundayTime() + ONE_DAY_TIME * i));
  }

  return res;
};

function Main() {
  const dateList = getDateArray();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onIndexChanged = (index) => {
    console.log('onIndexChanged', dateList[index]);
    setSelectedDate(dateList[index]);
    console.log(selectedDate);
  };

  return (
    <OutsidePressProvider>
      <View style={styles.outterContainer}>
        <Topbar />
        <View style={styles.innterContainer}>
          <DateView dateList={dateList} onIndexChanged={onIndexChanged} today={TODAY} />
          <List selectedDate={selectedDate} />
        </View>
      </View>
    </OutsidePressProvider>
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

export default Main;
