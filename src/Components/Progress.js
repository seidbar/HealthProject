import React, {useState, useEffect} from 'react';

import AppleHealthKit from 'react-native-health';

// The progress component initalizes the Healthkit and saves all necessary data to the state

const PERMS = AppleHealthKit.Constants.Permissions;

const Progress = ({scoreData}) => {
  useEffect(() => {
    const healthKitOptions = {
      permissions: {
        read: [PERMS.StepCount, PERMS.ActiveEnergyBurned, PERMS.MindfulSession],
        write: [PERMS.Water, PERMS.Height],
      },
    };

    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      // set date to 00:00 today
      let date = new Date();
      date.setHours(2, 0, 0, 0);

      // Get Active Calories for today
      AppleHealthKit.getActiveEnergyBurned(
        {startDate: date.toISOString(), endDate: new Date().toISOString()},
        (err, results) => {
          setActivity(results);
        },
      );

      // Get Steps for today
      AppleHealthKit.getStepCount(null, (err, results) => {
        setStepCount(results);
      });

      // Get Mindful Sessions
      AppleHealthKit.getMindfulSession(
        {startDate: date.toISOString(), endDate: new Date().toISOString()},
        (err, results) => {
          setMindfulSession(results);
        },
      );
    });

    scoreData([
      {name: 'Active Energy', value: Activity, goal: 450},
      {name: 'Step Count', value: StepCount, goal: 8000},
      {
        name: 'Mindful Minutes',
        value: getTotalMinutes(MindfulSession),
        goal: 10,
      },
    ]);
  }, []);

  // Takes an array of Sessions and returns a numeric value of total minutes of the Activity
  const getTotalMinutes = (sessions) => {
    let totalMinutes = 0;
    if (sessions.length > 0) {
      sessions.forEach((session) => {
        totalMinutes +=
          (new Date(session.endDate) - new Date(session.startDate)) / 60000;
      });
    }
    return totalMinutes;
  };
};

export default Progress;
