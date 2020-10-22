import React, {useState} from 'react';

import Navigation from './src/Components/Navigation';
import {StyleSheet, View, Text} from 'react-native';

const App = () => {
  const [healthData, setHealthData] = useState([
    {goal: 450, name: 'Active Energy', value: 700},
    {goal: 8000, name: 'Step Count', value: 9496},
    {goal: 10, name: 'Mindful Minutes', value: 12},
  ]);

  return <Navigation healthData={healthData} />;
};

export default App;
