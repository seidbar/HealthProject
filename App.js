import React, {useState, useEffect} from 'react';

import Navigation from './src/Components/Navigation';
import Home from './src/Screens/Home';
import AppleHealthKit from 'react-native-health';
import LoadData from './src/Helpers/LoadData';

const App = () => {
  const [healthData, setHealthData] = useState([
    {name: 'Active Energy', goal: 450},
    {name: 'Mindful Minutes', goal: 10},
    {name: 'Step Count', goal: 8000},
  ]);

  // Upon loading, the component initalizes the Healthkit and saves all necessary data to the state
  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    setHealthData(LoadData(null, healthData));
  };

  return <Home healthData={healthData} reload={reload} />;
};

export default App;
