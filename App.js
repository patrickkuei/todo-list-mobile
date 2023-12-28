import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Main from './src/Main.jsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#436E9E',
    flex: 1,
  },
});
