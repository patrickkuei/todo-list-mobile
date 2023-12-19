import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function ListItem({ title }) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = (isChecked) => {
    setIsChecked(isChecked);
  };

  return (
    <BouncyCheckbox
      text={title}
      style={styles.item}
      textStyle={[isChecked ? styles.textColorChecked : styles.textColor]}
      onPress={handlePress}
      fillColor="#8390FF"
      unfillColor="white"
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#D7EBF9',
    borderRadius: 4,
    padding: 20,
    height: 81,
  },
  textColor: {
    color: '#292929',
  },
  textColorChecked: {
    color: '#D9D9D9',
  },
});

export default ListItem;
