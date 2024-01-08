import React from 'react';
import * as Haptics from 'expo-haptics';
import { StyleSheet, View, Text, Pressable } from 'react-native';

function Home({ navigation }) {
  const handleNavigate = (destination) => {
    navigation.navigate(destination);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
        onPress={() => handleNavigate('Todolist')}
      >
        {({ pressed }) => (
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>Todo List</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
        onPress={() => handleNavigate('Calendar')}
      >
        {({ pressed }) => (
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>Calendar</Text>
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
          <Text style={pressed ? styles.buttonTextPressed : styles.buttonText}>Coming soon</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#D7EBF9',
    borderRadius: 4,
    height: 81,
    justifyContent: 'center',
    padding: 20,
    width: 300,
  },
  buttonPressed: {
    backgroundColor: '#dfedf7',
  },
  buttonText: {
    color: '#165698',
    fontSize: 20,
  },
  buttonTextPressed: {
    color: '#2b75c2',
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 36,
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#969696',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  shadowPropPressed: {
    shadowColor: '#969696',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
});

export default Home;
