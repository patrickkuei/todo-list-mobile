import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Haptics from 'expo-haptics';

import Item from './ListItem';
import ListHiddenItem from './ListHiddenItem';
import OutsidePressView from './OutsidePressView';
import AddIcon from '../image/pen-circle-svgrepo-com';

import useFetch from '../hooks/useFetch';
import addTodo from '../apis/addTodo';
import deleteTodo from '../apis/deleteTodo';
import updateTodo from '../apis/updateTodo';
import { randomId } from '../utils/math';

const useAddInput = (setTodos, selectedDate) => {
  const [inputValue, setInputValue] = useState('');
  const [isAddingMode, setIsAddingMode] = useState(false);

  const handleAddPress = () => {
    setIsAddingMode(true);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    setIsAddingMode(false);

    const key = randomId();
    const newTitle = inputValue.trim();

    if (newTitle.length > 0) {
      setTodos((prev) => [
        {
          key,
          title: newTitle,
          isChecked: false,
          last_update_date: selectedDate.toISOString(),
        },
        ...prev,
      ]);

      addTodo(newTitle, key, selectedDate.toISOString());
    }

    setInputValue('');
  };

  return {
    inputValue,
    handleInputChange,
    handleInputBlur,
    isAddingMode,
    handleAddPress,
  };
};

const useEditInput = (todos, setTodos) => {
  const [inputValue, setInputValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const targetKey = useRef(null);

  const handleEdit = ({ key, title }) => {
    setIsEditMode(true);
    targetKey.current = key;
    setInputValue(title);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    setIsEditMode(false);

    const newTitle = inputValue.trim();

    if (newTitle.length > 0) {
      setTodos((prev) => {
        const prevTodo = prev.find((todo) => todo.key === targetKey.current);

        return [
          {
            ...prevTodo,
            title: newTitle,
            last_update_date: new Date().toISOString(),
          },
          ...prev.filter((todo) => todo.key !== targetKey.current),
        ];
      });

      const oldTodo = todos.find((todo) => todo.key === targetKey.current);

      updateTodo({
        ...oldTodo,
        title: newTitle,
      });
    }

    setInputValue('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return {
    inputValue,
    handleInputChange,
    handleInputBlur,
    isEditMode,
    handleEdit,
  };
};

function List({ selectedDate }) {
  const { data: todos, upateData: setTodos, isLoading } = useFetch([]);

  const filterTodos = useMemo(
    () =>
      todos
        .filter(
          (todo) =>
            todo.isRoutine ||
            new Date(todo.last_update_date).toISOString().split('T')[0] ===
              selectedDate.toISOString().split('T')[0]
        )
        .sort((a, b) => {
          if (a.isRoutine && !b.isRoutine) {
            return -1; // a comes before b
          } else if (!a.isRoutine && b.isRoutine) {
            return 1; // b comes before a
          } else {
            return 0; // no change in order
          }
        }),
    [todos, isLoading, selectedDate]
  );

  const {
    inputValue: addInputValue,
    handleInputChange: handleAddInputChange,
    handleInputBlur: handleAddInputBlur,
    isAddingMode,
    handleAddPress,
  } = useAddInput(setTodos, selectedDate);

  const {
    inputValue: editInputValue,
    handleInputChange: handleEditInputChange,
    handleInputBlur: handleEditInputBlur,
    isEditMode,
    handleEdit,
  } = useEditInput(filterTodos, setTodos);

  const handleChecked = useCallback((key, isChecked) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.key === key) return { ...todo, isChecked };

        return todo;
      })
    );

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handleDelete = (key) => {
    setTodos((prev) => prev.filter((todo) => todo.key !== key));
    deleteTodo(key);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleGestureEnded = (rowKey, data) => {
    if (data.translateX < -300) {
      handleDelete(rowKey);
    }
  };

  return (
    <View style={[styles.container, isLoading && styles.center]}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {isAddingMode && !isEditMode && (
            <OutsidePressView onPressOutside={handleAddInputBlur}>
              <TextInput
                style={styles.input}
                onChangeText={handleAddInputChange}
                value={addInputValue}
                autoFocus={isAddingMode}
                onBlur={handleAddInputBlur}
                returnKeyType="done"
              />
            </OutsidePressView>
          )}
          {isEditMode && !isAddingMode && (
            <OutsidePressView onPressOutside={handleEditInputBlur}>
              <TextInput
                style={styles.input}
                onChangeText={handleEditInputChange}
                value={editInputValue}
                autoFocus={isEditMode}
                onBlur={handleEditInputBlur}
                returnKeyType="done"
              />
            </OutsidePressView>
          )}
          {filterTodos.length ? (
            <SwipeListView
              swipeRowStyle={styles.list}
              data={filterTodos}
              renderItem={(data, rowMap) => (
                <Item item={data.item} rowMap={rowMap} onChecked={handleChecked} />
              )}
              renderHiddenItem={(data, rowMap) => (
                <ListHiddenItem
                  data={data}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  rowMap={rowMap}
                  setTodos={setTodos}
                />
              )}
              rightOpenValue={-150}
              leftOpenValue={75}
              disableLeftSwipe={isEditMode || isAddingMode}
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
            <AddIcon width={80} height={80} color="#FFF" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
