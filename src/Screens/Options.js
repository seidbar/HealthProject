import React, {useContext, useState} from 'react';
import {Icon, SelectItem} from '@ui-kitten/components';

import {SafeAreaView, ScrollView, View, StatusBar, Button} from 'react-native';
import {Context} from '../Context/Store';

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

const Options = ({navigation}) => {
  const [healthData, setHealthData] = useContext(Context);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {healthData.map((element, index) => (
          <SelectItem
            key={index}
            accessoryRight={ForwardIcon}
            title={element.name}
            onPress={() =>
              navigation.navigate('GoalSettings', {
                name: element.name,
                goal: element.goal,
                weight: element.weight,
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Options;
