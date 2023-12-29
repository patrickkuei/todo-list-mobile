import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import updateTodo from '../apis/updateTodo';
import debounce from '../utils/debounce';

const ListItem = React.memo((props) => {
  const { item, onChecked, rowMap } = props;
  const { title, key, isChecked: remoteIsChecked } = item;
  const [isChecked, setIsChecked] = useState(remoteIsChecked);

  const debouncedAPICall = debounce(
    (isChecked) =>
      updateTodo({
        ...item,
        isChecked,
      }),
    1000
  );

  const handlePress = (isChecked) => {
    setIsChecked(isChecked);
    onChecked(key, isChecked);
    debouncedAPICall(isChecked);

    rowMap[key].closeRow();
  };

  return (
    <BouncyCheckbox
      text={title}
      style={styles.item}
      textStyle={[isChecked ? styles.textColorChecked : styles.textColor]}
      onPress={handlePress}
      fillColor="#8390FF"
      unfillColor="white"
      isChecked={isChecked}
    />
  );
});

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
