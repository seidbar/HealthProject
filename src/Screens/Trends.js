import React, {useContext, useState} from 'react';
import {Icon, SelectItem, Layout, Button} from '@ui-kitten/components';

import {SafeAreaView, ScrollView, View, StyleSheet, Text} from 'react-native';
import {Context} from '../Context/HealthData';
import {
  StackedAreaChart,
  Grid,
  YAxis,
  XAxis,
  LineChart,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import LinearGradient from 'react-native-linear-gradient';

const StackedAreaExample = () => {
  const weight = {
    steps: 1,
    caloriesBurned: 1.25,
    mindfulMinutes: 1.5,
    sleep: 2,
  };
  const data = [
    {
      steps: 1,
      caloriesBurned: 1,
      mindfulMinutes: 1,
      sleep: 1,
    },
    {
      steps: 1,
      caloriesBurned: 1,
      mindfulMinutes: 1,
      sleep: 1,
    },
    {
      steps: 0,
      caloriesBurned: 1,
      mindfulMinutes: 0.65,
      sleep: 0.85,
    },
    {
      steps: 0.74,
      caloriesBurned: 0.98,
      mindfulMinutes: 0.1,
      sleep: 1,
    },
    {
      steps: 0.59,
      caloriesBurned: 0.99,
      mindfulMinutes: 0.65,
      sleep: 0.71,
    },
    {
      steps: 1,
      caloriesBurned: 0.22,
      mindfulMinutes: 0.9,
      sleep: 0.89,
    },
    {
      steps: 0.25,
      caloriesBurned: 0.28,
      mindfulMinutes: 0.95,
      sleep: 0.99,
    },
  ];

  let totalWeight = 0;
  let dataBuffer = {
    steps: 0,
    caloriesBurned: 0,
    mindfulMinutes: 0,
    sleep: 0,
  };

  Object.entries(weight).forEach(([key, value]) => {
    totalWeight += value;
  });

  data.forEach((element) => {
    Object.entries(element).forEach(([key, value]) => {
      const today = Math.floor((weight[key] * value * 140) / totalWeight);
      element[key] = today + dataBuffer[key];
      dataBuffer[key] += today;
    });
  });

  const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
  const keys = ['steps', 'caloriesBurned', 'mindfulMinutes', 'sleep'];
  const svgs = [
    {onPress: () => console.log('apples')},
    {onPress: () => console.log('bananas')},
    {onPress: () => console.log('cherries')},
    {onPress: () => console.log('dates')},
  ];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 300,
          margin: 3,
        }}>
        <YAxis
          style={{marginBottom: 30, marginTop: -22}}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{top: 0, bottom: 10}}
          min={0}
          max={1100}
          svg={{
            fontSize: 8,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 0.1,
            alignmentBaseline: 'baseline',
            baselineShift: '3',
          }}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <StackedAreaChart
            style={{flex: 1}}
            data={data}
            keys={keys}
            colors={colors}
            curve={shape.curveNatural}
            showGrid={false}
            svgs={svgs}
            gridMax={1000}>
            <Grid />
          </StackedAreaChart>
          <XAxis
            style={{
              height: 30,
              marginVertical: 10,
            }}
            data={data}
            formatLabel={(value, index) => value + 1}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
          />
        </View>
      </View>
      <Text>Your Weekly Score: {dataBuffer.caloriesBurned}</Text>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
};

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

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
