import React, {useState} from 'react';

// Sample data for test purposes only. Save to delete
const sampleData = [
  {
    name: 'Active Energy',
    goal: 450,
    value: 0,
    weight: 1,
    increment: 10,
    measure: 'Calories Burned',
  },
  {
    name: 'Mindful Minutes',
    goal: 10,
    value: 0,
    weight: 1,
    increment: 5,
    measure: 'Minutes',
  },
  {
    name: 'Step Count',
    goal: 8000,
    value: 0,
    weight: 1,
    increment: 100,
    measure: 'Steps',
  },
];

export const Context = React.createContext();

// Global state for HealthData
const HealthData = ({children}) => {
  const [state, setState] = useState(sampleData);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default HealthData;
