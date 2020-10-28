import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  SelectItem,
  TopNavigation,
  TopNavigationAction,
  ForwardIcon,
} from '@ui-kitten/components';
import LoadData from '../Helpers/LoadData';
import {Context} from '../Context/HealthData';
import {Context as HealthKit} from '../Context/HealthKitPermissions';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

// The Parameters to be evaluated can be added here

const ParameterAddition = ({navigation, route}) => {
  const [healthData, setHealthData] = useContext(Context);
  const [permissions, setPermissions] = useContext(HealthKit);

  const parameters = [
    {
      name: 'Active Energy',
      goal: 450,
      increment: 10,
      measure: 'Calories Burned',
      permission: 'ActiveEnergyBurned',
    },
    /*    {
      name: 'Caffeine',
      goal: 250,
      increment: 10,
      measure: 'mg',
      permission: 'Caffeine',
    },
    {
      name: 'Carbohydrates',
      goal: 50,
      increment: 2,
      measure: 'g',
      permission: 'Carbohydrates',
    },
    {name: 'Fat', goal: 40, increment: 2, measure: 'g', permission: 'FatTotal'}, */
    {
      name: 'Cycling Distance',
      goal: 6000,
      increment: 100,
      measure: 'Meters',
      permission: 'DistanceCycling',
    },
    /* {
      name: 'Fiber',
      goal: 20,
      icrement: 1,
      measure: 'g',
      permission: 'Fiber',
    }, */

    {
      name: 'Mindful Minutes',
      goal: 10,
      increment: 5,
      measure: 'Minutes',
      permission: 'MindfulSession',
    },
    /*     {
      name: 'Protein',
      goal: 50,
      increment: 2,
      measure: 'g',
      permission: 'Protein',
    }, */
    {
      name: 'Sleep',
      goal: 450,
      increment: 10,
      measure: 'Minutes slept',
      permission: 'SleepAnalysis',
    },
    {
      name: 'Step Count',
      goal: 8000,
      increment: 100,
      measure: 'Steps',
      permission: 'StepCount',
    },
    /*     {
      name: 'Swimming Distance',
      goal: 6000,
      increment: 100,
      measure: 'Meters',
      permission: 'DistanceSwimming',
    }, */
    /*     {
      name: 'Total Calories',
      goal: 2000,
      increment: 100,
      measure: 'Calories',
      permission: 'EnergyConsumed',
    }, */
    {
      name: 'Walking / Running Distance',
      goal: 3000,
      increment: 100,
      measure: 'Meters',
      permission: 'DistanceWalkingRunning',
    },
    /* {
      name: 'Water',
      goal: 2000,
      increment: 2,
      measure: 'ml',
      permission: 'Water',
    }, */
  ];

  const [availableParams, setAvailableParams] = useState([...parameters]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // When a Parameter is Clicked, it is added to the monitored parameters and removed from the list
  const addParam = (element) => {
    let healthDataCopy = [...healthData];
    let permissionsCopy = permissions.permissions
      ? [...permissions.permissions.read]
      : [];
    element.weight = 1;
    healthDataCopy.push(element);
    permissionsCopy.push(element.permission);
    setPermissions({permissions: {read: permissionsCopy, write: []}});
    setHealthData(LoadData(permissions, healthDataCopy));
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  // Compare availableParams with healthData and remove duplicates
  useEffect(() => {
    paramCopy = [...parameters];
    healthData.forEach((dataset) => {
      paramCopy.forEach((parameter, index) => {
        if (dataset.name === parameter.name) {
          paramCopy.splice(index, 1);
        }
      });
    });
    setAvailableParams(paramCopy);
  }, [healthData]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <TopNavigation
        title="Add Parameters"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{alignItems: 'center'}}>
        {availableParams.map((element, index) => (
          <SelectItem
            key={index}
            accessoryRight={ForwardIcon}
            title={element.name}
            onPress={() => addParam(element)}
          />
        ))}
      </Layout>
    </SafeAreaView>
  );
};

export default ParameterAddition;
