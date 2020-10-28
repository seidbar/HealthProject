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

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

// The Goal Settings screen allows the user to customize how the score should be calculated

const GoalSettings = ({navigation, route}) => {
  const [healthData, setHealthData] = useContext(Context);
  const [weight, setWeight] = useState(route.params.weight);
  const [goal, setGoal] = useState(route.params.goal);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const saveGoal = (increase) => {
    let healthDataCopy = [...healthData];
    healthDataCopy.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        dataset.goal =
          dataset.goal + increase < 0 ? 0 : dataset.goal + increase;
      }
    });
    setHealthData(healthDataCopy);
  };

  // Weight allows the user to put emphasis on one or more parameters (Factor 0-5)
  // !! Maybe create a modal that informs the user about the meaning of '0'

  const saveWeight = (increase) => {
    let healthDataCopy = [...healthData];
    healthDataCopy.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        dataset.weight =
          dataset.weight + increase > 4
            ? 5
            : dataset.weight + increase < 0
            ? 0
            : dataset.weight + increase;
      }
    });
    setHealthData(healthDataCopy);
  };

  const removeParameter = () => {
    let healthDataCopy = [...healthData];
    healthDataCopy.forEach((dataset, index) => {
      if (dataset.name === route.params.name) {
        healthDataCopy.splice(index, 1);
      }
    });
    setHealthData(healthDataCopy);
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
        <Button
          appearance="ghost"
          status="primary"
          onPress={() => saveGoal(route.params.increment)}>
          +
        </Button>
        <Button
          appearance="ghost"
          status="primary"
          onPress={() => saveGoal(-route.params.increment)}>
          -
        </Button>
      </Layout>
      <Layout style={{alignItems: 'center'}}>
        <Text category="h5" style={{marginVertical: 20}}>
          Weight
        </Text>
        <Text>{weight}</Text>
        <Button
          appearance="ghost"
          status="primary"
          onPress={() => saveWeight(1)}>
          +
        </Button>
        <Button appearance="ghost" onPress={() => saveWeight(-1)}>
          -
        </Button>
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
