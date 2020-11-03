import React from 'react';
import AppleHealthKit from 'react-native-health';

const LoadHistoricData = (healthKitOptions, addHealthData, setLoading, day) => {
  // Make copies of HealthKitOptions and healthData to work with within the function
  setLoading(true);
  let permissions = healthKitOptions.permissions.read;
  let promiseArray = [];
  let saveArray = {date: day};

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

  const getTotalWorkout = (sessions) => {
    let workoutMinutes = 0;

    if (sessions && sessions.length > 0) {
      sessions.forEach((session) => {
        workoutMinutes +=
          (new Date(session.end) - new Date(session.start)) / 60000;
      });
    }
    return workoutMinutes;
  };

  // If no permissions are granted, no call to Healthkit will be executed
  if (permissions.length > 0) {
    // Instantiate Date objects to pass as criteria for the Healthkit
    let date = new Date(day);
    let end = new Date(day);
    let sleepDate = new Date(day);
    let sleepEnd = new Date(day);
    sleepDate.setHours(18);
    sleepDate.setDate(date.getDate() - 1);
    sleepEnd.setHours(18);

    date.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    const options = {
      startDate: date.toISOString(),
      endDate: end.toISOString(),
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
          saveArray['Active Energy'] =
            results && results[0] ? Math.floor(results[0].value) : 0;
          resolve(1);
        });
      });
      promiseArray.push(energyPromise);
    }

    if (permissions.indexOf('StepCount') != -1) {
      const stepPromise = new Promise((resolve) => {
        AppleHealthKit.getStepCount(null, (err, results) => {
          saveArray['Step Count'] = results ? Math.floor(results.value) : 0;
          resolve(1);
        });
      });
      promiseArray.push(stepPromise);
    }

    if (permissions.indexOf('MindfulSession') != -1) {
      const mindfulPromise = new Promise((resolve) => {
        AppleHealthKit.getMindfulSession(options, (err, results) => {
          (saveArray['Mindful Minutes'] = results
            ? getTotalMinutes(results)
            : 0),
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
            endDate: sleepEnd.toISOString(),
          },
          (err, results) => {
            saveArray['Sleep'] = results
              ? Math.floor(getTotalSleep(results))
              : 0;
            resolve(1);
          },
        );
      });
      promiseArray.push(sleepPromise);
    }

    if (permissions.indexOf('DistanceCycling') != -1) {
      const cyclingPromise = new Promise((resolve) => {
        AppleHealthKit.getDistanceCycling(null, (err, results) => {
          saveArray['Cycling Distance'] = results
            ? Math.floor(results[0].value)
            : 0;
          resolve(1);
        });
      });
      promiseArray.push(cyclingPromise);
    }

    if (permissions.indexOf('DistanceWalkingRunning') != -1) {
      const walkingPromise = new Promise((resolve) => {
        AppleHealthKit.getDistanceWalkingRunning(null, (err, results) => {
          saveArray['Walking / Running Distance'] =
            results && results[0] ? Math.floor(results[0].value) : 0;
          resolve(1);
        });
      });
      promiseArray.push(walkingPromise);
    }

    if (permissions.indexOf('Workout') != -1) {
      const workoutPromise = new Promise((resolve) => {
        AppleHealthKit.getSamples(
          {
            startDate: date.toISOString(),
            endDate: end.toISOString(),
            type: 'Workout',
          },
          (err, results) => {
            saveArray['Workout Minutes'] =
              results && results[0] ? Math.floor(getTotalWorkout(results)) : 0;
            resolve(1);
          },
        );
      });
      promiseArray.push(workoutPromise);
    }

    Promise.all(promiseArray)
      .then(() => addHealthData(saveArray))
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  } else {
    console.log('No permissions found');
  }
};

export default LoadHistoricData;
