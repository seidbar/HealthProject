import React, {useState, useEffect} from 'react';

import {SafeAreaView, ScrollView, View, StatusBar, Button} from 'react-native';

import ScoreCard from '../Components/ScoreCard';
import ProgressBar from '../Components/ProgressBar';

const Home = ({healthData, reload}) => {
  // Upon Loading, the Score is calculated

  const [score, setScore] = useState(0);

  useEffect(() => {
    calculateScore();
  });

  // Maps over the parameters and checks which percentage of the goal was reached (Max 100%). Then the scores are added.
  const calculateScore = () => {
    let calculateScore = 0;
    healthData.forEach((dataset) => {
      if (dataset.value != false && dataset.value != undefined) {
        calculateScore +=
          dataset.value / dataset.goal >= 1 ? 1 : dataset.value / dataset.goal;
      }
    });
    setScore(Math.floor((calculateScore / healthData.length) * 100));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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
                  />
                );
              })
            : null}
          <Button title="Reload" onPress={reload} />
        </ScrollView>
      </SafeAreaView>
      <View style></View>
    </>
  );
};

export default Home;
