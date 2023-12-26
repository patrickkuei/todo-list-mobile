import React, { useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { OutsidePressContext } from '../context/OutsidePressContext';

function OutsidePressView({ children, onPressOutside }) {
  const { subscribe, addSkipView } = useContext(OutsidePressContext);
  const viewIdRef = useRef();

  useEffect(() => {
    const { unsubscribe, viewId } = subscribe(onPressOutside);
    viewIdRef.current = viewId;

    return () => {
      unsubscribe();
    };
  }, [onPressOutside]);

  const handleTouchSelf = () => {
    addSkipView(viewIdRef.current);
  };

  return <View onTouchStart={handleTouchSelf}>{children}</View>;
}

export default OutsidePressView;
