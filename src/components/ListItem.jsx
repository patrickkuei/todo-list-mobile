import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Bookmark from '../image/bookmark-svgrepo-com';

import updateTodo from '../apis/updateTodo';
import debounce from '../utils/debounce';

const ListItem = React.memo((props) => {
  const { item, onChecked, rowMap } = props;
  const { title, key, isChecked: remoteIsChecked, isRoutine } = item;
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
      textComponent={<Title text={title} isChecked={isChecked} isRoutine={isRoutine} />}
      style={styles.item}
      onPress={handlePress}
      fillColor="#8390FF"
      unfillColor="white"
      isChecked={isChecked}
    />
  );
});

const Title = ({ text, isChecked, isRoutine }) => {
  return (
    <View style={styles.container}>
      {isRoutine && (
        <View style={styles.iconContainer}>
          <Bookmark width={30} height={30} color="#330099" />
        </View>
      )}
      <Text style={isChecked ? styles.textColorChecked : styles.customTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginLeft: 16,
  },
  customTitle: {
    color: '#292929',
    fontSize: 16,
  },
  iconContainer: {
    left: -30,
    position: 'absolute',
    top: -35,
  },
  item: {
    backgroundColor: '#D7EBF9',
    borderRadius: 4,
    height: 81,
    padding: 20,
  },
  textColor: {
    color: '#292929',
  },
  textColorChecked: {
    color: '#D9D9D9',
  },
});

ListItem.displayName = 'ListItem';

export default ListItem;
