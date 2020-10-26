import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/Home';
import OptionsScreen from '../Screens/Options';
import GoalScreen from '../Screens/GoalSettings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="SCORE" />
    <BottomNavigationTab title="OPTIONS" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Score" component={HomeScreen} />
    <Screen name="Options" component={OptionsScreen} />
    <Screen name="GoalSettings" component={GoalScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
