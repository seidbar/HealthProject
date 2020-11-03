import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getHealthData = async () => {
  try {
    const healthStorage = await AsyncStorage.getItem('healthHistory');
    return healthStorage ? JSON.parse(healthStorage) : [];
  } catch (e) {
    console.log('Storage fetching failed');
  }
};

export const Context = React.createContext();

// Global state for HealthHistoryData
const HealthHistory = ({children}) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const healthData = await getHealthData();
      setState(healthData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (state) {
      AsyncStorage.setItem('healthHistory', JSON.stringify(state));
    }
  }, [state]);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default HealthHistory;
