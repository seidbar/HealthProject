import React, {useState, useEffect} from 'react';

import AppleHealthKit from 'react-native-health';

// The Helper initializes the Healthkit with all desired parameters

const LoadData = (options, healthData) => {
  healthDataCopy = [...healthData];

  // HealthKitOptions is an object that saves which data needs to be asked for
  const PERMS = AppleHealthKit.Constants.Permissions;
  const healthKitOptions = {
    permissions: {
      read: [PERMS.StepCount, PERMS.ActiveEnergyBurned, PERMS.MindfulSession],
    },
  };

  // set date to 00:00 today
  let date = new Date();
  date.setHours(2, 0, 0, 0);

  // Healthkit Initialization and loading of data
  AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
    if (err) {
      console.log('error initializing Healthkit: ', err);
      return;
    }

    AppleHealthKit.getActiveEnergyBurned(
      {startDate: date.toISOString(), endDate: new Date().toISOString()},
      (err, results) => {
        saveData(
          'Active Energy',
          results[0] ? Math.floor(results[0].value) : 0,
        );
      },
    );

    AppleHealthKit.getStepCount(null, (err, results) => {
      saveData('Step Count', results ? results.value : 0);
    });

    AppleHealthKit.getMindfulSession(
      {startDate: date.toISOString(), endDate: new Date().toISOString()},
      (err, results) => {
        saveData('Mindful Minutes', getTotalMinutes(results));
      },
    );
  });

  const saveData = (name, value) => {
    const found = healthDataCopy.some((element) => element.name === name);
    if (found) {
      healthDataCopy.forEach((element) => {
        if (element.name === name) {
          element.value = value;
        }
      });
    } else {
      healthDataCopy.push({name, value});
    }
  };

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

  return healthDataCopy;
};

export default LoadData;
