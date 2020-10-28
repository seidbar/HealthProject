import React, {useContext} from 'react';
import {Icon, SelectItem, Layout, Button} from '@ui-kitten/components';

import {SafeAreaView, ScrollView} from 'react-native';
import {Context} from '../Context/HealthData';

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
                measure: element.measure,
                increment: element.increment,
              })
            }
          />
        ))}
        <Layout style={{alignItems: 'center'}}>
          <Button
            appearance="ghost"
            status="info"
            onPress={() => {
              navigation.navigate('ParameterAddition');
            }}>
            Add Parameters
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Options;
