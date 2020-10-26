import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/Home';
import OptionsScreen from '../Screens/Options';
import GoalScreen from '../Screens/GoalSettings';
import ParameterScreen from '../Screens/ParameterAddition';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const {Navigator, Screen} = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const EmailIcon = (props) => <Icon {...props} name="email-outline" />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="SCORE" icon={PersonIcon} />
    <BottomNavigationTab title="OPTIONS" icon={SettingsIcon} />
  </BottomNavigation>
);

// All Screens need to be defined here to be adressable with 'navigation.[name]'
const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Score" component={HomeScreen} />
    <Screen name="Options" component={OptionsScreen} />
    <Screen name="GoalSettings" component={GoalScreen} />
    <Screen name="ParameterAddition" component={ParameterScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
