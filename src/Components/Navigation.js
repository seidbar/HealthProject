import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/Home';
import OptionsScreen from '../Screens/Options';
import GoalScreen from '../Screens/GoalSettings';
import TrendsScreen from '../Screens/Trends';
import ParameterScreen from '../Screens/ParameterAddition';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const {Navigator, Screen} = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
const ChartIcon = (props) => <Icon {...props} name="bar-chart-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="options-2-outline" />;

const BottomTabBar = ({navigation, state}) => (
  <SafeAreaView>
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="SCORE" icon={PersonIcon} />
      <BottomNavigationTab title="TRENDS" icon={ChartIcon} />
      <BottomNavigationTab title="OPTIONS" icon={SettingsIcon} />
    </BottomNavigation>
  </SafeAreaView>
);

// All Screens need to be defined here to be adressable with 'navigation.[name]'
const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Score" component={HomeScreen} />
    <Screen name="Trends" component={TrendsScreen} />
    <Screen name="Options" component={OptionsScreen} />
    <Screen name="GoalSettings" component={GoalScreen} />
    <Screen name="ParameterAddition" component={ParameterScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);
