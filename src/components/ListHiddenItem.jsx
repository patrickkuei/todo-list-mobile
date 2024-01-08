import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import updateTodo from '../apis/updateTodo';

import Bin from '../image/trash-svgrepo-com';
import Edit from '../image/pen-field-svgrepo-com';
import Bookmark from '../image/bookmark-svgrepo-com';

function ListHiddenItem({ data, onDelete, onEdit, rowMap, setTodos }) {
  const handleDelete = () => {
    onDelete(data.item.key);
    rowMap[data.item.key].closeRow();
  };

  const handleEdit = () => {
    onEdit(data.item);
    rowMap[data.item.key].closeRow();
  };

  const handleBookmark = () => {
    setTodos((prev) => {
      const prevTodo = prev.find((todo) => todo.key === data.item.key);

      return [
        {
          ...prevTodo,
          last_update_date: new Date().toISOString(),
          isRoutine: !prevTodo.isRoutine,
        },
        ...prev.filter((todo) => todo.key !== data.item.key),
      ];
    });

    const oldTodo = data.item;

    updateTodo({
      ...oldTodo,
      isRoutine: !oldTodo.isRoutine,
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    rowMap[data.item.key].closeRow();
  };

  return (
    <View style={styles.rowBack}>
      <View style={styles.backRightBtn}>
        <Pressable onPress={handleBookmark}>
          <Bookmark width={30} height={30} color="#000" isStroke={true} />
        </Pressable>
      </View>
      <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Pressable onPress={handleEdit}>
          <Edit />
        </Pressable>
      </View>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Pressable onPress={handleDelete}>
          <Bin />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#F3FAFF',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

export default ListHiddenItem;
