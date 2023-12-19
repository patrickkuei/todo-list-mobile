import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

function Topbar() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>TODOLIST</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#436E9E',
      height: 100,
      justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 36,
    }
  });
  
export default Topbar