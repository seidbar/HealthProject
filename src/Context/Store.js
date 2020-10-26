import React, {useState} from 'react';

// Sample data for test purposes only. Save to delete
const sampleData = [
  {name: 'Active Energy', goal: 450, value: 0, weight: 1},
  {name: 'Mindful Minutes', goal: 10, value: 0, weight: 1},
  {name: 'Step Count', goal: 8000, value: 0, weight: 1},
];

export const Context = React.createContext();

// Global state for HealthData
const Store = ({children}) => {
  const [state, setState] = useState(sampleData);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default Store;
