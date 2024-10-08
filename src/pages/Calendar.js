import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import SimpleCalendar from '../components/Calendar';

function Calendar({ navigation }) {
  return <SimpleCalendar navigation={navigation} />;
}

export default Calendar;
