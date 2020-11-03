import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStatus = async () => {
  try {
    const statusStorage = await AsyncStorage.getItem('status');
    return statusStorage ? JSON.parse(statusStorage) : {};
  } catch (e) {
    console.log('Status fetching failed');
  }
};

export const Context = React.createContext();

// Global state that tracks if the app was set up by the user
const AppStatus = ({children}) => {
  const [state, setState] = useState([{intro: false, fullHistory: false}]);

  useEffect(() => {
    async function fetchData() {
      const statusData = await getStatus();
      setState(statusData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (state) {
      AsyncStorage.setItem('status', JSON.stringify(state));
    }
  }, [state]);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default AppStatus;
