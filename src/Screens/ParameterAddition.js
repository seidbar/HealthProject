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
import {Context} from '../Context/Store';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

// The Parameters to be evaluated can be added here

const ParameterAddition = ({navigation, route}) => {
  const [healthData, setHealthData] = useContext(Context);

  const parameters = [
    {
      name: 'Active Energy',
      goal: 450,
      increment: 10,
      measure: 'Calories Burned',
    },
    {name: 'Caffeine', goal: 250, increment: 10, measure: 'mg'},
    {name: 'Carbohydrates', goal: 50, increment: 2, measure: 'g'},
    {name: 'Fat', goal: 40, increment: 2, measure: 'g'},
    {name: 'Fiber', goal: 20, icrement: 1, measure: 'g'},
    {name: 'Mindful Minutes', goal: 10, increment: 5, measure: 'Minutes'},
    {name: 'Protein', goal: 50, increment: 2, measure: 'g'},
    {name: 'Sleep', goal: 450, increment: 10, measure: 'Minutes'},
    {name: 'Step Count', goal: 8000, increment: 100, measure: 'Steps'},
    {
      name: 'Total Calories',
      goal: 2000,
      increment: 100,
      measure: 'Calories',
    },
    {name: 'Water', goal: 2000, increment: 2, measure: 'ml'},
  ];

  const [availableParams, setAvailableParams] = useState([...parameters]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // When a Parameter is Clicked, it is added to the monitored parameters and removed from the list
  const addParam = (element) => {
    let healthDataCopy = [...healthData];
    element.weight = 1;
    healthDataCopy.push(element);
    setHealthData(healthDataCopy);
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
    <SafeAreaView>
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
