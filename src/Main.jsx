import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Topbar from './components/Topbar';
import List from './components/List';

function Main() {
  return (
    <View style={styles.outterContainer}>
      <Topbar />
      <View style={styles.innterContainer}>
        <View>
          <Text style={styles.day}>TODAY</Text>
          <Text style={styles.date}>
            {new Date().toISOString().split('T')[0].replaceAll('-', '/')}
          </Text>
        </View>
        <List />
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
});

export default Main;
