import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Context} from '../Context/HealthData';
import {Context as HealthKit} from '../Context/HealthKitPermissions';
import Slider from '@react-native-community/slider';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

// The Goal Settings screen allows the user to customize how the score should be calculated

const GoalSettings = ({navigation, route}) => {
  const [healthData, setHealthData] = useContext(Context);
  const [weight, setWeight] = useState(route.params.weight);
  const [goal, setGoal] = useState(route.params.goal);
  const [permissions, setPermissions] = useContext(HealthKit);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const saveGoal = (goal) => {
    let healthDataCopy = [...healthData];
    healthDataCopy.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        dataset.goal = goal;
      }
    });
    setHealthData(healthDataCopy);
  };

  // Weight allows the user to put emphasis on one or more parameters (Factor 0-5)
  // !! Maybe create a modal that informs the user about the meaning of '0'

  const saveWeight = (weight) => {
    let healthDataCopy = [...healthData];
    healthDataCopy.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        dataset.weight = weight;
      }
    });
    setHealthData(healthDataCopy);
  };

  const removeParameter = () => {
    let healthDataCopy = [...healthData];
    let permissionsCopy = permissions.permissions
      ? [...permissions.permissions.read]
      : [];
    healthDataCopy.forEach((dataset, index) => {
      if (dataset.name === route.params.name) {
        healthDataCopy.splice(index, 1);
      }
    });
    permissionsCopy.forEach((dataset, index) => {
      if (dataset === route.params.permission) {
        permissionsCopy.splice(index, 1);
      }
    });
    setHealthData(healthDataCopy);
    setPermissions({permissions: {read: permissionsCopy, write: []}});
    navigateBack();
  };

  // Upon Changes the props should be reloaded
  useEffect(() => {
    healthData.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        setGoal(dataset.goal);
        setWeight(dataset.weight);
      }
    });
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <TopNavigation
        title={route.params.name}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{alignItems: 'center'}}>
        <Text category="h5" style={{marginVertical: 20}}>
          Change Daily Goal
        </Text>
        <Text>
          {goal} {route.params.measure}
        </Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          value={goal}
          step={route.params.increment}
          onValueChange={(value) => saveGoal(value)}
          maximumValue={route.params.max}
        />
      </Layout>
      <Layout style={{alignItems: 'center'}}>
        <Text category="h5" style={{marginVertical: 20}}>
          Weight
        </Text>
        <Text>{weight}</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={5}
          step={0.25}
          onValueChange={(value) => saveWeight(value)}
          value={weight}
        />
      </Layout>
      <Layout style={{alignItems: 'center'}}>
        <Button
          appearance="ghost"
          status="danger"
          onPress={() => {
            removeParameter();
          }}>
          Remove Parameter
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default GoalSettings;
