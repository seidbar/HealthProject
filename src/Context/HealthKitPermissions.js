import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit from 'react-native-health';

const PERMS = AppleHealthKit.Constants.Permissions;

const getPermissions = async () => {
  try {
    const permissionStorage = await AsyncStorage.getItem('permissions');
    return permissionStorage ? JSON.parse(permissionStorage) : {};
  } catch (e) {
    console.log('Permission fetching failed');
  }
};

export const Context = React.createContext();

// Global state for HealthKitPermissions
const HealthKitPermissions = ({children}) => {
  const [state, setState] = useState({
    permissions: {
      read: [],
      write: [],
    },
  });

  useEffect(() => {
    async function fetchData() {
      const permissionData = await getPermissions();
      setState(permissionData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (state) {
      AsyncStorage.setItem('permissions', JSON.stringify(state));
    }
  }, [state]);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default HealthKitPermissions;
