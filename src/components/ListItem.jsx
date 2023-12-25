import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useDebounce from '../hooks/useDebounce';

import updateTodo from '../apis/updateTodo';

function ListItem(props) {
  const { item, onChecked, rowMap } = props;
  const { title, key } = item;
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = (isChecked) => {
    setIsChecked(isChecked);
    onChecked(key, isChecked);
    rowMap[key].closeRow();
  };

  const debouncedIsChecked = useDebounce(isChecked, 1000);

  useEffect(() => {
    updateTodo({
      ...item,
      isChecked: debouncedIsChecked,
    });
  }, [debouncedIsChecked]);

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
