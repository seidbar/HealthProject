import React from 'react';
import AppleHealthKit from 'react-native-health';

// The Helper initializes the Healthkit with all desired parameters

const LoadData = async (healthKitOptions, healthData, setHealthData) => {
  // Make copies of HealthKitOptions and healthData to work with within the function
  healthDataCopy = [...healthData];
  let permissions = healthKitOptions.permissions.read;
  let promiseArray = [];
  let saveArray = [];
  // A function that takes the name of a parameter and the value and checks if the parameter is in the data array. The value is then updated.
  const saveData = (arr) => {
    arr.forEach(({name, value}) => {
      healthDataCopy.forEach((element) => {
        if (element.name === name) {
          element.value = value;
        }
      });
    });
    setHealthData(healthDataCopy);
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

  // Due to different sources writing to Sleep, for now only the Apple Watch and the iPhone will be recognized
  // The function collects info on how much time was spent in bed and how much time was spent sleeping
  // If the user didn't wear a device, the time in bed will be evaluated.
  const getTotalSleep = (sessions) => {
    let timeAsleep = 0;
    let timeInBed = 0;
    if (sessions && sessions.length > 0) {
      sessions.forEach((session) => {
        if (
          session.value === 'ASLEEP' &&
          session.sourceId.startsWith('com.apple.health')
        ) {
          timeAsleep +=
            (new Date(session.endDate) - new Date(session.startDate)) / 60000;
        } else if (session.value === 'INBED') {
          timeInBed =
            timeInBed >
            (new Date(session.endDate) - new Date(session.startDate)) / 60000
              ? timeInBed
              : (new Date(session.endDate) - new Date(session.startDate)) /
                60000;
        }
      });
    }
    return timeAsleep > 0 ? timeAsleep : timeInBed;
  };

  // If no permissions are granted, no call to Healthkit will be executed
  if (permissions.length > 0) {
    // Instantiate Date objects to pass as criteria for the Healthkit
    let date = new Date();
    let sleepDate = new Date();
    sleepDate.setHours(19);
    sleepDate.setDate(date.getDate() - 1);

    date.setHours(0);

    const options = {
      startDate: date.toISOString(),
      endDate: new Date().toISOString(),
    };

    // Healthkit Initialization and loading of data
    // For each option it is first checked if the permission is granted
    // Then a new Promise is created and the data is pushed to saveArray where it sets the state
    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }
    });

    if (permissions.indexOf('ActiveEnergyBurned') != -1) {
      const energyPromise = new Promise((resolve) => {
        AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
          saveArray.push({
            name: 'Active Energy',
            value: results && results[0] ? Math.floor(results[0].value) : 0,
          });
          resolve(1);
        });
      });
      promiseArray.push(energyPromise);
    }

    if (permissions.indexOf('StepCount') != -1) {
      const stepPromise = new Promise((resolve) => {
        AppleHealthKit.getStepCount(null, (err, results) => {
          saveArray.push({
            name: 'Step Count',
            value: results ? Math.floor(results.value) : 0,
          });
          resolve(1);
        });
      });
      promiseArray.push(stepPromise);
    }

    if (permissions.indexOf('MindfulSession') != -1) {
      const mindfulPromise = new Promise((resolve) => {
        AppleHealthKit.getMindfulSession(options, (err, results) => {
          saveArray.push({
            name: 'Mindful Minutes',
            value: results ? getTotalMinutes(results) : 0,
          });
          resolve(1);
        });
      });
      promiseArray.push(mindfulPromise);
    }

    if (permissions.indexOf('SleepAnalysis') != -1) {
      const sleepPromise = new Promise((resolve) => {
        AppleHealthKit.getSleepSamples(
          {
            startDate: sleepDate.toISOString(),
            endDate: new Date().toISOString(),
          },
          (err, results) => {
            saveArray.push({
              name: 'Sleep',
              value: results ? Math.floor(getTotalSleep(results)) : 0,
            });
            resolve(1);
          },
        );
      });
      promiseArray.push(sleepPromise);
    }

    if (permissions.indexOf('DistanceCycling') != -1) {
      const cyclingPromise = new Promise((resolve) => {
        AppleHealthKit.getDistanceCycling(null, (err, results) => {
          saveArray.push({
            name: 'Cycling Distance',
            value: results ? Math.floor(results[0].value) : 0,
          });
          resolve(1);
        });
      });
      promiseArray.push(cyclingPromise);
    }

    if (permissions.indexOf('DistanceWalkingRunning') != -1) {
      const walkingPromise = new Promise((resolve) => {
        AppleHealthKit.getDistanceWalkingRunning(null, (err, results) => {
          saveArray.push({
            name: 'Walking / Running Distance',
            value: results && results[0] ? Math.floor(results[0].value) : 0,
          });
          resolve(1);
        });
      });
      promiseArray.push(walkingPromise);
    }
  }

  Promise.all(promiseArray)
    .then(() => saveData(saveArray))
    .catch((error) => console.log(error));
};

export default LoadData;
