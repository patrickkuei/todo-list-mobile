import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import Bin from '../image/trash-svgrepo-com';
import Edit from '../image/pen-field-svgrepo-com';

function ListHiddenItem({ data, onDelete }) {
  const handleDelete = () => {
    onDelete(data.item.key);
  };

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <View style={styles.rowBack}>
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 4,
    backgroundColor: '#F3FAFF',
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
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
});

export default ListHiddenItem;
