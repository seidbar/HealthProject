import React, {useState, useEffect, useContext} from 'react';

import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Button} from '@ui-kitten/components';
import {Context} from '../Context/HealthData';
import {Context as HealthKitContext} from '../Context/HealthKitPermissions';

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
      totalWeight > 0 ? Math.floor((calculateScore / totalWeight) * 100) : 0,
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ScoreCard score={score} />
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
