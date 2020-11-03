import React, {useContext, useState} from 'react';
import {Icon, SelectItem, Layout, Button} from '@ui-kitten/components';

import {SafeAreaView, ScrollView, View, StyleSheet, Text} from 'react-native';
import {Context} from '../Context/HealthData';
import {Context as AppStatus} from '../Context/AppStatus';
import {Context as HealthKit} from '../Context/HealthKitPermissions';
import {Context as HealthHistory} from '../Context/HealthHistory';
import {
  StackedAreaChart,
  Grid,
  YAxis,
  XAxis,
  LineChart,
} from 'react-native-svg-charts';
import LoadHistoricData from '../Helpers/LoadHistoricData';
import * as shape from 'd3-shape';

const StackedArea = () => {
  const [appStatus, setAppStatus] = useContext(AppStatus);
  const [permissions, setPermissions] = useContext(HealthKit);
  const [healthData, setHealthData] = useContext(Context);
  const [historicData, setHistoricData] = useContext(HealthHistory);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const colors = ['#8800cc', '#aa00ff', '#cc66ff' /* '#eeccff' */];
  const svgs = [];
  const weight = {};
  const goal = {};
  let keyBuffer = [];
  let today = new Date();
  const dataBuffer = {};
  today.setHours(0, 0, 0, 0);
  let totalWeight = 0;

  const addHealthData = (object) => {
    let dataCopy = data;
    object['key'] = Math.floor(Math.random() * 100000);
    dataCopy.push(object);
    console.log(data.length);
    if (data.length === 7) {
      calculateScore();
      console.log(data);
    }
  };

  const loadLastWeek = () => {
    healthData.forEach((element) => {
      weight[element.name] = element.weight;
      goal[element.name] = element.goal;
      dataBuffer[element.name] = 0;
      keyBuffer.push(element.name);
      console.log(keyBuffer);
    });
    setKeys(keyBuffer);

    for (let i = 0; i < 7; i++) {
      let newDate = new Date(today);
      newDate.setDate(today.getDate() - i);
      LoadHistoricData(permissions, addHealthData, setLoading, newDate);
    }
    calculateScore(data);
  };

  const calculateScore = () => {
    let dataCopy = [...data];
    Object.entries(weight).forEach(([key, value]) => {
      totalWeight += value;
    });

    dataCopy.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        if (key != 'date' && key != 'key') {
          const result = Math.floor(
            (((weight[key] * value) / goal[key]) * 140) / totalWeight,
          );
          element[key] = result + dataBuffer[key];
          dataBuffer[key] += result;
        }
      });
    });
    setData(dataCopy);
    console.log(keys);
    console.log(data);
  };

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
      <View style={{alignItems: 'center'}}>
        <Text style={{margin: 10}}>
          Your Weekly Score: {dataBuffer.caloriesBurned}
        </Text>
        {appStatus.fullHistory ? null : (
          <>
            <Text>To initialize the graph click below</Text>
            <Button appearance="ghost" status="info" onPress={loadLastWeek}>
              Load Full Data
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const Trends = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Layout style={{alignItems: 'center'}}>
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreTitle}>This weeks performance</Text>
          </View>
        </Layout>
        <StackedArea></StackedArea>
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
