import React from 'react';

import AppleHealthKit from 'react-native-health';

// The Helper initializes the Healthkit with all desired parameters

const LoadData = (healthKitOptions, healthData) => {
  healthDataCopy = [...healthData];

  // Load Data To DO: healthKitOptions need to be pushed to / unshifted to reflect which persmissions are needed
  // Set Up functions for every Parameter
  // only functions should be called that are needed

  // set date to 00:00 today

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
  AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
    if (err) {
      console.log('error initializing Healthkit: ', err);
      return;
    }

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      saveData(
        'Active Energy',
        results && results[0] ? Math.floor(results[0].value) : 0,
      );
    });

    AppleHealthKit.getStepCount(null, (err, results) => {
      saveData('Step Count', results ? Math.floor(results.value) : 0);
    });

    AppleHealthKit.getMindfulSession(options, (err, results) => {
      saveData('Mindful Minutes', results ? getTotalMinutes(results) : 0);
    });

    // Sleep Data Format needs to be documented first
    AppleHealthKit.getSleepSamples(
      {startDate: sleepDate.toISOString(), endDate: new Date().toISOString()},
      (err, results) => {
        saveData('Sleep', results ? getTotalSleep(results) : 0);
      },
    );

    // Method is still buggy
    /*    AppleHealthKit.getDistanceSwimming(null, (err, results) => {
      saveData('Swimming Distance', results ? Math.floor(results[0].value) : 0);
      console.log(results);
    }); */

    AppleHealthKit.getDistanceCycling(null, (err, results) => {
      saveData('Cycling Distance', results ? Math.floor(results[0].value) : 0);
    });

    AppleHealthKit.getDistanceWalkingRunning(null, (err, results) => {
      saveData(
        'Walking / Running Distance',
        results && results[0] ? Math.floor(results[0].value) : 0,
      );
    });
  });

  const saveData = (name, value) => {
    const found = healthDataCopy.some((element) => element.name === name);
    if (found) {
      healthDataCopy.forEach((element) => {
        if (element.name === name) {
          element.value = value;
        }
      });
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

  return healthDataCopy;
};

export default LoadData;
