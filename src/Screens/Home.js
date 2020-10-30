import React, {useState, useEffect, useContext} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Button} from '@ui-kitten/components';
import {Context} from '../Context/HealthData';
import {Context as HealthKitContext} from '../Context/HealthKitPermissions';
import Slider from '@react-native-community/slider';

import ScoreCard from '../Components/ScoreCard';
import ProgressBar from '../Components/ProgressBar';
import LoadData from '../Helpers/LoadData';

const Home = ({navigation}) => {
  const [score, setScore] = useState(0);
  const [healthData, setHealthData] = useContext(Context);
  const [healthKitPermissions, setHealthKitPermissions] = useContext(
    HealthKitContext,
  );

  const reload = () => {
    setHealthData(LoadData(healthKitPermissions, healthData));
  };

  useEffect(() => {
    calculateScore();
  }, [healthData]);

  // Maps over the parameters and checks which percentage of the goal was reached (Max 100%). Then the scores are added.
  const calculateScore = () => {
    let calculateScore = 0;
    let totalWeight = 0;
    healthData.forEach((dataset) => {
      if (dataset.value != false && dataset.value != undefined) {
        calculateScore +=
          dataset.value / dataset.goal >= 1
            ? 1 * dataset.weight
            : (dataset.value / dataset.goal) * dataset.weight;
      }
      totalWeight += dataset.weight;
    });
    setScore(
      totalWeight > 0 ? Math.floor((calculateScore / totalWeight) * 140) : 0,
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreTitle}>Your Score Today</Text>
          </View>
          <ScoreCard score={score} />
          <View style={styles.scoreComponent}>
            <Text style={styles.scoreNum}>{score}</Text>
          </View>
          {healthData
            ? healthData.map((dataset, index) => {
                return (
                  <ProgressBar
                    key={index}
                    value={dataset.value}
                    goal={dataset.goal}
                    name={dataset.name}
                    measure={dataset.measure}
                  />
                );
              })
            : null}
          <Button appearance="ghost" status="info" onPress={reload}>
            Reload
          </Button>
          {/*           Slider to test the color curve */}
          {/*           <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            step={1}
            onValueChange={(value) => setScore(value)}
            maximumValue={140}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

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
