import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Context} from '../Context/Store';
import LoadData from '../Helpers/LoadData';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

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

  useEffect(() => {
    healthData.forEach((dataset) => {
      if (dataset.name === route.params.name) {
        setGoal(dataset.goal);
        setWeight(dataset.weight);
      }
    });
  });

  return (
    <SafeAreaView>
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
        <Text>{goal}</Text>
        <Button title="+" onPress={() => saveGoal(10)} />
        <Button title="-" onPress={() => saveGoal(-10)} />
      </Layout>
      <Layout style={{alignItems: 'center'}}>
        <Text category="h5" style={{marginVertical: 20}}>
          Weighting
        </Text>
        <Text>{weight}</Text>
        <Button title="+" onPress={() => saveWeight(1)} />
        <Button title="-" onPress={() => saveWeight(-1)} />
      </Layout>
    </SafeAreaView>
  );
};

export default GoalSettings;
