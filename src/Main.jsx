import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Todolist from './pages/Todolist';
import Home from './pages/Home';
import Calendar from './pages/Calendar';

import OutsidePressProvider from './context/OutsidePressContext';

function Main() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <OutsidePressProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#436E9E',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Todolist" component={Todolist} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </OutsidePressProvider>
    </NavigationContainer>
  );
}

export default Main;
