import React, { createContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { randomId } from '../utils/math';

export const OutsidePressContext = createContext();

function OutsidePressProvider({ children, style }) {
  const execCallbackMap = useRef(new Map());
  const skipCbSet = useRef(new Set());

  const subscribe = (callback) => {
    const viewId = randomId();
    execCallbackMap.current.set(viewId, callback);

    return {
      unsubscribe: () => execCallbackMap.current.delete(viewId),
      viewId,
    };
  };

  const handleTouchStart = () => {
    execCallbackMap.current.forEach((cb, id) => {
      if (!skipCbSet.current.has(id)) {
        cb();
      }
    });
    skipCbSet.current.clear();
  };

  const addSkipView = (id) => {
    skipCbSet.current.add(id);
  };

  const value = {
    subscribe,
    addSkipView,
  };

  return (
    <OutsidePressContext.Provider value={value}>
      <View style={[styles.container, style]} onTouchStart={handleTouchStart}>
        {children}
      </View>
    </OutsidePressContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OutsidePressProvider;
