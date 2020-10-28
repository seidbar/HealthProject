import React, {useState} from 'react';
import AppleHealthKit from 'react-native-health';

const PERMS = AppleHealthKit.Constants.Permissions;
// Sample data for test purposes only. Save to delete
const sampleData = {
  permissions: {
    read: [PERMS.StepCount, PERMS.ActiveEnergyBurned, PERMS.MindfulSession],
    write: [],
  },
};

export const Context = React.createContext();

// Global state for HealthKitPermissions
const HealthKitPermissions = ({children}) => {
  const [state, setState] = useState(sampleData);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default HealthKitPermissions;
