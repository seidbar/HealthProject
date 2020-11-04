import React, {useContext, useEffect, useState} from 'react';
import {Icon, SelectItem, Layout, Button} from '@ui-kitten/components';

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import {Context} from '../Context/HealthData';
import {Context as AppStatus} from '../Context/AppStatus';
import {Context as HealthKit} from '../Context/HealthKitPermissions';
import {Context as HealthHistory} from '../Context/HealthHistory';
import OverviewGraph from '../Components/OverviewGraph';
import AreaChart from '../Components/AreaChart';
import LoadHistoricData from '../Helpers/LoadHistoricData';

const Trends = ({navigation}) => {
  const [appStatus, setAppStatus] = useContext(AppStatus);
  const [permissions, setPermissions] = useContext(HealthKit);
  const [healthData, setHealthData] = useContext(Context);
  const [historicData, setHistoricData] = useContext(HealthHistory);
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [weeklyScore, setWeeklyScore] = useState(0);
  let interim = [];

  const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff'];
  const weight = {};
  const goal = {};
  const dataBuffer = {};
  let totalWeight = 0;

  let keyBuffer = [];
  let today = new Date();

  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    healthData.forEach((element) => keyBuffer.push(element.name));
    setKeys(keyBuffer);

    let graphBuffer = {};

    historicData.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        if (key != 'date' && key != 'key') {
          if (graphBuffer[key]) {
            graphBuffer[key].push(value);
          } else {
            graphBuffer[key] = [value];
          }
        }
        console.log(graphBuffer);
      });
    });
    setGraphData(graphBuffer);

    Object.entries(historicData[6]).forEach(([key, value]) => {
      if (key != 'date' && key != 'key') {
        setWeeklyScore(weeklyScore + value);
      }
    });
  }, [healthData]);

  const addHealthData = (object) => {
    object['key'] = Math.floor(Math.random() * 100000);
    interim.push(object);
    console.log(interim.length);

    if (interim.length === 7) {
      calculateScore();
      setLoading(false);
      setHistoricData(interim);
    }
  };

  const loadLastWeek = () => {
    interim = [];
    setWeeklyScore(0);
    healthData.forEach((element) => {
      weight[element.name] = element.weight;
      goal[element.name] = element.goal;
      dataBuffer[element.name] = 0;
      keyBuffer.push(element.name);
    });
    setKeys(keyBuffer);

    for (let i = 0; i < 7; i++) {
      let newDate = new Date(today);
      newDate.setDate(today.getDate() - i);
      LoadHistoricData(permissions, addHealthData, setLoading, newDate);
    }
    calculateScore(historicData);
  };

  const calculateScore = () => {
    Object.entries(weight).forEach(([key, value]) => {
      totalWeight += value;
    });

    interim.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        if (key != 'date' && key != 'key') {
          const result = Math.floor(
            (((weight[key] * value) / goal[key]) * 140) / totalWeight,
          );
          element[key] = result + dataBuffer[key];
          dataBuffer[key] += result;
          setWeeklyScore(weeklyScore + result);
        }
      });
    });

    setAppStatus({intro: true, fullHistory: true});
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <RefreshControl refreshing={loading} onRefresh={loadLastWeek} />
        <Layout style={{alignItems: 'center'}}>
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreTitle}>This weeks performance</Text>
          </View>
        </Layout>
        <OverviewGraph
          colors={colors}
          keys={keys}
          data={historicData}></OverviewGraph>
        <View style={{alignItems: 'center'}}>
          <Text style={{margin: 10}}>Your Weekly Score: {weeklyScore}</Text>
          {appStatus.fullHistory ? null : (
            <>
              <Text>To initialize the graph click below</Text>
              <Button appearance="ghost" status="info" onPress={loadLastWeek}>
                Load Full Data
              </Button>
            </>
          )}
        </View>
        <Layout style={{alignItems: 'center'}}>
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreTitle}>Check individual scores</Text>
          </View>
        </Layout>
        {Object.entries(historicData[0]).map(([key, value]) => {
          if (key != 'date' && key != 'key') {
            console.log(Object.keys(historicData[0]).length);
            return (
              <View key={Math.floor(Math.random() * 10000)}>
                <Text>{key}</Text>
                <AreaChart
                  name={key}
                  graphData={graphData[key]}
                  max={1000 / (Object.keys(historicData[0]).length - 2)}
                />
              </View>
            );
          }
        })}
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
