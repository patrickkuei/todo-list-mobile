import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
        onPress={() => navigation.navigate('Todolist')}
      >
        {({ pressed }) => (
          <Text style={[pressed ? styles.buttonTextPressed : styles.buttonText]}>Todo List</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
        onPress={() => navigation.navigate('Calendar')}
      >
        {({ pressed }) => (
          <Text style={[pressed ? styles.buttonTextPressed : styles.buttonText]}>Calendar</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
      >
        {({ pressed }) => (
          <Text style={[pressed ? styles.buttonTextPressed : styles.buttonText]}>Coming soon</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  button: {
    backgroundColor: '#D7EBF9',
    borderRadius: 4,
    padding: 20,
    height: 81,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#165698',
    fontSize: 20,
  },
  shadowProp: {
    shadowColor: '#969696',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonPressed: {
    backgroundColor: '#dfedf7',
  },
  shadowPropPressed: {
    shadowColor: '#969696',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  buttonTextPressed: {
    color: '#2b75c2',
    fontSize: 20,
  },
});

export default Home;
