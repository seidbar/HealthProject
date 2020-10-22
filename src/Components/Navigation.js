import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import Home from '../Screens/Home';
import Options from '../Screens/Options';

const Stack = createBottomTabNavigator();

const Navigation = ({healthData}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{healthData}}
        />
        <Stack.Screen name="Options" component={Options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
