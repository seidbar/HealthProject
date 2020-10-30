import React, {useContext} from 'react';
import {Icon, SelectItem, Layout, Button} from '@ui-kitten/components';

import {SafeAreaView, ScrollView, View, StyleSheet, Text} from 'react-native';
import {Context} from '../Context/HealthData';
import {StackedAreaChart, Grid, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class StackedAreaExample extends React.PureComponent {
  render() {
    const data = [
      {
        month: new Date(2015, 0, 1),
        apples: 0.7,
        bananas: 0.9,
        cherries: 1,
        dates: 0,
      },
      {
        month: new Date(2015, 1, 1),
        apples: 0.1,
        bananas: 0.2,
        cherries: 1,
        dates: 0.9,
      },
      {
        month: new Date(2015, 2, 1),
        apples: 0,
        bananas: 1,
        cherries: 0.65,
        dates: 0.85,
      },
      {
        month: new Date(2015, 3, 1),
        apples: 0.74,
        bananas: 0.98,
        cherries: 0.1,
        dates: 1,
      },
      {
        month: new Date(2015, 4, 1),
        apples: 0.59,
        bananas: 0.99,
        cherries: 0.65,
        dates: 0.71,
      },
      {
        month: new Date(2015, 5, 1),
        apples: 1,
        bananas: 0.22,
        cherries: 0.9,
        dates: 0.89,
      },
      {
        month: new Date(2015, 6, 1),
        apples: 0.25,
        bananas: 0.28,
        cherries: 0.95,
        dates: 0.99,
      },
    ];

    const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
    const keys = ['Steps', 'Calories Burned', 'Minutes Meditated', 'Sleep'];
    const svgs = [
      {onPress: () => console.log('apples')},
      {onPress: () => console.log('bananas')},
      {onPress: () => console.log('cherries')},
      {onPress: () => console.log('dates')},
    ];

    return (
      <View>
        <StackedAreaChart
          style={{height: 200, paddingVertical: 16}}
          data={data}
          keys={keys}
          colors={colors}
          curve={shape.curveNatural}
          showGrid={false}
          svgs={svgs}>
          <Grid />
        </StackedAreaChart>
        <YAxis
          style={{position: 'absolute', top: 0, bottom: 0}}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{top: 10, bottom: 10}}
          svg={{
            fontSize: 8,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 0.1,
            alignmentBaseline: 'baseline',
            baselineShift: '3',
          }}
        />
      </View>
    );
  }
}

const Trends = ({navigation}) => {
  const [healthData, setHealthData] = useContext(Context);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Layout style={{alignItems: 'center'}}>
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreTitle}>This weeks performance</Text>
          </View>
        </Layout>
        <StackedAreaExample></StackedAreaExample>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trends;

const styles = StyleSheet.create({
  scoreComponent: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    margin: 20,
  },
  progressScore: {
    width: 150,
    height: 150,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNum: {
    fontSize: 55,
    fontWeight: '500',
    position: 'absolute',
    bottom: 70,
  },
});
