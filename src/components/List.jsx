import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import Item from './ListItem';
import ListHiddenItem from './ListHiddenItem';

import { randomId } from '../utils/math';

function List() {
  const [todos, setTodos] = useState([]);
  const [isAddingMode, setisAddingMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddPress = () => {
    setisAddingMode(true);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    setisAddingMode(false);

    if (inputValue.length > 0) {
      setTodos((prev) => [
        {
          key: randomId(),
          title: inputValue,
        },
        ...prev,
      ]);
    }

    setInputValue('');
  };

  const handleDelete = (key) => {
    setTodos((prev) => prev.filter((todo) => todo.key !== key));
  };

  const handleGestureEnded = (rowKey, data) => {
    if (data.translateX < -300) {
      handleDelete(rowKey);
    }
  };

  return (
    <View style={styles.container}>
      {isAddingMode && (
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={inputValue}
          autoFocus={isAddingMode}
          onBlur={handleInputBlur}
          returnKeyType="done"
        />
      )}
      {todos.length ? (
        <SwipeListView
          swipeRowStyle={styles.list}
          data={todos}
          renderItem={(data, rowMap) => <Item title={data.item.title} />}
          renderHiddenItem={(data, rowMap) => (
            <ListHiddenItem data={data} onDelete={handleDelete} />
          )}
          rightOpenValue={-150}
          disableRightSwipe
          rightActivationValue={-300}
          rightActionValue={-375}
          swipeGestureEnded={handleGestureEnded}
        />
      ) : (
        <View style={styles.noTodo}>
          <Text>No To Do Items</Text>
        </View>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.shadowProp,
          pressed && styles.buttonPressed,
          pressed && styles.shadowPropPressed,
        ]}
        onPress={handleAddPress}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 67,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#292929',
    padding: 10,
    marginTop: 20,
    zIndex: 999,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#292929',
  },
  list: {
    marginTop: 12,
  },
  button: {
    backgroundColor: '#7572FF',
    borderRadius: 999,
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 80,
    color: 'white',
    marginTop: -31,
  },
  shadowProp: {
    shadowColor: '#969696',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonPressed: {
    backgroundColor: '#a4a2fc',
  },
  shadowPropPressed: {
    shadowColor: '#969696',
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  noTodo: {
    flex: 1,
    alignItems: 'center',
    margin: 72,
  },
});

export default List;
