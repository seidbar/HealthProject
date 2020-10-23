import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import Home from '../Screens/Home';
import Options from '../Screens/Options';

const Stack = createBottomTabNavigator();

const Navigation = ({healthData}) => {
  useEffect(() => {
    console.log(healthData);
  });

  return (
    <Home healthData={healthData} />
    /*   <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} healthData={{healthData}} />
        <Stack.Screen name="Options" component={Options} />
      </Stack.Navigator>
    </NavigationContainer>
  ); */
  );
};

export default Navigation;
